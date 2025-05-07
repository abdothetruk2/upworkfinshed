import ProductCard from "@/components/cards/ProductCard";
import { Card } from "@/components/ui/card";
import { slugify } from "@/lib/utils";
import { getAllCategories } from "@/server/action/category";
import { getAllProducts } from "@/server/action/product";
import { Metadata } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Glorys - Landing Page",
  description:
    "8 Istana Profil adalah penyedia berbagai profil kayu, cat, aksesoris perabot, triplek, HPL, takon, wallpaper, parket, dan masih banyak lagi. Dengan pengalaman luas, kami siap memenuhi kebutuhan bahan bangunan dan dekorasi Anda. Tahan lama dan mudah dipasang.Kaca film berkualitas yang awet dan mudah dipasang untuk kenyamanan Anda.Privasi Maksimal, Cahaya Tetap Masuk Jaga privasi tanpa mengurangi cahaya alami di ruangan Anda. Pilih Motif dan Warna Beragam Beragam motif dan warna kaca film untuk mempercantik ruang Anda sesuai selera.",
};

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  // Display 6 random products from "products"
  const randomProducts = products.sort(() => 0.5 - Math.random()).slice(0, 6);

  return (
    <>
      <Head>
        <meta name="robots" content="index, follow" /> {/* Allow indexing */}
      </Head>

      {/* Hero Section */}
      <div className="relative flex flex-col items-start min-h-screen overflow-y-auto bg-center bg-cover bg-main-section px-10 mx-auto pt-24 z-10">
        <div className="flex flex-col items-start max-w-5xl p-4 mx-auto mt-24">
          <h1 className="mb-4 text-4xl font-bold sm:text-5xl md:text-6xl">
            Transformasi Ruangan Dengan
            <br />
            <span className="text-yellow">Kaca Film Berkualitas</span>
          </h1>

          <h2 className="mt-10 mb-10 text-xl leading-relaxed sm:text-2xl md:text-3xl">
            Menyediakan kaca film dekoratif dan fungsional untuk berbagai
            kebutuhan. Dukungan penuh dalam pemilihan motif stiker, kaca film
            bening, dan kaca film one-way untuk estetika dan kenyamanan privasi.
          </h2>

          <button className="px-6 py-3 text-lg transition duration-300 rounded-full bg-yellow-500 md:text-xl hover:bg-yellow-400">
            Explore Produk
          </button>
        </div>
      </div>

      {/* Product Section */}
      <div className="w-full px-10 py-8 bg:no-background sm:px-8 md:px-12 lg:px-16">
        <div className="flex flex-col-reverse gap-y-8 md:flex-row md:items-center md:justify-between">
          {/* Text Section */}
          <div className="flex flex-col">
            <h1 className="mb-2 text-xs font-bold tracking-widest uppercase sm:text-sm text-yellow">
              Produk Glorys
            </h1>
            <h3 className="max-w-sm text-2xl font-bold leading-snug sm:text-3xl md:text-4xl">
              Solusi Kaca Film Untuk Segala Kebutuhan
            </h3>

            {/* Cards Section */}
            <div className="grid grid-cols-3 mt-4 space-y-4 md:space-y-2">
              {categories.map((category) => (
                <Link key={category.id} href={`/produk?category=${slugify(category.categoryName)}&page=1`}>
                  <Card
                    key={category.id}
                    className="w-full text-center px-6 py-3 mr-4 transition duration-300 rounded-lg shadow-md bg-yellow-500 md:text-xl hover:bg-yellow-400 md:w-auto"
                  >
                    {category.categoryName}
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Image Section */}
          <div className="flex items-center justify-center">
            <Image
              src="/images/Kumpulan-Kaca.webp"
              alt="kaca film one way"
              width={400}
              height={400}
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
            />
          </div>
        </div>
      </div>

      {/* Featured Product Section */}
      <div className="w-full px-10 mb-6 sm:px-8 md:px-12 lg:px-16 pt-6 py-8 pb-40">
        <div className="flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
            Produk Kami
          </h1>
          <Link href="/produk">
            <span className="text-yellow-500 underline cursor-pointer text-sm sm:text-base md:text-lg">
              Selengkapnya
            </span>
          </Link>
        </div>

        {/* Horizontal Scroll Products */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pt-6">
          {randomProducts.map((product) => (
            <div key={product.id} className="snap-start shrink-0 w-[250px]">
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
