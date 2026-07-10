import { Award, BookOpen, FileText, GraduationCap } from "lucide-react";

export const undergraduateFees = [
    { programEn: 'English Language and Literature Program', programAr: 'برنامج اللغة الإنجليزية وآدابها', admission: '100 R.O', perCredit: '56.100 OMR / Credit Hour' },
    { programEn: 'Translation Program', programAr: 'برنامج الترجمة', admission: '100 R.O', perCredit: '56.100 OMR / Credit Hour' },
    { programEn: 'Accounting Program', programAr: 'برنامج المحاسبة', admission: '100 R.O', perCredit: '66.300 OMR / Credit Hour' },
    { programEn: 'Human Resource Development Program', programAr: 'برنامج تطوير الموارد البشرية', admission: '100 R.O', perCredit: '56.100 OMR / Credit Hour' },
    { programEn: 'Business Administration Program', programAr: 'برنامج إدارة الأعمال', admission: '100 R.O', perCredit: '56.100 OMR / Credit Hour' },
    { programEn: 'Banking and Financial Sciences Program', programAr: 'برنامج البنوك والعلوم المالية', admission: '100 R.O', perCredit: '66.300 OMR / Credit Hour' },
    { programEn: 'Marketing', programAr: 'التسويق', admission: '100 R.O', perCredit: '56.100 OMR / Credit Hour' },
    { programEn: 'International Trade Program', programAr: 'برنامج التجارة الدولية', admission: '100 R.O', perCredit: '56.100 OMR / Credit Hour' },
    { programEn: 'Business Economics Program', programAr: 'برنامج اقتصاديات الأعمال', admission: '100 R.O', perCredit: '65.000 OMR / Credit Hour' },
    { programEn: 'Information Systems Program', programAr: 'برنامج أنظمة المعلومات', admission: '100 R.O', perCredit: '66.300 OMR / Credit Hour' },
    { programEn: 'Computer Science Program', programAr: 'برنامج علوم الحاسب', admission: '100 R.O', perCredit: '66.300 OMR / Credit Hour' },
    { programEn: 'Software Engineering Program', programAr: 'برنامج هندسة البرمجيات', admission: '100 R.O', perCredit: '66.300 OMR / Credit Hour' },
    { programEn: 'Artificial Intelligence', programAr: 'الذكاء الاصطناعي', admission: '100 R.O', perCredit: '66.300 OMR / Credit Hour' },
    { programEn: 'Cybersecurity', programAr: 'الأمن السيبراني', admission: '100 R.O', perCredit: '66.300 OMR / Credit Hour' },
    { programEn: 'Law', programAr: 'القانون', admission: '100 R.O', perCredit: '66.300 OMR / Credit Hour' }
];

export const graduateFees = [
    { programEn: 'Master of Law', programAr: 'ماجستير القانون', admission: '150 R.O', perCredit: '130.000 OMR / Credit Hour' },
    { programEn: 'Master of Business Administration MBA', programAr: 'ماجستير إدارة الأعمال MBA', admission: '150 R.O', perCredit: '130.000 OMR / Credit Hour' },
    { programEn: 'PhD in Law', programAr: 'دكتوراه في القانون', admission: '150 R.O', perCredit: '150.000 OMR / Credit Hour' }
];

export const scholarships = [
    { id: 1, titleEn: 'Top Students in General Diploma Certificate', titleAr: 'الطلبة الأوائل في شهادة الدبلوم العام', percentage: '10%' },
    { id: 2, titleEn: 'Academically Outstanding Students in College Programs', titleAr: 'الطلبة المتفوقون أكاديمياً في برامج الكلية', percentage: '10%' },
    { id: 3, titleEn: 'Employees of the Supreme Judicial Council - PhD Level', titleAr: 'موظفو المجلس الأعلى للقضاء - مستوى الدكتوراه', percentage: '10%' },
    { id: 4, titleEn: 'Students Paying All Tuition Fees in Advance', titleAr: 'الطلبة الذين يدفعون جميع الرسوم الدراسية مقدماً', percentage: '10%' },
    { id: 5, titleEn: 'Royal Oman Police and Their Relatives - PhD Level', titleAr: 'شرطة عمان السلطانية وذويهم - مستوى الدكتوراه', percentage: '10%' },
    { id: 6, titleEn: 'Holders of "Isaad" Card for New Students - Graduate Studies', titleAr: 'حاملي بطاقة "إسعاد" للطلبة الجدد - الدراسات العليا', percentage: '10%' },
    { id: 7, titleEn: 'Holders of "Fazaa" Card for New Students - Graduate Studies', titleAr: 'حاملي بطاقة "فزع" للطلبة الجدد - الدراسات العليا', percentage: '10%' },
    { id: 8, titleEn: 'Holders of "Tastahel" Card for New Students - Graduate Studies', titleAr: 'حاملي بطاقة "أستحل" للطلبة الجدد - الدراسات العليا', percentage: '10%' },
    { id: 9, titleEn: 'Private Sector Employees and Their Retirees and First-Degree Relatives', titleAr: 'موظفي القطاع الخاص والمتقاعدين منهم وذويهم من الدرجة الأولى', percentage: '15%' },
    { id: 10, titleEn: 'Social Security Students', titleAr: 'طلبة الضمان الاجتماعي', percentage: '20%' },
    { id: 11, titleEn: 'International Students', titleAr: 'الطلبة الدوليين', percentage: '20%' },
    { id: 12, titleEn: 'Internal Scholarship Students and Those Whose Scholarships Have Ended and Wish to Continue Bachelor\'s Degree', titleAr: 'طلبة المنح الداخلية ومن انتهت منحهم ويرغبون في استكمال البكالوريوس', percentage: '20%' },
    { id: 13, titleEn: 'Diploma Graduates Wishing to Continue Bachelor\'s Degree', titleAr: 'خريجي الدبلوم الراغبين في استكمال البكالوريوس', percentage: '20%' },
    { id: 14, titleEn: 'Employees of the Supreme Judicial Council - Master\'s Level', titleAr: 'موظفو المجلس الأعلى للقضاء - مستوى الماجستير', percentage: '20%' },
    { id: 15, titleEn: 'Royal Oman Police and Their Relatives - Master\'s Level', titleAr: 'شرطة عمان السلطانية وذويهم - مستوى الماجستير', percentage: '20%' },
    { id: 16, titleEn: 'Ministry of Defense and Their Relatives', titleAr: 'وزارة الدفاع وذويهم', percentage: '20%' },
    { id: 17, titleEn: 'Diwan of Royal Court and Their Relatives', titleAr: 'ديوان البلاط السلطاني وذويهم', percentage: '20%' },
    { id: 18, titleEn: 'Ministry of Health and Their Relatives', titleAr: 'وزارة الصحة وذويهم', percentage: '20%' },
    { id: 19, titleEn: 'Ministry of Education and Their Relatives', titleAr: 'وزارة التربية والتعليم وذويهم', percentage: '20%' },
    { id: 20, titleEn: 'Employees of Oman Chamber of Commerce and Industry and Their Relatives', titleAr: 'موظفي غرفة تجارة وصناعة عمان وذويهم', percentage: '20%' },
    { id: 21, titleEn: 'Employees of Mazoon Dairy Company and Their Families', titleAr: 'موظفي شركة مازون للألبان وأسرهم', percentage: '20%' },
    { id: 22, titleEn: 'Public Establishment for Industrial Estates (Madayn) and Their Relatives', titleAr: 'الهيئة العامة للمناطق الصناعية (مدائن) وذويهم', percentage: '20%' },
    { id: 23, titleEn: 'Sons of Musandam Governorate', titleAr: 'أبناء محافظة مسندم', percentage: '20%' },
    { id: 24, titleEn: 'Registered Lawyers - Master\'s Level', titleAr: 'المحامين المسجلين - مستوى الماجستير', percentage: '20%' },
    { id: 25, titleEn: 'Ministry of Awqaf and Religious Affairs and Their Relatives', titleAr: 'وزارة الأوقاف والشؤون الدينية وذويهم', percentage: '20%' },
    { id: 26, titleEn: 'Holders of "Isaad" Card for New Students - Bachelor\'s Level', titleAr: 'حاملي بطاقة "إسعاد" للطلبة الجدد - مستوى البكالوريوس', percentage: '20%' },
    { id: 27, titleEn: 'Holders of "Fazaa" Card for New Students - Bachelor\'s Level', titleAr: 'حاملي بطاقة "فزع" للطلبة الجدد - مستوى البكالوريوس', percentage: '20%' },
    { id: 28, titleEn: 'Holders of "Tastahel" Card for New Students - Bachelor\'s Level', titleAr: 'حاملي بطاقة "أستحل" للطلبة الجدد - مستوى البكالوريوس', percentage: '20%' },
    { id: 29, titleEn: 'Royal Oman Police and Their Relatives - Bachelor\'s Level', titleAr: 'شرطة عمان السلطانية وذويهم - مستوى البكالوريوس', percentage: '25%' },
    { id: 30, titleEn: 'Employees of the Supreme Judicial Council - Bachelor\'s Level', titleAr: 'موظفو المجلس الأعلى للقضاء - مستوى البكالوريوس', percentage: '30%' },
    { id: 31, titleEn: 'People with Special Needs and Their Children', titleAr: 'ذوي الإعاقة وأبناؤهم', percentage: '30%' },
    { id: 32, titleEn: 'Employees of University of Buraimi and Their Children and Wives', titleAr: 'موظفي جامعة البريمي وأبناؤهم وزوجاتهم', percentage: '30%' }
];

export const studentGuides = [
    {
        titleEn: 'Student Guide for Undergraduate Level',
        titleAr: 'دليل الطالب للمرحلة الجامعية الأولى',
        icon: BookOpen,
        pdfUrl: 'https://heyzine.com/flip-book/ef74596e30.html',
    },
    {
        titleEn: 'Student Guide for Master in Management Program',
        titleAr: 'دليل الطالب لبرنامج الماجستير في الإدارة',
        icon: GraduationCap,
        pdfUrl: 'https://heyzine.com/flip-book/fe13d880ba.html',
    },
    {
        titleEn: 'Student Guide for Master of Law Program',
        titleAr: 'دليل الطالب لبرنامج الماجستير في القانون',
        icon: FileText,
        pdfUrl: 'https://heyzine.com/flip-book/591a82274d.html',
    },
    {
        titleEn: 'Student Guide for PhD in Law Program',
        titleAr: 'دليل الطالب لبرنامج الدكتوراة في القانون',
        icon: Award,
        pdfUrl: 'https://heyzine.com/flip-book/3572a2c05e.html',
    },
];
