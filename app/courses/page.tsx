import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function CoursesPage() {
  const supabase = createClient();
  const { data: courses } = await supabase.from("courses").select("id,slug,title,description,category,level,price_irr").eq("published", true).order("created_at", { ascending: false });
  return <main className="dashboard-shell"><header className="dashboard-nav"><Link className="brand" href="/"><span className="brand-mark">N</span><span>NOVA <b>ACADEMY</b></span></Link><Link className="login-link" href="/dashboard">پنل دانشجو</Link></header><section className="dashboard-content"><span className="eyebrow">کتابخانه نووا</span><h1>همه دوره‌ها</h1><p>دوره‌ای را برای شروع مسیرت انتخاب کن.</p>{courses?.length ? <div className="course-grid">{courses.map(course => <article className="course-card" key={course.id}><span className="course-category">{course.category}</span><h3>{course.title}</h3><p>{course.description}</p><div className="course-meta"><span>{course.level}</span><span>{course.price_irr.toLocaleString("fa-IR")} ریال</span></div></article>)}</div> : <div className="empty-state">هنوز دوره‌ای منتشر نشده است. به‌زودی دوره‌های نووا در این بخش قرار می‌گیرند.</div>}</section></main>;
}