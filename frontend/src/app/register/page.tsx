"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, Mail, User, ArrowLeft, GraduationCap, AlertCircle, ArrowRight } from "lucide-react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate registration for frontend presentation
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to student dashboard
      window.location.href = "/dashboard/student";
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-16 bg-secondary/10 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/5 rounded-full blur-[90px] pointer-events-none" />

        <div className="w-full max-w-md px-4 sm:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-background border border-border/40 p-8 rounded-3xl shadow-xl flex flex-col gap-6"
          >
            <div className="text-center">
              <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight">إنشاء حساب جديد</h1>
              <p className="text-xs text-muted-foreground mt-1">ابدأ خطة الـ 150 يوماً للمنهج العلمي بصنعاء وتابع تقدمك خطوة بخطوة.</p>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 text-red-600 rounded-2xl text-xs font-semibold">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-muted-foreground mr-1">الاسم الكامل</label>
                <div className="relative">
                  <User className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                  <input 
                    type="text" 
                    required
                    placeholder="مثال: أحمد محمد علي"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-4 pr-11 py-3 bg-secondary/30 border border-border/80 focus:border-primary focus:outline-none text-xs sm:text-sm rounded-2xl font-semibold"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-muted-foreground mr-1">البريد الإلكتروني</label>
                <div className="relative">
                  <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                  <input 
                    type="email" 
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-4 pr-11 py-3 bg-secondary/30 border border-border/80 focus:border-primary focus:outline-none text-xs sm:text-sm rounded-2xl font-semibold"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-muted-foreground mr-1">كلمة المرور</label>
                <div className="relative">
                  <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                  <input 
                    type="password" 
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-4 pr-11 py-3 bg-secondary/30 border border-border/80 focus:border-primary focus:outline-none text-xs sm:text-sm rounded-2xl font-semibold"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3.5 bg-primary hover:bg-primary/95 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-md shadow-primary/10 transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? "جاري إنشاء الحساب..." : "إنشاء حساب ومباشرة الخطة"}
              </button>
            </form>

            <div className="border-t border-border/40 pt-4 text-center">
              <span className="text-xs text-muted-foreground">لديك حساب بالفعل؟ </span>
              <Link href="/login" className="text-xs font-bold text-primary hover:underline">
                سجل الدخول هنا
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
