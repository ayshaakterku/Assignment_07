import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import ActiveCategoryLink from "./ActiveCategoryLink";
interface ICategories {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLink = async () => {
  // Api Link 3
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories",
  );

  // Api Link 2
  // const res = await fetch(
  //   "https://api.abcz.workers.dev/api/bazardor/categories",
  // );

  // Api Link 1
  //   const res = await fetch(
  //   "https://api.api-store.workers.dev/api/bazardor/categories",
  // );
  const data: ICategories[] = await res.json();
  // console.log(data);
  if (!data) {
    notFound();
  }

  return (
    <div className="border-y border-gray-100 bg-green-50/40">
      <div className="mx-auto flex max-w-7xl flex-col items-stretch gap-2 px-3 py-3 sm:flex-row sm:items-center sm:gap-4 sm:overflow-x-auto sm:px-4 sm:py-4 md:gap-6 lg:flex-wrap lg:overflow-visible lg:px-6 lg:py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {data.map((item, ind) => (
          <ActiveCategoryLink
            key={ind}
            href={`/category/${item.slug}`}
            icon={item.icon}
            nameBn={item.nameBn}
          />
        ))}
      </div>
    </div>
    /** 
    <div className="border-y border-gray-100 bg-green-50/40">
      <div className="mx-auto flex max-w-7xl items-center  gap-6 overflow-x-auto px-6 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {data.map((item, ind) => (
          <Link key={ind} href={`/category/${item.slug}`}>
            <div className="shrink-0">
              <p className="flex items-center gap-2 whitespace-nowrap text-sm font-medium text-neutral-800">
                <span className="text-base leading-none">{item.icon}</span>
                {item.nameBn}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div> */
  );
};

export default NavLink;
