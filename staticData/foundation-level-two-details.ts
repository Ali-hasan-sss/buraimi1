/** Bilingual static content for `/main/foundation-program/level-2` */
export type Bi = { ar: string; en: string };

export type FoundationLevelTwoDetailsData = {
  heroTitle: Bi;
  heroSubtitle: Bi;
  heroTagline: Bi;
  courseDescriptionTitle: Bi;
  courseDescriptionParagraphs: Bi[];
  courseDescriptionHighlight: Bi[];
  courseGoalsTitle: Bi;
  courseGoalsSubtitle: Bi;
  courseGoalsCards: Array<{ title: Bi; text: Bi; icon: "graduation" | "brain" }>;
  programGoalsTitle: Bi;
  programGoalsSubtitle: Bi;
  programGoalsIntro: Bi;
  programGoalsItems: Array<{ n: number; title: Bi; text: Bi }>;
  learningOutcomesTitle: Bi;
  learningOutcomesSubtitle: Bi;
  learningOutcomeTiles: Array<{ title: Bi; badge: Bi; tone: "blue" | "green" | "purple" | "amber" | "red" | "teal" }>;
  grammarTitle: Bi;
  grammarSubtitle: Bi;
  grammarItems: Bi[];
  vocabularyTitle: Bi;
  vocabularySubtitle: Bi;
  vocabularyItems: Bi[];
  speakingTitle: Bi;
  speakingSubtitle: Bi;
  speakingItems: Bi[];
  listeningTitle: Bi;
  listeningSubtitle: Bi;
  listeningItems: Bi[];
  readingTitle: Bi;
  readingSubtitle: Bi;
  readingItems: Bi[];
  writingTitle: Bi;
  writingSubtitle: Bi;
  writingItems: Bi[];
  integratedResultsTitle: Bi;
  integratedResultsSubtitle: Bi;
  studySkillBlocks: Array<{ title: Bi; icon: "clock" | "search" | "fileText" | "presentation"; items: Bi[] }>;
  ctaTitle: Bi;
  ctaText: Bi;
  ctaProgramOverviewLabel: Bi;
  ctaLevelOneLabel: Bi;
  ctaHomeLabel: Bi;
};

export const foundationLevelTwoDetailsSeed: FoundationLevelTwoDetailsData = {
  heroTitle: { ar: "المستوى الثاني - البرنامج التأسيسي", en: "Level 2 - Foundation Program" },
  heroSubtitle: { ar: "اللغة الإنجليزية المكثفة المتكاملة - المستوى 2", en: "Integrated Intensive English - Level 2" },
  heroTagline: { ar: "المستوى ما قبل المتوسط | Pre-Intermediate Level", en: "Pre-Intermediate Level | المستوى ما قبل المتوسط" },
  courseDescriptionTitle: { ar: "وصف المادة", en: "Course Description" },
  courseDescriptionParagraphs: [
    {
      ar: "اللغة الإنجليزية المكثفة المتكاملة - المستوى 2 هو منهج يركز على المتعلم مصمم لتطوير الكفاءة العامة للغة الإنجليزية في المستوى ما قبل المتوسط من أجل إعداد الطلاب لتحديات الدراسات المتوسطة في المستوى الثالث.",
      en: "Integrated Intensive English - Level 2 is a learner-centered course designed to develop general English proficiency at the pre-intermediate level in preparation for intermediate studies in Level 3.",
    },
    {
      ar: "وهو يقوم بمراجعة وتوسيع العديد من التراكيب التي تمت تغطيتها في المستوى الابتدائي ويقدم مستوى أعلى من الأنشطة التواصلية التي تتراوح بين المهام الخاضعة للرقابة والمهام الحرة التي تشجع الطلاب على استكشاف اللغة في سياقات تتعلق بالحياة اليومية.",
      en: "It reviews and extends many structures covered at elementary level and offers a higher range of communicative activities from controlled tasks to freer tasks that encourage students to explore the language in everyday-life contexts.",
    },
  ],
  courseDescriptionHighlight: [
    { ar: "تسهّل هذه الدورة على الطلاب ", en: "This course helps students develop " },
    { ar: "التفكير النقدي", en: "critical thinking" },
    { ar: " الذي يقودهم إلى أن يصبحوا ", en: " that leads them to become " },
    { ar: "متعلمين نشطين ومستقلين", en: "active, independent learners" },
    {
      ar: ". وعلاوة على ذلك، يساعد الطلاب على تعلم مجموعة واسعة من المفردات عالية التردد وتطوير كفاءتهم في الكتابة باستخدام موضوعات واقعية ووظائف لغوية محفزة ومفيدة في مواقف الحياة الواقعية.",
      en: ". Furthermore, it helps students learn a wide range of high-frequency vocabulary and develop writing competence using realistic topics and motivating, useful language functions in real-life situations.",
    },
  ],
  courseGoalsTitle: { ar: "الأهداف التي تتناولها هذه المقرر الدراسي", en: "Course Objectives Addressed by This Course" },
  courseGoalsSubtitle: { ar: "أهداف المقرر", en: "Course Objectives" },
  courseGoalsCards: [
    {
      title: { ar: "الكفاءة اللغوية", en: "Language Proficiency" },
      text: {
        ar: "مساعدة الطلاب على اكتساب الكفاءة الكافية في اللغة الإنجليزية وإعدادهم لدراساتهم الجامعية في الأقسام الأكاديمية",
        en: "Help students acquire sufficient English proficiency and prepare them for university studies in academic departments.",
      },
      icon: "graduation",
    },
    {
      title: { ar: "المهارات الدراسية", en: "Study Skills" },
      text: {
        ar: "تهيئة الطلاب في المهارات الدراسية وأساليب التعلم من خلال تدوين الملاحظات والبحث عن المعلومات وجمعها من مصادر مختلفة",
        en: "Prepare students in study skills and learning approaches through note-taking, researching, and gathering information from different sources.",
      },
      icon: "brain",
    },
  ],
  programGoalsTitle: { ar: "أهداف برنامج القسم", en: "Department Program Goals" },
  programGoalsSubtitle: { ar: "أهداف البرنامج - بنهاية هذه المقرر", en: "Program Goals - By the end of this course" },
  programGoalsIntro: { ar: "بنهاية هذه المقرّر، سيتم تحقيق أهداف البرنامج التالية:", en: "By the end of this course, the following program goals will be achieved:" },
  programGoalsItems: [
    {
      n: 1,
      title: { ar: "المناقشة والتفاعل", en: "Discussion and interaction" },
      text: {
        ar: "المشاركة في المناقشة حول موضوع ذي صلة بدراستهم من خلال طرح الأسئلة، والموافقة/عدم الموافقة، وطلب التوضيح، ومشاركة المعلومات",
        en: "Participate in discussion on a study-related topic by asking questions, agreeing/disagreeing, requesting clarification, and sharing information.",
      },
    },
    {
      n: 2,
      title: { ar: "إعادة الصياغة", en: "Paraphrasing" },
      text: {
        ar: "إعادة صياغة المعلومات (شفهيًا أو كتابيًا) من نص مكتوب أو منطوق أو من بيانات معروضة بيانيًا",
        en: "Paraphrase information (orally or in writing) from written or spoken texts or from visually presented data.",
      },
    },
    {
      n: 3,
      title: { ar: "العروض التقديمية", en: "Presentations" },
      text: {
        ar: "إعداد وإلقاء حديث مدته دقيقتان على الأقل، استخدام مصادر المكتبة، التحدث بوضوح وثقة، والتواصل بالعينين",
        en: "Prepare and deliver a talk of at least two minutes, use library resources, speak clearly and confidently, and maintain eye contact.",
      },
    },
    {
      n: 4,
      title: { ar: "الكتابة الأكاديمية", en: "Academic writing" },
      text: {
        ar: "كتابة نصوص من 100 كلمة كحد أدنى، مع إظهار التحكم في التخطيط والتنظيم وعلامات الترقيم والتهجئة وتركيب الجمل",
        en: "Write texts of at least 100 words, showing control of planning, organization, punctuation, spelling, and sentence structure.",
      },
    },
    {
      n: 5,
      title: { ar: "تدوين الملاحظات", en: "Note-taking" },
      text: {
        ar: "تدوين الملاحظات والرد على الأسئلة المتعلقة بالموضوع والأفكار الرئيسية والتفاصيل من نص استماع مطول",
        en: "Take notes and answer questions on topic, main ideas, and details from extended listening texts.",
      },
    },
    {
      n: 6,
      title: { ar: "اتباع التعليمات", en: "Following instructions" },
      text: {
        ar: "اتبع التعليمات المنطوقة لتنفيذ مهمة ذات عدد من المراحل",
        en: "Follow spoken instructions to complete a multi-stage task.",
      },
    },
    {
      n: 7,
      title: { ar: "فهم المحادثات", en: "Understanding conversations" },
      text: {
        ar: "الاستماع إلى محادثة بين متحدثين أو أكثر والقدرة على الإجابة على الأسئلة المتعلقة بالسياق والعلاقة",
        en: "Listen to a conversation between two or more speakers and answer questions about context and relationships.",
      },
    },
    {
      n: 8,
      title: { ar: "القراءة التحليلية", en: "Analytical reading" },
      text: {
        ar: "قراءة نص من صفحة إلى صفحتين وتحديد الفكرة (الأفكار) الرئيسية واستخراج معلومات محددة في فترة زمنية معينة",
        en: "Read a one-to-two-page text, identify main idea(s), and extract specific information within a set time.",
      },
    },
  ],
  learningOutcomesTitle: { ar: "المهارات اللغوية المتكاملة", en: "Integrated Language Skills" },
  learningOutcomesSubtitle: { ar: "مخرجات المهارات المتكاملة", en: "Integrated Language Skills" },
  learningOutcomeTiles: [
    { title: { ar: "القواعد", en: "Grammar" }, badge: { ar: "8 مخرجات", en: "8 outcomes" }, tone: "blue" },
    { title: { ar: "المصطلحات", en: "Vocabulary" }, badge: { ar: "3 مخرجات", en: "3 outcomes" }, tone: "green" },
    { title: { ar: "التحدث", en: "Speaking" }, badge: { ar: "6 مخرجات", en: "6 outcomes" }, tone: "purple" },
    { title: { ar: "الاستماع", en: "Listening" }, badge: { ar: "7 مخرجات", en: "7 outcomes" }, tone: "amber" },
    { title: { ar: "القراءة", en: "Reading" }, badge: { ar: "5 مخرجات", en: "5 outcomes" }, tone: "red" },
    { title: { ar: "الكتابة", en: "Writing" }, badge: { ar: "5 مخرجات", en: "5 outcomes" }, tone: "teal" },
  ],
  grammarTitle: { ar: "القواعد", en: "Grammar" },
  grammarSubtitle: { ar: "قواعد اللغة الإنجليزية", en: "Grammar" },
  grammarItems: [
    { ar: "التمييز بين استخدامات الأزمنة المختلفة في سياق الحياة الواقعية", en: "Distinguish between different tense uses in real-life contexts." },
    { ar: "استخدم صيغ المستقبل في سياق الحياة الواقعية أثناء التحدث والكتابة", en: "Use future forms in real-life contexts when speaking and writing." },
    { ar: "دمج صيغة المبني للمعلوم والمبني للمجهول والخطاب التقريري بشكل صحيح", en: "Use active and passive voice and reported speech correctly." },
    { ar: "المقارنة بين الأشخاص والأماكن والأشياء باستخدام صيغ المقارنة والتفضيل", en: "Compare people, places, and things using comparative and superlative forms." },
    { ar: "استخدام صيغ الشرط المختلفة بدقة في سياق معين", en: "Use different conditional forms accurately in context." },
    { ar: "استخدم المصطلحات للتعبير عن الغاية في سياق مناسب", en: "Use language to express purpose in an appropriate context." },
    { ar: "اربط بين الكميات المختلفة مع الأشكال المختلفة للأسماء", en: "Relate different quantities with different noun forms." },
    { ar: "استخدم الجمل الشرطية الحقيقية وغير الحقيقية في سياق مناسب", en: "Use real and unreal conditional sentences in an appropriate context." },
  ],
  vocabularyTitle: { ar: "المصطلحات", en: "Vocabulary" },
  vocabularySubtitle: { ar: "بناء المفردات", en: "Vocabulary" },
  vocabularyItems: [
    { ar: "قم بتوسيع نطاق المفردات من خلال التعرف على الأسماء والأفعال والصفات والظروف والتراكيب وحروف الجر", en: "Expand vocabulary by recognizing nouns, verbs, adverbs, adjectives, collocations, and prepositions." },
    { ar: "ميّز بين الكلمات والعبارات والتعبيرات اللازمة في التفاعل الاجتماعي", en: "Distinguish words, phrases, and expressions needed for social interaction." },
    { ar: "استخدم المفردات التي تعلمتها حديثاً في المواقف اليومية", en: "Use newly learned vocabulary in everyday situations." },
  ],
  speakingTitle: { ar: "التحدث", en: "Speaking" },
  speakingSubtitle: { ar: "التعبير الشفهي", en: "Speaking" },
  speakingItems: [
    { ar: "إعادة صياغة المعلومات من نص منطوق", en: "Paraphrase information from a spoken text." },
    { ar: "المشاركة في المناقشات حول موضوع ذي صلة بدراستهم", en: "Participate in discussions on topics relevant to their studies." },
    { ar: "تقديم أسباب لشرح وتبرير آرائهم الشخصية", en: "Give reasons to explain and justify personal opinions." },
    { ar: "أنتج حديثًا واضحًا وواثقًا لمدة دقيقتين إلى ثلاث دقائق", en: "Produce a clear, confident 2–3 minute talk." },
    { ar: "استخدم النغمة والنبرة وتسلسل الكلمات وحروف العطف", en: "Use intonation, word order, and conjunctions effectively." },
    { ar: "إظهار معرفة المفردات والتعابير المستخدمة في المواقف اليومية", en: "Demonstrate knowledge of vocabulary and expressions for everyday situations." },
  ],
  listeningTitle: { ar: "الاستماع", en: "Listening" },
  listeningSubtitle: { ar: "مهارات الاستماع", en: "Listening" },
  listeningItems: [
    { ar: "تحديد الفكرة الأساسية/الأفكار الرئيسية للنص المنطوق", en: "Identify the main idea(s) in spoken text." },
    { ar: "إظهار المشاركة النقدية في أنشطة الاستماع", en: "Engage critically in listening activities." },
    { ar: "إظهار فهم أسئلة الفهم عند الاستماع إلى المحادثات الرسمية وغير الرسمية", en: "Show comprehension when listening to formal and informal conversations." },
    { ar: "تنظيم المعلومات باستخدام استراتيجيات مثل تدوين الملاحظات والتصنيف", en: "Organize information using strategies such as note-taking and classification." },
    { ar: "التعرف على استخدام النغمة والنبرة وتسلسل الكلمات", en: "Recognize use of intonation, stress, and word order." },
    { ar: "استنتاج معنى الكلمات أو العبارات غير المألوفة من السياق", en: "Infer meaning of unfamiliar words or phrases from context." },
    { ar: "اتبع التعليمات الشفهية من أجل تنفيذ مهمة/مهام", en: "Follow oral instructions to complete task(s)." },
  ],
  readingTitle: { ar: "القراءة", en: "Reading" },
  readingSubtitle: { ar: "مهارات القراءة", en: "Reading" },
  readingItems: [
    { ar: "حدد الموضوع والأفكار الرئيسية لنص معين يتكون من حوالي 300 كلمة", en: "Identify topic and main ideas in a text of around 300 words." },
    { ar: "قراءة نص من صفحة إلى صفحتين للحصول على تفاصيل محددة", en: "Read a one-to-two-page text to locate specific details." },
    { ar: "استخدم السياق لشرح الكلمات غير المألوفة أثناء القراءة", en: "Use context to work out unfamiliar words while reading." },
    { ar: "فهم كيفية جعل النصوص متماسكة من خلال استخدام أدوات الربط", en: "Understand how texts cohere through cohesive devices." },
    { ar: "استنتاج المعلومات باستخدام القرائن من النص والمعرفة الأساسية", en: "Infer information using clues from the text and background knowledge." },
  ],
  writingTitle: { ar: "الكتابة", en: "Writing" },
  writingSubtitle: { ar: "مهارات الكتابة", en: "Writing" },
  writingItems: [
    { ar: "استخدم حروف العطف للربط أو لكتابة جمل كاملة", en: "Use conjunctions to link ideas or write complete sentences." },
    { ar: "استخدم \"كلمات الترتيب الزمني\" لإكمال فقرة أو لإعادة ترتيب الجمل", en: "Use sequencing words to complete a paragraph or reorder sentences." },
    { ar: "قم بتنقيح الجمل والفقرات بما في ذلك علامات الترقيم والأخطاء الإملائية", en: "Revise sentences and paragraphs including punctuation and spelling." },
    { ar: "تنظيم الفقرات بشكل صحيح باستخدام جمل الموضوع والتفاصيل الداعمة", en: "Organize paragraphs using topic sentences and supporting details." },
    { ar: "اكتب أجزاء كتابية جيدة الشكل (حوالي 150 كلمة) من أنواع مختلفة", en: "Write well-formed pieces (~150 words) of different types." },
  ],
  integratedResultsTitle: { ar: "النتائج المدمجة المتعلقة بمهارات الدراسة العامة", en: "Integrated Outcomes Related to General Study Skills" },
  integratedResultsSubtitle: { ar: "مهارات الدراسة العامة", en: "General Study Skills Outcomes" },
  studySkillBlocks: [
    {
      title: { ar: "إدارة الوقت وتحمل المسؤولية", en: "Time management and responsibility" },
      icon: "clock",
      items: [
        { ar: "العمل في أزواج أو مجموعات والمشاركة وفقًا لذلك", en: "Work in pairs or groups and contribute accordingly." },
        { ar: "أحضر المواد المطلوبة (أقلام وأقلام رصاص ومجلدات) إلى الفصل", en: "Bring required materials (pens, pencils, folders) to class." },
        { ar: "العمل وفقًا للمواعيد النهائية المفروضة", en: "Work to imposed deadlines." },
        { ar: "أظهر الاحترام للمعلمين والآخرين وحقوقهم في الاختلاف", en: "Show respect for teachers and others and their right to disagree." },
        { ar: "استخدام مجموعة متنوعة من تقنيات التعلم", en: "Use a variety of learning techniques." },
        { ar: "أكمل الواجبات المنزلية في الوقت المحدد", en: "Complete homework on time." },
        { ar: "تنظيم حافظة أعمال شخصية والاحتفاظ بها", en: "Organize and maintain a personal portfolio." },
      ],
    },
    {
      title: { ar: "المهارات البحثية", en: "Research skills" },
      icon: "search",
      items: [
        { ar: "ضع قائمة بالأفكار الرئيسية لتوجيه البحث عن المعلومات", en: "List main ideas to guide information search." },
        { ar: "استخدم نظام المكتبة للعثور على مواد المكتبة واستعارتها", en: "Use the library system to find and borrow materials." },
        { ar: "استخدم قاموس إنجليزي-إنجليزي لتعلم اللغة", en: "Use an English–English dictionary for language learning." },
        { ar: "ابحث عن معلومات محددة باستخدام محركات البحث", en: "Search for specific information using search engines." },
        { ar: "لخص المعلومات وأعد صياغتها باستخدام كلماتك الخاصة", en: "Summarize and paraphrase information in your own words." },
      ],
    },
    {
      title: { ar: "تدوين الملاحظات", en: "Note taking" },
      icon: "fileText",
      items: [
        { ar: "استذكر المفاهيم الرئيسية وحددها", en: "Recall and identify key concepts." },
        { ar: "استخدام الاختصارات والرموز", en: "Use abbreviations and symbols." },
        { ar: "استخدم اللغة الإنجليزية بدلاً من العربية للملاحظات", en: "Use English rather than Arabic for notes." },
        { ar: "دعم النقاط الرئيسية بالتفاصيل الإضافية ذات الصلة", en: "Support main points with relevant additional details." },
        { ar: "تنظيم المعلومات لتمكين الرجوع إليها بسرعة", en: "Organize information for quick later reference." },
        { ar: "استخدم الملاحظات لإنشاء ملخص", en: "Use notes to produce a summary." },
        { ar: "إعادة إنتاج المعلومات الأساسية بكلماتك الخاصة", en: "Reproduce key information in your own words." },
      ],
    },
    {
      title: { ar: "تقديم العروض التقديمية", en: "Presentations" },
      icon: "presentation",
      items: [
        { ar: "وضع الخطوط العريضة للمفاهيم الرئيسية وتحديدها", en: "Outline and identify main concepts." },
        { ar: "الرد على أسئلة الجمهور", en: "Respond to audience questions." },
        { ar: "تحدث بصوت مسموع بوضوح وبخطى جيدة", en: "Speak audibly, clearly, and at an appropriate pace." },
        { ar: "تحقيق الهدف الرئيسي المتمثل في إعلام الجمهور", en: "Achieve the main purpose of informing the audience." },
        { ar: "الاستفادة من الوسائل السمعية/البصرية", en: "Use audio/visual aids." },
        { ar: "حافظ على بعض التواصل البصري مع الجمهور", en: "Maintain some eye contact with the audience." },
        { ar: "مراعاة القيود الزمنية في العروض التقديمية", en: "Observe time limits in presentations." },
        { ar: "تنظيم المعلومات وتقديمها بترتيب منطقي", en: "Organize and present information in a logical order." },
      ],
    },
  ],
  ctaTitle: { ar: "انتقل إلى مستوى متقدم في اللغة الإنجليزية", en: "Move to an advanced level in English" },
  ctaText: {
    ar: "المستوى الثاني يؤهلك للدراسات المتوسطة مع مهارات متقدمة في جميع جوانب اللغة",
    en: "Level 2 prepares you for intermediate studies with stronger skills across all language areas.",
  },
  ctaProgramOverviewLabel: { ar: "نظرة عامة على البرنامج", en: "Program overview" },
  ctaLevelOneLabel: { ar: "المستوى الأول", en: "Level 1" },
  ctaHomeLabel: { ar: "العودة للرئيسية", en: "Back to home" },
};

const TONES = ["blue", "green", "purple", "amber", "red", "teal"] as const;
const STUDY_ICONS = ["clock", "search", "fileText", "presentation"] as const;

function mergeBi(raw: unknown, fallback: Bi): Bi {
  if (!raw || typeof raw !== "object") return { ...fallback };
  const r = raw as Record<string, unknown>;
  return {
    ar: typeof r.ar === "string" ? r.ar : fallback.ar,
    en: typeof r.en === "string" ? r.en : fallback.en,
  };
}

function mergeBiArray(incoming: unknown, fallback: Bi[]): Bi[] {
  if (!Array.isArray(incoming)) return JSON.parse(JSON.stringify(fallback)) as Bi[];
  return fallback.map((fb, i) => mergeBi(incoming[i], fb));
}

/** Merges API `level2Details` with the seed so missing keys and array slots stay valid. */
export function mergeFoundationLevelTwoDetails(
  raw: unknown,
): FoundationLevelTwoDetailsData {
  const b = foundationLevelTwoDetailsSeed;
  if (!raw || typeof raw !== "object") {
    return JSON.parse(JSON.stringify(b)) as FoundationLevelTwoDetailsData;
  }
  const r = raw as Record<string, unknown>;

  const rawCourseGoalsCards = r.courseGoalsCards as unknown[] | undefined;
  const courseGoalsCards = Array.isArray(rawCourseGoalsCards)
    ? b.courseGoalsCards.map((fb, i) => {
        const c = rawCourseGoalsCards[i];
        if (!c || typeof c !== "object") return JSON.parse(JSON.stringify(fb));
        const o = c as Record<string, unknown>;
        const icon =
          o.icon === "graduation" || o.icon === "brain" ? o.icon : fb.icon;
        return {
          icon,
          title: mergeBi(o.title, fb.title),
          text: mergeBi(o.text, fb.text),
        };
      })
    : (JSON.parse(JSON.stringify(b.courseGoalsCards)) as typeof b.courseGoalsCards);

  const rawProgramGoalsItems = r.programGoalsItems as unknown[] | undefined;
  const programGoalsItems = Array.isArray(rawProgramGoalsItems)
    ? b.programGoalsItems.map((fb, i) => {
        const o = rawProgramGoalsItems[i];
        if (!o || typeof o !== "object") return JSON.parse(JSON.stringify(fb));
        const ob = o as Record<string, unknown>;
        const n =
          typeof ob.n === "number" && !Number.isNaN(ob.n) ? ob.n : fb.n;
        return {
          n,
          title: mergeBi(ob.title, fb.title),
          text: mergeBi(ob.text, fb.text),
        };
      })
    : (JSON.parse(JSON.stringify(b.programGoalsItems)) as typeof b.programGoalsItems);

  const rawLearningOutcomeTiles = r.learningOutcomeTiles as unknown[] | undefined;
  const learningOutcomeTiles = Array.isArray(rawLearningOutcomeTiles)
    ? b.learningOutcomeTiles.map((fb, i) => {
        const o = rawLearningOutcomeTiles[i];
        if (!o || typeof o !== "object") return JSON.parse(JSON.stringify(fb));
        const ob = o as Record<string, unknown>;
        const tone = TONES.includes(ob.tone as (typeof TONES)[number])
          ? (ob.tone as (typeof TONES)[number])
          : fb.tone;
        return {
          tone,
          title: mergeBi(ob.title, fb.title),
          badge: mergeBi(ob.badge, fb.badge),
        };
      })
    : (JSON.parse(JSON.stringify(b.learningOutcomeTiles)) as typeof b.learningOutcomeTiles);

  const rawStudySkillBlocks = r.studySkillBlocks as unknown[] | undefined;
  const studySkillBlocks = Array.isArray(rawStudySkillBlocks)
    ? b.studySkillBlocks.map((fb, i) => {
        const o = rawStudySkillBlocks[i];
        if (!o || typeof o !== "object") return JSON.parse(JSON.stringify(fb));
        const ob = o as Record<string, unknown>;
        const icon = STUDY_ICONS.includes(ob.icon as (typeof STUDY_ICONS)[number])
          ? (ob.icon as (typeof STUDY_ICONS)[number])
          : fb.icon;
        const items = Array.isArray(ob.items)
          ? fb.items.map((it, j) => mergeBi((ob.items as unknown[])[j], it))
          : (JSON.parse(JSON.stringify(fb.items)) as Bi[]);
        return {
          icon,
          title: mergeBi(ob.title, fb.title),
          items,
        };
      })
    : (JSON.parse(JSON.stringify(b.studySkillBlocks)) as typeof b.studySkillBlocks);

  return {
    heroTitle: mergeBi(r.heroTitle, b.heroTitle),
    heroSubtitle: mergeBi(r.heroSubtitle, b.heroSubtitle),
    heroTagline: mergeBi(r.heroTagline, b.heroTagline),
    courseDescriptionTitle: mergeBi(r.courseDescriptionTitle, b.courseDescriptionTitle),
    courseDescriptionParagraphs: mergeBiArray(
      r.courseDescriptionParagraphs,
      b.courseDescriptionParagraphs,
    ),
    courseDescriptionHighlight: mergeBiArray(
      r.courseDescriptionHighlight,
      b.courseDescriptionHighlight,
    ),
    courseGoalsTitle: mergeBi(r.courseGoalsTitle, b.courseGoalsTitle),
    courseGoalsSubtitle: mergeBi(r.courseGoalsSubtitle, b.courseGoalsSubtitle),
    courseGoalsCards,
    programGoalsTitle: mergeBi(r.programGoalsTitle, b.programGoalsTitle),
    programGoalsSubtitle: mergeBi(r.programGoalsSubtitle, b.programGoalsSubtitle),
    programGoalsIntro: mergeBi(r.programGoalsIntro, b.programGoalsIntro),
    programGoalsItems,
    learningOutcomesTitle: mergeBi(r.learningOutcomesTitle, b.learningOutcomesTitle),
    learningOutcomesSubtitle: mergeBi(
      r.learningOutcomesSubtitle,
      b.learningOutcomesSubtitle,
    ),
    learningOutcomeTiles,
    grammarTitle: mergeBi(r.grammarTitle, b.grammarTitle),
    grammarSubtitle: mergeBi(r.grammarSubtitle, b.grammarSubtitle),
    grammarItems: mergeBiArray(r.grammarItems, b.grammarItems),
    vocabularyTitle: mergeBi(r.vocabularyTitle, b.vocabularyTitle),
    vocabularySubtitle: mergeBi(r.vocabularySubtitle, b.vocabularySubtitle),
    vocabularyItems: mergeBiArray(r.vocabularyItems, b.vocabularyItems),
    speakingTitle: mergeBi(r.speakingTitle, b.speakingTitle),
    speakingSubtitle: mergeBi(r.speakingSubtitle, b.speakingSubtitle),
    speakingItems: mergeBiArray(r.speakingItems, b.speakingItems),
    listeningTitle: mergeBi(r.listeningTitle, b.listeningTitle),
    listeningSubtitle: mergeBi(r.listeningSubtitle, b.listeningSubtitle),
    listeningItems: mergeBiArray(r.listeningItems, b.listeningItems),
    readingTitle: mergeBi(r.readingTitle, b.readingTitle),
    readingSubtitle: mergeBi(r.readingSubtitle, b.readingSubtitle),
    readingItems: mergeBiArray(r.readingItems, b.readingItems),
    writingTitle: mergeBi(r.writingTitle, b.writingTitle),
    writingSubtitle: mergeBi(r.writingSubtitle, b.writingSubtitle),
    writingItems: mergeBiArray(r.writingItems, b.writingItems),
    integratedResultsTitle: mergeBi(r.integratedResultsTitle, b.integratedResultsTitle),
    integratedResultsSubtitle: mergeBi(
      r.integratedResultsSubtitle,
      b.integratedResultsSubtitle,
    ),
    studySkillBlocks,
    ctaTitle: mergeBi(r.ctaTitle, b.ctaTitle),
    ctaText: mergeBi(r.ctaText, b.ctaText),
    ctaProgramOverviewLabel: mergeBi(r.ctaProgramOverviewLabel, b.ctaProgramOverviewLabel),
    ctaLevelOneLabel: mergeBi(r.ctaLevelOneLabel, b.ctaLevelOneLabel),
    ctaHomeLabel: mergeBi(r.ctaHomeLabel, b.ctaHomeLabel),
  };
}
