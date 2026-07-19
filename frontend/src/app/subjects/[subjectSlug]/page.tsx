"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen, FileText, Video, Play, Award, CheckCircle } from "lucide-react";

export default function SubjectDetail() {
  const { subjectSlug } = useParams();

  // Mock subject data
  const subjectName = subjectSlug === "math" ? "الرياضيات" : "المادة العلمية";

  const units = [
    {
      id: "1",
      title: "الوحدة الأولى: الجبر والتباديل والتوافيق",
      lessons: [
        { id: "l1", title: "مبدأ العد الأساسي وتطبيقاته", duration: "25 دقيقة", hasVideo: true, hasPdf: true, isCompleted: true },
        { id: "l2", title: "التباديل (مفهوم وقوانين)", duration: "30 دقيقة", hasVideo: true, hasPdf: true, isCompleted: false },
        { id: "l3", title: "التوافيق ومسائلها اللفظية", duration: "22 دقيقة", hasVideo: true, hasPdf: true, isCompleted: false }
      ]
    },
    {
      id: "2",
      title: "الوحدة الثانية: مبرهنة ذات الحدين",
      lessons: [
        { id: "l4", title: "صيغة مفكوك ذات الحدين", duration: "28 دقيقة", hasVideo: true, hasPdf: true, isCompleted: false },
        { id: "l5", title: "إيجاد الحد الأوسط والحد الخالي من س", duration: "35 دقيقة", hasVideo: true, hasPdf: true, isCompleted: false }
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow py-12 bg-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          
          {/* Breadcrumbs */}
          <div className="text-xs text-muted-foreground flex items-center gap-2 mb-6">
            <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
            <span>/</span>
            <span className="text-foreground font-semibold">{subjectName}</span>
          </div>

          {/* Subject Header */}
          <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-violet-500/5 border border-border/40 rounded-3xl p-6 sm:p-8 mb-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl font-extrabold mb-3">{subjectName}</h1>
                <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
                  دراسة تفصيلية لكافة الوحدات المقررة في منهج وزارة التربية والتعليم بالجمهورية اليمنية، مع شروحات مبسطة واختبارات قصيرة محاكاة لنمط الأسئلة الوزارية.
                </p>
              </div>
              <div className="flex items-center gap-4 bg-background border border-border/40 px-4 py-3 rounded-2xl self-start md:self-auto">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                  %20
                </div>
                <div className="flex flex-col text-xs">
                  <span className="font-bold">إنجازك العام</span>
                  <span className="text-muted-foreground">1 من أصل 5 دروس</span>
                </div>
              </div>
            </div>
          </div>

          {/* Units and Lessons Accordion/List */}
          <div className="grid grid-cols-1 gap-6">
            {units.map((unit, index) => (
              <motion.div
                key={unit.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-background border border-border/40 rounded-2xl shadow-sm overflow-hidden"
              >
                <div className="p-5 border-b border-border/40 bg-secondary/20 flex items-center justify-between">
                  <h2 className="font-extrabold text-sm sm:text-base text-foreground">{unit.title}</h2>
                  <span className="text-xs text-muted-foreground font-semibold">{unit.lessons.length} دروس</span>
                </div>

                <div className="divide-y divide-border/40">
                  {unit.lessons.map((lesson) => (
                    <div 
                      key={lesson.id}
                      className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-secondary/10 transition-colors"
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="mt-0.5">
                          {lesson.isCompleted ? (
                            <CheckCircle className="h-5 w-5 text-emerald-500" />
                          ) : (
                            <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-sm sm:text-base mb-1">{lesson.title}</h3>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span>مدة الشرح: {lesson.duration}</span>
                            {lesson.hasVideo && (
                              <span className="flex items-center gap-1">
                                <Video className="h-3 w-3" />
                                <span>فيديو</span>
                              </span>
                            )}
                            {lesson.hasPdf && (
                              <span className="flex items-center gap-1">
                                <FileText className="h-3 w-3" />
                                <span>ملخص PDF</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-auto">
                        <Link 
                          href={`/lessons/${lesson.id}`}
                          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-primary hover:bg-primary/95 transition-all rounded-xl"
                        >
                          <Play className="h-3.5 w-3.5 fill-current" />
                          <span>شاهد الدرس</span>
                        </Link>
                        <Link 
                          href={`/quizzes/lesson/${lesson.id}`}
                          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold border border-border hover:bg-secondary transition-all rounded-xl"
                        >
                          <Award className="h-3.5 w-3.5" />
                          <span>اختبر نفسك</span>
                        </Link>
                      </div>
                    </div>
                  ))}
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
