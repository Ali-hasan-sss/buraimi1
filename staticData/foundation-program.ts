export type FoundationProgramData = {
  level1Courses: Array<{ code: string; titleAr: string; titleEn: string; credits: number }>;
  level2Courses: Array<{ code: string; titleAr: string; titleEn: string; credits: number }>;
  heroTitleAr: string;
  heroTitleEn: string;
  heroSubtitleAr: string;
  heroSubtitleEn: string;
  overviewTitleAr: string;
  overviewTitleEn: string;
  overviewText1Ar: string;
  overviewText1En: string;
  overviewText2Ar: string;
  overviewText2En: string;
  admissionTitleAr: string;
  admissionTitleEn: string;
  admissionTextAr: string;
  admissionTextEn: string;
  studyTitleAr: string;
  studyTitleEn: string;
  studyNoteAr: string;
  studyNoteEn: string;
  visionSectionTitleAr: string;
  visionSectionTitleEn: string;
  visionTitleAr: string;
  visionTitleEn: string;
  visionTextAr: string;
  visionTextEn: string;
  missionTitleAr: string;
  missionTitleEn: string;
  missionTextAr: string;
  missionTextEn: string;
  completionTitleAr: string;
  completionTitleEn: string;
  completionDescriptionAr: string;
  completionDescriptionEn: string;
  completionRequirementsTitleAr: string;
  completionRequirementsTitleEn: string;
  completionRequirementsAr: string[];
  completionRequirementsEn: string[];
  completionScheduleTitleAr: string;
  completionScheduleTitleEn: string;
  completionScheduleTextAr: string;
  completionScheduleTextEn: string;
  completionButtonLabelAr: string;
  completionButtonLabelEn: string;
  mathExamTitleAr: string;
  mathExamTitleEn: string;
  mathExamDescriptionAr: string;
  mathExamDescriptionEn: string;
  mathExamDurationAr: string;
  mathExamDurationEn: string;
  mathExamDurationValueAr: string;
  mathExamDurationValueEn: string;
  mathExamPassMarkAr: string;
  mathExamPassMarkEn: string;
  mathExamPassMarkValueAr: string;
  mathExamPassMarkValueEn: string;
  mathExamRetakeAr: string;
  mathExamRetakeEn: string;
  mathExamRetakeValueAr: string;
  mathExamRetakeValueEn: string;
  mathExamConditionsTitleAr: string;
  mathExamConditionsTitleEn: string;
  mathExamConditionsAr: string[];
  mathExamConditionsEn: string[];
  mathExamButtonLabelAr: string;
  mathExamButtonLabelEn: string;
  // Oxford Test Section
  oxfordTitleAr: string;
  oxfordTitleEn: string;
  oxfordDescriptionAr: string;
  oxfordDescriptionEn: string;
  oxfordCard1TitleAr: string;
  oxfordCard1TitleEn: string;
  oxfordCard1DescAr: string;
  oxfordCard1DescEn: string;
  oxfordCard2TitleAr: string;
  oxfordCard2TitleEn: string;
  oxfordCard2DescAr: string;
  oxfordCard2DescEn: string;
  oxfordCard3TitleAr: string;
  oxfordCard3TitleEn: string;
  oxfordCard3DescAr: string;
  oxfordCard3DescEn: string;
  oxfordFeaturesTitleAr: string;
  oxfordFeaturesTitleEn: string;
  oxfordFeature1Ar: string;
  oxfordFeature1En: string;
  oxfordFeature2Ar: string;
  oxfordFeature2En: string;
  oxfordFeature3Ar: string;
  oxfordFeature3En: string;
  oxfordFeature4Ar: string;
  oxfordFeature4En: string;
  oxfordButtonLabelAr: string;
  oxfordButtonLabelEn: string;
  // Practice Test Section
  practiceTestTitleAr: string;
  practiceTestTitleEn: string;
  practiceTestDescriptionAr: string;
  practiceTestDescriptionEn: string;
  practiceTestCard1TitleAr: string;
  practiceTestCard1TitleEn: string;
  practiceTestCard1DescAr: string;
  practiceTestCard1DescEn: string;
  practiceTestCard2TitleAr: string;
  practiceTestCard2TitleEn: string;
  practiceTestCard2DescAr: string;
  practiceTestCard2DescEn: string;
  practiceTestCard3TitleAr: string;
  practiceTestCard3TitleEn: string;
  practiceTestCard3DescAr: string;
  practiceTestCard3DescEn: string;
  practiceTestFeaturesTitleAr: string;
  practiceTestFeaturesTitleEn: string;
  practiceTestFeature1Ar: string;
  practiceTestFeature1En: string;
  practiceTestFeature2Ar: string;
  practiceTestFeature2En: string;
  practiceTestFeature3Ar: string;
  practiceTestFeature3En: string;
  practiceTestFeature4Ar: string;
  practiceTestFeature4En: string;
  practiceTestButtonLabelAr: string;
  practiceTestButtonLabelEn: string;
  // Faculty Section
  facultyTitleAr: string;
  facultyTitleEn: string;
  facultyDescriptionAr: string;
  facultyDescriptionEn: string;
  facultyCard1TitleAr: string;
  facultyCard1TitleEn: string;
  facultyCard1ValueAr: string;
  facultyCard1ValueEn: string;
  facultyCard2TitleAr: string;
  facultyCard2TitleEn: string;
  facultyCard2DescAr: string;
  facultyCard2DescEn: string;
  facultyCard3TitleAr: string;
  facultyCard3TitleEn: string;
  facultyCard3DescAr: string;
  facultyCard3DescEn: string;
  facultyCard1Icon: string;
  facultyCard2Icon: string;
  facultyCard3Icon: string;
  facultyButtonLabelAr: string;
  facultyButtonLabelEn: string;
  // CTA Section
  ctaTitleAr: string;
  ctaTitleEn: string;
  ctaDescriptionAr: string;
  ctaDescriptionEn: string;
  ctaButton1LabelAr: string;
  ctaButton1LabelEn: string;
  ctaButton2LabelAr: string;
  ctaButton2LabelEn: string;
  facultyPageDetails: FoundationFacultyPageData;
};

export type FoundationFacultyDepartment = {
  id: string;
  nameAr: string;
  nameEn: string;
  color: string;
  icon: "users" | "award" | "book-open" | "monitor";
};

export type FoundationFacultyMember = {
  id: string;
  departmentId: string;
  nameAr: string;
  nameEn: string;
  roleAr: string;
  roleEn: string;
  email: string;
  phone: string;
  cardTone: string;
  badgeAr?: string;
  badgeEn?: string;
};

export type FoundationFacultyPageData = {
  heroTitleAr: string;
  heroTitleEn: string;
  heroSubtitleAr: string;
  heroSubtitleEn: string;
  heroDescriptionAr: string;
  heroDescriptionEn: string;
  overviewTitleAr: string;
  overviewTitleEn: string;
  overviewTextAr: string;
  overviewTextEn: string;
  contactTitleAr: string;
  contactTitleEn: string;
  contactTextAr: string;
  contactTextEn: string;
  officeTitleAr: string;
  officeTitleEn: string;
  officeTextAr: string;
  officeTextEn: string;
  quickTitleAr: string;
  quickTitleEn: string;
  quickTextAr: string;
  quickTextEn: string;
  ctaTitleAr: string;
  ctaTitleEn: string;
  ctaTextAr: string;
  ctaTextEn: string;
  departments: FoundationFacultyDepartment[];
  members: FoundationFacultyMember[];
};

export const foundationFacultyPageSeed: FoundationFacultyPageData = {
  heroTitleAr: "أعضاء الهيئة التدريسية",
  heroTitleEn: "Faculty Members",
  heroSubtitleAr: "Foundation Program Faculty Members",
  heroSubtitleEn: "أعضاء الهيئة التدريسية للبرنامج التأسيسي",
  heroDescriptionAr: "نخبة من الأساتذة المؤهلين وذوي الخبرة في البرنامج التأسيسي",
  heroDescriptionEn: "A distinguished team of qualified and experienced faculty in the Foundation Program",
  overviewTitleAr: "نبذة عن الهيئة التدريسية",
  overviewTitleEn: "About the Faculty Team",
  overviewTextAr:
    "يتميز البرنامج التأسيسي العام بكلية البريمي الجامعية بهيئة تدريسية مؤهلة وذات خبرة عالية في مجالات التدريس والتوجيه الأكاديمي.",
  overviewTextEn:
    "The General Foundation Program at Al Buraimi University College is supported by highly qualified and experienced faculty in teaching and academic guidance.",
  contactTitleAr: "معلومات الاتصال",
  contactTitleEn: "Contact Information",
  contactTextAr: "للتواصل مع أعضاء الهيئة التدريسية أو للحصول على مزيد من المعلومات حول البرنامج التأسيسي، يرجى استخدام معلومات الاتصال المذكورة أعلاه.",
  contactTextEn: "To contact faculty members or request more information about the Foundation Program, please use the contact details listed above.",
  officeTitleAr: "مكتب البرنامج التأسيسي",
  officeTitleEn: "Foundation Program Office",
  officeTextAr: "الأحد - الخميس: 8:00 ص - 4:00 م",
  officeTextEn: "Sunday - Thursday: 8:00 AM - 4:00 PM",
  quickTitleAr: "التواصل السريع",
  quickTitleEn: "Quick Contact",
  quickTextAr: "اتصل بمدير البرنامج للاستفسارات العامة",
  quickTextEn: "Contact the program director for general inquiries",
  ctaTitleAr: "هل لديك أسئلة؟",
  ctaTitleEn: "Do You Have Questions?",
  ctaTextAr: "فريقنا من الأساتذة المؤهلين مستعد لمساعدتك في رحلتك الأكاديمية",
  ctaTextEn: "Our qualified faculty team is ready to support your academic journey",
  departments: [
    { id: "admin", nameAr: "الإدارة", nameEn: "Administration", color: "purple", icon: "award" },
    { id: "english", nameAr: "قسم اللغة الإنجليزية", nameEn: "English Department", color: "green", icon: "book-open" },
    { id: "it", nameAr: "قسم الحاسب الآلي", nameEn: "IT Department", color: "indigo", icon: "monitor" },
  ],
  members: [
    {
      id: "sumaya",
      departmentId: "admin",
      nameAr: "أ. سمية الكندي",
      nameEn: "Ms. Sumaya Al Kindi",
      roleAr: "محاضر - مدير البرنامج",
      roleEn: "Lecturer - Program Director",
      email: "salkindi@buc.edu.om",
      phone: "(+968) 25657684",
      cardTone: "blue",
      badgeAr: "",
      badgeEn: "",
    },
    {
      id: "samira",
      departmentId: "admin",
      nameAr: "أ. سميرة العريمي",
      nameEn: "Ms. Samira Al Araimi",
      roleAr: "محاضر - مساعدة مدير البرنامج",
      roleEn: "Lecturer - Assistant Program Director",
      email: "samira@buc.edu.om",
      phone: "(+968) 25657579",
      cardTone: "green",
      badgeAr: "",
      badgeEn: "",
    },
    {
      id: "zahran",
      departmentId: "english",
      nameAr: "د. زهران الصبحي",
      nameEn: "Dr. Zahran Al Subhi",
      roleAr: "أستاذ مساعد",
      roleEn: "Assistant Professor",
      email: "Zahran@buc.edu.om",
      phone: "(+968) 25657581",
      cardTone: "purple",
      badgeAr: "دكتور",
      badgeEn: "Doctor",
    },
    {
      id: "noura",
      departmentId: "english",
      nameAr: "أ. نورة العزاني",
      nameEn: "Ms. Noura Al Azani",
      roleAr: "محاضر",
      roleEn: "Lecturer",
      email: "noura@buc.edu.om",
      phone: "(+968) 25657586",
      cardTone: "amber",
      badgeAr: "",
      badgeEn: "",
    },
    {
      id: "elvis",
      departmentId: "english",
      nameAr: "أ. الفيس بوروز",
      nameEn: "Mr. Elvis Burrows",
      roleAr: "محاضر",
      roleEn: "Lecturer",
      email: "elvis@buc.edu.om",
      phone: "(+968) 25657591",
      cardTone: "indigo",
      badgeAr: "",
      badgeEn: "",
    },
    {
      id: "ilda",
      departmentId: "english",
      nameAr: "أ. إلدا درويش",
      nameEn: "Ms. Ilda Darwish",
      roleAr: "محاضر",
      roleEn: "Lecturer",
      email: "ilda@buc.edu.om",
      phone: "(+968) 25657582",
      cardTone: "teal",
      badgeAr: "",
      badgeEn: "",
    },
    {
      id: "asma",
      departmentId: "english",
      nameAr: "أ. اسماء البلوشي",
      nameEn: "Ms. Asma Al Balushi",
      roleAr: "محاضر",
      roleEn: "Lecturer",
      email: "aalbulushi@buc.edu.om",
      phone: "(+968) 25657585",
      cardTone: "red",
      badgeAr: "",
      badgeEn: "",
    },
    {
      id: "saghir",
      departmentId: "english",
      nameAr: "أ. صغير أحمد",
      nameEn: "Mr. Saghir Ahmed",
      roleAr: "محاضر",
      roleEn: "Lecturer",
      email: "Saghir@buc.edu.om",
      phone: "(+968) 25657597",
      cardTone: "pink",
      badgeAr: "",
      badgeEn: "",
    },
    {
      id: "salama",
      departmentId: "english",
      nameAr: "أ. سلامة النعيمي",
      nameEn: "Ms. Salama Al Nuaimi",
      roleAr: "محاضر",
      roleEn: "Lecturer",
      email: "salama@buc.edu.om",
      phone: "(+968) 25657589",
      cardTone: "cyan",
      badgeAr: "",
      badgeEn: "",
    },
    {
      id: "naveed",
      departmentId: "english",
      nameAr: "أ. نفيد خان",
      nameEn: "Mr. Naveed Khan",
      roleAr: "محاضر",
      roleEn: "Lecturer",
      email: "naveed@buc.edu.om",
      phone: "(+968) 25657594",
      cardTone: "violet",
      badgeAr: "",
      badgeEn: "",
    },
    {
      id: "abdulaziz",
      departmentId: "it",
      nameAr: "أ. عبدالعزيز الكعبي",
      nameEn: "Mr. Abdulaziz Al Kaabi",
      roleAr: "محاضر - IC3 والحوسبة",
      roleEn: "Lecturer - IC3 & Computing",
      email: "aalkaabi@buc.edu.om",
      phone: "(+968) 25657762",
      cardTone: "blue",
      badgeAr: "",
      badgeEn: "",
    },
    {
      id: "aysha",
      departmentId: "it",
      nameAr: "أ. عائشة المعمرية",
      nameEn: "Ms. Aysha Al Maamari",
      roleAr: "محاضر - IC3 والحوسبة",
      roleEn: "Lecturer - IC3 & Computing",
      email: "aalmaamari@buc.edu.om",
      phone: "(+968) 25657761",
      cardTone: "green",
      badgeAr: "",
      badgeEn: "",
    },
  ],
};

export const foundationProgramSeed: FoundationProgramData = {
  level1Courses: [
    { code: "ENGL1001", titleAr: "اللغة الإنجليزية - المستوى الأول", titleEn: "English Language - Level 1", credits: 12 },
    { code: "MATH1001", titleAr: "الرياضيات - المستوى الأول", titleEn: "Mathematics - Level 1", credits: 6 },
    { code: "IT1001", titleAr: "تكنولوجيا المعلومات - المستوى الأول", titleEn: "Information Technology - Level 1", credits: 3 },
    { code: "STUDY1001", titleAr: "المهارات الدراسية", titleEn: "Study Skills", credits: 3 },
  ],
  level2Courses: [
    { code: "ENGL1002", titleAr: "اللغة الإنجليزية - المستوى الثاني", titleEn: "English Language - Level 2", credits: 12 },
    { code: "MATH1002", titleAr: "الرياضيات - المستوى الثاني", titleEn: "Mathematics - Level 2", credits: 6 },
    { code: "IT1002", titleAr: "تكنولوجيا المعلومات - المستوى الثاني", titleEn: "Information Technology - Level 2", credits: 3 },
    { code: "STUDY1002", titleAr: "مهارات البحث الأكاديمي", titleEn: "Academic Research Skills", credits: 3 },
  ],
  heroTitleAr: "البرنامج التأسيسي العام",
  heroTitleEn: "General Foundation Program",
  heroSubtitleAr: "بوابتك نحو النجاح الأكاديمي في كلية البريمي الجامعية",
  heroSubtitleEn: "Your gateway to academic success at Al Buraimi University College",
  overviewTitleAr: "نبذة عن البرنامج التأسيسي",
  overviewTitleEn: "About the Foundation Program",
  overviewText1Ar:
    "يهدف البرنامج التأسيسي العام إلى إعداد الطلاب للدخول إلى المرحلة الجامعية بتزويدهم بالمهارات الأساسية اللازمة للنجاح الأكاديمي.",
  overviewText1En:
    "The General Foundation Program prepares students for university studies by equipping them with the essential skills for academic success.",
  overviewText2Ar:
    "صُممت المواد الدراسية وفقاً للمعايير الأكاديمية العُمانية للبرامج التأسيسية التي قدمتها الهيئة العُمانية للاعتماد الأكاديمي ووزارة التعليم العالي.",
  overviewText2En:
    "The curriculum is designed according to Omani academic standards for foundation programs set by the accreditation authority and the Ministry of Higher Education.",
  admissionTitleAr: "تعليمات قبول الطلبة",
  admissionTitleEn: "Admission Instructions",
  admissionTextAr:
    "تقوم إدارة القبول والتسجيل بتسجيل جميع الطلاب الراغبين في الالتحاق بكلية البريمي الجامعية وفق الإعلانات الدورية والمعايير المعتمدة.",
  admissionTextEn:
    "The Admissions and Registration Department enrolls all students who wish to join Al Buraimi University College according to periodic announcements and approved criteria.",
  studyTitleAr: "الخطة الدراسية",
  studyTitleEn: "Study Plan",
  studyNoteAr:
    "يجب على الطالب إكمال جميع متطلبات المستوى بنجاح قبل الانتقال إلى المستوى التالي أو البرنامج الأكاديمي.",
  studyNoteEn:
    "The student must complete all level requirements successfully before moving to the next level or to the academic program.",
  visionSectionTitleAr: "الرؤية والرسالة والأهداف",
  visionSectionTitleEn: "Vision, Mission and Goals",
  visionTitleAr: "الرؤية",
  visionTitleEn: "Vision",
  visionTextAr:
    "تتمثل رؤية كلية البريمي الجامعية في مواصلة طريق التميز في تطوير مركز متكامل قابل للتطبيق والعمل وملائم يلبي احتياجات جميع طلاب الكلية.",
  visionTextEn:
    "BUC vision is to continue excellence in developing an integrated and practical center that serves all students and supports the college mission.",
  missionTitleAr: "مهمة البرنامج التأسيسي العام",
  missionTitleEn: "General Foundation Program Mission",
  missionTextAr:
    "تزويد طلابنا بإتقان اللغة الإنجليزية ومهارات تكنولوجيا المعلومات الأساسية ومهارات الرياضيات لمتابعة دراساتهم الجامعية.",
  missionTextEn:
    "To equip our students with English proficiency, essential IT skills, and mathematics skills to pursue their university studies successfully.",
  completionTitleAr: "امتحان إكمال متطلبات البرنامج التأسيسي",
  completionTitleEn: "Foundation Program Completion Exam",
  completionDescriptionAr:
    "يجب على جميع الطلاب اجتياز امتحان إكمال متطلبات البرنامج التأسيسي بنجاح للانتقال إلى البرنامج الأكاديمي.",
  completionDescriptionEn:
    "All students must successfully pass the foundation program completion exam to move to the academic program.",
  completionRequirementsTitleAr: "متطلبات الاجتياز",
  completionRequirementsTitleEn: "Passing Requirements",
  completionRequirementsAr: [
    "إكمال جميع مقررات المستوى الثاني",
    "الحصول على معدل لا يقل عن 2.0",
    "اجتياز جميع الامتحانات النهائية",
  ],
  completionRequirementsEn: [
    "Complete all Level 2 courses",
    "Achieve a GPA of at least 2.0",
    "Pass all final examinations",
  ],
  completionScheduleTitleAr: "موعد الامتحان",
  completionScheduleTitleEn: "Exam Schedule",
  completionScheduleTextAr:
    "يعقد الامتحان في نهاية كل فصل دراسي وفقاً للجدول الأكاديمي المعتمد من الكلية.",
  completionScheduleTextEn:
    "The exam is held at the end of each semester according to the college-approved academic calendar.",
  completionButtonLabelAr: "عرض التفاصيل الكاملة للامتحان",
  completionButtonLabelEn: "View Full Exam Details",
  mathExamTitleAr: "امتحان إنهاء متطلب الرياضيات",
  mathExamTitleEn: "Mathematics Requirement Completion Exam",
  mathExamDescriptionAr: "يمكن للطلاب المتفوقين في الرياضيات إنهاء متطلب الرياضيات عن طريق اجتياز امتحان خاص معتمد من الكلية.",
  mathExamDescriptionEn: "High-achieving students in mathematics can complete the mathematics requirement by passing a special approved college exam.",
  mathExamDurationAr: "مدة الامتحان",
  mathExamDurationEn: "Exam Duration",
  mathExamDurationValueAr: "50 دقيقة",
  mathExamDurationValueEn: "50 minutes",
  mathExamPassMarkAr: "علامة النجاح",
  mathExamPassMarkEn: "Passing Score",
  mathExamPassMarkValueAr: "50/100",
  mathExamPassMarkValueEn: "50/100",
  mathExamRetakeAr: "فرص الإعادة",
  mathExamRetakeEn: "Retake Opportunities",
  mathExamRetakeValueAr: "فرصة ثانية",
  mathExamRetakeValueEn: "Second chance",
  mathExamConditionsTitleAr: "شروط التقدم للامتحان",
  mathExamConditionsTitleEn: "Exam Registration Conditions",
  mathExamConditionsAr: [
    "اجتياز مقرر الرياضيات التطبيقية أو البحتة بنجاح",
    "التقدم بطلب خلال الأسبوعين الأولين من الفصل الدراسي",
    "يمكن للطلاب الراسبين الحصول على فرصة أخرى لإعادة الامتحان",
  ],
  mathExamConditionsEn: [
    "Successfully pass Applied or Pure Mathematics course",
    "Submit application within the first two weeks of the semester",
    "Failing students can get another chance to retake the exam",
  ],
  mathExamButtonLabelAr: "عرض التفاصيل الكاملة للامتحان",
  mathExamButtonLabelEn: "View Full Exam Details",
  // Oxford Test Section
  oxfordTitleAr: "اختبار تحديد المستوى من أكسفورد",
  oxfordTitleEn: "Oxford Placement Test",
  oxfordDescriptionAr: "تستخدم الكلية اختبار أكسفورد المعتمد دولياً لتحديد مستوى الطلاب في اللغة الإنجليزية عند القبول. اختبار عبر الإنترنت بتقنية التكيف الحاسوبي لنتائج أكثر دقة.",
  oxfordDescriptionEn: "The college uses the internationally recognized Oxford test to determine students' English level upon admission. An online test with computer-adaptive technology for more accurate results.",
  oxfordCard1TitleAr: "100% عبر الإنترنت",
  oxfordCard1TitleEn: "100% Online",
  oxfordCard1DescAr: "على أي جهاز ومن أي مكان",
  oxfordCard1DescEn: "On any device from anywhere",
  oxfordCard2TitleAr: "نتائج فورية",
  oxfordCard2TitleEn: "Instant Results",
  oxfordCard2DescAr: "التصحيح التلقائي الفوري",
  oxfordCard2DescEn: "Automatic instant scoring",
  oxfordCard3TitleAr: "مستويات CEFR",
  oxfordCard3TitleEn: "CEFR Levels",
  oxfordCard3DescAr: "من Pre-A1 إلى C2",
  oxfordCard3DescEn: "From Pre-A1 to C2",
  oxfordFeaturesTitleAr: "مميزات الاختبار:",
  oxfordFeaturesTitleEn: "Test Features:",
  oxfordFeature1Ar: "تقنية التكيف الحاسوبي للدقة العالية",
  oxfordFeature1En: "Computer-adaptive technology for high accuracy",
  oxfordFeature2Ar: "تقارير شاملة ومفصلة",
  oxfordFeature2En: "Comprehensive detailed reports",
  oxfordFeature3Ar: "ساعد ملايين الطلاب حول العالم",
  oxfordFeature3En: "Helped millions of students worldwide",
  oxfordFeature4Ar: "معايير دولية معترف بها",
  oxfordFeature4En: "Internationally recognized standards",
  oxfordButtonLabelAr: "اعرف المزيد عن الاختبار",
  oxfordButtonLabelEn: "Learn More About the Test",
  // Practice Test Section
  practiceTestTitleAr: "امتحان تحديد المستوى - تدريبي",
  practiceTestTitleEn: "Practice Placement Test",
  practiceTestDescriptionAr: "توفر الكلية مجموعة من الامتحانات التدريبية المجانية لمساعدة الطلاب على الاستعداد بشكل أفضل لامتحانات تحديد المستوى الرسمية في الرياضيات والحاسب الآلي.",
  practiceTestDescriptionEn: "The college provides a set of free practice exams to help students better prepare for official placement exams in Mathematics and Computer Science.",
  practiceTestCard1TitleAr: "امتحانات الرياضيات",
  practiceTestCard1TitleEn: "Mathematics Exams",
  practiceTestCard1DescAr: "5 امتحانات تدريبية",
  practiceTestCard1DescEn: "5 practice exams",
  practiceTestCard2TitleAr: "امتحانات الحاسوب",
  practiceTestCard2TitleEn: "Computer Exams",
  practiceTestCard2DescAr: "2 امتحانات تدريبية",
  practiceTestCard2DescEn: "2 practice exams",
  practiceTestCard3TitleAr: "محوسب بالكامل",
  practiceTestCard3TitleEn: "Fully Computerized",
  practiceTestCard3DescAr: "50 دقيقة لكل امتحان",
  practiceTestCard3DescEn: "50 minutes per exam",
  practiceTestFeaturesTitleAr: "مميزات الامتحانات التدريبية:",
  practiceTestFeaturesTitleEn: "Practice Exam Features:",
  practiceTestFeature1Ar: "نماذج مطابقة للامتحانات الرسمية",
  practiceTestFeature1En: "Models matching official exams",
  practiceTestFeature2Ar: "نتائج فورية وتقارير تفصيلية",
  practiceTestFeature2En: "Instant results and detailed reports",
  practiceTestFeature3Ar: "متاحة مجاناً لجميع الطلاب",
  practiceTestFeature3En: "Available free for all students",
  practiceTestFeature4Ar: "إمكانية إعادة الامتحان عدة مرات",
  practiceTestFeature4En: "Ability to retake the exam multiple times",
  practiceTestButtonLabelAr: "عرض جميع الامتحانات التدريبية",
  practiceTestButtonLabelEn: "View All Practice Exams",
  // Faculty Section
  facultyTitleAr: "أعضاء الهيئة التدريسية",
  facultyTitleEn: "Faculty Members",
  facultyDescriptionAr: "يتميز البرنامج التأسيسي بهيئة تدريسية مؤهلة وذات خبرة عالية في مجالات التدريس والتوجيه الأكاديمي. يضم فريقنا 12 عضواً من الأساتذة والمحاضرين المتخصصين.",
  facultyDescriptionEn: "The Foundation Program is distinguished by a qualified teaching staff with extensive experience in teaching and academic guidance. Our team includes 12 specialized professors and lecturers.",
  facultyCard1TitleAr: "إجمالي الأعضاء",
  facultyCard1TitleEn: "Total Members",
  facultyCard1ValueAr: "12",
  facultyCard1ValueEn: "12",
  facultyCard2TitleAr: "قسم اللغة الإنجليزية",
  facultyCard2TitleEn: "English Department",
  facultyCard2DescAr: "أساتذة متخصصون في تعليم اللغة الإنجليزية",
  facultyCard2DescEn: "Specialized professors in English language teaching",
  facultyCard3TitleAr: "قسم تكنولوجيا المعلومات",
  facultyCard3TitleEn: "IT Department",
  facultyCard3DescAr: "متخصصون في تقنية المعلومات",
  facultyCard3DescEn: "Information technology specialists",
  facultyCard1Icon: "users",
  facultyCard2Icon: "book-open",
  facultyCard3Icon: "monitor",
  facultyButtonLabelAr: "تعرف على أعضاء هيئة التدريس",
  facultyButtonLabelEn: "Meet the Faculty Members",
  // CTA Section
  ctaTitleAr: "هل أنت مستعد للبدء في رحلتك الأكاديمية؟",
  ctaTitleEn: "Ready to Start Your Academic Journey?",
  ctaDescriptionAr: "انضم إلى البرنامج التأسيسي العام في كلية البريمي الجامعية وابدأ طريقك نحو النجاح الأكاديمي",
  ctaDescriptionEn: "Join the General Foundation Program at Al Buraimi University College and start your path to academic success",
  ctaButton1LabelAr: "تقدم الآن",
  ctaButton1LabelEn: "Apply Now",
  ctaButton2LabelAr: "تواصل معنا",
  ctaButton2LabelEn: "Contact Us",
  facultyPageDetails: foundationFacultyPageSeed,
};

type BilingualText = { ar: string; en: string };

export type FoundationLevelOneDetailsData = {
  heroTitle: BilingualText;
  heroSubtitle: BilingualText;
  heroDescription: BilingualText;
  courseDescriptionTitle: BilingualText;
  courseDescriptionText: BilingualText;
  courseGoalsTitle: BilingualText;
  courseGoalsItems: BilingualText[];
  programGoalsTitle: BilingualText;
  programGoalsIntro: BilingualText;
  programGoalsItems: BilingualText[];
  learningOutcomesTitle: BilingualText;
  learningOutcomesIntro: BilingualText;
  grammarTitle: BilingualText;
  grammarItems: BilingualText[];
  terminologyTitle: BilingualText;
  terminologyItems: BilingualText[];
  speakingTitle: BilingualText;
  speakingItems: BilingualText[];
  listeningTitle: BilingualText;
  listeningItems: BilingualText[];
  readingTitle: BilingualText;
  readingItems: BilingualText[];
  writingTitle: BilingualText;
  writingItems: BilingualText[];
  integratedResultsTitle: BilingualText;
  timeManagementTitle: BilingualText;
  timeManagementItems: BilingualText[];
  researchSkillsTitle: BilingualText;
  researchSkillsItems: BilingualText[];
  noteTakingTitle: BilingualText;
  noteTakingItems: BilingualText[];
  presentationsTitle: BilingualText;
  presentationsItems: BilingualText[];
  importantNoteTitle: BilingualText;
  importantNoteText: BilingualText;
  ctaTitle: BilingualText;
  ctaText: BilingualText;
  ctaBackLabel: BilingualText;
  ctaLevelTwoLabel: BilingualText;
};

export const foundationLevelOneDetailsSeed: FoundationLevelOneDetailsData = {
  heroTitle: { ar: "البرنامج التأسيسي - المستوى الأول", en: "Foundation Program - Level 1" },
  heroSubtitle: { ar: "Foundation Program - Level 1", en: "البرنامج التأسيسي - المستوى الأول" },
  heroDescription: {
    ar: "اللغة الإنجليزية المكثفة المتكاملة لبناء أساس قوي للنجاح الأكاديمي",
    en: "Integrated Intensive English for building a strong foundation for academic success",
  },
  courseDescriptionTitle: { ar: "وصف المادة", en: "Course Description" },
  courseDescriptionText: {
    ar: "اللغة الإنجليزية المكثفة المتكاملة - المستوى 1 هو منهج دراسي يركز على المتعلم مصمم لتطوير إجادة اللغة الإنجليزية بشكل عام في المستويين الأساسي والابتدائي من أجل إعداد الطلاب لتحديات الدراسات ما قبل المتوسطة في المستوى الثاني. ويتبع المنهج نهجاً متدرجاً مع مجموعة متنوعة من الأنشطة التواصلية المحفزة والقابلة للإدارة مما يمنح الطلاب إحساساً واضحاً وثابتاً بالتقدم ويساعدهم على تعزيز معرفتهم باللغة الإنجليزية. كما أنه يساعد الطلاب على بناء وتطوير مجموعة واسعة من المفردات عالية التردد ونطقها.",
    en: "Integrated Intensive English - Level 1 is a learner-centered course designed to develop students' general English proficiency at elementary and pre-intermediate levels in preparation for Level 2. The course follows a progressive approach with a range of motivating and manageable communicative activities that provide steady progress and strengthen language knowledge. It also helps students build and develop a broad range of high-frequency vocabulary and pronunciation.",
  },
  courseGoalsTitle: { ar: "الأهداف التي تتناولها هذه المقرر الدراسي", en: "Course Goals" },
  courseGoalsItems: [
    {
      ar: "لمساعدة الطلاب على اكتساب الكفاءة الكافية في اللغة الإنجليزية وإعدادهم لدراساتهم الجامعية في الأقسام الأكاديمية.",
      en: "Help students acquire sufficient English proficiency and prepare them for university studies in academic departments.",
    },
    {
      ar: "تهيئة الطلاب في المهارات الدراسية وأساليب التعلم من خلال تدوين الملاحظات والبحث عن المعلومات وجمعها من مصادر مختلفة والقيام بالمشاريع وكتابة الواجبات التي تساعدهم في دراستهم الأكاديمية.",
      en: "Prepare students in study skills and learning methods through note-taking, researching and collecting information from different sources, completing projects, and writing assignments that support their academic studies.",
    },
  ],
  programGoalsTitle: { ar: "أهداف البرنامج", en: "Program Goals" },
  programGoalsIntro: {
    ar: "بنهاية هذه المقرّر، سيتم تحقيق أهداف البرنامج التالية:",
    en: "By the end of this course, the following program goals are expected to be achieved:",
  },
  programGoalsItems: [
    {
      ar: "المشاركة في المناقشة حول موضوع ذي صلة بدراستهم من خلال طرح الأسئلة، والموافقة/عدم الموافقة، وطلب التوضيح، ومشاركة المعلومات، والتعبير عن الآراء وطلبها.",
      en: "Participate in discussions on topics relevant to their studies by asking questions, agreeing/disagreeing, requesting clarification, sharing information, and expressing and eliciting opinions.",
    },
    {
      ar: "إعادة صياغة المعلومات (شفهيًا أو كتابيًا) من نص مكتوب أو منطوق أو من بيانات معروضة بيانيًا.",
      en: "Paraphrase information orally or in writing from written or spoken texts, or from visually presented data.",
    },
    {
      ar: "إعداد وإلقاء حديث مدته دقيقتان على الأقل. استخدام مصادر المكتبة في إعداد الحديث، والتحدث بوضوح وثقة، والتواصل بالعينين، واستخدام لغة الجسد لدعم إيصال الأفكار والرد بثقة على الأسئلة.",
      en: "Prepare and deliver a talk of at least two minutes, using library resources, speaking clearly and confidently, maintaining eye contact, using body language effectively, and responding confidently to questions.",
    },
    {
      ar: "كتابة نصوص من 100 كلمة كحد أدنى، مع إظهار التحكم في التخطيط والتنظيم وعلامات الترقيم والتهجئة وتركيب الجمل والقواعد والمفردات.",
      en: "Write texts of at least 100 words, demonstrating control of planning, organization, punctuation, spelling, sentence structure, grammar, and vocabulary.",
    },
    {
      ar: "تدوين الملاحظات والرد على الأسئلة المتعلقة بالموضوع والأفكار الرئيسية والتفاصيل والآراء أو الحجج من نص استماع مطول (مثل المحاضرة أو بث الأخبار).",
      en: "Take notes and answer questions on topic, main ideas, details, opinions, or arguments from extended listening texts (e.g., lectures or news broadcasts).",
    },
    {
      ar: "اتبع التعليمات المنطوقة لتنفيذ مهمة ذات عدد من المراحل.",
      en: "Follow spoken instructions to complete a multi-stage task.",
    },
    {
      ar: "الاستماع إلى محادثة بين متحدثين أو أكثر والقدرة على الإجابة على الأسئلة المتعلقة بالسياق والعلاقة بين المتحدثين والتسجيل (على سبيل المثال رسمي أو غير رسمي).",
      en: "Listen to conversations between two or more speakers and answer questions related to context, speaker relationship, and register (e.g., formal or informal).",
    },
    {
      ar: "قراءة نص من صفحة إلى صفحتين وتحديد الفكرة (الأفكار) الرئيسية واستخراج معلومات محددة في فترة زمنية معينة.",
      en: "Read a one-to-two-page text, identify main idea(s), and extract specific information within a set time.",
    },
  ],
  learningOutcomesTitle: { ar: "مخرجات التعلم لدى طلاب المقرر الدراسي", en: "Course Learning Outcomes" },
  learningOutcomesIntro: {
    ar: "عند إكمال هذه المقرر الدراسي بنجاح، سيتمكن الطلاب من:",
    en: "Upon successful completion of this course, students will be able to:",
  },
  grammarTitle: { ar: "القواعد", en: "Grammar" },
  grammarItems: [
    { ar: "تطبيق صيغ الأزمنة المختلفة بشكل مناسب وصحيح، في سياق معين.", en: "Apply different tense forms appropriately and accurately in context." },
    { ar: "ربط الجمل باستخدام أشكال مختلفة من ضمائر الفاعل والمفعول به وضمائر الملكية أثناء كتابة النصوص والتقارير والمشاريع و/أو إلقاء المحاضرات أو الرد على الأسئلة.", en: "Link sentences using different forms of subject, object, and possessive pronouns in writing and speaking tasks." },
    { ar: "استخدم الأشكال المختلفة للأسماء المعدودة وغير المعدودة أثناء كتابة النصوص و/أو إلقاء المحاضرات أو الرد على الأسئلة.", en: "Use different forms of countable and uncountable nouns in written and spoken responses." },
    { ar: "استخدام صيغ الشرط المختلفة بدقة في سياق معين للتعبير عن القدرة وتقديم الطلبات والعروض وما إلى ذلك، أثناء التحدث والكتابة.", en: "Use conditional forms accurately in context to express ability, make requests/offers, and other functions in speaking and writing." },
    { ar: "استخدم حروف الجر للربط بين الكلمات والجمل في الكتابة الرسمية، مثل التقارير والرسائل الرسمية والمقالات والواجبات.", en: "Use prepositions to connect words and sentences in formal writing such as reports, formal emails, essays, and assignments." },
    { ar: "المقارنة بين الأشخاص والأماكن والأشياء والأفكار باستخدام صيغ المقارنة والتفضيل للصفات لطلب/إعطاء توضيح/معلومات و/أو التعبير/طلب الرأي.", en: "Compare people, places, objects, and ideas using comparative and superlative adjective forms for clarification, information sharing, and opinion exchange." },
  ],
  terminologyTitle: { ar: "المصطلحات", en: "Vocabulary" },
  terminologyItems: [
    { ar: "قم بتوسيع نطاق المفردات من خلال التعرف على الأسماء والأفعال والصفات والظروف والتراكيب وحروف الجر.", en: "Expand vocabulary range by recognizing nouns, verbs, adjectives, adverbs, collocations, and prepositions." },
    { ar: "ميّز بين الكلمات والعبارات والتعبيرات اللازمة في التفاعل الاجتماعي مثل دعوة الناس، واستخدام الهاتف، وما إلى ذلك.", en: "Differentiate words, phrases, and expressions required for social interaction such as inviting people, using the phone, and similar contexts." },
    { ar: "استخدم المفردات التي تعلمتها حديثاً في المواقف اليومية.", en: "Use newly learned vocabulary in daily-life situations." },
  ],
  speakingTitle: { ar: "التحدث", en: "Speaking" },
  speakingItems: [
    { ar: "إعادة صياغة المعلومات من نص منطوق.", en: "Paraphrase information from spoken text." },
    { ar: "المشاركة في المناقشات حول موضوع ذي صلة بدراستهم من خلال متابعة وصياغة الأسئلة والتعليمات والطلبات.", en: "Participate in discussions related to their studies by following and formulating questions, instructions, and requests." },
    { ar: "تقديم أسباب لشرح وتبرير آرائهم الشخصية.", en: "Provide reasons to explain and justify personal opinions." },
    { ar: "أنتج حديثًا واضحًا وواثقًا لمدة دقيقتين إلى ثلاث دقائق تقريبًا مع النطق الدقيق والطلاقة المناسبة، مع التواصل بالعينين واستخدام لغة الجسد.", en: "Produce a clear and confident 2-3 minute talk with accurate pronunciation, suitable fluency, eye contact, and effective body language." },
    { ar: "استخدم النغمة والنبرة وتسلسل الكلمات وحروف العطف في المحادثات.", en: "Use tone, intonation, word order, and conjunctions effectively in conversations." },
    { ar: "إظهار معرفة المفردات والتعابير المستخدمة في المواقف اليومية.", en: "Demonstrate knowledge of vocabulary and expressions used in daily situations." },
  ],
  listeningTitle: { ar: "الاستماع", en: "Listening" },
  listeningItems: [
    { ar: "تحديد الفكرة الأساسية/الأفكار الرئيسية للنص المنطوق.", en: "Identify the main idea(s) in spoken text." },
    { ar: "إظهار فهم أسئلة الفهم عند الاستماع إلى المحادثات الرسمية وغير الرسمية.", en: "Show comprehension when listening to formal and informal conversations." },
    { ar: "تنظيم المعلومات باستخدام استراتيجيات مثل تدوين الملاحظات والتصنيف.", en: "Organize information using strategies such as note-taking and classification." },
    { ar: "التعرف على استخدام النغمة والنبرة وتسلسل الكلمات وحروف العطف في المحادثات التي تساعد في الكشف عن المشاعر والمواقف والمعلومات المفيدة.", en: "Recognize tone, intonation, word order, and conjunctions in conversations to identify emotions, attitudes, and useful information." },
    { ar: "استنتاج معنى الكلمات أو العبارات غير المألوفة من سياق موضوع مألوف.", en: "Infer the meaning of unfamiliar words or expressions from familiar-context listening." },
    { ar: "اتبع التعليمات الشفهية من أجل تنفيذ مهمة/مهام.", en: "Follow oral instructions to complete a task or set of tasks." },
  ],
  readingTitle: { ar: "القراءة", en: "Reading" },
  readingItems: [
    { ar: "حدد الموضوع والأفكار الرئيسية لنص معين يتكون من حوالي 300 كلمة.", en: "Identify topic and main ideas in a text of around 300 words." },
    { ar: "اقرأ نصاً معيناً مكوناً من حوالي 300 كلمة، للحصول على تفاصيل محددة.", en: "Read a text of around 300 words to locate specific details." },
    { ar: "التعرف على معنى الكلمات الجديدة من السياق.", en: "Recognize the meaning of new words from context." },
    { ar: "استنتاج الأفكار غير المذكورة مباشرة في النص.", en: "Infer ideas not directly stated in the text." },
    { ar: "تحديد المرجعيات الأساسية (ضمائر الفاعل والمفعول به وصفات الملكية والضمائر).", en: "Identify key references (subject/object pronouns, possessive adjectives, and pronouns)." },
  ],
  writingTitle: { ar: "الكتابة", en: "Writing" },
  writingItems: [
    { ar: "التعرف على الاختلافات بين الأجزاء والجمل الكاملة.", en: "Identify differences between sentence fragments and complete sentences." },
    { ar: "قم بتنقيح الجمل والفقرات بما في ذلك علامات الترقيم والأخطاء الإملائية والنحوية.", en: "Edit and revise sentences and paragraphs including punctuation, spelling, and grammar." },
    { ar: "استخدم حروف العطف للربط بين الجمل.", en: "Use conjunctions to connect sentences." },
    { ar: "أعد ترتيب الكلمات المختلطة لتكوين جمل ذات معنى.", en: "Reorder jumbled words to form meaningful sentences." },
    { ar: "حدد الموضوع والفكرة المسيطرة في جمل موضوعية معينة.", en: "Identify topic and controlling idea in topic sentences." },
    { ar: "اكتب أجزاء كتابية جيدة التشكيل، من حوالي 100 كلمة.", en: "Write well-formed pieces of writing of around 100 words." },
  ],
  integratedResultsTitle: { ar: "النتائج المدمجة المتعلقة بمهارات الدراسة العامة", en: "Integrated Results Related to General Study Skills" },
  timeManagementTitle: { ar: "إدارة الوقت وتحمل المسؤولية", en: "Time Management and Responsibility" },
  timeManagementItems: [
    { ar: "العمل ضمن أزواج أو مجموعات وشارك وفقاً لذلك.", en: "Work in pairs or groups and contribute accordingly." },
    { ar: "اتبع سياسات الجامعة بشأن الحضور والالتزام بالمواعيد.", en: "Follow university policies on attendance and punctuality." },
    { ar: "أظهر الاحترام للمعلمين والآخرين وحقوقهم في الاختلاف في الرأي.", en: "Show respect for instructors and others, including their right to different opinions." },
    { ar: "استخدم مجموعة متنوعة من تقنيات الدراسة.", en: "Use a variety of study techniques." },
    { ar: "العمل وفقًا للمواعيد النهائية المفروضة.", en: "Work according to imposed deadlines." },
    { ar: "تنظيم نظام لتسجيل المفردات والحفاظ عليه (الاحتفاظ بسجل مفردات)", en: "Organize and maintain a vocabulary recording system (vocabulary log)." },
    { ar: "تنظيم حافظة أعمال شخصية ما والاحتفاظ بها.", en: "Organize and maintain a personal portfolio." },
  ],
  researchSkillsTitle: { ar: "المهارات البحثية", en: "Research Skills" },
  researchSkillsItems: [
    { ar: "استخرج المعلومات ذات الصلة من كتاب أو مقال باستخدام استراتيجيات القراءة.", en: "Extract relevant information from a book or article using reading strategies." },
    { ar: "استخدم نظام المكتبة للعثور على مواد المكتبة واستعارتها وإعادتها.", en: "Use the library system to locate, borrow, and return library materials." },
    { ar: "استخدم قاموس إنجليزي-إنجليزي لتعلم اللغة.", en: "Use an English-English dictionary for language learning." },
    { ar: "استخدام صفحة المحتويات والفهرس للوصول للمعلومات في كتاب.", en: "Use a contents page and an index to locate information in a book." },
    { ar: "ابحث عن معلومات محددة باستخدام محركات البحث على الإنترنت والمصادر الإلكترونية.", en: "Search for specific information using internet search engines and electronic sources." },
    { ar: "تصنيف المعلومات الجديدة وفرزها.", en: "Classify and sort new information." },
  ],
  noteTakingTitle: { ar: "تدوين الملاحظات", en: "Note Taking" },
  noteTakingItems: [
    { ar: "استذكر المفاهيم الرئيسية وحددها.", en: "Recall and identify key concepts." },
    { ar: "اعتماد استراتيجية تدوين الملاحظات (مثل رسم الخرائط الذهنية؛ نظام كورنيل، إلخ)", en: "Adopt a note-taking strategy (e.g., mind maps, Cornell system, etc.)." },
    { ar: "دعم النقاط الرئيسية بالتفاصيل الإضافية ذات الصلة.", en: "Support key points with relevant additional details." },
    { ar: "تنظيم المعلومات لتمكين الرجوع إليها بسرعة في وقت لاحق.", en: "Organize information for quick later reference." },
    { ar: "استخدم الملاحظات لإنشاء ملخص.", en: "Use notes to produce a summary." },
    { ar: "قم بإعادة إنتاج المعلومات الأساسية والتفاصيل الداعمة من الملاحظات بكلماتك الخاصة.", en: "Reproduce key information and supporting details from notes in your own words." },
  ],
  presentationsTitle: { ar: "تقديم العروض التقديمية", en: "Presentations" },
  presentationsItems: [
    { ar: "تنظيم المعلومات وتقديمها بترتيب منطقي وبسرعة مفهومة.", en: "Organize and present information in a logical order and understandable pace." },
    { ar: "الاستفادة من الوسائل السمعية/البصرية عند تقديم العروض الشفوية.", en: "Use audio/visual aids when giving oral presentations." },
    { ar: "الحفاظ على قدر من التواصل البصري مع الجمهور والتحدث بصوت مسموع واضح", en: "Maintain eye contact with the audience and speak in a clear audible voice." },
    { ar: "مراعاة القيود الزمنية في العروض التقديمية.", en: "Observe time constraints in presentations." },
    { ar: "الرد على أسئلة الجمهور.", en: "Respond to audience questions." },
  ],
  importantNoteTitle: { ar: "ملاحظة مهمة", en: "Important Note" },
  importantNoteText: {
    ar: "يجب على الطالب إكمال جميع متطلبات المستوى الأول بنجاح قبل الانتقال إلى المستوى الثاني. يشمل ذلك اجتياز جميع المقررات والامتحانات المطلوبة وتحقيق الحد الأدنى من المعدل المطلوب.",
    en: "Students must successfully complete all Level 1 requirements before moving to Level 2. This includes passing all required courses and examinations and meeting the minimum required GPA.",
  },
  ctaTitle: { ar: "هل أنت مستعد للبدء؟", en: "Are You Ready to Start?" },
  ctaText: {
    ar: "ابدأ رحلتك في المستوى الأول وضع أساساً قوياً لمستقبلك الأكاديمي",
    en: "Start your Level 1 journey and build a strong foundation for your academic future.",
  },
  ctaBackLabel: { ar: "العودة للبرنامج التأسيسي", en: "Back to Foundation Program" },
  ctaLevelTwoLabel: { ar: "المستوى الثاني - البرنامج التأسيسي", en: "Foundation Program - Level 2" },
};

export {
  foundationLevelTwoDetailsSeed,
  mergeFoundationLevelTwoDetails,
  type FoundationLevelTwoDetailsData,
} from "./foundation-level-two-details";

export type CompletionExamSectionIcon = "book" | "headphones" | "pencil" | "message";

export type FoundationCompletionExamDetailsData = {
  heroTitle: BilingualText;
  heroSubtitle: BilingualText;
  heroDescription: BilingualText;
  overviewTitle: BilingualText;
  overviewText: BilingualText;
  standardTitle: BilingualText;
  standardText: BilingualText;
  sectionsTitle: BilingualText;
  sections: Array<{
    id: number;
    title: BilingualText;
    subtitle: BilingualText;
    tasksLabel: BilingualText;
    tasksValue: BilingualText;
    marksLabel: BilingualText;
    marksValue: BilingualText;
    durationLabel?: BilingualText;
    durationValue?: BilingualText;
    description: BilingualText;
    color: "blue" | "green" | "purple" | "amber";
    icon?: CompletionExamSectionIcon;
  }>;
  writtenDurationTitle: BilingualText;
  writtenDurationText: BilingualText;
  successTitle: BilingualText;
  successCards: Array<{ title: BilingualText; value: BilingualText; text: BilingualText; color: "blue" | "green" | "purple" }>;
  successConditionsTitle: BilingualText;
  successConditionsText: BilingualText;
  conversionTitle: BilingualText;
  conversionRows: Array<{ rawScore: string; band: string; level: BilingualText; status: BilingualText }>;
  conversionNote: BilingualText;
  retakeTitle: BilingualText;
  retakeCards: Array<{ title: BilingualText; text: BilingualText }>;
  retakeImportantTitle: BilingualText;
  retakeImportantItems: BilingualText[];
  sampleTitle: BilingualText;
  sampleText: BilingualText;
  /** Relative URL e.g. `/api/uploads/...` for GET download via uploads route */
  sampleButtons: Array<{ label: BilingualText; color: "blue" | "green" | "purple" | "amber"; fileUrl?: string }>;
  tipsTitle: BilingualText;
  tips: Array<{ title: BilingualText; text: BilingualText }>;
  ctaTitle: BilingualText;
  ctaText: BilingualText;
  ctaLevel1: BilingualText;
  ctaLevel2: BilingualText;
  ctaBack: BilingualText;
};

export const foundationCompletionExamDetailsSeed: FoundationCompletionExamDetailsData = {
  heroTitle: { ar: "امتحان إكمال متطلبات البرنامج التأسيسي", en: "Foundation Program Completion Exam" },
  heroSubtitle: { ar: "Foundation Program Completion Exam", en: "امتحان إكمال متطلبات البرنامج التأسيسي" },
  heroDescription: { ar: "امتحان الخروج النهائي لتقييم كفاءة الطلاب في اللغة الإنجليزية", en: "Final exit exam to assess students' English proficiency" },
  overviewTitle: { ar: "نبذة عن الامتحان", en: "About the Exam" },
  overviewText: { ar: "يتم إجراء امتحان الخروج في نهاية المستوى الثاني لاختبار كفاءة اللغة الإنجليزية للطلاب الذين يكملون البرنامج التأسيسي. وقد تمت مقارنة امتحان الخروج مع امتحان IELTS.", en: "The exit exam is held at the end of Level 2 to assess English proficiency for students completing the foundation program. The exam is benchmarked against IELTS." },
  standardTitle: { ar: "معيار دولي", en: "International Standard" },
  standardText: { ar: "الامتحان مصمم وفقاً لمعايير IELTS الدولية لضمان جودة التقييم", en: "The exam is designed in line with IELTS international standards to ensure assessment quality." },
  sectionsTitle: { ar: "أقسام الامتحان", en: "Exam Sections" },
  sections: [
    { id: 1, icon: "book", title: { ar: "القراءة", en: "Reading" }, subtitle: { ar: "Reading", en: "القراءة" }, tasksLabel: { ar: "المهام", en: "Tasks" }, tasksValue: { ar: "مقطعان", en: "Two passages" }, marksLabel: { ar: "الدرجات", en: "Marks" }, marksValue: { ar: "20 درجة", en: "20 marks" }, description: { ar: "قراءة وفهم نصوص أكاديمية متنوعة والإجابة على أسئلة متعددة", en: "Read and understand varied academic texts and answer multiple questions." }, color: "blue" },
    { id: 2, icon: "headphones", title: { ar: "الاستماع", en: "Listening" }, subtitle: { ar: "Listening", en: "الاستماع" }, tasksLabel: { ar: "المهام", en: "Tasks" }, tasksValue: { ar: "مهمتان", en: "Two tasks" }, marksLabel: { ar: "الدرجات", en: "Marks" }, marksValue: { ar: "20 درجة", en: "20 marks" }, description: { ar: "الاستماع إلى محادثات ومحاضرات أكاديمية والإجابة على الأسئلة", en: "Listen to academic conversations and lectures and answer questions." }, color: "green" },
    { id: 3, icon: "pencil", title: { ar: "الكتابة", en: "Writing" }, subtitle: { ar: "Writing", en: "الكتابة" }, tasksLabel: { ar: "المهام", en: "Tasks" }, tasksValue: { ar: "مهمتان", en: "Two tasks" }, marksLabel: { ar: "الدرجات", en: "Marks" }, marksValue: { ar: "20 درجة", en: "20 marks" }, durationLabel: { ar: "المدة", en: "Duration" }, durationValue: { ar: "ساعتان", en: "Two hours" }, description: { ar: "كتابة مقالات وتقارير أكاديمية بمستوى متقدم", en: "Write advanced academic essays and reports." }, color: "purple" },
    { id: 4, icon: "message", title: { ar: "المحادثة", en: "Speaking" }, subtitle: { ar: "Speaking", en: "المحادثة" }, tasksLabel: { ar: "المهام", en: "Tasks" }, tasksValue: { ar: "تنسيق IELTS", en: "IELTS format" }, marksLabel: { ar: "الدرجات", en: "Marks" }, marksValue: { ar: "20 درجة", en: "20 marks" }, description: { ar: "مقابلة شفوية وفق معايير امتحان IELTS الدولي", en: "Oral interview based on IELTS international standards." }, color: "amber" },
  ],
  writtenDurationTitle: { ar: "إجمالي مدة الامتحان الكتابي", en: "Total Written Exam Duration" },
  writtenDurationText: { ar: "ساعتان (2 ساعة) لأقسام القراءة والاستماع والكتابة", en: "Two hours for Reading, Listening, and Writing sections." },
  successTitle: { ar: "معايير النجاح", en: "Success Criteria" },
  successCards: [
    { title: { ar: "الدرجة الإجمالية المطلوبة", en: "Required Overall Score" }, value: { ar: "النطاق 5", en: "Band 5" }, text: { ar: "يجب الحصول على مجموع إجمالي يعادل النطاق 5 في معايير IELTS", en: "Students must achieve an overall score equivalent to IELTS Band 5." }, color: "blue" },
    { title: { ar: "الحد الأدنى لكل مهارة", en: "Minimum Per Skill" }, value: { ar: "النطاق 4", en: "Band 4" }, text: { ar: "لا يجب أن تقل الدرجة عن النطاق 4 في أي من المهارات الأربع", en: "No skill score should be below Band 4 across the four skills." }, color: "green" },
    { title: { ar: "مدة الامتحان", en: "Exam Duration" }, value: { ar: "ساعتان", en: "Two Hours" }, text: { ar: "مدة الامتحان الكتابي (القراءة والاستماع والكتابة)", en: "Duration of written exam (Reading, Listening, Writing)." }, color: "purple" },
  ],
  successConditionsTitle: { ar: "شروط الانتقال للبرنامج الأكاديمي", en: "Conditions to Move to Academic Program" },
  successConditionsText: { ar: "يحتاج الطلاب إلى الحصول على درجة إجمالية في النطاق 5 مع درجة لا تقل عن النطاق 4 في كل مهارة من المهارات الأربع.", en: "Students need an overall Band 5 with at least Band 4 in each of the four skills." },
  conversionTitle: { ar: "جدول تحويل الدرجات", en: "Score Conversion Table" },
  conversionRows: [
    { rawScore: "90-100", band: "9", level: { ar: "خبير", en: "Expert" }, status: { ar: "مؤهل", en: "Eligible" } },
    { rawScore: "80-89", band: "8", level: { ar: "جيد جداً", en: "Very Good" }, status: { ar: "مؤهل", en: "Eligible" } },
    { rawScore: "70-79", band: "7", level: { ar: "جيد", en: "Good" }, status: { ar: "مؤهل", en: "Eligible" } },
    { rawScore: "60-69", band: "6", level: { ar: "كفؤ", en: "Competent" }, status: { ar: "مؤهل", en: "Eligible" } },
    { rawScore: "50-59", band: "5", level: { ar: "متوسط", en: "Moderate" }, status: { ar: "مؤهل", en: "Eligible" } },
    { rawScore: "40-49", band: "4", level: { ar: "محدود", en: "Limited" }, status: { ar: "حد أدنى", en: "Minimum" } },
    { rawScore: "0-39", band: "1-3", level: { ar: "غير كفؤ", en: "Non-Competent" }, status: { ar: "غير مؤهل", en: "Not Eligible" } },
  ],
  conversionNote: { ar: "ملاحظة: يتم احتساب الدرجة الإجمالية بأخذ متوسط درجات النطاق للمهارات الأربع.", en: "Note: The overall score is calculated as the average band across the four skills." },
  retakeTitle: { ar: "إعادة اختبار الخروج من البرنامج التأسيسي", en: "Foundation Program Exit Exam Retake" },
  retakeCards: [
    { title: { ar: "الفرصة الثانية", en: "Second Chance" }, text: { ar: "يتم منح الطلاب الذين لم يحصلوا على الدرجات المطلوبة فرصة ثانية لإعادة الامتحان", en: "Students who do not meet required scores are given a second chance to retake." } },
    { title: { ar: "موعد إعادة الامتحان", en: "Retake Schedule" }, text: { ar: "يُعقد امتحان الإعادة في الأسبوع الأول من الفصل الدراسي التالي", en: "Retake exam is held in the first week of the following semester." } },
    { title: { ar: "التسجيل لإعادة الامتحان", en: "Retake Registration" }, text: { ar: "يجب على الطلاب التسجيل لإعادة الامتحان خلال المدة المحددة من قبل الإدارة", en: "Students must register for retake within the period set by administration." } },
  ],
  retakeImportantTitle: { ar: "معلومات مهمة", en: "Important Information" },
  retakeImportantItems: [
    { ar: "يتم منح الطلاب الذين يفشلون في الحصول على الدرجات المطلوبة فرصة ثانية لإجراء امتحان إعادة الامتحان", en: "Students failing to meet required scores are granted a second retake opportunity." },
    { ar: "يُعقد امتحان الإعادة في الأسبوع الأول من الفصل الدراسي التالي", en: "Retake exam is conducted in the first week of the next semester." },
    { ar: "يجب على الطلاب التسجيل للإعادة خلال الفترة المحددة من قبل الإدارة", en: "Students must register within the administrative registration window." },
    { ar: "يمكن للطلاب إعادة الامتحان بالكامل أو إعادة المهارات التي لم يحققوا فيها الحد الأدنى المطلوب", en: "Students may retake the full exam or only skills where minimum threshold was not met." },
  ],
  sampleTitle: { ar: "نموذج الامتحان", en: "Exam Samples" },
  sampleText: { ar: "سيتم تحميل نموذج امتحان الخروج على موقع الكلية على الإنترنت للمساعدة في التحضير للامتحان.", en: "Exit exam sample papers will be uploaded on the college website to support exam preparation." },
  sampleButtons: [
    { label: { ar: "تحميل نموذج امتحان القراءة", en: "Download Reading Sample" }, color: "blue", fileUrl: "" },
    { label: { ar: "تحميل نموذج امتحان الاستماع", en: "Download Listening Sample" }, color: "green", fileUrl: "" },
    { label: { ar: "تحميل نموذج امتحان الكتابة", en: "Download Writing Sample" }, color: "purple", fileUrl: "" },
    { label: { ar: "تحميل دليل امتحان المحادثة", en: "Download Speaking Guide" }, color: "amber", fileUrl: "" },
  ],
  tipsTitle: { ar: "نصائح للتحضير للامتحان", en: "Exam Preparation Tips" },
  tips: [
    { title: { ar: "الممارسة المنتظمة", en: "Regular Practice" }, text: { ar: "مارس جميع المهارات الأربع بانتظام باستخدام النماذج التدريبية المتاحة", en: "Practice all four skills regularly using available mock materials." } },
    { title: { ar: "إدارة الوقت", en: "Time Management" }, text: { ar: "تدرب على إكمال الامتحانات ضمن الوقت المحدد لتحسين سرعة الأداء", en: "Train yourself to complete tasks within time limits to improve speed." } },
    { title: { ar: "التركيز على نقاط الضعف", en: "Focus on Weak Areas" }, text: { ar: "حدد المهارات التي تحتاج إلى تحسين وركز عليها بشكل خاص", en: "Identify weaker skills and focus on improving them deliberately." } },
    { title: { ar: "الاستعانة بالمدرسين", en: "Consult Instructors" }, text: { ar: "اطلب المساعدة من المدرسين واحضر جلسات المراجعة المتاحة", en: "Seek support from instructors and attend available review sessions." } },
  ],
  ctaTitle: { ar: "هل أنت مستعد للنجاح؟", en: "Are You Ready to Succeed?" },
  ctaText: { ar: "ابدأ التحضير الآن لامتحان إكمال متطلبات البرنامج التأسيسي وحقق أهدافك الأكاديمية", en: "Start preparing now for the foundation completion exam and achieve your academic goals." },
  ctaLevel1: { ar: "المستوى الأول", en: "Level 1" },
  ctaLevel2: { ar: "المستوى الثاني", en: "Level 2" },
  ctaBack: { ar: "العودة للبرنامج التأسيسي", en: "Back to Foundation Program" },
};
