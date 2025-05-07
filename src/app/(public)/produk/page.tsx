import FilterBar from "@/components/FilterBar";
import ProductsList from "@/components/ProductsList";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { slugify } from "@/lib/utils";
import { getAllCategories } from "@/server/action/category";
import { Filter } from "lucide-react";
import { Metadata } from "next";
import Head from "next/head";
import React from "react";

export const metadata: Metadata = {
  title: "Produk Glorys",
  description:
    "Kummpulan produk 8 Istana Profil. 8 Istana Profil adalah penyedia berbagai profil kayu, cat, aksesoris perabot, triplek, HPL, takon, wallpaper, parket, dan masih banyak lagi. Dengan pengalaman luas, kami siap memenuhi kebutuhan bahan bangunan dan dekorasi Anda. Tahan lama dan mudah dipasang.Kaca film berkualitas yang awet dan mudah dipasang untuk kenyamanan Anda.Privasi Maksimal, Cahaya Tetap Masuk Jaga privasi tanpa mengurangi cahaya alami di ruangan Anda. Pilih Motif dan Warna Beragam Beragam motif dan warna kaca film untuk mempercantik ruang Anda sesuai selera.",
};

async function ProdukPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    category?: string | string[];
    page: string;
  }>;
}) {
  // Get All Categories
  const categoriesData = await getAllCategories();

  // Search and Pagination
  const params = await searchParams;
  const search = params.search || "";
  const page = params.page ? parseInt(params.page) : 1;

  // Normalize category into an array
  const categoryParam = params.category;
  const selectedCategories = Array.isArray(categoryParam)
    ? categoryParam
    : categoryParam
    ? [categoryParam]
    : [];

  return (
    <>
      <Head>
        <meta name="robots" content="index, follow" />
      </Head>
      <div className="relative flex flex-col items-start min-h-screen overflow-y-auto overflow-x-hidden bg-center bg-cover bg-main-section px-10 mx-auto pt-24 z-10 w-full">
        {/* Search + Filter Row */}
        <div className="flex justify-center w-full mt-16 mb-4">
          <FilterBar categoriesData={categoriesData} />
        </div>

        {/* Products Paginated */}
        <div className="flex space-x-4 pt-6 w-full">
          <ProductsList
            page={page}
            search={search}
            category={selectedCategories}
          />
        </div>
      </div>
    </>
  );
}

export default ProdukPage;
