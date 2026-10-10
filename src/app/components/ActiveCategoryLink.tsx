"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface IProps {
  href: string;
  icon: string;
  nameBn: string;
}

const ActiveCategoryLink = ({ href, icon, nameBn }: IProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`shrink-0 rounded-md px-3 py-2 ${
        isActive ? "bg-green-400 text-white text-2xl" : "text-neutral-800 hover:bg-green-100"
      }`}
    >
      <div className="shrink-0">
        <p className="flex items-center gap-2 whitespace-nowrap text-sm font-medium">
          <span className="text-base leading-none">{icon}</span>
          {nameBn}
        </p>
      </div>
    </Link>
  );
};

export default ActiveCategoryLink;