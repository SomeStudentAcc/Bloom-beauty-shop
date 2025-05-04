"use client";
import axiosInstance from "@/axios";
import { useCartStore } from "@/stores/cartStore";
import { INewProduct } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "../assets/BlogSwiper.css";
import { formatPrice } from "@/utils";
import { useCheckoutStore } from "@/stores/checkoutStore";

export interface Props {
  products: INewProduct[];
}

interface INewProds extends INewProduct {
  amount: number;
}

export default function CheckoutCart() {
  const { cart } = useCartStore();
  const [products, setProducts] = useState<INewProduct[]>([]);
  const [newProds, setNewProds] = useState<INewProds[]>([]);
  const { selectedRegion, isExpress } = useCheckoutStore();
  const [deliveryPrice, setDeliveryPrice] = useState("");

  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    const filteredIds = cart.map((el) => el.id);
    setIds(filteredIds);
  }, [cart]);

  useEffect(() => {
    const getProds = async () => {
      const formData = new FormData();
      formData.append("page", "1");
      formData.append("pageSize", "100");
      formData.append("ids", JSON.stringify(ids));
      try {
        const res = await axiosInstance.post("/get-products/", formData);
        console.log(res.data);

        setProducts(res.data.products);

        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (ids.length > 0) {
      getProds();
    }
  }, [ids]);

  useEffect(() => {
    const newProducts: INewProds[] = products.map((el) => {
      const foundInCart = cart.find((item) => item.id === el.id);
      return {
        ...el,
        amount: foundInCart?.amount || 1,
      };
    });
    setNewProds(newProducts);
  }, [cart, products]);
  console.log(newProds);
  
  const sum = newProds.reduce(
    (acc, el) => acc + Number(el.old_price) * el.amount,
    0
  );

  useEffect(() => {
    const getDeliveryPrice = async () => {
      try {
        const res = await axiosInstance.get("/get-delivery-price/", {
          params: {
            region_id: selectedRegion.id,
            is_express: isExpress,
            total: sum,
            system: "Web",
          },
        });
        console.log(res.data);
        setDeliveryPrice(res.data.price)
      } catch (err) {
        console.error(err);
      }
    };

    getDeliveryPrice();
  }, [isExpress, selectedRegion, sum]);


  const discount = newProds.reduce(
    (acc, el) => (Number(el.discount) > 0 ? acc + Number(el.discount) : acc),
    0
  );

  return (
    <div className="bg-[#F3F3F3] p-7.5 sticky top-[150px]">
      <div className="flex justify-between items-center mb-7.5">
        <h4 className=" text-xl  md:text-3xl">Ваш заказ</h4>
        <div className=" flex items-center">
          <Image
            className="transform-[scaleX(-1)]"
            src={"/right-arrow-black.svg"}
            height={24}
            width={24}
            alt=""
          />
          <p>в корзину</p>
        </div>
      </div>
      <div className="mb-10">
        <Swiper spaceBetween={10} slidesPerView={3}>
          {products?.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="">
                <Image
                  src={product.imageUrl}
                  width={1000}
                  height={1000}
                  className=" h-[118px] w-[118px] flex-shrink-0 object-contain"
                  alt=""
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div>
        <div className="mb-8 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-black whitespace-nowrap">
              Сумма без скидки
            </span>
            <div className="flex-grow border-t border-dotted border-gray-300"></div>
            <span className="text-black whitespace-nowrap">
              {formatPrice(sum) || 0} сум
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-black whitespace-nowrap">Доставка:</span>
            <div className="flex-grow border-t border-dotted border-gray-300"></div>
            <span className="text-black whitespace-nowrap">
              {formatPrice(Number(deliveryPrice))} сум
            </span>
          </div>
          <div className="flex items-center gap-2 text-primary">
            <span className=" whitespace-nowrap">Скидка:</span>
            <div className="flex-grow border-t border-dotted border-gray-300"></div>
            <span className="whitespace-nowrap">
              {formatPrice(discount)} сум
            </span>
          </div>
          <div className="flex justify-between items-center font-semibold text-xl">
            <h3>Итого</h3>
          <div>
            {formatPrice(Number(sum)- discount + Number(deliveryPrice))} сум
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
