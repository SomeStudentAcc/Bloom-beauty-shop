import clsx from "clsx";
import React from "react";

interface Props {
  placeHolder: string;
  setter?: (value: string) => void;
  getter: string;
  className?: string;
}

export default function MyInput({
  placeHolder,
  getter,
  setter,
  className,
}: Props) {
  return (
    <input
      type="text"
      className={clsx(
        "pl-5 py-4 text-[#ACACAC] outline-none border-[#F3F3F3] border-[2px]  w-full",
        className
      )}
      id={getter}
      onChange={(e) => setter?.(e.target.value)}
      value={getter}
      placeholder={placeHolder}
    />
  );
}
