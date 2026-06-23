import { Plus } from "lucide-react";
import Link from "next/link";
import { sanityClient } from "@/shared/lib/sanity";

export default async function ProductsDashboard() {
  let products = [];
  try {
    if (sanityClient.config().projectId !== "placeholder") {
      products = await sanityClient.fetch(`*[_type == "product"] | order(_createdAt desc) {
        _id, name, price, stock, status, "category": category->name
      }`);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-bold tracking-tight text-[#1a2e28]">Products</h1>
          <p className="mt-2 text-lg text-[#1a2e28]/70">
            A list of all the products in your store including their name, price, status, and category.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            href="/products/add"
            className="flex items-center gap-2 rounded-none bg-[#0F4A3A] px-4 py-2.5 text-center text-sm font-semibold text-[#F5F0E8] shadow-sm hover:bg-[#145242] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F4A3A] transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add product
          </Link>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow-[0_2px_10px_rgb(0,0,0,0.02)] ring-1 ring-[#ddd5c8]/50 sm:rounded-none bg-white">
              <table className="min-w-full divide-y divide-[#ddd5c8]/50">
                <thead>
                  <tr>
                    <th scope="col" className="py-4 pl-4 pr-3 text-left text-[0.65rem] uppercase tracking-[0.2em] font-semibold text-[#1a2e28]/50 sm:pl-6">Name</th>
                    <th scope="col" className="px-3 py-4 text-left text-[0.65rem] uppercase tracking-[0.2em] font-semibold text-[#1a2e28]/50">Price</th>
                    <th scope="col" className="px-3 py-4 text-left text-[0.65rem] uppercase tracking-[0.2em] font-semibold text-[#1a2e28]/50">Category</th>
                    <th scope="col" className="px-3 py-4 text-left text-[0.65rem] uppercase tracking-[0.2em] font-semibold text-[#1a2e28]/50">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ddd5c8]/50 bg-transparent">
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-12 text-center text-sm text-[#1a2e28]/50">
                        {sanityClient.config().projectId === "placeholder" 
                          ? "Database not connected. Add your NEXT_PUBLIC_SANITY_PROJECT_ID to .env.local"
                          : "No products found."}
                      </td>
                    </tr>
                  ) : (
                    products.map((product: any) => (
                      <tr key={product._id} className="hover:bg-[#faf7f2]/80 transition-colors group">
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-[#1a2e28] sm:pl-6">{product.name}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-[#1a2e28]/80">${product.price}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-[#1a2e28]/80">{product.category || "Uncategorized"}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-[#1a2e28]/80">
                          <span className={`inline-flex items-center rounded-none px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                            product.status === "active" ? "bg-[#0F4A3A]/10 text-[#0F4A3A] ring-[#0F4A3A]/20" : "bg-[#1a2e28]/10 text-[#1a2e28]/70 ring-[#1a2e28]/20"
                          }`}>
                            {product.status || "draft"}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
