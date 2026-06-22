import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/auth-actions";
import { Container } from "@/components/shared/container";

export default async function AccountSettingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <Container className="py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <p className="text-muted-foreground">Account settings and notification preferences coming soon.</p>
    </Container>
  );
}
