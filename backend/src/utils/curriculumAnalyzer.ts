import prisma from "../config/db";
import crypto from "crypto";

interface ExtractedData {
  simplifiedExplanation: string;
  importantPoints: string[];
  commonMistakes: string[];
  examTips: string[];
  summary: string;
  definitions: { term: string; explanation: string }[];
  formulas: { equation: string; description: string }[];
  examples: { questionText: string; solution: string }[];
  exercises: { questionText: string; solutionGuide: string }[];
}

// Rule-based content generator simulating LLM curriculum extraction in Arabic
export function generateScientificCurriculumContent(subjectSlug: string, lessonTitle: string): ExtractedData {
  const normalizedTitle = lessonTitle.toLowerCase();

  // Match: Physics - AC Circuits (التيار المتردد والمكثفات)
  if (subjectSlug === "physics" || normalizedTitle.includes("تيار") || normalizedTitle.includes("مكثف")) {
    return {
      simplifiedExplanation: `في دوائر التيار المتردد، لا تسير الشحنات في اتجاه واحد بل تتذبذب ذهاباً وإياباً. 
عند توصيل مكثف كهربائي (سعة ثابته) بمصدر تيار متردد، يختلف سلوكه تماماً عن دوائر التيار المستمر:
1. المكثف لا يقطع التيار المتردد كلياً، بل يسمح بمروره نتيجة عمليات الشحن والتفريغ المتعاقبة.
2. ينشأ ما يسمى بالمفاعلة السعوية (م س) والتي تقاوم مرور التيار وتعتمد عكسياً على كل من التردد وسعة المكثف.
3. زاوية الطور: هنا يتقدم فرق الجهد الكهربائي عبر المكثف عن التيار بزاوية طور مقدارها 90 درجة (أو باي/2).`,
      importantPoints: [
        "التيار المتردد يتغير اتجاهه ودورته باستمرار بمعدل التردد (هرتز).",
        "المفاعلة السعوية (م س) تحسب من العلاقة م س = 1 / (2 * باي * التردد * السعة).",
        "وحدة قياس المفاعلة السعوية هي الأوم، تماماً كالمقاومة الأومية العادية."
      ],
      commonMistakes: [
        "الاعتقاد بأن المكثف يمرر التيار المتردد عن طريق انتقال الشحنات الكهربائية عبر المادة العازلة؛ الحقيقة هي أن التيار يمر نتيجة الشحن والتفريغ المستمر للوحين.",
        "نسيان تحويل سعة المكثف من الميكروفاراد (uF) إلى الفاراد (F) بضرب القيمة في 10^-6 عند التعويض في القوانين."
      ],
      examTips: [
        "سؤال وزاري متكرر: ما الذي يحدث للمفاعلة السعوية عند مضاعفة تردد التيار؟ الإجابة: تقل المفاعلة السعوية إلى النصف لأن التناسب عكسي.",
        "انتبه لتمثيل مخططات الطور؛ تذكر دائماً أن التيار يتقدم على فرق الجهد في دائرة المكثف بـ 90 درجة."
      ],
      summary: "دائرة المكثف مع التيار المتردد تتميز بوجود مفاعلة سعوية تتناسب عكسياً مع التردد والسعة، وتتسبب في تأخر الجهد عن التيار بزاوية طور 90 درجة.",
      definitions: [
        {
          term: "المفاعلة السعوية (م س)",
          explanation: "المقاومة أو الممانعة التي يبديها المكثف لمرور التيار المتردد نتيجة ل سعته الكهربائية."
        },
        {
          term: "زاوية الطور",
          explanation: "الزاوية التي توضح فرق الطور (الزمن الإزاحي) بين موجة التيار وموجة الجهد في دوائر التيار المتردد."
        }
      ],
      formulas: [
        {
          equation: "Xc = 1 / (2 * π * f * C)",
          description: "صيغة حساب المفاعلة السعوية (م س) بدلالة التردد (f) بالهرتز، والسعة (C) بالفاراد."
        },
        {
          equation: "I = V / Xc",
          description: "قانون أوم لدوائر المكثف لحساب شدة التيار الفعالة (I) بدلالة الجهد الفعال (V)."
        }
      ],
      examples: [
        {
          questionText: "مكثف كهربائي سعته (14) ميكروفاراد متصل بمصدر تيار متردد تردده (50) هرتز وجهده (220) فولت. احسب المفاعلة السعوية للمكثف وشدة التيار المار بالدائرة. (اعتبر باي = 22/7)",
          solution: `الخطوة 1: تحويل سعة المكثف إلى الفاراد:
C = 14 * 10^-6 فاراد.
الخطوة 2: حساب المفاعلة السعوية (Xc):
Xc = 1 / (2 * (22/7) * 50 * 14 * 10^-6)
Xc = 1 / (4400 * 10^-6) = 10^6 / 4400 = 227.27 أوم.
الخطوة 3: حساب شدة التيار الفعالة (I):
I = V / Xc = 220 / 227.27 = 0.97 أمبير.`
        }
      ],
      exercises: [
        {
          questionText: "احسب التردد اللازم لتيار متردد يمر في مكثف سعته (7) ميكروفاراد لتكون مفاعلته السعوية مساوية 400 أوم.",
          solutionGuide: "استخدم القانون f = 1 / (2 * π * Xc * C). عوض عن Xc بـ 400 وعن C بـ 7 * 10^-6 لتجد التردد بالهرتز."
        }
      ]
    };
  }

  // Match: Math - Combinatorics (التباديل والتوافيق)
  if (subjectSlug === "math" || normalizedTitle.includes("تباديل") || normalizedTitle.includes("توافيق")) {
    return {
      simplifiedExplanation: `التباديل والتوافيق هي طرق رياضية لعد الخيارات المتاحة عند ترتيب أو اختيار عناصر من مجموعة ما:
1. التباديل (ل): تُستخدم عندما يكون **الترتيب مهماً جداً**. على سبيل المثال، تحديد المراكز الثلاثة الأولى في سباق، أو تكوين كلمة سر من عدة أرقام.
2. التوافيق (ق): تُستخدم عندما يكون **الترتيب غير مهم**. مثل اختيار فريق مكون من 3 طلاب من بين 10 طلاب، حيث اختيار (أحمد ومحمد وعلي) هو نفسه اختيار (علي ومحمد وأحمد).`,
      importantPoints: [
        "قانون التباديل: ن ل ر = مضروب(ن) / مضروب(ن - ر).",
        "قانون التوافيق: ن ق ر = ن ل ر / مضروب(ر) = مضروب(ن) / (مضروب(ر) * مضروب(ن - ر)).",
        "تذكر دائماً أن ن >= ر دائماً في التباديل والتوافيق الحقيقية."
      ],
      commonMistakes: [
        "استخدام التباديل في المسائل اللفظية التي لا تشترط الترتيب (مثل اختيار لجان عامة غير محددة المناصب)، مما يؤدي لنتائج مضاعفة وخاطئة.",
        "خلط قوانين المضروب؛ تذكر أن مضروب الصفر (0!) يساوي دائماً 1 وليس صفراً."
      ],
      examTips: [
        "ركز جيداً في قراءة السؤال الوزاري؛ إذا وجدت عبارة 'على أن يكون الرئيس...' أو 'بترتيب معين' استخدم التباديل مباشرة. وإذا كانت مجرد مجموعات فرعية، استخدم التوافيق.",
        "احفظ قيم المضاريب الشهيرة (مثل 5! = 120، 6! = 720) لتسريع وتيرة الحل في قاعة الامتحانات."
      ],
      summary: "التباديل تعد الترتيبات الممكنة لعناصر حيث الترتيب مهم، بينما تعد التوافيق المجموعات الفرعية الممكنة لعناصر حيث الترتيب لا يغير من هوية المجموعة.",
      definitions: [
        {
          term: "التباديل (Permutations)",
          explanation: "عدد الطرق الممكنة لترتيب عدد (ر) من العناصر مأخوذة من بين مجموعة كليتها (ن) من العناصر المميزة."
        },
        {
          term: "التوافيق (Combinations)",
          explanation: "عدد المجموعات الممكنة المكونة من (ر) من العناصر غير المرتبة والتي يمكن اختيارها من مجموعة كليتها (ن) من العناصر."
        }
      ],
      formulas: [
        {
          equation: "nPr = n! / (n - r)!",
          description: "صيغة حساب التباديل (ن ل ر) بدلالة المضروب الرياضي الكلي والفرعي."
        },
        {
          equation: "nCr = n! / (r! * (n - r)!)",
          description: "صيغة حساب التوافيق (ن ق ر) ويرمز لها بالرمز ق."
        }
      ],
      examples: [
        {
          questionText: "أوجد عدد الطرق الممكنة لاختيار رئيس ونائب رئيس من بين لجنة مكونة من 6 أشخاص.",
          solution: `الخطوة 1: تحديد هل الترتيب مهم؟ نعم، لأن منصب 'رئيس' يختلف عن منصب 'نائب رئيس'. إذن نستخدم التباديل.
الخطوة 2: تحديد المعطيات: ن = 6 (العدد الكلي)، ر = 2 (المناصب المطلوب شغلها).
الخطوة 3: التعويض في قانون التباديل:
6 ل 2 = 6! / (6 - 2)! = 6! / 4! = (6 * 5 * 4!) / 4! = 30 طريقة.`
        }
      ],
      exercises: [
        {
          questionText: "بكم طريقة يمكن اختيار لجنة مكونة من 3 طلاب من بين مجموعة تضم 7 طلاب؟",
          solutionGuide: "الترتيب غير مهم لأن اللجنة عامة بدون مناصب. استخدم التوافيق 7 ق 3 = 7! / (3! * 4!) = 35 طريقة."
        }
      ]
    };
  }

  // Fallback default content for any other subject
  return {
    simplifiedExplanation: `هذا الشرح مبسط ومعد خصيصاً لمساعدة طلاب الثانوية العامة بالقسم العلمي على فهم موضوع [${lessonTitle}] في مقرر [${subjectSlug}]:
يتناول هذا الدرس المبادئ والأساسيات العلمية المتعلقة بالمادة، مفسرة بأسلوب مبسط مدعوم بالقوانين والأمثلة التوضيحية لضمان التفوق في الامتحانات الوزارية المعتمدة بصنعاء.`,
    importantPoints: [
      "المفهوم العام للدرس يعتمد على ربط المبادئ النظرية بالتطبيق الرياضي.",
      "يجب التركيز على حل التمارين المرفقة بنهاية كل فصل مدرسي."
    ],
    commonMistakes: [
      "إهمال الوحدات الأساسية للقياس عند التعويض في العلاقات الرياضية.",
      "الحفظ السطحي للتعاريف دون فهم طريقة صياغتها واستخدامها في حل التعليلات."
    ],
    examTips: [
      "اقرأ السؤال كاملاً بتمهل في ورقة الامتحان قبل الشروع في كتابة خطوات الحل.",
      "راجع الحل النموذجي للأعوام السابقة لمعرفة توزيع الدرجات على الخطوات الفرعية."
    ],
    summary: "ملخص سريع يوضح جوهر المادة وأهم العلاقات الرياضية الواردة بالدرس لضمان المراجعة السريعة.",
    definitions: [
      {
        term: `المفهوم الأساسي لـ ${lessonTitle}`,
        explanation: "التعريف الرسمي المقر في كتاب وزارة التربية والتعليم بالجمهورية اليمنية."
      }
    ],
    formulas: [
      {
        equation: "E = mc²",
        description: "مثال على القوانين الرياضية الحاكمة للموضوع العلمي المقترح."
      }
    ],
    examples: [
      {
        questionText: "احسب القيمة المطلوبة للمسألة المقترحة لعام 2026.",
        solution: "خطوات الحل التفصيلية تبدأ بكتابة المعطيات وتحويل الوحدات ثم تطبيق القانون والوصول للناتج النهائي."
      }
    ],
    exercises: [
      {
        questionText: "تمرين تطبيقي ذاتي للطالب.",
        solutionGuide: "استرشد بالقانون المرفق وعوض بالقيم المعطاة للتأكد من فهمك للدرس."
      }
    ]
  };
}

// Controller logic to trigger textbook analysis and populate structured tables
export async function analyzeLessonCurriculum(lessonId: string): Promise<boolean> {
  try {
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { unit: { include: { subject: true } } }
    });

    if (!lesson) return false;

    const subjectSlug = lesson.unit.subject.slug;
    const generated = generateScientificCurriculumContent(subjectSlug, lesson.title);

    // Save to lesson
    await prisma.lesson.update({
      where: { id: lessonId },
      data: {
        simplifiedExplanation: generated.simplifiedExplanation,
        importantPoints: JSON.stringify(generated.importantPoints),
        commonMistakes: JSON.stringify(generated.commonMistakes),
        examTips: JSON.stringify(generated.examTips),
        summary: generated.summary
      }
    });

    // Clear previous entries to prevent duplicate items
    await prisma.definition.deleteMany({ where: { lessonId } });
    await prisma.formula.deleteMany({ where: { lessonId } });
    await prisma.example.deleteMany({ where: { lessonId } });
    await prisma.exercise.deleteMany({ where: { lessonId } });

    // Store Definitions
    for (const def of generated.definitions) {
      await prisma.definition.create({
        data: {
          term: def.term,
          explanation: def.explanation,
          lessonId
        }
      });
    }

    // Store Formulas
    for (const form of generated.formulas) {
      await prisma.formula.create({
        data: {
          equation: form.equation,
          description: form.description,
          lessonId
        }
      });
    }

    // Store Examples
    for (const ex of generated.examples) {
      await prisma.example.create({
        data: {
          questionText: ex.questionText,
          solution: ex.solution,
          lessonId
        }
      });
    }

    // Store Exercises
    for (const exe of generated.exercises) {
      await prisma.exercise.create({
        data: {
          questionText: exe.questionText,
          solutionGuide: exe.solutionGuide,
          lessonId
        }
      });
    }

    return true;
  } catch (error) {
    console.error("Curriculum analysis error:", error);
    return false;
  }
}
