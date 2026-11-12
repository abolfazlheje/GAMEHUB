import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MOLTOL — Enter the unknown",
  description: "An experimental digital universe. You are not browsing. You are entering."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
