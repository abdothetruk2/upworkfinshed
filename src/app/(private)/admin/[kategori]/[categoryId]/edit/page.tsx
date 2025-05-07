import CategoryForm from "@/components/form/CategoryForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/drizzle/db";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

async function getCategory(categoryId: string) {
  // Async function to get the category data from the database
  const category = await db.query.CategoryTable.findFirst({
    where: ({ id }, { eq }) => eq(id, categoryId),
  });

  return category;
}

export default async function EditCategoryPage({ params }: {params: Promise<{categoryId:string}>}) {
  const categoryId = (await params).categoryId
  
  const { userId, redirectToSignIn } = await auth();
  if (userId == null) return redirectToSignIn();

  // Get the category data asynchronously
  const category = await getCategory(categoryId);

  if (category == null) return notFound();

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Edit category {category.categoryName}</CardTitle>
      </CardHeader>
      <CardContent>
        <CategoryForm category={{ ...category || undefined }} />
      </CardContent>
    </Card>
  );
}
