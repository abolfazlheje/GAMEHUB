import Link from "next/link";
import { signIn } from "@/app/actions/auth";

export default function LoginPage({ searchParams }: { searchParams: { error?: string; message?: string } }) {
  return <main className="auth-shell"><section className="auth-card"><Link href="/" className="brand"><span className="brand-mark">N</span><span>NOVA <b>ACADEMY</b></span></Link><span className="eyebrow">خوش برگشتی</span><h1>ورود به حساب</h1><p>برای ادامه یادگیری وارد حساب کاربری‌ات شو.</p>
  {searchParams.error && <div className="form-alert">اطلاعات ورود صحیح نیست یا همه فیلدها تکمیل نشده‌اند.</div>}
  {searchParams.message && <div className="form-success">حساب ساخته شد. در صورت فعال بودن تأیید ایمیل، صندوق ورودی‌ات را بررسی کن.</div>}
  <form action={signIn} className="auth-form"><label>ایمیل<input name="email" type="email" autoComplete="email" required placeholder="name@example.com"/></label><label>رمز عبور<input name="password" type="password" autoComplete="current-password" required minLength={8}/></label><button className="button" type="submit">ورود به حساب</button></form><div className="auth-foot">حساب نداری؟ <Link href="/signup">ثبت‌نام کن</Link></div><Link href="/" className="back-link">بازگشت به صفحه اصلی</Link></section></main>;
}