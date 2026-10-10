import React from "react";
import { IProductAll } from "../types";
import ProductCard from "./ProductCard";

interface IAllProduct {
  products: IProductAll[];
}

type SortOrder = "asc" | "desc";

const AllProduct = ({ products }: IAllProduct) => {
  // console.log(" products: ",products);

  return (
    <section className="mt-8 max-w-7xl mx-auto">
      <h1 className="font-bold text-3xl mb-5">সব পণ্য</h1>
      <p>মোট {products.length.toLocaleString("Bn-BD")}টি পণ্য দেখানো হচ্ছে</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((item) => (
          <ProductCard key={item.id} item={item}></ProductCard>
        ))}
      </div>
    </section>
  );
};

export default AllProduct;
