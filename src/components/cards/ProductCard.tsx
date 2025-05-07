import Image from "next/image";
import { Card, CardDescription, CardTitle } from "../ui/card";
import parse from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";

type ProductCardProps = {
  id: string;
  categoryName: string;
  productName: string;
  material: string;
  size: string;
  description: string | null;
  availabilityStatus: boolean;
  price: number;
  discount: number;
  mainImage: string;
  imageLinks: string[];
};

function ProductCard({
  id,
  productName,
  material,
  description,
  mainImage,
}: ProductCardProps) {
  const safeDescription = description ?? "";

  const purifiedDescription = DOMPurify.sanitize(safeDescription);

  const parsedDesc = parse(purifiedDescription);
  return (
    <Link href={`/produk/${id}`} className="block h-full">
      <Card className="h-full flex flex-col rounded-lg shadow-md overflow-hidden">
        {/* Fixed image container */}
        <div className="w-full h-60 bg-gray-100 flex items-center justify-center">
          <Image
            className="w-full h-full object-cover"
            width={200}
            height={160}
            src={mainImage}
            alt={`Foto Produk ${productName}`}
          />
        </div>

        {/* Text content with uniform spacing */}
        <div className="flex flex-col flex-grow px-4 py-3">
          <CardTitle className="text-base font-medium line-clamp-2">{productName}</CardTitle>
          <CardDescription className="text-sm text-gray-600 line-clamp-1">{material}</CardDescription>
        </div>
      </Card>
    </Link>
  );
}

export default ProductCard;
