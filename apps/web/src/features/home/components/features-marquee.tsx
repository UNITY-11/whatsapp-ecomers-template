import { Truck, Store, Gift, MapPin, Smartphone, Map, HelpCircle} from"lucide-react";

export function FeaturesMarquee() {
 const items = [
 { icon: Truck, text:"Free Shipping"},
 { icon: Store, text:"Return To Store"},
 { icon: Gift, text:"Online Gift Card"},
 { icon: MapPin, text:"Delivering To"},
 { icon: Smartphone, text:"Download Our Apps"},
 { icon: Map, text:"Store Locator"},
 { icon: HelpCircle, text:"Help"},
 ];

 // We duplicate the items 4 times to ensure smooth infinite scrolling even on ultra-wide screens.
 // The CSS marquee animation translates -50%, so the container has two identical halves.
 const duplicatedItems = [...items, ...items, ...items, ...items];

 return (
 <div className="w-full bg-brand-primary text-brand-primary-foreground overflow-hidden py-3 flex items-center border-t border-brand-primary-foreground/10">
 <div 
 className="flex w-max animate-marquee pause-on-hover"
 style={{"--marquee-duration":"40s"} as React.CSSProperties}
 >
 {duplicatedItems.map((item, i) => (
 <div 
 key={i} 
 className="flex items-center gap-2 px-8 sm:px-12 border-r border-brand-primary-foreground/20 shrink-0"
 >
 <item.icon className="h-4 w-4 sm:h-5 sm:w-5"/>
 <span className="text-xs sm:text-sm font-medium tracking-wide whitespace-nowrap">{item.text}</span>
 </div>
 ))}
 </div>
 </div>
 );
}
