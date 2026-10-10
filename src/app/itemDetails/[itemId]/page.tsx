import { notFound } from "next/navigation";

import type { IProductAll } from "@/app/types";
import ProductDetailsCard from "@/app/components/ProductDetails";

const ItemDetails = async ({
  params,
}: {
  params: Promise<{ itemId: string }>;
}) => {
  const { itemId } = await params;

  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products/${itemId}`,
    { next: { revalidate: 300 } }, // refresh prices every 5 minutes
  );
  if (!res.ok) notFound();

  const json = await res.json();
  // Works whether the API returns one object or an array
  const product: IProductAll | undefined = Array.isArray(json) ? json[0] : json;
  if (!product) notFound();

  return <ProductDetailsCard product={product} />;
};

export default ItemDetails;
