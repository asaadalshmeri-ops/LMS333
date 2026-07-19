"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Award, 
  Clock, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ChevronLeft, 
  RefreshCw, 
  AlertCircle,
  FileQuestion
} from "lucide-react";

export default function InteractiveQuiz() {
  const { lessonId } = useParams();
  const [status, setStatus] = useState<"taking" | "submitting" | "result">("taking");
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [gradeResult, setGradeResult] = useState<any>(null);

  const questions = [
    {
      id: "q_mcq",
      type: "MCQ",
      questionText: "ما الذي يحدث للمفاعلة السعوية للمكثف عند مضاعفة سعة المكثف إلى الضعف مع ثبات التردد؟",
      options: [
        "تتضاعف المفاعلة السعوية للضعف",
        "تقل المفاعلة السعوية إلى النصف",
        "تظل المفاعلة السعوية ثابتة دون تغيير",
        "تزداد المفاعلة السعوية أربعة أضعاف"
      ],
      correctAnswer: "1",
      explanation: "بما أن المفاعلة السعوية تتناسب عكسياً مع سعة المكثف (م س = 1 / (2 * ط * ت * س))، فإن مضاعفة السعة تؤدي تلقائياً لنقصان المفاعلة إلى النصف."
    },
    {
      id: "q_tf",
      type: "TRUE_FALSE",
      questionText: "المكثف يمرر التيار الكهربائي المستمر (DC) بشكل دائم بمجرد اتصاله بمصدر الجهد.",
      correctAnswer: "false",
      explanation: "المكثف يقطع التيار المستمر تماماً بمجرد أن يشحن بالكامل لأن جهد المكثف يصبح مساوياً لجهد المصدر ومعاكساً له."
    },
    {
      id: "q_fb",
      type: "FILL_BLANKS",
      questionText: "في دوائر التيار المتردد التي تحتوي على مكثف فقط، يتقدم المتجه الطوري للتيار على المتجه الطوري للجهد بزاوية طور مقدارها _______ درجة.",
      correctAnswer: "90",
      explanation: "التيار يتقدم على الجهد بربع دورة كاملة وهو ما يكافئ 90 درجة أو باي/2 راديان."
    },
    {
      id: "q_sa",
      type: "SHORT_ANSWER",
      questionText: "لماذا لا يستهلك المكثف طاقة حرارية في دوائر التيار المتردد؟ (اكتب إجابة مختصرة)",
      correctAnswer: "لأنه يخزن الطاقة في صورة مجال كهربائي ويعيدها للمصدر",
      explanation: "المكثف المثالي لا يبدد طاقة حرارية كالمقاومة المادية، بل يخزن الطاقة في مجاله الكهربائي أثناء الشحن ويعيدها مجدداً للدائرة أثناء التفريغ."
    },
    {
      id: "q_essay",
      type: "ESSAY",
      questionText: "اشرح آلية مرور التيار المتردد في دائرة تحتوي على مكثف كهربائي بالرغم من وجود مادة عازلة بين لوحيه.",
      correctAnswer: "عن طريق الشحن والتفريغ المستمر نتيجة تغيير قطبية المصدر المتردد",
      explanation: "التيار لا يعبر المادة العازلة؛ بدلاً من ذلك، يؤدي التغير الدوري لجهد المصدر المتردد إلى تكرار عمليتي الشحن والتفريغ، مما يسبب حركة الإلكترونات في الأسلاك الخارجية بشكل تذبذبي يعطي مظهر مرور التيار."
    },
    {
      id: "q_calc",
      type: "CALCULATION",
      questionText: "مكثف سعته (7) ميكروفاراد متصل بمصدر تردد 50 هرتز. احسب ممانعته للتيار بفرض باي = 22/7. (اكتب الناتج كقيمة عشرية)",
      correctAnswer: "454.5",
      explanation: "العلاقة: م س = 1 / (2 * باي * ت * س). التعويض: م س = 1 / (2 * (22/7) * 50 * 7 * 10^-6) = 10^6 / 2200 = 454.5 أوم."
    }
  ];

  // Timer countdown
  useEffect(() => {
    if (status !== "taking") return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [status]);

  const handleSelectAnswer = (qId: string, val: string) => {
    setAnswers(prev => ({ ...prev, [qId]: val }));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setStatus("submitting");

    // Simulate grading calculations
    setTimeout(() => {
      let correct = 0;
      const gradedResults = questions.map(q => {
        const studentAns = answers[q.id]?.trim() || "";
        let isCorrect = false;

        if (q.type === "MCQ") {
          isCorrect = studentAns === q.correctAnswer;
        } else if (q.type === "TRUE_FALSE") {
          isCorrect = studentAns.toLowerCase() === q.correctAnswer;
        } else if (q.type === "FILL_BLANKS") {
          isCorrect = studentAns.toLowerCase() === q.correctAnswer.toLowerCase();
        } else if (q.type === "SHORT_ANSWER") {
          const keywords = ["يخزن", "مجال", "يعيد", "مقاومة"];
          isCorrect = keywords.some(kw => studentAns.includes(kw)) || studentAns.length > 5;
        } else if (q.type === "CALCULATION") {
          const num = parseFloat(studentAns);
          const correctNum = parseFloat(q.correctAnswer);
          isCorrect = Math.abs(num - correctNum) < 10.0;
        } else {
          isCorrect = studentAns.length > 10;
        }

        if (isCorrect) correct = correct + 1;

        return {
          id: q.id,
          questionText: q.questionText,
          type: q.type,
          studentAns,
          correctAns: q.correctAnswer,
          isCorrect,
          explanation: q.explanation
        };
      });
      const score = (correct / questions.length) * 100;
      const formattedScore = parseFloat(score.toFixed(1));
      setGradeResult({
        score: formattedScore,
        correctCount: correct,
        totalCount: questions.length,
        results: gradedResults
      });
      setStatus("result");

      // Save score to shared localStorage for Admin view
      const studentName = localStorage.getItem("studentName") || "طالب تجريبي";
      const subjectName = String(lessonId).includes("math") 
        ? "الرياضيات" 
        : String(lessonId).includes("chemistry") 
        ? "الكيمياء" 
        : "الفيزياء";
      const lessonTitle = String(lessonId).includes("math")
        ? "مبدأ العد الأساسي وتطبيقاته"
        : String(lessonId).includes("chemistry")
        ? "سرعة التفاعلات الكيميائية ومعدل التغير"
        : "المكثف والتردد في دوائر التيار المتردد";

      const newRecord = {
        id: "score_" + Date.now(),
        studentName,
        subjectName,
        lessonTitle,
        score: formattedScore,
        date: new Date().toLocaleDateString("ar-YE", { month: "short", day: "numeric" }),
        time: new Date().toLocaleTimeString("ar-YE", { hour: "numeric", minute: "2-digit" })
      };

      const existingRecords = JSON.parse(localStorage.getItem("adminStudentScores") || "[]");
      existingRecords.unshift(newRecord);
      localStorage.setItem("adminStudentScores", JSON.stringify(existingRecords));
    }, 1500);
  };

  const handleRestart = () => {
    setAnswers({});
    setTimeLeft(900);
    setStatus("taking");
    setGradeResult(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow py-12 bg-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          
          <AnimatePresence mode="wait">
            {status === "taking" && (
              <motion.form 
                key="taking"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="flex flex-col gap-6"
              >
                {/* Header card with timer */}
                <div className="bg-background border border-border/40 p-6 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                      <FileQuestion className="h-5 w-5" />
                    </div>
                    <div>
                      <h1 className="text-xl font-extrabold">الاختبار التقويمي الشامل للدرس</h1>
                      <span className="text-xs text-muted-foreground">يغطي 6 أنماط من الأسئلة للتحقق الفعلي من فهمك.</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-secondary/50 border border-border px-4 py-2.5 rounded-2xl shrink-0 self-start sm:self-auto">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-xs sm:text-sm font-mono font-bold">{formatTime(timeLeft)}</span>
                  </div>
                </div>

                {/* Questions list */}
                <div className="flex flex-col gap-6">
                  {questions.map((q, idx) => (
                    <div key={q.id} className="bg-background border border-border/40 p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col gap-5">
                      <div className="flex items-start gap-2.5">
                        <span className="font-extrabold text-sm sm:text-base text-primary">{idx + 1}.</span>
                        <h3 className="font-bold text-sm sm:text-base leading-relaxed">{q.questionText}</h3>
                      </div>

                      {/* Inputs depending on type */}
                      {q.type === "MCQ" && q.options && (
                        <div className="flex flex-col gap-3 pr-4">
                          {q.options.map((opt, oIdx) => (
                            <label 
                              key={oIdx} 
                              className={`flex items-center gap-3 p-3.5 border rounded-2xl cursor-pointer hover:bg-secondary/40 transition-colors ${
                                answers[q.id] === String(oIdx) 
                                  ? "border-primary bg-primary/5 text-primary" 
                                  : "border-border/60"
                              }`}
                            >
                              <input 
                                type="radio" 
                                name={q.id}
                                value={oIdx}
                                checked={answers[q.id] === String(oIdx)}
                                onChange={() => handleSelectAnswer(q.id, String(oIdx))}
                                className="h-4 w-4 accent-primary"
                              />
                              <span className="text-xs sm:text-sm font-semibold">{opt}</span>
                            </label>
                          ))}
                        </div>
                      )}

                      {q.type === "TRUE_FALSE" && (
                        <div className="flex gap-4 pr-4">
                          {[
                            { name: "صح", val: "true" },
                            { name: "خطأ", val: "false" }
                          ].map(opt => (
                            <button
                              key={opt.val}
                              type="button"
                              onClick={() => handleSelectAnswer(q.id, opt.val)}
                              className={`flex-1 p-3.5 border font-bold text-xs sm:text-sm rounded-2xl transition-all ${
                                answers[q.id] === opt.val
                                  ? "border-primary bg-primary/5 text-primary"
                                  : "border-border hover:bg-secondary/40 text-muted-foreground"
                              }`}
                            >
                              {opt.name}
                            </button>
                          ))}
                        </div>
                      )}

                      {q.type === "FILL_BLANKS" && (
                        <div className="pr-4">
                          <input 
                            type="text"
                            placeholder="اكتب الكلمة أو القيمة الناقصة هنا..."
                            value={answers[q.id] || ""}
                            onChange={(e) => handleSelectAnswer(q.id, e.target.value)}
                            className="w-full p-3.5 bg-secondary/30 border border-border/80 focus:border-primary focus:outline-none text-xs sm:text-sm rounded-2xl font-bold"
                          />
                        </div>
                      )}

                      {q.type === "SHORT_ANSWER" && (
                        <div className="pr-4">
                          <input 
                            type="text"
                            placeholder="اكتب إجابة مختصرة تعكس فهمك..."
                            value={answers[q.id] || ""}
                            onChange={(e) => handleSelectAnswer(q.id, e.target.value)}
                            className="w-full p-3.5 bg-secondary/30 border border-border/80 focus:border-primary focus:outline-none text-xs sm:text-sm rounded-2xl font-bold"
                          />
                        </div>
                      )}

                      {q.type === "ESSAY" && (
                        <div className="pr-4">
                          <textarea 
                            rows={4}
                            placeholder="اكتب شرحاً تفصيلياً معبراً باللغة العربية المنهجية الميسرة..."
                            value={answers[q.id] || ""}
                            onChange={(e) => handleSelectAnswer(q.id, e.target.value)}
                            className="w-full p-3.5 bg-secondary/30 border border-border/80 focus:border-primary focus:outline-none text-xs sm:text-sm rounded-2xl font-semibold leading-relaxed"
                          />
                        </div>
                      )}

                      {q.type === "CALCULATION" && (
                        <div className="pr-4 flex flex-col gap-2">
                          <input 
                            type="text"
                            placeholder="أدخل ناتج العملية الحسابية بالأرقام..."
                            value={answers[q.id] || ""}
                            onChange={(e) => handleSelectAnswer(q.id, e.target.value)}
                            className="w-full p-3.5 bg-secondary/30 border border-border/80 focus:border-primary focus:outline-none text-xs sm:text-sm rounded-2xl font-bold text-left"
                            dir="ltr"
                          />
                          <span className="text-[10px] text-muted-foreground font-semibold">تأكد من استخدام الأرقام الإنجليزية عند الإدخال (مثال: 454.5).</span>
                        </div>
                      )}

                    </div>
                  ))}
                </div>

                {/* Submit Panel */}
                <div className="flex justify-end mt-4">
                  <button 
                    type="submit"
                    className="px-8 py-4 bg-primary text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-md hover:bg-primary/95 transition-all"
                  >
                    تسليم الاختبار للتصحيح الفوري
                  </button>
                </div>
              </motion.form>
            )}

            {status === "submitting" && (
              <motion.div 
                key="submitting"
                className="bg-background border border-border/40 p-12 rounded-3xl text-center shadow-sm min-h-[300px] flex flex-col items-center justify-center gap-4"
              >
                <RefreshCw className="h-10 w-10 text-primary animate-spin" />
                <h2 className="font-extrabold text-base">جاري تصحيح إجاباتك إلكترونياً...</h2>
                <p className="text-xs text-muted-foreground max-w-xs">نقوم بمقارنة الحلول والتحقق من الكلمات الدلالية والتسامح العشري للمسائل الحسابية.</p>
              </motion.div>
            )}

            {status === "result" && gradeResult && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col gap-6"
              >
                {/* Result header */}
                <div className="bg-background border border-border/40 p-6 sm:p-8 rounded-3xl text-center shadow-sm flex flex-col items-center gap-4">
                  <div className="h-14 w-14 bg-primary/10 text-primary rounded-full flex items-center justify-center text-2xl font-bold">
                    <Award className="h-7 w-7" />
                  </div>
                  <div>
                    <h1 className="text-xl font-extrabold">تفاصيل نتيجة التقييم الذاتي</h1>
                    <p className="text-xs text-muted-foreground mt-1">لقد أجبت بشكل صحيح على {gradeResult.correctCount} من أصل {gradeResult.totalCount} أسئلة.</p>
                  </div>
                  <div className="text-4xl font-black text-primary">%{gradeResult.score}</div>

                  <div className="flex gap-3 mt-2">
                    <button 
                      onClick={handleRestart}
                      className="px-6 py-2.5 bg-primary text-white font-bold text-xs rounded-xl shadow-md hover:bg-primary/95 transition-all"
                    >
                      إعادة الاختبار
                    </button>
                    <Link
                      href="/dashboard/student"
                      className="px-6 py-2.5 border border-border hover:bg-secondary/40 text-xs font-bold rounded-xl transition-all"
                    >
                      العودة للوحة التحكم
                    </Link>
                  </div>
                </div>

                {/* Explanatory corrections list */}
                <div className="flex flex-col gap-6">
                  {gradeResult.results.map((res: any, idx: number) => (
                    <div 
                      key={res.id}
                      className={`bg-background border p-6 rounded-3xl shadow-sm flex flex-col gap-4 ${
                        res.isCorrect 
                          ? "border-emerald-500/20" 
                          : "border-red-500/20"
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/40 pb-3">
                        <span className="text-xs font-bold text-muted-foreground">السؤال {idx + 1}</span>
                        <div className="flex items-center gap-1.5">
                          {res.isCorrect ? (
                            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              <span>إجابة صحيحة</span>
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-xs font-bold text-red-600 dark:text-red-400 bg-red-500/10 px-2.5 py-1 rounded-full">
                              <XCircle className="h-3.5 w-3.5" />
                              <span>إجابة غير صحيحة</span>
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-sm sm:text-base font-bold">{res.questionText}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div className="p-3 bg-secondary/15 rounded-xl border border-border/20">
                          <span className="font-bold text-muted-foreground">إجابتك:</span>
                          <p className="font-semibold text-foreground mt-1">{res.studentAns || "(لم يتم إدخال إجابة)"}</p>
                        </div>
                        <div className="p-3 bg-primary/5 rounded-xl border border-primary/10">
                          <span className="font-bold text-primary">الإجابة النموذجية المعتمدة:</span>
                          <p className="font-bold text-foreground mt-1">
                            {res.type === "TRUE_FALSE" 
                              ? (res.correctAns === "true" ? "صح" : "خطأ") 
                              : res.type === "MCQ" 
                              ? questions.find(q => q.id === res.id)?.options?.[parseInt(res.correctAns)]
                              : res.correctAns}
                          </p>
                        </div>
                      </div>

                      {/* Explanation */}
                      <div className="p-4 bg-secondary/30 rounded-2xl border border-border/40 text-xs sm:text-sm">
                        <span className="font-bold text-primary flex items-center gap-1 mb-2">
                          <AlertCircle className="h-4 w-4" />
                          <span>الشرح والتوضيح العلمي:</span>
                        </span>
                        <p className="text-muted-foreground leading-relaxed">
                          {res.explanation}
                        </p>
                      </div>

                    </div>
                  ))}
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>

      <Footer />
    </div>
  );
}
