import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/auth-actions";
import { Container } from "@/components/shared/container";

export default async function AddressesPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <Container className="py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Saved Addresses</h1>
      <p className="text-muted-foreground">No saved addresses yet. Addresses are collected during WhatsApp checkout.</p>
    </Container>
  );
}
