import Link from "next/link";
import { Plus } from "lucide-react";

export default function CategoriesDashboard() {
  return (
    <div className="max-w-brand mx-auto p-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-brand-h1 text-brand-text font-bold tracking-tight">Categories</h1>
          <p className="text-brand-h3 text-brand-text/70 mt-2">
            Manage your store&apos;s product categories and navigation structure.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            href="/categories/add"
            className="rounded-global bg-brand-primary text-brand-body text-brand-secondary hover:bg-brand-primary-hover focus-visible:outline-brand-primary flex items-center gap-2 px-4 py-2.5 text-center font-semibold shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <Plus className="h-4 w-4" />
            Add category
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
                      Slug
                    </th>
                    <th
                      scope="col"
                      className="text-brand-text/50 px-3 py-4 text-left text-[0.65rem] font-semibold tracking-[0.2em] uppercase"
                    >
                      Products Count
                    </th>
                    <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-brand-border-global/50 divide-y bg-transparent">
                  {/* Empty state for now */}
                  <tr>
                    <td
                      colSpan={4}
                      className="text-brand-body text-brand-text/50 py-12 text-center"
                    >
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
