import { getProductDetailsById } from "@/server/action/product";
import DOMPurify from "isomorphic-dompurify";
import parse from "html-react-parser";
import WAIcon from "../../../../../public/images/Whatsapp.webp";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productId: string }>;
}): Promise<Metadata> {
  const awaitedParams = await params;
  const productData = await getProductDetailsById(awaitedParams.productId);

  return {
    title: productData?.productName
      ? `${productData.productName} | Glorys`
      : "Product Details",
    description: productData?.description,
  };
}
async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const awaitedParams = await params;
  const productId = awaitedParams.productId; // Access produkId from params

  //  Get product data
  const productData = await getProductDetailsById(productId);
  const safeDescription = productData.description ?? "";
  const purifiedDescription = DOMPurify.sanitize(safeDescription);
  const parsedDesc = parse(purifiedDescription);

  return (
    <div className="relative flex flex-col min-h-screen overflow-y-auto overflow-x-hidden bg-center bg-cover bg-main-section px-6 pb-16 md:px-10 mx-auto pt-24 w-full">
      <div className="flex flex-col md:flex-row items-center justify-center mx-8 mt-16">
        {/* Product Image Section */}
        <div className="flex flex-col items-center md:items-start">
          {/* Main image */}
          <div className="relative w-60 h-60 md:w-80 md:h-80 rounded-lg shadow-lg overflow-hidden flex justify-center items-center">
            <Image
              src={productData.mainImage}
              alt={productData.productName}
              width={320}
              height={320}
              className="object-cover w-full h-full"
            />
            <div className="absolute top-2 left-2 bg-white text-black text-sm p-2 shadow-md rounded">
              <p className="font-bold">Ukuran</p>
              <p>{productData.size} cm</p>
            </div>
          </div>
          {/* Secondary Images */}
          <div className="flex space-x-2 mt-4 mb-4">
            {productData.imageLinks.map((img, index) => (
              <div
                key={index}
                className="w-16 h-16 md:w-20 md:h-20 bg-gray-300 rounded-lg overflow-hidden flex justify-center items-center"
              >
                <Image
                  src={img}
                  alt="Secondary"
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col md:w-1/2 md:pl-6 md:mt-0 sm:text-center sm:items-center sm:self-center sm:ml-0 md:text-left md:ml-12 md:self-start md:items-start lg:self-start">
          <h1 className="text-2xl md:text-3xl font-bold">
            {productData.productName}
          </h1>
          <h2 className="text-gray-600 mt-2 text-lg">
            {productData.categoryName}, {productData.material},{" "}
            {productData.size}
          </h2>

          <h3 className="text-gray-600 mt-2 text-lg">
            Rp. {productData.price} {"/"} {productData.unit}
          </h3>

          <div className="block md:hidden my-4 w-full border-t border-gray-300" />

          <div className="mt-2 text-gray-700">{parsedDesc}</div>

          <p className="text-gray-600 mt-6">Click untuk pesan</p>
          <Link
            href={`https://wa.me/${process.env.WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2"
          >
            <button className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600">
              <Image
                src={WAIcon}
                width={40}
                height={40}
                alt="WhatsApp"
                className="mr-2"
              />
              Hubungi Sekarang
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
