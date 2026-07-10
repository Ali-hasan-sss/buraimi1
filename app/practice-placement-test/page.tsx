"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import {
  Calculator,
  Monitor,
  Clock,
  BookOpen,
  Target,
  CircleAlert,
  CircleCheckBig,
  FileText,
  Eye,
  GraduationCap,
  Languages,
  Download,
} from "lucide-react";

interface ExamType {
  _id: string;
  nameAr: string;
  nameEn: string;
  icon: string;
  color: string;
}

interface Exam {
  _id: string;
  code: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  language: "ar" | "en";
  duration: number;
  examType: "computerized" | "paper";
  color: string;
  isActive: boolean;
  order: number;
  examTypeId: ExamType;
}

const colorClasses: Record<string, { bg: string; border: string; text: string; gradient: string; lightBg: string }> = {
  blue: {
    bg: "bg-blue-600",
    border: "border-blue-200",
    text: "text-blue-600",
    gradient: "from-blue-600 to-blue-700",
    lightBg: "bg-blue-50",
  },
  purple: {
    bg: "bg-purple-600",
    border: "border-purple-200",
    text: "text-purple-600",
    gradient: "from-purple-600 to-purple-700",
    lightBg: "bg-purple-50",
  },
  green: {
    bg: "bg-green-600",
    border: "border-green-200",
    text: "text-green-600",
    gradient: "from-green-600 to-green-700",
    lightBg: "bg-green-50",
  },
  amber: {
    bg: "bg-amber-600",
    border: "border-amber-200",
    text: "text-amber-600",
    gradient: "from-amber-600 to-amber-700",
    lightBg: "bg-amber-50",
  },
  teal: {
    bg: "bg-teal-600",
    border: "border-teal-200",
    text: "text-teal-600",
    gradient: "from-teal-600 to-teal-700",
    lightBg: "bg-teal-50",
  },
  indigo: {
    bg: "bg-indigo-600",
    border: "border-indigo-200",
    text: "text-indigo-600",
    gradient: "from-indigo-600 to-indigo-700",
    lightBg: "bg-indigo-50",
  },
  red: {
    bg: "bg-red-600",
    border: "border-red-200",
    text: "text-red-600",
    gradient: "from-red-600 to-red-700",
    lightBg: "bg-red-50",
  },
};

const iconComponents: Record<string, React.ComponentType<{ className?: string }>> = {
  Calculator,
  Monitor,
  FileText,
  BookOpen,
};

function getIcon(iconName: string) {
  return iconComponents[iconName] || FileText;
}

export default function PracticePlacementTestPage() {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const [examTypes, setExamTypes] = useState<ExamType[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [filteredExams, setFilteredExams] = useState<Exam[]>([]);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [typesRes, examsRes] = await Promise.all([
          fetch("/api/exam-types"),
          fetch("/api/practice-placement-tests"),
        ]);

        const typesData = await typesRes.json();
        const examsData = await examsRes.json();

        if (typesData.ok) setExamTypes(typesData.data);
        if (examsData.ok) {
          setExams(examsData.data);
          setFilteredExams(examsData.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (typeId: string) => {
    setSelectedType(typeId);
    if (typeId === "all") {
      setFilteredExams(exams);
    } else {
      setFilteredExams(exams.filter((exam) => exam.examTypeId._id === typeId));
    }
  };

  const getExamCountByType = (typeId: string) => {
    return exams.filter((exam) => exam.examTypeId._id === typeId).length;
  };

  const getTypeIcon = (iconName: string) => {
    const Icon = getIcon(iconName);
    return <Icon className="size-6" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">{isArabic ? "جاري التحميل..." : "Loading..."}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#6096b4] via-[#254151] to-[#6096b4] text-white py-16">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm p-5 rounded-full">
                <FileText className="size-16" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-4">
              {isArabic ? "امتحانات تحديد المستوى التدريبية" : "Practice Placement Tests"}
            </h1>
            <h2 className="text-2xl font-bold mb-6 opacity-90">
              {isArabic ? "Practice Placement Tests" : "امتحانات تحديد المستوى التدريبية"}
            </h2>
            <p className="text-xl opacity-95 leading-relaxed">
              {isArabic
                ? "استعد للامتحان الرسمي من خلال امتحاناتنا التدريبية المجانية"
                : "Prepare for the official exam with our free practice tests"}
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-12">
            <div className="bg-white rounded-lg shadow-xl p-10 border-2 border-blue-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-blue-600 text-white p-4 rounded-full">
                  <BookOpen className="size-8" />
                </div>
                <h2 className="text-3xl font-bold text-[#254151]">
                  {isArabic ? "عن الامتحانات التدريبية" : "About Practice Tests"}
                </h2>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 border-2 border-blue-200">
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  {isArabic
                    ? "توفر كلية البريمي الجامعية مجموعة من الامتحانات التدريبية المجانية لمساعدة الطلاب على الاستعداد بشكل أفضل لامتحانات تحديد المستوى الرسمية. هذه الامتحانات مصممة لتحاكي الامتحانات الحقيقية من حيث نوعية الأسئلة والوقت المخصص."
                    : "Buraimi University College provides free practice tests to help students better prepare for official placement exams. These tests are designed to simulate the real exams in question style and time limits."}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {examTypes.map((type) => (
                    <div key={type._id} className="bg-white p-6 rounded-lg shadow-md border-2 border-blue-200">
                      <div className="flex items-center gap-3 mb-2">
                        {getTypeIcon(type.icon)}
                        <h3 className="font-bold text-[#254151]">{isArabic ? type.nameAr : type.nameEn}</h3>
                      </div>
                      <p className="text-gray-700">
                        {getExamCountByType(type._id)} {isArabic ? "امتحانات تدريبية" : "practice tests"}
                      </p>
                    </div>
                  ))}
                  <div className="bg-white p-6 rounded-lg shadow-md border-2 border-blue-200">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="size-6 text-blue-600" />
                      <h3 className="font-bold text-[#254151]">{isArabic ? "مدة كل امتحان" : "Duration per test"}</h3>
                    </div>
                    <p className="text-gray-700">{isArabic ? "50 دقيقة" : "50 minutes"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#254151] mb-8 text-center">
              {isArabic ? "فوائد الامتحانات التدريبية" : "Benefits of Practice Tests"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-xl p-8 border-2 border-blue-200 hover:shadow-2xl transition-all">
                <div className="bg-blue-600 text-white size-16 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="size-8" />
                </div>
                <h3 className="text-xl font-bold text-[#254151] mb-3">{isArabic ? "التعرف على نمط الامتحان" : "Understand Exam Pattern"}</h3>
                <p className="text-gray-700 leading-relaxed">{isArabic ? "تعرف على طريقة طرح الأسئلة ونوعية الأسئلة المتوقعة" : "Learn expected question styles and structure"}</p>
              </div>
              <div className="bg-white rounded-lg shadow-xl p-8 border-2 border-green-200 hover:shadow-2xl transition-all">
                <div className="bg-green-600 text-white size-16 rounded-full flex items-center justify-center mb-4">
                  <Target className="size-8" />
                </div>
                <h3 className="text-xl font-bold text-[#254151] mb-3">{isArabic ? "تقييم مستواك الحالي" : "Assess Your Current Level"}</h3>
                <p className="text-gray-700 leading-relaxed">{isArabic ? "احصل على تقييم واضح لمستواك قبل الامتحان الرسمي" : "Get a clear evaluation before the official exam"}</p>
              </div>
              <div className="bg-white rounded-lg shadow-xl p-8 border-2 border-purple-200 hover:shadow-2xl transition-all">
                <div className="bg-purple-600 text-white size-16 rounded-full flex items-center justify-center mb-4">
                  <Clock className="size-8" />
                </div>
                <h3 className="text-xl font-bold text-[#254151] mb-3">{isArabic ? "تحسين إدارة الوقت" : "Improve Time Management"}</h3>
                <p className="text-gray-700 leading-relaxed">{isArabic ? "تدرب على إدارة الوقت خلال الامتحان" : "Practice managing time during exams"}</p>
              </div>
              <div className="bg-white rounded-lg shadow-xl p-8 border-2 border-amber-200 hover:shadow-2xl transition-all">
                <div className="bg-amber-600 text-white size-16 rounded-full flex items-center justify-center mb-4">
                  <CircleAlert className="size-8" />
                </div>
                <h3 className="text-xl font-bold text-[#254151] mb-3">{isArabic ? "تحديد نقاط الضعف" : "Identify Weak Areas"}</h3>
                <p className="text-gray-700 leading-relaxed">{isArabic ? "اكتشف المواضيع التي تحتاج إلى مزيد من التركيز" : "Discover topics that need more focus"}</p>
              </div>
              <div className="bg-white rounded-lg shadow-xl p-8 border-2 border-teal-200 hover:shadow-2xl transition-all">
                <div className="bg-teal-600 text-white size-16 rounded-full flex items-center justify-center mb-4">
                  <CircleCheckBig className="size-8" />
                </div>
                <h3 className="text-xl font-bold text-[#254151] mb-3">{isArabic ? "زيادة الثقة" : "Increase Confidence"}</h3>
                <p className="text-gray-700 leading-relaxed">{isArabic ? "ادخل الامتحان الرسمي بثقة أكبر بعد التدريب" : "Enter the official exam with more confidence"}</p>
              </div>
              <div className="bg-white rounded-lg shadow-xl p-8 border-2 border-red-200 hover:shadow-2xl transition-all">
                <div className="bg-red-600 text-white size-16 rounded-full flex items-center justify-center mb-4">
                  <FileText className="size-8" />
                </div>
                <h3 className="text-xl font-bold text-[#254151] mb-3">{isArabic ? "نتائج فورية" : "Instant Results"}</h3>
                <p className="text-gray-700 leading-relaxed">{isArabic ? "احصل على نتائج فورية بعد انتهاء الامتحان" : "Get immediate results after finishing the exam"}</p>
              </div>
            </div>
          </div>

          {/* Test Type Selector */}
          <div className="mb-12">
            <div className="bg-white rounded-lg shadow-xl p-8 border-2 border-gray-200">
              <h2 className="text-3xl font-bold text-[#254151] mb-6 text-center">{isArabic ? "اختر نوع الامتحان" : "Choose Exam Type"}</h2>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => handleFilterChange("all")}
                  className={`px-8 py-4 rounded-lg font-bold text-lg transition-all flex items-center gap-2 ${
                    selectedType === "all"
                      ? "bg-gradient-to-r from-[#254151] to-[#6096b4] text-white shadow-lg"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  <FileText className="size-6" />
                  <span>{isArabic ? "جميع الامتحانات" : "All Exams"} ({exams.length})</span>
                </button>
                {examTypes.map((type) => (
                  <button
                    key={type._id}
                    onClick={() => handleFilterChange(type._id)}
                    className={`px-8 py-4 rounded-lg font-bold text-lg transition-all flex items-center gap-2 ${
                      selectedType === type._id
                        ? `bg-gradient-to-r ${colorClasses[type.color]?.gradient || "from-blue-600 to-blue-700"} text-white shadow-lg`
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {getTypeIcon(type.icon)}
                    <span>
                      {(isArabic ? type.nameAr : type.nameEn)} ({getExamCountByType(type._id)})
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Available Tests Grid */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#254151] mb-8 text-center">{isArabic ? "جميع الامتحانات المتاحة" : "All Available Exams"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredExams.map((exam) => {
                const color = exam.color || "blue";
                const colors = colorClasses[color] || colorClasses.blue;
                const Icon = getIcon(exam.examTypeId?.icon || "FileText");

                return (
                  <div
                    key={exam._id}
                    className={`bg-white rounded-lg shadow-xl border-2 ${colors.border} overflow-hidden hover:shadow-2xl transition-all`}
                  >
                    <div className={`bg-gradient-to-r ${colors.gradient} text-white p-6`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
                          <Icon className="size-8" />
                        </div>
                        <div>
                          <div className="text-sm opacity-90 font-mono">{exam.code}</div>
                          <div className="text-xs opacity-75">Test Code</div>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold mb-1">{isArabic ? exam.titleAr : exam.titleEn}</h3>
                      <p className="text-sm opacity-90">{isArabic ? exam.titleEn : exam.titleAr}</p>
                    </div>
                    <div className="p-6">
                      <p className={`text-gray-700 mb-6 leading-relaxed border-r-4 border-${color}-500 pr-4`}>
                        {isArabic ? exam.descriptionAr : exam.descriptionEn}
                      </p>
                      <div className="space-y-3 mb-6">
                        <div className={`${colors.lightBg} p-4 rounded-lg border-2 ${colors.border}`}>
                          <div className="flex items-center gap-3">
                            <Languages className={`size-6 ${colors.text}`} />
                            <div>
                              <p className="text-sm text-gray-600">{isArabic ? "لغة الامتحان" : "Exam Language"}</p>
                              <p className="font-bold text-[#254151]">
                                {exam.language === "ar" ? "العربية" : "الإنجليزية"}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className={`${colors.lightBg} p-4 rounded-lg border-2 ${colors.border}`}>
                          <div className="flex items-center gap-3">
                            <Clock className={`size-6 ${colors.text}`} />
                            <div>
                              <p className="text-sm text-gray-600">{isArabic ? "مدة الامتحان" : "Exam Duration"}</p>
                              <p className="font-bold text-[#254151]">{exam.duration} {isArabic ? "دقيقة" : "minutes"}</p>
                            </div>
                          </div>
                        </div>
                        <div className={`${colors.lightBg} p-4 rounded-lg border-2 ${colors.border}`}>
                          <div className="flex items-center gap-3">
                            <Monitor className={`size-6 ${colors.text}`} />
                            <div>
                              <p className="text-sm text-gray-600">{isArabic ? "نوع الامتحان" : "Exam Format"}</p>
                              <p className="font-bold text-[#254151]">
                                {exam.examType === "computerized" ? (isArabic ? "محوسب" : "Computerized") : (isArabic ? "ورقي" : "Paper")}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button className={`w-full bg-gradient-to-r ${colors.gradient} text-white px-6 py-4 rounded-lg font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2`}>
                        <Eye className="size-5" />
                        <span>{isArabic ? "المشاهدة وبدء الامتحان" : "View and Start Exam"}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Important Instructions */}
          <div className="mb-12">
            <div className="bg-white rounded-lg shadow-xl p-10 border-2 border-purple-200">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-purple-600 text-white p-4 rounded-full">
                  <CircleAlert className="size-8" />
                </div>
                <h2 className="text-3xl font-bold text-[#254151]">{isArabic ? "تعليمات مهمة قبل البدء" : "Important Instructions Before Starting"}</h2>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-8 border-2 border-purple-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num, idx) => (
                    <div key={num} className="bg-white rounded-lg p-6 shadow-md border-2 border-purple-200">
                      <div className="flex items-start gap-4">
                        <div className="bg-purple-600 text-white size-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                          {num}
                        </div>
                        <p className="text-gray-700 leading-relaxed pt-1">
                          {(isArabic ? [
                            "تأكد من وجود اتصال إنترنت مستقر قبل بدء الامتحان",
                            "اختر مكاناً هادئاً ومريحاً لإجراء الامتحان",
                            "تأكد من أن لديك الوقت الكافي (50 دقيقة على الأقل)",
                            "استخدم حاسوباً محمولاً أو مكتبياً للحصول على أفضل تجربة",
                            "لا يمكن إيقاف الامتحان بعد البدء، لذا كن مستعداً",
                            "اقرأ كل سؤال بعناية قبل الإجابة",
                            "تأكد من الإجابة على جميع الأسئلة",
                            "استخدم الآلة الحاسبة والأوراق عند الحاجة",
                          ] : [
                            "Ensure you have a stable internet connection before starting",
                            "Choose a quiet and comfortable place for the test",
                            "Make sure you have enough time (at least 50 minutes)",
                            "Use a laptop or desktop for the best experience",
                            "You cannot pause the test after starting, so be ready",
                            "Read each question carefully before answering",
                            "Make sure to answer all questions",
                            "Use a calculator and notes when needed",
                          ])[idx]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 bg-purple-50 p-6 rounded-lg border-2 border-purple-200">
                <div className="flex items-start gap-3">
                  <CircleCheckBig className="size-8 text-purple-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-[#254151] text-xl mb-2">{isArabic ? "ملاحظة مهمة" : "Important Note"}</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {isArabic
                        ? "الامتحانات التدريبية مجانية ومتاحة لجميع الطلاب. يمكنك إعادة الامتحان عدة مرات للحصول على أفضل نتيجة. النتائج التي تحصل عليها في الامتحانات التدريبية لا تؤثر على قبولك أو تقييمك الرسمي."
                        : "Practice exams are free and available for all students. You can retake them multiple times to improve your score. Practice results do not affect your admission or official evaluation."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-12">
            <div className="bg-white rounded-lg shadow-xl p-10 border-2 border-green-200">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-green-600 text-white p-4 rounded-full">
                  <CircleCheckBig className="size-8" />
                </div>
                <h2 className="text-3xl font-bold text-[#254151]">{isArabic ? "مميزات الامتحانات التدريبية" : "Practice Exam Features"}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(isArabic
                  ? [
                      {
                        icon: Monitor,
                        color: "green",
                        title: "واجهة سهلة الاستخدام",
                        desc: "نفس الواجهة التي ستستخدمها في الامتحان الرسمي",
                      },
                      {
                        icon: Clock,
                        color: "blue",
                        title: "توقيت دقيق",
                        desc: "نفس المدة الزمنية للامتحان الرسمي (50 دقيقة)",
                      },
                      {
                        icon: FileText,
                        color: "purple",
                        title: "نتائج فورية",
                        desc: "احصل على نتائجك فوراً بعد انتهاء الامتحان",
                      },
                      {
                        icon: Target,
                        color: "amber",
                        title: "تقرير تفصيلي",
                        desc: "تقرير شامل يوضح نقاط القوة والضعف",
                      },
                      {
                        icon: Languages,
                        color: "teal",
                        title: "لغات متعددة",
                        desc: "امتحانات باللغتين العربية والإنجليزية",
                      },
                      {
                        icon: Download,
                        color: "red",
                        title: "تحميل النتائج",
                        desc: "يمكنك تحميل وطباعة نتائجك للمراجعة",
                      },
                    ]
                  : [
                      { icon: Monitor, color: "green", title: "Easy Interface", desc: "The same interface used in the official exam" },
                      { icon: Clock, color: "blue", title: "Accurate Timing", desc: "Same time limit as the official exam (50 minutes)" },
                      { icon: FileText, color: "purple", title: "Instant Results", desc: "Get your results immediately after finishing" },
                      { icon: Target, color: "amber", title: "Detailed Report", desc: "A full report showing strengths and weaknesses" },
                      { icon: Languages, color: "teal", title: "Multiple Languages", desc: "Tests available in Arabic and English" },
                      { icon: Download, color: "red", title: "Download Results", desc: "Download and print your results for review" },
                    ]).map((feature, idx) => (
                  <div key={idx} className={`bg-${feature.color}-50 rounded-lg p-8 border-2 border-${feature.color}-200`}>
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`bg-${feature.color}-600 text-white size-16 rounded-full flex items-center justify-center flex-shrink-0`}>
                        <feature.icon className="size-8" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#254151] mb-2">{feature.title}</h3>
                        <p className="text-gray-700">{feature.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="mb-12">
            <div className="bg-white rounded-lg shadow-xl p-10 border-2 border-indigo-200">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-indigo-600 text-white p-4 rounded-full">
                  <Target className="size-8" />
                </div>
                <h2 className="text-3xl font-bold text-[#254151]">{isArabic ? "نصائح للنجاح" : "Success Tips"}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Before Exam */}
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-8 border-2 border-indigo-200">
                  <div className="bg-indigo-600 text-white size-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="size-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[#254151] mb-3 text-center">{isArabic ? "قبل الامتحان" : "Before Exam"}</h3>
                  <ul className="space-y-2 text-gray-700">
                    {(isArabic ? ["راجع المواد الدراسية جيداً", "احصل على قسط كافٍ من الراحة", "جهز المواد التي ستحتاجها"] : ["Review your study material well", "Get enough rest", "Prepare what you need"]).map(
                      (tip, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CircleCheckBig className="size-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* During Exam */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-8 border-2 border-green-200">
                  <div className="bg-green-600 text-white size-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="size-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[#254151] mb-3 text-center">{isArabic ? "أثناء الامتحان" : "During Exam"}</h3>
                  <ul className="space-y-2 text-gray-700">
                    {(isArabic ? ["اقرأ الأسئلة بعناية", "راقب الوقت باستمرار", "ابدأ بالأسئلة السهلة أولاً"] : ["Read questions carefully", "Track time constantly", "Start with easier questions"]).map(
                      (tip, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CircleCheckBig className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* After Exam */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-8 border-2 border-purple-200">
                  <div className="bg-purple-600 text-white size-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="size-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[#254151] mb-3 text-center">{isArabic ? "بعد الامتحان" : "After Exam"}</h3>
                  <ul className="space-y-2 text-gray-700">
                    {(isArabic ? ["راجع نتائجك بعناية", "حدد نقاط الضعف", "أعد الامتحان للتحسين"] : ["Review your results carefully", "Identify weak points", "Retake to improve"]).map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CircleCheckBig className="size-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg shadow-xl p-10 border-2 border-amber-200">
            <div className="flex items-start gap-4">
              <div className="bg-amber-600 text-white size-16 rounded-full flex items-center justify-center flex-shrink-0">
                <CircleAlert className="size-8" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[#254151] text-2xl mb-6">{isArabic ? "أسئلة شائعة" : "Frequently Asked Questions"}</h3>
                <div className="space-y-4">
                  {(isArabic ? [
                    {
                      q: "هل الامتحانات التدريبية مجانية؟",
                      a: "نعم، جميع الامتحانات التدريبية متاحة مجاناً لجميع الطلاب.",
                    },
                    {
                      q: "كم مرة يمكنني إعادة الامتحان التدريبي؟",
                      a: "يمكنك إعادة الامتحان عدة مرات دون قيود للحصول على أفضل نتيجة.",
                    },
                    {
                      q: "هل نتائج الامتحانات التدريبية تؤثر على تقييمي الرسمي؟",
                      a: "لا، الامتحانات التدريبية هي للتدريب فقط ولا تؤثر على قبولك أو تقييمك الرسمي.",
                    },
                    {
                      q: "هل يمكنني إيقاف الامتحان والعودة إليه لاحقاً؟",
                      a: "لا، بمجرد البدء في الامتحان، يجب إكماله في جلسة واحدة. هذا يحاكي الامتحان الرسمي.",
                    },
                    {
                      q: "هل أحتاج إلى حساب خاص للدخول للامتحانات التدريبية؟",
                      a: "نعم، ستحتاج إلى تسجيل الدخول باستخدام بيانات الطالب الخاصة بك.",
                    },
                  ] : [
                    { q: "Are practice exams free?", a: "Yes, all practice exams are free for all students." },
                    { q: "How many times can I retake a practice exam?", a: "You can retake the exam multiple times without limits." },
                    { q: "Do practice exam results affect my official evaluation?", a: "No, practice exams are for training only and do not affect official evaluation." },
                    { q: "Can I pause the exam and return later?", a: "No, once started, the exam must be completed in one session." },
                    { q: "Do I need an account to access practice exams?", a: "Yes, you need to log in with your student credentials." },
                  ]).map((faq, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-lg shadow-md border-2 border-amber-200">
                      <h4 className="font-bold text-[#254151] mb-2">{faq.q}</h4>
                      <p className="text-gray-700">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#254151] to-[#6096b4] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">{isArabic ? "هل أنت مستعد للبدء؟" : "Are You Ready to Start?"}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {isArabic
              ? "ابدأ الآن في الامتحانات التدريبية واستعد بشكل أفضل للامتحان الرسمي"
              : "Start now with practice exams and prepare better for the official exam"}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="inline-flex items-center gap-2 bg-white text-[#254151] px-8 py-4 rounded-lg font-bold hover:shadow-2xl transition-all text-lg">
              <Eye className="size-6" />
              <span>{isArabic ? "اختر امتحاناً تدريبياً" : "Choose a Practice Exam"}</span>
            </button>
            <a
              className="inline-flex items-center gap-2 bg-[#c2a772] text-white px-8 py-4 rounded-lg font-bold hover:shadow-2xl transition-all text-lg"
              href="/main/foundation-program"
            >
              <GraduationCap className="size-6" />
              <span>{isArabic ? "البرنامج التأسيسي" : "Foundation Program"}</span>
            </a>
            <a
              className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-[#254151] transition-all text-lg"
              href="/main/oxford-placement-test"
            >
              <FileText className="size-6" />
              <span>{isArabic ? "اختبار أكسفورد" : "Oxford Placement Test"}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
