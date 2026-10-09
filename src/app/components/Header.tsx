import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavLink from "./NavLink";


const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", { dateStyle: "full" });
  // console.log(date);
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur">
  <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
    {/* Logo + title */}
    <Link href="/" className="flex items-center gap-3">
      <Image
        className="rounded-2xl border border-gray-50 bg-green-700 p-2"
        src="/logo-icon.png"
        alt="বাজার দর লোগো"
        width={40}
        height={40}
        priority
      />
      <div className="flex flex-col leading-tight">
        <h1 className="text-xl font-bold sm:text-2xl">বাজার দর</h1>
        <span className="hidden text-xs text-neutral-500 sm:block">{date}</span>
      </div>
    </Link>

    {/* Auth buttons */}
    <nav className="flex items-center gap-2" aria-label="Authentication">
      <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">
        সাইন ইন
      </Link>
      <Link
        href="/signup"
        className="btn btn-sm border-[#05893E] bg-[#05893E] text-white hover:bg-[#047a37] sm:btn-md"
      >
        সাইন আপ
      </Link>
    </nav>
  </div>
  <NavLink/>
</header>
  );
};

export default Header;
