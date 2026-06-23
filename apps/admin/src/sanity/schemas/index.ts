import { category } from "../../features/categories/schema/category";
import { customer } from "../../features/customers/schema/customer";
import { orderRequest } from "../../features/orders/schema/orderRequest";
import { product } from "../../features/products/schema/product";
import { banner } from "./banner";
import { brand } from "./brand";
import { coupon } from "./coupon";
import { faq } from "./faq";
import { settings } from "./settings";
import { testimonial } from "./testimonial";

export const schemaTypes = [
  product,
  category,
  brand,
  customer,
  coupon,
  orderRequest,
  banner,
  faq,
  testimonial,
  settings,
];
