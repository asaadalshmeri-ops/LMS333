import { Request, Response } from "express";
import multer from "multer";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import prisma from "../config/db";
import pdfParse from "pdf-parse";
import { runCurriculumCrawler } from "../utils/crawler";

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), "uploads", "curriculum");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}_${crypto.randomUUID().substring(0, 8)}${ext}`;
    cb(null, uniqueName);
  }
});

export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedExtensions = [".pdf", ".docx"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedExtensions.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("نوع الملف غير مدعوم. يدعم المنهاج صيغ PDF و DOCX فقط."));
    }
  },
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});

// Manual File Upload Handler
export const uploadCurriculumFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "يرجى اختيار ملف لرفعه." });
    }

    const { subjectId, editionYear } = req.body;
    if (!subjectId || !editionYear) {
      // Clean up uploaded file
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ success: false, message: "يرجى تحديد المادة وسنة الإصدار." });
    }

    // Read file buffer to calculate hash and parse text
    const fileBuffer = fs.readFileSync(req.file.path);
    const fileHash = crypto.createHash("sha256").update(fileBuffer).digest("hex");

    // Check duplicate
    const existingFile = await prisma.curriculumFile.findUnique({ where: { fileHash } });
    if (existingFile) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({
        success: false,
        message: "هذا الملف مرفوع مسبقاً في النظام ومطابق تماماً في المحتوى."
      });
    }

    const subject = await prisma.subject.findUnique({ where: { id: subjectId } });
    if (!subject) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ success: false, message: "المادة المحددة غير موجودة." });
    }

    // Create CurriculumFile record
    const curriculumFile = await prisma.curriculumFile.create({
      data: {
        subjectId,
        fileName: req.file.originalname,
        filePath: req.file.path,
        fileSize: req.file.size,
        fileHash,
        status: "PROCESSED"
      }
    });

    // Determine version number
    const previousVersions = await prisma.curriculumVersion.findMany({
      where: { curriculumFile: { subjectId } }
    });
    const versionNumber = previousVersions.length + 1;

    // Create CurriculumVersion
    const curriculumVersion = await prisma.curriculumVersion.create({
      data: {
        curriculumFileId: curriculumFile.id,
        editionYear: parseInt(editionYear),
        versionNumber,
        isActive: false, // Needs manual approval
        isPendingApproval: true,
        changeSummary: `تحميل يدوي لملف المنهج الجديد: ${req.file.originalname}`
      }
    });

    // Create UpdateNotification for Admin review
    await prisma.updateNotification.create({
      data: {
        title: `ملف يدوي بانتظار المراجعة: ${subject.nameAr}`,
        message: `تم تحميل ملف منهاج يدوي جديد لمادة ${subject.nameAr} لعام ${editionYear}. يرجى الموافقة عليه لتفعيله.`,
        curriculumVersionId: curriculumVersion.id,
        status: "PENDING_APPROVAL"
      }
    });

    // Run PDF parsing asynchronously
    let extractedText = "";
    try {
      if (req.file.originalname.toLowerCase().endsWith(".pdf")) {
        const parsed = await pdfParse(fileBuffer);
        extractedText = parsed.text || "";
      } else {
        extractedText = "محتوى مستخلص لملف DOCX";
      }
    } catch (parseErr) {
      extractedText = "تعذر استخلاص النص التلقائي للملف.";
    }

    // Mock unit generation based on the text
    await prisma.unit.create({
      data: {
        title: `الوحدة المستوردة يدوياً: منهج ${editionYear}`,
        description: `تم توليدها تلقائياً من الملف المرفوع`,
        order: previousVersions.length + 1,
        subjectId,
        lessons: {
          create: [
            {
              title: "مفهوم الدرس المستخلص يدوياً",
              content: extractedText.substring(0, 2000) || "محتوى الدرس المستخلص",
              order: 1
            }
          ]
        }
      }
    });

    res.status(201).json({
      success: true,
      message: "تم رفع الملف بنجاح وإرساله للمراجعة.",
      fileId: curriculumFile.id,
      versionId: curriculumVersion.id
    });
  } catch (error: any) {
    console.error("Upload Error:", error);
    res.status(500).json({ success: false, message: "حدث خطأ أثناء رفع ملف المنهج.", error: error.message });
  }
};

// Immediate Crawl Trigger
export const triggerCrawl = async (req: Request, res: Response) => {
  try {
    // Run crawler asynchronously in background
    runCurriculumCrawler()
      .then(res => console.log(`Crawl triggered successfully:`, res))
      .catch(err => console.error(`Crawl failed:`, err.message));

    res.json({
      success: true,
      message: "تم بدء عملية الزحف التلقائي للويب في الخلفية. يمكنك متابعة السجلات من لوحة التحكم."
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: "فشل بدء عملية الزحف.", error: error.message });
  }
};

// Get Job Logs
export const getJobs = async (req: Request, res: Response) => {
  try {
    const crawlerJobs = await prisma.crawlerJob.findMany({
      orderBy: { createdAt: "desc" },
      take: 10
    });
    
    const importJobs = await prisma.importJob.findMany({
      orderBy: { createdAt: "desc" },
      take: 10
    });

    res.json({
      success: true,
      crawlerJobs,
      importJobs
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get Pending Updates
export const getPendingUpdates = async (req: Request, res: Response) => {
  try {
    const updates = await prisma.updateNotification.findMany({
      where: { status: "PENDING_APPROVAL" },
      include: {
        version: {
          include: {
            curriculumFile: {
              include: {
                subject: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    res.json({
      success: true,
      updates
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Approve Curriculum Version
export const approveVersion = async (req: Request, res: Response) => {
  try {
    const { notificationId } = req.body;
    if (!notificationId) {
      return res.status(400).json({ success: false, message: "معرف التنبيه مطلوب." });
    }

    const notification = await prisma.updateNotification.findUnique({
      where: { id: notificationId },
      include: { version: { include: { curriculumFile: true } } }
    });

    if (!notification || notification.status !== "PENDING_APPROVAL") {
      return res.status(404).json({ success: false, message: "التنبيه غير موجود أو تمت معالجته بالفعل." });
    }

    const version = notification.version;
    const subjectId = version.curriculumFile.subjectId;

    // Deactivate previous active versions of the same subject
    await prisma.curriculumVersion.updateMany({
      where: { curriculumFile: { subjectId }, isActive: true },
      data: { isActive: false }
    });

    // Activate selected version
    await prisma.curriculumVersion.update({
      where: { id: version.id },
      data: { isActive: true, isPendingApproval: false }
    });

    // Update Notification status
    await prisma.updateNotification.update({
      where: { id: notificationId },
      data: { status: "APPROVED" }
    });

    res.json({
      success: true,
      message: "تمت الموافقة وتفعيل هذا الإصدار من المنهج بنجاح لجميع الطلاب."
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Reject Curriculum Version
export const rejectVersion = async (req: Request, res: Response) => {
  try {
    const { notificationId } = req.body;
    if (!notificationId) {
      return res.status(400).json({ success: false, message: "معرف التنبيه مطلوب." });
    }

    const notification = await prisma.updateNotification.findUnique({
      where: { id: notificationId },
      include: { version: true }
    });

    if (!notification || notification.status !== "PENDING_APPROVAL") {
      return res.status(404).json({ success: false, message: "التنبيه غير موجود أو تمت معالجته بالفعل." });
    }

    // Update version status
    await prisma.curriculumVersion.update({
      where: { id: notification.version.id },
      data: { isPendingApproval: false }
    });

    // Update Notification status
    await prisma.updateNotification.update({
      where: { id: notificationId },
      data: { status: "REJECTED" }
    });

    res.json({
      success: true,
      message: "تم رفض هذا الإصدار وحفظه كإصدار غير نشط للرجوع إليه مستقبلاً."
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get list of all subjects
export const getSubjects = async (req: Request, res: Response) => {
  try {
    const subjects = await prisma.subject.findMany({
      orderBy: { nameAr: "asc" }
    });
    res.json({
      success: true,
      subjects
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: "حدث خطأ أثناء جلب المواد.", error: error.message });
  }
};
