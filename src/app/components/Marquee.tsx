import React from "react";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css"

interface IProductAll {
  id: string;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;

  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;

  change: {
    dir: string;
    pct: number;
  };

  markets: IMarket[];
}

interface IMarket {
  market: string,
  division: string,
  min: number,
  max: number,
}

const Marquee = async () => {
  // Api Link 2
  // const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");

  // Api Link  1
  const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products");
  const data:IProductAll[] = await res.json();
  //   console.log(data);

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
          <div key={item.id} className="">
            <p className="flex items-center gap-2 whitespace-nowrap text-sm  text-neutral-800 font-medium">
              <span className="text-base leading-none">{item.image}</span>

              {`${item.nameBn} ${toBengaliNumber(item.today)} টাকা/কেজি`}

              <span className={`text-base leading-none ${color}`}>
                {arrow}{toBengaliNumber(item.change.pct)}% 
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
