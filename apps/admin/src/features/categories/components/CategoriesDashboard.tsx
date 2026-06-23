import { Plus} from"lucide-react";
import Link from"next/link";

export default function CategoriesDashboard() {
 return (
 <div className="p-8 max-w-brand mx-auto">
 <div className="sm:flex sm:items-center">
 <div className="sm:flex-auto">
 <h1 className="text-brand-h1 font-bold tracking-tight text-brand-text">Categories</h1>
 <p className="mt-2 text-brand-h3 text-brand-text/70">
 Manage your store&apos;s product categories and navigation structure.
 </p>
 </div>
 <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
 <Link
 href="/categories/add"
 className="flex items-center gap-2 rounded-global bg-brand-primary px-4 py-2.5 text-center text-brand-body font-semibold text-brand-secondary shadow-sm hover:bg-brand-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary transition-colors"
 >
 <Plus className="h-4 w-4"/>
 Add category
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
 <th scope="col"className="py-4 pl-4 pr-3 text-left text-[0.65rem] uppercase tracking-[0.2em] font-semibold text-brand-text/50 sm:pl-6">
 Name
 </th>
 <th scope="col"className="px-3 py-4 text-left text-[0.65rem] uppercase tracking-[0.2em] font-semibold text-brand-text/50">
 Slug
 </th>
 <th scope="col"className="px-3 py-4 text-left text-[0.65rem] uppercase tracking-[0.2em] font-semibold text-brand-text/50">
 Products Count
 </th>
 <th scope="col"className="relative py-3.5 pl-3 pr-4 sm:pr-6">
 <span className="sr-only">Edit</span>
 </th>
 </tr>
 </thead>
 <tbody className="divide-y divide-brand-border-global/50 bg-transparent">
 {/* Empty state for now */}
 <tr>
 <td colSpan={4} className="py-12 text-center text-brand-body text-brand-text/50">
 Loading categories...
 </td>
 </tr>
 </tbody>
 </table>
 </div>
 </div>
 </div>
 </div>
 </div>
 );
}
