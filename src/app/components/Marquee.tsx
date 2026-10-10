import { notFound } from "next/navigation";
import React from "react";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import { IProductAll } from "../types";

const unitBn = (unit: string) => {
  const normalizedUnit = unit.trim().toLowerCase();
  const units: Record<string, string> = {
    kg: "কেজি",
    liter: "লিটার",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
  };
  return units[normalizedUnit] || unit;
};

const Marquee = async () => {
  // api link 3
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );

  // Api Link 2
  // const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");

  // Api Link  1
  // const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products");
  const data: IProductAll[] = await res.json();
  //   console.log(data);

  if (!data) {
    notFound();
  }

  // Bangla convertion
  const toBengaliNumber = (value: number | string) => {
    return Number(value).toLocaleString("bn-BD");
  };

  return (
    <div className="border-b border-b-gray-200">
      <MarqueeText className="py-1" direction="right" duration={20}>
        {data.map((item) => {
          const isUp = item.change.dir === "up";
          const isDown = item.change.dir === "down";

          const arrow = isUp ? "▲" : isDown ? "▼" : "-";
          const color = isUp
            ? "text-red-600"
            : isDown
              ? "text-green-600"
              : "text-gray-500";

          return (
            <div key={item.id} className="mr-8">
              <p className="flex items-center gap-2 whitespace-nowrap text-sm  text-neutral-800 font-medium">
                <span className="text-base leading-none">{item.image}</span>

                {`${item.nameBn} ${toBengaliNumber(item.today)} টাকা/${unitBn(item.unit)}`}

                <span className={`text-base leading-none ${color}`}>
                  {arrow}
                  {toBengaliNumber(item.change.pct)}%
                </span>
              </p>
            </div>
          );
        })}
      </MarqueeText>
    </div>
  );
};

export default Marquee;
