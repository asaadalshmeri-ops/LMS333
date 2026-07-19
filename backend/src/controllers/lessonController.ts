import { Request, Response } from "express";
import prisma from "../config/db";
import { analyzeLessonCurriculum } from "../utils/curriculumAnalyzer";

// Helper to parse JSON string fields from SQLite back to arrays for frontend
const parseLessonJsonFields = (lesson: any) => {
  if (!lesson) return lesson;
  try {
    lesson.importantPoints = typeof lesson.importantPoints === "string" ? JSON.parse(lesson.importantPoints) : (lesson.importantPoints || []);
  } catch (e) {
    lesson.importantPoints = [];
  }
  try {
    lesson.commonMistakes = typeof lesson.commonMistakes === "string" ? JSON.parse(lesson.commonMistakes) : (lesson.commonMistakes || []);
  } catch (e) {
    lesson.commonMistakes = [];
  }
  try {
    lesson.examTips = typeof lesson.examTips === "string" ? JSON.parse(lesson.examTips) : (lesson.examTips || []);
  } catch (e) {
    lesson.examTips = [];
  }
  return lesson;
};

// Get single lesson details with structured study elements
export const getLessonDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: "معرف الدرس مطلوب." });
    }

    let lesson = await prisma.lesson.findUnique({
      where: { id },
      include: {
        unit: {
          include: {
            subject: true
          }
        },
        definitions: true,
        formulas: true,
        examples: true,
        exercises: true
      }
    });

    if (!lesson) {
      return res.status(404).json({ success: false, message: "الدرس المطلوب غير موجود." });
    }

    // Dynamic generation if the lesson data was not pre-analyzed
    if (!lesson.simplifiedExplanation) {
      console.log(`[ANALYZER] Dynamically analyzing curriculum for empty lesson: ${id}`);
      const success = await analyzeLessonCurriculum(id);
      
      if (success) {
        // Fetch again with newly generated relations
        lesson = await prisma.lesson.findUnique({
          where: { id },
          include: {
            unit: {
              include: {
                subject: true
              }
            },
            definitions: true,
            formulas: true,
            examples: true,
            exercises: true
          }
        });
      }
    }

    if (lesson) {
      lesson = parseLessonJsonFields(lesson);
    }

    res.json({
      success: true,
      lesson
    });
  } catch (error: any) {
    console.error("Fetch Lesson Error:", error);
    res.status(500).json({ success: false, message: "حدث خطأ أثناء جلب تفاصيل الدرس.", error: error.message });
  }
};
