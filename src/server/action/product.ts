"use server";

import { db } from "@/drizzle/db";
import { CategoryTable, ProductImages, ProductTable } from "@/drizzle/schema";
import { productFormSchema, productImagesFormSchema } from "@/schema/product";
import { and, eq, ilike, inArray, sql } from "drizzle-orm";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function getAllProducts() {
  // Fetch products first with the inner join
  const products = await db
    .select()
    .from(ProductTable)
    .innerJoin(CategoryTable, eq(ProductTable.categoryId, CategoryTable.id));

  // Fetch images in a separate query for the fetched product IDs
  const productIds = products.map((product) => product.products.id); // Extract product IDs
  const productImages = await db
    .select()
    .from(ProductImages)
    .where(inArray(ProductImages.productId, productIds)); // Get images for these products

  // Combine product and image data
  const formattedProducts = products.map((product) => {
    // Get images for the current product
    const images = productImages.filter(
      (image) => image.productId === product.products.id
    );

    // Find the main image for the current product
    const mainImage =
      images.find((img) => img.mainImage === true)?.imageLink ||
      "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=";

    // Return the formatted product object with flattened structure
    return {
      id: product.products.id,
      categoryId: product.products.categoryId,
      productName: product.products.productName,
      material: product.products.material,
      size: product.products.size,
      description: product.products.description,
      availabilityStatus: product.products.availabilityStatus,
      price: product.products.price,
      unit: product.products.unit,
      discount: product.products.discount,
      createdAt: product.products.createdAt,
      updatedAt: product.products.updatedAt,
      categoryName: product.categories.categoryName, // Category name from join
      mainImage: mainImage, // Main image or null if not available
      imageLinks: images.map((img) => img.imageLink), // Array of all image links
    };
  });

  return formattedProducts;
}

export async function getAllProductsPaginated(
  search: string,
  page: number,
  category?: string | string[]
) {
  const PRODUCTS_PERPAGE = 8;

  // Normalize category input
  const categoryArray = Array.isArray(category)
    ? category
    : category
    ? [category]
    : [];

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-");

  let categoryUUIDs: string[] = [];

  if (categoryArray.length > 0) {
    // Fetch all categories and map them into a slug → UUID map
    const allCategories = await db
      .select({
        id: CategoryTable.id,
        name: CategoryTable.categoryName,
      })
      .from(CategoryTable);

    const slugToUUID = new Map(
      allCategories.map((cat) => [slugify(cat.name), cat.id])
    );

    // Match user slugs with UUIDs
    categoryUUIDs = categoryArray
      .map((slug) => slugToUUID.get(slug))
      .filter((id): id is string => !!id); // remove undefined
  }

  // Build search condition
  const searchCondition = search
    ? ilike(ProductTable.productName, `%${search}%`)
    : undefined;

  // Build category condition
  const categoryCondition =
    categoryUUIDs.length > 0
      ? inArray(ProductTable.categoryId, categoryUUIDs)
      : undefined;

  const whereConditions = [searchCondition, categoryCondition].filter(
    Boolean
  ) as any[];

  const products = await db
    .select()
    .from(ProductTable)
    .innerJoin(CategoryTable, eq(ProductTable.categoryId, CategoryTable.id))
    .where(and(...whereConditions))
    .limit(PRODUCTS_PERPAGE)
    .offset((page - 1) * PRODUCTS_PERPAGE);

  const [countResult] = await db
    .select({
      count: sql`count(*)`.mapWith(Number).as("count"),
    })
    .from(ProductTable)
    .innerJoin(CategoryTable, eq(ProductTable.categoryId, CategoryTable.id))
    .where(and(...whereConditions));

  const productIds = products.map((product) => product.products.id);

  const productImages = await db
    .select()
    .from(ProductImages)
    .where(inArray(ProductImages.productId, productIds));

  const formattedProducts = products.map((product) => {
    const images = productImages.filter(
      (image) => image.productId === product.products.id
    );

    const mainImage =
      images.find((img) => img.mainImage)?.imageLink ||
      "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=";

    return {
      id: product.products.id,
      categoryId: product.products.categoryId,
      productName: product.products.productName,
      material: product.products.material,
      size: product.products.size,
      description: product.products.description,
      availabilityStatus: product.products.availabilityStatus,
      price: product.products.price,
      unit: product.products.unit,
      discount: product.products.discount,
      createdAt: product.products.createdAt,
      updatedAt: product.products.updatedAt,
      categoryName: product.categories.categoryName,
      mainImage,
      imageLinks: images.map((img) => img.imageLink),
    };
  });

  return {
    products: formattedProducts,
    total: countResult.count,
    perPage: PRODUCTS_PERPAGE,
  };
}


export async function getProductDetailsById(productId: string) {
  // Fetch the product with the given ID and join the category data
  const product = await db
    .select()
    .from(ProductTable)
    .innerJoin(CategoryTable, eq(ProductTable.categoryId, CategoryTable.id))
    .where(eq(ProductTable.id, productId))
    .limit(1); // Ensure we only get one product

  if (product.length === 0) {
    throw new Error("Product not found");
  }

  // Fetch the images for the product
  const productImages = await db
    .select()
    .from(ProductImages)
    .where(eq(ProductImages.productId, productId)); // Get images for this product

  // Get the main image for the current product
  const mainImage =
    productImages.find((img) => img.mainImage === true)?.imageLink ||
    "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=";

  // Return the formatted product object with flattened structure
  const formattedProduct = {
    id: product[0].products.id,
    categoryId: product[0].products.categoryId,
    productName: product[0].products.productName,
    material: product[0].products.material,
    size: product[0].products.size,
    description: product[0].products.description,
    availabilityStatus: product[0].products.availabilityStatus,
    price: product[0].products.price,
    unit: product[0].products.unit,
    discount: product[0].products.discount,
    createdAt: product[0].products.createdAt,
    updatedAt: product[0].products.updatedAt,
    categoryName: product[0].categories.categoryName, // Category name from join
    mainImage: mainImage, // Main image or default if not available
    imageLinks: productImages.map((img) => img.imageLink), // Array of all image links
  };

  return formattedProduct;
}

export async function getTotalProducts() {
  const count = db.$count(ProductTable);

  return count;
}

export async function createProduct(
  unsafeData: z.infer<typeof productFormSchema>
): Promise<{ error: boolean } | undefined> {
  const { success, data } = productFormSchema.safeParse(unsafeData);

  if (!success) {
    return { error: true };
  }

  await db.insert(ProductTable).values({ ...data });

  redirect("/admin");
}

export async function insertImagesLink(
  unsafeData: z.infer<typeof productImagesFormSchema>
): Promise<{ error: boolean } | undefined> {
  const { success, data } = productImagesFormSchema.safeParse(unsafeData);

  if (!success) {
    return { error: true };
  }

  await db.insert(ProductImages).values({ ...data });
}

export async function deleteImageLink(id: string) {
  await db.delete(ProductImages).where(eq(ProductImages.id, id));
}

export async function updateProduct(
  id: string,
  unsafeData: z.infer<typeof productFormSchema>
): Promise<{ error: boolean } | undefined> {
  const { success, data } = productFormSchema.safeParse(unsafeData);

  if (!success) {
    return { error: true };
  }

  const { rowCount } = await db
    .update(ProductTable)
    .set({ ...data })
    .where(eq(ProductTable.id, id));

  if (rowCount === 0) {
    return { error: true };
  }

  redirect("/admin");
}

export async function getProductRelatedImages(productId: string) {
  const productImages = await db
    .select()
    .from(ProductImages)
    .where(eq(ProductImages.productId, productId));

  return productImages;
}

export async function deleteProduct(id: string) {
  const { rowCount } = await db
    .delete(ProductTable)
    .where(eq(ProductTable.id, id));

  if (rowCount === 0) {
    return { error: true };
  }

  return { success: true };
}
