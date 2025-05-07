"use client";

import { productFormSchema } from "@/schema/product";
import { createProduct, updateProduct } from "@/server/action/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import Link from "next/link";
import { Button } from "../ui/button";
import Tiptap from "../TipTap";
import { useEffect, useState } from "react";
import { getAllCategories } from "@/server/action/category";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function ProductForm({
  product,
}: {
  product?: {
    id: string;
    categoryId: string;
    productName: string;
    material: string;
    size: string;
    description: string | null;
    availabilityStatus: boolean;
    price: number;
    discount: number;
  };
}) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  //  Ensuring its undefined instead of null to ensure its compatible with zod form
  const transformedProduct = {
    ...product,
    description: product?.description ?? undefined,
  };

  //  Helper function to get category name by based on the id
  function getCategoryNameById(categoryId: string | undefined) {
    const category = categories?.find((cat) => cat.id === categoryId);
    return category ? category.categoryName : "Select a Category"; // Return the category name or default placeholder
  }

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: transformedProduct ?? {
      availabilityStatus: true,
    },
  });

  async function onSubmit(values: z.infer<typeof productFormSchema>) {
    const action =
      product == null ? createProduct : updateProduct.bind(null, product.id);
    console.log(values);
    const data = await action(values);

    if (data?.error) {
      form.setError("root", {
        message: "There was an error saving your product",
      });
    }
  }

  useEffect(() => {
    // Function to call getAllCategories and set the state
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories(); // Call your API function here
        setCategories(data); // Set the data into state
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        setError(err as Error); // Handle any errors
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-full max-w-lg mx-auto px-4 sm:px-6 lg:px-8"
      >
        {form.formState.errors.root && (
          <div className="text-destructive text-sm">
            {form.formState.errors.root.message}
          </div>
        )}

        {/* Product Name */}
        <FormField
          control={form.control}
          name="productName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama produk</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Nama produk anda</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category */}
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kategori</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(value)} // Ensure form control gets updated
                  value={field.value} // Control the selected value
                >
                  <SelectTrigger className="w-[180px]">
                    {/* Use selected category name or default placeholder */}
                    <SelectValue
                      placeholder={
                        product
                          ? getCategoryNameById(product.categoryId) // Use product category name if editing
                          : "Select a Category" // Placeholder if creating a new product
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.categoryName} {/* Display category name */}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>Jenis kategori produk anda</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Material */}
        <FormField
          control={form.control}
          name="material"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Material</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Material Produk</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Size */}
        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ukuran / Size</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Ukuran atau Dimensi Produk</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi</FormLabel>
              <FormControl>
                <Tiptap value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Availability Status */}
        <FormField
          control={form.control}
          name="availabilityStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Produk Ready?</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Price */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Harga</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormDescription>Harga dalam Rupiah Rp.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Unit */}
        <FormField
          control={form.control}
          name="unit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit / Satuan</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Harga dalam satuan</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Discount */}
        <FormField
          control={form.control}
          name="discount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Diskon</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormDescription>*Diskon Opsional 0.1 = 10%</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Buttons */}
        <div className="flex gap-2 justify-end">
          <Button type="button" asChild variant="outline">
            <Link href="/admin">Cancel</Link>
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
}

export default ProductForm;
