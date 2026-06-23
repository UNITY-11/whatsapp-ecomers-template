"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ImagePlus, Save, X } from "lucide-react";

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
    setSlug(
      newName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
    );
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
    <div className="max-w-brand mx-auto flex w-full flex-col gap-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="mb-2 flex items-center gap-4">
            <Link
              href="/categories"
              className="rounded-global text-brand-text/50 hover:bg-brand-secondary-hover hover:text-brand-primary p-2 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-brand-h1 text-brand-text font-bold tracking-tight">Add Category</h1>
          </div>
          <p className="text-brand-text/70 text-brand-h3 ml-11">
            Create a new category to organize your products.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-global border-global border-brand-border-global bg-brand-surface p-8 shadow-sm">
          <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
            <div className="sm:col-span-full">
              <label
                htmlFor="name"
                className="text-brand-body text-brand-text block leading-6 font-medium"
              >
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
                  className="rounded-global bg-brand-input-bg text-brand-text focus:ring-brand-focus-ring focus:bg-brand-secondary-hover sm:text-brand-body block w-full border-0 px-4 py-2.5 shadow-sm ring-1 ring-transparent transition-all ring-inset focus:ring-2 focus:ring-inset sm:leading-6"
                  placeholder="e.g. Evening Gowns"
                />
              </div>
            </div>

            <div className="sm:col-span-full">
              <label className="text-brand-body text-brand-text block leading-6 font-medium">
                Category Image (3:4 Ratio)
              </label>
              <div className="mt-2 flex items-center gap-6">
                {previewUrl ? (
                  <div className="rounded-global border-global border-brand-border-global group relative aspect-[3/4] w-32 overflow-hidden shadow-sm">
                    <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={clearImage}
                      className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <X className="rounded-global h-8 w-8 bg-black/20 p-1 text-white" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="rounded-global border-brand-border-global bg-brand-input-bg/50 hover:bg-brand-secondary-hover text-brand-text/50 hover:text-brand-text flex aspect-[3/4] w-32 flex-col items-center justify-center border-2 border-dashed transition-all hover:border-[#B89A5A]/50"
                  >
                    <ImagePlus className="mb-2 h-8 w-8" />
                    <span className="text-brand-small px-2 text-center font-medium">
                      Upload
                      <br />
                      Image
                    </span>
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
                  <p className="text-brand-small text-brand-text/60">
                    Recommended: 1200x1600px. Max size: 5MB.
                  </p>
                  {error && (
                    <p className="text-brand-small text-brand-danger mt-1 font-medium">{error}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-x-4">
          <Link
            href="/categories"
            className="text-brand-body text-brand-text/70 hover:text-brand-text leading-6 font-semibold"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="rounded-global bg-brand-primary text-brand-body text-brand-secondary hover:bg-brand-primary-hover focus-visible:outline-brand-primary flex items-center gap-2 px-6 py-2.5 font-semibold shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <Save className="h-4 w-4" />
            Save Category
          </button>
        </div>
      </form>
    </div>
  );
}
