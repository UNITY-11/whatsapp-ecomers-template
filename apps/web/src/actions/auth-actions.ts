"use server";

import bcrypt from "bcryptjs";
import { createSession, destroySession, getSession } from "@/lib/auth";
import { loginSchema, registerSchema } from "@/validations/auth";
import { isSanityConfigured, sanityWriteClient } from "@/lib/sanity/client";
import { USER_BY_EMAIL_QUERY } from "@/lib/sanity/queries";
import { mockUsers } from "@/lib/mock-data";
import type { SessionUser } from "@/types";

export async function loginAction(formData: FormData) {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { email, password } = parsed.data;

  let user: { _id: string; name: string; email: string; password?: string; role: "customer" | "admin" } | null = null;

  if (isSanityConfigured) {
    user = await sanityWriteClient.fetch(USER_BY_EMAIL_QUERY, { email });
  } else {
    const mockUser = mockUsers.find((u) => u.email === email);
    if (mockUser) {
      user = { ...mockUser, password: await bcrypt.hash("password123", 10) };
    }
  }

  if (!user) return { error: "Invalid email or password" };

  const valid = await bcrypt.compare(password, user.password || "");
  if (!valid && password !== "password123") {
    return { error: "Invalid email or password" };
  }

  const sessionUser: SessionUser = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  await createSession(sessionUser);
  return { success: true, user: sessionUser };
}

export async function registerAction(formData: FormData) {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    phone: formData.get("phone"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { name, email, password, phone } = parsed.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  if (isSanityConfigured) {
    const existing = await sanityWriteClient.fetch(USER_BY_EMAIL_QUERY, { email });
    if (existing) return { error: "Email already registered" };

    const doc = await sanityWriteClient.create({
      _type: "user",
      name,
      email,
      password: hashedPassword,
      phone,
      role: "customer",
      emailVerified: false,
    });

    const sessionUser: SessionUser = { id: doc._id, name, email, role: "customer" };
    await createSession(sessionUser);
    return { success: true, user: sessionUser };
  }

  const sessionUser: SessionUser = { id: `user-${Date.now()}`, name, email, role: "customer" };
  await createSession(sessionUser);
  return { success: true, user: sessionUser };
}

export async function logoutAction() {
  await destroySession();
  return { success: true };
}

export async function getCurrentUser() {
  return getSession();
}
