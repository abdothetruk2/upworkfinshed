"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Filter } from "lucide-react";
import { slugify } from "@/lib/utils";
import SearchBar from "./SearchBar";

interface FilterBarProps {
  categoriesData: { id: string; categoryName: string }[];
}

export default function FilterBar({ categoriesData }: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.getAll("category") || []
  );

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]
    );
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (selectedCategories.length > 0) {
      selectedCategories.forEach((cat) => params.append("category", cat));
    }
    params.set("page", "1"); // Reset page on filter
    router.push(`/produk?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-x-4">
      <SearchBar />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <Filter className="w-4 h-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-60">
          <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
            {categoriesData.map((cat) => {
              const slug = slugify(cat.categoryName);
              return (
                <Label key={cat.id} className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedCategories.includes(slug)}
                    onCheckedChange={() => toggleCategory(slug)}
                  />
                  {cat.categoryName}
                </Label>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
      <Button onClick={applyFilters}>Apply</Button>
    </div>
  );
}
