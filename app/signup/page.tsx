import Link from "next/link";
import { signUp } from "@/app/actions/auth";

export default function SignupPage({ searchParams }: { searchParams: { error?: string } }) {
  return <main className="auth-shell"><section className="auth-card"><Link href="/" className="brand"><span className="brand-mark">N</span><span>NOVA <b>ACADEMY</b></span></Link><span className="eyebrow">شروع یک مسیر تازه</span><h1>ساخت حساب کاربری</h1><p>به جمع یادگیرندگان نووا بپیوند.</p>
  {searchParams.error && <div className="form-alert">لطفاً نام، ایمیل معتبر و رمز عبور حداقل ۸ کاراکتری وارد کن. اگر مشکل ادامه داشت تنظیمات Supabase را بررسی کن.</div>}
  <form action={signUp} className="auth-form"><label>نام و نام خانوادگی<input name="fullName" required autoComplete="name" maxLength={100}/></label><label>ایمیل<input name="email" type="email" required autoComplete="email"/></label><label>رمز عبور<input name="password" type="password" required minLength={8} autoComplete="new-password"/></label><button className="button" type="submit">ساخت حساب</button></form><div className="auth-foot">قبلاً ثبت‌نام کرده‌ای؟ <Link href="/login">وارد شو</Link></div><Link href="/" className="back-link">بازگشت به صفحه اصلی</Link></section></main>;
}