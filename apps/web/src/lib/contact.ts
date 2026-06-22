import { CONTACT_PHONE_DISPLAY, WHATSAPP_NUMBER } from "@/lib/constants";

export { CONTACT_PHONE_DISPLAY };

export function getTelHref(phone: string = WHATSAPP_NUMBER): string {
  return `tel:+${phone}`;
}

export function getWhatsAppHref(
  message = "Hello Calira Couture, I'd like to get in touch.",
  phone: string = WHATSAPP_NUMBER
): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
