"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Save, ImagePlus, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AddCategoryPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    // Auto-generate slug
    setSlug(newName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);
    if (file) {
      // 5MB limit
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size must be less than 5MB");
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }
      
      setImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const clearImage = () => {
    setImage(null);
    setPreviewUrl(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save to Sanity or your backend
    console.log({ name, slug, image });
    // Redirect back to categories
    router.push("/categories");
  };

  return (
    <div className="flex flex-col gap-8 p-8 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <Link
              href="/categories"
              className="p-2 rounded-none text-[#1a2e28]/50 hover:bg-[#ebe4d8] hover:text-[#0F4A3A] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-3xl font-bold tracking-tight text-[#1a2e28]">Add Category</h1>
          </div>
          <p className="text-[#1a2e28]/70 text-lg ml-11">
            Create a new category to organize your products.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-none border border-[#ddd5c8] bg-[#faf7f2] p-8 shadow-sm">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            
            <div className="sm:col-span-full">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-[#1a2e28]">
                Category Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={handleNameChange}
                  required
                  className="block w-full rounded-none border-0 bg-[#e8e0d4] py-2.5 px-4 text-[#1a2e28] shadow-sm ring-1 ring-inset ring-transparent focus:ring-2 focus:ring-inset focus:ring-[#B89A5A]/50 focus:bg-[#ebe4d8] sm:text-sm sm:leading-6 transition-all"
                  placeholder="e.g. Evening Gowns"
                />
              </div>
            </div>

            <div className="sm:col-span-full">
              <label className="block text-sm font-medium leading-6 text-[#1a2e28]">
                Category Image (3:4 Ratio)
              </label>
              <div className="mt-2 flex items-center gap-6">
                {previewUrl ? (
                  <div className="relative w-32 aspect-[3/4] rounded-none overflow-hidden border border-[#ddd5c8] shadow-sm group">
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={clearImage}
                      className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-8 h-8 text-white bg-black/20 rounded-none p-1" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center justify-center w-32 aspect-[3/4] rounded-none border-2 border-dashed border-[#ddd5c8] bg-[#e8e0d4]/50 hover:bg-[#ebe4d8] hover:border-[#B89A5A]/50 transition-all text-[#1a2e28]/50 hover:text-[#1a2e28]"
                  >
                    <ImagePlus className="w-8 h-8 mb-2" />
                    <span className="text-xs font-medium text-center px-2">Upload<br/>Image</span>
                  </button>
                )}
                <div className="flex flex-col justify-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                    className="hidden"
                  />
                  <p className="text-xs text-[#1a2e28]/60">
                    Recommended: 1200x1600px. Max size: 5MB.
                  </p>
                  {error && (
                    <p className="text-xs text-[#b54545] font-medium mt-1">
                      {error}
                    </p>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="flex items-center justify-end gap-x-4">
          <Link
            href="/categories"
            className="text-sm font-semibold leading-6 text-[#1a2e28]/70 hover:text-[#1a2e28]"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="flex items-center gap-2 rounded-none bg-[#0F4A3A] px-6 py-2.5 text-sm font-semibold text-[#F5F0E8] shadow-sm hover:bg-[#145242] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F4A3A] transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Category
          </button>
        </div>
      </form>
    </div>
  );
}
