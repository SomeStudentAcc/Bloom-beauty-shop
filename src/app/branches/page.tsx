import React from "react";
import BranchesContainer from "./BranchesContainer";
import axiosInstance from "@/axios";
import { IGetData } from "@/types";

export default async function Branches() {
    const res = await axiosInstance.get("/get-data/");
    const getData: IGetData = res.data;
  return (
    <div className="container mx-auto px-5 md:px-0 py-12">
     <BranchesContainer branches={getData.branches}/>
    </div>
  );
}
