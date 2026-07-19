"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  CheckCircle2, 
  Circle, 
  Clock, 
  BookOpen, 
  AlertCircle,
  TrendingUp,
  Award,
  Sparkles,
  ChevronRight,
  BookMarked
} from "lucide-react";

export default function StudyPlan() {
  const [activePhase, setActivePhase] = useState(1);
  const [days, setDays] = useState<any[]>([]);
  const [progress, setProgress] = useState({ completed: 0, total: 150, percentage: 0 });
  const [activeMotivation, setActiveMotivation] = useState("");

  const phases = [
    { id: 1, title: "المرحلة الأولى (الأيام 1-50)", range: [1, 50], desc: "تأسيس المفاهيم الأساسية وتغطية ثلث المنهج" },
    { id: 2, title: "المرحلة الثانية (الأيام 51-100)", range: [51, 100], desc: "تعميق الفهم وتغطية الجزء الأكبر من المقرر" },
    { id: 3, title: "المرحلة الثالثة (الأيام 101-130)", range: [101, 130], desc: "المراجعة الشاملة وحل أسئلة الفصول الصعبة" },
    { id: 4, title: "المرحلة الرابعة (الأيام 131-150)", range: [131, 150], desc: "اللمسات الأخيرة وحل الامتحانات الوزارية السابقة" }
  ];

  // Initialize simulated 150 days on mount
  useEffect(() => {
    const generatedDays = [];
    const subjects = [
      { name: "الرياضيات", slug: "math", time: 90, icon: "📐" },
      { name: "الفيزياء", slug: "physics", time: 90, icon: "⚡" },
      { name: "الكيمياء", slug: "chemistry", time: 75, icon: "🧪" },
      { name: "الأحياء", slug: "biology", time: 75, icon: "🌿" },
      { name: "اللغة الإنجليزية", slug: "english", time: 60, icon: "💬" },
      { name: "اللغة العربية", slug: "arabic", time: 60, icon: "✍️" },
      { name: "التربية الإسلامية", slug: "islamic", time: 45, icon: "🕌" },
      { name: "القرآن الكريم", slug: "quran", time: 45, icon: "📖" }
    ];

    const tips = [
      "رحلة الألف ميل تبدأ بخطوة، وصبرك اليوم هو فخرك غداً 🇾🇪.",
      "ثق بقابليتك على التفوق؛ اليمن يزدهر بعقول أبنائه وبناته المبدعين.",
      "تنظيم الوقت هو السلاح الأقوى لطلب العلم وتخفيف الضغط الدراسي.",
      "المثابرة سر النجاح. خصص ساعة إضافية اليوم للمسائل الصعبة وستجد النتيجة لاحقاً.",
      "تذكر أن تعبك اليوم هو الذي سيرسم فرحة والديك يوم إعلان النتائج الوزارية."
    ];

    let subIndex = 0;
    for (let i = 1; i <= 150; i++) {
      if (i % 30 === 0) {
        generatedDays.push({
          id: `d_${i}`,
          dayNumber: i,
          dayTitle: `المراجعة الشهرية الشاملة واختبار تجريبي رقم ${i / 30}`,
          durationMinutes: 180,
          motivationTip: "لقد أتممت شهراً كاملاً من الكفاح! اختبر معلوماتك الآن لتقييم نقاط قوتك.",
          isReviewDay: true,
          isMonthlyReview: true,
          isCompleted: i <= 2,
          subjectName: "مراجعة شاملة"
        });
        continue;
      }

      if (i % 7 === 0) {
        generatedDays.push({
          id: `d_${i}`,
          dayNumber: i,
          dayTitle: `المراجعة الأسبوعية وتثبيت مفاهيم الأسبوع ${Math.floor(i / 7)}`,
          durationMinutes: 120,
          motivationTip: "استغل هذا اليوم لمراجعة جميع القوانين والتعاريف الصعبة التي ذاكرتها خلال الأسبوع.",
          isReviewDay: true,
          isMonthlyReview: false,
          isCompleted: false,
          subjectName: "مراجعة أسبوعية"
        });
        continue;
      }

      if (i >= 141) {
        generatedDays.push({
          id: `d_${i}`,
          dayNumber: i,
          dayTitle: `المراجعة النهائية الشاملة وحل الامتحانات الوزارية المعتمدة`,
          durationMinutes: 240,
          motivationTip: "أنت الآن في الأمتار الأخيرة! حل امتحانات السنوات السابقة هو المفتاح الذهبي للعلامة الكاملة.",
          isReviewDay: true,
          isMonthlyReview: false,
          isCompleted: false,
          subjectName: "مراجعة نهائية"
        });
        continue;
      }

      const currentSub = subjects[subIndex % subjects.length];
      generatedDays.push({
        id: `d_${i}`,
        dayNumber: i,
        dayTitle: `${currentSub.name} - دراسة الوحدات المقررة وحل الأسئلة والتمارين`,
        durationMinutes: currentSub.time,
        motivationTip: tips[i % tips.length],
        isReviewDay: false,
        isMonthlyReview: false,
        isCompleted: i <= 2,
        subjectName: currentSub.name,
        subjectIcon: currentSub.icon,
        lessonId: `l_mock_${i}`
      });
      subIndex++;
    }

    setDays(generatedDays);
    
    // Calculate stats
    const total = generatedDays.length;
    const completed = generatedDays.filter(d => d.isCompleted).length;
    setProgress({ completed, total, percentage: parseFloat(((completed / total) * 100).toFixed(1)) });
    setActiveMotivation(tips[0]);
  }, []);

  const handleToggleDay = (id: string) => {
    const updatedDays = days.map(d => {
      if (d.id === id) {
        const nextState = !d.isCompleted;
        if (nextState && d.motivationTip) {
          setActiveMotivation(d.motivationTip);
        }
        return { ...d, isCompleted: nextState };
      }
      return d;
    });

    setDays(updatedDays);
    const total = updatedDays.length;
    const completed = updatedDays.filter(d => d.isCompleted).length;
    setProgress({ completed, total, percentage: parseFloat(((completed / total) * 100).toFixed(1)) });
  };

  // Filter days by active phase range
  const filteredDays = days.filter(d => {
    const range = phases.find(p => p.id === activePhase)?.range || [1, 50];
    return d.dayNumber >= range[0] && d.dayNumber <= range[1];
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow py-12 bg-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-4">
              <Calendar className="h-4 w-4" />
              <span>منهج صنعاء للقسم العلمي - خطة تفوق</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">خطة المذاكرة اليومية (150 يوم)</h1>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              تقسيم دراسي ذكي يوزع المواد العلمية، التربية الإسلامية، اللغات، ومراجعاتها بالتساوي لضمان تغطية كاملة وشاملة للمنهج.
            </p>
          </div>

          {/* Motivation Quote Banner */}
          {activeMotivation && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-primary/15 via-violet-500/10 to-transparent border border-primary/20 p-5 rounded-3xl mb-8 flex items-center gap-4 shadow-sm"
            >
              <div className="h-10 w-10 bg-primary/20 rounded-2xl flex items-center justify-center text-primary text-lg font-bold shrink-0">
                <Sparkles className="h-5 w-5" />
              </div>
              <p className="text-xs sm:text-sm font-bold text-foreground/90 leading-relaxed pr-2">
                {activeMotivation}
              </p>
            </motion.div>
          )}

          {/* Progress Dashboard */}
          <div className="glass border border-border/40 p-6 sm:p-8 rounded-3xl mb-8 flex flex-col md:flex-row items-center gap-6 justify-between shadow-sm">
            <div className="flex-1 w-full">
              <div className="flex items-center justify-between mb-3 text-xs sm:text-sm">
                <span className="font-bold">مستوى التقدم الكلي في الخطة</span>
                <span className="font-bold text-primary">{progress.completed} أيام منجز من {progress.total} يوم ({progress.percentage}%)</span>
              </div>
              <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-violet-600 rounded-full transition-all duration-500" 
                  style={{ width: `${progress.percentage}%` }} 
                />
              </div>
            </div>
            <div className="flex items-center gap-3 bg-background border border-border px-5 py-3 rounded-2xl shrink-0 self-stretch md:self-auto justify-center">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              <div className="flex flex-col text-right">
                <span className="text-[10px] text-muted-foreground font-semibold">معدل الإنجاز اليومي</span>
                <span className="text-xs font-bold text-foreground">متزن ومنظم</span>
              </div>
            </div>
          </div>

          {/* Phase Tabs Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {phases.map((phase) => (
              <button
                key={phase.id}
                onClick={() => setActivePhase(phase.id)}
                className={`p-4 rounded-2xl border text-right transition-all flex flex-col gap-1.5 focus:outline-none ${
                  activePhase === phase.id
                    ? "border-primary bg-primary/5 text-primary shadow-sm"
                    : "border-border/40 bg-background hover:bg-secondary/40 text-muted-foreground"
                }`}
              >
                <span className="font-extrabold text-sm">{phase.title}</span>
                <span className="text-[10px] opacity-80 leading-normal">{phase.desc}</span>
              </button>
            ))}
          </div>

          {/* Days Grid Listing */}
          <div className="flex flex-col gap-5">
            <AnimatePresence mode="popLayout">
              {filteredDays.map((day) => {
                const isWeekly = day.isReviewDay && !day.isMonthlyReview && day.dayNumber < 141;
                const isMonthly = day.isMonthlyReview;
                const isFinal = day.dayNumber >= 141;

                return (
                  <motion.div
                    key={day.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className={`border rounded-3xl p-6 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6 ${
                      day.isCompleted
                        ? "bg-emerald-500/[0.02] border-emerald-500/20 dark:border-emerald-500/10 shadow-none"
                        : isMonthly
                        ? "bg-amber-500/[0.02] border-amber-500/20 shadow-sm"
                        : isWeekly
                        ? "bg-indigo-500/[0.02] border-indigo-500/20 shadow-sm"
                        : isFinal
                        ? "bg-red-500/[0.01] border-red-500/10 shadow-sm"
                        : "bg-background border-border/40 shadow-sm hover:shadow-md"
                    }`}
                  >
                    
                    {/* Left: Checkbox & Day Title */}
                    <div className="flex items-start gap-4 flex-1">
                      <button 
                        onClick={() => handleToggleDay(day.id)}
                        className="mt-0.5 focus:outline-none shrink-0"
                        aria-label={`تحديد اليوم ${day.dayNumber} كمكتمل`}
                      >
                        {day.isCompleted ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground/30 hover:text-primary transition-colors" />
                        )}
                      </button>

                      <div className="flex flex-col">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isMonthly
                              ? "bg-amber-500/10 text-amber-600"
                              : isWeekly
                              ? "bg-indigo-500/10 text-indigo-600"
                              : isFinal
                              ? "bg-red-500/10 text-red-600"
                              : "bg-primary/10 text-primary"
                          }`}>
                            اليوم {day.dayNumber}
                          </span>
                          
                          <span className="text-xs text-muted-foreground font-semibold">
                            {day.subjectName}
                          </span>
                        </div>

                        <h3 className="font-extrabold text-sm sm:text-base text-foreground mt-2 leading-relaxed">
                          {day.dayTitle}
                        </h3>

                        {!day.isCompleted && day.motivationTip && (
                          <p className="text-xs text-muted-foreground/80 mt-1 leading-normal italic font-semibold">
                            فكرة اليوم: {day.motivationTip}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Right: Duration & Action button */}
                    <div className="flex items-center gap-4 self-end sm:self-auto shrink-0 border-t sm:border-t-0 pt-4 sm:pt-0 border-border/40 w-full sm:w-auto justify-between sm:justify-start">
                      <span className="text-xs text-muted-foreground font-semibold flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {day.durationMinutes} دقيقة
                      </span>

                      {day.lessonId && !day.isCompleted ? (
                        <Link
                          href={`/lessons/${day.lessonId}`}
                          className="flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary/95 text-white font-bold text-xs rounded-xl shadow-md shadow-primary/10 transition-colors"
                        >
                          <BookMarked className="h-3.5 w-3.5" />
                          <span>ابدأ الدرس</span>
                        </Link>
                      ) : isMonthly && !day.isCompleted ? (
                        <Link
                          href="/exams"
                          className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-md shadow-amber-500/10 transition-colors"
                        >
                          <Award className="h-3.5 w-3.5" />
                          <span>خوض الامتحان</span>
                        </Link>
                      ) : (
                        <div className="h-8" />
                      )}
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
