"use client";
import { Plus } from "lucide-react";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  title: string;
  isOpen: boolean;
  onClick: () => void;
}

export default function ProductDetailItem({
  children,
  title,
  isOpen,
  onClick,
}: Props) {
  return (
    <div className="mb-6 max-w-[690px] w-full">
      <div
        className={`flex justify-between items-center cursor-pointer ${isOpen ? 'border-primary border-b' : 'border-b'} py-6`}
        onClick={onClick}
      >
        <h4 className={`font-medium ${isOpen && 'text-primary'}`}>{title}</h4>
        <Plus
          className={`transition-transform duration-300  ${
            isOpen ? "rotate-45 text-primary" : "rotate-0"
          }`}
        />
      </div>

      {isOpen && <div className="animate-fade-in">{children}</div>}
    </div>
  );
}
