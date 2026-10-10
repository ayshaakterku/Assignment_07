import React from "react";
import { IProductAll } from "../types";
import ProductCard from "./ProductCard";
import Link from "next/link";

interface IPriceDown {
  products: IProductAll[];
}

const PriceDown = ({ products }: IPriceDown) => {
  // console.log(" products: ",products);

  // Decending order sorting
  const sortedPriceLow = [...products].sort((a, b) => {
    if (a.change.dir === "down" && b.change.dir !== "down") {
      return -1;
    }

    if (a.change.dir !== "down" && b.change.dir === "down") {
      return 1;
    }
    return a.change.pct - b.change.pct;
    // return b.change.pct - a.change.pct;
  });

  //   console.log("sortedPriceLow: ", sortedPriceLow.slice(0, 6));
  const sortedPriceLowSlice = sortedPriceLow.slice(0, 6);

  return (
    <section className="mt-8 max-w-7xl mx-auto">
      <h1 className="font-bold text-3xl flex items-center gap-2 mb-5">
        <span className="text-green-600 text-2xl">▼</span>
        আজ দাম কমেছে
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedPriceLowSlice.map((item) => (
          <Link key={item.id} href={`/itemDetails/${item.id}`}>
            <ProductCard item={item}></ProductCard>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PriceDown;
