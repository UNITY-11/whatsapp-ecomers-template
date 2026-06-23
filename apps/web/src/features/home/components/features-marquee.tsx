import { Gift, HelpCircle, Map, MapPin, Smartphone, Store, Truck } from "lucide-react";

export function FeaturesMarquee() {
  const items = [
    { icon: Truck, text: "Free Shipping" },
    { icon: Store, text: "Return To Store" },
    { icon: Gift, text: "Online Gift Card" },
    { icon: MapPin, text: "Delivering To" },
    { icon: Smartphone, text: "Download Our Apps" },
    { icon: Map, text: "Store Locator" },
    { icon: HelpCircle, text: "Help" },
  ];

  // We duplicate the items 4 times to ensure smooth infinite scrolling even on ultra-wide screens.
  // The CSS marquee animation translates -50%, so the container has two identical halves.
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="bg-[#0F4A3A] text-[#F5F0E8] border-[#F5F0E8]/10 flex w-full items-center overflow-hidden border-t py-3">
      <div
        className="animate-marquee pause-on-hover flex w-max"
        style={{ "--marquee-duration": "40s" } as React.CSSProperties}
      >
        {duplicatedItems.map((item, i) => (
          <div
            key={i}
            className="border-[#F5F0E8]/20 flex shrink-0 items-center gap-2 border-r px-8 sm:px-12"
          >
            <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-xs font-medium tracking-wide whitespace-nowrap sm:text-sm">
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
