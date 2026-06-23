"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ImagePlus, Save, X } from "lucide-react";

import CustomSelect from "@/shared/components/CustomSelect";

export default function AddProductForm() {
  const [images, setImages] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("active");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const remainingSlots = 10 - images.length;
      if (remainingSlots <= 0) {
        alert("You can only upload up to 10 images.");
        return;
      }
      const filesToAdd = Array.from(e.target.files).slice(0, remainingSlots);
      if (e.target.files.length > remainingSlots) {
        alert(
          `You can only upload up to 10 images. Only ${filesToAdd.length} more images were added.`
        );
      }
      const newImages = filesToAdd.map((file) => URL.createObjectURL(file));
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };
  return (
    <div className="max-w-brand mx-auto flex w-full flex-col gap-8 p-8 pb-24">
      <div className="flex items-center justify-between">
        <div>
          <div className="mb-2 flex items-center gap-4">
            <Link
              href="/products"
              className="rounded-global text-brand-text/50 hover:bg-brand-secondary-hover hover:text-brand-primary p-2 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-brand-h1 text-brand-text font-bold tracking-tight">
              Add New Product
            </h1>
          </div>
          <p className="text-brand-text/70 text-brand-h3 ml-11">
            Create a new product by filling out all the required details below.
          </p>
        </div>
      </div>

      <form className="space-y-8">
        {/* Media */}
        <div className="rounded-global border-global border-brand-border-global bg-brand-surface p-8 shadow-sm">
          <h2 className="text-brand-h3 text-brand-text mb-6 font-medium">Product Images</h2>
          <div className="col-span-full">
            <label className="text-brand-body text-brand-text block leading-6 font-medium">
              Upload Multiple Images (3:4 Ratio)
            </label>
            <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="group border-global border-brand-border-global relative aspect-[3/4]"
                >
                  <img src={img} alt={`Preview ${idx}`} className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-2 right-2 rounded-full bg-white/80 p-1 text-red-500 opacity-0 shadow-sm transition-opacity group-hover:opacity-100 hover:bg-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <label
                htmlFor="file-upload"
                className="rounded-global border-brand-border-global bg-brand-input-bg/50 hover:bg-brand-secondary-hover relative flex aspect-[3/4] cursor-pointer flex-col items-center justify-center border-2 border-dashed p-4 text-center transition-all hover:border-[#B89A5A]/50"
              >
                <ImagePlus className="text-brand-text/50 mx-auto mb-2 h-8 w-8" />
                <span className="text-brand-body text-brand-primary font-medium">Add Images</span>
                <span className="text-brand-small text-brand-text/50 mt-1">PNG, JPG up to 5MB</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="rounded-global border-global border-brand-border-global bg-brand-surface p-8 shadow-sm">
          <h2 className="text-brand-h3 text-brand-text mb-6 font-medium">Basic Information</h2>
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="text-brand-body text-brand-text block leading-6 font-medium"
              >
                Product Name *
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="rounded-global bg-brand-input-bg text-brand-text focus:ring-brand-focus-ring focus:bg-brand-secondary-hover sm:text-brand-body block w-full border-0 px-4 py-2.5 shadow-sm ring-1 ring-transparent transition-all ring-inset focus:ring-2 focus:ring-inset sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="slug"
                className="text-brand-body text-brand-text block leading-6 font-medium"
              >
                Slug (URL snippet) *
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="slug"
                  id="slug"
                  required
                  placeholder="e.g. elegant-evening-gown"
                  className="rounded-global bg-brand-input-bg text-brand-text placeholder:text-brand-text/40 focus:ring-brand-focus-ring focus:bg-brand-secondary-hover sm:text-brand-body block w-full border-0 px-4 py-2.5 shadow-sm ring-1 ring-transparent transition-all ring-inset focus:ring-2 focus:ring-inset sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="text-brand-body text-brand-text block leading-6 font-medium"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  className="rounded-global bg-brand-input-bg text-brand-text focus:ring-brand-focus-ring focus:bg-brand-secondary-hover sm:text-brand-body block w-full resize-none border-0 px-4 py-2.5 shadow-sm ring-1 ring-transparent transition-all ring-inset focus:ring-2 focus:ring-inset sm:leading-6"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing & Inventory */}
        <div className="rounded-global border-global border-brand-border-global bg-brand-surface p-8 shadow-sm">
          <h2 className="text-brand-h3 text-brand-text mb-6 font-medium">Pricing & Inventory</h2>
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-8">
            <div>
              <label
                htmlFor="price"
                className="text-brand-body text-brand-text block leading-6 font-medium"
              >
                Price (₹) *
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  id="price"
                  required
                  className="rounded-global bg-brand-input-bg text-brand-text focus:ring-brand-focus-ring focus:bg-brand-secondary-hover sm:text-brand-body block w-full border-0 px-4 py-2.5 shadow-sm ring-1 ring-transparent transition-all ring-inset focus:ring-2 focus:ring-inset sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="salePrice"
                className="text-brand-body text-brand-text block leading-6 font-medium"
              >
                Sale Price (₹)
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  step="0.01"
                  name="salePrice"
                  id="salePrice"
                  className="rounded-global bg-brand-input-bg text-brand-text focus:ring-brand-focus-ring focus:bg-brand-secondary-hover sm:text-brand-body block w-full border-0 px-4 py-2.5 shadow-sm ring-1 ring-transparent transition-all ring-inset focus:ring-2 focus:ring-inset sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="stock"
                className="text-brand-body text-brand-text block leading-6 font-medium"
              >
                Global Stock Quantity
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="stock"
                  id="stock"
                  defaultValue={0}
                  className="rounded-global bg-brand-input-bg text-brand-text focus:ring-brand-focus-ring focus:bg-brand-secondary-hover sm:text-brand-body block w-full border-0 px-4 py-2.5 shadow-sm ring-1 ring-transparent transition-all ring-inset focus:ring-2 focus:ring-inset sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Organization */}
        <div className="rounded-global border-global border-brand-border-global bg-brand-surface p-8 shadow-sm">
          <h2 className="text-brand-h3 text-brand-text mb-6 font-medium">Organization</h2>
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div>
              <label className="text-brand-body text-brand-text mb-2 block leading-6 font-medium">
                Collection
              </label>
              <CustomSelect
                name="category"
                value={category}
                onChange={setCategory}
                placeholder="Select a collection"
                options={[
                  { value: "rings", label: "Rings" },
                  { value: "necklaces", label: "Necklaces" },
                  { value: "earrings", label: "Earrings" },
                  { value: "bracelets", label: "Bracelets" },
                  { value: "watches", label: "Watches" },
                  { value: "accessories", label: "Accessories" },
                ]}
              />
            </div>

            <div>
              <label
                htmlFor="tags"
                className="text-brand-body text-brand-text block leading-6 font-medium"
              >
                Tags (Comma separated)
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="tags"
                  id="tags"
                  placeholder="e.g. diamond, elegant, 18k gold"
                  className="rounded-global bg-brand-input-bg text-brand-text placeholder:text-brand-text/40 focus:ring-brand-focus-ring focus:bg-brand-secondary-hover sm:text-brand-body block w-full border-0 px-4 py-2.5 shadow-sm ring-1 ring-transparent transition-all ring-inset focus:ring-2 focus:ring-inset sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Status & Visibility */}
        <div className="rounded-global border-global border-brand-border-global bg-brand-surface p-8 shadow-sm">
          <h2 className="text-brand-h3 text-brand-text mb-6 font-medium">Status & Visibility</h2>
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div>
              <label className="text-brand-body text-brand-text mb-2 block leading-6 font-medium">
                Status
              </label>
              <CustomSelect
                name="status"
                value={status}
                onChange={setStatus}
                options={[
                  { value: "active", label: "Active" },
                  { value: "draft", label: "Draft" },
                  { value: "archived", label: "Archived" },
                ]}
              />
            </div>

            <div className="flex flex-col justify-center space-y-4 pt-6">
              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    id="featured"
                    name="featured"
                    type="checkbox"
                    className="rounded-global border-brand-border-global bg-brand-input-bg text-brand-primary focus:ring-brand-primary h-4 w-4"
                  />
                </div>
                <div className="text-brand-body ml-3 leading-6">
                  <label htmlFor="featured" className="text-brand-text font-medium">
                    Featured Product
                  </label>
                  <p className="text-brand-text/60">
                    Show this product on the home page featured section.
                  </p>
                </div>
              </div>

              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    id="isNewArrival"
                    name="isNewArrival"
                    type="checkbox"
                    className="rounded-global border-brand-border-global bg-brand-input-bg text-brand-primary focus:ring-brand-primary h-4 w-4"
                  />
                </div>
                <div className="text-brand-body ml-3 leading-6">
                  <label htmlFor="isNewArrival" className="text-brand-text font-medium">
                    New Arrival
                  </label>
                  <p className="text-brand-text/60">Mark this product as a new arrival.</p>
                </div>
              </div>

              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    id="isBestSeller"
                    name="isBestSeller"
                    type="checkbox"
                    className="rounded-global border-brand-border-global bg-brand-input-bg text-brand-primary focus:ring-brand-primary h-4 w-4"
                  />
                </div>
                <div className="text-brand-body ml-3 leading-6">
                  <label htmlFor="isBestSeller" className="text-brand-text font-medium">
                    Best Seller
                  </label>
                  <p className="text-brand-text/60">Add a Best Seller badge to this product.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEO */}
        <div className="rounded-global border-global border-brand-border-global bg-brand-surface p-8 shadow-sm">
          <h2 className="text-brand-h3 text-brand-text mb-6 font-medium">
            Search Engine Optimization
          </h2>
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div className="sm:col-span-2">
              <label
                htmlFor="seoTitle"
                className="text-brand-body text-brand-text block leading-6 font-medium"
              >
                SEO Title
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="seoTitle"
                  id="seoTitle"
                  className="rounded-global bg-brand-input-bg text-brand-text focus:ring-brand-focus-ring focus:bg-brand-secondary-hover sm:text-brand-body block w-full border-0 px-4 py-2.5 shadow-sm ring-1 ring-transparent transition-all ring-inset focus:ring-2 focus:ring-inset sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="seoDescription"
                className="text-brand-body text-brand-text block leading-6 font-medium"
              >
                SEO Description
              </label>
              <div className="mt-2">
                <textarea
                  id="seoDescription"
                  name="seoDescription"
                  rows={3}
                  className="rounded-global bg-brand-input-bg text-brand-text focus:ring-brand-focus-ring focus:bg-brand-secondary-hover sm:text-brand-body block w-full resize-none border-0 px-4 py-2.5 shadow-sm ring-1 ring-transparent transition-all ring-inset focus:ring-2 focus:ring-inset sm:leading-6"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-x-4 pt-6 pb-20">
          <Link
            href="/products"
            className="text-brand-body text-brand-text/70 hover:text-brand-text flex items-center leading-6 font-semibold"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="rounded-global bg-brand-primary text-brand-body text-brand-secondary hover:bg-brand-primary-hover focus-visible:outline-brand-primary flex items-center gap-2 px-8 py-2.5 font-semibold shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <Save className="h-4 w-4" />
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
}
