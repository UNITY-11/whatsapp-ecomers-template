import { Plus} from"lucide-react";
import Link from"next/link";
import { sanityClient} from"@/shared/lib/sanity";

export default async function ProductsDashboard() {
 let products = [];
 try {
 if (sanityClient.config().projectId !=="placeholder") {
 products = await sanityClient.fetch(`*[_type =="product"] | order(_createdAt desc) {
 _id, name, price, stock, status,"category": category->name
}`);
}
} catch (error) {
 console.error("Error fetching products:", error);
}

 return (
 <div className="p-8 max-w-brand mx-auto">
 <div className="sm:flex sm:items-center">
 <div className="sm:flex-auto">
 <h1 className="text-brand-h1 font-bold tracking-tight text-brand-text">Products</h1>
 <p className="mt-2 text-brand-h3 text-brand-text/70">
 A list of all the products in your store including their name, price, status, and category.
 </p>
 </div>
 <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
 <Link
 href="/products/add"
 className="flex items-center gap-2 rounded-global bg-brand-primary px-4 py-2.5 text-center text-brand-body font-semibold text-brand-secondary shadow-sm hover:bg-brand-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary transition-colors"
 >
 <Plus className="h-4 w-4"/>
 Add product
 </Link>
 </div>
 </div>
 <div className="mt-8 flow-root">
 <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
 <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
 <div className="overflow-hidden shadow-brand-table ring-1 ring-brand-border-global/50 sm:rounded-global bg-white">
 <table className="min-w-full divide-y divide-brand-border-global/50">
 <thead>
 <tr>
 <th scope="col"className="py-4 pl-4 pr-3 text-left text-[0.65rem] uppercase tracking-[0.2em] font-semibold text-brand-text/50 sm:pl-6">Name</th>
 <th scope="col"className="px-3 py-4 text-left text-[0.65rem] uppercase tracking-[0.2em] font-semibold text-brand-text/50">Price</th>
 <th scope="col"className="px-3 py-4 text-left text-[0.65rem] uppercase tracking-[0.2em] font-semibold text-brand-text/50">Category</th>
 <th scope="col"className="px-3 py-4 text-left text-[0.65rem] uppercase tracking-[0.2em] font-semibold text-brand-text/50">Status</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-brand-border-global/50 bg-transparent">
 {products.length === 0 ? (
 <tr>
 <td colSpan={4} className="py-12 text-center text-brand-body text-brand-text/50">
 {sanityClient.config().projectId ==="placeholder"
 ?"Database not connected. Add your NEXT_PUBLIC_SANITY_PROJECT_ID to .env.local"
 :"No products found."}
 </td>
 </tr>
 ) : (
 products.map((product: Record<string, any>) => (
 <tr key={product._id} className="hover:bg-brand-surface/80 transition-colors group">
 <td className="whitespace-nowrap py-4 pl-4 pr-3 text-brand-body font-medium text-brand-text sm:pl-6">{product.name}</td>
 <td className="whitespace-nowrap px-3 py-4 text-brand-body text-brand-text/80">${product.price}</td>
 <td className="whitespace-nowrap px-3 py-4 text-brand-body text-brand-text/80">{product.category ||"Uncategorized"}</td>
 <td className="whitespace-nowrap px-3 py-4 text-brand-body text-brand-text/80">
 <span className={`inline-flex items-center rounded-global px-2 py-1 text-brand-small font-medium ring-1 ring-inset ${
 product.status ==="active"?"bg-brand-primary/10 text-brand-primary ring-brand-primary/20":"bg-[#1a2e28]/10 text-brand-text/70 ring-[#1a2e28]/20"
}`}>
 {product.status ||"draft"}
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
