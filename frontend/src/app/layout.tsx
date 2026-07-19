import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "منصة التعليم الثانوي - القسم العلمي (صنعاء)",
  description: "المنصة التعليمية الشاملة لطلاب القسم العلمي بالصف الثالث الثانوي - منهج وزارة التربية والتعليم بالجمهورية اليمنية. خطة دراسية 150 يوماً، تحليلات الامتحانات الوزارية السابقة، واختبارات تفاعلية.",
  keywords: ["اليمن", "الصف الثالث الثانوي", "صنعاء", "منهج علمي", "فيزياء", "رياضيات", "كيمياء", "امتحانات وزارية"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="font-sans min-h-screen bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
