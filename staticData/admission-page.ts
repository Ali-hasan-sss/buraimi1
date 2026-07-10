import type { AdmissionProgramCard, AdmissionStep } from "@/types/admission-page"
import { admissionProgramPath } from "@/lib/admission-program-url"

function step(
    id: string,
    number: string,
    titleAr: string,
    titleEn: string,
    contentTitleAr: string,
    contentTitleEn: string,
    accordionItems: AdmissionStep["accordionItems"],
): AdmissionStep {
    return {
        id,
        number,
        titleAr,
        titleEn,
        contentTitleAr,
        contentTitleEn,
        accordionItems,
    }
}

const undergraduateSteps: AdmissionStep[] = [
    step(
        "ug-req",
        "01",
        "متطلبات القبول",
        "Admission Requirements",
        "متطلبات القبول",
        "Admission Requirements",
        [
            {
                id: "ug-req-general",
                titleAr: "الشروط العامة للقبول",
                titleEn: "General Admission Requirements",
                contentAr:
                    "<ul><li>أن يكون المتقدم حاصلاً على شهادة الدبلوم العام أو ما يعادلها.</li><li>استيفاء الحد الأدنى من المعدل المطلوب حسب البرنامج.</li><li>اجتياز اختبارات القبول عند الحاجة.</li><li>تقديم جميع المستندات المطلوبة ضمن المواعيد المحددة.</li></ul>",
                contentEn:
                    "<ul><li>Hold a general education diploma or equivalent qualification.</li><li>Meet the minimum GPA required for the chosen program.</li><li>Pass admission tests when applicable.</li><li>Submit all required documents within the stated deadlines.</li></ul>",
            },
        ],
    ),
    step(
        "ug-docs",
        "02",
        "المستندات المطلوبة",
        "Required Documents",
        "المستندات المطلوبة",
        "Required Documents",
        [
            {
                id: "ug-docs-list",
                titleAr: "قائمة المستندات",
                titleEn: "Document Checklist",
                contentAr:
                    "<ul><li>نسخة من شهادة الدبلوم العام وكشف الدرجات.</li><li>نسخة من البطاقة الشخصية أو جواز السفر.</li><li>صور شخصية حديثة.</li><li>شهادة إجادة اللغة الإنجليزية عند الحاجة.</li></ul>",
                contentEn:
                    "<ul><li>Copy of high school certificate and transcript.</li><li>Copy of national ID or passport.</li><li>Recent personal photographs.</li><li>English proficiency certificate when required.</li></ul>",
            },
        ],
    ),
    step(
        "ug-fees",
        "03",
        "الرسوم والمساعدات",
        "Fees & Financial Aid",
        "الرسوم والمساعدات المالية",
        "Fees & Financial Aid",
        [
            {
                id: "ug-fees-info",
                titleAr: "الرسوم والخصومات",
                titleEn: "Fees and Discounts",
                contentAr:
                    "<p>تختلف الرسوم الدراسية حسب البرنامج والتخصص. يمكن للطلبة المؤهلين الاستفادة من خصومات ومساعدات مالية وفق سياسات الكلية.</p>",
                contentEn:
                    "<p>Tuition fees vary by program and major. Eligible students may benefit from discounts and financial aid according to college policies.</p>",
            },
        ],
    ),
    step(
        "ug-apply",
        "04",
        "التقديم الإلكتروني",
        "Online Application",
        "التقديم الإلكتروني",
        "Online Application",
        [
            {
                id: "ug-apply-link",
                titleAr: "كيفية التقديم",
                titleEn: "How to Apply",
                contentAr:
                    '<p>يمكنك التقديم عبر بوابة القبول الإلكترونية في كلية البريمي الجامعية. تأكد من إكمال جميع الحقول وإرفاق المستندات قبل إرسال الطلب.</p><p><a href="/main/admission/details">المزيد عن إجراءات التقديم</a></p>',
                contentEn:
                    '<p>Apply through Al Buraimi University College online admissions portal. Complete all fields and attach documents before submitting your application.</p><p><a href="/main/admission/details">More about application procedures</a></p>',
            },
        ],
    ),
]

const graduateSteps: AdmissionStep[] = [
    step(
        "gr-req",
        "01",
        "متطلبات القبول",
        "Admission Requirements",
        "متطلبات القبول",
        "Admission Requirements",
        [
            {
                id: "gr-req-master",
                titleAr: "القبول لبرامج الماجستير",
                titleEn: "Master's Programs Admission",
                contentAr:
                    "<ul><li>درجة البكالوريوس من جامعة معترف بها بمعدل لا يقل عن 2.5 من 4.</li><li>استيفاء شرط الكفاءة في اللغة الإنجليزية عند الحاجة.</li><li>اجتياز المقابلة الشخصية عند طلب القسم الأكاديمي.</li></ul>",
                contentEn:
                    "<ul><li>Bachelor's degree from a recognized university with a GPA of at least 2.5/4.0.</li><li>Meet English proficiency requirements when applicable.</li><li>Pass a personal interview when required by the academic department.</li></ul>",
            },
        ],
    ),
    step(
        "gr-docs",
        "02",
        "المستندات المطلوبة",
        "Required Documents",
        "المستندات المطلوبة",
        "Required Documents",
        [
            {
                id: "gr-docs-list",
                titleAr: "المستندات المطلوبة للدراسات العليا",
                titleEn: "Graduate Required Documents",
                contentAr:
                    "<ul><li>نسخة مصدقة من شهادة البكالوريوس وكشف الدرجات.</li><li>السيرة الذاتية ورسالتي تزكية.</li><li>نسخة من جواز السفر والهوية.</li><li>شهادة إجادة اللغة الإنجليزية عند الحاجة.</li></ul>",
                contentEn:
                    "<ul><li>Certified copy of bachelor's degree and transcript.</li><li>CV and two recommendation letters.</li><li>Copy of passport and ID.</li><li>English proficiency certificate when required.</li></ul>",
            },
        ],
    ),
    step(
        "gr-lang",
        "03",
        "لغة الدراسة",
        "Language of Instruction",
        "لغة الدراسة",
        "Language of Instruction",
        [
            {
                id: "gr-lang-info",
                titleAr: "لغة التدريس",
                titleEn: "Instruction Language",
                contentAr:
                    "<p>تُدرَّس برامج الدراسات العليا في كلية البريمي الجامعية باللغة العربية أو الإنجليزية حسب طبيعة البرنامج والتخصص.</p>",
                contentEn:
                    "<p>Graduate programs at Al Buraimi University College are taught in Arabic or English depending on the program and specialization.</p>",
            },
        ],
    ),
    step(
        "gr-apply",
        "04",
        "التقديم الإلكتروني",
        "Online Application",
        "التقديم الإلكتروني",
        "Online Application",
        [
            {
                id: "gr-apply-link",
                titleAr: "التقديم للدراسات العليا",
                titleEn: "Apply for Graduate Studies",
                contentAr:
                    '<p>للاطلاع على البرامج المتاحة والتقديم، يمكنك زيارة صفحة الدراسات العليا.</p><p><a href="/main/graduate-studies">برامج الدراسات العليا</a></p>',
                contentEn:
                    '<p>To explore available programs and apply, visit the Graduate Studies page.</p><p><a href="/main/graduate-studies">Graduate Studies Programs</a></p>',
            },
        ],
    ),
]

function programCard(
    id: string,
    titleAr: string,
    titleEn: string,
    image: string,
    detailHeroDesktop: string,
    detailHeroMobile: string,
    steps: AdmissionStep[],
): AdmissionProgramCard {
    return {
        id,
        titleAr,
        titleEn,
        image,
        href: admissionProgramPath(id),
        buttonTextAr: "اقرأ المزيد",
        buttonTextEn: "Read more",
        detailHeroImageDesktop: detailHeroDesktop,
        detailHeroImageMobile: detailHeroMobile,
        stepsSectionTitleAr: "خطوات القبول",
        stepsSectionTitleEn: "Admission Steps",
        steps,
    }
}

export const admissionPageSeed = {
    heroTitleAr: "قدّم طلبك",
    heroTitleEn: "Apply Now",
    heroImageDesktop: "/assets/e5066bb78bcc5febdd38697aa9400a49db729215.png",
    heroImageMobile: "/assets/studentsImage.webp",
    introTitleAr: "القبول في كلية البريمي الجامعية",
    introTitleEn: "Admissions at Al Buraimi University College",
    introTextAr:
        "اختر المسار الأكاديمي المناسب لك واستكشف متطلبات القبول والرسوم والمساعدات المالية لكل مرحلة دراسية.",
    introTextEn:
        "Choose the academic path that suits you and explore admission requirements, fees, and financial aid for each study level.",
    programs: [
        programCard(
            "undergraduate",
            "البكالوريوس",
            "Undergraduate",
            "/assets/studentsImage.webp",
            "/assets/e5066bb78bcc5febdd38697aa9400a49db729215.png",
            "/assets/studentsImage.webp",
            undergraduateSteps,
        ),
        programCard(
            "graduate",
            "الدراسات العليا",
            "Graduate Studies",
            "/assets/campusWelcomeImage.webp",
            "/assets/campusWelcomeImage.webp",
            "/assets/campusWelcomeImage.webp",
            graduateSteps,
        ),
    ],
}
