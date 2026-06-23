"use client";

import { useState, useRef} from"react";
import Link from"next/link";
import { ArrowLeft, Save, ImagePlus, X} from"lucide-react";
import { useRouter} from"next/navigation";

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
 setSlug(newName.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)+/g,""));
};

 const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 const file = e.target.files?.[0];
 setError(null);
 if (file) {
 // 5MB limit
 if (file.size > 5 * 1024 * 1024) {
 setError("Image size must be less than 5MB");
 if (fileInputRef.current) fileInputRef.current.value ="";
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
 if (fileInputRef.current) fileInputRef.current.value ="";
};

 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault();
 // Here you would typically save to Sanity or your backend
 console.log({ name, slug, image});
 // Redirect back to categories
 router.push("/categories");
};

 return (
 <div className="flex flex-col gap-8 p-8 max-w-brand mx-auto w-full">
 <div className="flex items-center justify-between">
 <div>
 <div className="flex items-center gap-4 mb-2">
 <Link
 href="/categories"
 className="p-2 rounded-global text-brand-text/50 hover:bg-brand-secondary-hover hover:text-brand-primary transition-colors"
 >
 <ArrowLeft className="w-5 h-5"/>
 </Link>
 <h1 className="text-brand-h1 font-bold tracking-tight text-brand-text">Add Category</h1>
 </div>
 <p className="text-brand-text/70 text-brand-h3 ml-11">
 Create a new category to organize your products.
 </p>
 </div>
 </div>

 <form onSubmit={handleSubmit} className="space-y-6">
 <div className="rounded-global border-global border-brand-border-global bg-brand-surface p-8 shadow-sm">
 <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
 
 <div className="sm:col-span-full">
 <label htmlFor="name"className="block text-brand-body font-medium leading-6 text-brand-text">
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
 className="block w-full rounded-global border-0 bg-brand-input-bg py-2.5 px-4 text-brand-text shadow-sm ring-1 ring-inset ring-transparent focus:ring-2 focus:ring-inset focus:ring-brand-focus-ring focus:bg-brand-secondary-hover sm:text-brand-body sm:leading-6 transition-all"
 placeholder="e.g. Evening Gowns"
 />
 </div>
 </div>

 <div className="sm:col-span-full">
 <label className="block text-brand-body font-medium leading-6 text-brand-text">
 Category Image (3:4 Ratio)
 </label>
 <div className="mt-2 flex items-center gap-6">
 {previewUrl ? (
 <div className="relative w-32 aspect-[3/4] rounded-global overflow-hidden border-global border-brand-border-global shadow-sm group">
 <img src={previewUrl} alt="Preview"className="w-full h-full object-cover"/>
 <button
 type="button"
 onClick={clearImage}
 className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
 >
 <X className="w-8 h-8 text-white bg-black/20 rounded-global p-1"/>
 </button>
 </div>
 ) : (
 <button
 type="button"
 onClick={() => fileInputRef.current?.click()}
 className="flex flex-col items-center justify-center w-32 aspect-[3/4] rounded-global border-2 border-dashed border-brand-border-global bg-brand-input-bg/50 hover:bg-brand-secondary-hover hover:border-[#B89A5A]/50 transition-all text-brand-text/50 hover:text-brand-text"
 >
 <ImagePlus className="w-8 h-8 mb-2"/>
 <span className="text-brand-small font-medium text-center px-2">Upload<br/>Image</span>
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
 <p className="text-brand-small text-brand-danger font-medium mt-1">
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
 className="text-brand-body font-semibold leading-6 text-brand-text/70 hover:text-brand-text"
 >
 Cancel
 </Link>
 <button
 type="submit"
 className="flex items-center gap-2 rounded-global bg-brand-primary px-6 py-2.5 text-brand-body font-semibold text-brand-secondary shadow-sm hover:bg-brand-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary transition-colors"
 >
 <Save className="w-4 h-4"/>
 Save Category
 </button>
 </div>
 </form>
 </div>
 );
}
