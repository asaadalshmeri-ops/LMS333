"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { 
  UploadCloud, 
  Globe, 
  RefreshCw, 
  Check, 
  X, 
  Terminal, 
  Layers, 
  AlertCircle, 
  BookOpen, 
  Calendar,
  CheckCircle2,
  XCircle,
  FileText,
  Award,
  Trash2
} from "lucide-react";

export default function AdminCurriculumManager() {
  const [activeTab, setActiveTab] = useState<"wizard" | "crawler" | "updates" | "scores">("wizard");
  const [isCrawling, setIsCrawling] = useState(false);
  const [studentScores, setStudentScores] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<{ id: string; nameAr: string; slug: string }[]>([]);
  const [pendingUpdates, setPendingUpdates] = useState<any[]>([]);
  const [crawlerLogs, setCrawlerLogs] = useState<any[]>([]);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);
  const [isLoadingUpdates, setIsLoadingUpdates] = useState(false);
  const [isLoadingSubjects, setIsLoadingSubjects] = useState(false);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // Fetch subjects
  useEffect(() => {
    async function fetchSubjects() {
      setIsLoadingSubjects(true);
      try {
        const res = await fetch(`${API_BASE}/api/curriculum/subjects`);
        const data = await res.json();
        if (data.success) {
          setSubjects(data.subjects);
        }
      } catch (err) {
        console.error("Error fetching subjects:", err);
      } finally {
        setIsLoadingSubjects(false);
      }
    }
    fetchSubjects();
  }, [API_BASE]);

  // Fetch pending updates
  const fetchPendingUpdates = async () => {
    setIsLoadingUpdates(true);
    try {
      const res = await fetch(`${API_BASE}/api/curriculum/updates`);
      const data = await res.json();
      if (data.success) {
        const mapped = data.updates.map((update: any) => {
          const version = update.version || {};
          const file = version.curriculumFile || {};
          const subject = file.subject || {};
          return {
            id: update.id,
            subject: subject.nameAr || "مادة غير معروفة",
            editionYear: version.editionYear,
            version: version.versionNumber,
            fileName: file.fileName || "ملف غير معروف",
            fileSize: file.fileSize ? `${(file.fileSize / (1024 * 1024)).toFixed(1)} MB` : "غير معروف",
            fileHash: file.fileHash || "",
            changeSummary: version.changeSummary || update.message || ""
          };
        });
        setPendingUpdates(mapped);
      }
    } catch (err) {
      console.error("Error fetching updates:", err);
    } finally {
      setIsLoadingUpdates(false);
    }
  };

  useEffect(() => {
    if (activeTab === "updates") {
      fetchPendingUpdates();
    }
  }, [activeTab, API_BASE]);

  // Fetch crawler logs
  const fetchCrawlerLogs = async () => {
    setIsLoadingLogs(true);
    try {
      const res = await fetch(`${API_BASE}/api/curriculum/jobs`);
      const data = await res.json();
      if (data.success && data.crawlerJobs && data.crawlerJobs.length > 0) {
        const latestJob = data.crawlerJobs[0];
        const logLines = latestJob.logs.split("\n").filter((l: string) => l.trim() !== "");
        const formattedLogs = logLines.map((line: string) => {
          const timestampMatch = line.match(/^\[(.*?)\]/);
          const timestamp = timestampMatch ? new Date(timestampMatch[1]).toLocaleTimeString() : new Date(latestJob.createdAt).toLocaleTimeString();
          
          let type = "info";
          let cleanText = line;
          if (timestampMatch) {
            cleanText = line.substring(timestampMatch[0].length).trim();
          }

          if (cleanText.startsWith("[MATCH]")) {
            type = "match";
            cleanText = cleanText.substring(7).trim();
          } else if (cleanText.startsWith("[WARNING]")) {
            type = "warning";
            cleanText = cleanText.substring(9).trim();
          } else if (cleanText.startsWith("[ERROR]")) {
            type = "warning";
            cleanText = cleanText.substring(7).trim();
          } else if (cleanText.startsWith("[DOWNLOAD]")) {
            type = "info";
            cleanText = cleanText.substring(10).trim();
          } else if (cleanText.startsWith("[NEW FILE]")) {
            type = "success";
            cleanText = cleanText.substring(10).trim();
          } else if (cleanText.includes("completed successfully")) {
            type = "success";
          } else if (cleanText.startsWith("[INFO]")) {
            type = "info";
            cleanText = cleanText.substring(6).trim();
          }

          return {
            timestamp,
            type,
            text: cleanText
          };
        });
        setCrawlerLogs(formattedLogs);
      } else {
        setCrawlerLogs([
          { timestamp: "--:--:--", type: "info", text: "لم يتم تشغيل أي زحف تلقائي بعد. يمكنك الضغط على زر تشغيل الزاحف المجدول الفوري بالأعلى." }
        ]);
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setIsLoadingLogs(false);
    }
  };

  useEffect(() => {
    if (activeTab === "crawler") {
      fetchCrawlerLogs();
    }
  }, [activeTab, API_BASE]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const scores = JSON.parse(localStorage.getItem("adminStudentScores") || "[]");
      setStudentScores(scores);
    }
  }, [activeTab]);

  const [selectedSubject, setSelectedSubject] = useState("");
  const [editionYear, setEditionYear] = useState("2026");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<{ type: "success" | "error" | "loading" | null; msg: string }>({ type: null, msg: "" });

  const handleCrawlTrigger = async () => {
    setIsCrawling(true);
    setCrawlerLogs(prev => [
      ...prev,
      { timestamp: new Date().toLocaleTimeString(), type: "info", text: "جاري إرسال طلب الزحف الفوري للخادم..." }
    ]);

    try {
      const res = await fetch(`${API_BASE}/api/curriculum/crawl`, {
        method: "POST"
      });
      const data = await res.json();
      if (data.success) {
        setCrawlerLogs(prev => [
          ...prev,
          { timestamp: new Date().toLocaleTimeString(), type: "success", text: "تم بدء الزاحف بنجاح في الخلفية!" }
        ]);
        // Refresh logs after brief delays
        setTimeout(fetchCrawlerLogs, 1500);
        setTimeout(fetchCrawlerLogs, 4000);
      } else {
        setCrawlerLogs(prev => [
          ...prev,
          { timestamp: new Date().toLocaleTimeString(), type: "warning", text: `فشل بدء الزاحف: ${data.message}` }
        ]);
      }
    } catch (err: any) {
      setCrawlerLogs(prev => [
        ...prev,
        { timestamp: new Date().toLocaleTimeString(), type: "warning", text: `خطأ في الاتصال بالخادم: ${err.message}` }
      ]);
    } finally {
      setIsCrawling(false);
    }
  };

  const handleManualUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile || !selectedSubject) {
      setUploadStatus({ type: "error", msg: "يرجى تحديد الملف والمادة الدراسية أولاً." });
      return;
    }

    setUploadStatus({ type: "loading", msg: "جاري رفع الكتاب المدرسي وتفكيك فصوله بالذكاء الاصطناعي..." });

    try {
      const formData = new FormData();
      formData.append("file", uploadFile);
      formData.append("subjectId", selectedSubject);
      formData.append("editionYear", editionYear);

      const res = await fetch(`${API_BASE}/api/curriculum/upload`, {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setUploadStatus({
          type: "success",
          msg: "تم رفع الملف بنجاح وتفكيك الفصول تلقائياً بانتظار تفعيلها للطلاب."
        });
        setUploadFile(null);
      } else {
        setUploadStatus({
          type: "error",
          msg: data.message || "حدث خطأ أثناء رفع ومعالجة الملف."
        });
      }
    } catch (err: any) {
      setUploadStatus({
        type: "error",
        msg: `خطأ في الاتصال بالخادم: ${err.message}`
      });
    }
  };

  const handleApprove = async (id: string, name: string) => {
    if (!confirm(`هل أنت متأكد من رغبتك في الموافقة وتفعيل منهج ${name} للطلاب؟`)) {
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/api/curriculum/updates/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notificationId: id })
      });
      const data = await res.json();
      if (data.success) {
        alert(`تمت الموافقة وتفعيل نسخة كتاب ${name} بنجاح للطلاب.`);
        fetchPendingUpdates();
      } else {
        alert(`فشلت العملية: ${data.message}`);
      }
    } catch (err: any) {
      alert(`حدث خطأ أثناء الاتصال بالخادم: ${err.message}`);
    }
  };

  const handleReject = async (id: string, name: string) => {
    if (!confirm(`هل أنت متأكد من رغبتك في رفض وحذف نسخة كتاب ${name}؟`)) {
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/api/curriculum/updates/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notificationId: id })
      });
      const data = await res.json();
      if (data.success) {
        alert(`تم رفض نسخة كتاب ${name}.`);
        fetchPendingUpdates();
      } else {
        alert(`فشلت العملية: ${data.message}`);
      }
    } catch (err: any) {
      alert(`حدث خطأ أثناء الاتصال بالخادم: ${err.message}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow py-12 bg-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border/40 pb-6 mb-8">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">إدارة وتحديث المناهج الدراسية</h1>
              <p className="text-sm text-muted-foreground mt-1">
                استيراد الكتب الرسمية، جدولة الزحف التلقائي للويب، واعتماد النسخ الدراسية المحدّثة للطلاب.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={handleCrawlTrigger}
                disabled={isCrawling}
                className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-xl text-sm shadow-md hover:bg-primary/95 transition-all disabled:opacity-50"
              >
                <Globe className={`h-4 w-4 ${isCrawling ? "animate-spin" : ""}`} />
                <span>تشغيل زاحف الويب الفوري</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-4 border-b border-border/40 pb-px mb-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab("wizard")}
              className={`pb-4 px-2 text-sm font-bold border-b-2 transition-all flex items-center gap-2 shrink-0 ${
                activeTab === "wizard"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <UploadCloud className="h-4 w-4" />
              <span>معالج الاستيراد اليدوي</span>
            </button>

            <button
              onClick={() => setActiveTab("crawler")}
              className={`pb-4 px-2 text-sm font-bold border-b-2 transition-all flex items-center gap-2 shrink-0 ${
                activeTab === "crawler"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Terminal className="h-4 w-4" />
              <span>حالة وسجلات الزاحف اليومي</span>
            </button>

            <button
              onClick={() => setActiveTab("updates")}
              className={`pb-4 px-2 text-sm font-bold border-b-2 transition-all flex items-center gap-2 shrink-0 relative ${
                activeTab === "updates"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Layers className="h-4 w-4" />
              <span>تحديثات معلقة للموافقة</span>
              {pendingUpdates.length > 0 && (
                <span className="h-5 w-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center absolute -top-1 -left-4">
                  {pendingUpdates.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("scores")}
              className={`pb-4 px-2 text-sm font-bold border-b-2 transition-all flex items-center gap-2 shrink-0 relative ${
                activeTab === "scores"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Award className="h-4 w-4" />
              <span>درجات وتقييم الطلاب</span>
              {studentScores.length > 0 && (
                <span className="h-5 w-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center absolute -top-1 -left-4">
                  {studentScores.length}
                </span>
              )}
            </button>
          </div>

          {/* Main Dashboard Panel */}
          <div className="grid grid-cols-1 gap-8">
            
            <AnimatePresence mode="wait">
              {activeTab === "wizard" && (
                <motion.div
                  key="wizard"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="bg-background border border-border/40 p-6 sm:p-8 rounded-3xl shadow-sm"
                >
                  <h2 className="text-lg font-extrabold mb-6 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <span>معالج استيراد ملفات المنهج الدراسي</span>
                  </h2>

                  <form onSubmit={handleManualUpload} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    <div className="flex flex-col gap-5">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-muted-foreground">اختر المادة الدراسية:</label>
                        <select 
                          value={selectedSubject}
                          onChange={(e) => setSelectedSubject(e.target.value)}
                          className="p-3 bg-secondary/40 border border-border rounded-xl font-bold text-sm focus:outline-none focus:border-primary"
                        >
                          <option value="">-- اختر المادة --</option>
                          {subjects.map(s => (
                            <option key={s.id} value={s.id}>{s.nameAr}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-muted-foreground">عام طبعة الكتاب المعتمد:</label>
                        <input 
                          type="number"
                          value={editionYear}
                          onChange={(e) => setEditionYear(e.target.value)}
                          className="p-3 bg-secondary/40 border border-border rounded-xl font-bold text-sm focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>

                    {/* Drag and drop file */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-muted-foreground">ملف كتاب المنهاج (PDF/DOCX):</label>
                      <div className="flex-grow border-2 border-dashed border-border/80 hover:border-primary rounded-3xl flex flex-col items-center justify-center p-8 text-center transition-colors relative bg-secondary/5">
                        <input 
                          type="file" 
                          onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <UploadCloud className="h-12 w-12 text-muted-foreground mb-3" />
                        <span className="text-sm font-bold text-foreground">اسحب الملف هنا أو تصفح المجلدات</span>
                        <span className="text-xs text-muted-foreground mt-1">يدعم فقط ملفات PDF أو Word حتى 50 ميجابايت</span>
                        
                        {uploadFile && (
                          <div className="mt-4 p-2 bg-primary/10 text-primary border border-primary/20 text-xs font-bold rounded-xl flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            <span>{uploadFile.name} ({(uploadFile.size / (1024 * 1024)).toFixed(2)} MB)</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="md:col-span-2 flex justify-end mt-4">
                      <button 
                        type="submit"
                        disabled={uploadStatus.type === "loading"}
                        className="px-8 py-3.5 bg-primary text-white font-extrabold rounded-xl text-sm shadow-md hover:bg-primary/95 transition-all disabled:opacity-50"
                      >
                        {uploadStatus.type === "loading" ? "جاري الرفع والمعالجة..." : "رفع ومعالجة الملف الآن"}
                      </button>
                    </div>
                  </form>

                  {/* Status Banner */}
                  {uploadStatus.type && (
                    <div className={`mt-6 p-4 rounded-2xl flex items-start gap-3 border text-sm leading-relaxed ${
                      uploadStatus.type === "success" 
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                        : uploadStatus.type === "error"
                        ? "bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400"
                        : "bg-primary/5 border-primary/20 text-primary"
                    }`}>
                      {uploadStatus.type === "success" ? (
                        <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
                      ) : uploadStatus.type === "error" ? (
                        <XCircle className="h-5 w-5 shrink-0 mt-0.5" />
                      ) : (
                        <RefreshCw className="h-5 w-5 shrink-0 mt-0.5 animate-spin" />
                      )}
                      <span>{uploadStatus.msg}</span>
                    </div>
                  )}

                </motion.div>
              )}

              {activeTab === "crawler" && (
                <motion.div
                  key="crawler"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="bg-background border border-border/40 p-6 sm:p-8 rounded-3xl shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <h2 className="text-lg font-extrabold flex items-center gap-2">
                        <Terminal className="h-5 w-5 text-primary" />
                        <span>سجلات وجدولة زاحف المنهج التلقائي</span>
                      </h2>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        يعمل الزاحف المجدول تلقائياً كل يوم عند الساعة 03:00 بتوقيت اليمن (آسيا/عدن) للتحقق من المناهج.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-bold">
                      <Check className="h-4 w-4" />
                      <span>نشط ومجدول</span>
                    </div>
                  </div>

                  {/* Terminal Log */}
                  <div className="w-full bg-slate-950 dark:bg-slate-900 border border-border/40 rounded-3xl p-5 text-left font-mono text-xs text-slate-300 min-h-[250px] max-h-[350px] overflow-y-auto flex flex-col gap-2">
                    {crawlerLogs.map((log, index) => (
                      <div key={index} className="flex gap-2.5 items-start">
                        <span className="text-slate-500">[{log.timestamp}]</span>
                        <span className={`font-bold shrink-0 ${
                          log.type === "success" 
                            ? "text-emerald-500" 
                            : log.type === "warning" 
                            ? "text-amber-500" 
                            : log.type === "match"
                            ? "text-primary"
                            : "text-slate-400"
                        }`}>
                          [{log.type.toUpperCase()}]
                        </span>
                        <span className="text-right flex-1 select-all">{log.text}</span>
                      </div>
                    ))}
                  </div>

                </motion.div>
              )}

              {activeTab === "updates" && (
                <motion.div
                  key="updates"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="flex flex-col gap-6"
                >
                  {pendingUpdates.length === 0 ? (
                    <div className="bg-background border border-border/40 p-8 rounded-3xl text-center shadow-sm flex flex-col items-center">
                      <CheckCircle2 className="h-12 w-12 text-emerald-500 mb-3" />
                      <h3 className="font-bold text-sm">كل المناهج محدثة بالكامل!</h3>
                      <p className="text-xs text-muted-foreground mt-1">لا توجد كتب دراسية أو نسخ طبعات معلقة تنتظر الموافقة.</p>
                    </div>
                  ) : (
                    pendingUpdates.map((update) => (
                      <div 
                        key={update.id}
                        className="bg-background border border-border/40 p-6 rounded-3xl shadow-sm flex flex-col gap-5"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/40 pb-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-primary/10 rounded-2xl flex items-center justify-center text-primary text-xl font-bold">
                              📖
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-bold text-base">{update.subject}</h3>
                                <span className="text-[10px] font-bold px-2 py-0.5 bg-red-500/10 text-red-600 rounded-full">
                                  نسخة طبعة {update.editionYear}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground mt-0.5">اسم الملف المرفوع: {update.fileName}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-xs text-muted-foreground font-semibold">حجم الملف: {update.fileSize}</span>
                            <span className="text-xs px-2.5 py-1 bg-amber-500/10 text-amber-600 rounded-full font-bold">بانتظار موافقتك</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="md:col-span-2 flex flex-col gap-2 bg-secondary/20 p-4 rounded-2xl">
                            <span className="text-xs font-bold text-primary">ملخص التعديلات المقترحة:</span>
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                              {update.changeSummary}
                            </p>
                          </div>

                          <div className="flex flex-col gap-2 justify-center border-r border-border/40 pr-6 text-xs text-muted-foreground">
                            <span className="font-bold">بصمة التشفير للملف (Hash):</span>
                            <code className="bg-secondary p-2 rounded-xl text-[10px] select-all font-mono break-all leading-normal">
                              {update.fileHash}
                            </code>
                          </div>
                        </div>

                        <div className="flex justify-end gap-3 border-t border-border/40 pt-4 mt-2">
                          <button
                            onClick={() => handleReject(update.id, update.subject)}
                            className="flex items-center gap-1.5 px-5 py-2.5 border border-border hover:bg-secondary/60 transition-colors text-xs font-bold text-red-600 rounded-xl"
                          >
                            <X className="h-4 w-4" />
                            <span>رفض التحديث</span>
                          </button>
                          <button
                            onClick={() => handleApprove(update.id, update.subject)}
                            className="flex items-center gap-1.5 px-5 py-2.5 bg-emerald-500 text-white font-extrabold rounded-xl text-xs hover:bg-emerald-600 transition-colors shadow-md shadow-emerald-500/15"
                          >
                            <Check className="h-4 w-4" />
                            <span>موافقة وتفعيل الآن للطلاب</span>
                          </button>
                        </div>

                      </div>
                    ))
                  )}
                </motion.div>
              )}

              {activeTab === "scores" && (
                <motion.div
                  key="scores"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="bg-background border border-border/40 p-6 sm:p-8 rounded-3xl shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <h2 className="text-lg font-extrabold flex items-center gap-2">
                        <Award className="h-5 w-5 text-primary" />
                        <span>لوحة متابعة نتائج وتقييمات الطلاب</span>
                      </h2>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        رصد درجات الطلاب في الاختبارات القصيرة التفاعلية المخصصة لكل درس من المنهج.
                      </p>
                    </div>
                    {studentScores.length > 0 && (
                      <button
                        onClick={() => {
                          if (confirm("هل أنت متأكد من رغبتك في مسح جميع درجات الطلاب؟")) {
                            localStorage.removeItem("adminStudentScores");
                            setStudentScores([]);
                          }
                        }}
                        className="flex items-center gap-1.5 px-4 py-2 border border-red-500/20 hover:bg-red-500/10 transition-colors text-xs font-bold text-red-600 rounded-xl"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>مسح كافة السجلات</span>
                      </button>
                    )}
                  </div>

                  {studentScores.length === 0 ? (
                    <div className="text-center py-12 flex flex-col items-center justify-center">
                      <AlertCircle className="h-12 w-12 text-muted-foreground/60 mb-3" />
                      <h3 className="font-bold text-sm">لا توجد درجات مسجلة بعد</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        تظهر هنا درجات الطلاب فور إتمامهم للاختبارات التفاعلية بنجاح.
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-right border-collapse">
                        <thead>
                          <tr className="border-b border-border/60 text-xs text-muted-foreground font-bold">
                            <th className="pb-3 pr-2">اسم الطالب</th>
                            <th className="pb-3">المادة</th>
                            <th className="pb-3">عنوان الدرس</th>
                            <th className="pb-3">النسبة المئوية</th>
                            <th className="pb-3">تاريخ التقديم</th>
                            <th className="pb-3 pl-2 text-left">إجراءات</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/40 text-xs sm:text-sm">
                          {studentScores.map((scoreRecord: any) => (
                            <tr key={scoreRecord.id} className="hover:bg-secondary/10 transition-colors">
                              <td className="py-3.5 pr-2 font-bold">{scoreRecord.studentName}</td>
                              <td className="py-3.5">
                                <span className="px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground font-semibold text-xs">
                                  {scoreRecord.subjectName}
                                </span>
                              </td>
                              <td className="py-3.5 text-muted-foreground max-w-[200px] truncate">{scoreRecord.lessonTitle}</td>
                              <td className="py-3.5 font-bold">
                                <span className={`px-2.5 py-1 rounded-full text-xs ${
                                  scoreRecord.score >= 85
                                    ? "bg-emerald-500/10 text-emerald-600 font-extrabold"
                                    : scoreRecord.score >= 60
                                    ? "bg-amber-500/10 text-amber-600 font-extrabold"
                                    : "bg-red-500/10 text-red-600 font-extrabold"
                                }`}>
                                  %{scoreRecord.score}
                                </span>
                              </td>
                              <td className="py-3.5 text-xs text-muted-foreground font-medium">
                                {scoreRecord.date} • {scoreRecord.time}
                              </td>
                              <td className="py-3.5 pl-2 text-left">
                                <button
                                  onClick={() => {
                                    const updated = studentScores.filter(s => s.id !== scoreRecord.id);
                                    setStudentScores(updated);
                                    localStorage.setItem("adminStudentScores", JSON.stringify(updated));
                                  }}
                                  className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-500/10 rounded-lg transition-colors"
                                  title="حذف هذا السجل"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
