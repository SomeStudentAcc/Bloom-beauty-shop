"use client";
import clsx from "clsx";
import React, { ReactNode, useRef } from "react";
import { useClickAway } from "react-use";

interface Props {
  className?: string;
  children: ReactNode;
  toggler: (entity: boolean) => void;
}

export default function ModalOverlay({ className, toggler, children }: Props) {
  const ref = useRef(null);

  useClickAway(
    ref,
    () => {
      toggler(false);
      console.log("overlay");
    },
    ["click"]
  );
  return (
    <div
      className={`bg-black/50 flex  justify-center items-center fixed top-0 bottom-0 left-0 w-full  h-full no-doc-scroll z-[55]`}
    >
      <div ref={ref} className={clsx(` bg-white px-10 lg:px-15 py-20 mx-2`, className)}>
        {children}
      </div>
    </div>
  );
}
