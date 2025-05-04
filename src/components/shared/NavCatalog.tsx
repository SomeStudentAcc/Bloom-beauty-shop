import { IGroup } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Props {
  filteredGroup: IGroup[];
  groups: IGroup[];
}

export default function NavCatalog({ filteredGroup, groups }: Props) {
  const [selectedGroup, setSelectedGroup] = useState<IGroup>();
  const [subGroupList, setSubGroupList] = useState<IGroup[]>([]);
  const [isGroupHovered, setGroupHovered] = useState(false);

  useEffect(() => {
    if (!isGroupHovered) {
      setSelectedGroup({});
    }
  }, [isGroupHovered]);

  useEffect(() => {
    const subGroups = groups.filter((el) => el.parent_id == selectedGroup?.id);

    setSubGroupList(subGroups);
  }, [groups, selectedGroup?.id]);

  return (
    <div className="container mx-auto px-5 py-10  overflow-y-auto h-fit">
      <div
        className="flex gap-5   max-w-[33rem] w-full"
        onMouseLeave={() => setGroupHovered(false)}
      >
        <div className=" flex flex-col gap-5 max-w-[250px] w-full">
          {filteredGroup.map((el) => (
            <div
              onMouseEnter={() => {
                setSelectedGroup(el);
                setGroupHovered(true);
              }}
              className=" flex justify-between items-center cursor-pointer group"
              key={el.id}
            >
              <p className="font-medium group-hover:underline underline-offset-1">
                {el.name_ru}
              </p>
              <Image
                className="w-1 h-1.5"
                src={"/arrow-catalog.svg"}
                width={1000}
                height={1000}
                alt=""
              />
            </div>
          ))}
        </div>
        <div className="relative">
          {isGroupHovered && (
            <div className=" overflow-y-auto max-w-[250px] fixed  h-100  w-full flex flex-col gap-5">
              {subGroupList.map((el) => (
                <Link href={`/catalog/${el.url}`} key={el.id}>
                  <p  className="font-medium">
                    {el.name_ru}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
