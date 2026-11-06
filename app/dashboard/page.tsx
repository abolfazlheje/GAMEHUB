import Link from "next/link";
import { redirect } from "next/navigation";
import { BookOpen, GraduationCap, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/actions/auth";

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: profile } = await supabase.from("profiles").select("full_name").eq("id", user.id).maybeSingle();
  const { data: enrollments } = await supabase.from("enrollments").select("id,status,courses(title,slug)").eq("student_id", user.id);
  return <main className="dashboard-shell"><header className="dashboard-nav"><Link className="brand" href="/"><span className="brand-mark">N</span><span>NOVA <b>ACADEMY</b></span></Link><form action={signOut}><button className="logout-button"><LogOut size={16}/> خروج</button></form></header><section className="dashboard-content"><span className="eyebrow">پنل دانشجو</span><h1>سلام، {profile?.full_name || user.user_metadata?.full_name || "دانشجو"} 👋</h1><p>به فضای یادگیری نووا خوش آمدی.</p><div className="dashboard-stats"><article><GraduationCap/><b>{enrollments?.length ?? 0}</b><span>دوره‌های من</span></article><article><BookOpen/><b>{enrollments?.filter((e: any) => e.status === "active").length ?? 0}</b><span>دوره‌های فعال</span></article></div><h2>دوره‌های من</h2>{enrollments?.length ? <div className="enrollment-list">{enrollments.map((item: any) => <article key={item.id}><b>{item.courses?.title || "دوره"}</b><span>{item.status === "active" ? "فعال" : "در انتظار تأیید"}</span></article>)}</div> : <div className="empty-state">هنوز در دوره‌ای ثبت‌نام نکرده‌ای. <Link href="/courses">مشاهده دوره‌ها</Link></div>}</section></main>;
}