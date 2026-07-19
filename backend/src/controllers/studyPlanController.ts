import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import prisma from "../config/db";
import { generate150DayPlan } from "../utils/studyPlanGenerator";

// Generate 150-day plan for authenticated user
export const generateUserPlan = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "غير مصرح." });
    }

    // Check if plan already exists
    const existingPlan = await prisma.studyPlan.findFirst({
      where: { userId }
    });

    if (existingPlan) {
      return res.status(400).json({
        success: false,
        message: "لديك خطة دراسية نشطة بالفعل في النظام.",
        planId: existingPlan.id
      });
    }

    // Create new StudyPlan
    const studyPlan = await prisma.studyPlan.create({
      data: {
        userId,
        durationDays: 150
      }
    });

    // Generate the 150 days using the helper algorithm
    const success = await generate150DayPlan(studyPlan.id);

    if (!success) {
      // Clean up on failure
      await prisma.studyPlan.delete({ where: { id: studyPlan.id } });
      return res.status(500).json({ success: false, message: "فشل توليد أيام الخطة الدراسية." });
    }

    res.status(201).json({
      success: true,
      message: "تم إنشاء خطة الـ 150 يوماً بنجاح. نتمنى لك التوفيق والنجاح!",
      planId: studyPlan.id
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: "حدث خطأ أثناء توليد الخطة.", error: error.message });
  }
};

// Get current user's study plan and stats
export const getUserPlan = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "غير مصرح." });
    }

    const plan = await prisma.studyPlan.findFirst({
      where: { userId },
      include: {
        days: {
          orderBy: { dayNumber: "asc" },
          include: {
            lesson: {
              select: {
                id: true,
                title: true,
                unitId: true
              }
            }
          }
        }
      }
    });

    if (!plan) {
      return res.json({
        success: true,
        hasPlan: false,
        message: "لم تقم بتفعيل خطتك الدراسية بعد."
      });
    }

    // Calculate progress stats
    const totalDays = plan.days.length;
    const completedDays = plan.days.filter(d => d.isCompleted).length;
    const progressPercentage = totalDays > 0 ? (completedDays / totalDays) * 100 : 0;

    res.json({
      success: true,
      hasPlan: true,
      planId: plan.id,
      progressPercentage: parseFloat(progressPercentage.toFixed(1)),
      totalDays,
      completedDays,
      days: plan.days
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Toggle study day completion status
export const togglePlanDay = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: "معرف اليوم مطلوب." });
    }

    const studyDay = await prisma.studyPlanDay.findUnique({
      where: { id }
    });

    if (!studyDay) {
      return res.status(404).json({ success: false, message: "اليوم المحدد غير موجود." });
    }

    const updatedDay = await prisma.studyPlanDay.update({
      where: { id },
      data: {
        isCompleted: !studyDay.isCompleted
      }
    });

    res.json({
      success: true,
      message: "تم تحديث حالة إنجاز اليوم الدراسي بنجاح.",
      isCompleted: updatedDay.isCompleted
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
