import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import TrainingCourseModel from "@/models/TrainingCourse";

const seedData = [
  // entrepreneurship
  { fieldId: "entrepreneurship", titleAr: "التسويق الشخصي لرائد الأعمال", titleEn: "Personal Branding for Entrepreneurs", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 1 },
  { fieldId: "entrepreneurship", titleAr: "قوانين العمل والعقود لرواد الأعمال", titleEn: "Labor Laws and Contracts for Entrepreneurs", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 2 },
  { fieldId: "entrepreneurship", titleAr: "الطريق إلى ريادة الأعمال", titleEn: "The Road to Entrepreneurship", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 3 },
  { fieldId: "entrepreneurship", titleAr: "أسرار القيادة الفعالة لرواد الأعمال", titleEn: "Secrets of Effective Leadership for Entrepreneurs", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 4 },
  { fieldId: "entrepreneurship", titleAr: "فكر بإبداع", titleEn: "Think Creatively", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 5 },
  { fieldId: "entrepreneurship", titleAr: "مشروعي خطوة بخطوة", titleEn: "My Project Step by Step", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 6 },
  { fieldId: "entrepreneurship", titleAr: "مشروعك في منزلك", titleEn: "Your Home-Based Business", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 7 },
  { fieldId: "entrepreneurship", titleAr: "علامتك التجارية في الأسواق التنافسية", titleEn: "Your Brand in Competitive Markets", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 8 },

  // english
  { fieldId: "english", titleAr: "اللغة الإنجليزية (مستوى مبتدئ)", titleEn: "English Language (Beginner)", durationAr: "إجمالي 32 ساعة 4 ايام في الاسبوع بواقع 2 ساعة في اليوم", durationEn: "Total 32 hours | 4 days/week | 2 hours/day", order: 1 },
  { fieldId: "english", titleAr: "اللغة الإنجليزية (مستوى متوسط)", titleEn: "English Language (Intermediate)", durationAr: "إجمالي 32 ساعة 4 ايام في الاسبوع بواقع 2 ساعة في اليوم", durationEn: "Total 32 hours | 4 days/week | 2 hours/day", order: 2 },
  { fieldId: "english", titleAr: "اللغة الإنجليزية (مستوى متقدم)", titleEn: "English Language (Advanced)", durationAr: "إجمالي 32 ساعة 4 ايام في الاسبوع بواقع 2 ساعة في اليوم", durationEn: "Total 32 hours | 4 days/week | 2 hours/day", order: 3 },
  { fieldId: "english", titleAr: "اللغة الإنجليزية (محادثة)", titleEn: "English Conversation", durationAr: "إجمالي 32 ساعة 4 ايام في الاسبوع بواقع 2 ساعة في اليوم", durationEn: "Total 32 hours | 4 days/week | 2 hours/day", order: 4 },
  { fieldId: "english", titleAr: "اللغة الإنجليزية (للأعمال)", titleEn: "Business English", durationAr: "إجمالي 32 ساعة 4 ايام في الاسبوع بواقع 2 ساعة في اليوم", durationEn: "Total 32 hours | 4 days/week | 2 hours/day", order: 5 },
  { fieldId: "english", titleAr: "اللغة الإنجليزية (للقانون)", titleEn: "Legal English", durationAr: "إجمالي 32 ساعة 4 ايام في الاسبوع بواقع 2 ساعة في اليوم", durationEn: "Total 32 hours | 4 days/week | 2 hours/day", order: 6 },

  // customer_service
  { fieldId: "customer_service", titleAr: "الأداء الإبداعي في استراتيجية التعامل وخدمة العملاء", titleEn: "Creative Performance in Customer Service Strategy", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 1 },
  { fieldId: "customer_service", titleAr: "خدمة العملاء وكيفية التعامل مع الشخصيات المهمة", titleEn: "Customer Service & VIP Handling", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 2 },
  { fieldId: "customer_service", titleAr: "ضمان الجودة في خدمة العملاء", titleEn: "Quality Assurance in Customer Service", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 3 },
  { fieldId: "customer_service", titleAr: "آليات الإبداع ومنهجيات التميز في إدارة علاقات العملاء", titleEn: "Creativity & Excellence Methodologies in CRM", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 4 },
  { fieldId: "customer_service", titleAr: "أفضل الممارسات لمفهوم السبع نجوم في خدمة العملاء", titleEn: "Best Practices for the Seven-Star Customer Service Concept", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 5 },

  // marketing
  { fieldId: "marketing", titleAr: "التسويق الإستراتيجي", titleEn: "Strategic Marketing", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 1 },
  { fieldId: "marketing", titleAr: "الإدارة الفعالة للتسويق", titleEn: "Effective Marketing Management", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 2 },
  { fieldId: "marketing", titleAr: "أساليب إعداد الخطط التسويقية", titleEn: "Marketing Plan Preparation Techniques", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 3 },
  { fieldId: "marketing", titleAr: "الاتصال التسويقي والتخطيط الإعلامي", titleEn: "Marketing Communication & Media Planning", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 4 },
  { fieldId: "marketing", titleAr: "التسويق الرقمي", titleEn: "Digital Marketing", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 5 },
  { fieldId: "marketing", titleAr: "المنظومة المتكاملة لإدارة التسويق والمبيعات", titleEn: "Integrated Marketing & Sales Management System", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 6 },
  { fieldId: "marketing", titleAr: "مهارات التسويق والمبيعات الأساسية لمحترفي إدارة الأعمال", titleEn: "Core Marketing & Sales Skills for Business Professionals", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 7 },
  { fieldId: "marketing", titleAr: "Modern trends in sales", titleEn: "Modern Trends in Sales", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 8 },
  { fieldId: "marketing", titleAr: "المبيعات واستراتيجيات التسويق", titleEn: "Sales & Marketing Strategies", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 9 },
  { fieldId: "marketing", titleAr: "مهارات البيع الفعالة (الأدوات والتقنيات)", titleEn: "Effective Selling Skills (Tools & Techniques)", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 10 },

  // logistics
  { fieldId: "logistics", titleAr: "الخدمات اللوجستية المتكاملة", titleEn: "Integrated Logistics Services", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 1 },
  { fieldId: "logistics", titleAr: "التكنولوجيا في الخدمات اللوجستية", titleEn: "Technology in Logistics Services", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 2 },
  { fieldId: "logistics", titleAr: "البرنامج المتكامل في إدارة الخدمات اللوجستية وسلاسل الإمداد", titleEn: "Comprehensive Program in Logistics & Supply Chain Management", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 3 },
  { fieldId: "logistics", titleAr: "إدارة الخدمات اللوجستية في المؤسسات والشركات", titleEn: "Logistics Management in Organizations and Companies", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 4 },
  { fieldId: "logistics", titleAr: "الاستدامة واللوجستيات الخضراء", titleEn: "Sustainability and Green Logistics", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 5 },

  // law
  { fieldId: "law", titleAr: "تكتيكات وتقنيات التفاوض القانوني والتسويات القانونية", titleEn: "Legal Negotiation Tactics and Settlement Techniques", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 1 },
  { fieldId: "law", titleAr: "التحول الرقمي في عمليات الادارة القانونية", titleEn: "Digital Transformation in Legal Administration Operations", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 2 },
  { fieldId: "law", titleAr: "صياغة المذكرات والتقارير والمراسلات القانونية", titleEn: "Drafting Legal Memos, Reports, and Correspondence", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 3 },
  { fieldId: "law", titleAr: "استراتيجيات التحكم في المخاطر القانونية", titleEn: "Legal Risk Control Strategies", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 4 },
  { fieldId: "law", titleAr: "مهارات قراءة وتحليل وتفسير القضايا القانونية", titleEn: "Reading, Analyzing, and Interpreting Legal Cases", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 5 },

  // hr
  { fieldId: "hr", titleAr: "التميز والكفاءة في إجراء المقابلات والاختيار والتعيين", titleEn: "Excellence and Efficiency in Interviewing, Selection & Hiring", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 1 },
  { fieldId: "hr", titleAr: "ادارة وتقييم مخاطر الموارد البشرية", titleEn: "Managing and Assessing Human Resource Risks", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 2 },
  { fieldId: "hr", titleAr: "الادارة الاحترافية للموارد البشرية", titleEn: "Professional Human Resource Management", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 3 },
  { fieldId: "hr", titleAr: "استراتيجيات إدارة المواهب وتخطيط التعاقب الوظيفي", titleEn: "Talent Management & Succession Planning Strategies", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 4 },

  // strategic_planning
  { fieldId: "strategic_planning", titleAr: "التفكير الإيجابي والتحفيز وإطلاق الطاقات الإبداعية", titleEn: "Positive Thinking, Motivation & Unleashing Creative Energy", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 1 },
  { fieldId: "strategic_planning", titleAr: "سيكولوجية الابداع القيادي والتأثير في الآخرين", titleEn: "Psychology of Creative Leadership and Influencing Others", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 2 },
  { fieldId: "strategic_planning", titleAr: "اللياقة الذهنية والابداع في التفكير والأداء", titleEn: "Mental Fitness and Creative Thinking & Performance", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 3 },
  { fieldId: "strategic_planning", titleAr: "الكاريزما والقيادة المؤثرة والتميز الاداري", titleEn: "Charisma, Influential Leadership & Administrative Excellence", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 4 },

  // finance_accounting
  { fieldId: "finance_accounting", titleAr: "الرقابة الفعالة على المدفوعات والمقبوضات المالية", titleEn: "Effective Control of Financial Payments and Receipts", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 1 },
  { fieldId: "finance_accounting", titleAr: "ترشيد النفقات وكيفية التعامل مع الازمات المالية", titleEn: "Cost Rationalization and Dealing with Financial Crises", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 2 },
  { fieldId: "finance_accounting", titleAr: "إعداد وتحليل وتقييم دراسات الجدوى", titleEn: "Preparing, Analyzing & Evaluating Feasibility Studies", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 3 },
  { fieldId: "finance_accounting", titleAr: "إدارة المخاطر المالية والإدارية", titleEn: "Managing Financial and Administrative Risks", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 4 },

  // quality
  { fieldId: "quality", titleAr: "الجودة والتميز المؤسسي", titleEn: "Quality and Institutional Excellence", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 1 },
  { fieldId: "quality", titleAr: "جودة التفكير والكفاءة والفعالية في العمل", titleEn: "Quality of Thinking, Efficiency and Effectiveness at Work", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 2 },
  { fieldId: "quality", titleAr: "إدارة الجودة الاستراتيجية", titleEn: "Strategic Quality Management", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 3 },
  { fieldId: "quality", titleAr: "أساليب وأدوات تحسين الجودة", titleEn: "Methods and Tools for Quality Improvement", durationAr: "إجمالي 15 ساعة 5 ايام في الاسبوع بواقع 3 ساعات في اليوم", durationEn: "Total 15 hours | 5 days/week | 3 hours/day", order: 4 },

  // professional_courses
  { fieldId: "professional_courses", titleAr: "IELTS", titleEn: "IELTS", durationAr: "إجمالي 30 ساعة 4 ايام في الاسبوع بواقع 2 ساعة في اليوم", durationEn: "Total 30 hours | 4 days/week | 2 hours/day", order: 1 },
  { fieldId: "professional_courses", titleAr: "IC3", titleEn: "IC3", durationAr: "إجمالي 30 ساعة 4 ايام في الاسبوع بواقع 2 ساعة في اليوم", durationEn: "Total 30 hours | 4 days/week | 2 hours/day", order: 2 },
];

export async function POST(request: NextRequest) {
  const seedKey = request.headers.get("x-seed-key");
  if (seedKey !== process.env.ADMIN_SEED_KEY) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    await dbConnect();
    await TrainingCourseModel.deleteMany({});
    await TrainingCourseModel.insertMany(seedData);
    return NextResponse.json({ ok: true, count: seedData.length });
  } catch {
    return NextResponse.json({ ok: false, error: "Seed failed" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    await TrainingCourseModel.deleteMany({});
    await TrainingCourseModel.insertMany(seedData);
    return NextResponse.json({ ok: true, count: seedData.length });
  } catch {
    return NextResponse.json({ ok: false, error: "Seed failed" }, { status: 500 });
  }
}
