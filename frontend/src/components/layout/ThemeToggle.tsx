"use client";

import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-xl bg-secondary/80 hover:bg-secondary border border-border/40 focus:outline-none transition-colors relative overflow-hidden"
      aria-label={theme === "light" ? "تفعيل الوضع الداكن" : "تفعيل الوضع المضيء"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: -20, opacity: 0, rotate: 45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, rotate: -45 }}
          transition={{ duration: 0.2 }}
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5 text-slate-700 dark:text-slate-200" />
          ) : (
            <Sun className="h-5 w-5 text-yellow-500" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
