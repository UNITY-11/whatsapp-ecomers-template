"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { loginAction, registerAction } from "@/actions/auth-actions";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await loginAction(formData);
    setLoading(false);
    if (result.error) { toast.error(result.error); return; }
    toast.success("Welcome back!");
    router.push("/account");
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await registerAction(formData);
    setLoading(false);
    if (result.error) { toast.error(result.error); return; }
    toast.success("Account created!");
    router.push("/account");
  };

  return (
    <Container className="py-16 md:py-24 max-w-md">
      <div className="text-center mb-10">
        <p className="label-caps mb-3">Account</p>
        <h1 className="font-heading text-3xl font-semibold">Welcome</h1>
      </div>
      <Tabs defaultValue="login">
        <TabsList className="grid w-full grid-cols-2 rounded-full bg-muted p-1 h-11">
          <TabsTrigger value="login" className="rounded-full text-xs uppercase tracking-widest">Login</TabsTrigger>
          <TabsTrigger value="register" className="rounded-full text-xs uppercase tracking-widest">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login" className="mt-6">
          <Card className="border-border/60 shadow-sm rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="font-heading text-xl font-medium">Sign in</CardTitle>
              <CardDescription>Access your account and orders</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">Email</Label>
                  <Input name="email" type="email" required className="h-11 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">Password</Label>
                  <Input name="password" type="password" required className="h-11 rounded-xl" />
                </div>
                <Button type="submit" className="w-full h-11 mt-2" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="register" className="mt-6">
          <Card className="border-border/60 shadow-sm rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="font-heading text-xl font-medium">Create account</CardTitle>
              <CardDescription>Join our community of style enthusiasts</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">Name</Label>
                  <Input name="name" required className="h-11 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">Email</Label>
                  <Input name="email" type="email" required className="h-11 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">Phone</Label>
                  <Input name="phone" className="h-11 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">Password</Label>
                  <Input name="password" type="password" required className="h-11 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">Confirm Password</Label>
                  <Input name="confirmPassword" type="password" required className="h-11 rounded-xl" />
                </div>
                <Button type="submit" className="w-full h-11 mt-2" disabled={loading}>
                  {loading ? "Creating..." : "Create Account"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Container>
  );
}
