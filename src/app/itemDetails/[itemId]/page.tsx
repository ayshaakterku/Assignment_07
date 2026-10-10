import { notFound } from "next/navigation";

import type { IProductAll } from "@/app/types";
import ProductDetailsCard from "@/app/components/ProductDetails";

const ItemDetails = async ({
  params,
}: {
  params: Promise<{ itemId: string }>;
}) => {
  const { itemId } = await params;

  // Api link 3
  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products/${itemId}`
  );

  // Api link 1 or 2
  // const res = await fetch(
  //   `https://api.api-store.workers.dev/api/bazardor/products/${itemId}`
  // );
  // if (!res.ok) notFound();

  const data:IProductAll = await res.json();
  if(!data)notFound();
  // console.log(data);
  // Works whether the API returns one object or an array
  // const product: IProductAll | undefined = Array.isArray(json) ? json[0] : json;
  // if (!product) notFound();

  return <ProductDetailsCard product={data} />;
};

export default ItemDetails;
