import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser, logoutAction } from "@/actions/auth-actions";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, MapPin, ShoppingBag, Heart, Settings, LogOut } from "lucide-react";

const accountLinks = [
  { href: "/account/profile", label: "Profile", icon: User, description: "Manage your personal information" },
  { href: "/account/addresses", label: "Addresses", icon: MapPin, description: "Manage delivery addresses" },
  { href: "/account/orders", label: "Order Requests", icon: ShoppingBag, description: "View your order history" },
  { href: "/wishlist", label: "Wishlist", icon: Heart, description: "Your saved items" },
  { href: "/account/settings", label: "Settings", icon: Settings, description: "Account preferences" },
];

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <Container className="py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">My Account</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}</p>
        </div>
        <form action={async () => { "use server"; await logoutAction(); redirect("/"); }}>
          <Button variant="outline" type="submit">
            <LogOut className="h-4 w-4 mr-2" /> Sign Out
          </Button>
        </form>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {accountLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <link.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">{link.label}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{link.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </Container>
  );
}
