import { IHeroSection, ISection, ICTASection } from "@/models/GeneralRequirements";

// Hero Section Data - Matches exact HTML gradient and content
export const heroSeed: IHeroSection = {
  titleAr: "وحدة المتطلبات العامة",
  titleEn: "General Requirements Unit",
  subtitleAr: "General Requirements Unit",
  subtitleEn: "وحدة المتطلبات العامة",
  descriptionAr: "تزويد الطلبة بالمهارات اللغوية والمعارف الثقافية والاجتماعية",
  descriptionEn: "Providing students with language skills and cultural and social knowledge",
  stats: [],
  isActive: true
};

// Courses Section Data
export const coursesSeed: ISection = {
  id: "courses",
  titleAr: "المواد المطروحة",
  titleEn: "Courses Offered",
  descriptionAr: "",
  descriptionEn: "",
  icon: "BookOpen",
  color: "indigo",
  isActive: true,
  order: 1,
  items: [
    {
      titleAr: "اللغة العربية",
      titleEn: "Arabic Language",
      creditsAr: "3 ساعات معتمدة",
      creditsEn: "3 Credit Hours",
      descriptionAr: "يهدف هذا المقرر إلى تطوير مهارات الطالب في اللغة العربية من خلال صقل مهارات القراءة والكتابة والتحدث والاستماع، مع التركيز على تحليل النصوص باستخدام مهارات التفكير النقدي.",
      descriptionEn: "This course aims to develop students' Arabic language skills by strengthening reading, writing, speaking, and listening, with a focus on analyzing texts using critical thinking skills.",
      icon: "BookOpen",
      color: "blue",
      topicsAr: [
        "مهارات القراءة والفهم",
        "التحدث والتواصل الشفهي",
        "الاستماع النقدي",
        "الكتابة الأكاديمية",
        "تحليل النصوص الأدبية"
      ],
      topicsEn: [
        "Reading and comprehension skills",
        "Speaking and oral communication",
        "Critical listening",
        "Academic writing",
        "Literary text analysis"
      ]
    },
    {
      titleAr: "الحضارة الإسلامية",
      titleEn: "Islamic Civilization",
      creditsAr: "3 ساعات معتمدة",
      creditsEn: "3 Credit Hours",
      descriptionAr: "يتناول هذا المقرر دراسة مراحل الحضارة الإسلامية وخصائصها ونظامها، مع تحليل التحولات التي طرأت عليها في مختلف العصور الإسلامية.",
      descriptionEn: "This course explores the stages, characteristics, and systems of Islamic civilization, analyzing the transformations it underwent across different historical eras.",
      icon: "Award",
      color: "green",
      topicsAr: [
        "مراحل الحضارة الإسلامية",
        "خصائص الحضارة الإسلامية",
        "النظام السياسي والاجتماعي",
        "الإنجازات العلمية والثقافية",
        "التحولات التاريخية"
      ],
      topicsEn: [
        "Stages of Islamic civilization",
        "Characteristics of Islamic civilization",
        "Political and social systems",
        "Scientific and cultural achievements",
        "Historical transformations"
      ]
    },
    {
      titleAr: "المجتمع العماني",
      titleEn: "Omani Society",
      creditsAr: "3 ساعات معتمدة",
      creditsEn: "3 Credit Hours",
      descriptionAr: "يركز هذا المقرر على دراسة خصائص المجتمع العماني ومقارنته مع المجتمعات الخليجية الأخرى، مع التركيز على العادات والتقاليد والتطورات الاجتماعية.",
      descriptionEn: "This course focuses on the characteristics of Omani society and compares it with other Gulf societies, emphasizing customs, traditions, and social developments.",
      icon: "Globe",
      color: "purple",
      topicsAr: [
        "خصائص المجتمع العماني",
        "العادات والتقاليد العمانية",
        "المقارنة مع المجتمعات الخليجية",
        "التطور الاجتماعي",
        "المشاركة المجتمعية"
      ],
      topicsEn: [
        "Characteristics of Omani society",
        "Omani customs and traditions",
        "Comparison with Gulf societies",
        "Social development",
        "Community engagement"
      ]
    }
  ]
};

// About Section Data - Matches exact HTML content
export const aboutSeed: ISection = {
  id: "about",
  titleAr: "نبذة عنا",
  titleEn: "About Us",
  descriptionAr: "في عام 2008 تم إنشاء وحدة المتطلبات العامة كوحدة قائمة بذاتها، وتعمل هذه الوحدة على تزويد الطلبة بالمهارات اللغوية التي يحتاجونها، والمعارف الثقافية والاجتماعية، مما يساعدهم على التواصل مع المجتمع ومع مختلف مصادر المعلومات المحلية والعالمية، بالإضافة إلى صقل مواهبهم وشخصياتهم بأنواع المعرفة الإنسانية مما يساهم في بناء الشخصية المتوازنة.",
  descriptionEn: "In 2008, the General Requirements Unit was established as an independent unit. This unit works to provide students with the language skills they need, as well as cultural and social knowledge, helping them communicate with society and various local and global information sources, in addition to refining their talents and personalities with types of human knowledge that contributes to building a balanced personality.",
  icon: "BookMarked",
  color: "blue",
  isActive: true,
  order: 0,
  stats: [
    { labelAr: "تأسست عام", labelEn: "Founded in", value: "2008" },
    { labelAr: "المواد المطروحة", labelEn: "Courses Offered", value: "3" },
    { labelAr: "أعضاء الهيئة التدريسية", labelEn: "Faculty Members", value: "4" }
  ]
};

// Vision Section Data - Matches exact HTML
export const visionSeed: ISection = {
  id: "vision",
  titleAr: "الرؤية",
  titleEn: "Vision",
  descriptionAr: "تزويد المجتمع بجيل قادر على التفاعل الإيجابي مع متطلبات الحياة المعاصرة في المجتمعات المحلية والعالمية.",
  descriptionEn: "Equipping society with a generation capable of positive interaction with contemporary life requirements in local and global communities.",
  icon: "Target",
  color: "green",
  isActive: true,
  order: 2
};

// Mission Section Data - Matches exact HTML
export const missionSeed: ISection = {
  id: "mission",
  titleAr: "الرسالة",
  titleEn: "Mission",
  descriptionAr: "تزويد الطالب بقاعدة علمية متينة من المهارات اللغوية والحياتية، التي لها دور في صقل وتشكيل سمعته بحيث يكون قادراً على التواصل مع المجتمعات المحلية والعالمية في ظل الثروة المعلوماتية والتقدم التكنولوجي، في تحقيق متطلبات الحياة اليومية سواء على مستوى الحياة العلمية أو العملية.",
  descriptionEn: "Providing students with a solid foundation of linguistic and life skills that play a role in refining and shaping their reputation so that they are able to communicate with local and global communities in light of the wealth of information and technological progress, in achieving the requirements of daily life, whether at the scientific or practical level.",
  icon: "Heart",
  color: "purple",
  isActive: true,
  order: 3
};

// Objectives Section Data - Matches exact HTML with 9 objectives
export const objectivesSeed: ISection = {
  id: "objectives",
  titleAr: "الأهداف",
  titleEn: "Objectives",
  descriptionAr: "",
  descriptionEn: "",
  icon: "Target",
  color: "amber",
  isActive: true,
  order: 4,
  listItemsAr: [
    "صقل مهارات اللغة العربية الأربع: القراءة/التحدث/الاستماع/الكتابة",
    "تعريف الطالب بخصائص المهارات الأربع للغة العربية",
    "تحليل النصوص المقروءة باستخدام مهارات التفكير النقدي - الاستنتاج / التمييز / التقييم",
    "تعريف الطالب بمراحل الحضارة الإسلامية وصمودها وخصائصها",
    "يميز الطالب بين خصائص الحضارة الإسلامية ونظامها",
    "وضح التحولات التي طرأت على الحضارة الإسلامية في مراحلها المختلفة",
    "تعريف الطالب بخصائص المجتمع العماني",
    "يقوم الطالب بمقارنة البيئة العمانية مع البيئات الخليجية الأخرى",
    "العمل الجماعي في خدمة المجتمع - محلياً/عالمياً"
  ],
  listItemsEn: [
    "Refining the four Arabic language skills: Reading/Speaking/Listening/Writing",
    "Introducing students to the characteristics of the four Arabic language skills",
    "Analyzing read texts using critical thinking skills - inference / distinction / evaluation",
    "Introducing students to the stages of Islamic civilization, its resilience and characteristics",
    "Students distinguish between the characteristics of Islamic civilization and its system",
    "Clarify the transformations that occurred in Islamic civilization in its different stages",
    "Introducing students to the characteristics of Omani society",
    "The student compares the Omani environment with other Gulf environments",
    "Teamwork in serving the community - locally/globally"
  ]
};

// Additional Features Section Data - Matches exact HTML
export const additionalSeed: ISection = {
  id: "additional",
  titleAr: "ما يميز وحدة المتطلبات العامة",
  titleEn: "What Makes General Requirements Unit Special",
  descriptionAr: "",
  descriptionEn: "",
  icon: "CircleCheckBig",
  color: "blue",
  isActive: true,
  order: 6,
  listItemsAr: [
    "تأسيس قوي منذ 2008 - خبرة تزيد عن 15 عاماً في تزويد الطلبة بالمهارات الأساسية",
    "مناهج متكاملة - تغطي اللغة العربية والحضارة الإسلامية والمجتمع العماني",
    "هيئة تدريسية متميزة - أساتذة متخصصون ذوو خبرة في مجالاتهم",
    "بناء شخصية متوازنة - صقل المواهب والشخصيات بأنواع المعرفة الإنسانية"
  ],
  listItemsEn: [
    "Strong foundation since 2008 - Over 15 years of experience in providing students with essential skills",
    "Comprehensive curricula - Covering Arabic Language, Islamic Civilization, and Omani Society",
    "Distinguished faculty - Specialized professors with expertise in their fields",
    "Building a balanced personality - Refining talents and personalities with types of human knowledge"
  ]
};

// Faculty Section Data - Matches exact HTML with detailed member info
export const facultySeed: ISection = {
  id: "faculty",
  titleAr: "أعضاء هيئة التدريس",
  titleEn: "Faculty Members",
  descriptionAr: "",
  descriptionEn: "",
  icon: "Users",
  color: "teal",
  isActive: true,
  order: 5,
  facultyMembers: [
    {
      nameAr: "الفاضلة بدرية الهنائي",
      nameEn: "Ms. Badriya Al Hinai",
      positionAr: "رئيس القسم",
      positionEn: "Head of Department",
      isHead: true,
      image: "/_assets/faculty/badriya-al-hinai.png",
      email: "badriya@buc.edu.om",
      phone: "+968-25657521",
      hasDoctorate: false,
      color: "blue"
    },
    {
      nameAr: "الفاضل محمد المراد",
      nameEn: "Mr. Mohammed Al Murad",
      positionAr: "محاضر",
      positionEn: "Lecturer",
      isHead: false,
      image: "/_assets/faculty/mohammed-al-murad.png",
      email: "mamoon@buc.edu.om",
      phone: "+968-25657522",
      hasDoctorate: false,
      color: "green"
    },
    {
      nameAr: "الفاضلة سماح المعمري",
      nameEn: "Ms. Samah Al Maamari",
      positionAr: "محاضر",
      positionEn: "Lecturer",
      isHead: false,
      image: "/_assets/faculty/samah-al-maamari.png",
      email: "samah@buc.edu.om",
      phone: "+968-25657526",
      hasDoctorate: false,
      color: "purple"
    },
    {
      nameAr: "الدكتورة منار المصري",
      nameEn: "Dr. Manar Al Masri",
      positionAr: "دكتور / أستاذ مساعد",
      positionEn: "Doctor / Assistant Professor",
      isHead: false,
      image: "/_assets/faculty/manar-al-masri.png",
      email: "manar@buc.edu.om",
      phone: "+968-25657523",
      hasDoctorate: true,
      color: "amber"
    }
  ]
};

// CTA Section Data - With 3 buttons as in HTML
export const ctaSeed: ICTASection & { buttons: { textAr: string; textEn: string; link: string; variant: string }[] } = {
  titleAr: "هل لديك استفسارات؟",
  titleEn: "Have Questions?",
  descriptionAr: "تواصل معنا للحصول على مزيد من المعلومات حول وحدة المتطلبات العامة",
  descriptionEn: "Contact us for more information about the General Requirements Unit",
  buttonTextAr: "دليل التواصل",
  buttonTextEn: "Contact Directory",
  buttonLink: "/contact-directory",
  isActive: true,
  buttons: [
    { textAr: "دليل التواصل", textEn: "Contact Directory", link: "/contact-directory", variant: "primary" },
    { textAr: "الشؤون الأكاديمية", textEn: "Academic Affairs", link: "/academic-affairs", variant: "secondary" },
    { textAr: "العودة للرئيسية", textEn: "Back to Home", link: "/", variant: "outline" }
  ]
};

// All sections combined for seeding
export const generalRequirementsSeed = {
  hero: heroSeed,
  sections: [
    aboutSeed,
    coursesSeed,
    visionSeed,
    missionSeed,
    objectivesSeed,
    additionalSeed,
    facultySeed
  ],
  cta: ctaSeed
};
