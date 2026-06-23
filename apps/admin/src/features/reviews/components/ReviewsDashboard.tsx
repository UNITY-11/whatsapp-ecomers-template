"use client";

import { useState } from "react";
import { Star, Plus, ArrowLeft, Trash2 } from "lucide-react";

const MOCK_PRODUCTS = [
  { id: "1", name: "Elegant Evening Gown", image: "https://via.placeholder.com/150" },
  { id: "2", name: "Diamond Ring", image: "https://via.placeholder.com/150" },
  { id: "3", name: "Summer Dress", image: "https://via.placeholder.com/150" }
];

const INITIAL_MOCK_REVIEWS = [
  { id: "1", productId: "1", reviewer: "Jane Doe", rating: 5, title: "Beautiful!", comment: "Loved it.", date: "2026-06-01" },
  { id: "2", productId: "2", reviewer: "John Smith", rating: 4, title: "Great", comment: "Very nice.", date: "2026-06-05" },
];

export default function ReviewsDashboard() {
  const [view, setView] = useState<"list" | "select-product" | "product-reviews">("list");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [reviews, setReviews] = useState(INITIAL_MOCK_REVIEWS);

  const handleDeleteReview = (id: string) => {
    if (confirm("Are you sure you want to delete this review?")) {
      setReviews(prev => prev.filter(r => r.id !== id));
    }
  };

  const renderList = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-[#1a2e28]">All Reviews</h1>
        <button
          onClick={() => setView("select-product")}
          className="flex items-center gap-2 rounded-none bg-[#0F4A3A] px-6 py-2.5 text-sm font-semibold text-[#F5F0E8] shadow-sm hover:bg-[#145242] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Review
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => {
          const product = MOCK_PRODUCTS.find(p => p.id === review.productId);
          return (
            <div key={review.id} className="p-6 border border-[#ddd5c8] bg-white relative group flex flex-col h-full hover:border-[#B89A5A]/50 transition-colors shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-[#1a2e28] text-lg leading-tight line-clamp-1 pr-2">{review.title}</h3>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-[#1a2e28]/50">{review.date}</span>
                  <button 
                    onClick={() => handleDeleteReview(review.id)}
                    className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity p-1 -mr-2"
                    title="Delete Review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex text-[#B89A5A] mb-3">
                {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-sm text-[#1a2e28]/80 leading-relaxed flex-grow">{review.comment}</p>
              <div className="mt-4 pt-4 border-t border-[#ddd5c8]/50 text-xs text-[#1a2e28]/60">
                <span className="font-medium">By {review.reviewer}</span> on <span className="font-semibold text-[#1a2e28]">{product?.name}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderSelectProduct = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => setView("list")} className="p-2 text-[#1a2e28]/50 hover:bg-[#ebe4d8] hover:text-[#0F4A3A] transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-3xl font-bold tracking-tight text-[#1a2e28]">Select a Product</h1>
      </div>
      <p className="text-[#1a2e28]/70">Choose a product to view its reviews or add a new one.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {MOCK_PRODUCTS.map(product => (
          <div 
            key={product.id} 
            onClick={() => {
              setSelectedProduct(product);
              setView("product-reviews");
            }}
            className="cursor-pointer border border-[#ddd5c8] bg-[#faf7f2] p-4 hover:border-[#B89A5A]/50 hover:bg-[#ebe4d8] transition-all group"
          >
            <div className="aspect-[3/4] bg-[#e8e0d4] mb-4 flex items-center justify-center text-[#1a2e28]/30 group-hover:bg-[#ddd5c8] transition-colors">
              Product Image
            </div>
            <h3 className="font-semibold text-[#1a2e28] text-center">{product.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProductReviews = () => {
    const productReviews = reviews.filter(r => r.productId === selectedProduct?.id);

    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <button onClick={() => setView("select-product")} className="p-2 text-[#1a2e28]/50 hover:bg-[#ebe4d8] hover:text-[#0F4A3A] transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-3xl font-bold tracking-tight text-[#1a2e28]">Reviews for {selectedProduct?.name}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-semibold text-[#1a2e28]">Current Reviews</h2>
            {productReviews.length > 0 ? (
              <div className="space-y-4">
                {productReviews.map(review => (
                  <div key={review.id} className="p-6 border border-[#ddd5c8] bg-white relative group">
                    <button 
                      onClick={() => handleDeleteReview(review.id)}
                      className="absolute top-6 right-6 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                      title="Delete Review"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="flex justify-between items-start mb-2 pr-8">
                      <h3 className="font-semibold text-[#1a2e28] text-lg">{review.title}</h3>
                      <span className="text-xs text-[#1a2e28]/50">{review.date}</span>
                    </div>
                    <div className="flex text-[#B89A5A] my-2">
                      {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                    </div>
                    <p className="text-sm text-[#1a2e28]/80 leading-relaxed">{review.comment}</p>
                    <p className="text-xs text-[#1a2e28]/60 mt-4 font-medium">— {review.reviewer}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-[#faf7f2] border border-[#ddd5c8] p-12 text-center">
                <p className="text-[#1a2e28]/60">No reviews yet for this product.</p>
              </div>
            )}
          </div>

          <div className="bg-[#faf7f2] border border-[#ddd5c8] p-8 h-fit sticky top-8 shadow-sm">
            <h2 className="text-xl font-semibold text-[#1a2e28] mb-6">Add New Review</h2>
            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert("Review added!"); setView("list"); }}>
              <div>
                <label className="block text-sm font-medium text-[#1a2e28]">Reviewer Name</label>
                <input type="text" required placeholder="e.g. Jane Doe" className="mt-2 block w-full rounded-none border-0 bg-[#e8e0d4] py-2.5 px-3 text-[#1a2e28] shadow-sm ring-1 ring-inset ring-transparent focus:ring-2 focus:ring-[#B89A5A]/50 focus:bg-[#ebe4d8] sm:text-sm transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1a2e28]">Rating (1-5)</label>
                <input type="number" min="1" max="5" defaultValue="5" required className="mt-2 block w-full rounded-none border-0 bg-[#e8e0d4] py-2.5 px-3 text-[#1a2e28] shadow-sm ring-1 ring-inset ring-transparent focus:ring-2 focus:ring-[#B89A5A]/50 focus:bg-[#ebe4d8] sm:text-sm transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1a2e28]">Review Title</label>
                <input type="text" required placeholder="Great product!" className="mt-2 block w-full rounded-none border-0 bg-[#e8e0d4] py-2.5 px-3 text-[#1a2e28] shadow-sm ring-1 ring-inset ring-transparent focus:ring-2 focus:ring-[#B89A5A]/50 focus:bg-[#ebe4d8] sm:text-sm transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1a2e28]">Comment</label>
                <textarea rows={4} required className="mt-2 block w-full rounded-none border-0 bg-[#e8e0d4] py-2.5 px-3 text-[#1a2e28] shadow-sm ring-1 ring-inset ring-transparent focus:ring-2 focus:ring-[#B89A5A]/50 focus:bg-[#ebe4d8] sm:text-sm transition-all resize-none"></textarea>
              </div>
              <button type="submit" className="w-full bg-[#0F4A3A] text-[#F5F0E8] py-3 font-semibold shadow-sm hover:bg-[#145242] transition-colors mt-2">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col p-8 max-w-7xl mx-auto w-full pb-24 min-h-[calc(100vh-64px)]">
      {view === "list" && renderList()}
      {view === "select-product" && renderSelectProduct()}
      {view === "product-reviews" && renderProductReviews()}
    </div>
  );
}
