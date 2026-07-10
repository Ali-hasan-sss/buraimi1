import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { PrivacyPolicyModel } from '@/models/PrivacyPolicy';

const SEED_DATA = {
    studentTitleAr: 'سياسة الخصوصية للطلاب',
    studentTitleEn: 'Student Privacy Policy',
    studentIntroAr:
        'تلتزم جامعة البريمي بحماية خصوصية طلابها والحفاظ على سرية بياناتهم الشخصية. تُوضّح هذه السياسة كيفية جمع المعلومات واستخدامها وحمايتها والحقوق المكفولة لكل طالب في هذا الشأن. بالتسجيل في الجامعة أو استخدام أنظمتها الإلكترونية فإن الطالب يُقرّ بقراءة هذه السياسة والموافقة على أحكامها.',
    studentIntroEn:
        'Buraimi University is committed to protecting the privacy of its students and maintaining the confidentiality of their personal data. This policy explains how information is collected, used, protected, and the rights guaranteed to each student. By enrolling in the university or using its electronic systems, the student acknowledges reading this policy and agreeing to its terms.',
    studentSections: [
        {
            id: 'stu-1',
            titleAr: 'المعلومات التي نجمعها',
            titleEn: 'Information We Collect',
            contentAr:
                'تقوم الجامعة بجمع المعلومات الشخصية الضرورية لأغراض التسجيل والتعليم، وتشمل:\n\n• الاسم الكامل وتاريخ الميلاد والجنسية وصورة الهوية الشخصية.\n• بيانات الاتصال: رقم الهاتف وعنوان البريد الإلكتروني والعنوان البريدي.\n• السجل الأكاديمي: الدرجات والمقررات المسجّلة والشهادات المكتسبة.\n• بيانات الدخول إلى الأنظمة الإلكترونية: رقم الطالب وكلمة المرور (مُشفَّرة).\n• بيانات مالية تتعلق بالرسوم الدراسية والمعاملات المالية.\n• بيانات تقنية عند استخدام البوابة الإلكترونية: عنوان IP وسجلات الدخول.',
            contentEn:
                'The university collects personal information necessary for registration and educational purposes, including:\n\n• Full name, date of birth, nationality, and ID photo.\n• Contact details: phone number, email address, and postal address.\n• Academic record: grades, enrolled courses, and earned qualifications.\n• Electronic system login credentials: student ID and password (encrypted).\n• Financial data related to tuition fees and transactions.\n• Technical data when using the e-portal: IP address and login logs.',
            order: 0,
        },
        {
            id: 'stu-2',
            titleAr: 'كيف نستخدم معلوماتك',
            titleEn: 'How We Use Your Information',
            contentAr:
                'تُستخدم البيانات الشخصية للطلاب للأغراض التالية حصراً:\n\n• إتمام إجراءات القبول والتسجيل والتخرج.\n• إصدار الجداول الدراسية وسجلات النتائج والشهادات الرسمية.\n• التواصل مع الطالب بشأن الأمور الأكاديمية والإدارية.\n• إدارة المنح الدراسية والدعم المالي.\n• ضمان الامتثال للوائح والتشريعات الأكاديمية المعتمدة.\n• تطوير جودة الخدمات التعليمية وتحسين تجربة الطالب.',
            contentEn:
                'Student personal data is used exclusively for the following purposes:\n\n• Completing admission, registration, and graduation procedures.\n• Issuing study schedules, grade records, and official certificates.\n• Communicating with students regarding academic and administrative matters.\n• Managing scholarships and financial aid.\n• Ensuring compliance with approved academic regulations and legislation.\n• Improving the quality of educational services and student experience.',
            order: 1,
        },
        {
            id: 'stu-3',
            titleAr: 'مشاركة البيانات مع أطراف ثالثة',
            titleEn: 'Sharing Data with Third Parties',
            contentAr:
                'لا تقوم الجامعة ببيع أو تأجير أو مشاركة البيانات الشخصية للطلاب مع أي جهة خارجية لأغراض تجارية. وقد تُشارك البيانات في الحالات التالية فقط:\n\n• الجهات الحكومية والهيئات الأكاديمية المعتمدة عند الحاجة القانونية.\n• مزودي الخدمات التقنية الذين يُشغّلون الأنظمة الإلكترونية للجامعة وفق اتفاقيات سرية صارمة.\n• جهات الاعتماد الأكاديمي المحلية والدولية لأغراض ضمان الجودة.',
            contentEn:
                'The university does not sell, rent, or share student personal data with any external party for commercial purposes. Data may only be shared in the following cases:\n\n• Government entities and accredited academic bodies when legally required.\n• Technology service providers who operate the university\'s electronic systems under strict confidentiality agreements.\n• Local and international academic accreditation bodies for quality assurance purposes.',
            order: 2,
        },
        {
            id: 'stu-4',
            titleAr: 'حقوق الطالب',
            titleEn: 'Student Rights',
            contentAr:
                'يتمتع كل طالب بالحقوق التالية فيما يخص بياناته الشخصية:\n\n• حق الوصول: الاطلاع على البيانات الشخصية المحفوظة لديه.\n• حق التصحيح: طلب تصحيح أي بيانات غير دقيقة أو ناقصة.\n• حق الاعتراض: الاعتراض على معالجة بياناته لأغراض بعينها.\n• حق سحب الموافقة: في الحالات التي تكون فيها المعالجة مبنية على الموافقة.\n\nللممارسة أي من هذه الحقوق يُرجى التواصل مع مكتب شؤون الطلاب أو إرسال طلب عبر البريد الإلكتروني الرسمي للجامعة.',
            contentEn:
                'Each student has the following rights regarding their personal data:\n\n• Right of Access: View the personal data held about them.\n• Right of Correction: Request correction of any inaccurate or incomplete data.\n• Right to Object: Object to the processing of their data for specific purposes.\n• Right to Withdraw Consent: In cases where processing is based on consent.\n\nTo exercise any of these rights, please contact the Student Affairs Office or send a request via the university\'s official email.',
            order: 3,
        },
        {
            id: 'stu-5',
            titleAr: 'أمان البيانات',
            titleEn: 'Data Security',
            contentAr:
                'تتخذ الجامعة جميع التدابير التقنية والتنظيمية المناسبة لحماية بيانات الطلاب من الوصول غير المصرح به أو الفقدان أو التلف، وتشمل هذه التدابير:\n\n• تشفير كلمات المرور باستخدام خوارزميات معتمدة.\n• بروتوكولات HTTPS لتأمين نقل البيانات.\n• التحكم في صلاحيات الوصول وفق مبدأ الحد الأدنى من الامتيازات.\n• مراجعات دورية للأنظمة الأمنية.\n• التدريب المنتظم للموظفين على ممارسات أمان المعلومات.',
            contentEn:
                'The university takes all appropriate technical and organisational measures to protect student data from unauthorised access, loss, or damage. These measures include:\n\n• Password encryption using approved algorithms.\n• HTTPS protocols to secure data transmission.\n• Access control based on the principle of least privilege.\n• Periodic reviews of security systems.\n• Regular staff training on information security practices.',
            order: 4,
        },
        {
            id: 'stu-6',
            titleAr: 'مدة الاحتفاظ بالبيانات',
            titleEn: 'Data Retention Period',
            contentAr:
                'تحتفظ الجامعة ببيانات الطلاب طوال فترة الدراسة وبعد التخرج وفق ما تقتضيه اللوائح الأكاديمية والقانونية المعمول بها. تُحتفظ بالسجلات الأكاديمية بصورة دائمة لاعتبارات التحقق من الشهادات، في حين تُحذف البيانات التشغيلية غير الضرورية بصفة دورية.',
            contentEn:
                'The university retains student data throughout the period of study and after graduation in accordance with applicable academic and legal regulations. Academic records are retained permanently for degree verification purposes, while unnecessary operational data is deleted periodically.',
            order: 5,
        },
        {
            id: 'stu-7',
            titleAr: 'الإشعارات وتحديثات السياسة',
            titleEn: 'Notifications and Policy Updates',
            contentAr:
                'تحتفظ الجامعة بحق تحديث هذه السياسة في أي وقت. سيتم إخطار الطلاب بأي تغييرات جوهرية عبر البريد الإلكتروني المسجّل أو البوابة الإلكترونية. يُنصح بمراجعة هذه الصفحة بانتظام للاطلاع على آخر التحديثات.',
            contentEn:
                'The university reserves the right to update this policy at any time. Students will be notified of any material changes via their registered email or the e-portal. It is recommended to review this page regularly for the latest updates.',
            order: 6,
        },
    ],

    staffTitleAr: 'سياسة الخصوصية للموظفين',
    staffTitleEn: 'Staff Privacy Policy',
    staffIntroAr:
        'تُقدّر جامعة البريمي خصوصية موظفيها وتلتزم بمعالجة بياناتهم الشخصية بمسؤولية وشفافية وفق المعايير والتشريعات السارية. تُحدد هذه الوثيقة أنواع البيانات التي تُعالجها الجامعة وأهدافها وحقوق الموظفين المرتبطة بها.',
    staffIntroEn:
        'Buraimi University values the privacy of its staff and is committed to processing their personal data responsibly and transparently in accordance with applicable standards and legislation. This document defines the types of data the university processes, its purposes, and the rights of employees related to it.',
    staffSections: [
        {
            id: 'stf-1',
            titleAr: 'البيانات التي نجمعها عن الموظفين',
            titleEn: 'Data We Collect About Staff',
            contentAr:
                'تجمع الجامعة البيانات الشخصية اللازمة لإدارة علاقة العمل، وتشمل:\n\n• البيانات الشخصية: الاسم الكامل، الجنسية، تاريخ الميلاد، الحالة الاجتماعية، صورة شخصية.\n• بيانات الاتصال: رقم الهاتف، البريد الإلكتروني الشخصي والمؤسسي، العنوان.\n• بيانات التوظيف: المسمى الوظيفي، القسم، تاريخ الانضمام، رقم الموظف.\n• البيانات المالية: الراتب والبدلات وبيانات الحساب البنكي لأغراض صرف الرواتب.\n• السجلات الأكاديمية والمهنية: المؤهلات، الخبرات، الشهادات المهنية.\n• سجلات الأداء والتدريب: التقييمات الدورية والدورات التدريبية المكتملة.\n• بيانات الدخول التقنية: رقم الموظف، كلمة المرور (مُشفَّرة)، سجلات الدخول إلى الأنظمة.',
            contentEn:
                'The university collects personal data necessary for managing the employment relationship, including:\n\n• Personal data: full name, nationality, date of birth, marital status, personal photo.\n• Contact details: phone number, personal and institutional email, address.\n• Employment data: job title, department, joining date, employee ID.\n• Financial data: salary, allowances, and bank account details for payroll purposes.\n• Academic and professional records: qualifications, experience, professional certificates.\n• Performance and training records: periodic evaluations and completed training courses.\n• Technical login data: employee ID, password (encrypted), system access logs.',
            order: 0,
        },
        {
            id: 'stf-2',
            titleAr: 'أغراض معالجة البيانات',
            titleEn: 'Purposes of Data Processing',
            contentAr:
                'تُعالَج بيانات الموظفين للأغراض التالية:\n\n• إدارة عقود العمل والاستحقاقات القانونية.\n• صرف الرواتب والبدلات والمكافآت.\n• تنظيم الدورات التدريبية وتطوير الكفاءات.\n• تقييم الأداء السنوي وإجراءات الترقية.\n• الامتثال للمتطلبات القانونية والتنظيمية الحكومية.\n• إدارة الإجازات والغيابات والوقت الفعلي للعمل.\n• ضمان أمن المنشآت والأنظمة الإلكترونية.',
            contentEn:
                'Staff data is processed for the following purposes:\n\n• Managing employment contracts and legal entitlements.\n• Processing salaries, allowances, and bonuses.\n• Organising training programmes and developing competencies.\n• Annual performance evaluations and promotion procedures.\n• Compliance with governmental legal and regulatory requirements.\n• Managing leave, absences, and actual working hours.\n• Ensuring the security of facilities and electronic systems.',
            order: 1,
        },
        {
            id: 'stf-3',
            titleAr: 'الإفصاح عن البيانات',
            titleEn: 'Data Disclosure',
            contentAr:
                'لا تُكشف بيانات الموظفين لأطراف خارجية إلا في الحالات التالية:\n\n• الجهات الحكومية المختصة: وزارة العمل، هيئة التأمينات الاجتماعية، وغيرها وفق المتطلبات القانونية.\n• مزودو الخدمات: شركات الرواتب والتأمين الصحي ومنصات التدريب وفق اتفاقيات سرية مُلزِمة.\n• الجهات القضائية عند الاقتضاء القانوني.\n\nلا تُباع بيانات الموظفين أو تُستخدم لأغراض تجارية تحت أي ظرف.',
            contentEn:
                'Staff data is not disclosed to external parties except in the following cases:\n\n• Competent government entities: Ministry of Labour, Social Insurance Authority, etc., in accordance with legal requirements.\n• Service providers: payroll companies, health insurance providers, and training platforms under binding confidentiality agreements.\n• Judicial authorities when legally required.\n\nStaff data is never sold or used for commercial purposes under any circumstances.',
            order: 2,
        },
        {
            id: 'stf-4',
            titleAr: 'حقوق الموظف',
            titleEn: 'Employee Rights',
            contentAr:
                'يتمتع الموظفون بالحقوق التالية وفق سياسة الخصوصية المعتمدة:\n\n• حق الاطلاع: معرفة البيانات الشخصية المحفوظة لديهم وطلب نسخة منها.\n• حق التصحيح: تصويب أي بيانات غير دقيقة أو غير مكتملة.\n• حق التقييد: طلب تقييد معالجة البيانات في حالات بعينها.\n• حق الاعتراض: رفع اعتراض على معالجة بيانات لا يرى الموظف مسوّغاً قانونياً لها.\n• حق الشكوى: تقديم شكوى إلى الجهة المختصة في حال عدم الرضا عن آلية التعامل مع بياناته.\n\nلممارسة هذه الحقوق يُرجى التواصل مع إدارة الموارد البشرية.',
            contentEn:
                'Employees enjoy the following rights under the approved privacy policy:\n\n• Right of Access: Know the personal data held about them and request a copy.\n• Right of Correction: Rectify any inaccurate or incomplete data.\n• Right of Restriction: Request restriction of data processing in specific cases.\n• Right to Object: Raise an objection to data processing for which the employee sees no legal justification.\n• Right to Complain: File a complaint with the competent authority if unsatisfied with data handling.\n\nTo exercise these rights, please contact the Human Resources Department.',
            order: 3,
        },
        {
            id: 'stf-5',
            titleAr: 'أمان وحماية البيانات',
            titleEn: 'Data Security and Protection',
            contentAr:
                'تعتمد الجامعة منظومة متكاملة من ضوابط الأمان لحماية بيانات الموظفين:\n\n• التشفير: تُشفَّر البيانات الحساسة أثناء التخزين والنقل.\n• التحكم في الوصول: يُمنح الوصول إلى بيانات الموظفين لعدد محدود من المخوّلين فقط.\n• الجدران النارية وأنظمة الكشف عن التسلل لحماية الشبكات الداخلية.\n• النسخ الاحتياطي الدوري للبيانات في بيئات آمنة.\n• التدقيق الدوري والمراجعات الأمنية المستقلة.',
            contentEn:
                'The university employs a comprehensive set of security controls to protect staff data:\n\n• Encryption: Sensitive data is encrypted during storage and transmission.\n• Access control: Access to staff data is granted only to a limited number of authorised personnel.\n• Firewalls and intrusion detection systems to protect internal networks.\n• Regular data backups in secure environments.\n• Periodic audits and independent security reviews.',
            order: 4,
        },
        {
            id: 'stf-6',
            titleAr: 'الاستخدام المقبول للأنظمة الإلكترونية',
            titleEn: 'Acceptable Use of Electronic Systems',
            contentAr:
                'يلتزم الموظفون باستخدام الأنظمة الإلكترونية للجامعة للأغراض المهنية المشروعة فقط. يُحظر:\n\n• مشاركة بيانات الدخول مع أي شخص آخر.\n• الوصول إلى بيانات الموظفين أو الطلاب خارج نطاق المهام الوظيفية.\n• استخدام الأنظمة لأغراض شخصية أو تجارية غير مرتبطة بالعمل.\n• محاولة تجاوز الضوابط الأمنية أو الوصول إلى بيانات غير مُصرَّح بها.\n\nأي انتهاك قد يُعرّض الموظف للمساءلة التأديبية وفق اللوائح الداخلية للجامعة.',
            contentEn:
                'Staff are required to use the university\'s electronic systems for legitimate professional purposes only. The following are prohibited:\n\n• Sharing login credentials with any other person.\n• Accessing staff or student data outside the scope of job duties.\n• Using systems for personal or commercial purposes unrelated to work.\n• Attempting to bypass security controls or access unauthorised data.\n\nAny violation may subject the employee to disciplinary proceedings in accordance with the university\'s internal regulations.',
            order: 5,
        },
        {
            id: 'stf-7',
            titleAr: 'مدة الاحتفاظ بالسجلات الوظيفية',
            titleEn: 'Employment Records Retention Period',
            contentAr:
                'تحتفظ الجامعة بسجلات الموظفين طوال فترة خدمتهم وبعد انتهائها وفق المتطلبات القانونية التالية:\n\n• السجلات المالية والضريبية: لا تقل عن خمس سنوات بعد انتهاء الخدمة.\n• سجلات الأداء والتدريب: طوال مدة الخدمة وثلاث سنوات بعدها.\n• سجلات التقاعد والاستحقاقات: لأجل غير مسمى وفق متطلبات الهيئة المختصة.\n\nيتم حذف البيانات غير الضرورية بعد انتهاء مدة الاحتفاظ القانونية.',
            contentEn:
                'The university retains employee records during and after their service in accordance with the following legal requirements:\n\n• Financial and tax records: not less than five years after end of service.\n• Performance and training records: throughout the service period and three years thereafter.\n• Retirement and entitlement records: indefinitely in accordance with the requirements of the relevant authority.\n\nUnnecessary data is deleted after the legally required retention period expires.',
            order: 6,
        },
        {
            id: 'stf-8',
            titleAr: 'التواصل وتقديم الشكاوى',
            titleEn: 'Contact and Complaints',
            contentAr:
                'للاستفسار عن أي شأن يتعلق بخصوصية البيانات أو تقديم طلب أو شكوى، يُرجى التواصل مع:\n\n• إدارة الموارد البشرية — مبنى الإدارة الرئيسي.\n• البريد الإلكتروني الرسمي للجامعة المخصص لشؤون الخصوصية.\n\nتتعهد الجامعة بالرد على جميع الطلبات والشكاوى خلال مدة أقصاها خمسة عشر يوم عمل من تاريخ الاستلام.',
            contentEn:
                'For any enquiry related to data privacy, or to submit a request or complaint, please contact:\n\n• Human Resources Department — Main Administration Building.\n• The university\'s official email dedicated to privacy matters.\n\nThe university undertakes to respond to all requests and complaints within a maximum of fifteen working days from the date of receipt.',
            order: 7,
        },
    ],
    lastUpdated: new Date(),
};

export async function POST(request: NextRequest) {
    const seedKey = process.env.ADMIN_SEED_KEY;
    if (seedKey) {
        const provided = request.headers.get('x-seed-key');
        if (provided !== seedKey) {
            return NextResponse.json({ ok: false, message: 'Forbidden' }, { status: 403 });
        }
    }

    await dbConnect();

    await PrivacyPolicyModel.findOneAndUpdate(
        {},
        { $set: SEED_DATA },
        { upsert: true, new: true },
    );
    return NextResponse.json({ ok: true, message: 'Privacy policy seeded' });
}
