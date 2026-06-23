"use client";

import Link from"next/link";
import { ArrowLeft, Save, ImagePlus, X} from"lucide-react";
import { useState} from"react";
import CustomSelect from"@/shared/components/CustomSelect";

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
 alert(`You can only upload up to 10 images. Only ${filesToAdd.length} more images were added.`);
}
 const newImages = filesToAdd.map(file => URL.createObjectURL(file));
 setImages(prev => [...prev, ...newImages]);
}
};

 const removeImage = (indexToRemove: number) => {
 setImages(prev => prev.filter((_, index) => index !== indexToRemove));
};
 return (
 <div className="flex flex-col gap-8 p-8 max-w-brand mx-auto w-full pb-24">
 <div className="flex items-center justify-between">
 <div>
 <div className="flex items-center gap-4 mb-2">
 <Link
 href="/products"
 className="p-2 rounded-global text-brand-text/50 hover:bg-brand-secondary-hover hover:text-brand-primary transition-colors"
 >
 <ArrowLeft className="w-5 h-5"/>
 </Link>
 <h1 className="text-brand-h1 font-bold tracking-tight text-brand-text">Add New Product</h1>
 </div>
 <p className="text-brand-text/70 text-brand-h3 ml-11">
 Create a new product by filling out all the required details below.
 </p>
 </div>
 </div>

 <form className="space-y-8">
 
 {/* Media */}
 <div className="rounded-global border-global border-brand-border-global bg-brand-surface p-8 shadow-sm">
 <h2 className="text-brand-h3 font-medium text-brand-text mb-6">Product Images</h2>
 <div className="col-span-full">
 <label className="block text-brand-body font-medium leading-6 text-brand-text">Upload Multiple Images (3:4 Ratio)</label>
 <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
 {images.map((img, idx) => (
 <div key={idx} className="relative aspect-[3/4] group border-global border-brand-border-global">
 <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover"/>
 <button
 type="button"
 onClick={() => removeImage(idx)}
 className="absolute top-2 right-2 p-1 bg-white/80 hover:bg-white text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
 >
 <X className="w-4 h-4"/>
 </button>
 </div>
 ))}
 <label htmlFor="file-upload"className="relative cursor-pointer flex flex-col items-center justify-center aspect-[3/4] rounded-global border-2 border-dashed border-brand-border-global bg-brand-input-bg/50 hover:bg-brand-secondary-hover hover:border-[#B89A5A]/50 transition-all text-center p-4">
 <ImagePlus className="mx-auto h-8 w-8 text-brand-text/50 mb-2"/>
 <span className="text-brand-body font-medium text-brand-primary">Add Images</span>
 <span className="text-brand-small text-brand-text/50 mt-1">PNG, JPG up to 5MB</span>
 <input id="file-upload"name="file-upload"type="file"className="sr-only"multiple accept="image/*"onChange={handleImageChange} />
 </label>
 </div>
 </div>
 </div>

 {/* Basic Information */}
 <div className="rounded-global border-global border-brand-border-global bg-brand-surface p-8 shadow-sm">
 <h2 className="text-brand-h3 font-medium text-brand-text mb-6">Basic Information</h2>
 <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
 <div className="sm:col-span-2">
 <label htmlFor="name"className="block text-brand-body font-medium leading-6 text-brand-text">Product Name *</label>
 <div className="mt-2">
 <input type="text"name="name"id="name"required className="block w-full rounded-global border-0 bg-brand-input-bg py-2.5 px-4 text-brand-text shadow-sm ring-1 ring-inset ring-transparent focus:ring-2 focus:ring-inset focus:ring-brand-focus-ring focus:bg-brand-secondary-hover sm:text-brand-body sm:leading-6 transition-all"/>
 </div>
 </div>

 <div className="sm:col-span-2">
 <label htmlFor="slug"className="block text-brand-body font-medium leading-6 text-brand-text">Slug (URL snippet) *</label>
 <div className="mt-2">
 <input type="text"name="slug"id="slug"required placeholder="e.g. elegant-evening-gown"className="block w-full rounded-global border-0 bg-brand-input-bg py-2.5 px-4 text-brand-text placeholder:text-brand-text/40 shadow-sm ring-1 ring-inset ring-transparent focus:ring-2 focus:ring-inset focus:ring-brand-focus-ring focus:bg-brand-secondary-hover sm:text-brand-body sm:leading-6 transition-all"/>
 </div>
 </div>

 <div className="sm:col-span-2">
 <label htmlFor="description"className="block text-brand-body font-medium leading-6 text-brand-text">Description</label>
 <div className="mt-2">
 <textarea id="description"name="description"rows={5} className="block w-full rounded-global border-0 bg-brand-input-bg py-2.5 px-4 text-brand-text shadow-sm ring-1 ring-inset ring-transparent focus:ring-2 focus:ring-inset focus:ring-brand-focus-ring focus:bg-brand-secondary-hover sm:text-brand-body sm:leading-6 transition-all resize-none"></textarea>
 </div>
 </div>
 </div>
 </div>

 {/* Pricing & Inventory */}
 <div className="rounded-global border-global border-brand-border-global bg-brand-surface p-8 shadow-sm">
 <h2 className="text-brand-h3 font-medium text-brand-text mb-6">Pricing & Inventory</h2>
 <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-8">
 <div>
 <label htmlFor="price"className="block text-brand-body font-medium leading-6 text-brand-text">Price (₹) *</label>
 <div className="mt-2">
 <input type="number"step="0.01"name="price"id="price"required className="block w-full rounded-global border-0 bg-brand-input-bg py-2.5 px-4 text-brand-text shadow-sm ring-1 ring-inset ring-transparent focus:ring-2 focus:ring-inset focus:ring-brand-focus-ring focus:bg-brand-secondary-hover sm:text-brand-body sm:leading-6 transition-all"/>
 </div>
 </div>

 <div>
 <label htmlFor="salePrice"className="block text-brand-body font-medium leading-6 text-brand-text">Sale Price (₹)</label>
 <div className="mt-2">
 <input type="number"step="0.01"name="salePrice"id="salePrice"className="block w-full rounded-global border-0 bg-brand-input-bg py-2.5 px-4 text-brand-text shadow-sm ring-1 ring-inset ring-transparent focus:ring-2 focus:ring-inset focus:ring-brand-focus-ring focus:bg-brand-secondary-hover sm:text-brand-body sm:leading-6 transition-all"/>
 </div>
 </div>

 <div>
 <label htmlFor="stock"className="block text-brand-body font-medium leading-6 text-brand-text">Global Stock Quantity</label>
 <div className="mt-2">
 <input type="number"name="stock"id="stock"defaultValue={0} className="block w-full rounded-global border-0 bg-brand-input-bg py-2.5 px-4 text-brand-text shadow-sm ring-1 ring-inset ring-transparent focus:ring-2 focus:ring-inset focus:ring-brand-focus-ring focus:bg-brand-secondary-hover sm:text-brand-body sm:leading-6 transition-all"/>
 </div>
 </div>
 </div>
 </div>

 {/* Organization */}
 <div className="rounded-global border-global border-brand-border-global bg-brand-surface p-8 shadow-sm">
 <h2 className="text-brand-h3 font-medium text-brand-text mb-6">Organization</h2>
 <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
 <div>
 <label className="block text-brand-body font-medium leading-6 text-brand-text mb-2">Collection</label>
 <CustomSelect
 name="category"
 value={category}
 onChange={setCategory}
 placeholder="Select a collection"
 options={[
 { value:"rings", label:"Rings"},
 { value:"necklaces", label:"Necklaces"},
 { value:"earrings", label:"Earrings"},
 { value:"bracelets", label:"Bracelets"},
 { value:"watches", label:"Watches"},
 { value:"accessories", label:"Accessories"}
 ]}
 />
 </div>

 <div>
 <label htmlFor="tags"className="block text-brand-body font-medium leading-6 text-brand-text">Tags (Comma separated)</label>
 <div className="mt-2">
 <input type="text"name="tags"id="tags"placeholder="e.g. diamond, elegant, 18k gold"className="block w-full rounded-global border-0 bg-brand-input-bg py-2.5 px-4 text-brand-text placeholder:text-brand-text/40 shadow-sm ring-1 ring-inset ring-transparent focus:ring-2 focus:ring-inset focus:ring-brand-focus-ring focus:bg-brand-secondary-hover sm:text-brand-body sm:leading-6 transition-all"/>
 </div>
 </div>
 </div>
 </div>

 {/* Status & Visibility */}
 <div className="rounded-global border-global border-brand-border-global bg-brand-surface p-8 shadow-sm">
 <h2 className="text-brand-h3 font-medium text-brand-text mb-6">Status & Visibility</h2>
 <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
 <div>
 <label className="block text-brand-body font-medium leading-6 text-brand-text mb-2">Status</label>
 <CustomSelect
 name="status"
 value={status}
 onChange={setStatus}
 options={[
 { value:"active", label:"Active"},
 { value:"draft", label:"Draft"},
 { value:"archived", label:"Archived"}
 ]}
 />
 </div>

 <div className="flex flex-col justify-center space-y-4 pt-6">
 <div className="relative flex items-start">
 <div className="flex h-6 items-center">
 <input id="featured"name="featured"type="checkbox"className="h-4 w-4 rounded-global border-brand-border-global bg-brand-input-bg text-brand-primary focus:ring-brand-primary"/>
 </div>
 <div className="ml-3 text-brand-body leading-6">
 <label htmlFor="featured"className="font-medium text-brand-text">Featured Product</label>
 <p className="text-brand-text/60">Show this product on the home page featured section.</p>
 </div>
 </div>

 <div className="relative flex items-start">
 <div className="flex h-6 items-center">
 <input id="isNewArrival"name="isNewArrival"type="checkbox"className="h-4 w-4 rounded-global border-brand-border-global bg-brand-input-bg text-brand-primary focus:ring-brand-primary"/>
 </div>
 <div className="ml-3 text-brand-body leading-6">
 <label htmlFor="isNewArrival"className="font-medium text-brand-text">New Arrival</label>
 <p className="text-brand-text/60">Mark this product as a new arrival.</p>
 </div>
 </div>

 <div className="relative flex items-start">
 <div className="flex h-6 items-center">
 <input id="isBestSeller"name="isBestSeller"type="checkbox"className="h-4 w-4 rounded-global border-brand-border-global bg-brand-input-bg text-brand-primary focus:ring-brand-primary"/>
 </div>
 <div className="ml-3 text-brand-body leading-6">
 <label htmlFor="isBestSeller"className="font-medium text-brand-text">Best Seller</label>
 <p className="text-brand-text/60">Add a Best Seller badge to this product.</p>
 </div>
 </div>
 </div>
 </div>
 </div>


 {/* SEO */}
 <div className="rounded-global border-global border-brand-border-global bg-brand-surface p-8 shadow-sm">
 <h2 className="text-brand-h3 font-medium text-brand-text mb-6">Search Engine Optimization</h2>
 <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
 <div className="sm:col-span-2">
 <label htmlFor="seoTitle"className="block text-brand-body font-medium leading-6 text-brand-text">SEO Title</label>
 <div className="mt-2">
 <input type="text"name="seoTitle"id="seoTitle"className="block w-full rounded-global border-0 bg-brand-input-bg py-2.5 px-4 text-brand-text shadow-sm ring-1 ring-inset ring-transparent focus:ring-2 focus:ring-inset focus:ring-brand-focus-ring focus:bg-brand-secondary-hover sm:text-brand-body sm:leading-6 transition-all"/>
 </div>
 </div>

 <div className="sm:col-span-2">
 <label htmlFor="seoDescription"className="block text-brand-body font-medium leading-6 text-brand-text">SEO Description</label>
 <div className="mt-2">
 <textarea id="seoDescription"name="seoDescription"rows={3} className="block w-full rounded-global border-0 bg-brand-input-bg py-2.5 px-4 text-brand-text shadow-sm ring-1 ring-inset ring-transparent focus:ring-2 focus:ring-inset focus:ring-brand-focus-ring focus:bg-brand-secondary-hover sm:text-brand-body sm:leading-6 transition-all resize-none"></textarea>
 </div>
 </div>
 </div>
 </div>

 <div className="flex justify-end gap-x-4 pt-6 pb-20">
 <Link href="/products"className="flex items-center text-brand-body font-semibold leading-6 text-brand-text/70 hover:text-brand-text">Cancel</Link>
 <button type="submit"className="flex items-center gap-2 rounded-global bg-brand-primary px-8 py-2.5 text-brand-body font-semibold text-brand-secondary shadow-sm hover:bg-brand-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary transition-colors">
 <Save className="w-4 h-4"/>
 Save Product
 </button>
 </div>
 </form>
 </div>
 );
}
