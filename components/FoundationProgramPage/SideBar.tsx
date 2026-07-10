"use client"
import { Award, BookOpen, Calculator, ClipboardCheck, FileText, GraduationCap, Target, Users } from "lucide-react";
import { useLocale } from "next-intl";

export default function FoundSideBar(
    { setActiveSidebarItem  , activeSidebarItem }: {
        setActiveSidebarItem: (id: string) => void, 
        activeSidebarItem :string
    }
) {


    const sidebarItems = [
        { id: 'overview', labelEn: "General Foundation Program", labelAr: 'البرنامج التأسيسي العام', icon: BookOpen },
        { id: 'admission', labelEn: "Admission Instructions", labelAr: 'تعليمات قبول الطلبة', icon: ClipboardCheck },
        { id: 'vision', labelEn: "Vision, Mission, and Goals", labelAr: 'الرؤية والرسالة والأهداف', icon: Target },
        { id: 'level1', labelEn: "Foundation Program - Level 1", labelAr: 'البرنامج التأسيسي - المستوى الأول', icon: GraduationCap },
        { id: 'level2', labelEn: "Foundation Program - Level 2", labelAr: 'البرنامج التأسيسي - المستوى الثاني', icon: GraduationCap },
        { id: 'completion', labelEn: "Completion Exam", labelAr: 'امتحان إكمال متطلبات البرنامج التأسيسي', icon: FileText },
        { id: 'math-exam', labelEn: "Mathematics Completion Exam", labelAr: 'امتحان إنهاء متطلب الرياضيات', icon: Calculator },
        { id: 'oxford-test', labelEn: "Oxford Level Test", labelAr: 'اختبار تحديد المستوى من أكسفورد', icon: Award },
        { id: 'practice-test', labelEn: "Practice Level Test", labelAr: 'امتحان تحديد المستوى - تدريبي', icon: ClipboardCheck },
        { id: 'faculty', labelEn: "Faculty", labelAr: 'أعضاء الهيئة التدريسية', icon: Users }
    ];


    const scrollToSection = (id: string) => {
        setActiveSidebarItem(id);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const locale = useLocale()

    const getLabel = (labelAr: string, labelEn: string) => {
        return locale === 'ar' ? labelAr : labelEn;
    }

    return (
        <aside className="w-80 flex-shrink-0">
            <div className="sticky top-8">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-200">
                    <div className="bg-gradient-to-r from-[#254151] to-[#6096b4] text-white p-6 text-center">
                        <h3 className="text-2xl font-bold">نظرة عامة</h3>
                    </div>
                    <nav className="p-4">
                        {sidebarItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`w-full text-right p-4 rounded-lg mb-2 transition-all flex items-center gap-3 ${activeSidebarItem === item.id
                                    ? 'bg-[#254151] text-white'
                                    : 'hover:bg-gray-100 text-gray-700'
                                    }`}
                            >
                                <item.icon className="size-5 flex-shrink-0" />
                                <span className="text-sm leading-snug">{getLabel(item.labelAr, item.labelEn)}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Foundation Image */}
                <div className="mt-6 bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-200">
                    {/* <img
                        src={foundationImage}
                        alt="نظرة عامة البرنامج التأسيسي"
                        className="w-full h-auto"
                    /> */}
                </div>
            </div>
        </aside>
    )
}