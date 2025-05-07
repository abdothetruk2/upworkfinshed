import ProductForm from "@/components/form/ProductForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function NewProductPage() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
        <Card>
          <CardHeader>
            <CardTitle>Produk Baru</CardTitle>
          </CardHeader>

          <CardContent>
            {/* Pass categories directly as a prop */}
            <ProductForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default NewProductPage;
