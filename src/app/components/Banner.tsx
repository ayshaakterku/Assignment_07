import Image from "next/image";
import Link from "next/link";
import React from "react";

const Banner = () => {
  const date = new Date().toLocaleDateString("bn-BD", { dateStyle: "full" });
  // console.log(date);

  return (
    <section className="bg-[#f1f7f2] border-base-300 rounded-2xl mt-5 w-full">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-6 py-6 gap-8">
        {/* Left content */}
        <div className="flex flex-col items-start max-w-2xl">
          <p className="inline-block rounded-full bg-[#d9f0e0] text-[#0a7a3b] text-xs font-medium px-3 py-1 mb-3">
            {date}
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-6 max-w-xl">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <Link
            href="/products"
            className="inline-block bg-[#0a8a3f] hover:bg-[#087535] text-white text-sm font-semibold px-5 py-2.5 rounded-md shadow-md shadow-green-900/20 transition-colors"
          >
            সব পণ্য দেখুন
          </Link>
        </div>

        {/* Right image */}
        <div className="hidden md:block shrink-0">
          <Image
            src="/bazar-hero.png"
            alt="hero logo"
            width={300}
            height={300}
            priority
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
