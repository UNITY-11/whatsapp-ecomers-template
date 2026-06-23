"use client";

import { useState } from "react";
import { ArrowLeft, Plus, Star, Trash2 } from "lucide-react";

const MOCK_PRODUCTS = [
  { id: "1", name: "Elegant Evening Gown", image: "https://via.placeholder.com/150" },
  { id: "2", name: "Diamond Ring", image: "https://via.placeholder.com/150" },
  { id: "3", name: "Summer Dress", image: "https://via.placeholder.com/150" },
];

const INITIAL_MOCK_REVIEWS = [
  {
    id: "1",
    productId: "1",
    reviewer: "Jane Doe",
    rating: 5,
    title: "Beautiful!",
    comment: "Loved it.",
    date: "2026-06-01",
  },
  {
    id: "2",
    productId: "2",
    reviewer: "John Smith",
    rating: 4,
    title: "Great",
    comment: "Very nice.",
    date: "2026-06-05",
  },
];

export default function ReviewsDashboard() {
  const [view, setView] = useState<"list" | "select-product" | "product-reviews">("list");
  const [selectedProduct, setSelectedProduct] = useState<Record<string, any> | null>(null);
  const [reviews, setReviews] = useState(INITIAL_MOCK_REVIEWS);

  const handleDeleteReview = (id: string) => {
    if (confirm("Are you sure you want to delete this review?")) {
      setReviews((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const renderList = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-brand-h1 text-brand-text font-bold tracking-tight">All Reviews</h1>
        <button
          onClick={() => setView("select-product")}
          className="rounded-global bg-brand-primary text-brand-body text-brand-secondary hover:bg-brand-primary-hover flex items-center gap-2 px-6 py-2.5 font-semibold shadow-sm transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Review
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => {
          const product = MOCK_PRODUCTS.find((p) => p.id === review.productId);
          return (
            <div
              key={review.id}
              className="border-global border-brand-border-global group relative flex h-full flex-col bg-white p-6 shadow-sm transition-colors hover:border-[#B89A5A]/50"
            >
              <div className="mb-2 flex items-start justify-between">
                <h3 className="text-brand-text text-brand-h3 line-clamp-1 pr-2 leading-tight font-semibold">
                  {review.title}
                </h3>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="text-brand-small text-brand-text/50">{review.date}</span>
                  <button
                    onClick={() => handleDeleteReview(review.id)}
                    className="-mr-2 p-1 text-red-500 opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-700"
                    title="Delete Review"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="text-brand-accent mb-3 flex">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-brand-body text-brand-text/80 flex-grow leading-relaxed">
                {review.comment}
              </p>
              <div className="border-brand-border-global/50 text-brand-small text-brand-text/60 mt-4 border-t pt-4">
                <span className="font-medium">By {review.reviewer}</span> on{" "}
                <span className="text-brand-text font-semibold">{product?.name}</span>
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
        <button
          onClick={() => setView("list")}
          className="text-brand-text/50 hover:bg-brand-secondary-hover hover:text-brand-primary p-2 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-brand-h1 text-brand-text font-bold tracking-tight">Select a Product</h1>
      </div>
      <p className="text-brand-text/70">Choose a product to view its reviews or add a new one.</p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {MOCK_PRODUCTS.map((product) => (
          <div
            key={product.id}
            onClick={() => {
              setSelectedProduct(product);
              setView("product-reviews");
            }}
            className="border-global border-brand-border-global bg-brand-surface hover:bg-brand-secondary-hover group cursor-pointer p-4 transition-all hover:border-[#B89A5A]/50"
          >
            <div className="bg-brand-input-bg text-brand-text/30 group-hover:bg-brand-border-global mb-4 flex aspect-[3/4] items-center justify-center transition-colors">
              Product Image
            </div>
            <h3 className="text-brand-text text-center font-semibold">{product.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProductReviews = () => {
    const productReviews = reviews.filter((r) => r.productId === selectedProduct?.id);

    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setView("select-product")}
            className="text-brand-text/50 hover:bg-brand-secondary-hover hover:text-brand-primary p-2 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-brand-h1 text-brand-text font-bold tracking-tight">
            Reviews for {selectedProduct?.name}
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <h2 className="text-brand-h2 text-brand-text font-semibold">Current Reviews</h2>
            {productReviews.length > 0 ? (
              <div className="space-y-4">
                {productReviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-global border-brand-border-global group relative bg-white p-6"
                  >
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="absolute top-6 right-6 p-1 text-red-500 opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-700"
                      title="Delete Review"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div className="mb-2 flex items-start justify-between pr-8">
                      <h3 className="text-brand-text text-brand-h3 font-semibold">
                        {review.title}
                      </h3>
                      <span className="text-brand-small text-brand-text/50">{review.date}</span>
                    </div>
                    <div className="text-brand-accent my-2 flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-brand-body text-brand-text/80 leading-relaxed">
                      {review.comment}
                    </p>
                    <p className="text-brand-small text-brand-text/60 mt-4 font-medium">
                      — {review.reviewer}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-brand-surface border-global border-brand-border-global p-12 text-center">
                <p className="text-brand-text/60">No reviews yet for this product.</p>
              </div>
            )}
          </div>

          <div className="bg-brand-surface border-global border-brand-border-global sticky top-8 h-fit p-8 shadow-sm">
            <h2 className="text-brand-h2 text-brand-text mb-6 font-semibold">Add New Review</h2>
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Review added!");
                setView("list");
              }}
            >
              <div>
                <label className="text-brand-body text-brand-text block font-medium">
                  Reviewer Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jane Doe"
                  className="rounded-global bg-brand-input-bg text-brand-text focus:ring-brand-focus-ring focus:bg-brand-secondary-hover sm:text-brand-body mt-2 block w-full border-0 px-3 py-2.5 shadow-sm ring-1 ring-transparent transition-all ring-inset focus:ring-2"
                />
              </div>
              <div>
                <label className="text-brand-body text-brand-text block font-medium">
                  Rating (1-5)
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  defaultValue="5"
                  required
                  className="rounded-global bg-brand-input-bg text-brand-text focus:ring-brand-focus-ring focus:bg-brand-secondary-hover sm:text-brand-body mt-2 block w-full border-0 px-3 py-2.5 shadow-sm ring-1 ring-transparent transition-all ring-inset focus:ring-2"
                />
              </div>
              <div>
                <label className="text-brand-body text-brand-text block font-medium">
                  Review Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="Great product!"
                  className="rounded-global bg-brand-input-bg text-brand-text focus:ring-brand-focus-ring focus:bg-brand-secondary-hover sm:text-brand-body mt-2 block w-full border-0 px-3 py-2.5 shadow-sm ring-1 ring-transparent transition-all ring-inset focus:ring-2"
                />
              </div>
              <div>
                <label className="text-brand-body text-brand-text block font-medium">Comment</label>
                <textarea
                  rows={4}
                  required
                  className="rounded-global bg-brand-input-bg text-brand-text focus:ring-brand-focus-ring focus:bg-brand-secondary-hover sm:text-brand-body mt-2 block w-full resize-none border-0 px-3 py-2.5 shadow-sm ring-1 ring-transparent transition-all ring-inset focus:ring-2"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-brand-primary text-brand-secondary hover:bg-brand-primary-hover mt-2 w-full py-3 font-semibold shadow-sm transition-colors"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-brand mx-auto flex min-h-[calc(100vh-64px)] w-full flex-col p-8 pb-24">
      {view === "list" && renderList()}
      {view === "select-product" && renderSelectProduct()}
      {view === "product-reviews" && renderProductReviews()}
    </div>
  );
}
