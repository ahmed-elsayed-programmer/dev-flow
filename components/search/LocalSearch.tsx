"use client";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { formUrlQuery, removeFormUrlQuery } from "@/lib/url";

import { Input } from "../ui/input";

interface Props {
  route: string;
  imgSrc: string;
  placeholder: string;
  otherClass: string;
}
const LocalSearch = ({ route, imgSrc, placeholder, otherClass }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    const delayDebouneFn = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: searchQuery,
        });

        router.push(newUrl);
      } else {
        if (pathname === route) {
          const newUrl = removeFormUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["query"],
          });
          router.push(newUrl);
        }
      }
    }, 1000);

    return () => clearTimeout(delayDebouneFn);
  }, [searchQuery, searchParams, router, pathname, route]);
  return (
    <div
      className={`background-light800_darkgradient  flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClass}`}
    >
      <Image
        src={imgSrc}
        width={24}
        height={24}
        alt="Search icon"
        className="cursor-pointer"
      />

      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        className="paragraph-regular  no-focus placeholder text-dark400_light700 border-none shadow-none outline-none"
      />
    </div>
  );
};

export default LocalSearch;
