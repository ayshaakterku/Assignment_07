import Image from "next/image";
import Banner from "./components/Banner";
import { IProductAll } from "./types";
import PriceUp from "./components/PriceUp";
import PriceDown from "./components/PriceDown";
import AllProduct from "./components/AllProduct";



export default async function Home() {
  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");

  const data: IProductAll[] = await res.json();
  //   console.log(data);

  return (
    <div>
      <Banner />
      <PriceUp products={data}/>
      <PriceDown products={data}/>
      <AllProduct products={data}/>
    </div>
  );
}
