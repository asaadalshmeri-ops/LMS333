import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

// Routes
import authRoutes from "./routes/authRoutes";
import curriculumRoutes from "./routes/curriculumRoutes";
import lessonRoutes from "./routes/lessonRoutes";
import studyPlanRoutes from "./routes/studyPlanRoutes";
import quizRoutes from "./routes/quizRoutes";

app.use("/api/auth", authRoutes);
app.use("/api/curriculum", curriculumRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/study-plan", studyPlanRoutes);
app.use("/api/quizzes", quizRoutes);

// Health Check
app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    message: "Grade 12 Scientific Educational Platform API is running smoothly",
    timestamp: new Date()
  });
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({
    success: false,
    message: "حدث خطأ غير متوقع في الخادم الرئيسي.",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

export default app;
