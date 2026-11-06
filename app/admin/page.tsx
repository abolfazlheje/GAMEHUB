import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AdminPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: profile } = await supabase.from("profiles").select("role,full_name").eq("id", user.id).maybeSingle();
  if (profile?.role !== "admin") redirect("/dashboard");
  const [{ count: courseCount }, { count: studentCount }, { count: orderCount }] = await Promise.all([
    supabase.from("courses").select("*", { count: "exact", head: true }),
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "student"),
    supabase.from("orders").select("*", { count: "exact", head: true })
  ]);
  const { data: courses } = await supabase.from("courses").select("id,title,category,published").order("created_at", { ascending: false }).limit(10);
  return <main className="dashboard-shell"><header className="dashboard-nav"><Link className="brand" href="/"><span className="brand-mark">N</span><span>NOVA <b>ACADEMY</b></span></Link><Link href="/dashboard" className="login-link">پنل دانشجو</Link></header><section className="dashboard-content"><span className="eyebrow">مدیریت آکادمی</span><h1>پنل مدیریت</h1><p>مدیریت محتوای آموزشی و مشاهده وضعیت آکادمی.</p><div className="dashboard-stats"><article><b>{courseCount ?? 0}</b><span>دوره‌ها</span></article><article><b>{studentCount ?? 0}</b><span>دانشجویان</span></article><article><b>{orderCount ?? 0}</b><span>سفارش‌ها</span></article></div><h2>آخرین دوره‌ها</h2><div className="enrollment-list">{courses?.map(course => <article key={course.id}><b>{course.title}</b><span>{course.published ? "منتشرشده" : "پیش‌نویس"}</span></article>)}</div><div className="empty-state" style={{marginTop:24}}>برای فعال‌کردن مدیریت، ابتدا migration را اجرا و نقش admin را از محیط امن Supabase برای حساب مورداعتماد تنظیم کن. مدیریت سفارش و تأیید پرداخت تا اتصال درگاه پیاده‌سازی نشده است.</div></section></main>;
}