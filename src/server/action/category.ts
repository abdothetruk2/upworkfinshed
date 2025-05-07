"use server";

import { db } from "@/drizzle/db";
import { CategoryTable } from "@/drizzle/schema";
import { categoryFormSchema } from "@/schema/category";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function getAllCategories() {
  const categories = await db.select().from(CategoryTable);

  return categories;
}

export async function deleteCategory(categoryId: string) {
  try {
    await db.delete(CategoryTable).where(eq(CategoryTable.id, categoryId));
    return { success: true, message: "Category deleted successfully" }; // ✅ Ensure JSON-serializable return value
  } catch (error) {
    console.error("Error in deleteCategory:", error);
    return { success: false, error: "Failed to delete category" }; // ✅ Return a plain object
  }
}

export async function createCategory(
  unsafeData: z.infer<typeof categoryFormSchema>
): Promise<{ error: boolean } | undefined> {
  const { success, data } = categoryFormSchema.safeParse(unsafeData);

  if (!success) {
    return { error: true };
  }

  await db.insert(CategoryTable).values({ ...data });

  redirect("/admin/kategori");
}

export async function updateCategory(
  id: string,
  unsafeData: z.infer<typeof categoryFormSchema>
): Promise<{ error: boolean } | undefined> {
  const { success, data } = categoryFormSchema.safeParse(unsafeData);

  if (!success) {
    return { error: true };
  }

  const { rowCount } = await db
    .update(CategoryTable)
    .set({ ...data })
    .where(eq(CategoryTable.id, id));

  if (rowCount === 0) {
    return { error: true };
  }

  redirect("/admin/kategori");
}

export async function getTotalCategory() {
  const count = await db.$count(CategoryTable);

  return count;
}
