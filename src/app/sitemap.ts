import { getAllProducts } from "@/server/action/product";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts();

  const productUrls = products.map((product) => ({
    url: `https://gloryskacafilm.com/produk/${product.id}`,
    // Use the simplified format without milliseconds
    lastModified: new Date(product.updatedAt).toISOString().split(".")[0] + "+00:00", // Add timezone (UTC)
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: "https://gloryskacafilm.com",
      lastModified: new Date().toISOString().split(".")[0] + "+00:00", // Add timezone (UTC)
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://gloryskacafilm.com/produk",
      lastModified: new Date().toISOString().split(".")[0] + "+00:00", // Add timezone (UTC)
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...productUrls,
  ];
}
