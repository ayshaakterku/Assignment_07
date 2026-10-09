import Link from "next/link";
import ProductCard from "@/app/components/ProductCard";
import { IProductAll } from "@/app/types";

type SortOrder = "asc" | "desc";

const CategoryPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ categoryId: string }>;
  searchParams: Promise<{ sort?: string }>;
}) => {
  const { categoryId } = await params;
  const { sort } = await searchParams;

  const order: SortOrder | undefined =
    sort === "asc" || sort === "desc" ? sort : undefined;
// Api Link 1
  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products?category=${categoryId}`,
  );
  const data: IProductAll[] = await res.json();

  if (!data.length) {
    return <p className="mt-5">কোনো পণ্য পাওয়া যায়নি।</p>;
  }

  // copy first so the original array is not mutated
  const products = order
    ? [...data].sort((a, b) =>
        order === "asc" ? a.today - b.today : b.today - a.today,
      )
    : data;

  const sortLabel =
    order === "asc"
      ? "দাম: কম → বেশি"
      : order === "desc"
        ? "দাম: বেশি → কম"
        : "সাজান";

  return (
    <div>
      <div className="flex items-center gap-2 bg-[#f1f7f2] mt-5 py-3 px-2 rounded-2xl">
        <span className="text-3xl">{data[0].image}</span>
        <div>
          <h1 className="font-bold text-3xl">{data[0].categoryNameBn}</h1>
          <p>
            {data.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      {/* Sorting */}
      <div className="mt-5 flex items-center gap-2">
        <span className="font-semibold">সাজান:</span>

        <div className="dropdown dropdown-bottom">
          <div tabIndex={0} role="button" className="btn btn-sm m-1">
            {sortLabel} ⬇️
          </div>
          <ul
            tabIndex={-1}
            className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm"
          >
            <li>
              <Link href="?sort=asc" className={order === "asc" ? "menu-active" : ""}>
                দাম: কম → বেশি
              </Link>
            </li>
            <li>
              <Link href="?sort=desc" className={order === "desc" ? "menu-active" : ""}>
                দাম: বেশি → কম
              </Link>
            </li>
            {order && (
              <li>
                <Link href="?">রিসেট</Link>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        {products.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;