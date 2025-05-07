import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "") // remove non-word characters
    .replace(/\-\-+/g, "-"); // collapse multiple -
}

export function normalizeCategory(category: string | string[] | undefined): string[] {
  return Array.isArray(category) ? category : category ? [category] : [];
}