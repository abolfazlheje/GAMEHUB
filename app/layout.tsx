import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NOVA Academy | یادگیری برای آینده",
  description: "آکادمی آنلاین نووا؛ یادگیری هوش مصنوعی، برنامه‌نویسی و مهارت‌های دیجیتال.",
  applicationName: "NOVA Academy"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}