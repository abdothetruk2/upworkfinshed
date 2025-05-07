import { z } from "zod";

export const productFormSchema = z.object({
  categoryId: z.string().min(1, "Required"),
  productName: z.string().min(1).max(60).default(""),
  material: z.string().min(1).max(50).default(""),
  size: z.string().min(1).max(30).default(""),
  description: z.string().optional().default(""),
  availabilityStatus: z.boolean().default(true),
  price: z.coerce.number().int().positive("Price must be greater than 0").default(0),
  unit: z.string().min(1).max(10).default("pcs"),
  discount: z.coerce
    .number()
    .min(0, "Discount must be between 0.00 and 0.99")
    .max(0.99, "Discount must be between 0.00 and 0.99")
    .refine((val) => val >= 0.00 && val <= 0.99, {
      message: "Discount must be between 0.00 and 0.99",
    })
    .default(0),
});

export const productImagesFormSchema = z.object({
  productId: z.string().min(1, "Required"),
  imageLink: z.string().min(1, "Required"),
  mainImage: z.boolean().default(false),
});
