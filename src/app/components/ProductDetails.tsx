import { IProductAll } from "../types";


// export type Market = { market: string; division: string; min: number; max: number };

// export type Product = {
//   id: number;
//   slug: string;
//   nameBn: string;
//   category: string;
//   categoryNameBn: string;
//   categoryIcon: string;
//   unit: string;
//   image: string;
//   today: number;
//   yesterday: number;
//   lastWeek: number;
//   lastMonth: number;
//   change: { dir: "up" | "down"; pct: number };
//   markets: Market[];
// };

const bn = (n: number, d = 0) =>
  n.toLocaleString("bn-BD", {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
    useGrouping: false,
  });

const unitBn = (u: string) => (u === "kg" ? "কেজি" : u);

export default function ProductDetailsCard({ product }: { product: IProductAll }) {
  const markets = product.markets
    .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
    .sort((a, b) => a.avg - b.avg);

  const lowest = markets.reduce((a, b) => (b.min < a.min ? b : a));
  const highest = markets.reduce((a, b) => (b.max > a.max ? b : a));
  const average = markets.reduce((s, m) => s + m.avg, 0) / markets.length;

  const isUp = product.change.dir === "up";
  const diff = Math.abs(product.today - product.yesterday);
  const unit = unitBn(product.unit);

  return (
    <div data-theme="light" className="min-h-screen bg-[#f1f7f2] text-base-content">
      <div className="mx-auto max-w-7xl px-3 py-5 pb-10">
        {/* Breadcrumb */}
        <nav className="mb-4 text-sm text-base-content/60">
          হোম › {product.categoryNameBn} › {product.nameBn}
        </nav>

        {/* Header card */}
        <section className="mb-4 flex flex-wrap items-center gap-4 rounded-2xl border border-base-content/10 bg-base-100 p-4">
          <div className="grid size-14 place-items-center rounded-2xl bg-base-200 text-3xl">
            {product.image}
          </div>

          <div className="min-w-44 flex-1">
            <h1 className="text-2xl font-bold leading-tight">{product.nameBn}</h1>
            <p className="mt-0.5 mb-1.5 text-sm text-base-content/60">
              প্রতি {unit} · {product.categoryNameBn}
            </p>
            <p className="text-sm">
              গতকালের তুলনায় আজ দাম <b>{isUp ? "বেড়েছে" : "কমেছে"}</b> · {bn(diff)} টাকা
            </p>
          </div>

          <div className="rounded-2xl bg-base-200 px-6 py-3 text-center">
            <p className="text-xs text-base-content/60">আজকের দাম</p>
            <p className="text-4xl font-bold leading-tight">{bn(product.today)}</p>
            <p className="text-xs text-base-content/60">টাকা / {unit}</p>
            <p className={`text-xs font-semibold ${isUp ? "text-error" : "text-success"}`}>
              {isUp ? "▲" : "▼"} {bn(product.change.pct, 1)}%
            </p>
          </div>
        </section>

        {/* Summary + table */}
        <section className="rounded-2xl border border-base-content/10 bg-base-100 p-4">
          <h2 className="mb-3 text-lg font-semibold">দামের সারসংক্ষেপ</h2>

          <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-base-content/10 px-4 py-3">
              <p className="text-xs text-base-content/60">সর্বনিম্ন দাম</p>
              <p className="text-2xl font-bold text-success">
                {bn(lowest.min)} <span className="text-sm font-medium">টাকা</span>
              </p>
              <p className="text-[11px] text-base-content/60">সবচেয়ে কম দামের বাজার</p>
            </div>

            <div className="rounded-2xl border border-base-content/10 px-4 py-3">
              <p className="text-xs text-base-content/60">সর্বাধিক দাম</p>
              <p className="text-2xl font-bold text-error">
                {bn(highest.max)} <span className="text-sm font-medium">টাকা</span>
              </p>
              <p className="text-[11px] text-base-content/60">সবচেয়ে বেশি দামের বাজার</p>
            </div>

            <div className="rounded-2xl border border-base-content/10 px-4 py-3">
              <p className="text-xs text-base-content/60">গড় দাম</p>
              <p className="text-2xl font-bold text-success">
                {bn(Math.round(average))} <span className="text-sm font-medium">টাকা</span>
              </p>
              <p className="text-[11px] text-base-content/60">প্রতি {unit}-এর হিসাবে</p>
            </div>
          </div>

          <h2 className="mb-3 text-lg font-semibold">বাজারভিত্তিক আজকের দাম</h2>

          <div className="overflow-x-auto rounded-xl border border-base-content/10">
            <table className="w-full min-w-[520px] border-collapse text-sm">
              <thead>
                <tr className="text-base-content/60">
                  <th className="px-3 py-2.5 text-left font-medium">বাজার</th>
                  <th className="px-3 py-2.5 text-left font-medium">বিভাগ</th>
                  <th className="px-3 py-2.5 text-right font-medium">সর্বনিম্ন</th>
                  <th className="px-3 py-2.5 text-right font-medium">সর্বাধিক</th>
                  <th className="px-3 py-2.5 text-right font-medium">গড়</th>
                </tr>
              </thead>
              <tbody>
                {markets.map((m) => (
                  <tr key={m.market} className="border-t border-base-content/10 even:bg-base-200/60">
                    <td className="px-3 py-3">{m.market}</td>
                    <td className="px-3 py-3 text-base-content/60">{m.division}</td>
                    <td className="px-3 py-3 text-right text-base-content/60">{bn(m.min)} টাকা</td>
                    <td className="px-3 py-3 text-right text-base-content/60">{bn(m.max)} টাকা</td>
                    <td className="px-3 py-3 text-right font-bold">
                      {bn(m.avg, m.avg % 1 ? 2 : 0)} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}