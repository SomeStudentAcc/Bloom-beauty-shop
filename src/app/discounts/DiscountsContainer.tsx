"use client";
import React, { useEffect, useState } from "react";

import axiosInstance from "@/axios";
import qs from "querystring";
import { ICategory, IGetProducts, INewProduct } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "@/components/shared/Pagination";
import CatallogFilters from "../catalog/CatallogFilters";
import CatalogProducts from "../catalog/CatalogProducts";

export default function DiscountsContainer() {
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(0);
  const [products, setProducts] = useState<INewProduct[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [discounts, setDiscounts] = useState<string[]>([]);

  const router = useRouter();

  useEffect(() => {
    const params = qs.parse(searchParams.toString());
    const pageParam = params.page ? parseInt(params.page as string, 10) : 1;
    setPage(pageParam);
  }, [searchParams]);

  useEffect(() => {
    const params = qs.parse(searchParams.toString());
    const brands = params.brands ? (params.brands as string).split(",") : [];
    const discounts = params.discounts
      ? (params.discounts as string).split(",")
      : [];
    const priceFrom = params.priceFrom ? (params.priceFrom as string) : "";
    const priceTo = params.priceTo ? (params.priceTo as string) : "";
    const sort = params.sort ? (params.sort as string) : "";
    const categories = params.categories
      ? (params.categories as string).split(",")
      : [];
    console.log("params", params);

    const getProds = async () => {
      try {
        const formData = new FormData();
        formData.append("brands", JSON.stringify(brands));
        formData.append("filterCategories", JSON.stringify(categories));
        formData.append("price_from", priceFrom);
        formData.append("price_to", priceTo);
        formData.append("page", page.toString());
        formData.append("pageSize", "20");
        formData.append("sort", sort);
        formData.append("is_discount", '1');
        formData.append("discount_percentage", JSON.stringify(discounts));

        const res = await axiosInstance.post(`/get-products/`, formData);
        const response: IGetProducts = res.data;

        console.log(response);
        setProducts(response.products);
        setBrands(response.brands);
        setCategories(response.categories);
        setDiscounts(response.discounts);
        setPageCount(response.pageCount);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    getProds();
  }, [page, setPage, searchParams]);

  const handlePageChange = (newPage: number) => {
    const currentParams = qs.parse(searchParams.toString());
    const updatedParams = {
      ...currentParams,
      page: newPage,
    };
    const queryString = qs.stringify(updatedParams);
    router.push(`?${queryString}`);
    setPage(newPage);
  };
  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between gap-[50px]">
        <div className="md:max-w-[250px] xl:max-w-[325px] w-full ">
          <CatallogFilters
            brands={brands}
            categories={categories}
            discounts={discounts}
          />
        </div>
        <div className="flex-1 ">
          <CatalogProducts products={products} />
          <div className="flex justify-center mt-[50px]">
            <Pagination
              page={page}
              pageCount={pageCount}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}
