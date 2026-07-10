import type { AdmissionDetailsType } from "@/types/admissionDetails";

export const AdmissionDetailsData: AdmissionDetailsType = {
    undergraduateFees: [
        { program: 'برنامج اللغة الانجليزية وآدابها', admission: '100 R.O', perCredit: '56.100 ريال / للساعة' },
        { program: 'برنامج الترجمة', admission: '100 R.O', perCredit: '56.100 ريال / للساعة' },
        { program: 'برنامج المحاسبة', admission: '100 R.O', perCredit: '66.300 ريال / للساعة' },
        { program: 'برنامج تنمية الموارد البشرية', admission: '100 R.O', perCredit: '56.100 ريال / للساعة' },
        { program: 'برنامج إدارة الأعمال', admission: '100 R.O', perCredit: '56.100 ريال / للساعة' },
        { program: 'برنامج العلوم المالية والمصرفية', admission: '100 R.O', perCredit: '66.300 ريال / للساعة' },
        { program: 'التسويق', admission: '100 R.O', perCredit: '56.100 ريال / للساعة' },
        { program: 'برنامج التجارة الدولية', admission: '100 R.O', perCredit: '56.100 ريال / للساعة' },
        { program: 'برنامج اقتصاد الأعمال', admission: '100 R.O', perCredit: '65.000 ريال / للساعة' },
        { program: 'برنامج نظم المعلومات', admission: '100 R.O', perCredit: '66.300 ريال / للساعة' },
        { program: 'برنامج علوم الحاسب', admission: '100 R.O', perCredit: '66.300 ريال / للساعة' },
        { program: 'برنامج هندسة البرمجيات', admission: '100 R.O', perCredit: '66.300 ريال / للساعة' },
        { program: 'الذكاء الاصطناعي', admission: '100 R.O', perCredit: '66.300 ريال / للساعة' },
        { program: 'الأمن السيبراني', admission: '100 R.O', perCredit: '66.300 ريال / للساعة' },
        { program: 'القانون', admission: '100 R.O', perCredit: '66.300 ريال / للساعة' }
    ],
    graduateFees: [
        { program: 'ماجستير القانون', admission: '150 R.O', perCredit: '130.000 ريال / للساعة' },
        { program: 'ماجستير إدارة الأعمال MBA', admission: '150 R.O', perCredit: '130.000 ريال / للساعة' },
        { program: 'الدكتوراة في القانون', admission: '150 R.O', perCredit: '150.000 ريال / للساعة' }
    ],

    scholarships: [
        { id: 1, title: 'الطلبة المتفوقين في شهادة الدبلوم العام', percentage: '10%' },
        { id: 2, title: 'الطلبة المتفوقين دراسيًا في البرامج الأكاديمية بالكلية', percentage: '10%' },
        { id: 3, title: 'موظفي المجلس الأعلى للقضاء - لدرجة الدكتوراه', percentage: '10%' },
        { id: 4, title: 'الطلبة المسددين لكافة الرسوم الدراسية مسبقاً', percentage: '10%' },
        { id: 5, title: 'شرطة عمان السلطانية وذويهم - لدرجة الدكتوراه', percentage: '10%' },
        { id: 6, title: 'حاملي بطاقة "إسعاد" للطلبة الجدد - للدراسات العليا', percentage: '10%' },
        { id: 7, title: 'حاملي بطاقة" فزعة" للطلبة الجدد - للدراسات العليا', percentage: '10%' },
        { id: 8, title: 'حاملي بطاقة" تستاهل" للطلبة الجدد - للدراسات العليا', percentage: '10%' },
        { id: 9, title: 'أبناء موظفي القطاع الخاص والمتقاعدين منهم وأقاربهم من الدرجة الأولى', percentage: '15%' },
        { id: 10, title: 'طلبة الضمان الإجتماعي', percentage: '20%' },
        { id: 11, title: 'الطلبة الدوليين', percentage: '20%' },
        { id: 12, title: 'طلبة البعثات الداخلية والمنتهية بعثاتهم والراغبين في استكمال دراستهم لدرجة البكالوريوس', percentage: '20%' },
        { id: 13, title: 'خريجي الدبلوم الراغبين في استكمال دراستهم لدرجة البكالوريوس', percentage: '20%' },
        { id: 14, title: 'موظفي المجلس الأعلى للقضاء - لدرجة الماجستير', percentage: '20%' },
        { id: 15, title: 'شرطة عمان السلطانية وذويهم - لدرجة الماجستير', percentage: '20%' },
        { id: 16, title: 'وزارة الدفاع وذويهم', percentage: '20%' },
        { id: 17, title: 'ديوان البلاط السلطاني وذويهم', percentage: '20%' },
        { id: 18, title: 'وزارة الصحة وذويهم', percentage: '20%' },
        { id: 19, title: 'وزارة التربية والتعليم وذويهم', percentage: '20%' },
        { id: 20, title: 'موظفي غرفة تجارة وصناعة عمان وذويهم', percentage: '20%' },
        { id: 21, title: 'موظفي شركة مزون للألبان وعائلاتهم', percentage: '20%' },
        { id: 22, title: 'المؤسسة العامة للمناطق الصناعية (مدائن) وذويهم', percentage: '20%' },
        { id: 23, title: 'أبناء محافظة مسندم', percentage: '20%' },
        { id: 24, title: 'المحامين المسجلين - لدرجة الماجستير', percentage: '20%' },
        { id: 25, title: 'وزارة الأوقاف والشؤون الدينية وذويهم', percentage: '20%' },
        { id: 26, title: 'حاملي بطاقة "إسعاد" للطلبة الجدد- لدرجة البكالوريوس', percentage: '20%' },
        { id: 27, title: 'حاملي بطاقة" فزعة" للطلبة الجدد - لدرجة البكالوريوس', percentage: '20%' },
        { id: 28, title: 'حاملي بطاقة " تستاهل" للطلبة الجدد - لدرجة البكالوريوس', percentage: '20%' },
        { id: 29, title: 'شرطة عمان السلطانية وذويهم - لدرجة البكالوريوس', percentage: '25%' },
        { id: 30, title: 'موظفي المجلس الأعلى للقضاء - لدرجة البكالوريوس', percentage: '30%' },
        { id: 31, title: 'الأشخاص ذوي الاحتياجات الخاصة وأبنائهم', percentage: '30%' },
        { id: 32, title: 'موظفي كلية البريمي الجامعية وأبنائهم وزوجاتهم', percentage: '30%' }
    ]
}
