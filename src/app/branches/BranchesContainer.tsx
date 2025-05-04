"use client";
import React, { useState } from "react";
import BranchesMap from "./BranchesMap";
import { IBranches } from "@/types";
import BranchesInfo from "./BranchesInfo";

interface Props {
  branches: IBranches[];
}

export default function BranchesContainer({ branches }: Props) {
  const [selectedView, setSelectedView] = useState(2);

  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between">
        <h4 className="text-3xl mb-8 lg:mb-12">Магазины</h4>
        <div>
          <div className="flex gap-5  tetx-lg">
            <button
              onClick={() => setSelectedView(1)}
              className={`py-4 max-w-[14rem] w-full ${
                selectedView == 1 ? "border-[3px]" : "border-[#D1D1D1]"
              } border`}
            >
              список
            </button>
            <button
              onClick={() => setSelectedView(2)}
              className={`py-4 max-w-[14rem] w-full ${
                selectedView == 2 ? "border-[3px]" : "border-[#D1D1D1]"
              } border`}
            >
              карта
            </button>
          </div>
        </div>
      </div>
      <div>
        {selectedView == 2 ? (
          <div className="w-full h-[600px] py-10 overflow-hidden">
            <BranchesMap branches={branches} />
          </div>
        ) : (
          <BranchesInfo branches={branches} />
        )}
      </div>
    </>
  );
}
