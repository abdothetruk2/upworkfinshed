import CategoryForm from "@/components/form/CategoryForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

function NewCategoryPage() {
  return (
    <div className="min-w-max items-center">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Kategori Baru</CardTitle>
        </CardHeader>

        <CardContent>
          <CategoryForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default NewCategoryPage;
