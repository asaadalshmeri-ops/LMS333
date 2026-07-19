"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Award, 
  Filter, 
  ArrowLeft, 
  BarChart3, 
  HelpCircle, 
  AlertTriangle, 
  CheckCircle2,
  Bookmark,
  Sparkles,
  ChevronDown
} from "lucide-react";

export default function ExamAnalysis() {
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [openExplanationId, setOpenExplanationId] = useState<string | null>(null);

  const topicsStats = [
    { name: "التفاضل والتكامل (رياضيات)", recurringRate: "35%", difficulty: "صعب" },
    { name: "الكهرباء والمغناطيسية (فيزياء)", recurringRate: "28%", difficulty: "متوسط" },
    { name: "الكيمياء العضوية (كيمياء)", recurringRate: "25%", difficulty: "متوسط" },
    { name: "الوراثة والكروموسومات (أحياء)", recurringRate: "20%", difficulty: "صعب" }
  ];

  const questions = [
    {
      id: "q1",
      year: 2024,
      subject: "الرياضيات",
      subjectSlug: "math",
      unit: "الوحدة الرابعة: التفاضل والتكامل",
      topic: "التفاضل والتكامل - القيم القصوى",
      questionText: "إذا كانت د(س) = س³ - 3س + 2، أوجد القيم العظمى والصغرى المحلية للدالة مبينًا فترات التزايد والتناقص.",
      difficulty: "متوسط",
      successRate: "62%",
      isRepeated: true,
      repeatedCount: 5,
      explanation: `خطوات الحل النموذجي المعتمد:
1. إيجاد المشتقة الأولى: د'(س) = 3س² - 3.
2. مساواة المشتقة بالصفر لإيجاد النقاط الحرجة:
   3س² - 3 = 0  =>  3(س² - 1) = 0  =>  س = 1  أو  س = -1.
3. دراسة إشارة د'(س):
   - الدالة متزايدة في الفترة (-∞ ، -1) و (1 ، ∞).
   - الدالة متناقصة في الفترة (-1 ، 1).
4. تحديد القيم القصوى:
   - عند س = -1 توجد قيمة عظمى محلية قيمتها د(-1) = 4.
   - عند س = 1 توجد قيمة صغرى محلية قيمتها د(1) = 0.`
    },
    {
      id: "q2",
      year: 2023,
      subject: "الفيزياء",
      subjectSlug: "physics",
      unit: "الوحدة الأولى: التيار المتردد",
      topic: "التيار المتردد - الرنين",
      questionText: "ما هي شروط حدوث حالة الرنين في دائرة تيار متردد تحتوي على مقاومة ومكثف وملف حثي؟ وما هي قيمة معوقة الدائرة حينها؟",
      difficulty: "صعب",
      successRate: "45%",
      isRepeated: true,
      repeatedCount: 3,
      explanation: `شروط حدوث حالة الرنين الكهرومغناطيسي:
1. تتساوى المفاعلة الحثية (م ح) مع المفاعلة السعوية (م س)، أي: م ح = م س.
2. يكون الجهد الكلي في نفس الطور مع التيار الكلي (زاوية الطور تساوي صفر).
3. تكون الممانعة الكلية (المعوقة ز) للدائرة عند قيمتها الصغرى وتساوي المقاومة الأومية فقط: ز = م.
4. يمر في الدائرة أكبر تيار ممكن.`
    },
    {
      id: "q3",
      year: 2022,
      subject: "الكيمياء",
      subjectSlug: "chemistry",
      unit: "الوحدة الأولى: سرعة التفاعلات",
      topic: "ثابت معدل التفاعل",
      questionText: "وضح أثر درجة الحرارة على ثابت معدل التفاعل الكيميائي وطاقة التنشيط وفقاً لنظرية التصادم.",
      difficulty: "سهل",
      successRate: "81%",
      isRepeated: false,
      repeatedCount: 1,
      explanation: `أثر الحرارة وطاقة التنشيط:
1. رفع درجة الحرارة يزيد من متوسط الطاقة الحركية للجزيئات، مما يزيد من عدد التصادمات الفعالة وبالتالي يزداد ثابت معدل التفاعل الكيميائي.
2. طاقة التنشيط تظل ثابتة للتفاعل لأنها صفة مميزة للمواد المتفاعلة ولا تتغير بتغير درجة الحرارة، بتغير عامل حفاز فقط.`
    }
  ];

  const handleToggleExplanation = (id: string) => {
    setOpenExplanationId(openExplanationId === id ? null : id);
  };

  const filteredQuestions = questions.filter(q => {
    const matchesSubject = selectedSubject === "all" || q.subjectSlug === selectedSubject;
    const matchesYear = selectedYear === "all" || String(q.year) === selectedYear;
    return matchesSubject && matchesYear;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow py-12 bg-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-4">
              <Award className="h-4 w-4" />
              <span>التحليل الإحصائي للامتحانات الوزارية بصنعاء</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">تحليل وتفكيك الأسئلة الوزارية السابقة</h1>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              قمنا بفهرسة وتصنيف أسئلة الأعوام السابقة وتحديد الأنماط الأكثر تكراراً لتوفير مراجعة مركزة تضمن لك التفوق في الامتحانات.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-background border border-border/40 p-6 rounded-3xl md:col-span-2 shadow-sm">
              <h2 className="font-extrabold text-sm sm:text-base flex items-center gap-2 mb-4">
                <BarChart3 className="h-5 w-5 text-primary" />
                <span>الفصول الأكثر تكراراً في الامتحانات الوزارية</span>
              </h2>
              <div className="flex flex-col gap-4">
                {topicsStats.map((topic, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span>{topic.name}</span>
                      <span className="text-primary">{topic.recurringRate} تكرار نسبي</span>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-violet-600 rounded-full" 
                        style={{ width: topic.recurringRate }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-background border border-border/40 p-6 rounded-3xl flex flex-col justify-between shadow-sm">
              <div>
                <h2 className="font-extrabold text-sm sm:text-base flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  <span>توزيع صعوبة الأسئلة الوزارية</span>
                </h2>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  الأسئلة تأتي متوازنة لتناسب جميع مستويات الطلاب:
                </p>
                <div className="flex flex-col gap-2 mt-4 text-xs font-semibold">
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-500">مباشر (تذكر وفهم)</span>
                    <span>40%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-500">متوسط (تطبيق وحساب)</span>
                    <span>35%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-red-500">استنتاجي (حل مسائل مركبة)</span>
                    <span>25%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="bg-background border border-border/40 p-4 rounded-2xl mb-8 flex flex-wrap items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-bold">تصفية الأسئلة:</span>
            </div>
            
            <div className="flex items-center gap-3">
              <select 
                value={selectedSubject} 
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="text-xs px-3 py-2 bg-secondary/80 border border-border rounded-xl font-bold focus:outline-none"
              >
                <option value="all">كل المواد العلمية</option>
                <option value="math">الرياضيات</option>
                <option value="physics">الفيزياء</option>
                <option value="chemistry">الكيمياء</option>
              </select>

              <select 
                value={selectedYear} 
                onChange={(e) => setSelectedYear(e.target.value)}
                className="text-xs px-3 py-2 bg-secondary/80 border border-border rounded-xl font-bold focus:outline-none"
              >
                <option value="all">كل السنوات</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
            </div>
          </div>

          {/* Questions List */}
          <div className="flex flex-col gap-6">
            {filteredQuestions.map((q) => (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-background border border-border/40 rounded-3xl p-6 shadow-sm overflow-hidden"
              >
                {/* Header tags */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/40 pb-4 mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-bold px-2.5 py-1 bg-primary/10 text-primary rounded-full">
                      {q.subject}
                    </span>
                    <span className="text-xs text-muted-foreground font-semibold">{q.unit}</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-semibold">
                    <span className="text-muted-foreground">عام {q.year}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                      q.difficulty === "صعب" ? "bg-red-500/10 text-red-600" : "bg-amber-500/10 text-amber-600"
                    }`}>
                      {q.difficulty}
                    </span>
                    
                    {/* Repeated question tag */}
                    {q.isRepeated && (
                      <span className="flex items-center gap-1 bg-emerald-500/10 text-emerald-600 px-2.5 py-1 rounded-full text-[10px] font-bold">
                        <Sparkles className="h-3 w-3" />
                        <span>مكرر {q.repeatedCount} مرات وزارياً</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 mb-4">
                  <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base font-bold leading-relaxed">{q.questionText}</p>
                </div>

                {/* Model Solution toggle */}
                <div className="border-t border-border/20 pt-4 flex flex-col gap-3">
                  <button 
                    onClick={() => handleToggleExplanation(q.id)}
                    className="flex items-center gap-1.5 text-xs font-bold text-primary self-start hover:underline focus:outline-none"
                  >
                    <span>{openExplanationId === q.id ? "إخفاء الحل المعتمد" : "عرض الحل النموذجي المعتمد"}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${openExplanationId === q.id ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {openExplanationId === q.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 bg-secondary/35 border border-border/40 rounded-2xl text-xs sm:text-sm text-muted-foreground whitespace-pre-line leading-[1.7] font-semibold mt-2">
                          {q.explanation}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
