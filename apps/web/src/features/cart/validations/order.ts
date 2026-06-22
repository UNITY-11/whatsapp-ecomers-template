import { z } from "zod";

export const orderCustomerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  address: z.string().min(5, "Address is required"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
});

export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  title: z.string().min(3, "Title is required"),
  comment: z.string().min(10, "Review must be at least 10 characters"),
});

export type OrderCustomerInput = z.infer<typeof orderCustomerSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
