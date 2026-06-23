import { Phone} from"lucide-react";
import { CONTACT_PHONE_DISPLAY} from"@/lib/constants";
import { getTelHref, getWhatsAppHref} from"@/lib/contact";
import { WhatsAppIcon} from"@/components/shared/whatsapp-icon";
import { cn} from"@/lib/utils";

const fabClass = cn(
"flex size-12 items-center justify-center rounded-global shadow-lg transition-transform",
"hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
);

export function ContactFab() {
 return (
 <div
 className="fixed bottom-6 right-4 z-40 flex flex-col gap-3 pb-[env(safe-area-inset-bottom)] sm:right-6"
 aria-label="Quick contact"
 >
 <a
 href={getWhatsAppHref()}
 target="_blank"
 rel="noopener noreferrer"
 className={cn(fabClass,"bg-brand-primary text-brand-primary-foreground shadow-primary/25 focus-visible:ring-primary")}
 aria-label={`Chat on WhatsApp at ${CONTACT_PHONE_DISPLAY}`}
 >
 <WhatsAppIcon className="size-6"/>
 </a>
 </div>
 );
}
