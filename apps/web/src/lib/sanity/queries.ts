export const PRODUCTS_QUERY = `*[_type == "product" && status == "active"] | order(_createdAt desc) {
  _id, name, slug, description, shortDescription, price, compareAtPrice,
  images, stock, status, featured, isNewArrival, isBestSeller,
  specifications, features, tags, seoTitle, seoDescription, _createdAt,
  "category": category->{ _id, name, slug },
  "brand": brand->{ _id, name, slug }
}`;

export const PRODUCT_BY_SLUG_QUERY = `*[_type == "product" && slug.current == $slug][0] {
  _id, name, slug, description, shortDescription, price, compareAtPrice,
  images, stock, status, featured, isNewArrival, isBestSeller,
  specifications, features, tags, seoTitle, seoDescription, _createdAt, variants,
  "category": category->{ _id, name, slug },
  "brand": brand->{ _id, name, slug }
}`;

export const FEATURED_PRODUCTS_QUERY = `*[_type == "product" && status == "active" && featured == true] | order(_createdAt desc)[0...8] {
  _id, name, slug, price, compareAtPrice, images, stock, shortDescription,
  "category": category->{ _id, name, slug },
  "brand": brand->{ _id, name, slug }
}`;

export const NEW_ARRIVALS_QUERY = `*[_type == "product" && status == "active" && isNewArrival == true] | order(_createdAt desc)[0...8] {
  _id, name, slug, price, compareAtPrice, images, stock, shortDescription,
  "category": category->{ _id, name, slug }
}`;

export const BEST_SELLERS_QUERY = `*[_type == "product" && status == "active" && isBestSeller == true] | order(_createdAt desc)[0...8] {
  _id, name, slug, price, compareAtPrice, images, stock, shortDescription,
  "category": category->{ _id, name, slug }
}`;

export const CATEGORIES_QUERY = `*[_type == "category"] | order(order asc) {
  _id, name, slug, description, image, featured, order,
  "productCount": count(*[_type == "product" && references(^._id) && status == "active"])
}`;

export const BRANDS_QUERY = `*[_type == "brand"] | order(name asc) { _id, name, slug, description, logo, website }`;

export const BANNERS_QUERY = `*[_type == "banner" && active == true] | order(order asc) {
  _id, title, subtitle, description, image, link, buttonText, type, order
}`;

export const FAQS_QUERY = `*[_type == "faq"] | order(order asc) { _id, question, answer, category, order }`;

export const TESTIMONIALS_QUERY = `*[_type == "testimonial"] | order(_createdAt desc) {
  _id, name, role, content, rating, avatar, featured
}`;

export const SETTINGS_QUERY = `*[_type == "settings"][0] {
  _id, storeName, storeDescription, logo, whatsappNumber, email, phone, address,
  socialLinks, seoTitle, seoDescription, currency, currencySymbol
}`;

export const REVIEWS_BY_PRODUCT_QUERY = `*[_type == "review" && product._ref == $productId && approved == true] | order(_createdAt desc) {
  _id, userName, rating, title, comment, images, verified, _createdAt,
  "user": user->{ _id, name, avatar }
}`;

export const RELATED_PRODUCTS_QUERY = `*[_type == "product" && status == "active" && category._ref == $categoryId && _id != $productId][0...4] {
  _id, name, slug, price, compareAtPrice, images, stock, shortDescription
}`;

export const ORDER_REQUESTS_QUERY = `*[_type == "orderRequest"] | order(_createdAt desc) {
  _id, orderNumber, customer, items, totalItems, grandTotal, status, type, notes, _createdAt,
  "user": user->{ _id, name, email }
}`;

export const USERS_QUERY = `*[_type == "user"] | order(_createdAt desc) {
  _id, name, email, phone, role, emailVerified, _createdAt
}`;

export const COUPONS_QUERY = `*[_type == "coupon"] | order(_createdAt desc) {
  _id, code, description, discountType, discountValue, minOrderAmount, maxDiscount,
  usageLimit, usedCount, expiryDate, active
}`;

export const DASHBOARD_STATS_QUERY = `{
  "totalProducts": count(*[_type == "product"]),
  "totalCategories": count(*[_type == "category"]),
  "totalUsers": count(*[_type == "user"]),
  "totalOrderRequests": count(*[_type == "orderRequest"])
}`;

export const USER_BY_EMAIL_QUERY = `*[_type == "user" && email == $email][0] {
  _id, name, email, password, phone, role, emailVerified, addresses, wishlist
}`;

export const USER_BY_ID_QUERY = `*[_type == "user" && _id == $id][0] {
  _id, name, email, phone, role, emailVerified, addresses, wishlist
}`;

export const ALL_PRODUCTS_ADMIN_QUERY = `*[_type == "product"] | order(_createdAt desc) {
  _id, name, slug, price, stock, status, featured, images, _createdAt,
  "category": category->{ name },
  "brand": brand->{ name }
}`;
