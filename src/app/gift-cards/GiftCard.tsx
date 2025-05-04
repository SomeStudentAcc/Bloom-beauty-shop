import { INewProduct } from "@/types";
import Image from "next/image";
import React from "react";

interface Props {
  prod: INewProduct;
}

export default function GiftCard({ prod }: Props) {
  return (
    <div>
      <div className="border bporder-[#F3F3F3] py-4">
        <Image src={prod.imageUrl} width={500} height={500} alt="" />
      </div>
      <div>
        <h4></h4>
        <p></p>
        <p></p>
        <button></button>
      </div>
    </div>
  );
}
