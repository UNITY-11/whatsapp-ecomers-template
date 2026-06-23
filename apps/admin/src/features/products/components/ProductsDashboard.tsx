import Link from "next/link";
import { Plus } from "lucide-react";

import { sanityClient } from "@/shared/lib/sanity";

export default async function ProductsDashboard() {
  let products = [];
  try {
    if (sanityClient.config().projectId !== "placeholder") {
      products = await sanityClient.fetch(`*[_type =="product"] | order(_createdAt desc) {
 _id, name, price, stock, status,"category": category->name
}`);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <div className="max-w-brand mx-auto p-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-brand-h1 text-brand-text font-bold tracking-tight">Products</h1>
          <p className="text-brand-h3 text-brand-text/70 mt-2">
            A list of all the products in your store including their name, price, status, and
            category.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            href="/products/add"
            className="rounded-global bg-brand-primary text-brand-body text-brand-secondary hover:bg-brand-primary-hover focus-visible:outline-brand-primary flex items-center gap-2 px-4 py-2.5 text-center font-semibold shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <Plus className="h-4 w-4" />
            Add product
          </Link>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="shadow-brand-table ring-brand-border-global/50 sm:rounded-global overflow-hidden bg-white ring-1">
              <table className="divide-brand-border-global/50 min-w-full divide-y">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="text-brand-text/50 py-4 pr-3 pl-4 text-left text-[0.65rem] font-semibold tracking-[0.2em] uppercase sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="text-brand-text/50 px-3 py-4 text-left text-[0.65rem] font-semibold tracking-[0.2em] uppercase"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="text-brand-text/50 px-3 py-4 text-left text-[0.65rem] font-semibold tracking-[0.2em] uppercase"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="text-brand-text/50 px-3 py-4 text-left text-[0.65rem] font-semibold tracking-[0.2em] uppercase"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-brand-border-global/50 divide-y bg-transparent">
                  {products.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="text-brand-body text-brand-text/50 py-12 text-center"
                      >
                        {sanityClient.config().projectId === "placeholder"
                          ? "Database not connected. Add your NEXT_PUBLIC_SANITY_PROJECT_ID to .env.local"
                          : "No products found."}
                      </td>
                    </tr>
                  ) : (
                    products.map((product: Record<string, any>) => (
                      <tr
                        key={product._id}
                        className="hover:bg-brand-surface/80 group transition-colors"
                      >
                        <td className="text-brand-body text-brand-text py-4 pr-3 pl-4 font-medium whitespace-nowrap sm:pl-6">
                          {product.name}
                        </td>
                        <td className="text-brand-body text-brand-text/80 px-3 py-4 whitespace-nowrap">
                          ${product.price}
                        </td>
                        <td className="text-brand-body text-brand-text/80 px-3 py-4 whitespace-nowrap">
                          {product.category || "Uncategorized"}
                        </td>
                        <td className="text-brand-body text-brand-text/80 px-3 py-4 whitespace-nowrap">
                          <span
                            className={`rounded-global text-brand-small inline-flex items-center px-2 py-1 font-medium ring-1 ring-inset ${
                              product.status === "active"
                                ? "bg-brand-primary/10 text-brand-primary ring-brand-primary/20"
                                : "text-brand-text/70 bg-[#1a2e28]/10 ring-[#1a2e28]/20"
                            }`}
                          >
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
