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
          "bg-brand-primary text-brand-primary-foreground shadow-primary/25 focus-visible:ring-primary"
        )}
        aria-label={`Chat on WhatsApp at ${CONTACT_PHONE_DISPLAY}`}
      >
        <WhatsAppIcon className="size-6" />
      </a>
    </div>
  );
}
