import { getAllProductsPaginated } from "@/server/action/product";
import AdminProductCard from "./admin/AdminProductCard";
import AdminProductPagination from "./admin/AdminProductPagination";

async function ProductListCardsVersion({
  search,
  page,
}: {
  search: string;
  page: number;
}) {
  const { products, perPage, total } = await getAllProductsPaginated(
    search ?? "",
    page
  );

  return (
    <>
      <div className="container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full grid gap-8 justify-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <AdminProductCard key={product.id} product={product} />
          ))}
        </div>

        <AdminProductPagination
          search={search ?? ""}
          page={page}
          totalPages={Math.ceil(total / perPage)}
        />
      </div>
    </>
  );
}

export default ProductListCardsVersion;
