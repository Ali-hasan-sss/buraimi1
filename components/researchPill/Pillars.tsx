import { BarChart3, DollarSign, FileCheck, GraduationCap, Lightbulb, Microscope, Shield, TrendingUp, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLocale } from "next-intl";

type LocaleKey = "ar" | "en";

type PillarColor = "blue" | "green" | "purple" | "amber" | "red" | "teal" | "indigo" | "pink" | "orange";

type PillarMeta = {
    id: number;
    icon: LucideIcon;
    color: PillarColor;
};

type PillarContent = {
    "title": string;
    "titleEn": string;
    "description": string;
    "points": string[];
};

const pillarsMeta: PillarMeta[] = [
    { id: 1, icon: Microscope, color: "blue" },
    { id: 2, icon: Shield, color: "green" },
    { id: 3, icon: Lightbulb, color: "purple" },
    { id: 4, icon: GraduationCap, color: "amber" },
    { id: 5, icon: TrendingUp, color: "red" },
    { id: 6, icon: DollarSign, color: "teal" },
    { id: 7, icon: Users, color: "indigo" },
    { id: 8, icon: BarChart3, color: "pink" },
    { id: 9, icon: FileCheck, color: "orange" },
];

const t: Record<
    LocaleKey,
    {
        "sectionTitle": string;
        "sectionSubtitle": string;
        "pillars": Record<number, PillarContent>;
        "pillarNineFooter": string;
    }
> = {
    ar: {
        "sectionTitle": "الركائز التسعة للبحث العلمي",
        "sectionSubtitle": "Nine Pillars of Scientific Research",
        "pillars": {
            1: {
                "title": "الرؤية البحثية متعددة التخصصات",
                "titleEn": "Multidisciplinary Research Vision",
                "description": "تشجع وحدة البحث العلمي والابتكار نتائج الأبحاث التي تكون مؤثرة وسهلة الوصول ويمكن التواصل بها على نطاق واسع من خلال تنفيذ ما يلي:",
                "points": [
                    "تعزيز البحث متعدد التخصصات ضمن محاور استراتيجية شاملة تعالج أبرز التحديات العالمية",
                    "دعم مشاركة الأنشطة البحثية المختلفة، بما في ذلك المشاركة في المؤتمرات العلمية والنشر في مجلات علمية رفيعة المستوى",
                    "تطوير قنوات تواصل فعّالة ومتينة عبر منصات متعددة، بما يسهم في نشر مخرجات الأنشطة البحثية على نطاق واسع",
                    "تشجيع الباحثين العلميين على نشر نتائج أبحاثهم بأوسع نطاق ممكن",
                    "دعم النشر البحثي المشترك بين أعضاء الهيئة الأكاديمية والطلبة",
                    "دعم مشاركة الطلبة في الأنشطة البحثية مثل حضور المؤتمرات، والنشر العلمي، والمساهمات الابتكارية",
                    "زيادة معدلات الاستشهاد بالأبحاث العلمية من خلال رفع مستوى ظهور مخرجات البحث وإتاحة الوصول إليها",
                    "مكافأة التميز والإنجاز في البحث العلمي وتحفيز الإبداع والابتكار",
                ],
            },
            2: {
                "title": "الأخلاقيات والنزاهة العلمية",
                "titleEn": "Scientific Ethics and Integrity",
                "description": "تسعى وحدة البحث العلمي والابتكار إلى دعم البحث المفتوح ونزاهة البحث لتحقيق الأهداف التالية:",
                "points": [
                    "بناء ثقافة بحثية قائمة على الانفتاح، وتشجيع الباحثين وطلبة الدراسات البحثية على تحقيق أعلى مستويات الإنتاجية في أنشطتهم البحثية",
                    "ترسيخ ثقافة النزاهة البحثية بما يتماشى مع رؤية ورسالة كلية البريمي الجامعية، ودعم مبادئ النزاهة في البحث العلمي",
                    "تعزيز إتاحة وشفافية البيانات البحثية من خلال التقارير السنوية الشاملة وممارسات البحث المفتوح",
                    "تعزيز ثقافة أخلاقيات البحث والنزاهة العلمية عبر تنظيم حلقات وورش عمل دورية على مستوى الأقسام الأكاديمية والكلية",
                ],
            },
            3: {
                "title": "البيئة العلمية المفتوحة والابتكار",
                "titleEn": "Open Scientific Environment and Innovation",
                "description": "تشجع وحدة البحث العلمي والابتكار بيئة البحث المفتوحة من خلال ما يلي:",
                "points": [
                    "دعم وتحفيز أعضاء الهيئة الأكاديمية والطلبة على إجراء أبحاث ابتكارية وتطوير منتجات وخدمات جديدة",
                    "دعم الباحثين من أعضاء الهيئة الأكاديمية والطلبة في جميع مراحل تطورهم البحثي، من خلال توفير الوقت والموارد اللازمة لتهيئة بيئة محفزة على الابتكار",
                    "تطوير أنشطة تواصل مجتمعي تهدف إلى تعزيز ثقافة البحث العلمي والابتكار على مستوى السلطنة",
                    "تعزيز الأفكار الابتكارية من خلال دعم حاضنة الأعمال في كلية البريمي الجامعية",
                    "إطلاق برنامج احتضان للمشاريع الابتكارية يمتد من ستة أشهر إلى سنتين، وفق طبيعة المشروع واحتياجاته",
                    "دعم المستثمرين للمساهمة في إنشاء المزيد من مرافق الشركات الناشئة ومشاريع التوسع والنمو",
                    "تشجيع ريادة الأعمال من خلال تنظيم أنشطة موجهة لطلبة البكالوريوس والدراسات العليا، وأعضاء الهيئة الأكاديمية، ورواد الأعمال المحليين، بما يسهم في تعزيز إنشاء الشركات الناشئة",
                ],
            },
            4: {
                "title": "التدريس المدعم بالبحث العلمي",
                "titleEn": "Research-Supported Teaching",
                "description": "تزود وحدة البحث العلمي والابتكار الطلاب بالمهارات اللازمة للمشاركة الفعالة في اكتساب المعرفة وتطويرها وإنتاجها من خلال ما يلي:",
                "points": [
                    "ضمان إتاحة فرص الاطلاع والمشاركة في الأنشطة البحثية لجميع الطلبة بما يعزز تجربتهم التعليمية",
                    "تمكين الطلبة من النقد والتحليل العلمي للنتائج البحثية من خلال تكليفات دراسية مرتبطة بمخرجات البحث العلمي",
                    "تشجيع وتطوير مناهج دراسية متقدمة وحديثة تستند إلى نتائج البحث العلمي وتسهم في تشكيلها",
                    "تيسير مشاركة مخرجات البحث العلمي داخل البيئة الصفية بما يعزز التكامل بين البحث والتدريس",
                ],
            },
            5: {
                "title": "الاستشارات البحثية والتسويقية",
                "titleEn": "Research Consultations and Marketing",
                "description": "تخطط وحدة المسؤولية الاجتماعية والابتكار للقيام بالمبادرات التالية لتحقيق أهدافها:",
                "points": [
                    "تطوير خدمات استشارية متخصصة تلبي احتياجات المشاريع البحثية المتنوعة والقطاعات الصناعية المختلفة ضمانًا لفاعليتها وتأثيرها",
                    "تقديم دعم متكامل للباحثين في مراحل تحويل المخرجات البحثية إلى منتجات وخدمات تجارية، مع الحفاظ على حقوق الملكية الفكرية وحقوق النشر",
                    "توفير برامج تدريبية وموارد داعمة للباحثين الراغبين في تسويق ابتكاراتهم وتحويلها إلى فرص استثمارية",
                    "التعاون مع أصحاب المصلحة لتحديد اتجاهات السوق والفرص المتاحة لتقديم حلول مبتكرة قائمة على البحث العلمي",
                ],
            },
            6: {
                "title": "تمويل البحوث",
                "titleEn": "Research Funding",
                "description": "تعمل وحدة البحث العلمي والابتكار على تطوير خطة مستدامة تعالج التمويل الداخلي والخارجي لتعزيز ملف البحث العالمي من خلال ما يلي:",
                "points": [
                    "البناء على الشراكات الوطنية والدولية وتعزيزها لمعالجة أبرز التحديات المجتمعية والصناعية",
                    "زيادة التمويل من المصادر الداخلية والخارجية ضمن الخطط المستقبلية للكلية",
                    "تعزيز التعاون البحثي الممول مع الشركاء التجاريين الاستراتيجيين على مستوى العالم",
                ],
            },
            7: {
                "title": "التطوير المهني",
                "titleEn": "Professional Development",
                "description": "تهدف وحدة البحث العلمي والابتكار إلى تنظيم الندوات والمنتديات وورش العمل على مستوى الأقسام والكليات، لتحقيق الأهداف التالية:",
                "points": [
                    "تعزيز ثقافة التعلم المستمر لدى أعضاء الهيئة الأكاديمية بما يدعم التطوير المهني المستدام",
                    "تيسير التواصل مع أحدث المستجدات في المجالات متعددة التخصصات لتبادل الخبرات واستثمار الفرص المتاحة",
                    "وضع أهداف واضحة لبرامج وورش التطوير المهني بما يضمن تحقيق أثر فعّال وقابل للقياس",
                    "تشجيع تبادل المعرفة والخبرات لدعم نمو الزملاء وتعزيز بيئة العمل التعاونية",
                    "تعزيز الاهتمام بالرفاه الوظيفي بما يسهم في استدامة الإنتاجية وتحقيق النجاح المهني على المدى الطويل",
                ],
            },
            8: {
                "title": "البنية التحتية للدعم المالي والبشري",
                "titleEn": "Infrastructure for Financial and Human Support",
                "description": "تتمتع وحدة البحث العلمي والابتكار بهياكل مالية وبشرية محددة بالإضافة إلى الموارد اللازمة لدعم تنفيذ استراتيجية البحث والابتكار في الجامعة وتحقيق الأهداف المرتبطة بها. وتتولى لجنة البحث العلمي والابتكار، التي تتألف من المدير وممثلين عن الأقسام الأكاديمية ومنسقي الابتكار، مسؤولية توجيه خدمات الاستشارات وأنشطة الحضانة وتقييم المنح البحثية ومبادرات التطوير المهني.",
                "points": [],
            },
            9: {
                "title": "معايير التوجيه والتقييم",
                "titleEn": "Guidance and Evaluation Standards",
                "description": "تستخدم وحدة البحث العلمي والدراسات الاستقصائية مجموعة من المؤشرات المصممة لتقييم الإنجازات البحثية للأفراد أو المجموعات، وتقدم طريقة منهجية لقياس مساهماتهم وتأثيرهم. يركز كل مؤشر على الإنجازات البحثية المهمة، ويغطي مجموعة من العوامل مثل:",
                "points": [
                    "المشاركة في المؤتمرات العلمية ونوع المشاركة (محلية أو دولية)",
                    "المنشورات العلمية وتصنيفاتها وفقًا للمجلات أو قواعد البيانات المعتمدة",
                    "عدد الاستشهادات العلمية على المستويين المؤسسي (كلية البريمي الجامعية) والفردي",
                    "المنح البحثية المحصّلة، بما يشمل المنح الداخلية والخارجية",
                    "المشاركة في الأنشطة البحثية مثل الندوات وورش العمل والملتقيات العلمية",
                    "معدل النجاح في مسابقات المشاريع البحثية والابتكارية",
                    "تصنيف وعدد المشاريع الابتكارية وريادة الأعمال (مثل الذكاء الاصطناعي، الاستدامة، وغيرها)",
                    "التعاون في المشاريع البحثية مع الطلبة والمجالات العلمية المرتبطة بها",
                    "عدد ونوعية الدورات التدريبية المهنية، سواء كانت داخلية أو خارجية",
                ],
            },
        },
        "pillarNineFooter": "تشكل هذه المؤشرات إطارًا شاملاً لتوجيه وتقييم التميز البحثي في كلية البريمي الجامعية.",
    },
    en: {
        "sectionTitle": "Nine Pillars of Scientific Research",
        "sectionSubtitle": "الركائز التسعة للبحث العلمي",
        "pillars": {
            1: {
                "title": "Multidisciplinary Research Vision",
                "titleEn": "الرؤية البحثية متعددة التخصصات",
                "description": "The Scientific Research and Innovation Unit encourages research outcomes that are impactful, accessible, and widely communicated by implementing the following:",
                "points": [
                    "Promoting multidisciplinary research within comprehensive strategic themes that address key global challenges",
                    "Supporting diverse research activities, including conference participation and publishing in high-impact journals",
                    "Developing strong communication channels across multiple platforms to disseminate research outputs widely",
                    "Encouraging researchers to share their findings as broadly as possible",
                    "Supporting joint publications between faculty members and students",
                    "Supporting student participation in research activities such as conferences, publications, and innovation contributions",
                    "Increasing citation rates by improving the visibility and accessibility of research outputs",
                    "Rewarding excellence and achievement in research and stimulating creativity and innovation",
                ],
            },
            2: {
                "title": "Scientific Ethics and Integrity",
                "titleEn": "الأخلاقيات والنزاهة العلمية",
                "description": "The Scientific Research and Innovation Unit supports open research and integrity to achieve the following goals:",
                "points": [
                    "Building an open research culture and encouraging researchers and students to achieve high productivity in their research activities",
                    "Embedding research integrity aligned with Buraimi University College's vision and mission",
                    "Enhancing research data availability and transparency through comprehensive annual reporting and open research practices",
                    "Promoting research ethics and integrity through regular seminars and workshops across departments and the college",
                ],
            },
            3: {
                "title": "Open Scientific Environment and Innovation",
                "titleEn": "البيئة العلمية المفتوحة والابتكار",
                "description": "The Scientific Research and Innovation Unit encourages an open research environment through the following:",
                "points": [
                    "Supporting and motivating faculty members and students to conduct innovative research and develop new products and services",
                    "Supporting faculty members and students at all stages of their research development by providing time and resources for an innovation-friendly environment",
                    "Developing community engagement activities to promote scientific research and innovation culture across the Sultanate",
                    "Strengthening innovative ideas by supporting the business incubator at Buraimi University College",
                    "Launching an incubation program for innovative projects ranging from six months to two years, based on project needs",
                    "Supporting investors in establishing more startup facilities and growth expansion projects",
                    "Encouraging entrepreneurship through activities targeting undergraduate and postgraduate students, faculty members, and local entrepreneurs",
                ],
            },
            4: {
                "title": "Research-Supported Teaching",
                "titleEn": "التدريس المدعم بالبحث العلمي",
                "description": "The Scientific Research and Innovation Unit equips students with the skills needed to actively participate in acquiring, developing, and producing knowledge through the following:",
                "points": [
                    "Ensuring access and participation opportunities in research activities for all students to enhance their learning experience",
                    "Enabling students to critically analyze research findings through coursework linked to research outputs",
                    "Encouraging the development of advanced and modern curricula that are based on and shaped by research results",
                    "Facilitating the integration of research outputs within classroom environments to strengthen research-teaching synergy",
                ],
            },
            5: {
                "title": "Research Consultations and Marketing",
                "titleEn": "الاستشارات البحثية والتسويقية",
                "description": "The Social Responsibility and Innovation Unit plans the following initiatives to achieve its objectives:",
                "points": [
                    "Developing specialized consultancy services to meet the needs of diverse research projects and industrial sectors",
                    "Providing integrated support for researchers to translate research outputs into commercial products and services while protecting intellectual property and publishing rights",
                    "Providing training programs and resources for researchers who want to market their innovations and turn them into investment opportunities",
                    "Collaborating with stakeholders to identify market trends and opportunities for research-based innovative solutions",
                ],
            },
            6: {
                "title": "Research Funding",
                "titleEn": "تمويل البحوث",
                "description": "The Scientific Research and Innovation Unit develops a sustainable plan addressing internal and external funding to strengthen the global research profile through:",
                "points": [
                    "Building and strengthening national and international partnerships to address key societal and industrial challenges",
                    "Increasing funding from internal and external sources within the college's future plans",
                    "Enhancing funded research collaboration with strategic global commercial partners",
                ],
            },
            7: {
                "title": "Professional Development",
                "titleEn": "التطوير المهني",
                "description": "The Scientific Research and Innovation Unit aims to organize seminars, forums, and workshops at the department and college levels to achieve:",
                "points": [
                    "Promoting a culture of continuous learning among faculty members to support sustainable professional development",
                    "Facilitating engagement with the latest developments in multidisciplinary fields to exchange expertise and leverage opportunities",
                    "Setting clear objectives for professional development programs and workshops to ensure measurable impact",
                    "Encouraging knowledge and experience sharing to support colleagues' growth and strengthen a collaborative work environment",
                    "Promoting workplace wellbeing to sustain productivity and long-term professional success",
                ],
            },
            8: {
                "title": "Infrastructure for Financial and Human Support",
                "titleEn": "البنية التحتية للدعم المالي والبشري",
                "description": "The Scientific Research and Innovation Unit has defined financial and human structures, along with the resources needed to support implementing the research and innovation strategy and achieving its objectives. The Scientific Research and Innovation Committee—comprising the director, department representatives, and innovation coordinators—guides consultancy services, incubation activities, grant evaluations, and professional development initiatives.",
                "points": [],
            },
            9: {
                "title": "Guidance and Evaluation Standards",
                "titleEn": "معايير التوجيه والتقييم",
                "description": "The Scientific Research and Survey Studies Unit uses a set of indicators designed to evaluate research achievements of individuals or groups, providing a systematic way to measure contributions and impact. Each indicator focuses on key research accomplishments and covers factors such as:",
                "points": [
                    "Conference participation and type of participation (local or international)",
                    "Scientific publications and their classification according to recognized journals or databases",
                    "Number of citations at both institutional (Buraimi University College) and individual levels",
                    "Research grants obtained, including internal and external grants",
                    "Participation in research activities such as seminars, workshops, and scientific forums",
                    "Success rate in research and innovation project competitions",
                    "Classification and number of innovation and entrepreneurship projects (e.g., AI, sustainability, etc.)",
                    "Collaboration on research projects with students and related scientific fields",
                    "Number and type of professional training courses, internal or external",
                ],
            },
        },
        "pillarNineFooter": "These indicators form a comprehensive framework to guide and evaluate research excellence at Buraimi University College.",
    },
};

export default function Pillars() {
    const locale = useLocale()
    const locVal = locale == "ar" ? "ar" : "en"
    const content = t[locVal];
    return (
        <section className="py-16">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-center mb-12">
                    <h2 className="text-5xl font-bold text-[#254151] mb-4">{content.sectionTitle}</h2>
                    <p className="text-xl text-gray-600">{content.sectionSubtitle}</p>
                </div>

                <div className="space-y-8">
                    {pillarsMeta.map((pillarMeta) => {
                        const pillar = content.pillars[pillarMeta.id];
                        const PillarIcon = pillarMeta.icon;
                        const pillarColor = pillarMeta.color;
                        return (
                            <div key={pillarMeta.id} className={`bg-white rounded-lg shadow-xl border-2 border-${pillarColor}-200 overflow-hidden hover:shadow-2xl transition-all`}>
                                {/* Header */}
                                <div className={`bg-gradient-to-r from-${pillarColor}-600 to-${pillarColor}-700 text-white p-8`}>
                                    <div className="flex items-center gap-6">
                                        <div className="bg-white/20 backdrop-blur-sm size-20 rounded-full flex items-center justify-center flex-shrink-0">
                                            <PillarIcon className="size-10" />
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center gap-4 mb-2">
                                                <div className="bg-white/30 backdrop-blur-sm size-12 rounded-full flex items-center justify-center font-bold text-2xl">
                                                    {pillarMeta.id}
                                                </div>
                                                <div>
                                                    <h3 className="text-3xl font-bold">{pillar.title}</h3>
                                                    <p className="text-lg opacity-90">{pillar.titleEn}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="p-8">
                                    <div className={`bg-${pillarColor}-50 rounded-lg p-6 border-2 border-${pillarColor}-200 mb-6`}>
                                        <p className="text-gray-700 text-lg leading-relaxed">{pillar.description}</p>
                                    </div>

                                    {pillar.points.length > 0 && (
                                        <div className="space-y-3">
                                            {pillar.points.map((point, idx) => (
                                                <div key={idx} className={`bg-gradient-to-r from-${pillarColor}-50 to-white rounded-lg p-5 border-r-4 border-${pillarColor}-500 shadow-sm hover:shadow-md transition-all`}>
                                                    <div className="flex items-start gap-4">
                                                        <div className={`bg-${pillarColor}-600 text-white size-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm mt-0.5`}>
                                                            {idx + 1}
                                                        </div>
                                                        <p className="text-gray-700 leading-relaxed pt-1">{point}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {pillarMeta.id === 9 && (
                                        <div className={`bg-gradient-to-br from-${pillarColor}-50 to-${pillarColor}-100 rounded-lg p-6 border-2 border-${pillarColor}-200 mt-6`}>
                                            <p className="text-gray-700 text-lg leading-relaxed">
                                                {content.pillarNineFooter}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}