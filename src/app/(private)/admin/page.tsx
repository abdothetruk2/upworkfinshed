import InformationCard from "@/components/cards/InformationCard";
import ProductListCardsVersion from "@/components/ProductListCardsVersion";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getTotalCategory } from "@/server/action/category";
import { getTotalProducts } from "@/server/action/product";
import { FilterIcon, ShoppingCart } from "lucide-react";
import Link from "next/link";

async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page: string }>;
}) {
  const params = await searchParams;
  const search = params.search || "";
  const page = params.page ? parseInt(params.page) : 1;

  const categoryCount = await getTotalCategory();
  const productCount = await getTotalProducts();

  return (
    <div className="space-y-4 px-4 sm:px-6 md:px-8">
      {/* TOP SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
        <SidebarTrigger className="-ml-1" />
        <h1 className="text-2xl sm:text-3xl font-semibold">Admin Panel</h1>
      </div>

      {/* CARD Components */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
        <InformationCard
          title="Jumlah Kategori"
          numeric={categoryCount}
          icon={FilterIcon}
        />
        <InformationCard
          title="Jumlah Produk"
          numeric={productCount}
          icon={ShoppingCart}
        />
      </div>

      {/* Search bar */}
      <SearchBar />
      
      {/* MAIN SECTION */}
      <Link href="/admin/produk/new">
        <Button className="mt-4">Add New Product</Button>
      </Link>

      {/* Products Paginated */}
      <div className="flex space-x-4 pt-6 w-full">
        <ProductListCardsVersion page={page} search={search} />
      </div>
    </div>
  );
}

export default AdminPage;
