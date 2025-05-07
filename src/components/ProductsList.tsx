import { getAllProductsPaginated } from "@/server/action/product";
import React from "react";
import ProductCard from "./cards/ProductCard";
import ProductPagination from "./ProductPagination";
import { normalizeCategory } from "@/lib/utils";

async function ProductsList({
  search,
  page,
  category,
}: {
  search: string;
  page: number;
  category?: string | string[];
}) {
  const { products, perPage, total } = await getAllProductsPaginated(
    search ?? "",
    page,
    category
  );

  return (
    <>
      <div className="container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full grid gap-8 mb-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <ProductPagination
          search={search ?? ""}
          page={page}
          totalPages={Math.ceil(total / perPage)}
          category={normalizeCategory(category)}
        />
      </div>
    </>
  );
}

export default ProductsList;
