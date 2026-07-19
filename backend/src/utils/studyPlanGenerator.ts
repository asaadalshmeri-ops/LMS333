import prisma from "../config/db";

// Balanced subjects list for rotation
const CORE_SUBJECTS = [
  { slug: "math", nameAr: "الرياضيات", defaultTime: 90 },
  { slug: "physics", nameAr: "الفيزياء", defaultTime: 90 },
  { slug: "chemistry", nameAr: "الكيمياء", defaultTime: 75 },
  { slug: "biology", nameAr: "الأحياء", defaultTime: 75 },
  { slug: "english", nameAr: "اللغة الإنجليزية", defaultTime: 60 },
  { slug: "arabic", nameAr: "اللغة العربية", defaultTime: 60 },
  { slug: "islamic", nameAr: "التربية الإسلامية", defaultTime: 45 },
  { slug: "quran", nameAr: "القرآن الكريم", defaultTime: 45 }
];

// Arabic motivational quotes for Yemeni students
const MOTIVATIONAL_TIPS = [
  "رحلة الألف ميل تبدأ بخطوة، وصبرك اليوم هو فخرك غداً 🇾🇪.",
  "ثق بقابليتك على التفوق؛ اليمن يزدهر بعقول أبنائه وبناته المبدعين.",
  "المثابرة سر النجاح. خصص ساعة إضافية اليوم للمسائل الصعبة وستجد النتيجة لاحقاً.",
  "القسم العلمي يتطلب التركيز والفهم العميق، لا تحفظ القوانين بل افهم منشأها.",
  "تنظيم الوقت هو السلاح الأقوى لطلب العلم وتخفيف الضغط الدراسي.",
  "تذكر أن تعبك اليوم هو الذي سيرسم فرحة والديك يوم إعلان النتائج الوزارية.",
  "الصبر مفتاح الفرج. واجه التحديات الرياضية والفيزيائية بعقلية المحلل البطل.",
  "كلما شعرت بالفتور، تذكر حلمك والقمة التي تنتظرك في نهاية العام.",
  "اجعل لنفسك فترات راحة قصيرة (تقنية بومودورو) لتجديد نشاطك وتركيزك.",
  "التفوق ليس حظاً، بل هو تراكم إنجازات صغيرة تقوم بها كل يوم بصبر."
];

export async function generate150DayPlan(studyPlanId: string): Promise<boolean> {
  try {
    const daysData = [];

    // Helper to get random motivational tip
    const getTip = (day: number) => MOTIVATIONAL_TIPS[day % MOTIVATIONAL_TIPS.length];

    // Distribute subjects sequentially
    let subjectIndex = 0;

    for (let day = 1; day <= 150; day++) {
      // 1. Monthly Review Day (Every 30th day)
      if (day % 30 === 0) {
        daysData.push({
          studyPlanId,
          dayNumber: day,
          dayTitle: `المراجعة الشهرية الشاملة واختبار تجريبي رقم ${day / 30}`,
          durationMinutes: 180, // 3 hours
          motivationTip: "لقد أتممت شهراً كاملاً من الكفاح! اختبر معلوماتك الآن لتقييم نقاط القوة والضعف.",
          isReviewDay: true,
          isMonthlyReview: true,
          lessonId: null
        });
        continue;
      }

      // 2. Weekly Review Day (Every 7th day, excluding monthly review days)
      if (day % 7 === 0) {
        daysData.push({
          studyPlanId,
          dayNumber: day,
          dayTitle: `المراجعة الأسبوعية وتثبيت مفاهيم الأسبوع ${Math.floor(day / 7)}`,
          durationMinutes: 120, // 2 hours
          motivationTip: "استغل هذا اليوم لمراجعة جميع القوانين والتعاريف الصعبة التي ذاكرتها خلال الأسبوع.",
          isReviewDay: true,
          isMonthlyReview: false,
          lessonId: null
        });
        continue;
      }

      // 3. Final Comprehensive Review Phase (Last 10 days: 141-150)
      if (day >= 141) {
        const finalSubjects = ["الرياضيات", "الفيزياء", "الكيمياء", "الأحياء", "الإنجليزية/العربية", "التربية الإسلامية/القرآن"];
        const targetSub = finalSubjects[(day - 141) % finalSubjects.length];

        daysData.push({
          studyPlanId,
          dayNumber: day,
          dayTitle: `المراجعة النهائية وحل نماذج الامتحانات الوزارية - ${targetSub}`,
          durationMinutes: 240, // 4 hours intense review
          motivationTip: "أنت الآن في الأمتار الأخيرة! حل امتحانات السنوات السابقة هو المفتاح الذهبي للدرجة الكاملة.",
          isReviewDay: true,
          isMonthlyReview: false,
          lessonId: null
        });
        continue;
      }

      // 4. Regular Study Day
      const currentSubject = CORE_SUBJECTS[subjectIndex % CORE_SUBJECTS.length];
      
      // Let's try to find an actual lesson from database for this subject
      const subjectRecord = await prisma.subject.findUnique({
        where: { slug: currentSubject.slug },
        include: { units: { include: { lessons: true } } }
      });

      let lessonId: string | null = null;
      let lessonTitle = "دراسة فصول المقرر الدراسي";

      if (subjectRecord && subjectRecord.units.length > 0) {
        // Flatten all lessons
        const allLessons = subjectRecord.units.flatMap(u => u.lessons);
        if (allLessons.length > 0) {
          // Select lesson based on rotation count
          const selectedLesson = allLessons[Math.floor(day / CORE_SUBJECTS.length) % allLessons.length];
          lessonId = selectedLesson.id;
          lessonTitle = `${subjectRecord.nameAr} - ${selectedLesson.title}`;
        } else {
          lessonTitle = `${subjectRecord.nameAr} - القراءة والمذاكرة الحرة للفصل الأول`;
        }
      } else {
        lessonTitle = `${currentSubject.nameAr} - المذاكرة المنهجية العامة`;
      }

      daysData.push({
        studyPlanId,
        dayNumber: day,
        dayTitle: lessonTitle,
        durationMinutes: currentSubject.defaultTime,
        motivationTip: getTip(day),
        isReviewDay: false,
        isMonthlyReview: false,
        lessonId
      });

      // Increment subject index to rotate subjects
      subjectIndex++;
    }

    // Insert all days in database
    for (const dayItem of daysData) {
      await prisma.studyPlanDay.create({
        data: dayItem
      });
    }

    return true;
  } catch (error) {
    console.error("Failed to generate 150-day study plan:", error);
    return false;
  }
}
