import ProductForm from "@/components/form/ProductForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/drizzle/db";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

async function getProduct(productId: string) {
  // Async function to get the product data from the database
  const product = await db.query.ProductTable.findFirst({
    where: ({ id }, { eq }) => eq(id, productId),
  });

  return product;
}

export default async function EditProductPage({ params }: {params: Promise<{productId:string}>}) {
  const productId = (await params).productId
  
  const { userId, redirectToSignIn } = await auth();
  
  if (userId == null) return redirectToSignIn();

  // Get the category data asynchronously
  const product = await getProduct(productId);

  if (product == null) return notFound();

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Edit Product {product.productName}</CardTitle>
      </CardHeader>
      <CardContent>
        <ProductForm product={{ ...product || undefined }} />
      </CardContent>
    </Card>
  );
}
