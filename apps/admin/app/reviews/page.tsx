import { Plus } from "lucide-react";
import Link from "next/link";
import { sanityClient } from "../../lib/sanity";

export const dynamic = "force-dynamic";

export default async function ReviewsPage() {
  let reviews = [];
  try {
    if (sanityClient.config().projectId !== "placeholder") {
      reviews = await sanityClient.fetch(`*[_type == "review"] | order(_createdAt desc) {
        _id, userName, rating, title, approved, _createdAt,
        "productName": product->name
      }`);
    }
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }

  return (
    <div className="p-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold leading-6 text-white">Reviews</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Manage all customer reviews. Approve them to display on the public storefront.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            href="/reviews/add"
            className="flex items-center gap-2 rounded-none bg-emerald-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add review
          </Link>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-white/10 sm:rounded-none">
              <table className="min-w-full divide-y divide-white/10">
                <thead className="bg-zinc-900">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">Product</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">User</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Rating</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 bg-zinc-950">
                  {reviews.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-10 text-center text-sm text-zinc-500">
                        {sanityClient.config().projectId === "placeholder" 
                          ? "Database not connected. Add your NEXT_PUBLIC_SANITY_PROJECT_ID to .env.local"
                          : "No reviews found."}
                      </td>
                    </tr>
                  ) : (
                    reviews.map((review: any) => (
                      <tr key={review._id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-6">{review.productName || "Unknown Product"}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-300">{review.userName}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-emerald-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                          ))}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-300">
                          <span className={`inline-flex items-center rounded-none px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                            review.approved ? "bg-emerald-400/10 text-emerald-400 ring-emerald-400/20" : "bg-amber-400/10 text-amber-400 ring-amber-400/20"
                          }`}>
                            {review.approved ? "Approved" : "Pending"}
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
