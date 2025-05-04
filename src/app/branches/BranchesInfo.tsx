import React from "react";
import BranchInfoItem from "./BranchInfoItem";
import { IBranches } from "@/types";
interface Props {
  branches: IBranches[];
}

export default function BranchesInfo({ branches }: Props) {
  return (
    <div className=" border-[#F3F3F3] border-t ">
      {branches.map((branch) => (
        <BranchInfoItem key={branch.id} branch={branch}/>
      ))}
    </div>
  );
}
