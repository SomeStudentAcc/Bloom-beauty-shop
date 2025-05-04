"use client";
import React, { useState } from "react";
import ProductDetailItem from "./ProductDetailItem";
import { IGetSingleProduct } from "@/types";

type Props = {
  getProduct: IGetSingleProduct;
};

export default function ProductDetails({ getProduct }: Props) {
  const [openedSection, setOpenedSection] = useState<string | null>(null);

  const handleToggle = (title: string) => {
    setOpenedSection((prev) => (prev === title ? null : title));
  };

  return (
    <div>
      <ProductDetailItem
        title="Описание"
        isOpen={openedSection === "Описание"}
        onClick={() => handleToggle("Описание")}
      >
        <div className="flex flex-col gap-4 py-6 max-w-[500px] w-full">
          <h3>{getProduct.product.name_ru}</h3>
          <p>{getProduct.product.description_ru}</p>
        </div>
        <hr />
      </ProductDetailItem>

      <ProductDetailItem
        title="Бренд"
        isOpen={openedSection === "Бренд"}
        onClick={() => handleToggle("Бренд")}
      >
        <div className="flex flex-col gap-4 border-b py-6">
          <h3>{getProduct.product.brand_ru}</h3>
        </div>
        <hr />
      </ProductDetailItem>
      <ProductDetailItem
        title="наличие в магазинах"
        isOpen={openedSection === "наличие в магазинах"}
        onClick={() => handleToggle("наличие в магазинах")}
      >
        <div className="grid  md:grid-cols-2 border-b py-6">
          {getProduct.balance.map((prod, index) => (
            <div
              key={index}
              className="border py-5 flex flex-col items-center px-1"
            >
              <h4 className="text-center">{prod.name}</h4>
              {prod.quantity > 0 ? (
                <p className="font-medium">Есть в наличии</p>
              ) : (
                <p className="font-medium">Нету в наличии</p>
              )}
            </div>
          ))}
        </div>
        <hr />
      </ProductDetailItem>
      <ProductDetailItem
        title="Примечание"
        isOpen={openedSection === "Примечание"}
        onClick={() => handleToggle("Примечание")}
      >
        <div className="flex flex-col gap-4 border-b py-6">
          <p>
            Цвет продукта может отличаться от фото, ввиду индивидуальных
            особенностей цветопередачи экрана вашего устройства. Внешний вид
            может незначительно отличаться, т.к производители меняют дизайн
            упаковки и самого товара. В случае выявления несоответствия сообщите
            нам об этом
          </p>
        </div>
        <hr />
      </ProductDetailItem>
      <ProductDetailItem
        title="Отзовы"
        isOpen={openedSection === "Отзовы"}
        onClick={() => handleToggle("Отзовы")}
      >
        <div className="flex  gap-4 border-b py-6">
          <button className="py-2 px-4 border hover:bg-black hover:text-white transition-colors duration-150">
            Оставить отзыв
          </button>
          <button className="py-2 px-4 border hover:bg-black hover:text-white transition-colors duration-150">
            Читать все
          </button>
        </div>
        <hr />
      </ProductDetailItem>
      <ProductDetailItem
        title="Способ применения"
        isOpen={openedSection === "Способ применения"}
        onClick={() => handleToggle("Способ применения")}
      >
        <p>{getProduct.product.consist_ru}</p>
        <hr />
      </ProductDetailItem>
    </div>
  );
}
