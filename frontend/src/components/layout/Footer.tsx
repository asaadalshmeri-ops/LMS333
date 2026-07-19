import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary/40 border-t border-border/40 py-12 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & Description */}
          <div className="flex flex-col gap-4 md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-primary to-violet-600 flex items-center justify-center">
                <span className="text-white font-extrabold text-xl">ي</span>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-primary to-violet-600 bg-clip-text text-transparent leading-none">
                  مناهج اليمن
                </span>
                <span className="text-[10px] text-muted-foreground font-semibold">
                  القسم العلمي - ثالث ثانوي
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              منصة تعليمية متطورة مصممة خصيصاً لمساعدة طلاب الثانوية العامة (القسم العلمي) في اليمن على اجتياز الامتحانات الوزارية بتفوق من خلال خطة دراسية مركزة وتحليلات ذكية.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-sm text-foreground">الروابط السريعة</h4>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
              </li>
              <li>
                <Link href="/study-plan" className="hover:text-primary transition-colors">الخطة الدراسية (150 يوم)</Link>
              </li>
              <li>
                <Link href="/exams" className="hover:text-primary transition-colors">تحليل الامتحانات الوزارية</Link>
              </li>
              <li>
                <Link href="/quizzes" className="hover:text-primary transition-colors">الاختبارات التفاعلية</Link>
              </li>
            </ul>
          </div>

          {/* Core Info */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-sm text-foreground">المقرر الدراسي (صنعاء)</h4>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>الرياضيات (الجبر والهندسة، التفاضل والتكامل)</li>
              <li>الفيزياء (الكهربائية والمغناطيسية، الحديثة)</li>
              <li>الكيمياء (العضوية وغير العضوية)</li>
              <li>الأحياء واللغة الإنجليزية واللغة العربية</li>
            </ul>
          </div>

        </div>

        <div className="h-px bg-border/60 my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <span>&copy; {new Date().getFullYear()} مناهج اليمن العلمي (منهج صنعاء). جميع الحقوق محفوظة.</span>
          <span>صنع بكل حب لدعم الطلاب اليمنيين في مسيرتهم التعليمية 🇾🇪</span>
        </div>
      </div>
    </footer>
  );
}
