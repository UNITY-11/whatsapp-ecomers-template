export default function AddReviewPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto pb-24">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold leading-6 text-white">Add Review</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Manually add a review for a specific product.
        </p>
      </div>

      <form className="space-y-10 bg-zinc-900/50 border border-white/10 rounded-none p-8">
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
          
          <div className="sm:col-span-2">
            <label htmlFor="product" className="block text-sm font-medium leading-6 text-white">Product Reference ID *</label>
            <div className="mt-2">
              <input type="text" name="product" id="product" required placeholder="Sanity document ID of the product" className="block w-full rounded-none border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6 px-3" />
            </div>
          </div>

          <div>
            <label htmlFor="userName" className="block text-sm font-medium leading-6 text-white">Reviewer Name *</label>
            <div className="mt-2">
              <input type="text" name="userName" id="userName" required className="block w-full rounded-none border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6 px-3" />
            </div>
          </div>

          <div>
            <label htmlFor="rating" className="block text-sm font-medium leading-6 text-white">Star Rating (1-5) *</label>
            <div className="mt-2">
              <input type="number" min="1" max="5" name="rating" id="rating" required className="block w-full rounded-none border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6 px-3" />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="title" className="block text-sm font-medium leading-6 text-white">Review Title</label>
            <div className="mt-2">
              <input type="text" name="title" id="title" className="block w-full rounded-none border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6 px-3" />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="comment" className="block text-sm font-medium leading-6 text-white">Review Comment</label>
            <div className="mt-2">
              <textarea id="comment" name="comment" rows={4} className="block w-full rounded-none border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6 px-3"></textarea>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-4 pt-4 sm:col-span-2 border-t border-white/10">
            <div className="relative flex items-start">
              <div className="flex h-6 items-center">
                <input id="verified" name="verified" type="checkbox" className="h-4 w-4 rounded border-white/10 bg-white/5 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-zinc-900" />
              </div>
              <div className="ml-3 text-sm leading-6">
                <label htmlFor="verified" className="font-medium text-white">Verified Purchase</label>
              </div>
            </div>

            <div className="relative flex items-start">
              <div className="flex h-6 items-center">
                <input id="approved" name="approved" type="checkbox" defaultChecked className="h-4 w-4 rounded border-white/10 bg-white/5 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-zinc-900" />
              </div>
              <div className="ml-3 text-sm leading-6">
                <label htmlFor="approved" className="font-medium text-white">Approve Immediately</label>
                <p className="text-zinc-400">If unchecked, this review will be pending and not shown to customers.</p>
              </div>
            </div>
          </div>

        </div>

        <div className="flex justify-end gap-x-4 border-t border-white/10 pt-6">
          <button type="button" className="text-sm font-semibold leading-6 text-white hover:text-zinc-300">Cancel</button>
          <button type="submit" disabled className="rounded-none bg-emerald-500 px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            Save Review
          </button>
        </div>
      </form>
    </div>
  );
}
