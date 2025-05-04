import { IBranches } from "@/types";
import React from "react";

interface Props {
  branch: IBranches;
}

export default function BranchInfoItem({ branch }: Props) {
  return (
    <div className="flex gap-5 md:gap-0 flex-col md:flex-row md:justify-between border-[#F3F3F3] border-b py-10">
      <div>
        <h4 className="uppercase text-lg font-semibold mb-5">
          {branch.name_ru}
        </h4>
        <div className="flex flex-col gap-3">
          <p className="uppercase font-semibold">адрес</p>
          <span>{branch.address_ru}</span>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <h4 className="uppercase text-lg font-semibold">режим работы</h4>
          <span>{branch.work_ru}</span>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="uppercase text-lg font-semibold">контакты</h4>
          <span>{branch.phone}</span>
        </div>
      </div>
    </div>
  );
}
