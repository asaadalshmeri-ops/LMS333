import { Request, Response } from "express";
import prisma from "../config/db";

// Simulated Quiz Question object including types
export interface QuizQuestionData {
  id: string;
  type: "MCQ" | "TRUE_FALSE" | "FILL_BLANKS" | "SHORT_ANSWER" | "ESSAY" | "CALCULATION";
  questionText: string;
  options?: string[]; // Used for MCQ
  correctAnswer: string; // Correct value for auto-grading
  explanation: string;
}

// Generate structural quiz mock content containing all 6 types
export function generateQuizData(subjectSlug: string, lessonTitle: string): QuizQuestionData[] {
  return [
    {
      id: "q_mcq",
      type: "MCQ",
      questionText: "ما الذي يحدث للمفاعلة السعوية للمكثف عند مضاعفة سعة المكثف إلى الضعف مع ثبات التردد؟",
      options: [
        "تتضاعف المفاعلة السعوية للضعف",
        "تقل المفاعلة السعوية إلى النصف",
        "تظل المفاعلة السعوية ثابتة دون تغيير",
        "تزداد المفاعلة السعوية أربعة أضعاف"
      ],
      correctAnswer: "1", // Index of: تقل المفاعلة السعوية إلى النصف
      explanation: "بما أن المفاعلة السعوية تتناسب عكسياً مع سعة المكثف (م س = 1 / (2 * ط * ت * س))، فإن مضاعفة السعة تؤدي تلقائياً لنقصان المفاعلة إلى النصف."
    },
    {
      id: "q_tf",
      type: "TRUE_FALSE",
      questionText: "المكثف يمرر التيار الكهربائي المستمر (DC) بشكل دائم بمجرد اتصاله بمصدر الجهد.",
      correctAnswer: "false", // False
      explanation: "المكثف يقطع التيار المستمر تماماً بمجرد أن يشحن بالكامل لأن جهد المكثف يصبح مساوياً لجهد المصدر ومعاكساً له."
    },
    {
      id: "q_fb",
      type: "FILL_BLANKS",
      questionText: "في دوائر التيار المتردد التي تحتوي على مكثف فقط، يتقدم المتجه الطوري للتيار على المتجه الطوري للجهد بزاوية طور مقدارها _______ درجة.",
      correctAnswer: "90",
      explanation: "التيار يتقدم على الجهد بربع دورة كاملة وهو ما يكافئ 90 درجة أو باي/2 راديان."
    },
    {
      id: "q_sa",
      type: "SHORT_ANSWER",
      questionText: "لماذا لا يستهلك المكثف طاقة حرارية في دوائر التيار المتردد؟",
      correctAnswer: "لأنه يخزن الطاقة في صورة مجال كهربائي ويعيدها للمصدر",
      explanation: "المكثف المثالي لا يبدد طاقة حرارية كالمقاومة المادية، بل يخزن الطاقة في مجاله الكهربائي أثناء الشحن ويعيدها مجدداً للدائرة أثناء التفريغ."
    },
    {
      id: "q_essay",
      type: "ESSAY",
      questionText: "اشرح آلية مرور التيار المتردد في دائرة تحتوي على مكثف كهربائي بالرغم من وجود مادة عازلة بين لوحيه.",
      correctAnswer: "عن طريق الشحن والتفريغ المستمر نتيجة تغيير قطبية المصدر المتردد",
      explanation: "التيار لا يعبر المادة العازلة؛ بدلاً من ذلك، يؤدي التغير الدوري لجهد المصدر المتردد إلى تكرار عمليتي الشحن والتفريغ، مما يسبب حركة الإلكترونات في الأسلاك الخارجية بشكل تذبذبي يعطي مظهر مرور التيار."
    },
    {
      id: "q_calc",
      type: "CALCULATION",
      questionText: "مكثف سعته (7) ميكروفاراد متصل بمصدر تردد 50 هرتز. احسب ممانعته للتيار بفرض باي = 22/7.",
      correctAnswer: "454.5",
      explanation: "العلاقة: م س = 1 / (2 * باي * ت * س). التعويض: م س = 1 / (2 * (22/7) * 50 * 7 * 10^-6) = 10^6 / 2200 = 454.5 أوم."
    }
  ];
}

// GET Lesson Quiz Endpoint
export const getLessonQuiz = async (req: Request, res: Response) => {
  try {
    const { lessonId } = req.params;
    if (!lessonId) {
      return res.status(400).json({ success: false, message: "معرف الدرس مطلوب." });
    }

    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { unit: { include: { subject: true } } }
    });

    if (!lesson) {
      return res.status(404).json({ success: false, message: "الدرس المحدد غير موجود." });
    }

    // Check if quiz already exists or generate it
    let quiz = await prisma.quiz.findFirst({
      where: { lessonId },
      include: { questions: true }
    });

    if (!quiz) {
      // Create new quiz
      quiz = await prisma.quiz.create({
        data: {
          title: `اختبار تقويمي: ${lesson.title}`,
          timeLimit: 15,
          lessonId
        },
        include: { questions: true }
      });

      // Generate all 6 question types
      const questionsData = generateQuizData(lesson.unit.subject.slug, lesson.title);
      for (const q of questionsData) {
        await prisma.quizQuestion.create({
          data: {
            quizId: quiz.id,
            questionText: q.questionText,
            options: JSON.stringify(q.options || []),
            correctIndex: q.type === "MCQ" ? parseInt(q.correctAnswer) : (q.correctAnswer === "true" ? 1 : 0),
            explanation: q.explanation,
            order: 1
          }
        });
      }

      // Re-fetch with questions
      quiz = await prisma.quiz.findFirst({
        where: { id: quiz.id },
        include: { questions: true }
      }) as any;
    }

    if (quiz && quiz.questions) {
      quiz.questions = quiz.questions.map((q: any) => {
        try {
          q.options = typeof q.options === "string" ? JSON.parse(q.options) : (q.options || []);
        } catch (e) {
          q.options = [];
        }
        return q;
      });
    }

    res.json({
      success: true,
      quiz,
      // Provide clean structured questions metadata including types for frontend parsing
      questionTypes: generateQuizData(lesson.unit.subject.slug, lesson.title).map(q => ({
        id: q.id,
        type: q.type,
        questionText: q.questionText,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation
      }))
    });
  } catch (error: any) {
    console.error("Quiz fetch error:", error);
    res.status(500).json({ success: false, message: "حدث خطأ أثناء جلب الاختبار.", error: error.message });
  }
};

// POST Submit Quiz Attempt Endpoint
export const submitQuizAttempt = async (req: Request, res: Response) => {
  try {
    const { quizId } = req.params;
    const { answers, userId } = req.body; // In production, userId will come from req.user.id

    if (!quizId || !answers) {
      return res.status(400).json({ success: false, message: "معطيات الاختبار ناقصة." });
    }

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: { lesson: { include: { unit: { include: { subject: true } } } } }
    });

    if (!quiz) {
      return res.status(404).json({ success: false, message: "الاختبار المحدد غير موجود." });
    }

    const quizQuestions = generateQuizData(quiz.lesson.unit.subject.slug, quiz.lesson.title);
    
    // Grading Algorithm
    let correctCount = 0;
    const results = [];

    for (const q of quizQuestions) {
      const studentAnswer = answers[q.id]?.trim() || "";
      let isCorrect = false;

      if (q.type === "MCQ") {
        isCorrect = studentAnswer === q.correctAnswer;
      } else if (q.type === "TRUE_FALSE") {
        isCorrect = studentAnswer.toLowerCase() === q.correctAnswer;
      } else if (q.type === "FILL_BLANKS") {
        isCorrect = studentAnswer.toLowerCase() === q.correctAnswer.toLowerCase();
      } else if (q.type === "SHORT_ANSWER") {
        // Simple keywords matching for short answers
        const keywords = ["يخزن", "مجال كهربائي", "يعيدها"];
        isCorrect = keywords.some(kw => studentAnswer.includes(kw));
      } else if (q.type === "CALCULATION") {
        // Tolerates slight decimal differences
        const numAns = parseFloat(studentAnswer);
        const correctNum = parseFloat(q.correctAnswer);
        isCorrect = Math.abs(numAns - correctNum) < 1.0;
      } else {
        // Essay questions: marked correct if they wrote a reasonable length answer
        isCorrect = studentAnswer.length > 15;
      }

      if (isCorrect) correctCount++;

      results.push({
        questionId: q.id,
        type: q.type,
        studentAnswer,
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation
      });
    }

    const scorePercentage = (correctCount / quizQuestions.length) * 100;

    // Save attempt if user is authenticated
    if (userId) {
      await prisma.quizAttempt.create({
        data: {
          userId,
          quizId,
          score: scorePercentage
        }
      });
    }

    res.json({
      success: true,
      score: parseFloat(scorePercentage.toFixed(1)),
      correctCount,
      totalCount: quizQuestions.length,
      results
    });
  } catch (error: any) {
    console.error("Quiz submission grading error:", error);
    res.status(500).json({ success: false, message: "حدث خطأ أثناء تصحيح الاختبار.", error: error.message });
  }
};
