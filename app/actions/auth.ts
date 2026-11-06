"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signIn(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  if (!email || !password) redirect("/login?error=missing");
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect("/login?error=credentials");
  redirect("/dashboard");
}

export async function signUp(formData: FormData) {
  const fullName = String(formData.get("fullName") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  if (!fullName || !email || password.length < 8) redirect("/signup?error=invalid");
  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } }
  });
  if (error) redirect("/signup?error=failed");
  if (data.user && data.session) {
    await supabase.from("profiles").upsert({ id: data.user.id, full_name: fullName });
    redirect("/dashboard");
  }
  redirect("/login?message=confirm");
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/");
}