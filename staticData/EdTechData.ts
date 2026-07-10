import { Database, FileCheck, Laptop, Monitor, CheckCircle, Globe, Server, BookOpen } from "lucide-react";

export const edTechStatsData = [
    {
        count: 25,
        titleAr: "سبورة ذكية",
        titleEn: "Smart Boards",
    },
    {
        count: 35,
        titleAr: "سبورة تفاعلية",
        titleEn: "Interactive Boards",
    },
    {
        count: 8,
        titleAr: "مختبرات ذكية",
        titleEn: "Smart Labs",
    },
    {
        count: 410,
        titleAr: "جهاز حاسب الي",
        titleEn: "Computers",
    }
]

export const EdTechSystems = {
    ar: [
        {
            icon: Monitor,
            title: 'أنظمة إدارة التعلم',
            description: 'تعمل أنظمة إدارة التعلم على تبسيط إدارة التدريس، وتسهيل التواصل عبر رسائل البريد الإلكتروني وتوفير منصة مركزية للمهام والواجبات. تم دمج نظام Turnitin مع Moodle للكشف عن الانتحال في الأعمال المقدمة من الطلاب.',
            color: 'from-[#6096b4] to-[#254151]',
            features: ['Moodle', 'Turnitin', 'البريد الإلكتروني', 'المهام والواجبات'],
        },
        {
            icon: Laptop,
            title: 'السبورة الذكية والتفاعلية',
            description: 'تعمل السبورة الذكية والسبورة التفاعلية على إثراء التفاعلات داخل الفصول الدراسية، مما يسمح بتقديم عروض ديناميكية والتعلم التعاوني.',
            color: 'from-[#c2a772] to-[#6096b4]',
            features: ['عروض تفاعلية', 'التعلم التعاوني', 'محتوى ديناميكي', 'تفاعل فعال'],
        },
        {
            icon: Database,
            title: 'مختبرات الكمبيوتر الحديثة',
            description: 'توفر مختبرات الكمبيوتر الحديثة المجهزة بالإنترنت السريع والتكنولوجيا المتقدمة للطلاب الموارد الأساسية لتطوير مهارات معرفة القراءة والكتابة الرقمية.',
            color: 'from-[#254151] to-[#6096b4]',
            features: ['إنترنت سريع', 'تكنولوجيا متقدمة', 'مهارات رقمية', 'موارد شاملة'],
        },
        {
            icon: FileCheck,
            title: 'أنظمة معلومات الطلاب (SIS)',
            description: 'تساعد أنظمة معلومات الطلاب (SIS) في إدارة بيانات الطلاب، وتتبع التسجيل، والدرجات، والإرشاد الطلابي، والتقدم الأكاديمي بكفاءة.',
            color: 'from-[#6096b4] to-[#c2a772]',
            features: ['إدارة البيانات', 'التسجيل', 'الدرجات', 'الإرشاد الطلابي'],
        },
    ],
    en: [
        {
            icon: Monitor,
            title: 'Learning Management Systems',
            description: 'Learning management systems streamline teaching management, facilitate communication via email, and provide a central platform for tasks and assignments. The Turnitin system is integrated with Moodle to detect plagiarism in student submissions.',
            color: 'from-[#6096b4] to-[#254151]',
            features: ['Moodle', 'Turnitin', 'Email', 'Tasks and Assignments'],
        },
        {
            icon: Laptop,
            title: 'Smart and Interactive Boards',
            description: 'Smart boards and interactive boards enrich interactions within classrooms, allowing for dynamic presentations and collaborative learning.',
            color: 'from-[#c2a772] to-[#6096b4]',
            features: ['Interactive Presentations', 'Collaborative Learning', 'Dynamic Content', 'Effective Interaction'],
        },
        {
            icon: Database,
            title: 'Modern Computer Labs',
            description: 'Modern computer labs equipped with fast internet and advanced technology provide students with essential resources to develop digital literacy skills.',
            color: 'from-[#254151] to-[#6096b4]',
            features: ['Fast Internet', 'Advanced Technology', 'Digital Skills', 'Comprehensive Resources'],
        },
        {
            icon: FileCheck,
            title: 'Student Information Systems (SIS)',
            description: 'Student Information Systems (SIS) help manage student data, track registration, grades, student counseling, and academic progress efficiently.',
            color: 'from-[#6096b4] to-[#c2a772]',
            features: ['Data Management', 'Registration', 'Grades', 'Student Counseling'],
        },
    ],
};

export const EdTechInfrastructure = {
    ar: [
        { icon: Laptop, count: '410', label: 'جهاز حاسب آلي', color: 'bg-[#6096b4]' },
        { icon: Database, count: '8', label: 'مختبرات الكمبيوتر', color: 'bg-[#c2a772]' },
        { icon: Monitor, count: '35', label: 'سبورة تفاعلية', color: 'bg-[#254151]' },
        { icon: Monitor, count: '25', label: 'سبورة ذكية', color: 'bg-[#6096b4]' },
    ],
    en: [
        { icon: Laptop, count: '410', label: 'Computers', color: 'bg-[#6096b4]' },
        { icon: Database, count: '8', label: 'Computer Labs', color: 'bg-[#c2a772]' },
        { icon: Monitor, count: '35', label: 'Interactive Boards', color: 'bg-[#254151]' },
        { icon: Monitor, count: '25', label: 'Smart Boards', color: 'bg-[#6096b4]' },
    ],
};

export const EdTechOMREN = {
    ar: {
        paragraphs: [
            'الشبكة العمانية للبحث العلمي والتعليم (OMREN) هي شبكة اتصالات مخصصة عالية السرعة وفعالة تربط المؤسسات البحثية والأكاديمية ببعضها البعض محلياً وبشبكات بحثية إقليمية وعالمية.',
            'تعمل على بناء القدرات البحثية والقدرات المحلية في مختلف المجالات العلمية، تنفيذاً للأهداف الاستراتيجية الوطنية للبحث العلمي في سلطنة عمان في توفير بيئة محفزة للباحثين وإثراء التعاون البحثي والتعليمي.',
            'تمكن شبكة الاتصالات عالية السرعة المؤسسات التعليمية والبحثية في السلطنة من الحصول على خدمات اتصال متقدمة ومنصات وتطبيقات موحدة لتحفيز الباحثين على تعزيز أنشطتهم البحثية وإثراء جودة البحث. تعد OMREN شبكة البحث والتعليم الرسمية في السلطنة والبوابة للوصول إلى الشبكات العالمية المماثلة.',
        ],
        features: [
            { icon: CheckCircle, title: 'شبكة عالية السرعة', subtitle: 'اتصالات سريعة وفعالة' },
            { icon: CheckCircle, title: 'ربط دولي', subtitle: 'اتصال بالشبكات العالمية' },
            { icon: CheckCircle, title: 'تعزيز البحث', subtitle: 'دعم الأنشطة البحثية' },
        ],
    },
    en: {
        paragraphs: [
            'The Oman Research and Education Network (OMREN) is a dedicated, high-speed, and efficient communication network that connects research and academic institutions locally and to regional and global research networks.',
            'It works to build research capacities and local capabilities in various scientific fields, in implementation of the national strategic objectives for scientific research in the Sultanate of Oman in providing an stimulating environment for researchers and enriching research and educational cooperation.',
            'The high-speed communication network enables educational and research institutions in the Sultanate to obtain advanced communication services and unified platforms and applications to motivate researchers to enhance their research activities and enrich research quality. OMREN is the official research and education network in the Sultanate and the gateway to access similar global networks.',
        ],
        features: [
            { icon: CheckCircle, title: 'High-Speed Network', subtitle: 'Fast and efficient communications' },
            { icon: CheckCircle, title: 'International Connectivity', subtitle: 'Connection to global networks' },
            { icon: CheckCircle, title: 'Research Enhancement', subtitle: 'Supporting research activities' },
        ],
    },
};

export const EdTechMasader = {
    ar: {
        description: 'مصادر هي بوابة إلكترونية تتيح للباحثين والطلاب الوصول إلى مختلف أنواع المصادر والكتب الإلكترونية والمجلات والمعلومات في أي وقت وأي مكان. مصادر متصلة بقواعد بيانات عالمية معروفة مثل EBSCO و ICE و IGI و IET و IEEE و "دار المنظومة" التي تحتوي على كتب عربية.',
        providers: [
            { icon: Globe, name: 'EBSCO', desc: 'قاعدة بيانات شاملة' },
            { icon: Server, name: 'IEEE', desc: 'الأبحاث الهندسية' },
            { icon: BookOpen, name: 'دار المنظومة', desc: 'كتب عربية' },
            { icon: Database, name: 'IGI Global', desc: 'مصادر أكاديمية' },
            { icon: Globe, name: 'IET', desc: 'الهندسة والتكنولوجيا' },
            { icon: BookOpen, name: 'ICE', desc: 'مصادر متخصصة' },
        ],
    },
    en: {
        description: 'Masader is an electronic portal that enables researchers and students to access various types of sources, electronic books, journals, and information anytime and anywhere. Masader is connected to well-known global databases such as EBSCO, ICE, IGI, IET, IEEE, and "Dar Al-Mandumah" which contains Arabic books.',
        providers: [
            { icon: Globe, name: 'EBSCO', desc: 'Comprehensive database' },
            { icon: Server, name: 'IEEE', desc: 'Engineering research' },
            { icon: BookOpen, name: 'Dar Al-Mandumah', desc: 'Arabic books' },
            { icon: Database, name: 'IGI Global', desc: 'Academic sources' },
            { icon: Globe, name: 'IET', desc: 'Engineering and technology' },
            { icon: BookOpen, name: 'ICE', desc: 'Specialized sources' },
        ],
    },
};
