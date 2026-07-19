"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  FileText, 
  HelpCircle, 
  AlertTriangle, 
  Info, 
  FileCode2, 
  ChevronRight, 
  Download, 
  CheckSquare, 
  Award,
  Video,
  XCircle,
  RefreshCw
} from "lucide-react";

export default function LessonDetails() {
  const { lessonId } = useParams();
  const idStr = String(lessonId || "").toLowerCase();
  const [activeTab, setActiveTab] = useState<"explanation" | "formulas" | "examples" | "insights">("explanation");
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  // Mock-simulated state mimicking backend response for interactive presentation
  const [lessonData, setLessonData] = useState<any>({
    title: "المكثف والتردد في دوائر التيار المتردد",
    subjectName: "الفيزياء",
    unitTitle: "الوحدة الأولى: دوائر التيار المتردد",
    simplifiedExplanation: `💡 التفسير الفيزيائي المفصل والمبسط لعمل المكثف في دوائر التيار المتردد:

1. طبيعة التيار المتردد (AC):
هو تيار تتغير قيمته واتجاهه باستمرار وبشكل دوري. هذا التغير المستمر هو المفتاح السحري لتشغيل المكثف.

2. كيف يمرر المكثف التيار بالرغم من وجود مادة عازلة بين لوحيه؟
• في النصف الأول من الدورة (زيادة الجهد): يبدأ المصدر بدفع الشحنات لتتراكم على لوحي المكثف، فتتم عملية "الشحن" ويتدفق تيار في الدائرة الخارجية.
• عند وصول جهد المصدر للقمة: يتوقف مرور التيار مؤقتاً لأن جهد المكثف أصبح مساوياً لجهد المصدر.
• في النصف الثاني من الدورة (انخفاض وعكس الجهد): يبدأ المكثف بتفريغ شحنته معيداً إياها للمصدر في اتجاه معاكس، ثم يُعاد شحنه بقطبية مقلوبة.
• النتيجة: الشحن والتفريغ المستمران يعطيان مظهر مرور التيار عبر المكثف في الدائرة الخارجية طوال الوقت، دون أن تعبر الإلكترونات فعلياً المادة العازلة.

3. المفاعلة السعوية (م س - Xc):
هي الممانعة التي يبديها المكثف لمرور التيار نتيجة لسعته الكهربائية وتُقاس بالأوم.
• تناسب عكسي مع التردد (ت): عند الترددات العالية جداً، يشحن المكثف ويفرغ بسرعة فائقة جداً فلا يجد التيار ممانعة تذكر (تصبح م س تقترب من الصفر).
• تناسب عكسي مع السعة (س): كلما زادت السعة، يتسع المكثف لشحنات أكثر قبل أن يتساوى جهده مع المصدر، مما يسمح بمرور تيار أكبر وممانعة أقل.

4. فرق الطور وزاوية الـ 90 درجة:
التيار يسبق الجهد بربع دورة كاملة (90 درجة). والسبب بديهي: يجب أولاً أن يتدفق التيار (حركة الإلكترونات) لتتراكم الشحنات وتبني الجهد على لوحي المكثف، فالتيار هو السبب والجهد هو النتيجة!`,
    summary: "المكثف يمرر التيار المتردد بممانعة تسمى المفاعلة السعوية تتناسب عكسياً مع التردد والسعة، ويتأخر جهد المكثف عن التيار بـ 90 درجة.",
    importantPoints: [
      "المكثف يقطع التيار المستمر تماماً بمجرد تمام شحنه، بينما يمرر التيار المتردد بشكل مستمر.",
      "المفاعلة السعوية لا تبدد طاقة كهربائية في صورة حرارة (عكس المقاومة الأومية)، بل تخزنها في مجال كهربائي.",
      "عند الترددات العالية جداً، تصبح المفاعلة السعوية صغيرة جداً ويقترب المكثف من سلوك سلك توصيل عديم المقاومة."
    ],
    commonMistakes: [
      "الاعتقاد بأن الإلكترونات تقفز فعلياً عبر المادة العازلة بين لوحي المكثف؛ الحقيقة أن حركة الشحنات تتم فقط في الأسلاك الخارجية شحناً وتفريغاً.",
      "إهمال تحويل سعة المكثف من الميكروفاراد إلى الفاراد عند حساب القوانين."
    ],
    examTips: [
      "سؤال وزاري متكرر: اشرح لماذا يمرر المكثف التيار المتردد بينما يمنع التيار المستمر؟ الإجابة: شحن وتفريغ المكثف المتعاقب يسبب تذبذب تيار الدائرة المتردد.",
      "تذكر العلاقة البيانية بين المفاعلة السعوية والتردد: تناسب عكسي يُمثل بمنحنى تنازلي."
    ],
    definitions: [
      { id: "d1", term: "المفاعلة السعوية (Xc)", explanation: "الممانعة التي يبديها المكثف لمرور التيار الكهربائي المتردد نتيجة ل سعته الكهربائية." },
      { id: "d2", term: "زاوية الطور (Phase Angle)", explanation: "فرق الزاوية الطورية بين متجه الجهد ومتجه التيار، وهي مساوية لـ 90 درجة (يتأخر الجهد)." }
    ],
    formulas: [
      { id: "f1", equation: "Xc = 1 / (2 * π * f * C)", description: "م س = 1 / (2 * ط * ت * س) حيث ت التردد وس السعة بالفراد." },
      { id: "f2", equation: "I = V / Xc", description: "شدة التيار المتردد الفعالة تساوي الجهد الفعال مقسوماً على المفاعلة السعوية." }
    ],
    examples: [
      {
        id: "ex1",
        questionText: "مكثف سعته 14 ميكروفاراد متصل بمصدر جهد متردد تردده 50 هرتز وقيمته الفعالة 220 فولت. احسب ممانعته للتيار. (باي = 22/7)",
        solution: `المعطيات: 
س = 14 * 10^-6 فاراد، ت = 50 هرتز، جـ = 220 فولت.

الخطوة 1: حساب المفاعلة السعوية (Xc):
م س = 1 / (2 * (22/7) * 50 * 14 * 10^-6)
م س = 1 / (2200 * 10^-6) = 10^6 / 2200 = 454.5 أوم.`
      }
    ],
    exercises: [
      {
        id: "exe1",
        questionText: "كيف تتغير المفاعلة السعوية لمكثف إذا تضاعف تردد المصدر ثلاث مرات؟",
        solutionGuide: "المفاعلة تتناسب عكسياً مع التردد، بالتالي إذا تضاعف التردد 3 مرات تقل المفاعلة السعوية لتصبح ثلث قيمتها الأصلية."
      }
    ],
    recommendedVideos: [
      {
        id: "v1",
        title: "دوائر التيار المتردد: المكثف سعة ثابتة - شرح الأستاذ طه الشميري",
        channel: "قناة التلفزيون التعليمي اليمني",
        thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=80",
        url: "https://www.youtube.com/watch?v=phys_ac_capacitor_yemen"
      },
      {
        id: "v2",
        title: "المفاعلة السعوية وزاوية الطور - تفكيك القوانين والمسائل",
        channel: "فيزياء الثالث الثانوي العلمي",
        thumbnail: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=400&q=80",
        url: "https://www.youtube.com/watch?v=phys_phase_angle_yemen"
      }
    ]
  });

  useEffect(() => {
    setIsLoading(true);
    const idStr = String(lessonId).toLowerCase();

    if (idStr.includes("math")) {
      setLessonData({
        title: "مبدأ العد الأساسي وتطبيقاته",
        subjectName: "الرياضيات",
        unitTitle: "الوحدة الأولى: الجبر والتباديل والتوافيق",
        simplifiedExplanation: `🎯 شرح مبدأ العد الأساسي بالتفصيل والتبسيط:

1. الفكرة الجوهرية:
مبدأ العد هو أداة رياضية ذكية تساعدنا على حساب إجمالي عدد النتائج الممكنة لتجربة متعددة المراحل دون الحاجة لكتابة أو سرد كل خيار بمفرده.

2. متى نضرب (قاعدة الضرب)؟
نستخدم الضرب عندما تكون المراحل متعاقبة ومترابطة معاً في نفس الوقت (أي خيار من المرحلة الأولى "و" خيار من الثانية).
• القانون: عدد الطرق الكلية = م × ن × ل ... إلخ.

3. متى نجمع (قاعدة الجمع)؟
نستخدم الجمع عندما تكون الخيارات مانعة لبعضها البعض (أي تختار إما الخيار الأول "أو" الخيار الثاني، ولا يمكن حدوثهما معاً).

4. مثال تطبيقي مفصل:
إذا أردت السفر من صنعاء إلى تعز وهناك 3 شركات باصات مختلفة، ثم من تعز إلى عدن وهناك شركتان، بكم طريقة تسافر من صنعاء إلى عدن مروراً بتعز؟
• المرحلة الأولى (صنعاء-تعز): 3 خيارات.
• المرحلة الثانية (تعز-عدن): خياران.
• بما أن السفرين مترابطان ومتعاقبان، فإن عدد الطرق = 3 × 2 = 6 طرق مختلفة.

5. المضروب (Factorial):
هو حالة خاصة من مبدأ العد نستخدمه عندما نريد ترتيب عدد (ن) من الأشياء في (ن) من الأماكن دون تكرار.
• رمز المضروب: ن!
• حسابه: ن! = ن × (ن - 1) × (ن - 2) ... × 1.`,
        summary: "عدد الطرق الكلية لإجراء عمليات متعاقبة يساوي حاصل ضرب عدد طرق إجراء كل عملية على حدة.",
        importantPoints: [
          "الترتيب مهم جداً في بعض مسائل العد (التباديل) وغير مهم في مسائل أخرى (التوافيق).",
          "نستخدم الضرب دائماً عندما تكون العمليات متعاقبة ومترابطة (و)، ونستخدم الجمع عندما تكون الخيارات مانعة تبادلياً (أو).",
          "مضروب العدد ن (ن!) هو حاصل ضرب الأعداد الصحيحة الموجبة من 1 إلى ن."
        ],
        commonMistakes: [
          "الخلط بين استخدام عملية الضرب وعملية الجمع في المسائل اللفظية.",
          "الخلط بين التباديل والتوافيق في تحديد ما إذا كان الترتيب مهماً أم لا."
        ],
        examTips: [
          "سؤال وزاري متكرر: بكم طريقة يمكن اختيار رئيس ونائب رئيس من بين 10 طلاب؟ الحل: الترتيب مهم هنا، عدد الطرق = 10 × 9 = 90 طريقة.",
          "احرص على قراءة المسألة وفهم سياقها قبل البدء بالحساب الرياضي."
        ],
        definitions: [
          { id: "d1", term: "مبدأ العد (Counting Principle)", explanation: "طريقة حسابية لإيجاد عدد نتائج تجربة متعددة المراحل دون الحاجة لكتابة جميع النتائج." },
          { id: "d2", term: "مضروب العدد (Factorial)", explanation: "حاصل ضرب الأعداد الصحيحة المتتالية من العدد نفسه نزولاً إلى الواحد الصحيح." }
        ],
        formulas: [
          { id: "f1", equation: "عدد الطرق = م × ن × ... × ل", description: "ضرب الخيارات المتاحة لكل مرحلة متتالية للحصول على الناتج النهائي." },
          { id: "f2", equation: "n! = n × (n - 1) × ... × 1", description: "حساب مضروب العدد لتوزيع ن من العناصر على ن من الأماكن." }
        ],
        examples: [
          {
            id: "ex1",
            questionText: "يقدم أحد المطاعم 4 أنواع من الحساء، و 5 أنواع من الوجبات الرئيسية، و 3 أنواع من الحلويات. بكم طريقة يمكن لطالب اختيار وجبة كاملة تحتوي على نوع واحد من كل صنف؟",
            solution: `المعطيات: عدد طرق الحساء (م) = 4، عدد الوجبات (ن) = 5، عدد الحلويات (ل) = 3.

الخطوة 1: تطبيق مبدأ العد الأساسي:
عدد الطرق الكلي = م × ن × ل
عدد الطرق الكلي = 4 × 5 × 3 = 60 طريقة مختلفة.`
          }
        ],
        exercises: [
          {
            id: "exe1",
            questionText: "بكم طريقة يمكن تكوين رقم سري من 4 خانات باستخدام الأرقام من 0 إلى 9 دون تكرار أي رقم؟",
            solutionGuide: "الخانة الأولى لها 10 خيارات، الثانية 9، الثالثة 8، الرابعة 7. عدد الطرق = 10 × 9 × 8 × 7 = 5040 طريقة."
          }
        ],
        recommendedVideos: [
          {
            id: "v1",
            title: "مبدأ العد الأساسي - شرح ميسر للأستاذ عادل العمري",
            channel: "قناة التلفزيون التعليمي اليمني",
            thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=80",
            url: "https://www.youtube.com/watch?v=math_counting_yemen"
          }
        ]
      });
    } else if (idStr.includes("chemistry")) {
      setLessonData({
        title: "سرعة التفاعلات الكيميائية ومعدل التغير",
        subjectName: "الكيمياء",
        unitTitle: "الوحدة الأولى: الحركية الكيميائية",
        simplifiedExplanation: `🔬 مفهوم حركية التفاعل وسرعته بشكل مبسط وتفصيلي:

1. ما هي سرعة التفاعل الكيميائي؟
هي مقياس لمعدل تغير تركيز المواد المتفاعلة (تستهلك وتقل) أو المواد الناتجة (تنتج وتزداد) بمرور الزمن.
• تشبيه بسيط: مثل استهلاك وقود السيارة؛ خزان الوقود (المتفاعلات) يقل، والمسافة المقطوعة (النواتج) تزداد مع مرور الوقت.

2. لماذا نضع إشارة سالبة (-) في قانون سرعة استهلاك المتفاعلات؟
لأن المتفاعلات تتناقص بمرور الزمن، مما يعني أن التغير في تركيزها (Δ[R] = التركيز النهائي - الابتدائي) سيكون قيمة سالبة. وبما أن سرعة التفاعل يجب أن تكون موجبة دائماً، نضع إشارة سالبة في القانون لتعويض النقصان وجعل الناتج النهائي موجباً.

3. نظرية التصادم:
لكي يحدث تفاعل كيميائي، يجب أن تتصادم جزيئات المواد المتفاعلة. ولكن ليس كل تصادم يؤدي لتفاعل! يجب توفر شرطين:
• تصادم فعال (مثمر): تصطدم الجزيئات بالاتجاه الفراغي الصحيح.
• طاقة التنشيط: أن تمتلك الجزيئات الحد الأدنى من الطاقة الحركية اللازمة لكسر الروابط القديمة وبناء روابط جديدة.

4. العوامل المؤثرة على السرعة وتفسيرها المجهري:
• أ. التركيز: زيادة التركيز تعني زيادة عدد الجزيئات في نفس الحجم، مما يزيد من فرص التصادمات في الثانية، فتزداد سرعة التفاعل.
• ب. درجة الحرارة: رفع الحرارة يمنح الجزيئات طاقة حركية أكبر فتتحرك بسرعة أكبر وتتصادم بقوة ووتيرة أعلى، مما يزيد من نسبة التصادمات الفعالة التي تمتلك طاقة التنشيط.
• ج. العامل المساعد (المحفز): مادة تضاف لزيادة سرعة التفاعل دون أن تستهلك. تعمل بطريقة ذكية حيث تفتح مساراً بديلاً للتفاعل يتطلب طاقة تنشيط أقل.`,
        summary: "تُقاس سرعة التفاعل الكيميائي بمعدل تناقص تركيز المتفاعلات أو تزايد تركيز النواتج بمرور الزمن.",
        importantPoints: [
          "تزداد سرعة معظم التفاعلات بزيادة درجة الحرارة وتركيز المواد المتفاعلة.",
          "العوامل المساعدة (المحفزات) تزيد من سرعة التفاعل دون أن تُستهلك فيه بفضل تقليل طاقة التنشيط.",
          "تفاعل الاحتراق سريع جداً بينما تفاعل صدأ الحديد بطيء جداً ويستغرق أشهراً."
        ],
        commonMistakes: [
          "كتابة إشارة سالبة في السرعة النهائية؛ السرعة دائماً قيمة موجبة، ولكن نضع إشارة سالبة في قانون المتفاعلات لتعويض التناقص في التركيز.",
          "عدم أخذ المعاملات المولية في الحسبان عند ربط سرعة استهلاك مادة بسرعة إنتاج مادة أخرى."
        ],
        examTips: [
          "سؤال وزاري متكرر: علل زيادة سرعة التفاعل برفع درجة الحرارة؟ الإجابة: لزيادة متوسط الطاقة الحركية للجزيئات وزيادة عدد التصادمات الفعالة.",
          "تأكد من كتابة إشارة السالب فقط عند حساب معدل تغير تركيز المواد المتفاعلة."
        ],
        definitions: [
          { id: "d1", term: "سرعة التفاعل (Reaction Rate)", explanation: "التغير في تركيز المواد المتفاعلة أو الناتجة في وحدة الزمن." },
          { id: "d2", term: "طاقة التنشيط (Activation Energy)", explanation: "الحد الأدنى من الطاقة التي يجب أن تمتلكها الجزيئات لبدء التفاعل الكيميائي عند التصادم." }
        ],
        formulas: [
          { id: "f1", equation: "السرعة = - Δ[R] / Δt", description: "حساب معدل التغير للمتفاعلات (R) حيث الإشارة السالبة لضمان سرعة موجبة." },
          { id: "f2", equation: "السرعة = + Δ[P] / Δt", description: "حساب معدل التغير للنواتج (P) بمرور الزمن t." }
        ],
        examples: [
          {
            id: "ex1",
            questionText: "تغير تركيز المادة أ من 2.0 مولار إلى 1.2 مولار خلال 40 ثانية. احسب متوسط سرعة التفاعل للمادة أ.",
            solution: `المعطيات: التركيز الابتدائي = 2.0، التركيز النهائي = 1.2، التغير في الزمن = 40 ثانية.

الخطوة 1: تطبيق قانون سرعة استهلاك المتفاعلات:
السرعة = - (التركيز النهائي - التركيز الابتدائي) / الزمن
السرعة = - (1.2 - 2.0) / 40
السرعة = - (-0.8) / 40 = 0.02 مولار/ثانية.`
          }
        ],
        exercises: [
          {
            id: "exe1",
            questionText: "إذا كانت سرعة إنتاج غاز الهيدروجين في تفاعل ما هي 0.06 مولار/ثانية، فما هي سرعة استهلاك حمض الهيدروكلوريك المتفاعل؟ (معامل الحمض في المعادلة الموزونة يساوي ضعف معامل الهيدروجين)",
            solutionGuide: "بما أن معامل الحمض ضعف الهيدروجين، فإن سرعة استهلاك الحمض تساوي ضعف سرعة إنتاج الهيدروجين = 2 × 0.06 = 0.12 مولار/ثانية."
          }
        ],
        recommendedVideos: [
          {
            id: "v1",
            title: "سرعة التفاعلات الكيميائية - شرح الأستاذ جمال طه",
            channel: "قناة التلفزيون التعليمي اليمني",
            thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=80",
            url: "https://www.youtube.com/watch?v=chem_rate_yemen"
          }
        ]
      });
    } else {
      // Default to Physics-1
      setLessonData({
        title: "المكثف والتردد في دوائر التيار المتردد",
        subjectName: "الفيزياء",
        unitTitle: "الوحدة الأولى: دوائر التيار المتردد",
        simplifiedExplanation: `💡 التفسير الفيزيائي المفصل والمبسط لعمل المكثف في دوائر التيار المتردد:

1. طبيعة التيار المتردد (AC):
هو تيار تتغير قيمته واتجاهه باستمرار وبشكل دوري. هذا التغير المستمر هو المفتاح السحري لتشغيل المكثف.

2. كيف يمرر المكثف التيار بالرغم من وجود مادة عازلة بين لوحيه؟
• في النصف الأول من الدورة (زيادة الجهد): يبدأ المصدر بدفع الشحنات لتتراكم على لوحي المكثف، فتتم عملية "الشحن" ويتدفق تيار في الدائرة الخارجية.
• عند وصول جهد المصدر للقمة: يتوقف مرور التيار مؤقتاً لأن جهد المكثف أصبح مساوياً لجهد المصدر.
• في النصف الثاني من الدورة (انخفاض وعكس الجهد): يبدأ المكثف بتفريغ شحنته معيداً إياها للمصدر في اتجاه معاكس، ثم يُعاد شحنه بقطبية مقلوبة.
• النتيجة: الشحن والتفريغ المستمران يعطيان مظهر مرور التيار عبر المكثف في الدائرة الخارجية طوال الوقت، دون أن تعبر الإلكترونات فعلياً المادة العازلة.

3. المفاعلة السعوية (م س - Xc):
هي الممانعة التي يبديها المكثف لمرور التيار نتيجة لسعته الكهربائية وتُقاس بالأوم.
• تناسب عكسي مع التردد (ت): عند الترددات العالية جداً، يشحن المكثف ويفرغ بسرعة فائقة جداً فلا يجد التيار ممانعة تذكر (تصبح م س تقترب من الصفر).
• تناسب عكسي مع السعة (س): كلما زادت السعة، يتسع المكثف لشحنات أكثر قبل أن يتساوى جهده مع المصدر، مما يسمح بمرور تيار أكبر وممانعة أقل.

4. فرق الطور وزاوية الـ 90 درجة:
التيار يسبق الجهد بربع دورة كاملة (90 درجة). والسبب بديهي: يجب أولاً أن يتدفق التيار (حركة الإلكترونات) لتتراكم الشحنات وتبني الجهد على لوحي المكثف، فالتيار هو السبب والجهد هو النتيجة!`,
        summary: "المكثف يمرر التيار المتردد بممانعة تسمى المفاعلة السعوية تتناسب عكسياً مع التردد والسعة، ويتأخر جهد المكثف عن التيار بـ 90 درجة.",
        importantPoints: [
          "المكثف يقطع التيار المستمر تماماً بمجرد تمام شحنه، بينما يمرر التيار المتردد بشكل مستمر.",
          "المفاعلة السعوية لا تبدد طاقة كهربائية في صورة حرارة (عكس المقاومة الأومية)، بل تخزنها في مجال كهربائي.",
          "عند الترددات العالية جداً، تصبح المفاعلة السعوية صغيرة جداً ويقترب المكثف من سلوك سلك توصيل عديم المقاومة."
        ],
        commonMistakes: [
          "الاعتقاد بأن الإلكترونات تقفز فعلياً عبر المادة العازلة بين لوحي المكثف؛ الحقيقة أن حركة الشحنات تتم فقط في الأسلاك الخارجية شحناً وتفريغاً.",
          "إهمال تحويل سعة المكثف من الميكروفاراد إلى الفاراد عند حساب القوانين."
        ],
        examTips: [
          "سؤال وزاري متكرر: اشرح لماذا يمرر المكثف التيار المتردد بينما يمنع التيار المستمر؟ الإجابة: شحن وتفريغ المكثف المتعاقب يسبب تذبذب تيار الدائرة المتردد.",
          "تذكر العلاقة البيانية بين المفاعلة السعوية والتردد: تناسب عكسي يُمثل بمنحنى تنازلي."
        ],
        definitions: [
          { id: "d1", term: "المفاعلة السعوية (Xc)", explanation: "الممانعة التي يبديها المكثف لمرور التيار الكهربائي المتردد نتيجة ل سعته الكهربائية." },
          { id: "d2", term: "زاوية الطور (Phase Angle)", explanation: "فرق الزاوية الطورية بين متجه الجهد ومتجه التيار، وهي مساوية لـ 90 درجة (يتأخر الجهد)." }
        ],
        formulas: [
          { id: "f1", equation: "Xc = 1 / (2 * π * f * C)", description: "م س = 1 / (2 * ط * ت * س) حيث ت التردد وس السعة بالفراد." },
          { id: "f2", equation: "I = V / Xc", description: "شدة التيار المتردد الفعالة تساوي الجهد الفعال مقسوماً على المفاعلة السعوية." }
        ],
        examples: [
          {
            id: "ex1",
            questionText: "مكثف سعته 14 ميكروفاراد متصل بمصدر جهد متردد تردده 50 هرتز وقيمته الفعالة 220 فولت. احسب ممانعته للتيار. (باي = 22/7)",
            solution: `المعطيات: 
س = 14 * 10^-6 فاراد، ت = 50 هرتز، جـ = 220 فولت.

الخطوة 1: حساب المفاعلة السعوية (Xc):
م س = 1 / (2 * (22/7) * 50 * 14 * 10^-6)
م س = 1 / (2200 * 10^-6) = 10^6 / 2200 = 454.5 أوم.`
          }
        ],
        exercises: [
          {
            id: "exe1",
            questionText: "كيف تتغير المفاعلة السعوية لمكثف إذا تضاعف تردد المصدر ثلاث مرات؟",
            solutionGuide: "المفاعلة تتناسب عكسياً مع التردد، بالتالي إذا تضاعف التردد 3 مرات تقل المفاعلة السعوية لتصبح ثلث قيمتها الأصلية."
          }
        ],
        recommendedVideos: [
          {
            id: "v1",
            title: "دوائر التيار المتردد: المكثف سعة ثابتة - شرح الأستاذ طه الشميري",
            channel: "قناة التلفزيون التعليمي اليمني",
            thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=80",
            url: "https://www.youtube.com/watch?v=phys_ac_capacitor_yemen"
          },
          {
            id: "v2",
            title: "المفاعلة السعوية وزاوية الطور - تفكيك القوانين والمسائل",
            channel: "فيزياء الثالث الثانوي العلمي",
            thumbnail: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=400&q=80",
            url: "https://www.youtube.com/watch?v=phys_phase_angle_yemen"
          }
        ]
      });
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [lessonId]);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex items-center justify-center bg-secondary/10">
          <div className="flex flex-col items-center gap-3">
            <RefreshCw className="h-8 w-8 text-primary animate-spin" />
            <span className="text-sm font-semibold text-muted-foreground">جاري استخلاص وتبسيط الدرس...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow py-12 bg-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          
          {/* Breadcrumbs */}
          <div className="text-xs text-muted-foreground flex items-center gap-2 mb-6">
            <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
            <ChevronRight className="h-3 w-3 rotate-180" />
            <Link href="/subjects/physics" className="hover:text-primary transition-colors">{lessonData.subjectName}</Link>
            <ChevronRight className="h-3 w-3 rotate-180" />
            <span className="text-foreground font-semibold">{lessonData.title}</span>
          </div>

          {/* Lesson Header */}
          <div className="bg-background border border-border/40 p-6 sm:p-8 rounded-3xl mb-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold text-primary px-3 py-1 bg-primary/10 rounded-full">
                  {lessonData.unitTitle}
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold mt-3">{lessonData.title}</h1>
              </div>

              {/* Progress checkbox */}
              <button 
                onClick={() => setIsCompleted(!isCompleted)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm border transition-all ${
                  isCompleted 
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                    : "bg-background border-border hover:bg-secondary/40"
                }`}
              >
                <CheckSquare className={`h-4 w-4 ${isCompleted ? "fill-current" : ""}`} />
                <span>{isCompleted ? "تم إكمال الدرس" : "تحديد كمكتمل"}</span>
              </button>
            </div>
          </div>

          {/* Core Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Tabs Area */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Tab Navigation */}
              <div className="flex border-b border-border/40 pb-px gap-4 overflow-x-auto">
                {[
                  { id: "explanation", name: "الشرح الميسر", icon: BookOpen },
                  { id: "formulas", name: "المصطلحات والقوانين", icon: FileText },
                  { id: "examples", name: "أمثلة وتمارين محلولة", icon: FileCode2 },
                  { id: "insights", name: "تنبيهات وأخطاء الامتحان", icon: AlertTriangle }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`pb-4 px-2 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 shrink-0 ${
                      activeTab === tab.id
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.name}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content Display */}
              <div className="min-h-[400px]">
                <AnimatePresence mode="wait">
                  {activeTab === "explanation" && (
                    <motion.div
                      key="explanation"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-background border border-border/40 p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col gap-6"
                    >
                      <div>
                        <h2 className="text-lg font-extrabold mb-4 flex items-center gap-2 text-primary">
                          <Info className="h-5 w-5" />
                          <span>شرح الدرس الميسّر</span>
                        </h2>
                        <p className="text-sm sm:text-base text-muted-foreground whitespace-pre-line leading-[1.8]">
                          {lessonData.simplifiedExplanation}
                        </p>
                      </div>

                      {idStr.includes("physics") && <PhysicsInteractive />}
                      {idStr.includes("math") && <MathInteractive />}
                      {idStr.includes("chemistry") && <ChemistryInteractive />}

                      {/* Important Bullet Points */}
                      <div className="border-t border-border/40 pt-6">
                        <h3 className="text-sm font-extrabold mb-3">نقاط ذهبية للحفظ والفهم:</h3>
                        <ul className="flex flex-col gap-2.5">
                          {lessonData.importantPoints.map((pt: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                              <span className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "formulas" && (
                    <motion.div
                      key="formulas"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex flex-col gap-6"
                    >
                      {/* Definitions */}
                      <div className="bg-background border border-border/40 p-6 rounded-3xl shadow-sm">
                        <h2 className="text-base font-extrabold mb-4">التعاريف والمصطلحات المقررة</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {lessonData.definitions.map((def: any) => (
                            <div key={def.id} className="p-4 bg-secondary/20 rounded-2xl border border-border/20">
                              <span className="font-extrabold text-sm text-primary">{def.term}</span>
                              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{def.explanation}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Formulas */}
                      <div className="bg-background border border-border/40 p-6 rounded-3xl shadow-sm">
                        <h2 className="text-base font-extrabold mb-4">العلاقات والقوانين الرياضية</h2>
                        <div className="flex flex-col gap-4">
                          {lessonData.formulas.map((form: any) => (
                            <div key={form.id} className="p-4 bg-secondary/15 rounded-2xl border border-border/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <code className="text-base sm:text-lg font-bold text-foreground font-mono select-all text-left bg-secondary/80 px-4 py-2 rounded-xl border border-border/40 self-start sm:self-auto">
                                {form.equation}
                              </code>
                              <p className="text-xs text-muted-foreground leading-relaxed pr-0 sm:pr-4 flex-1">
                                {form.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "examples" && (
                    <motion.div
                      key="examples"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex flex-col gap-6"
                    >
                      {/* Solved Examples */}
                      <div className="bg-background border border-border/40 p-6 rounded-3xl shadow-sm">
                        <h2 className="text-base font-extrabold mb-4 flex items-center gap-2 text-primary">
                          <Award className="h-5 w-5" />
                          <span>أمثلة تطبيقية نموذجية</span>
                        </h2>
                        {lessonData.examples.map((ex: any) => (
                          <div key={ex.id} className="flex flex-col gap-4">
                            <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                              <span className="font-extrabold text-xs text-primary">المسألة:</span>
                              <p className="text-sm font-bold mt-1 leading-relaxed">{ex.questionText}</p>
                            </div>
                            <div className="p-4 bg-secondary/30 rounded-2xl border border-border/40">
                              <span className="font-extrabold text-xs text-muted-foreground">خطوات الحل التفصيلي:</span>
                              <p className="text-xs sm:text-sm text-muted-foreground mt-2 whitespace-pre-line leading-relaxed">
                                {ex.solution}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Exercises */}
                      <div className="bg-background border border-border/40 p-6 rounded-3xl shadow-sm">
                        <h2 className="text-base font-extrabold mb-4">تمارين مقترحة للتدريب</h2>
                        {lessonData.exercises.map((exe: any) => (
                          <div key={exe.id} className="p-4 bg-secondary/20 rounded-2xl border border-border/20 flex flex-col gap-3">
                            <p className="text-sm font-bold">{exe.questionText}</p>
                            <div className="text-xs text-muted-foreground leading-relaxed bg-background/50 p-3 rounded-xl border border-border/40">
                              <span className="font-bold text-[10px] text-primary block mb-1">إرشاد الحل:</span>
                              {exe.solutionGuide}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "insights" && (
                    <motion.div
                      key="insights"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                      {/* Common Mistakes */}
                      <div className="bg-background border border-red-500/20 p-6 rounded-3xl shadow-sm">
                        <h2 className="text-base font-extrabold text-red-600 dark:text-red-400 mb-4 flex items-center gap-2">
                          <XCircle className="h-5 w-5" />
                          <span>احذر الوقوع في هذه الأخطاء:</span>
                        </h2>
                        <ul className="flex flex-col gap-4">
                          {lessonData.commonMistakes.map((mistake: string, idx: number) => (
                            <li key={idx} className="p-3 bg-red-500/5 rounded-2xl border border-red-500/10 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                              {mistake}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Exam Tips */}
                      <div className="bg-background border border-amber-500/20 p-6 rounded-3xl shadow-sm">
                        <h2 className="text-base font-extrabold text-amber-600 dark:text-amber-400 mb-4 flex items-center gap-2">
                          <Award className="h-5 w-5" />
                          <span>أسرار الامتحان الوزاري:</span>
                        </h2>
                        <ul className="flex flex-col gap-4">
                          {lessonData.examTips.map((tip: string, idx: number) => (
                            <li key={idx} className="p-3 bg-amber-500/5 rounded-2xl border border-amber-500/10 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Sidebar Summary */}
            <div className="flex flex-col gap-6">
              
              {/* Summary Card */}
              <div className="bg-background border border-border/40 p-6 rounded-3xl shadow-sm">
                <h3 className="font-extrabold text-sm mb-3">الملخص السريع للدرس</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {lessonData.summary}
                </p>
              </div>

              {/* Recommended Videos Card */}
              <div className="bg-background border border-border/40 p-6 rounded-3xl shadow-sm flex flex-col gap-4">
                <h3 className="font-extrabold text-sm mb-1 flex items-center gap-1.5 text-primary">
                  <Video className="h-4.5 w-4.5" />
                  <span>فيديوهات شرح مقترحة</span>
                </h3>
                {lessonData.recommendedVideos && lessonData.recommendedVideos.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    {lessonData.recommendedVideos.map((video: any) => (
                      <a 
                        key={video.id}
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-2 hover:bg-secondary/40 rounded-2xl border border-border/20 transition-all group"
                      >
                        <div className="h-12 w-16 bg-secondary rounded-xl overflow-hidden relative shrink-0">
                          <img 
                            src={video.thumbnail} 
                            alt={video.title} 
                            className="object-cover h-full w-full group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="flex flex-col text-right overflow-hidden">
                          <span className="text-[10px] sm:text-xs font-bold text-foreground truncate group-hover:text-primary transition-colors leading-snug">
                            {video.title}
                          </span>
                          <span className="text-[9px] text-muted-foreground mt-0.5 font-medium truncate">
                            {video.channel}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground text-center py-2">لا تتوفر فيديوهات مقترحة حالياً.</span>
                )}
              </div>

              {/* Study Tools */}
              <div className="bg-background border border-border/40 p-6 rounded-3xl shadow-sm flex flex-col gap-4">
                <h3 className="font-extrabold text-sm mb-1">أدوات دراسية إضافية</h3>
                
                <Link 
                  href={`/quizzes/lesson/${lessonId}`}
                  className="flex items-center justify-between p-3.5 bg-primary hover:bg-primary/95 text-white text-xs font-bold rounded-2xl transition-all shadow-md shadow-primary/10"
                >
                  <span>اختبر نفسك في هذا الدرس</span>
                  <Award className="h-4 w-4" />
                </Link>

                <button className="flex items-center justify-between p-3.5 bg-secondary hover:bg-secondary/70 border border-border/60 text-xs font-bold rounded-2xl transition-all">
                  <span>تحميل ملخص الدرس (PDF)</span>
                  <Download className="h-4 w-4" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

// =========================================================================
// INTERACTIVE EXPLANATION WIDGETS
// =========================================================================

function PhysicsInteractive() {
  const [freq, setFreq] = useState(50); // Hz
  const [cap, setCap] = useState(14); // microFarad
  const voltage = 220; // V

  // Xc = 1 / (2 * pi * f * C)
  const xc = 1 / (2 * Math.PI * freq * (cap * 1e-6));
  const current = voltage / xc;

  // Normalized current for animation speed and brightness (range 0.1 to 1)
  const normCurrent = Math.min(current / 1.5, 1); 

  return (
    <div className="mt-8 p-6 bg-secondary/15 rounded-3xl border border-border/40 flex flex-col gap-6">
      <div className="text-right">
        <h3 className="font-extrabold text-sm text-primary flex items-center gap-1.5 mb-2">
          <span>⚡ محاكاة تفاعلية: المكثف والمفاعلة السعوية</span>
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          قم بتغيير تردد المصدر وسعة المكثف لتلاحظ تأثيرهما المباشر على المفاعلة السعوية (م س) وشدة تيار الدائرة ولمعان المصباح.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Controls */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-primary font-mono" dir="ltr">{freq} Hz</span>
              <span>التردد (ت):</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="100" 
              value={freq} 
              onChange={(e) => setFreq(Number(e.target.value))}
              className="w-full accent-primary bg-secondary h-2 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-primary font-mono" dir="ltr">{cap} µF</span>
              <span>سعة المكثف (س):</span>
            </div>
            <input 
              type="range" 
              min="2" 
              max="50" 
              value={cap} 
              onChange={(e) => setCap(Number(e.target.value))}
              className="w-full accent-primary bg-secondary h-2 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="p-4 bg-background border border-border/40 rounded-2xl flex flex-col gap-2 text-xs">
            <div className="flex justify-between">
              <span className="font-mono text-foreground font-bold">{xc.toFixed(1)} أوم</span>
              <span className="text-muted-foreground">المفاعلة السعوية (م س):</span>
            </div>
            <div className="flex justify-between">
              <span className="font-mono text-foreground font-bold">{current.toFixed(3)} أمبير</span>
              <span className="text-muted-foreground">شدة التيار الفعال (ت):</span>
            </div>
          </div>
        </div>

        {/* Visual Circuit Diagram (SVG) */}
        <div className="flex flex-col items-center justify-center p-4 bg-background border border-border/40 rounded-2xl relative overflow-hidden h-[200px]">
          <svg className="w-full h-full max-w-[280px]" viewBox="0 0 200 150">
            {/* Wires */}
            <path d="M 40 40 L 160 40 L 160 110 L 40 110 Z" fill="none" stroke="var(--border)" strokeWidth="3" />
            
            {/* AC Source Symbol at the bottom */}
            <circle cx="100" cy="110" r="16" fill="var(--background)" stroke="var(--primary)" strokeWidth="3" />
            <path d="M 90 110 Q 95 102 100 110 T 110 110" fill="none" stroke="var(--primary)" strokeWidth="3" />
            <text x="100" y="140" textAnchor="middle" className="fill-foreground text-[10px] font-bold">مصدر متردد (220V)</text>

            {/* Capacitor Symbol on the left wire */}
            <line x1="25" y1="75" x2="55" y2="75" stroke="var(--foreground)" strokeWidth="3" />
            <line x1="25" y1="67" x2="55" y2="67" stroke="var(--foreground)" strokeWidth="3" />
            <text x="75" y="77" className="fill-muted-foreground text-[9px] font-bold">مكثف (C)</text>

            {/* Bulb/Lamp on the right wire */}
            <circle cx="160" cy="75" r="14" fill={normCurrent > 0.1 ? `rgba(245, 158, 11, ${0.2 + normCurrent * 0.8})` : "none"} stroke="var(--foreground)" strokeWidth="3" />
            <path d="M 151 66 L 169 84 M 151 84 L 169 66" stroke="var(--foreground)" strokeWidth="2" />
            <text x="125" y="77" className="fill-muted-foreground text-[9px] font-bold">مصباح</text>

            {/* Animated electrons moving along wires */}
            {normCurrent > 0.05 && (
              <circle r="4" fill="#10B981">
                <animateMotion 
                  path="M 40 40 L 160 40 L 160 110 L 40 110 Z" 
                  dur={`${3.5 - normCurrent * 3}s`} 
                  repeatCount="indefinite" 
                />
              </circle>
            )}
            {normCurrent > 0.05 && (
              <circle r="4" fill="#10B981">
                <animateMotion 
                  path="M 40 40 L 160 40 L 160 110 L 40 110 Z" 
                  dur={`${3.5 - normCurrent * 3}s`} 
                  begin={`${(3.5 - normCurrent * 3) / 2}s`}
                  repeatCount="indefinite" 
                />
              </circle>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}

function MathInteractive() {
  const [soup, setSoup] = useState(3);
  const [meal, setMeal] = useState(4);
  const [dessert, setDessert] = useState(2);

  const total = soup * meal * dessert;

  return (
    <div className="mt-8 p-6 bg-secondary/15 rounded-3xl border border-border/40 flex flex-col gap-6">
      <div className="text-right">
        <h3 className="font-extrabold text-sm text-primary flex items-center gap-1.5 mb-2">
          <span>📐 محاكاة تفاعلية: مبدأ العد الأساسي</span>
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          غير عدد الخيارات المتاحة لكل صنف وجبة لتلاحظ كيف يتضاعف إجمالي التشكيلات الممكنة ضرباً (م × ن × ل).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Controls */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold">أنواع الحساء (م): {soup}</span>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map(n => (
                <button
                  key={n}
                  onClick={() => setSoup(n)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-xl border transition-all ${
                    soup === n ? "bg-primary text-white border-primary" : "bg-background border-border hover:bg-secondary/45"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold">الوجبات الرئيسية (ن): {meal}</span>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(n => (
                <button
                  key={n}
                  onClick={() => setMeal(n)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-xl border transition-all ${
                    meal === n ? "bg-primary text-white border-primary" : "bg-background border-border hover:bg-secondary/45"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold">الحلويات (ل): {dessert}</span>
            <div className="flex gap-2">
              {[1, 2, 3].map(n => (
                <button
                  key={n}
                  onClick={() => setDessert(n)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-xl border transition-all ${
                    dessert === n ? "bg-primary text-white border-primary" : "bg-background border-border hover:bg-secondary/45"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calculation Visual representation */}
        <div className="flex flex-col items-center justify-center p-6 bg-background border border-border/40 rounded-2xl h-[200px]">
          <div className="text-center flex flex-col gap-2">
            <span className="text-xs text-muted-foreground font-semibold">حساب عدد الطرق الممكنة:</span>
            <div className="flex items-center justify-center gap-3 font-mono text-xl sm:text-2xl font-black text-foreground">
              <span className="text-primary">{soup}</span>
              <span className="text-muted-foreground/50">×</span>
              <span className="text-primary">{meal}</span>
              <span className="text-muted-foreground/50">×</span>
              <span className="text-primary">{dessert}</span>
              <span className="text-muted-foreground/50">=</span>
              <span className="text-emerald-500 font-extrabold">{total} طريقة</span>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-1.5 max-h-[80px] overflow-y-auto p-1 border border-border/20 rounded-xl bg-secondary/5">
              {Array.from({ length: Math.min(total, 60) }).map((_, i) => (
                <span 
                  key={i} 
                  className="inline-block h-3.5 w-3.5 bg-primary/20 border border-primary/45 rounded-md text-[8px] flex items-center justify-center font-bold text-primary animate-pulse"
                  style={{ animationDelay: `${i * 0.03}s` }}
                >
                  🍽️
                </span>
              ))}
              {total > 60 && <span className="text-[10px] text-muted-foreground self-center">...وغيرها</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChemistryInteractive() {
  const [temp, setTemp] = useState(25); // Celsius
  const [conc, setConc] = useState(1.0); // M
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100

  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        setProgress(prev => {
          // Speed of reaction increases with higher temperature and concentration
          const speed = (temp / 10) * conc * 2.5;
          const nextVal = prev + speed;
          if (nextVal >= 100) {
            clearInterval(interval);
            setIsRunning(false);
            return 100;
          }
          return nextVal;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRunning, temp, conc]);

  const handleStart = () => {
    setProgress(0);
    setIsRunning(true);
  };

  // Curves for reactant A and product B
  // A starts at 100% and drops to 20%
  const reactantConc = Math.max(1.0 - (progress / 100) * 0.8 * conc, 0);
  // B starts at 0% and goes up to 80%
  const productConc = (progress / 100) * 0.8 * conc;

  return (
    <div className="mt-8 p-6 bg-secondary/15 rounded-3xl border border-border/40 flex flex-col gap-6">
      <div className="text-right">
        <h3 className="font-extrabold text-sm text-primary flex items-center gap-1.5 mb-2">
          <span>🧪 محاكاة تفاعلية: سرعة وحركية التفاعل</span>
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          اضبط درجة الحرارة وتركيز المواد المتفاعلة ثم ابدأ التفاعل لتلاحظ سرعة التصادمات البيئية والتغير في تركيز المواد المتفاعلة والناتجة.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Controls */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-primary">{temp} °C</span>
              <span>درجة الحرارة (د):</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="90" 
              value={temp} 
              onChange={(e) => setTemp(Number(e.target.value))}
              disabled={isRunning}
              className="w-full accent-primary bg-secondary h-2 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-primary">{conc.toFixed(1)} M</span>
              <span>التركيز الابتدائي للـمتفاعلات [R]:</span>
            </div>
            <input 
              type="range" 
              min="0.5" 
              max="2.0" 
              step="0.1"
              value={conc} 
              onChange={(e) => setConc(Number(e.target.value))}
              disabled={isRunning}
              className="w-full accent-primary bg-secondary h-2 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <button
            onClick={handleStart}
            disabled={isRunning}
            className="w-full py-2.5 bg-primary hover:bg-primary/95 text-white font-extrabold text-xs rounded-xl shadow-md disabled:opacity-50 transition-colors"
          >
            {isRunning ? "جاري التفاعل..." : "ابدأ التفاعل الكيميائي 🚀"}
          </button>
        </div>

        {/* Reaction microscopic view or chart */}
        <div className="flex flex-col items-center justify-between p-4 bg-background border border-border/40 rounded-2xl h-[210px] relative overflow-hidden">
          {/* Reaction Container showing molecules */}
          <div className="w-full h-1/2 border border-border rounded-xl relative bg-secondary/10 overflow-hidden flex items-center justify-center">
            {/* Reactant Molecules (Red) */}
            {progress < 98 && Array.from({ length: Math.max(Math.round(15 * conc * (1 - progress/100)), 0) }).map((_, i) => (
              <span 
                key={`r_${i}`}
                className="absolute h-2.5 w-2.5 bg-red-500 rounded-full animate-bounce"
                style={{
                  top: `${10 + (i * 27) % 65}%`,
                  left: `${10 + (i * 37) % 80}%`,
                  animationDuration: `${1.2 - (temp / 100)}s`
                }}
              />
            ))}
            {/* Product Molecules (Blue) */}
            {Array.from({ length: Math.round(15 * conc * (progress/100)) }).map((_, i) => (
              <span 
                key={`p_${i}`}
                className="absolute h-2.5 w-2.5 bg-blue-500 rounded-full animate-pulse"
                style={{
                  top: `${10 + (i * 19) % 65}%`,
                  left: `${10 + (i * 41) % 80}%`,
                  animationDuration: `0.8s`
                }}
              />
            ))}
            <span className="text-[9px] font-bold text-muted-foreground/60 absolute bottom-1 right-2">رؤية مجهرية للتصادمات</span>
          </div>

          {/* Reaction Curves */}
          <div className="w-full flex flex-col gap-1.5 text-[10px]">
            <div className="flex justify-between font-semibold">
              <span className="text-red-500 font-mono">R: {reactantConc.toFixed(2)} M</span>
              <span>تركيز المتفاعلات [R]:</span>
            </div>
            <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-red-500 rounded-full transition-all" style={{ width: `${(reactantConc / 2.0) * 100}%` }} />
            </div>

            <div className="flex justify-between font-semibold">
              <span className="text-blue-500 font-mono">P: {productConc.toFixed(2)} M</span>
              <span>تركيز النواتج [P]:</span>
            </div>
            <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${(productConc / 2.0) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
