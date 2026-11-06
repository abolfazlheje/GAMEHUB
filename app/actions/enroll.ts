"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function enrollInCourse(formData: FormData) {
  const courseId = String(formData.get("courseId") || "");
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: course } = await supabase.from("courses").select("id,slug,price_irr").eq("id", courseId).eq("published", true).maybeSingle();
  if (!course) redirect("/courses?error=not-found");
  if (course.price_irr > 0) {
    // A pending order is not a payment. Do not grant access until a verified
    // server-side gateway callback confirms settlement.
    const { error } = await supabase.from("orders").insert({
      student_id: user.id, course_id: course.id, amount_irr: course.price_irr, status: "pending"
    });
    if (error) redirect(`/courses/${course.slug}?error=order`);
    redirect(`/courses/${course.slug}?message=payment-pending`);
  }
  const { data: existing } = await supabase.from("enrollments").select("id").eq("student_id", user.id).eq("course_id", course.id).maybeSingle();
  if (existing) redirect("/dashboard?enrolled=1");
  const { error } = await supabase.from("enrollments").insert({
    student_id: user.id, course_id: course.id, status: "active"
  });
  if (error) redirect(`/courses/${course.slug}?error=enroll`);
  redirect("/dashboard?enrolled=1");
}