import Link from "next/link";
import { ArrowLeft, BookOpen, BrainCircuit, Code2, Palette, ShieldCheck, Sparkles } from "lucide-react";

const courses = [
  { title: "مبانی هوش مصنوعی", category: "هوش مصنوعی", level: "مقدماتی", lessons: "۱۲ درس", icon: BrainCircuit, tone: "violet" },
  { title: "پایتون از صفر", category: "برنامه‌نویسی", level: "مقدماتی", lessons: "۱۸ درس", icon: Code2, tone: "blue" },
  { title: "مهندسی پرامپت", category: "هوش مصنوعی", level: "متوسط", lessons: "۹ درس", icon: Sparkles, tone: "orange" }
];

export default function HomePage() {
  return (
    <main>
      <header className="site-header">
        <div className="container nav">
          <Link className="brand" href="/"><span className="brand-mark">N</span><span>NOVA <b>ACADEMY</b></span></Link>
          <nav className="nav-links"><a href="#courses">دوره‌ها</a><a href="#why-us">چرا نووا؟</a><a href="#path">مسیر یادگیری</a></nav>
          <div className="nav-actions"><Link className="login-link" href="/login">ورود</Link><Link className="button button-small" href="/signup">ثبت‌نام <ArrowLeft size={16}/></Link></div>
        </div>
      </header>

      <section className="hero container">
        <div className="hero-copy">
          <div className="eyebrow"><Sparkles size={15}/> آینده از یادگیری شروع می‌شود</div>
          <h1>مهارت‌های فردا را<br/><span>امروز یاد بگیر.</span></h1>
          <p>با آموزش‌های پروژه‌محور نووا، قدم‌به‌قدم وارد دنیای هوش مصنوعی و برنامه‌نویسی شو و ایده‌هایت را به واقعیت تبدیل کن.</p>
          <div className="hero-actions"><Link className="button" href="#courses">مشاهده دوره‌ها <ArrowLeft size={18}/></Link><a className="text-link" href="#path">مسیر یادگیری چطور است؟</a></div>
          <div className="hero-note"><ShieldCheck size={17}/> یادگیری ساختارمند، تمرین‌محور و قابل‌پیگیری</div>
        </div>
        <div className="hero-art" aria-label="تصویر گرافیکی مسیر یادگیری">
          <div className="orbit orbit-one"/><div className="orbit orbit-two"/>
          <div className="hero-core"><BrainCircuit size={76} strokeWidth={1.2}/><span>NOVA</span></div>
          <div className="float-card float-top"><Code2 size={20}/><span>کدنویسی خلاقانه</span></div>
          <div className="float-card float-bottom"><Sparkles size={20}/><span>هوش مصنوعی</span></div>
          <div className="art-dot dot-one"/><div className="art-dot dot-two"/>
        </div>
      </section>

      <section className="stats container"><div><strong>یادگیری</strong><span>با مسیر روشن</span></div><div><strong>پروژه‌محور</strong><span>با تمرین واقعی</span></div><div><strong>گام‌به‌گام</strong><span>از پایه تا پیشرفته</span></div></section>

      <section className="section container" id="courses">
        <div className="section-heading"><div><span className="eyebrow">شروع مسیر تو</span><h2>دوره‌های منتخب</h2><p>برای شروع، یک مهارت تازه انتخاب کن.</p></div><Link className="text-link" href="/courses">همه دوره‌ها <ArrowLeft size={16}/></Link></div>
        <div className="course-grid">{courses.map((course) => { const Icon = course.icon; return <article className="course-card" key={course.title}><div className={`course-icon ${course.tone}`}><Icon size={27}/></div><span className="course-category">{course.category}</span><h3>{course.title}</h3><div className="course-meta"><span>{course.level}</span><span>{course.lessons}</span></div><Link href="/courses" className="course-link">مشاهده جزئیات <ArrowLeft size={16}/></Link></article>; })}</div>
      </section>

      <section className="why-section" id="why-us"><div className="container why-inner"><div><span className="eyebrow">تجربه‌ای متفاوت</span><h2>فقط تماشا نکن؛<br/><span>یاد بگیر و بساز.</span></h2><p>در نووا یادگیری با تمرین و پروژه همراه است تا بتوانی دانسته‌هایت را در عمل به کار بگیری.</p></div><div className="why-points"><div><BookOpen/><div><b>محتوای منظم</b><span>درس‌های دسته‌بندی‌شده و مرحله‌ای</span></div></div><div><Code2/><div><b>تمرین کاربردی</b><span>یادگیری از طریق ساختن و تجربه‌کردن</span></div></div><div><ShieldCheck/><div><b>پیشرفت قابل‌پیگیری</b><span>ادامه مسیر آموزشی در پنل دانشجو</span></div></div></div></div></section>

      <section className="section container path-section" id="path"><span className="eyebrow">از همین‌جا شروع کن</span><h2>مسیر یادگیری تو ساده است</h2><div className="path-steps"><div><span>۰۱</span><b>انتخاب دوره</b><p>مهارت موردعلاقه‌ات را پیدا کن.</p></div><div><span>۰۲</span><b>یادگیری و تمرین</b><p>درس‌ها را ببین و تمرین‌ها را انجام بده.</p></div><div><span>۰۳</span><b>ساخت پروژه</b><p>دانسته‌هایت را به یک نتیجه واقعی تبدیل کن.</p></div></div></section>

      <footer><div className="container footer-inner"><Link className="brand" href="/"><span className="brand-mark">N</span><span>NOVA <b>ACADEMY</b></span></Link><span>© {new Date().getFullYear()} NOVA Academy — مسیر یادگیری آینده</span></div></footer>
    </main>
  );
}