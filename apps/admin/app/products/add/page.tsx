import Link from "next/link";
import { ArrowLeft, Save, ImagePlus } from "lucide-react";

export default function AddProductPage() {
  return (
    <div className="flex flex-col gap-8 p-8 max-w-5xl mx-auto w-full pb-24">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <Link
              href="/products"
              className="p-2 rounded-none text-[#1a2e28]/50 hover:bg-[#ebe4d8] hover:text-[#0F4A3A] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-3xl font-bold tracking-tight text-[#1a2e28]">Add New Product</h1>
          </div>
          <p className="text-[#1a2e28]/70 text-lg ml-11">
            Create a new product by filling out all the required details below.
          </p>
        </div>
      </div>

      <form className="space-y-8">
        
        {/* Basic Information */}
        <div className="rounded-none border border-[#ddd5c8] bg-[#faf7f2] p-8 shadow-sm">
          <h2 className="text-lg font-medium text-[#1a2e28] mb-6">Basic Information</h2>
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-[#1a2e28]">Product Name *</label>
              <div className="mt-2">
                <input type="text" name="name" id="name" required className="block w-full rounded-none border-0 bg-[#e8e0d4] py-2.5 px-4 text-[#1a2e28] shadow-sm ring-1 ring-inset ring-transparent focus:ring-2 focus:ring-inset focus:ring-[#B89A5A]/50 focus:bg-[#ebe4d8] sm:text-sm sm:leading-6 transition-all" />
              </div>
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium leading-6 text-[#1a2e28]">Slug (URL snippet) *</label>
              <div className="mt-2">
                <input type="text" name="slug" id="slug" required placeholder="e.g. elegant-evening-gown" className="block w-full rounded-none border-0 bg-[#e8e0d4] py-2.5 px-4 text-[#1a2e28] placeholder:text-[#1a2e28]/40 shadow-sm ring-1 ring-inset ring-transparent focus:ring-2 focus:ring-inset focus:ring-[#B89A5A]/50 focus:bg-[#ebe4d8] sm:text-sm sm:leading-6 transition-all" />
              </div>
            </div>

            <div>
              <label htmlFor="shortDescription" className="block text-sm font-medium leading-6 text-[#1a2e28]">Short Description</label>
              <div className="mt-2">
                <input type="text" name="shortDescription" id="shortDescription" className="block w-full rounded-none border-0 bg-[#e8e0d4] py-2.5 px-4 text-[#1a2e28] shadow-sm ring-1 ring-inset ring-transparent focus:ring-2 focus:ring-inset focus:ring-[#B89A5A]/50 focus:bg-[#ebe4d8] sm:text-sm sm:leading-6 transition-all" />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-[#1a2e28]">Full Description</label>
              <div className="mt-2">
                <textarea id="description" name="description" rows={5} className="block w-full rounded-none border-0 bg-[#e8e0d4] py-2.5 px-4 text-[#1a2e28] shadow-sm ring-1 ring-inset ring-transparent focus:ring-2 focus:ring-inset focus:ring-[#B89A5A]/50 focus:bg-[#ebe4d8] sm:text-sm sm:leading-6 transition-all resize-none"></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing & Inventory */}
        <div className="rounded-none border border-[#ddd5c8] bg-[#faf7f2] p-8 shadow-sm">
          <h2 className="text-lg font-medium text-[#1a2e28] mb-6">Pricing & Inventory</h2>
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-8">
            <div>
              <label htmlFor="price" className="block text-sm font-medium leading-6 text-[#1a2e28]">Price ($) *</label>
              <div className="mt-2">
                <input type="number" step="0.01" name="price" id="price" required className="block w-full rounded-none border-0 bg-[#e8e0d4] py-2.5 px-4 text-[#1a2e28] shadow-sm ring-1 ring-inset ring-transparent focus:ring-2 focus:ring-inset focus:ring-[#B89A5A]/50 focus:bg-[#ebe4d8] sm:text-sm sm:leading-6 transition-all" />
              </div>
            </div>

            <div>
              <label htmlFor="compareAtPrice" className="block text-sm font-medium leading-6 text-[#1a2e28]">Compare at Price ($)</label>
              <div className="mt-2">
                <input type="number" step="0.01" name="compareAtPrice" id="compareAtPrice" className="block w-full rounded-none border-0 bg-[#e8e0d4] py-2.5 px-4 text-[#1a2e28] shadow-sm ring-1 ring-inset ring-transparent focus:ring-2 focus:ring-inset focus:ring-[#B89A5A]/50 focus:bg-[#ebe4d8] sm:text-sm sm:leading-6 transition-all" />
              </div>
            </div>

            <div>
              <label htmlFor="stock" className="block text-sm font-medium leading-6 text-[#1a2e28]">Global Stock Quantity</label>
              <div className="mt-2">
                <input type="number" name="stock" id="stock" defaultValue={0} className="block w-full rounded-none border-0 bg-[#e8e0d4] py-2.5 px-4 text-[#1a2e28] shadow-sm ring-1 ring-inset ring-transparent focus:ring-2 focus:ring-inset focus:ring-[#B89A5A]/50 focus:bg-[#ebe4d8] sm:text-sm sm:leading-6 transition-all" />
              </div>
            </div>
          </div>
        </div>

        {/* Organization */}
        <div className="rounded-none border border-[#ddd5c8] bg-[#faf7f2] p-8 shadow-sm">
          <h2 className="text-lg font-medium text-[#1a2e28] mb-6">Organization</h2>
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div>
              <label htmlFor="category" className="block text-sm font-medium leading-6 text-[#1a2e28]">Category Reference ID</label>
              <div className="mt-2">
                <input type="text" name="category" id="category" placeholder="Enter Sanity document ID" className="block w-full rounded-none border-0 bg-[#e8e0d4] py-2.5 px-4 text-[#1a2e28] placeholder:text-[#1a2e28]/40 shadow-sm ring-1 ring-inset ring-transparent focus:ring-2 focus:ring-inset focus:ring-[#B89A5A]/50 focus:bg-[#ebe4d8] sm:text-sm sm:leading-6 transition-all" />
              </div>
            </div>

            <div>
              <label htmlFor="brand" className="block text-sm font-medium leading-6 text-[#1a2e28]">Brand Reference ID</label>
              <div className="mt-2">
                <input type="text" name="brand" id="brand" placeholder="Enter Sanity document ID" className="block w-full rounded-none border-0 bg-[#e8e0d4] py-2.5 px-4 text-[#1a2e28] placeholder:text-[#1a2e28]/40 shadow-sm ring-1 ring-inset ring-transparent focus:ring-2 focus:ring-inset focus:ring-[#B89A5A]/50 focus:bg-[#ebe4d8] sm:text-sm sm:leading-6 transition-all" />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="tags" className="block text-sm font-medium leading-6 text-[#1a2e28]">Tags (Comma separated)</label>
              <div className="mt-2">
                <input type="text" name="tags" id="tags" placeholder="e.g. summer, dress, elegant" className="block w-full rounded-none border-0 bg-[#e8e0d4] py-2.5 px-4 text-[#1a2e28] placeholder:text-[#1a2e28]/40 shadow-sm ring-1 ring-inset ring-transparent focus:ring-2 focus:ring-inset focus:ring-[#B89A5A]/50 focus:bg-[#ebe4d8] sm:text-sm sm:leading-6 transition-all" />
              </div>
            </div>
          </div>
        </div>

        {/* Status & Visibility */}
        <div className="rounded-none border border-[#ddd5c8] bg-[#faf7f2] p-8 shadow-sm">
          <h2 className="text-lg font-medium text-[#1a2e28] mb-6">Status & Visibility</h2>
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div>
              <label htmlFor="status" className="block text-sm font-medium leading-6 text-[#1a2e28]">Status</label>
              <div className="mt-2">
                <select id="status" name="status" className="block w-full rounded-none border-0 bg-[#e8e0d4] py-2.5 px-4 text-[#1a2e28] shadow-sm ring-1 ring-inset ring-transparent focus:ring-2 focus:ring-inset focus:ring-[#B89A5A]/50 focus:bg-[#ebe4d8] sm:text-sm sm:leading-6 transition-all">
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col justify-center space-y-4 pt-6">
              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input id="featured" name="featured" type="checkbox" className="h-4 w-4 rounded-none border-[#ddd5c8] bg-[#e8e0d4] text-[#0F4A3A] focus:ring-[#0F4A3A]" />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label htmlFor="featured" className="font-medium text-[#1a2e28]">Featured Product</label>
                  <p className="text-[#1a2e28]/60">Show this product on the home page featured section.</p>
                </div>
              </div>

              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input id="isNewArrival" name="isNewArrival" type="checkbox" className="h-4 w-4 rounded-none border-[#ddd5c8] bg-[#e8e0d4] text-[#0F4A3A] focus:ring-[#0F4A3A]" />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label htmlFor="isNewArrival" className="font-medium text-[#1a2e28]">New Arrival</label>
                  <p className="text-[#1a2e28]/60">Mark this product as a new arrival.</p>
                </div>
              </div>

              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input id="isBestSeller" name="isBestSeller" type="checkbox" className="h-4 w-4 rounded-none border-[#ddd5c8] bg-[#e8e0d4] text-[#0F4A3A] focus:ring-[#0F4A3A]" />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label htmlFor="isBestSeller" className="font-medium text-[#1a2e28]">Best Seller</label>
                  <p className="text-[#1a2e28]/60">Add a Best Seller badge to this product.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="rounded-none border border-[#ddd5c8] bg-[#faf7f2] p-8 shadow-sm">
          <h2 className="text-lg font-medium text-[#1a2e28] mb-6">Media Images</h2>
          <div className="col-span-full">
            <label htmlFor="images" className="block text-sm font-medium leading-6 text-[#1a2e28]">Upload Images (3:4 Ratio Recommended)</label>
            <div className="mt-2 flex justify-center rounded-none border-2 border-dashed border-[#ddd5c8] bg-[#e8e0d4]/50 hover:bg-[#ebe4d8] hover:border-[#B89A5A]/50 transition-all px-6 py-10">
              <div className="text-center">
                <ImagePlus className="mx-auto h-12 w-12 text-[#1a2e28]/50" />
                <div className="mt-4 flex text-sm leading-6 text-[#1a2e28]/70 justify-center">
                  <label htmlFor="file-upload" className="relative cursor-pointer rounded-none font-semibold text-[#0F4A3A] hover:text-[#145242] focus-within:outline-none focus-within:ring-2 focus-within:ring-[#0F4A3A] focus-within:ring-offset-2 focus-within:ring-offset-[#faf7f2]">
                    <span>Upload files</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple accept="image/*" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-[#1a2e28]/50">PNG, JPG, WEBP up to 5MB</p>
              </div>
            </div>
          </div>
        </div>

        {/* SEO */}
        <div className="rounded-none border border-[#ddd5c8] bg-[#faf7f2] p-8 shadow-sm">
          <h2 className="text-lg font-medium text-[#1a2e28] mb-6">Search Engine Optimization</h2>
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div className="sm:col-span-2">
              <label htmlFor="seoTitle" className="block text-sm font-medium leading-6 text-[#1a2e28]">SEO Title</label>
              <div className="mt-2">
                <input type="text" name="seoTitle" id="seoTitle" className="block w-full rounded-none border-0 bg-[#e8e0d4] py-2.5 px-4 text-[#1a2e28] shadow-sm ring-1 ring-inset ring-transparent focus:ring-2 focus:ring-inset focus:ring-[#B89A5A]/50 focus:bg-[#ebe4d8] sm:text-sm sm:leading-6 transition-all" />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="seoDescription" className="block text-sm font-medium leading-6 text-[#1a2e28]">SEO Description</label>
              <div className="mt-2">
                <textarea id="seoDescription" name="seoDescription" rows={3} className="block w-full rounded-none border-0 bg-[#e8e0d4] py-2.5 px-4 text-[#1a2e28] shadow-sm ring-1 ring-inset ring-transparent focus:ring-2 focus:ring-inset focus:ring-[#B89A5A]/50 focus:bg-[#ebe4d8] sm:text-sm sm:leading-6 transition-all resize-none"></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-x-4 pt-6 pb-20">
          <Link href="/products" className="flex items-center text-sm font-semibold leading-6 text-[#1a2e28]/70 hover:text-[#1a2e28]">Cancel</Link>
          <button type="submit" className="flex items-center gap-2 rounded-none bg-[#0F4A3A] px-8 py-2.5 text-sm font-semibold text-[#F5F0E8] shadow-sm hover:bg-[#145242] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F4A3A] transition-colors">
            <Save className="w-4 h-4" />
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
}
