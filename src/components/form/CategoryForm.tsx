"use client";

import { categoryFormSchema } from "@/schema/category";
import { createCategory, updateCategory } from "@/server/action/category";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import Link from "next/link";
import { Input } from "../ui/input";

function CategoryForm({
  category,
}: {
  category?: {
    id: string;
    categoryName: string;
  };
}) {
  const form = useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: category ?? {
      categoryName: "",
    }
  });

  useEffect(() => {
    if (category) {
      form.reset({
        categoryName: category.categoryName,
      })
    }
  }, [category, form]);

  async function onSubmit(values: z.infer<typeof categoryFormSchema>) {
    const action = category == null ? createCategory : updateCategory.bind(null, category.id)
    const data = await action(values);

    if (data?.error) {
      form.setError("root", {
        message: "There was an error saving your category",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-6 flex-col"
      >
        {form.formState.errors.root && (
          <div className="text-destructive text-sm">
            {form.formState.errors.root.message}
          </div>
        )}
        <FormField
          control={form.control}
          name="categoryName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                The name users will see when booking
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 justify-end">
          <Button type="button" asChild variant="outline">
            <Link href="/admin/kategori">Cancel</Link>
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
}

export default CategoryForm;
