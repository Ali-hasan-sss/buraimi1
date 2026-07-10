export type PlanReportItem = {
  id: string;
  year: string;
  titleAr: string;
  titleEn: string;
  summaryAr: string;
  summaryEn: string;
  file?: string;
};

export const plansReportsByLocale = {
  ar: {
    pageTitle: "الخطط والتقارير",
    pageSubtitle: "تصفح خططنا الاستراتيجية وتقاريرنا السنوية",
    availableDocsTitle: "المستندات المتاحة",
    detailsTitle: "تفاصيل المستند",
    yearLabel: "العام",
    statusLabel: "الحالة",
    statusValue: "متاح للطلب",
    pendingTitle: "الملف قيد الإعداد",
    pendingText:
      "هذا المستند متاح حالياً ويمكن الحصول عليه من خلال التواصل مع إدارة الكلية. سيتم رفع النسخة الإلكترونية قريباً.",
    howToGetTitle: "كيفية الحصول على المستند:",
    howToGetItems: [
      "زيارة مكتب شؤون الطلبة",
      "التواصل عبر البريد الإلكتروني",
      "الطلب عبر بوابة الطالب",
    ],
    contactTitle: "معلومات الاتصال:",
    contactEmail: "info@buc.edu.om",
    contactPhone: "+968 24 000 000",
    contactHours: "الأحد - الخميس: 8:00 - 15:00",
    requestButton: "طلب المستند عبر البريد",
  },
  en: {
    pageTitle: "Plans and Reports",
    pageSubtitle: "Browse our strategic plans and annual reports",
    availableDocsTitle: "Available Documents",
    detailsTitle: "Document Details",
    yearLabel: "Year",
    statusLabel: "Status",
    statusValue: "Available on request",
    pendingTitle: "File in preparation",
    pendingText:
      "This document is currently available upon request through college administration. The electronic version will be uploaded soon.",
    howToGetTitle: "How to obtain this document:",
    howToGetItems: [
      "Visit Student Affairs Office",
      "Contact us by email",
      "Request through Student Portal",
    ],
    contactTitle: "Contact Information:",
    contactEmail: "info@buc.edu.om",
    contactPhone: "+968 24 000 000",
    contactHours: "Sunday - Thursday: 8:00 - 15:00",
    requestButton: "Request document by email",
  },
} as const;

export const plansReportsItems: PlanReportItem[] = [
  {
    id: "strategic-plan",
    year: "2024",
    titleAr: "الخطة الاستراتيجية 2024-2028",
    titleEn: "Strategic Plan 2024-2028",
    summaryAr: "الخطة الاستراتيجية الشاملة للكلية للسنوات القادمة",
    summaryEn: "Comprehensive strategic plan for the upcoming years",
  },
  {
    id: "annual-report-2023",
    year: "2023",
    titleAr: "التقرير السنوي 2023",
    titleEn: "Annual Report 2023",
    summaryAr: "التقرير السنوي الشامل لأنشطة وإنجازات الكلية",
    summaryEn: "Comprehensive annual report of activities and achievements",
  },
  {
    id: "institutional-development",
    year: "2024",
    titleAr: "خطة التطوير المؤسسي",
    titleEn: "Institutional Development Plan",
    summaryAr: "خطة تطوير البنية التحتية والخدمات المؤسسية",
    summaryEn: "Infrastructure and institutional services development plan",
  },
  {
    id: "qa-report-2023",
    year: "2023",
    titleAr: "تقرير ضمان الجودة",
    titleEn: "Quality Assurance Report",
    summaryAr: "تقرير شامل عن معايير الجودة والاعتماد الأكاديمي",
    summaryEn: "Comprehensive report on quality standards and accreditation",
  },
  {
    id: "research-plan-2024",
    year: "2024",
    titleAr: "خطة البحث العلمي",
    titleEn: "Scientific Research Plan",
    summaryAr: "الخطة الاستراتيجية للبحث العلمي والنشر الأكاديمي",
    summaryEn: "Strategic plan for research and academic publishing",
  },
  {
    id: "graduates-report-2023",
    year: "2023",
    titleAr: "تقرير الخريجين",
    titleEn: "Graduates Report",
    summaryAr: "إحصائيات ومتابعة خريجي الكلية ومساراتهم المهنية",
    summaryEn: "Statistics and follow-up of graduates and career paths",
  },
];
