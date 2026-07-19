"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, User, GraduationCap, AlertCircle, Sparkles } from "lucide-react";
import ThemeToggle from "@/components/layout/ThemeToggle";

export default function Home() {
  const [studentName, setStudentName] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      // Validate access code
      if (accessCode.trim() === "2026") {
        localStorage.setItem("studentName", studentName.trim());
        setIsLoading(false);
        // Redirect to student dashboard
        window.location.href = "/dashboard/student";
      } else {
        setIsLoading(false);
        setError("رمز الدخول الموحد غير صحيح. يرجى إدخال (2026) للدخول.");
      }
    }, 800);
  };

  if (!mounted) {
    return null;
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-secondary/10 relative overflow-hidden py-12 px-4 sm:px-6">
      
      {/* Absolute theme toggle */}
      <div className="absolute top-6 left-6 z-20">
        <ThemeToggle />
      </div>

      {/* Background blobs for premium depth */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-background border border-border/40 p-8 rounded-3xl shadow-xl flex flex-col gap-6"
        >
          {/* Header */}
          <div className="text-center">
            <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4 relative">
              <GraduationCap className="h-7 w-7" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-emerald-500 rounded-full animate-ping" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">منصة التعليم الثانوي</h1>
            <p className="text-xs text-muted-foreground mt-2">
              الصف الثالث الثانوي العلمي (منهج صنعاء - اليمن 🇾🇪)
            </p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 p-3.5 bg-red-500/10 border border-red-500/20 text-red-600 rounded-2xl text-xs font-bold text-right"
            >
              <AlertCircle className="h-4.5 w-4.5 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            {/* Student Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-muted-foreground mr-1">اسم الطالب الرباعي</label>
              <div className="relative">
                <User className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                <input 
                  type="text" 
                  required
                  placeholder="اكتب اسمك هنا..."
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full pl-4 pr-11 py-3.5 bg-secondary/35 border border-border/70 focus:border-primary focus:outline-none text-xs sm:text-sm rounded-2xl font-semibold"
                />
              </div>
            </div>

            {/* Access Code */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-muted-foreground mr-1">رمز الدخول الموحد</label>
              <div className="relative">
                <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                <input 
                  type="password" 
                  required
                  placeholder="رمز الدخول الموحد للطلاب..."
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  className="w-full pl-4 pr-11 py-3.5 bg-secondary/35 border border-border/70 focus:border-primary focus:outline-none text-xs sm:text-sm rounded-2xl font-semibold text-center tracking-widest font-mono"
                />
              </div>
              <span className="text-[10px] text-muted-foreground/90 font-bold mr-1 flex items-center gap-1 mt-1">
                <Sparkles className="h-3 w-3 text-primary animate-pulse" />
                <span>رمز الدخول الموحد الموزع للطلاب هو: <b>2026</b></span>
              </span>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-4 bg-primary hover:bg-primary/95 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all flex items-center justify-center gap-2 hover:translate-y-[-1px]"
            >
              {isLoading ? "جاري الدخول للبوابة..." : "دخول للبوابة الدراسية"}
            </button>
          </form>

          {/* Footer flag / note */}
          <div className="border-t border-border/40 pt-4 text-center">
            <span className="text-[10px] sm:text-xs text-muted-foreground font-bold leading-normal">
              وزارة التربية والتعليم بالجمهورية اليمنية 🇾🇪
            </span>
          </div>

        </motion.div>
      </div>

    </main>
  );
}
