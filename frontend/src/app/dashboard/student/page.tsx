"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Flame, 
  Trophy, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  ArrowLeft, 
  Calendar, 
  TrendingUp, 
  Award,
  Sparkles,
  Play
} from "lucide-react";

export default function StudentDashboard() {
  const [mounted, setMounted] = useState(false);
  const [displayName, setDisplayName] = useState("يا بطل");

  useEffect(() => {
    setMounted(true);
    const savedName = localStorage.getItem("studentName");
    if (savedName) {
      setDisplayName(savedName);
    }
  }, []);

  const stats = {
    currentDay: 3,
    overallProgress: 1.3,
    completedLessons: 2,
    remainingLessons: 148,
    averageQuizScore: 84.5,
    studyHours: 4.5,
    streak: 3
  };

  const studyTimeline = [
    { time: "03:00 م - 04:30 م", title: "الرياضيات (الجلسة الأولى) 📐", desc: "دراسة موضوع 'مبدأ العد الأساسي وتطبيقاته'، قراءة القوانين وفهم مسائل التباديل والتوافيق اللفظية.", icon: "📖", duration: "90 دقيقة", isCurrent: true, link: "/lessons/math-1" },
    { time: "04:30 م - 05:00 م", title: "استراحة + صلاة العصر 🕌", desc: "أخذ قسط من الراحة لتجديد النشاط وأداء صلاة العصر في وقتها.", icon: "🕌", duration: "30 دقيقة", isBreak: true },
    { time: "05:00 م - 06:30 م", title: "الفيزياء (الجلسة الثانية) ⚡", desc: "دراسة موضوع 'دوائر التيار المتردد والمفاعلة السعوية للمكثف' والتدرب على حل المسائل الحسابية.", icon: "🧪", duration: "90 دقيقة", link: "/lessons/physics-1" },
    { time: "06:30 م - 07:15 م", title: "استراحة + صلاة المغرب ☕", desc: "استراحة لتناول وجبة خفيفة ومشروب ساخن مع أداء صلاة المغرب.", icon: "☕", duration: "45 دقيقة", isBreak: true },
    { time: "07:15 م - 08:30 م", title: "الكيمياء (الجلسة الثالثة) 🧪", desc: "دراسة موضوع 'سرعة التفاعلات الكيميائية ومعدل التغير عبر الزمن' ومراجعة أهم القواعد.", icon: "💡", duration: "75 دقيقة", link: "/lessons/chemistry-1" },
    { time: "08:30 م - 09:00 م", title: "استراحة وصلاة العشاء 🕌", desc: "استراحة خفيفة لتهيئة الذهن والاستعداد لمرحلة التقييم النهائي لليوم.", icon: "🕌", duration: "30 دقيقة", isBreak: true },
    { time: "09:00 م - 10:00 م", title: "التقييم اليومي وحل الوزاريات ✏️", desc: "حل اختبار تفاعلي سريع ومراجعة الأسئلة الوزارية السابقة للمواد الثلاث للتأكد من الفهم الكامل.", icon: "✏️", duration: "60 دقيقة", link: "/quizzes/lesson/math-1" }
  ];

  const recentQuizzes = [
    { id: "q1", title: "مبدأ العد الأساسي", subject: "الرياضيات", score: 90, date: "أمس" },
    { id: "q2", title: "التيار المتردد والمكثف", subject: "الفيزياء", score: 79, date: "قبل يومين" }
  ];

  const achievements = [
    { title: "شعلة البداية", desc: "أتممت 3 أيام متتالية من المذاكرة بنشاط.", icon: "🔥", unlocked: true },
    { title: "صديق القوانين", desc: "حللت مسألة حسابية معقدة بالكامل بشكل صحيح.", icon: "📐", unlocked: true },
    { title: "كشاف المناهج", desc: "تصفحت وحملت أول ملخص PDF للمواد العلمية.", icon: "📂", unlocked: true },
    { title: "العلامة الكاملة", desc: "حقق 100% في أي اختبار قصير للمقرر.", icon: "💯", unlocked: false }
  ];

  const todayTask = {
    day: 3,
    subjectName: "الكيمياء",
    topic: "سرعة التفاعلات الكيميائية ومعدل التغير",
    duration: "50 دقيقة",
    tasks: ["قراءة ملخص الباب الأول", "فهم معادلة ثابت التفاعل", "اختبار قصير تفاعلي (5 أسئلة)"]
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow py-12 bg-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">أهلاً بك، {displayName} 🇾🇪</h1>
              <p className="text-sm text-muted-foreground mt-1">
                راقب إنجازك اليومي، تابع إحصائيات تفوقك، واستمر في المذاكرة لحصد الدرجات النهائية.
              </p>
            </div>
            <div className="flex items-center gap-3 bg-background border border-border/40 p-3 rounded-2xl shadow-sm">
              <Calendar className="h-5 w-5 text-primary" />
              <div className="flex flex-col text-right">
                <span className="text-[10px] text-muted-foreground font-semibold">اليوم الحالي في الخطة</span>
                <span className="text-xs font-bold text-foreground">اليوم الثالث (3 / 150)</span>
              </div>
            </div>
          </div>

          {/* Daily study timeline widget (3 PM - 10 PM) */}
          <div className="bg-background border border-border/40 p-6 sm:p-8 rounded-3xl shadow-sm mb-8">
            <div className="flex items-center justify-between border-b border-border/40 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <h2 className="text-base font-extrabold">الجدول الزمني لمذاكرة اليوم (3:00 م - 10:00 م)</h2>
              </div>
              <span className="text-[10px] px-2.5 py-1 bg-emerald-500/10 text-emerald-600 rounded-full font-bold">
                منظم وموزع
              </span>
            </div>

            <div className="relative border-r-2 border-primary/20 mr-3 flex flex-col gap-6 pl-2">
              {studyTimeline.map((item, idx) => (
                <div key={idx} className="relative pr-6">
                  {/* Timeline Node Point */}
                  <div className={`absolute right-[-7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 bg-background transition-all ${
                    item.isCurrent 
                      ? "border-primary scale-125 ring-4 ring-primary/10" 
                      : item.isBreak
                      ? "border-amber-500"
                      : "border-primary/45"
                  }`} />

                  {item.link ? (
                    <Link href={item.link} className="block group">
                      <div className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        item.isCurrent 
                          ? "border-primary bg-primary/[0.02] group-hover:bg-primary/[0.05]" 
                          : "border-border/40 hover:border-primary group-hover:bg-secondary/35"
                      }`}>
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{item.icon}</span>
                            <span className="font-extrabold text-xs sm:text-sm text-foreground group-hover:text-primary transition-colors">{item.title}</span>
                            {item.isCurrent && (
                              <span className="text-[9px] px-2 py-0.5 bg-primary text-white font-bold rounded-full animate-pulse">
                                نشط الآن
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-muted-foreground font-bold font-mono bg-secondary/80 px-2.5 py-0.5 rounded-lg flex items-center gap-1 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                            <span>{item.time} ({item.duration})</span>
                            <span className="text-[8px] opacity-0 group-hover:opacity-100 transition-opacity">🚀</span>
                          </span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-muted-foreground mt-2 leading-relaxed font-medium">
                          {item.desc}
                        </p>
                        <div className="text-[10px] text-primary font-bold mt-2.5 flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                          <span>اضغط هنا لبدء المذاكرة الآن</span>
                          <span>←</span>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div className={`p-4 rounded-2xl border transition-all ${
                      item.isBreak
                        ? "border-amber-500/25 bg-amber-500/[0.01] opacity-90"
                        : "border-border/40"
                    }`}>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{item.icon}</span>
                          <span className="font-extrabold text-xs sm:text-sm text-foreground">{item.title}</span>
                        </div>
                        <span className="text-[10px] text-muted-foreground font-bold font-mono bg-secondary/80 px-2 py-0.5 rounded-lg">
                          {item.time} ({item.duration})
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-muted-foreground mt-2 leading-relaxed font-medium">
                        {item.desc}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            
            {/* Streak */}
            <div className="bg-background border border-border/40 p-5 rounded-3xl shadow-sm flex items-center gap-4">
              <div className="h-10 w-10 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center font-bold">
                <Flame className="h-5 w-5 fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground font-semibold">سلسلة الاستمرار</span>
                <span className="text-base sm:text-lg font-black">{stats.streak} أيام متتالية</span>
              </div>
            </div>

            {/* Study Hours */}
            <div className="bg-background border border-border/40 p-5 rounded-3xl shadow-sm flex items-center gap-4">
              <div className="h-10 w-10 bg-primary/10 text-primary rounded-2xl flex items-center justify-center font-bold">
                <Clock className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground font-semibold">ساعات الدراسة</span>
                <span className="text-base sm:text-lg font-black">{stats.studyHours} ساعة</span>
              </div>
            </div>

            {/* Completed Lessons */}
            <div className="bg-background border border-border/40 p-5 rounded-3xl shadow-sm flex items-center gap-4">
              <div className="h-10 w-10 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center font-bold">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground font-semibold">الدروس المنجزة</span>
                <span className="text-base sm:text-lg font-black">{stats.completedLessons} دروس</span>
              </div>
            </div>

            {/* Average Quiz Score */}
            <div className="bg-background border border-border/40 p-5 rounded-3xl shadow-sm flex items-center gap-4">
              <div className="h-10 w-10 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center font-bold">
                <Trophy className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground font-semibold">معدل الاختبارات</span>
                <span className="text-base sm:text-lg font-black">%{stats.averageQuizScore}</span>
              </div>
            </div>

          </div>

          {/* Main Dashboard Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Right: Daily task widget & Recent Quizzes */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              
              {/* Daily calendar task card */}
              <div className="bg-gradient-to-br from-primary/10 to-violet-500/5 border border-primary/20 p-6 sm:p-8 rounded-3xl shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 translate-x-[-20%] translate-y-[-20%] w-48 h-48 bg-primary/10 rounded-full blur-[60px]" />
                
                <div className="flex items-center justify-between border-b border-border/40 pb-4 mb-5 relative z-10">
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <span className="font-extrabold text-sm sm:text-base">مهمة المذاكرة المقترحة لليوم</span>
                  </div>
                  <span className="text-xs px-2.5 py-1 bg-primary text-white rounded-full font-bold">
                    اليوم {todayTask.day}
                  </span>
                </div>

                <div className="relative z-10 flex flex-col gap-4">
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground">{todayTask.subjectName}</span>
                    <h3 className="text-lg sm:text-xl font-bold mt-1 leading-normal">{todayTask.topic}</h3>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>المدة المقدرة: {todayTask.duration}</span>
                  </div>

                  <div className="bg-background/45 border border-border/40 p-4 rounded-2xl flex flex-col gap-2.5 text-xs sm:text-sm text-muted-foreground">
                    <span className="font-bold text-foreground">الخطوات المطلوبة:</span>
                    {todayTask.tasks.map((task, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{task}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end mt-2">
                    <Link
                      href={`/lessons/l_mock_3`}
                      className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/95 text-white font-bold text-xs rounded-xl shadow-md shadow-primary/10 transition-colors"
                    >
                      <Play className="h-3.5 w-3.5 fill-current" />
                      <span>ابدأ مذاكرة اليوم الآن</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Recent Quizzes List */}
              <div className="bg-background border border-border/40 p-6 rounded-3xl shadow-sm">
                <h2 className="text-base font-extrabold mb-5 flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  <span>نتائج الاختبارات التفاعلية الأخيرة</span>
                </h2>
                <div className="flex flex-col gap-4">
                  {recentQuizzes.map((quiz) => (
                    <div key={quiz.id} className="flex items-center justify-between p-4 bg-secondary/10 border border-border/20 rounded-2xl hover:bg-secondary/20 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center font-bold text-primary">
                          ✏️
                        </div>
                        <div className="flex flex-col text-right">
                          <span className="text-xs font-bold text-foreground leading-normal">{quiz.title}</span>
                          <span className="text-[10px] text-muted-foreground mt-0.5">{quiz.subject} • {quiz.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          quiz.score >= 85 
                            ? "bg-emerald-500/10 text-emerald-600" 
                            : "bg-amber-500/10 text-amber-600"
                        }`}>
                          %{quiz.score}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Left Sidebar: Achievements List */}
            <div className="flex flex-col gap-6">
              
              {/* Achievements widget */}
              <div className="bg-background border border-border/40 p-6 rounded-3xl shadow-sm">
                <h2 className="text-base font-extrabold mb-5 flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span>أوسمة الإنجاز والتفوق</span>
                </h2>
                <div className="flex flex-col gap-5">
                  {achievements.map((item, idx) => (
                    <div 
                      key={idx} 
                      className={`flex gap-3.5 items-start p-3 rounded-2xl border transition-all ${
                        item.unlocked 
                          ? "bg-primary/[0.02] border-primary/10" 
                          : "border-border/30 opacity-60 bg-secondary/5"
                      }`}
                    >
                      <div className="text-2xl h-11 w-11 bg-secondary rounded-xl flex items-center justify-center shrink-0">
                        {item.icon}
                      </div>
                      <div className="flex-grow text-right overflow-hidden">
                        <h4 className="font-extrabold text-xs sm:text-sm text-foreground">{item.title}</h4>
                        <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 leading-normal">{item.desc}</p>
                      </div>
                      {item.unlocked && (
                        <span className="text-[9px] px-2 py-0.5 bg-emerald-500/10 text-emerald-600 font-bold rounded-full mt-0.5">
                          مفتوح
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
