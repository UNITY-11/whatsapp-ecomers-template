import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/auth-actions";
import { Container } from "@/components/shared/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <Container className="py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-8">Profile</h1>
      <Card>
        <CardHeader><CardTitle>Personal Information</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><p className="text-sm text-muted-foreground">Name</p><p className="font-medium">{user.name}</p></div>
          <div><p className="text-sm text-muted-foreground">Email</p><p className="font-medium">{user.email}</p></div>
          <div><p className="text-sm text-muted-foreground">Role</p><p className="font-medium capitalize">{user.role}</p></div>
        </CardContent>
      </Card>
    </Container>
  );
}
