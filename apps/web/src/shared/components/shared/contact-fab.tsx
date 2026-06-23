import { Phone } from "lucide-react";

import { WhatsAppIcon } from "@/shared/components/shared/whatsapp-icon";
import { CONTACT_PHONE_DISPLAY } from "@/shared/lib/constants";
import { getTelHref, getWhatsAppHref } from "@/shared/lib/contact";
import { cn } from "@/shared/lib/utils";

const fabClass = cn(
  "flex size-12 items-center justify-center rounded-global shadow-lg transition-transform",
  "hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
);

export function ContactFab() {
  return (
    <div
      className="fixed right-4 bottom-6 z-40 flex flex-col gap-3 pb-[env(safe-area-inset-bottom)] sm:right-6"
      aria-label="Quick contact"
    >
      <a
        href={getWhatsAppHref()}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          fabClass,
          "rounded-full bg-[#0f4a3a] text-[#F5F0E8] shadow-primary/25 focus-visible:ring-primary hover:bg-[#145242]"
        )}
        aria-label={`Chat on WhatsApp at ${CONTACT_PHONE_DISPLAY}`}
      >
        <WhatsAppIcon className="size-6" />
      </a>
    </div>
  );
}
