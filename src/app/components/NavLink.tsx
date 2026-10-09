import Image from "next/image";
import Link from "next/link";
import React from "react";
interface ICategories {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLink = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories",
  );
  const data: ICategories[] = await res.json();
  // console.log(data);

  return (
    <div className="border-y border-gray-100 bg-green-50/40">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 overflow-x-auto px-6 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
    </div>
  );
};

export default NavLink;
