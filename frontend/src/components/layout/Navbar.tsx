"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, BookOpen, User, Calendar, Award } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "الرئيسية", href: "/", icon: BookOpen },
    { name: "الخطة الدراسية (150 يوم)", href: "/study-plan", icon: Calendar },
    { name: "تحليل الامتحانات الوزارية", href: "/exams", icon: Award },
    { name: "الاختبارات القصيرة", href: "/quizzes", icon: Award },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-border/40 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-primary to-violet-600 flex items-center justify-center shadow-lg shadow-primary/20">
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
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-2 px-3 text-sm font-semibold transition-all rounded-lg hover:text-primary ${
                  isActive ? "text-primary bg-primary/5" : "text-muted-foreground"
                }`}
              >
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full mx-3"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Link 
            href="/login" 
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold border border-border hover:bg-secondary/60 transition-colors rounded-xl"
          >
            <User className="h-4 w-4" />
            <span>تسجيل الدخول</span>
          </Link>
          <Link 
            href="/register" 
            className="px-4 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary/95 transition-all shadow-md shadow-primary/10 rounded-xl hover:translate-y-[-1px]"
          >
            حساب جديد
          </Link>
        </div>

        {/* Mobile Menu & Theme Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl bg-secondary/80 text-muted-foreground hover:text-foreground border border-border/40 focus:outline-none"
            aria-label="القائمة"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-lg overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-xl text-base font-semibold hover:bg-secondary/80 transition-colors ${
                    pathname === item.href ? "text-primary bg-primary/5" : "text-muted-foreground"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
              <div className="h-px bg-border/60 my-2" />
              <div className="grid grid-cols-2 gap-3">
                <Link 
                  href="/login" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-1.5 p-3 text-sm font-semibold border border-border hover:bg-secondary/60 transition-colors rounded-xl"
                >
                  <User className="h-4 w-4" />
                  <span>تسجيل الدخول</span>
                </Link>
                <Link 
                  href="/register" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center p-3 text-sm font-semibold text-white bg-primary hover:bg-primary/95 transition-all text-center rounded-xl"
                >
                  حساب جديد
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
