import Image from "next/image";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import parse from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";
import DeleteProductButton from "./DeleteProductButton";
import { ImageIcon, PictureInPicture } from "lucide-react";

interface AdminProductCardProps {
  product: Product;
}

function AdminProductCard({ product }: AdminProductCardProps) {
  const safeDescription = product.description ?? "";

  const purifiedDescription = DOMPurify.sanitize(safeDescription);

  const parsedDesc = parse(purifiedDescription);

  return (
    <Card className="w-full max-w-[300px] bg-white rounded-md shadow-md flex flex-col justify-between h-full">
      <Image
        className="w-full h-40 object-cover rounded-t-md"
        width={400}
        height={250}
        src={product.mainImage}
        alt={`Foto Produk ${product.productName}`}
      />
      <CardContent className="flex-grow flex flex-col mt-4">
        <h1 className="text-xl font-semibold truncate text-gray-900">
          {product.productName}
        </h1>
        <div className="font-normal text-sm text-gray-700 line-clamp-2">
          {parsedDesc}
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap sm:flex-nowrap gap-2 px-2 py-2 mt-auto justify-start sm:justify-end md:flex-wrap md:justify-center lg:justify-end">
        <DeleteProductButton productId={product.id} />
        <Link
          href={`/admin/produk/${product.id}/foto`}
          className="w-full sm:w-auto"
        >
          <Button className="bg-slate-700 hover:bg-slate-800 text-white text-xs px-3 py-1 w-full">
            <ImageIcon />
          </Button>
        </Link>
        <Link
          href={`/admin/produk/${product.id}/edit`}
          className="w-full sm:w-auto"
        >
          <Button className="bg-orange-400 hover:bg-orange-500 text-white text-xs px-3 py-1 w-full">
            Edit Produk
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default AdminProductCard;
