import React from "react";
import DiscountsContainer from "./DiscountsContainer";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { Metadata } from "next";
const scrums = [
  {
    url: "/",
    label: "Главная",
  },
  {
    url: "",
    label: 'Скидки',
  },
];

export const metadata: Metadata = {
  title: 'Checkout'
};

export default function Discounts() {
  return (
    <div className="container mx-auto px-5 md:px-0 py-20">
      <Breadcrumbs items={scrums}/>
      <DiscountsContainer/>
    </div>
  );
}
