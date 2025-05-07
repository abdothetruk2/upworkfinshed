"use client";

import { useTransition } from "react";
import { Button } from "../ui/button";
import { deleteProduct } from "@/server/action/product";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";

interface DeleteProductButtonProps {
  productId: string;
}

function DeleteProductButton({ productId }: DeleteProductButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter(); // ✅ Use useRouter at the top level

  const handleDelete = () => {
    if (!confirm("Apakah Anda yakin ingin menghapus produk ini?")) return;

    startTransition(async () => {
      const res = await deleteProduct(productId);
      if (res.success) {
        router.refresh(); // ✅ Use router.refresh() properly
      } else {
        alert(res.error);
      }
    });
  };

  return (
    <Button
      className="bg-red-700 hover:bg-red-800 text-white text-xs px-3 py-1"
      onClick={handleDelete}
      disabled={isPending}
    >
      {isPending ? "Menghapus..." : <Trash />}
    </Button>
  );
}

export default DeleteProductButton;
