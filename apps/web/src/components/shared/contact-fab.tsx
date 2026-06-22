import { Phone } from "lucide-react";
import { CONTACT_PHONE_DISPLAY } from "@/lib/constants";
import { getTelHref, getWhatsAppHref } from "@/lib/contact";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { cn } from "@/lib/utils";

const fabClass = cn(
  "flex size-12 items-center justify-center rounded-full shadow-lg transition-transform",
  "hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
);

export function ContactFab() {
  return (
    <div
      className="fixed bottom-6 right-4 z-40 flex flex-col gap-3 pb-[env(safe-area-inset-bottom)] sm:right-6"
      aria-label="Quick contact"
    >
      <a
        href={getTelHref()}
        className={cn(fabClass, "bg-primary text-primary-foreground shadow-primary/25 focus-visible:ring-primary")}
        aria-label={`Call us at ${CONTACT_PHONE_DISPLAY}`}
      >
        <Phone className="size-5" strokeWidth={2.25} />
      </a>
      <a
        href={getWhatsAppHref()}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(fabClass, "bg-[#25D366] text-white shadow-[#25D366]/30 focus-visible:ring-[#25D366]")}
        aria-label={`Chat on WhatsApp at ${CONTACT_PHONE_DISPLAY}`}
      >
        <WhatsAppIcon className="size-6" />
      </a>
    </div>
  );
}
