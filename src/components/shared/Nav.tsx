"use client";
import NAV_LINKS from "@/constants/navConstants";
import { Heart, Search, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import NavMobile from "./NavMobile";
import { useMouseWheel } from "react-use";
import { IGetProducts, IGroup } from "@/types";
import NavCatalog from "./NavCatalog";
import { useHeaderStore } from "@/stores/navStore";
import Auth from "./Auth";
import { useGetProductsStore } from "@/stores/getProducts";
import { useRouter } from "next/navigation";

interface Props {
  groups: IGroup[];
  getProducts: IGetProducts;
}

export default function Nav({ groups, getProducts }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [showNavLinks, setShowNavLinks] = useState(true);
  const mouseWheel = useMouseWheel();
  const { isAuthModal, toggleAuthModal } = useHeaderStore();
  const { setAllProducts } = useGetProductsStore();

  const router = useRouter()

  useEffect(() => {
    setAllProducts(getProducts.products);
  }, [getProducts.products, setAllProducts]);

  const prevScroll = useRef(0);

  const filteredGroup = groups.filter((el) => el.parent_id == "");

  useEffect(() => {
    if (!isHovered) {
      if (mouseWheel && typeof mouseWheel === "number") {
        if (mouseWheel > prevScroll.current) {
          setShowNavLinks(false);
        } else if (mouseWheel < prevScroll.current) {
          setShowNavLinks(true);
        }

        prevScroll.current = mouseWheel;
      }
    }
  }, [mouseWheel]);

  const handleUserClick = () => {
    const bUser = localStorage.getItem('b_user');

    if (bUser) {
      router.push('/profile'); 
    } else {
      toggleAuthModal(true); 
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-30">
        <div className="bg-white border-b hidden lg:block relative">
          <div className="container mx-auto px-5 md:px-0 pt-4">
            <div className="flex justify-between mb-8.5">
              <Link href={"/"}>
                <Image
                  src={"/logo-red.svg"}
                  width={144}
                  height={35}
                  alt="Logo"
                />
              </Link>
              <div className="text-8xl flex gap-7 items-center">
                <UserRound
                  onClick={handleUserClick}
                  className="size-6"
                />
                <Link href={"/search"}>
                  <Search className="size-6" />
                </Link>
                <Link href={"/favorites"}>
                  <Heart className="size-6" />
                </Link>
                <Link href={"/cart"}>
                  <Image
                    src={"/shopping-bag-black.svg"}
                    width={24}
                    height={24}
                    alt="Cart"
                  />
                </Link>
              </div>
            </div>

            {showNavLinks && (
              <ul className="flex justify-center items-center gap-8.5">
                <li
                  className="cursor-pointer pb-5"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  Каталог
                </li>
                {NAV_LINKS.map((item, index) => (
                  <Link href={item.slug} key={index}>
                    <li className="cursor-pointer pb-5">{item.title}</li>
                  </Link>
                ))}
              </ul>
            )}
          </div>

          <div
            className={`absolute left-0 top-full bg-white flex shadow-md border-b w-full transition-all duration-300  ease-in-out z-50 origin-top ${
              isHovered ? "scale-y-100  h-120 py-4" : "scale-y-0  py-0 h-0"
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="transform-none flex-grow overflow-y-auto ">
              <NavCatalog filteredGroup={filteredGroup} groups={groups} />
            </div>
          </div>
        </div>

        <NavMobile filteredGroup={filteredGroup} groups={groups} />
      </nav>

      {isAuthModal && (
        <Auth isAuthModal={isAuthModal} toggleAuthModal={toggleAuthModal} />
      )}
    </>
  );
}
