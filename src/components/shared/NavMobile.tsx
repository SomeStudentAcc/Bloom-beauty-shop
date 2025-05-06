/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import NAV_LINKS from "@/constants/navConstants";
import Link from "next/link";
import { IGroup } from "@/types";

interface Props {
  filteredGroup: IGroup[];
  groups: IGroup[];
}

export default function NavMobile({ filteredGroup, groups }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<IGroup>();
  const [subGroupList, setSubGroupList] = useState<IGroup[]>([]);
  const [subGroupOpened, setSubGroupOpened] = useState(false);
  const [catalogOpened, setCatelogOpened] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const selectSubGroup = (subGroup: IGroup) => {
    const subGroups = groups.filter((el) => el.parent_id == subGroup.id);
    setSubGroupList(subGroups);
    setSubGroupOpened(true);
    setSelectedGroup(subGroup);
  };

  return (
    <div className="flex flex-col lg:hidden ">
      <div className="bg-white border-b z-25">
        <div className="container mx-auto px-5 md:px-0 pt-4 py-3 relative z-20">
          <div className="flex justify-between">
            <Link href={"/"}>
              <Image src={"/logo-red.svg"} width={144} height={35} alt="Logo" />
            </Link>
            <div className="flex gap-8 items-center">
              <Link href={"/search"}>
                <Image
                  src={"/search-zoom.svg"}
                  width={20}
                  height={20}
                  alt="Search"
                />
              </Link>
              <Link href={"/favorites"}>
                <Image
                  src={"/like-gray.svg"}
                  width={20}
                  height={20}
                  alt="Favorites"
                />
              </Link>
              <button onClick={toggleMenu} className="focus:outline-none">
                {isMenuOpen ? (
                  <X
                    onClick={() => {
                      setIsMenuOpen(false);
                      setSubGroupOpened(false);
                      setCatelogOpened(false);
                    }}
                    size={24}
                  />
                ) : (
                  <Image src={"/menu.svg"} width={24} height={24} alt="Menu" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Full-screen white overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-10 overflow-y-auto pb-15 flex-grow">
          {!catalogOpened && (
            <div className="container mx-auto px-5 mt-30  flex flex-col gap-12">
              <div className="flex flex-col gap-6">
                <ul className="flex flex-col gap-7">
                  <li
                    onClick={() => setCatelogOpened(true)}
                    className={`cursor-pointer text-lg font-medium flex justify-between items-center"
                    }`}
                  >
                    <span>Каталог</span>
                    <Image
                      className="w-1 h-1.5"
                      src={"/arrow-catalog.svg"}
                      width={1000}
                      height={1000}
                      alt=""
                    />
                  </li>
                  {NAV_LINKS.map((item, index) => (
                    <Link href={item.slug} key={index}>
                      <li
                        onClick={() => setIsMenuOpen(false)}
                        className={`cursor-pointer text-lg font-medium `}
                      >
                        <span>{item.title}</span>
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-3 text-lg">Мы в соц сетях</h4>
                <div className="flex gap-1">
                  <Image src={"/facebook.svg"} width={48} height={48} alt="" />
                  <Image src={"/telegram.svg"} width={48} height={48} alt="" />
                  <Image src={"/insta.svg"} width={48} height={48} alt="" />
                </div>
              </div>

              <div className="flex gap-1">
                <Image src={"/phone-black.svg"} width={15} height={15} alt="" />
                <p>90 990 90 90</p>
              </div>
            </div>
          )}
          {catalogOpened && !subGroupOpened && (
            <div className="container mx-auto px-5 mt-30  flex flex-col gap-12">
              <div className="relative flex justify-center">
                <Image
                  onClick={() => setCatelogOpened(false)}
                  className="transform-[scaleX(-1)] absolute left-0"
                  src={"/right-arrow-black.svg"}
                  width={24}
                  height={24}
                  alt=""
                />
                <h3 className="text-lg font-medium">Каталог</h3>
              </div>
              <ul className="flex flex-col gap-7">
                {filteredGroup.map((group) => (
                  <li
                    key={group.id}
                    onClick={() => selectSubGroup(group)}
                    className={`cursor-pointer  font-medium flex justify-between items-center text-[14px]"
                    }`}
                  >
                    <span>{group.name_ru}</span>
                    <Image
                      className="w-1 h-1.5"
                      src={"/arrow-catalog.svg"}
                      width={1000}
                      height={1000}
                      alt=""
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
          {subGroupOpened && (
            <div className="container mx-auto px-5 mt-30  flex flex-col gap-12">
              <div className="relative flex justify-center">
                <Image
                  onClick={() => setSubGroupOpened(false)}
                  className="transform-[scaleX(-1)] absolute left-0"
                  src={"/right-arrow-black.svg"}
                  width={24}
                  height={24}
                  alt=""
                />
                <h3 className="text-lg font-medium">
                  {selectedGroup?.name_ru}
                </h3>
              </div>
              <ul className="flex flex-col gap-7">
                {subGroupList.map((group) => (
                  <li
                    key={group.id}
                    onClick={() => setCatelogOpened(true)}
                    className={`cursor-pointer  font-medium flex  text-[14px]"
                    }`}
                  >
                    <span>{group.name_ru}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
