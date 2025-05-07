import { SidebarTrigger } from "@/components/ui/sidebar";
import { columns } from "./columns";
import { DataTable } from "@/components/DataTable";
import { db } from "@/drizzle/db";
import { CategoryTable } from "@/drizzle/schema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { headers } from "next/headers";

async function CategoryPage() {
  const data = await db.select().from(CategoryTable);

  return (
    <div className="space-y-4">
      {/* TOP SECTION */}
      <div className="flex flex-row space-x-4">
        <SidebarTrigger className="-ml-1" />
        <h1 className="text-2xl">Category Management</h1>
      </div>

      {/* BUTTON SECTION */}
      <div className="flex justify-end">
        <Button className="bg-yellow-500" asChild>
          <Link href={`/admin/kategori/new`}>Tambah Kategori</Link>
        </Button>
      </div>

      {/* TABLE SECTION */}
      <div className="mx-auto">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}

export default CategoryPage;
