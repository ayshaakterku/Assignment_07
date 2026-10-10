import React from "react";
import { IProductAll } from "../types";

interface IProduct {
  item: IProductAll;
}

const ProductCard = ({ item }: IProduct) => {
  // console.log(item.unit);
  return (
    <div className="rounded-xl border border-green-900/10 bg-[#f1f7f2] p-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Top: icon + name */}
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e3f1e7] text-2xl">
          {item.image}
        </span>
        <div>
          <h2 className="font-bold text-lg leading-tight">{item.nameBn}</h2>
          <p className="text-sm text-gray-500">
            প্রতি{" "}
            {{
              kg: "কেজি",
              liter: "লিটার",
              litre: "লিটার",
              dozen: "ডজন",
              piece: "পিস",
            }[item.unit.trim().toLowerCase()] || item.unit}
          </p>
        </div>
      </div>

      {/* Bottom: price + change */}
      <div className="mt-4 flex items-end justify-between" id="all">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <h2 className="text-2xl font-bold text-gray-900">
            {item.today.toLocaleString("bn-BD")}{" "}
            <span className="text-sm font-medium text-gray-600">টাকা</span>
          </h2>
        </div>

        {item.change.dir === "up" ? (
          <p className="rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-600">
            ▲ {Math.abs(item.change.pct).toLocaleString("bn-BD")}%
          </p>
        ) : item.change.dir === "down" ? (
          <p className="rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-600">
            ▼ {Math.abs(item.change.pct).toLocaleString("bn-BD")}%
          </p>
        ) : (
          <p className="rounded-full bg-gray-50 px-3 py-1 text-sm font-semibold text-gray-500">
            —{" "}
            {Math.abs(item.change.pct).toLocaleString("bn-BD", {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            })}
            %
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
