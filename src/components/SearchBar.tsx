"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SearchIcon, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const [text, setText] = useState(initialSearch);

  useEffect(() => {
    setText(initialSearch);
  }, [initialSearch]);

  const buildQueryString = (overrideSearch?: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    // Always reset to page 1 on search
    params.set("page", "1");

    if (overrideSearch !== undefined) {
      if (overrideSearch === null || overrideSearch.trim() === "") {
        params.delete("search");
      } else {
        params.set("search", overrideSearch.trim());
      }
    }

    return params.toString();
  };

  const handleSearch = () => {
    const query = buildQueryString(text);
    router.push(`${pathname}?${query}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearInput = () => {
    setText("");
    const query = buildQueryString(null); // remove search
    router.push(`${pathname}?${query}`);
  };

  return (
    <div className="flex justify-center w-full px-4">
      <div className="relative flex items-center w-full sm:max-w-md md:max-w-lg">
        <Input
          type="text"
          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg"
          placeholder="Search..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {text && (
          <button
            className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={clearInput}
          >
            <X size={18} />
          </button>
        )}
        <Button
          className="px-3 py-2 bg-yellow-400 rounded-lg ml-2"
          onClick={handleSearch}
        >
          <SearchIcon />
        </Button>
      </div>
    </div>
  );
}

export default SearchBar;
