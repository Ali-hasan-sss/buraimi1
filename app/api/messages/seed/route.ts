import dbConnect from "@/lib/dbConnect";
import { messageModel } from "@/models/message";
import { NextResponse } from "next/server";

const seedMessages = {
    chairman: {
        positionEn: "Chairman of the Board of Directors",
        positionAr: "رئيس مجلس الإدارة",
        nameEn: "Sheikh Ahmed Bin Nasser Al Nuaimi",
        nameAr: "الشيخ احمد بن ناصر النعيمي",
        image: "/assets/about/chairman.webp",
        paragraphs: [
            {
                textEn: "Al Buraimi University College is the first university college in Al Buraimi Governorate. Its establishment was an immediate interpretation act and a true response to the supreme call of His Majesty, Sultan Qaboos Bin Saeed, may he rest in peace, to the private sector to start investing in higher education through establishing new private academic institutions committed to sustaining greater educational opportunities in diverse academic fields for the Omani prospective students with the aim of meeting the needs of the local labor market with skilled local potentials to cope with the global economic changes.",
                textAr: "كلية بريامي للعلوم التطبيقية هي أول جامعة في منطقة البريمي، وقد تم تأسيسها كاستجابة فورية وحقيقية للدعوة العليا لملكنا السيد السلطان قابوس بن سعيد المعظم، رحمه الله، للقطاع الخاص لبدء الاستثمار في التعليم الجامعي من خلال إنشاء مؤسسات تعليمية خاصة ملتزمة بدعم فرص تعليمية أكبر في مجالات دراسية متنوعة للطلاب الوعوديين بهدف تلبية احتياجات سوق العمل المحلي بموارد محلية ماهرة قادرة على مواجهة التغيرات الاقتصادية العالمية."
            },
            {
                textEn: "The study at the college commenced at the beginning of the second semester of the academic year (2003 – 2004) was a dynamic starting point based on the incredible experience of partnership with California State University for the purpose of achieving the extreme benefit of its experiences and advanced academic expertise in academic fields of study, scientific research, quality assurance, etc. Furthermore, the valuable administrative and technical assistance of the Ministry of Higher Education has considerably assisted the college to pioneer the other colleges and universities in the region.",
                textAr: "بدأت الدراسة في الكلية في بداية الفصل الدراسي الثاني من العام الأكاديمي (2003 - 2004)، وكان نقطة انطلاق ديناميكية قائمة على الخبرة الاستثنائية للشراكة مع جامعة كاليفورنيا الحكومية من أجل تحقيق أقصى استفادة من تجاربها وخبراتها الأكاديمية المتقدمة في مجالات الدراسة الأكاديمية والبحث العلمي وضمان الجودة وغيرها. علاوة على ذلك، فإن المساعدة الإدارية والفنية القيمة التي قدمتها وزارة التعليم العالي ساعدت الكلية بشكل كبير على الريادة بين الكليات والجامعات الأخرى في المنطقة."
            },
            {
                textEn: "The honorable directions of His Majesty, may he rest in peace, have been the cornerstone for establishing basic rules and effective practices for the academic institutions to develop academic knowledge and professional skills. This, in turn, would enable the present and next generations to effectively and creatively serve the community and the country. In addition, the physical and intellectual support offered to the academic faculties has prompted sustaining the highest educational standards compatible with the international quality criteria.",
                textAr: "الإرشادات العظيمة لملكنا السيد السلطان قابوس بن سعيد المعظم، رحمه الله، كانت الحجر الأساس لتأسيس القواعد الأساسية والممارسات الفعالة للمؤسسات الأكاديمية لتطوير المعرفة الأكاديمية والمهارات المهنية. وهذا بدوره، يتيح للجيل الحالي والآتي الخدمة الفعالة والإبداعية للمجتمع والدولة. بالإضافة إلى ذلك، فإن الدعم المادي والعقلي المقدم للأساتذة الأكاديميين قد دفع إلى الحفاظ على أعلى معايير التعليم المطابقة للمعايير الدولية للجودة."
            },
            {
                textEn: "The administrative and academic staff of the college has paid a considerable attention to these essentials starting from establishing facilities conductive to innovation, experimentation and creativity at the new campus, embracing up-to-date teaching techniques and finally building competent human resources capable of delivering knowledge to the students to promote the welfare and progress of the country.",
                textAr: "الإدارة والأكاديميون في الكلية قد بذلوا جهدًا كبيرًا في الاهتمام بهذه العناصر الأساسية، بدءًا من إنشاء مرافق ملائمة للإبداع والتجريب والابتكار في الحرم الجامعي الجديد، وتبني تقنيات تعليمية متطورة، وأخيرًا بناء موارد بشرية ماهرة قادرة على توصيل المعرفة للطلاب لتعزيز رفاهية وتطور البلاد."
            }
        ]
    },
    dean: {
        positionEn: "BUC Dean",
        positionAr: "عميد الكلية",
        nameEn: "Prof. Yasser Fouad",
        nameAr: "الدكتور ياسر فؤاد",
        image: "/assets/about/dean.webp",
        paragraphs: [
            {
                textEn: "Welcome to Al Buraimi University College, the first higher education institution established in the governorate of Al Buraimi (2003). It is a privilege to represent more than 200 academic and administrative staff who work together to achieve the college's vision and to provide state of the art services in the areas of teaching, research, community service, and administrative and academic support affairs.",
                textAr: "مرحبا بكم في جامعة البريمي للعلوم التطبيقية، أول مؤسسة تعليمية جامعية تم تأسيسها في محافظه البريمي (2003). من المشرف علي فريق يضم أكثر من 200 عضوا من الأكاديميين والإداريين الذين يعملون معا لإنجاز رؤية الكلية وتقديم خدمات متطورة في مجالات التعليم والبحث العلمي وخدمة المجتمع ودعم الأنشطة الأكاديمية والإدارية."
            },
            {
                textEn: "The college is committed to provide excellent and rewarding educational experience to its students through upholding a pedagogical framework that prioritize student-centered learning and encourages critical thinking, collaboration, communication, and creativity. The college promotes as well rigorous research and supports its faculty, alumni and students to be active producers of meaningful research and efficient partners with the community.",
                textAr: "تلتزم الكلية بتقديم تجربة تعليمية ممتازة ومجزية لطلابها من خلال الحفاظ على إطار تربوي يعطي الأولوية للتعلم الذي يركز على الطالب ويشجع التفكير النقدي والتعاون والتواصل والإبداع. كما تعزز الكلية البحث الدقيق وتدعم أعضاء هيئة التدريس والخريجين والطلاب ليكونوا منتجين نشطين لأبحاث ذات معنى وشركاء فعالين مع المجتمع."
            },
            {
                textEn: "On this website, you can read about our strategic plan and goals and about the events and achievements of our students, faculty and staff. I also encourage you to browse through our academic and administrative departments and research units to discover the exciting world of opportunities at Al Buraimi University College. Finally, I invite you to contact us for more information about the College.",
                textAr: "على هذا الموقع، يمكنك الاطلاع على خطتنا الإستراتيجية وأهدافنا وعلى الأحداث والإنجازات التي يحققها طلابنا وأعضاء هيئة التدريس والموظفين. كما أشجعكم على تصفح أقسامنا الأكاديمية والإدارية ووحدات البحث لاكتشاف العالم المثير للفرص في جامعة البريمي للعلوم التطبيقية. أخيرا، أدعوكم للتواصل معنا للحصول على مزيد من المعلومات عن الكلية."
            }
        ]
    }
};

async function seed() {
    try {
        await dbConnect();

        const existing = await messageModel.findOne();
        if (existing) {
            return NextResponse.json(
                { success: true, message: "Messages already seeded" },
                { status: 200 }
            );
        }

        await messageModel.create(seedMessages);

        return NextResponse.json(
            { success: true, message: "Messages seeded successfully" },
            { status: 201 }
        );
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error("Error seeding messages:", error);
        return NextResponse.json(
            { error: "Failed to seed messages", message },
            { status: 500 }
        );
    }
}

export async function GET(_request: Request) {
    void _request;
    return seed();
}

export async function POST(_request: Request) {
    void _request;
    return seed();
}
