import { product} from"../../features/products/schema/product";
import { category} from"../../features/categories/schema/category";
import { brand} from"./brand";
import { customer} from"../../features/customers/schema/customer";
import { coupon} from"./coupon";
import { orderRequest} from"../../features/orders/schema/orderRequest";
import { banner} from"./banner";
import { faq} from"./faq";
import { testimonial} from"./testimonial";
import { settings} from"./settings";

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
