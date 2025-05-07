"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";

function NavLink({ className, ...props }: ComponentProps<typeof Link>) {
  const path = usePathname();
  const isActive = path === props.href;

  return (
    <Link
      {...props}
      className={cn(
        "transition-colors text-2xl md:text-xl lg:text-3xl",
        isActive
          ? "text-yellow-400"
          : "text-muted-foreground hover:text-yellow-400",
        className
      )}
    />
  );
}

export default NavLink;
