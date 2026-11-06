import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { enrollInCourse } from "@/app/actions/enroll";

export default async function CourseDetailPage({ params, searchParams }: { params: { slug: string }; searchParams: { error?: string; message?: string } }) {
  const supabase = createClient();
  const { data: course } = await supabase.from("courses").select("id,slug,title,description,category,level,price_irr").eq("slug", params.slug).eq("published", true).maybeSingle();
  if (!course) notFound();
  const { data: lessons } = await supabase.from("lessons").select("id,title,description,position").eq("course_id", course.id).eq("published", true).order("position");
  const { data: { user } } = await supabase.auth.getUser();
  const { data: enrollment } = user ? await supabase.from("enrollments").select("status").eq("student_id", user.id).eq("course_id", course.id).maybeSingle() : { data: null };
  return <main className="dashboard-shell"><header className="dashboard-nav"><Link className="brand" href="/"><span className="brand-mark">N</span><span>NOVA <b>ACADEMY</b></span></Link><Link href="/courses" className="login-link">همه دوره‌ها</Link></header><section className="dashboard-content"><span className="eyebrow">{course.category}</span><h1>{course.title}</h1><p>{course.description}</p><div className="course-meta"><span>{course.level}</span><span>{course.price_irr === 0 ? "رایگان" : `${course.price_irr.toLocaleString("fa-IR")} ریال`}</span></div>{searchParams.error && <div className="form-alert">ثبت درخواست انجام نشد؛ دوباره تلاش کن یا تنظیمات پایگاه داده را بررسی کن.</div>}{searchParams.message && <div className="form-success">سفارش در انتظار پرداخت ثبت شد. دسترسی دوره پس از تأیید امن پرداخت فعال می‌شود.</div>}{enrollment?.status === "active" ? <div className="form-success">شما در این دوره ثبت‌نام کرده‌اید.</div> : <form action={enrollInCourse} style={{marginTop:24}}><input type="hidden" name="courseId" value={course.id}/><button className="button" type="submit">ثبت‌نام در دوره</button></form>}<h2>سرفصل‌های دوره</h2>{lessons?.length ? <div className="enrollment-list">{lessons.map((lesson,i)=><article key={lesson.id}><div><b>{i+1}. {lesson.title}</b><div><span>{lesson.description}</span></div></div></article>)}</div> : <div className="empty-state">محتوای درس‌ها هنوز منتشر نشده است.</div>}</section></main>;
}