/** تفاصيل برنامج الماجستير في دراسات اللغة الإنجليزية — للزرع وصفحة الدراسات العليا */

const sharedCore = [
  { code: "ENGL510", titleAr: "منهجية البحث", titleEn: "Research Methodology", credits: 3 },
  { code: "ENGL511", titleAr: "موضوعات في اللغويات", titleEn: "Topics in Linguistics", credits: 3 },
  { code: "ENGL512", titleAr: "موضوعات في الأدب الإنجليزي", titleEn: "Topics in English Literature", credits: 3 },
];

const literatureMajor = [
  { code: "ENGL514", titleAr: "الاتجاهات الحديثة في الدراما الإنجليزية", titleEn: "Modern trends in English Drama", credits: 3 },
  { code: "ENGL516", titleAr: "دراسات في الرواية الإنجليزية الحديثة", titleEn: "Studies in modern English Novel", credits: 3 },
  { code: "ENGL518", titleAr: "قراءات في الشعر الإنجليزي الحديث", titleEn: "Readings in Modern English Poetry", credits: 3 },
  { code: "ENGL520", titleAr: "حلقة بحث في القضايا الأدبية", titleEn: "Seminar in Research on Literary Issues", credits: 3 },
];

const literatureElective = [
  { code: "ENGL522", titleAr: "أدب ما بعد الاستعمار", titleEn: "Postcolonial Literature", credits: 3 },
  { code: "ENGL524", titleAr: "الأدب الرقمي", titleEn: "Digital Literature", credits: 3 },
  { code: "ENGL526", titleAr: "حلقة بحث في النظرية النقدية", titleEn: "Seminar in Critical Theory", credits: 3 },
  { code: "ENGL528", titleAr: "موضوعات خاصة في الدراسات الثقافية", titleEn: "Special Topics in Cultural Studies", credits: 3 },
  { code: "ENGL530", titleAr: "الأدب المقارن", titleEn: "Comparative Literature", credits: 3 },
];

const linguisticsMajor = [
  { code: "ENGL513", titleAr: "دراسات متقدمة في علم الصرف", titleEn: "Advanced Studies in Morphology", credits: 3 },
  { code: "ENGL515", titleAr: "دراسات متقدمة في علم التداولية", titleEn: "Advanced Studies in Pragmatics", credits: 3 },
  { code: "ENGL517", titleAr: "دراسات متقدمة في تحليل الخطاب", titleEn: "Advanced Studies in Discourse Analysis", credits: 3 },
  { code: "ENGL519", titleAr: "حلقة بحث في القضايا اللغوية", titleEn: "Seminar in Research on Linguistic Issues", credits: 3 },
];

const linguisticsElective = [
  { code: "ENGL521", titleAr: "دراسات متقدمة في علم النحو", titleEn: "Advanced Studies in Syntax", credits: 3 },
  { code: "ENGL523", titleAr: "دراسات متقدمة في علم الدلالة", titleEn: "Advanced Studies in Semantics", credits: 3 },
  { code: "ENGL525", titleAr: "موضوعات في اللغويات التطبيقية", titleEn: "Topics in Applied Linguistics", credits: 3 },
  { code: "ENGL527", titleAr: "اللغويات الحاسوبية", titleEn: "Corpus Linguistics", credits: 3 },
  { code: "ENGL529", titleAr: "دراسات متقدمة في الصوتيات والفونولوجيا", titleEn: "Advanced Studies in Phonetics and Phonology", credits: 3 },
  { code: "ENGL531", titleAr: "موضوعات في اللغويات الاجتماعية", titleEn: "Topics in Sociolinguistics", credits: 3 },
];

const literatureThesis = [
  { code: "ENGL532", titleAr: "رسالة الماجستير", titleEn: "Master Thesis", credits: 3, times: 1 },
];

const linguisticsThesis = [
  { code: "ENGL533", titleAr: "رسالة الماجستير", titleEn: "Master Thesis", credits: 6, times: 1 },
];

export const englishMastersDetails = {
  layout: "english-masters" as const,

  programInfo: {
    titleAr: "برنامج الماجستير في دراسات اللغة الإنجليزية",
    titleEn: "Master in English Language Studies",
    affiliationAr: "جامعة ولاية كاليفورنيا، نورثريدج (CSUN)",
    affiliationEn: "California State University, Northridge",
    durationAr: "2 سنة دراسية",
    durationEn: "2 academic years",
    totalCreditsAr: "33 ساعة معتمدة",
    totalCreditsEn: "33 credit hours",
    courseCreditsAr: "130 ريال",
    courseCreditsEn: "130 OMR",
    thesisCreditsAr: "4,290 ريال",
    thesisCreditsEn: "4,290 OMR",
    quickStat2LabelAr: "إجمالي الساعات",
    quickStat2LabelEn: "Total credit hours",
    quickStat3LabelAr: "رسوم الساعة الواحدة",
    quickStat3LabelEn: "Per credit hour",
    quickStat4LabelAr: "إجمالي الرسوم",
    quickStat4LabelEn: "Total tuition",
    aboutLeadAr: "نبذة عن البرنامج",
    aboutLeadEn: "About the program",
    aboutTextAr:
      "برنامج متميز بالتعاون مع جامعة ولاية كاليفورنيا، نورثريدج (CSUN) يقدم تخصصين رئيسيين: تخصص الأدب وتخصص اللغويات.",
    aboutTextEn:
      "A distinguished program in partnership with California State University, Northridge (CSUN), offering two main tracks: Literature and Linguistics.",
    studyModeAr: "مدرس اللغة الإنجليزية كلغة ثانية أو أجنبية في مختلف المراحل التعليمية، محلياً ودولياً",
    studyModeEn:
      "English as a second or foreign language teacher across educational levels, locally and internationally",
    studyModeLabelAr: "الفرص الوظيفية",
    studyModeLabelEn: "Career opportunities",
    programDimensionsTextAr: "تخصص الأدب وتخصص اللغويات",
    programDimensionsTextEn: "Literature track and Linguistics track",
    programDimensionsLabelAr: "الخطة الدراسية للتخصصات",
    programDimensionsLabelEn: "Study plan tracks",
    graduationTitleAr: "الرسوم الدراسية",
    graduationTitleEn: "Tuition fees",
    graduationTextAr:
      "رسوم الساعة الواحدة: 130 ريال عماني لكل ساعة معتمدة\n\nعدد الساعات المعتمدة: 33 ساعة معتمدة\n\nإجمالي الرسوم الدراسية 4,290 ريال عماني",
    graduationTextEn:
      "Per credit hour: 130 OMR per credit hour\n\nProgram credit hours: 33 credit hours\n\nTotal tuition fees: 4,290 OMR",
    creditsTitleAr: "الارتباط الأكاديمي",
    creditsTitleEn: "Academic affiliation",
    creditsTextAr: "جامعة ولاية كاليفورنيا، نورثريدج (CSUN)",
    creditsTextEn: "California State University, Northridge",
    creditsBullet1Ar: "",
    creditsBullet2Ar: "",
    creditsBullet1En: "",
    creditsBullet2En: "",
    tracksTitleAr: "",
    tracksTitleEn: "",
    trackPublicAr: "",
    trackPrivateAr: "",
    trackPublicEn: "",
    trackPrivateEn: "",
    tabPublicAr: "تخصص الأدب (Literature Track)",
    tabPublicEn: "Literature Track",
    tabPrivateAr: "تخصص اللغويات (Linguistics Track)",
    tabPrivateEn: "Linguistics Track",
    objectivesSubtitleAr:
      "يجب على الطلاب الذين أكملوا برنامج الماجستير بنجاح أن يكونوا قادرين على:",
    objectivesSubtitleEn:
      "Students who successfully complete the master's program should be able to:",
    outcomesSubtitleAr: "مخرجات التعلّم المستهدفة",
    outcomesSubtitleEn: "Intended learning outcomes",
    studyPlanTitleAr: "الخطة الدراسية",
    studyPlanTitleEn: "Study plan",
    section1TitleAr: "متطلبات إجبارية للتخصصين (9 ساعات معتمدة)",
    section1TitleEn: "Mandatory requirements for both tracks (9 credit hours)",
    section1NoteAr:
      "ملاحظة: هذه المقررات إلزامية لجميع الطلاب في كلا التخصصين (الأدب واللغويات)",
    section1NoteEn:
      "Note: These courses are mandatory for all students in both tracks (Literature and Linguistics).",
    section2TitleAr: "مقررات إجبارية للتخصص (12 ساعة معتمدة)",
    section2TitleEn: "Track mandatory courses (12 credit hours)",
    section3TitleAr: "مقررات اختيارية (6 ساعات معتمدة)",
    section3TitleEn: "Elective courses (6 credit hours)",
    section3NoteAr:
      "ملاحظة: يختار الطالب مقررين (6 ساعات معتمدة) من المقررات التالية:",
    section3NoteEn: "Note: Students choose two courses (6 credit hours) from the following:",
    section4TitleAr: "رسالة الماجستير",
    section4TitleEn: "Master's thesis",
    section4TitleLiteratureAr: "رسالة الماجستير (3 ساعات معتمدة)",
    section4TitleLiteratureEn: "Master's thesis (3 credit hours)",
    section4TitleLinguisticsAr: "رسالة الماجستير (6 ساعات معتمدة)",
    section4TitleLinguisticsEn: "Master's thesis (6 credit hours)",
  },

  objectives: {
    ar: [
      "اكتساب مهارات البحث، بما في ذلك الاستخدام المتقن لقواعد البيانات الأكاديمية والمكتبات والمصادر الأخرى لدعم الاستفسارات العلمية الفردية والكتابة الأكاديمية",
      "إظهار معرفة عميقة للتقييم النقدي وتفسير مختلف الأنواع والأساليب والحركات والنصوص",
      "إظهار معرفة عميقة للتقييم النقدي وتفسير الظواهر اللغوية المتنوعة، بما في ذلك التراكيب والمعنى والاستخدام",
      "تطبيق مهارات متقدمة في التحليل الأدبي، مما يمكّن الطلاب من التعامل النقدي مع مختلف الأنواع والفترات والسياقات الثقافية المتنوعة، وإنتاج تفسيرات متطورة تسهم في الخطاب الجاري في الدراسات الأدبية",
      "تطوير الكفاءة المتقدمة في التحليل اللغوي، بما في ذلك القدرة على تطبيق أطر ومنهجيات نظرية متنوعة لتحليل تراكيب اللغة والمعنى والاستخدام، مما يعزز قدرة الطالب على المساهمة برؤى أصيلة في هذا المجال",
    ],
    en: [
      "Acquire research skills, including proficient use of academic databases, libraries, and other sources to support individual scholarly inquiry and academic writing",
      "Demonstrate deep knowledge of critical evaluation and interpretation of diverse genres, styles, movements, and texts",
      "Demonstrate deep knowledge of critical evaluation and interpretation of diverse linguistic phenomena, including structure, meaning, and use",
      "Apply advanced skills in literary analysis, enabling critical engagement with diverse genres, periods, and cultural contexts and producing sophisticated interpretations that contribute to ongoing discourse in literary studies",
      "Develop advanced competence in linguistic analysis, including applying diverse theoretical frameworks and methodologies to analyze language structure, meaning, and use, enhancing the student's ability to contribute original insights in the field",
    ],
  },

  learningOutcomes: {
    ar: [
      "سيُظهر الخريجون مهارات بحثية متقدمة، باستخدام قواعد البيانات الأكاديمية والمكتبات والمصادر المتنوعة، لإجراء استفسارات علمية بشكل مستقل وإنتاج كتابات أكاديمية عالية الجودة",
      "عند الانتهاء من البرنامج، سيُظهر الطلاب عند التخرج معرفة متعمقة وقدرات تقييمية نقدية لتحليل وتفسير مختلف الأنواع والأساليب والحركات والنصوص الأدبية",
      "سيُظهر الخريجون معرفة عميقة في اللغويات، مما يمكنهم من التقييم النقدي وتفسير الظواهر اللغوية المتنوعة، بما في ذلك التراكيب والمعنى والاستخدام",
      "سوف يطبق الطلاب مهارات متقدمة في التحليل الأدبي، ويتعاملون بشكل نقدي مع مختلف الأنواع والفترات والسياقات الثقافية. كما سيقدمون تفسيرات متطورة تسهم بشكل كبير في الخطاب الجاري في الدراسات الأدبية",
      "عند الانتهاء من البرنامج، سيُظهر الطلاب كفاءة متقدمة في التحليل اللغوي. وسوف يطبقون أطرًا ومنهجيات نظرية متنوعة لتحليل البنى اللغوية والمعنى والاستخدام، ويساهمون برؤى أصلية في هذا المجال",
      "سيطور الخريجون الكفاءة في إجراء البحوث التجريبية في القضايا الأدبية واللغوية. ويشمل ذلك اكتساب المهارات في جمع البيانات وتحليلها وتفسيرها، والمساهمة في تطوير المعرفة في هذا المجال",
    ],
    en: [
      "Graduates will demonstrate advanced research skills using academic databases, libraries, and diverse sources to conduct independent scholarly inquiry and produce high-quality academic writing",
      "Upon completion, graduates will show in-depth knowledge and critical evaluative abilities to analyze and interpret diverse literary genres, styles, movements, and texts",
      "Graduates will demonstrate deep knowledge in linguistics, enabling critical evaluation and interpretation of diverse linguistic phenomena, including structure, meaning, and use",
      "Students will apply advanced literary analysis skills, critically engaging with diverse genres, periods, and cultural contexts and presenting sophisticated interpretations that significantly contribute to ongoing discourse in literary studies",
      "Upon completion, students will demonstrate advanced competence in linguistic analysis, applying diverse theoretical frameworks and methodologies to analyze linguistic structures, meaning, and use, contributing original insights in the field",
      "Graduates will develop competence in conducting empirical research on literary and linguistic issues, including skills in data collection, analysis, and interpretation, contributing to knowledge development in the field",
    ],
  },

  admissionRequirements: {
    ar: [
      "درجة البكالوريوس في اللغة الإنجليزية أو مجال ذي صلة من مؤسسة تعليمية معترف بها",
      'درجة بمعدل 2.5 من 4 أو ما يعادلها، أي "جيد" أو "75-79%"',
      "سيتم منح الاعتبار للمتقدمين/الطلاب الحاصلين على درجة أقل من الدرجة المذكورة، شريطة أن يكون لديهم خبرة عملية ذات صلة لا تقل عن سنتين",
      "اختبار IELTS بحد أدنى 6 أو ما يعادله",
      "الطلاب الذين يحصلون على الدرجة 5-5.5 في امتحان IELTS مؤهلون للتقديم في البرنامج التأهيلي للدراسات العليا (PQP) في كلية البريمي الجامعية والحصول على القبول في برنامج الماجستير بعد الانتهاء بنجاح من برنامج PQP",
      "اجتياز مقابلة القبول",
    ],
    en: [
      "A bachelor's degree in English or a related field from a recognized institution",
      'A GPA of 2.5 out of 4 or equivalent ("Good" or 75–79%)',
      "Applicants with a lower grade may be considered if they have at least two years of relevant professional experience",
      "IELTS minimum score of 6 or equivalent",
      "Students scoring 5–5.5 on IELTS may apply to the Postgraduate Qualifying Program (PQP) at Buraimi University College and gain admission to the master's program upon successful completion of PQP",
      "Pass the admission interview",
    ],
  },

  programFeatures: {
    ar: [
      { title: "شراكة أمريكية", description: "بالتعاون مع جامعة كاليفورنيا نورثريدج (CSUN)" },
      { title: "تخصصان متنوعان", description: "اختر بين تخصص الأدب أو تخصص اللغويات" },
      { title: "هيئة تدريس متميزة", description: "أساتذة متخصصون في الأدب واللغويات" },
      { title: "شهادة معترف بها", description: "اعتماد أكاديمي دولي من CSUN" },
      { title: "فرص وظيفية متميزة", description: "فرص تدريس محلية ودولية" },
      { title: "رسوم مناسبة", description: "130 ريال للساعة - إجمالي 4,290 ريال" },
    ],
    en: [
      { title: "U.S. partnership", description: "In collaboration with California State University, Northridge (CSUN)" },
      { title: "Two diverse tracks", description: "Choose between Literature or Linguistics" },
      { title: "Distinguished faculty", description: "Professors specialized in literature and linguistics" },
      { title: "Recognized degree", description: "International academic accreditation through CSUN" },
      { title: "Outstanding career opportunities", description: "Local and international teaching opportunities" },
      { title: "Affordable fees", description: "130 OMR per hour — 4,290 OMR total" },
    ],
  },

  creditSummary: {
    ar: [
      { label: "متطلبات مشتركة", hours: 9 },
      { label: "مقررات إجبارية", hours: 12 },
      { label: "مقررات اختيارية", hours: 6 },
      { label: "الرسالة", hours: 6 },
    ],
    en: [
      { label: "Shared requirements", hours: 9 },
      { label: "Mandatory courses", hours: 12 },
      { label: "Elective courses", hours: 6 },
      { label: "Thesis", hours: 6 },
    ],
    totalAr: "33 ساعة معتمدة",
    totalEn: "33 credit hours",
  },

  publicLawCourses: {
    core: sharedCore,
    major: literatureMajor,
    elective: literatureElective,
    thesis: literatureThesis,
  },

  privateLawCourses: {
    core: sharedCore,
    major: linguisticsMajor,
    elective: linguisticsElective,
    thesis: linguisticsThesis,
  },
};
