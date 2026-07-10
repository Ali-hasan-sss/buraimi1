/** برنامج مبدئي للزرع — الخطة والأهداف التفصيلية تُحدَّث من لوحة الإدارة */
function stubProgram(id: string, titleAr: string, titleEn: string) {
    return {
        id,
        titleAr,
        titleEn,
        descriptionAr: `برنامج «${titleAr}» ضمن العرض الأكاديمي للكلية؛ التفاصيل والخطة الدراسية قابلة للتحديث من الإدارة.`,
        descriptionEn: `The «${titleEn}» program as offered by the college; details and study plans can be updated from the admin dashboard.`,
        levels: [{ id: 'program', label: 'البرنامج', credits: '' }],
        objective: {
            title: `أهداف ${titleAr}`,
            data: [
                'إعداد كفاءات تلبي احتياجات سوق العمل.',
                'للتفاصيل الكاملة يُرجى التواصل مع القسم أو تحديث البيانات من لوحة الإدارة.',
            ],
        },
        studyPlan: [],
    };
}

export const Department = [
    {
        domain: "english",
        titleAr: "قسم اللغة الإنجليزية وآدابها",
        titleEn: "Department of English Language and Literature",
        subTitleAr: "تميز أكاديمي في اللغة والأدب والترجمة",
        subTitleEn: "Academic Excellence in Language, Literature, and Translation",
        applyLink: "https://forms.gle/quotpARxNGEuq2Cs9",
        headMessage: {
            message: {
                __html: `
              <p>أعزائي الطلبة،</p>
                <p>إنه لمن دواعي سروري أن أرحب بكم هنا، في قسم اللغة الإنجليزية لدينا.</p>
                <p>بصفتنا قسمًا أكاديميًا، نحن ملتزمون جدًا بتقديم تجربة تعليمية وتدريسية عالية الجودة لطلابنا. نقدم شهادات البكالوريوس والدبلوم في اللغة الإنجليزية وآدابها وبكالوريوس في الترجمة. تم تصميم برامجنا بعناية فائقة لتلبية التوقعات المهنية المستقبلية للطلاب وإعدادهم كخريجين أقوياء ومستعدين للتعامل مع سوق العمل التنافسية دائمًا محليًا وعالميًا. لدينا أنشطة لامنهجية تشارك وتعزز وتزود طلابنا ببيئة تعليمية صحية.</p>
                <p>عندما تأتي إلى هنا، ستشعر على الفور بأكثر من مجرد طلاب. ستصبح أعضاءً في قسم اللغة الإنجليزية يشاركون في جميع أنشطته. لذا أهلا بكم مرة أخرى. نأمل أن تستمتع إقامتك!</p>
              `},
            mail: "sheren@buc.edu.om",
            phone: "+968 25657531",
            writer: 'د. شيرين الهيتي - رئيس قسم اللغة الإنجليزية'
        },
        programs: [
            {
                id: 'english-lit',
                titleAr: 'برنامج اللغة الإنجليزية وآدابها',
                titleEn: "English Language and Literature Program",
                descriptionAr: 'برنامج شامل يركز على تطوير المهارات اللغوية والأدبية',
                descriptionEn: 'A comprehensive program focused on developing linguistic and literary skills',
                levels: [
                    { id: 'bachelor', label: 'بكالوريوس', credits: '129 ساعة معتمدة' },
                    { id: 'advancedDiploma', label: 'دبلوم متقدم', credits: '96 ساعة معتمدة' },
                    { id: 'diploma', label: 'دبلوم', credits: '66 ساعة معتمدة' }
                ],
                objective: {
                    title: "أهداف برنامج اللغة الإنجليزية وآدابها",
                    data: [
                        "تمكين الطلاب من تطوير المعرفة في اللغة الإنجليزية وآدابها واكتساب مهارات اللغة والترجمة اللازمة في سوق العمل",
                        "تطوير مهارات التفكير النقدي وحل المشكلات لدى الطلاب",
                        "عزز إبداع الطلاب ومهارات التعلم من خلال العمل في الفصل والأنشطة اللامنهجية",
                        "تمكين الطلاب من توصيل المعلومات بثقة وكفاءة في الخطاب المنطوق والمكتوب",
                        "تعزيز التنوع والعمل الجماعي الذي من شأنه أن يساعد الطلاب على العمل في بيئة متعددة الثقافات"
                    ]
                },
                studyPlan: [
                    // Study Plan Data for English Literature - Bachelor
                    {
                        id: "bachelor",
                        PlanHeader: {
                            title: "خطة الدراسة في بكالوريوس اللغة الإنجليزية وآدابها",
                            totalHour: 129,
                            generalRequirementsHours: 21,
                            departmentRequirementsHours: 63,
                            majorRequirementsHours: 36,
                            electiveRequirements: 9
                        },
                        generalRequirements: [
                            { seq: 1, code: 'BCGE001', title: 'اللغة العربية', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 2, code: 'BCGE002', title: 'الثقافة الأسلامية', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 3, code: 'BCGE003', title: 'المجتمع العماني', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 4, code: 'BCGE004', title: 'Study Skills', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 5, code: 'BCGE009', title: 'ريادة الأعمال', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 6, code: 'COMP100', title: 'Computers: Their Impact and use', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 7, code: 'ENGL005', title: 'General English', credits: 3, oqf: 3, prerequisite: '-' }
                        ],
                        departmentRequirements: [
                            { seq: 1, code: 'ENGL006', title: 'Research Methodology', credits: 3, oqf: 3, prerequisite: 'ENGL155' },
                            { seq: 2, code: 'ENGL098', title: 'Introduction To Essay Writing', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 3, code: 'ENGL102', title: 'Intermediate Reading', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 4, code: 'ENGL103', title: 'Basic English Grammar', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 5, code: 'ENGL152', title: 'Oral Skills (1)', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 6, code: 'ENGL153', title: 'Oral Skills(2)', credits: 3, oqf: 3, prerequisite: 'ENGL152' },
                            { seq: 7, code: 'ENGL154', title: 'Advanced Communication Skills', credits: 3, oqf: 3, prerequisite: 'ENGL153' },
                            { seq: 8, code: 'ENGL155', title: 'Essay Writing And Freshman Composition', credits: 3, oqf: 3, prerequisite: 'ENGL098' },
                            { seq: 9, code: 'ENGL204', title: 'Advanced Reading', credits: 3, oqf: 3, prerequisite: 'ENGL102' },
                            { seq: 10, code: 'ENGL205', title: 'Introduction To Translation', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 11, code: 'ENGL255', title: 'Introduction To English Literature', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 12, code: 'ENGL301', title: 'Introduction To Linguistics', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 13, code: 'ENGL306', title: 'Contrastive Linguistics', credits: 3, oqf: 3, prerequisite: 'ENGL402' },
                            { seq: 14, code: 'ENGL307', title: 'Morphology And Lexical Studies', credits: 3, oqf: 3, prerequisite: 'ENGL301' },
                            { seq: 15, code: 'ENGL308', title: 'Communicative Grammar', credits: 3, oqf: 3, prerequisite: 'ENGL302' },
                            { seq: 16, code: 'ENGL375', title: 'Advanced Academic Writing', credits: 3, oqf: 3, prerequisite: 'ENGL155' },
                            { seq: 17, code: 'ENGL402', title: 'Phonetics And Phonology', credits: 3, oqf: 3, prerequisite: 'ENGL301' },
                            { seq: 18, code: 'ENGL404', title: 'Syntax', credits: 3, oqf: 3, prerequisite: 'ENGL307' },
                            { seq: 19, code: 'ENGL408', title: 'Semantics And Pragmatics', credits: 3, oqf: 3, prerequisite: 'ENGL307' },
                            { seq: 20, code: 'ENGL411', title: 'Translation Of English And Arabic Text', credits: 3, oqf: 3, prerequisite: 'ENGL205' },
                            { seq: 21, code: 'ENGL441', title: 'Sociolinguistics', credits: 3, oqf: 3, prerequisite: 'ENGL301' }
                        ],
                        majorRequirements: [
                            { seq: 1, code: 'ENGL265', title: 'Victorian Novel', credits: 3, oqf: 3, prerequisite: 'ENGL255' },
                            { seq: 2, code: 'ENGL302', title: 'Introduction To Modern Grammar', credits: 3, oqf: 3, prerequisite: 'ENGL103' },
                            { seq: 3, code: 'ENGL315', title: 'Psychological Foundations Of Learning & Teaching', credits: 3, oqf: 3, prerequisite: 'ENGL301' },
                            { seq: 4, code: 'ENGL363', title: 'A Study Of Poetry', credits: 3, oqf: 3, prerequisite: 'ENGL255' },
                            { seq: 5, code: 'ENGL370', title: 'Elizabethan Drama', credits: 3, oqf: 3, prerequisite: 'ENGL255' },
                            { seq: 6, code: 'ENGL417', title: 'Language Development And Acquisition', credits: 3, oqf: 3, prerequisite: 'ENGL301' },
                            { seq: 7, code: 'ENGL438', title: 'Critical Approaches To Literature', credits: 3, oqf: 3, prerequisite: 'ENGL475' },
                            { seq: 8, code: 'ENGL472', title: 'Modern Novel', credits: 3, oqf: 3, prerequisite: 'ENGL265' },
                            { seq: 9, code: 'ENGL473', title: 'Modern Drama', credits: 3, oqf: 3, prerequisite: 'ENGL370' },
                            { seq: 10, code: 'ENGL475', title: 'Survey Of American Literature', credits: 3, oqf: 3, prerequisite: 'ENGL255' },
                            { seq: 11, code: 'ENGL495', title: 'Seminar In Literature / Linguistics', credits: 3, oqf: 3, prerequisite: 'ENGL375' },
                            { seq: 12, code: 'ENGL525', title: 'Methods Of Teaching (ESL)', credits: 3, oqf: 3, prerequisite: 'ENGL315' }
                        ],
                        electiveRequirements: [
                            { seq: 1, code: 'ENGL208', title: 'Introduction to Creative Writing', credits: 3, oqf: 3, prerequisite: 'ENGL301' },
                            { seq: 2, code: 'ENGL360', title: 'Readings in Contemporary English Literature', credits: 3, oqf: 3, prerequisite: 'ENGL155' },
                            { seq: 3, code: 'ENGL478', title: 'American Literature in 20th century', credits: 3, oqf: 3, prerequisite: 'ENGL301' },
                            { seq: 4, code: 'TRANS207', title: 'Stylistics', credits: 3, oqf: 3, prerequisite: 'ENGL155' },
                            { seq: 5, code: 'ENGL313', title: 'Applied Linguistics', credits: 3, oqf: 3, prerequisite: 'ENGL301' },
                            { seq: 6, code: 'ENGL314', title: 'Media Translation', credits: 3, oqf: 3, prerequisite: 'ENGL205' },
                            { seq: 7, code: 'ENGL320', title: 'Language and Culture', credits: 3, oqf: 3, prerequisite: 'ENGL301' },
                            { seq: 8, code: 'ENGL365', title: 'Literature in the Media', credits: 3, oqf: 3, prerequisite: 'ENGL255' },
                            { seq: 9, code: 'ENGL385', title: 'Comparative Literature', credits: 3, oqf: 3, prerequisite: 'ENGL438' },
                            { seq: 10, code: 'ENGL461', title: 'British Literature in 20th century', credits: 3, oqf: 3, prerequisite: 'ENGL255' },
                            { seq: 11, code: 'ENGL405', title: 'Language Change and Differences', credits: 3, oqf: 3, prerequisite: 'ENGL301' },
                            { seq: 12, code: 'ENGL505', title: 'Discourse Analysis', credits: 3, oqf: 3, prerequisite: 'ENGL301' }
                        ]
                    },
                    // Study Plan Data for English Literature - Advanced Diploma
                    {
                        id: "advancedDiploma",
                        PlanHeader: {
                            title: "خطة الدراسة في الدبلوم المتقدم - اللغة الإنجليزية وآدابها",
                            totalHour: 96,
                            generalRequirementsHours: 18,
                            departmentRequirementsHours: 51,
                            majorRequirementsHours: 24,
                            electiveRequirements: 3
                        },
                        generalRequirements: [
                            { seq: 1, code: 'BCGE001', title: 'اللغة العربية', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 2, code: 'BCGE002', title: 'الثقافة الأسلامية', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 3, code: 'BCGE003', title: 'Oman the State and Human', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 4, code: 'COMP100', title: 'Computers: Their Impact and use', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 5, code: 'ENGL002', title: 'General English', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 6, code: 'BCGE004', title: 'Study Skills', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 7, code: 'BCGE009', title: 'ريادة الأعمال', credits: 3, oqf: 3, prerequisite: '-' }
                        ],
                        departmentRequirements: [
                            { seq: 1, code: 'ENGL006', title: 'Research Methodology', credits: 3, oqf: 3, prerequisite: 'ENGL155' },
                            { seq: 2, code: 'ENGL098', title: 'Introduction To Essay Writing', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 3, code: 'ENGL102', title: 'Intermediate Reading', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 4, code: 'ENGL103', title: 'Basic English Grammar', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 5, code: 'ENGL152', title: 'Oral Skills (1)', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 6, code: 'ENGL153', title: 'Oral Skills(2)', credits: 3, oqf: 3, prerequisite: 'ENGL152' },
                            { seq: 7, code: 'ENGL154', title: 'Advanced Communication Skills', credits: 3, oqf: 3, prerequisite: 'ENGL153' },
                            { seq: 8, code: 'ENGL155', title: 'Essay Writing And Freshman Composition', credits: 3, oqf: 3, prerequisite: 'ENGL098' },
                            { seq: 9, code: 'ENGL204', title: 'Advanced Reading', credits: 3, oqf: 3, prerequisite: 'ENGL102' },
                            { seq: 10, code: 'ENGL205', title: 'Introduction To Translation', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 11, code: 'ENGL255', title: 'Introduction To English Literature', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 12, code: 'ENGL301', title: 'Introduction To Linguistics', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 13, code: 'ENGL306', title: 'Contrastive Linguistics', credits: 3, oqf: 3, prerequisite: 'ENGL402' },
                            { seq: 14, code: 'ENGL307', title: 'Morphology And Lexical Studies', credits: 3, oqf: 3, prerequisite: 'ENGL301' },
                            { seq: 15, code: 'ENGL308', title: 'Communicative Grammar', credits: 3, oqf: 3, prerequisite: 'ENGL302' },
                            { seq: 16, code: 'ENGL402', title: 'Phonetics And Phonology', credits: 3, oqf: 3, prerequisite: 'ENGL301' },
                            { seq: 17, code: 'ENGL441', title: 'Sociolinguistics', credits: 3, oqf: 3, prerequisite: 'ENGL301' }
                        ],
                        majorRequirements: [
                            { seq: 1, code: 'ENGL265', title: 'Victorian Novel', credits: 3, oqf: 3, prerequisite: 'ENGL255' },
                            { seq: 2, code: 'ENGL302', title: 'Introduction To Modern Grammar', credits: 3, oqf: 3, prerequisite: 'ENGL103' },
                            { seq: 3, code: 'ENGL315', title: 'Psychological Foundations Of Learning & Teaching', credits: 3, oqf: 3, prerequisite: 'ENGL301' },
                            { seq: 4, code: 'ENGL363', title: 'A Study Of Poetry', credits: 3, oqf: 3, prerequisite: 'ENGL255' },
                            { seq: 5, code: 'ENGL370', title: 'Elizabethan Drama', credits: 3, oqf: 3, prerequisite: 'ENGL255' },
                            { seq: 6, code: 'ENGL417', title: 'Language Development And Acquisition', credits: 3, oqf: 3, prerequisite: 'ENGL301' },
                            { seq: 7, code: 'ENGL438', title: 'Critical Approaches To Literature', credits: 3, oqf: 3, prerequisite: 'ENGL475' },
                            { seq: 8, code: 'ENGL475', title: 'Survey Of American Literature', credits: 3, oqf: 3, prerequisite: 'ENGL255' }
                        ],
                        electiveRequirements: [
                            { seq: 1, code: 'ENGL208', title: 'Introduction to Creative Writing', credits: 3, oqf: 3, prerequisite: 'ENGL301' },
                            { seq: 2, code: 'ENGL360', title: 'Readings in Contemporary English Literature', credits: 3, oqf: 3, prerequisite: 'ENGL155' },
                            { seq: 3, code: 'ENGL478', title: 'American Literature in 20th century', credits: 3, oqf: 3, prerequisite: 'ENGL301' },
                            { seq: 4, code: 'TRANS207', title: 'Stylistics', credits: 3, oqf: 3, prerequisite: 'ENGL155' },
                            { seq: 5, code: 'ENGL313', title: 'Applied Linguistics', credits: 3, oqf: 3, prerequisite: 'ENGL301' },
                            { seq: 6, code: 'ENGL314', title: 'Media Translation', credits: 3, oqf: 3, prerequisite: 'ENGL205' },
                            { seq: 7, code: 'ENGL320', title: 'Language and Culture', credits: 3, oqf: 3, prerequisite: 'ENGL301' },
                            { seq: 8, code: 'ENGL365', title: 'Literature in the Media', credits: 3, oqf: 3, prerequisite: 'ENGL255' },
                            { seq: 9, code: 'ENGL385', title: 'Comparative Literature', credits: 3, oqf: 3, prerequisite: 'ENGL438' },
                            { seq: 10, code: 'ENGL461', title: 'British Literature in 20th century', credits: 3, oqf: 3, prerequisite: 'ENGL255' },
                            { seq: 11, code: 'ENGL405', title: 'Language Change and Differences', credits: 3, oqf: 3, prerequisite: 'ENGL301' },
                            { seq: 12, code: 'ENGL505', title: 'Discourse Analysis', credits: 3, oqf: 3, prerequisite: 'ENGL301' }
                        ]
                    },
                    // Study Plan Data for English Literature - Diploma
                    {
                        id: "diploma",
                        PlanHeader: {
                            title: "خطة الدراسة في الدبلوم - اللغة الإنجليزية وآدابها",
                            totalHour: 66,
                            generalRequirementsHours: 15,
                            departmentRequirementsHours: 36,
                            majorRequirementsHours: 15,
                            electiveRequirements: null
                        },
                        generalRequirements: [
                            { seq: 1, code: 'ENGL098', title: 'Introduction To Essay Writing', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 2, code: 'ENGL102', title: 'Intermediate Reading', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 3, code: 'ENGL103', title: 'Basic English Grammar', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 4, code: 'ENGL152', title: 'Oral Skills (1)', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 5, code: 'ENGL153', title: 'Oral Skills(2)', credits: 3, oqf: 3, prerequisite: 'ENGL152' },
                            { seq: 6, code: 'ENGL154', title: 'Advanced Communication Skills', credits: 3, oqf: 3, prerequisite: 'ENGL153' },
                            { seq: 7, code: 'ENGL155', title: 'Essay Writing And Freshman Composition', credits: 3, oqf: 3, prerequisite: 'ENGL098' },
                            { seq: 8, code: 'ENGL204', title: 'Advanced Reading', credits: 3, oqf: 3, prerequisite: 'ENGL102' },
                            { seq: 9, code: 'ENGL205', title: 'Introduction To Translation', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 10, code: 'ENGL255', title: 'Introduction To English Literature', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 11, code: 'ENGL301', title: 'Introduction To Linguistics', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 12, code: 'ENGL402', title: 'Phonetics And Phonology', credits: 3, oqf: 3, prerequisite: 'ENGL301' }
                        ],
                        departmentRequirements: [
                            { seq: 1, code: 'ACCT220', title: 'Introduction To Financial Accounting', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 2, code: 'ACCT230', title: 'Introduction To Managerial Accounting', credits: 3, oqf: 3, prerequisite: 'ACCT220' },
                            { seq: 3, code: 'BLAW280', title: 'Business Law - 1', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 4, code: 'BUS105', title: 'Business Communications', credits: 3, oqf: 3, prerequisite: 'ENGL002' },
                            { seq: 5, code: 'ECON160', title: 'Microeconomics Principles', credits: 3, oqf: 3, prerequisite: 'ENGL004' },
                            { seq: 6, code: 'ECON161', title: 'Macroeconomics Principles', credits: 3, oqf: 3, prerequisite: 'ECON160' },
                            { seq: 7, code: 'FIN303', title: 'الإدارة المالية', credits: 3, oqf: 3, prerequisite: 'ACCT220' },
                            { seq: 8, code: 'MATH103', title: 'Mathematical Methods For Business', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 9, code: 'MGT100', title: 'Introduction To Management', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 10, code: 'MKT100', title: 'Principles of Marketing', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 11, code: 'SOM120', title: 'Basic Business Statistics', credits: 3, oqf: 3, prerequisite: 'MATH103' }
                        ],
                        majorRequirements: [
                            { seq: 1, code: 'ENGL265', title: 'Victorian Novel', credits: 3, oqf: 3, prerequisite: 'ENGL255' },
                            { seq: 2, code: 'ENGL302', title: 'Introduction To Modern Grammar', credits: 3, oqf: 3, prerequisite: 'ENGL103' },
                            { seq: 3, code: 'ENGL307', title: 'Morphology and Lexical Studies', credits: 3, oqf: 3, prerequisite: 'ENGL301' },
                            { seq: 4, code: 'ENGL363', title: 'A Study Of Poetry', credits: 3, oqf: 3, prerequisite: 'ENGL255' },
                            { seq: 5, code: 'ENGL475', title: 'Survey Of American Literature', credits: 3, oqf: 3, prerequisite: 'ENGL255' }
                        ]
                    },
                ]
            },
            {
                id: 'translation',
                titleAr: 'برنامج الترجمة',
                titleEn: 'Translation Program',
                descriptionAr: 'تأهيل مترجمين محترفين في مختلف المجالات',
                descriptionEn: 'Training professional translators in various fields',
                levels: [
                    { id: 'bachelor', label: 'بكالوريوس', credits: '129 ساعة معتمدة' }
                ],
                objective: {
                    title: "أهداف برنامج الترجمة",
                    data: [
                        "Enable students to acquire language and translation skills needed in the job market",
                        "Prepare students who are ready to assume translation jobs in reputable institutions",
                        "Equip students with ethical and professional skills to translate different genres",
                        "تمكين الطلاب من توصيل المعلومات بثقة وكفاءة في الخطاب المنطوق والمكتوب",
                        "Integrate the use of CAT tools and the latest technology",
                    ]
                },
                studyPlan: [
                    // Study Plan Data for Translation - Bachelor
                    {
                        id: "bachelor",
                        PlanHeader: {
                            title: "خطة الدراسة في بكالوريوس الترجمة",
                            totalHour: 129,
                            generalRequirementsHours: 21,
                            departmentRequirementsHours: 63,
                            majorRequirementsHours: 36,
                            electiveRequirements: 9
                        },
                        generalRequirements: [
                            { seq: 1, code: 'BCGE001', title: 'اللغة العربية', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 2, code: 'BCGE002', title: 'الثقافة الأسلامية', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 3, code: 'BCGE003', title: 'Oman the State and Human', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 4, code: 'BCGE004', title: 'Study Skills', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 5, code: 'BCGE009', title: 'ريادة الأعمال', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 6, code: 'COMP100', title: 'Computers: Their Impact and use', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 7, code: 'ENGL005', title: 'General English', credits: 3, oqf: 3, prerequisite: '-' }
                        ],
                        departmentRequirements: [
                            { seq: 1, code: 'ENGL006', title: 'Research Methodology', credits: 3, oqf: 3, prerequisite: 'ENGL155' },
                            { seq: 2, code: 'ENGL098', title: 'Introduction To Essay Writing', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 3, code: 'ENGL102', title: 'Intermediate Reading', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 4, code: 'ENGL103', title: 'Basic English Grammar', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 5, code: 'ENGL152', title: 'Oral Skills (1)', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 6, code: 'ENGL153', title: 'Oral Skills(2)', credits: 3, oqf: 3, prerequisite: 'ENGL152' },
                            { seq: 7, code: 'ENGL154', title: 'Advanced Communication Skills', credits: 3, oqf: 3, prerequisite: 'ENGL153' },
                            { seq: 8, code: 'ENGL155', title: 'Essay Writing And Freshman Composition', credits: 3, oqf: 3, prerequisite: 'ENGL098' },
                            { seq: 9, code: 'ENGL204', title: 'Advanced Reading', credits: 3, oqf: 3, prerequisite: 'ENGL102' },
                            { seq: 10, code: 'ENGL205', title: 'Introduction To Translation', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 11, code: 'ENGL255', title: 'Introduction To English Literature', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 12, code: 'ENGL301', title: 'Introduction To Linguistics', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 13, code: 'ENGL306', title: 'Contrastive Linguistics', credits: 3, oqf: 3, prerequisite: 'ENGL402' },
                            { seq: 14, code: 'ENGL307', title: 'Morphology And Lexical Studies', credits: 3, oqf: 3, prerequisite: 'ENGL301' },
                            { seq: 15, code: 'ENGL308', title: 'Communicative Grammar', credits: 3, oqf: 3, prerequisite: 'ENGL302' },
                            { seq: 16, code: 'ENGL375', title: 'Advanced Academic Writing', credits: 3, oqf: 3, prerequisite: 'ENGL155' },
                            { seq: 17, code: 'ENGL402', title: 'Phonetics And Phonology', credits: 3, oqf: 3, prerequisite: 'ENGL301' },
                            { seq: 18, code: 'ENGL404', title: 'Syntax', credits: 3, oqf: 3, prerequisite: 'ENGL307' },
                            { seq: 19, code: 'ENGL408', title: 'Semantics And Pragmatics', credits: 3, oqf: 3, prerequisite: 'ENGL307' },
                            { seq: 20, code: 'ENGL411', title: 'Translation Of English And Arabic Text', credits: 3, oqf: 3, prerequisite: 'ENGL205' },
                            { seq: 21, code: 'ENGL441', title: 'Sociolinguistics', credits: 3, oqf: 3, prerequisite: 'ENGL301' }
                        ],
                        majorRequirements: [
                            { seq: 1, code: 'ENGL314', title: 'Media Translation', credits: 3, oqf: 3, prerequisite: 'ENGL205' },
                            { seq: 2, code: 'TRANS304', title: 'Translation of Financial & Legal Texts', credits: 3, oqf: 3, prerequisite: 'ENGL205' },
                            { seq: 3, code: 'TRANS305', title: 'Arabic Syntax', credits: 3, oqf: 3, prerequisite: 'ENGL205' },
                            { seq: 4, code: 'TRANS311', title: 'Translation Of Arabic- English Texts', credits: 3, oqf: 3, prerequisite: 'ENGL205' },
                            { seq: 5, code: 'TRANS312', title: 'Medical Translation', credits: 3, oqf: 3, prerequisite: 'ENGL411' },
                            { seq: 6, code: 'TRANS313', title: 'Sight Translation', credits: 3, oqf: 3, prerequisite: 'ENGL411' },
                            { seq: 7, code: 'TRANS418', title: 'Translation Theory', credits: 3, oqf: 3, prerequisite: 'ENGL411' },
                            { seq: 8, code: 'TRANS412', title: 'Translation For Communication', credits: 3, oqf: 3, prerequisite: 'ENGL411' },
                            { seq: 9, code: 'TRANS413', title: 'Translation Project', credits: 3, oqf: 3, prerequisite: 'TRANS313' },
                            { seq: 10, code: 'TRANS414', title: 'Translation Of Literary Texts', credits: 3, oqf: 3, prerequisite: 'ENGL411' },
                            { seq: 11, code: 'TRANS416', title: 'Consecutive Interpretation', credits: 3, oqf: 3, prerequisite: 'ENGL411' },
                            { seq: 12, code: 'TRANS419', title: 'Computer Assisted Translation', credits: 3, oqf: 3, prerequisite: 'ENGL411' }
                        ],
                        electiveRequirements: [
                            { seq: 1, code: 'ENGL313', title: 'Applied Linguistics', credits: 3, oqf: 3, prerequisite: 'ENGL301' },
                            { seq: 2, code: 'TRANS417', title: 'Readings in Contemporary English Literature', credits: 3, oqf: 3, prerequisite: 'ENGL205' },
                            { seq: 3, code: 'TRANS207', title: 'Stylistics', credits: 3, oqf: 3, prerequisite: 'ENGL301' },
                            { seq: 4, code: 'ENGL505', title: 'Discourse Analysis', credits: 3, oqf: 3, prerequisite: 'ENGL301' },
                            { seq: 5, code: 'TRANS315', title: 'Business Translation', credits: 3, oqf: 3, prerequisite: 'ENGL411' },
                            { seq: 6, code: 'ENGL314', title: 'Media Translation', credits: 3, oqf: 3, prerequisite: 'ENGL205' },
                            { seq: 7, code: 'TRANS210', title: 'Western Culture', credits: 3, oqf: 3, prerequisite: 'ENGL205' },
                            { seq: 8, code: 'TRANS316', title: 'Advanced Translation Skills', credits: 3, oqf: 3, prerequisite: 'ENGL411' }
                        ]
                    },
                ],
            },
            {
                id: 'english-masters',
                titleAr: 'برنامج الماجستير في دراسات اللغة الإنجليزية',
                titleEn: 'Master in English Language Studies',
                descriptionAr:
                    '<p>برنامج متميز بالتعاون مع جامعة ولاية كاليفورنيا، نورثريدج (CSUN) يقدم تخصصين: <strong>تخصص الأدب</strong> و<strong>تخصص اللغويات</strong>.</p><p>المدة: 2 سنة دراسية | 33 ساعة معتمدة | رسوم الساعة: 130 ريال | إجمالي الرسوم: 4,290 ريال</p><p><a href="/main/graduate-studies/masters-english">عرض تفاصيل البرنامج الكاملة</a></p>',
                descriptionEn:
                    '<p>A distinguished program in partnership with California State University, Northridge (CSUN), offering <strong>Literature</strong> and <strong>Linguistics</strong> tracks.</p><p>Duration: 2 years | 33 credit hours | 130 OMR per hour | Total: 4,290 OMR</p><p><a href="/main/graduate-studies/masters-english">View full program details</a></p>',
                levels: [{ id: 'masters', label: 'ماجستير', credits: '33 ساعة معتمدة' }],
                objective: {
                    title: 'أهداف البرنامج',
                    data: [
                        'اكتساب مهارات البحث الأكاديمي واستخدام قواعد البيانات والمكتبات',
                        'إظهار معرفة عميقة في التقييم النقدي للنصوص الأدبية والظواهر اللغوية',
                        'تطبيق مهارات متقدمة في التحليل الأدبي واللغوي',
                    ],
                    dataEn: [
                        'Acquire academic research skills using databases and libraries',
                        'Demonstrate deep critical knowledge of literary texts and linguistic phenomena',
                        'Apply advanced literary and linguistic analysis skills',
                    ],
                },
                studyPlan: [],
            },
        ],
        facultyMembers: [
            {
                name: 'د. شيرين الهيتي',
                title: 'رئيس القسم',
                position: 'استاذ مساعد',
                email: 'sheren@buc.edu.om',
                phone: '+968 25657531'
            },
            {
                name: 'د. ابو بكر تيجاني',
                title: 'Assistant Professor / Deputy of Head',
                position: 'استاذ مساعد',
                email: 'babikir@buc.edu.om',
                phone: '+968-25657533'
            },
            {
                name: 'د. رنا النعيمي',
                title: 'استاذ مساعد',
                position: '',
                email: 'rana@buc.edu.om',
                phone: '+968-25657687'
            },
            {
                name: 'د. عبدالملك ثابت',
                title: 'استاذ مشارك',
                position: '',
                email: 'asd.academic@buc.edu.om',
                phone: '+968-25657540'
            },
            {
                name: 'د. مريم النعيمي',
                title: 'استاذ مشارك',
                position: '',
                email: 'sami@buc.edu.om',
                phone: '+968-25657503'
            },
            {
                name: 'د. سامي النعيمي',
                title: 'استاذ مساعد - مساعد رئيس القسم',
                position: '',
                email: 'sami@buc.edu.om',
                phone: '+968-25657544'
            },
            {
                name: 'د. فراس الجميلي',
                title: 'استاذ مساعد',
                position: '',
                email: 'firas@buc.edu.om',
                phone: '+968-25657540'
            },
            {
                name: 'د. محمد منسي',
                title: 'استاذ مساعد',
                position: '',
                email: 'mansy@buc.edu.om',
                phone: '+968-25657434'
            },
            {
                name: 'أ. صلاح الحسن',
                title: 'محاضر',
                position: '',
                email: 'salah@buc.edu.om',
                phone: '+968-25657535'
            },
            {
                name: 'أ. سفيان التارقي',
                title: 'محاضر',
                position: '',
                email: 'sofiene@buc.edu.om',
                phone: '+968-25657534'
            }
        ]
    },
    {
        domain: 'it-department',
        titleAr: 'قسم تقنية المعلومات',
        titleEn: 'Department of Information Technology',
        subTitleAr: 'ابتكار وتقنية لاقتصاد المعرفة',
        subTitleEn: 'Innovation and technology for the knowledge economy',
        applyLink: 'https://forms.gle/sYggpb5TFHWrRjzCA',
        headMessage: {
            message: {
                __html: `
              <p>أهلاً بكم في قسم تقنية المعلومات.</p>
              <p>يقدّم القسم برامج في علوم الحاسوب وهندسة البرمجيات والذكاء الاصطناعي والأمن السيبراني، بما يواكب متطلبات سوق العمل.</p>
              `,
            },
            mail: 'info@buc.edu.om',
            phone: '+968 2565 0000',
            writer: 'قسم تقنية المعلومات',
        },
        programs: [
            {
                id: 'it',
                titleAr: 'برنامج نظم المعلومات',
                titleEn: 'Information Systems Program',
                descriptionAr: 'برنامج يركز على البنية التحتية لنظم المعلومات وتطبيقاتها في المؤسسات',
                descriptionEn: 'Program focusing on information systems infrastructure and organizational applications',
                levels: [
                    { id: 'diploma', label: 'دبلوم', credits: '60 ساعة معتمدة' },
                    { id: 'advancedDiploma', label: 'دبلوم متقدم', credits: '90 ساعة معتمدة' },
                    { id: 'bachelor', label: 'بكالوريوس', credits: '120 ساعة معتمدة' }
                ],
                objective: {
                    title: "أهداف برنامج نظم المعلومات",
                    data: [
                        "إظهار المعرفة بالبنية التحتية الأساسية لنظم المعلومات",
                        "يطبق خريجونا مفاهيم الشبكات لحل المشكلات التنظيمية",
                        "يحلل خريجونا مشاكل العمل باستخدام المعرفة التأسيسية من مجالات الاقتصاد والمحاسبة وقانون الأعمال والإحصاء",
                        "اكتساب المعرفة بالإدارة التشغيلية لدعم المؤسسات",
                        "تطوير البرامج باستخدام مبادئ وممارسات مختلفة لتصميم البرامج وتطويرها",
                        "يظهر خريجونا وعياً بالأخلاقيات الاجتماعية والعمل",
                        "يظهر خريجونا إجادة اللغة بشكل عام وسياقات محددة تتعلق بالانضباط"
                    ]
                },
                studyPlan: []
            },
            {
                id: 'cs',
                titleAr: 'برنامج علوم الحاسب',
                titleEn: 'Computer Science Program',
                descriptionAr: 'برنامج يركز على علوم الحاسوب النظرية والتطبيقية',
                descriptionEn: 'Program focusing on theoretical and applied computer science',
                levels: [
                    { id: 'diploma', label: 'دبلوم', credits: '60 ساعة معتمدة' },
                    { id: 'advancedDiploma', label: 'دبلوم متقدم', credits: '90 ساعة معتمدة' },
                    { id: 'bachelor', label: 'بكالوريوس', credits: '120 ساعة معتمدة' }
                ],
                objective: {
                    title: "أهداف برنامج علوم الحاسب",
                    data: [
                        "إعداد خريجين في علوم الحاسب النظرية والتطبيقية",
                        "تطوير مهارات البرمجة والخوارزميات",
                        "فهم أسس علوم الحاسب الحديثة"
                    ]
                },
                studyPlan: []
            },
            {
                id: 'software-engineering',
                titleAr: 'برنامج هندسة البرمجيات',
                titleEn: 'Software Engineering Program',
                descriptionAr: 'برنامج متخصص في هندسة وتطوير البرمجيات',
                descriptionEn: 'Specialized program in software engineering and development',
                levels: [
                    { id: 'diploma', label: 'دبلوم', credits: '60 ساعة معتمدة' },
                    { id: 'advancedDiploma', label: 'دبلوم متقدم', credits: '90 ساعة معتمدة' },
                    { id: 'bachelor', label: 'بكالوريوس', credits: '120 ساعة معتمدة' }
                ],
                objective: {
                    title: "أهداف برنامج هندسة البرمجيات",
                    data: [
                        "إعداد مهندسي برمجيات محترفين",
                        "تطوير مهارات تصميم وتطوير البرمجيات",
                        "فهم منهجيات هندسة البرمجيات"
                    ]
                },
                studyPlan: []
            },
            {
                id: 'ai',
                titleAr: 'برنامج الذكاء الاصطناعي',
                titleEn: 'Artificial Intelligence Program',
                descriptionAr: 'برنامج متخصص في تقنيات الذكاء الاصطناعي والتعلم الآلي',
                descriptionEn: 'Specialized program in AI and machine learning technologies',
                levels: [
                    { id: 'diploma', label: 'دبلوم', credits: '60 ساعة معتمدة' },
                    { id: 'advancedDiploma', label: 'دبلوم متقدم', credits: '90 ساعة معتمدة' },
                    { id: 'bachelor', label: 'بكالوريوس', credits: '120 ساعة معتمدة' }
                ],
                objective: {
                    title: "أهداف برنامج الذكاء الاصطناعي",
                    data: [
                        "إعداد متخصصين في الذكاء الاصطناعي",
                        "تطوير مهارات التعلم الآلي وتحليل البيانات",
                        "فهم تطبيقات الذكاء الاصطناعي في مختلف المجالات"
                    ]
                },
                studyPlan: []
            },
            {
                id: 'cybersecurity',
                titleAr: 'برنامج الأمن السيبراني',
                titleEn: 'Cybersecurity Program',
                descriptionAr: 'برنامج متخصص في أمن المعلومات والسيبراني',
                descriptionEn: 'Specialized program in information and cybersecurity',
                levels: [
                    { id: 'diploma', label: 'دبلوم', credits: '60 ساعة معتمدة' },
                    { id: 'advancedDiploma', label: 'دبلوم متقدم', credits: '90 ساعة معتمدة' },
                    { id: 'bachelor', label: 'بكالوريوس', credits: '120 ساعة معتمدة' }
                ],
                objective: {
                    title: "أهداف برنامج الأمن السيبراني",
                    data: [
                        "إعداد متخصصين في الأمن السيبراني",
                        "تطوير مهارات حماية الأنظمة والشبكات",
                        "فهم تهديدات الأمن السيبراني وطرق الوقاية منها"
                    ]
                },
                studyPlan: []
            },
        ],
        facultyMembers: [],
    },
    {
        domain: 'business-department',
        titleAr: 'قسم إدارة الأعمال والمحاسبة',
        titleEn: 'Department of Business Administration and Accounting',
        subTitleAr: 'إدارة أعمال ومحاسبة بمعايير عالمية',
        subTitleEn: 'Business and accounting with global standards',
        applyLink: 'https://forms.gle/C2LZNzzc1ffCWbyJ7',
        headMessage: {
            message: {
                __html: `
              <p>أهلاً بكم في قسم إدارة الأعمال والمحاسبة.</p>
              <p>يضم القسم برامج المحاسبة والتسويق وإدارة الأعمال والموارد البشرية والعلوم المالية واقتصاد الأعمال، إضافة إلى برامج الدراسات العليا.</p>
              `,
            },
            mail: 'info@buc.edu.om',
            phone: '+968 2565 0000',
            writer: 'قسم إدارة الأعمال والمحاسبة',
        },
        programs: [
            {
                id: 'hrm',
                titleAr: 'تنمية الموارد البشرية',
                titleEn: 'Human Resource Development',
                descriptionAr: 'برنامج متخصص في إدارة وتطوير الموارد البشرية',
                descriptionEn: 'Specialized program in human resource management and development',
                levels: [
                    { id: 'diploma', label: 'دبلوم', credits: '66 ساعة معتمدة' },
                    { id: 'advancedDiploma', label: 'دبلوم متقدم', credits: '96 ساعة معتمدة' },
                    { id: 'bachelor', label: 'بكالوريوس', credits: '129 ساعة معتمدة' }
                ],
                objective: {
                    title: "أهداف تنمية الموارد البشرية",
                    data: [
                        "إعداد كفاءات في إدارة الموارد البشرية",
                        "تطوير مهارات التواصل والقيادة",
                        "فهم استراتيجيات إدارة المواهب"
                    ]
                },
                studyPlan: []
            },
            {
                id: 'business-admin',
                titleAr: 'إدارة الأعمال',
                titleEn: 'Business Administration',
                descriptionAr: 'برنامج شامل يؤهل الطلبة للعمل في مختلف المجالات الإدارية',
                descriptionEn: 'Comprehensive program preparing students for various administrative fields',
                levels: [
                    { id: 'diploma', label: 'دبلوم', credits: '66 ساعة معتمدة' },
                    { id: 'advancedDiploma', label: 'دبلوم متقدم', credits: '96 ساعة معتمدة' },
                    { id: 'bachelor', label: 'بكالوريوس', credits: '129 ساعة معتمدة' }
                ],
                objective: {
                    title: "أهداف إدارة الأعمال",
                    data: [
                        "تطوير مهارات الإدارة والقيادة",
                        "فهم مبادئ إدارة الأعمال الحديثة",
                        "إعداد قادة مستقبليين في مجال الأعمال"
                    ]
                },
                studyPlan: []
            },
            {
                id: 'accounting',
                titleAr: 'المحاسبة',
                titleEn: 'Accounting',
                descriptionAr: 'برنامج متخصص في المحاسبة المالية والإدارية والضريبية',
                descriptionEn: 'Specialized program in financial, managerial, and tax accounting',
                levels: [
                    { id: 'diploma', label: 'دبلوم', credits: '66 ساعة معتمدة' },
                    { id: 'advancedDiploma', label: 'دبلوم متقدم', credits: '96 ساعة معتمدة' },
                    { id: 'bachelor', label: 'بكالوريوس', credits: '129 ساعة معتمدة' }
                ],
                objective: {
                    title: "أهداف المحاسبة",
                    data: [
                        "إعداد محاسبين مؤهلين",
                        "فهم معايير المحاسبة الدولية",
                        "تطوير مهارات التحليل المالي"
                    ]
                },
                studyPlan: []
            },
            {
                id: 'finance-banking',
                titleAr: 'العلوم المالية والمصرفية',
                titleEn: 'Finance and Banking Sciences',
                descriptionAr: 'برنامج يركز على التمويل والخدمات المصرفية والاستثمار',
                descriptionEn: 'Program focusing on finance, banking services, and investment',
                levels: [
                    { id: 'diploma', label: 'دبلوم', credits: '66 ساعة معتمدة' },
                    { id: 'advancedDiploma', label: 'دبلوم متقدم', credits: '96 ساعة معتمدة' },
                    { id: 'bachelor', label: 'بكالوريوس', credits: '129 ساعة معتمدة' }
                ],
                objective: {
                    title: "أهداف العلوم المالية والمصرفية",
                    data: [
                        "إعداد كفاءات في القطاع المالي والمصرفي",
                        "فهم أسواق المال والاستثمار",
                        "تطوير مهارات التحليل المالي"
                    ]
                },
                studyPlan: []
            },
            {
                id: 'marketing',
                titleAr: 'التسويق',
                titleEn: 'Marketing',
                descriptionAr: 'برنامج متخصص في استراتيجيات التسويق والترويج وإدارة العلامات التجارية',
                descriptionEn: 'Specialized program in marketing strategies, promotion, and brand management',
                levels: [
                    { id: 'diploma', label: 'دبلوم', credits: '66 ساعة معتمدة' },
                    { id: 'advancedDiploma', label: 'دبلوم متقدم', credits: '96 ساعة معتمدة' },
                    { id: 'bachelor', label: 'بكالوريوس', credits: '129 ساعة معتمدة' }
                ],
                objective: {
                    title: "أهداف التسويق",
                    data: [
                        "إعداد مسوقين محترفين",
                        "فهم استراتيجيات التسويق الرقمي",
                        "تطوير مهارات إدارة العلامات التجارية"
                    ]
                },
                studyPlan: []
            },
            {
                id: 'business-economics',
                titleAr: 'اقتصاد الأعمال',
                titleEn: 'Business Economics',
                descriptionAr: 'برنامج يجمع بين الاقتصاد وإدارة الأعمال لفهم الأسواق والقرارات الاقتصادية',
                descriptionEn: 'Program combining economics and business to understand markets and economic decisions',
                levels: [
                    { id: 'diploma', label: 'دبلوم', credits: '66 ساعة معتمدة' },
                    { id: 'advancedDiploma', label: 'دبلوم متقدم', credits: '96 ساعة معتمدة' },
                    { id: 'bachelor', label: 'بكالوريوس', credits: '129 ساعة معتمدة' }
                ],
                objective: {
                    title: "أهداف اقتصاد الأعمال",
                    data: [
                        "فهم مبادئ الاقتصاد التطبيقي",
                        "تحليل القرارات الاقتصادية للأعمال",
                        "تطوير مهارات البحث الاقتصادي"
                    ]
                },
                studyPlan: []
            },
            {
                id: 'mba',
                titleAr: 'MBA - ماجستير في إدارة الأعمال',
                titleEn: 'Master of Business Administration',
                descriptionAr:
                    '<p>برنامج ماجستير إدارة الأعمال (MBA) المتطور لإعداد قادة الأعمال بمهارات إدارية وقيادية متقدمة.</p><p>المدة: 2 سنة | 42 ساعة معتمدة | مسار الرسالة أو الامتحان الشامل</p><p><a href="/main/graduate-studies/mba">عرض تفاصيل البرنامج الكاملة</a></p>',
                descriptionEn:
                    '<p>An advanced MBA program preparing future business leaders with strong management and leadership skills.</p><p>Duration: 2 years | 42 credit hours | Thesis or comprehensive exam track</p><p><a href="/main/graduate-studies/mba">View full program details</a></p>',
                levels: [{ id: 'masters', label: 'ماجستير', credits: '42 ساعة معتمدة' }],
                objective: {
                    title: 'مخرجات التعلم',
                    data: [
                        'تطبيق المبادئ والنظريات الإدارية الحديثة في بيئة الأعمال',
                        'تحليل البيانات المالية والإدارية واتخاذ القرارات الاستراتيجية',
                        'قيادة الفرق وإدارة الموارد البشرية بفعالية',
                        'تطوير الاستراتيجيات التسويقية والتشغيلية',
                    ],
                    dataEn: [
                        'Apply modern management principles in business environments',
                        'Analyze financial and managerial data for strategic decisions',
                        'Lead teams and manage human resources effectively',
                        'Develop marketing and operational strategies',
                    ],
                },
                studyPlan: [],
            },
        ],
        facultyMembers: [],
    },
    {
        domain: 'law-program',
        titleAr: 'برنامج القانون - يطرح باللغة العربية',
        titleEn: 'Law Program — delivered in Arabic',
        subTitleAr: 'تأهيل قانوني يواكب التطور المهني والمجتمعي',
        subTitleEn: 'Legal education aligned with professional and societal development',
        applyLink: 'https://forms.gle/WswZZoRnZiiZrakt9',
        headMessage: {
            message: {
                __html: `
              <p>أهلاً بكم في برنامج القانون.</p>
              <p>يقدّم البرنامج التعليم باللغة العربية ويشمل مسارات البكالوريوس والماجستير والدكتوراه في القانون العام والخاص.</p>
              `,
            },
            mail: 'info@buc.edu.om',
            phone: '+968 2565 0000',
            writer: 'برنامج القانون',
        },
        programs: [
            {
                id: 'law-bachelor',
                titleAr: 'برنامج القانون',
                titleEn: 'Law (Bachelor)',
                descriptionAr: 'برنامج بكالوريوس القانون يطرح باللغة العربية',
                descriptionEn: 'Bachelor of Law program delivered in Arabic',
                levels: [
                    { id: 'bachelor', label: 'بكالوريوس', credits: '129 ساعة معتمدة' }
                ],
                objective: {
                    title: "أهداف برنامج القانون",
                    data: [
                        "إعداد كفاءات قانونية مؤهلة للعمل في مختلف المجالات القانونية",
                        "تطوير مهارات البحث والتحليل القانوني لدى الطلاب",
                        "تعزيز الفهم العميق للقانون العماني والدولي"
                    ]
                },
                studyPlan: [
                    {
                        id: "bachelor",
                        PlanHeader: {
                            title: "خطة الدراسة لدرجة البكالوريوس في القانون",
                            totalHour: 129,
                            generalRequirementsHours: 12,
                            departmentRequirementsHours: 108,
                            majorRequirementsHours: 0,
                            electiveRequirements: 9
                        },
                        generalRequirements: [
                            { seq: 1, code: 'BCGE001', title: 'اللغة العربية', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 2, code: 'BCGE002', title: 'الثقافة الأسلامية', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 3, code: 'BCGE003', title: 'Oman the State and Human', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 4, code: 'BCGE009', title: 'ريادة الأعمال', credits: 3, oqf: 3, prerequisite: '-' }
                        ],
                        departmentRequirements: [
                            { seq: 1, code: 'LAW111', title: 'مقدمة لدراسة القانون', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 2, code: 'LAW112', title: 'النظم السياسية', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 3, code: 'LAW113', title: 'مقدمة في الفقه الأسلامي', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 4, code: 'LAW121', title: 'مبادئ القانون التجاري', credits: 3, oqf: 3, prerequisite: 'LAW111' },
                            { seq: 5, code: 'LAW122', title: 'القانون الإداري (1)', credits: 3, oqf: 3, prerequisite: 'LAW111' },
                            { seq: 6, code: 'LAW123', title: 'مبادئ الاقتصاد', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 7, code: 'LAW124', title: 'القانون الدستوري', credits: 3, oqf: 3, prerequisite: 'LAW112' },
                            { seq: 8, code: 'LAW211', title: 'مصادر الالتزام الإرادية', credits: 3, oqf: 3, prerequisite: 'LAW111' },
                            { seq: 9, code: 'LAW212', title: 'قانون العقوبات العام (1)', credits: 3, oqf: 3, prerequisite: 'LAW111' },
                            { seq: 10, code: 'LAW213', title: 'قانون الأحوال المدنية', credits: 3, oqf: 3, prerequisite: 'LAW113' },
                            { seq: 11, code: 'LAW214', title: 'مصطلحات ودراسات قانونية باللغة الانجليزية', credits: 3, oqf: 3, prerequisite: 'LAW111' },
                            { seq: 12, code: 'LAW215', title: 'القانون الإداري (2)', credits: 3, oqf: 3, prerequisite: 'LAW122' },
                            { seq: 13, code: 'LAW221', title: 'القانون الجنائي (1)', credits: 3, oqf: 3, prerequisite: 'LAW224' },
                            { seq: 14, code: 'LAW222', title: 'القانون الدولي العام', credits: 3, oqf: 3, prerequisite: 'LAW111' },
                            { seq: 15, code: 'LAW223', title: 'مصادر الالتزام غير الإرادية', credits: 3, oqf: 3, prerequisite: 'LAW211' },
                            { seq: 16, code: 'LAW224', title: 'قانون العقوبات العام (2)', credits: 3, oqf: 3, prerequisite: 'LAW212' },
                            { seq: 17, code: 'LAW311', title: 'القانون الجنائي (2)', credits: 3, oqf: 3, prerequisite: 'LAW221' },
                            { seq: 18, code: 'LAW312', title: 'العقود المسماة', credits: 3, oqf: 3, prerequisite: 'LAW223' },
                            { seq: 19, code: 'LAW313', title: 'الأحكام والالتزامات', credits: 3, oqf: 3, prerequisite: 'LAW223' },
                            { seq: 20, code: 'LAW314', title: 'المستندات المصرفية والتجارية', credits: 3, oqf: 3, prerequisite: 'LAW211' },
                            { seq: 21, code: 'LAW315', title: 'العقوبات المدنية والتجارية', credits: 3, oqf: 3, prerequisite: 'LAW211' },
                            { seq: 22, code: 'LAW321', title: 'قانون العمل والتشريعات الاجتماعية', credits: 3, oqf: 3, prerequisite: 'LAW211' },
                            { seq: 23, code: 'LAW322', title: 'المواريث والوصايا', credits: 3, oqf: 3, prerequisite: 'LAW213' },
                            { seq: 24, code: 'LAW324', title: 'القانون البحري والجوي', credits: 3, oqf: 3, prerequisite: 'LAW313' },
                            { seq: 25, code: 'LAW325', title: 'الشركات التجارية والإفلاس', credits: 3, oqf: 3, prerequisite: 'LAW211' },
                            { seq: 26, code: 'LAW326', title: 'قانون الإجراءات الجنائية (1)', credits: 3, oqf: 3, prerequisite: 'LAW311' },
                            { seq: 27, code: 'LAW411', title: 'الحقوق العقارية الأصلية', credits: 3, oqf: 3, prerequisite: 'LAW313' },
                            { seq: 28, code: 'LAW412', title: 'القانون الدولي الخاص', credits: 3, oqf: 3, prerequisite: 'LAW315' },
                            { seq: 29, code: 'LAW413', title: 'الإجراءات المدنية والتجارية 2', credits: 3, oqf: 3, prerequisite: 'LAW315' },
                            { seq: 30, code: 'LAW414', title: 'أصول الفقه الإسلامي 1', credits: 3, oqf: 3, prerequisite: 'LAW213' },
                            { seq: 31, code: 'LAW415', title: 'التدريب العملي الداخلي', credits: 3, oqf: 3, prerequisite: '>= 90' },
                            { seq: 32, code: 'LAW421', title: 'أصول الفقه الإسلامي 2', credits: 3, oqf: 3, prerequisite: 'LAW414' },
                            { seq: 33, code: 'LAW422', title: 'قانون الإجراءات الجنائية (2)', credits: 3, oqf: 3, prerequisite: 'LAW326' },
                            { seq: 34, code: 'LAW423', title: 'حقوق الملكية العقارية الإضافية والكفالة', credits: 3, oqf: 3, prerequisite: 'LAW312' },
                            { seq: 35, code: 'LAW424', title: 'قانون الإجراءات المدنية والتجارية', credits: 3, oqf: 3, prerequisite: 'LAW315, LAW326' },
                            { seq: 36, code: 'LAW425', title: 'مشروع التخرج', credits: 3, oqf: 3, prerequisite: '>= 90' }
                        ],
                        electiveRequirements: [
                            { seq: 1, code: 'LAW401', title: 'قانون حماية المستهلك', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 2, code: 'LAW402', title: 'قانون حماية البيئة', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 3, code: 'LAW403', title: 'القوانين الجزائية الخاصة', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 4, code: 'LAW404', title: 'الجوانب القانونية للتجارة الالكترونية', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 5, code: 'LAW405', title: 'تاريخ وفلسفة القانون', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 6, code: 'LAW406', title: 'المنظمات الدولية', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 7, code: 'LAW407', title: 'قانون التأمين', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 8, code: 'LAW408', title: 'المالية العامة للتشريع الضريبي', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 9, code: 'LAW409', title: 'قانون الملكية الفكرية', credits: 3, oqf: 3, prerequisite: '-' },
                            { seq: 10, code: 'LAW410', title: 'قواعد التحكيم', credits: 3, oqf: 3, prerequisite: '-' }
                        ]
                    }
                ]
            },
            stubProgram('law-masters-public', 'الماجستير في القانون العام', 'Master of Public Law'),
            stubProgram('law-masters-private', 'الماجستير في القانون الخاص', 'Master of Private Law'),
            stubProgram('law-phd-public', 'برنامج الدكتوراه — القانون العام', 'PhD in Public Law'),
            stubProgram('law-phd-private', 'برنامج الدكتوراه — القانون الخاص', 'PhD in Private Law'),
        ],
        facultyMembers: [],
    },
]

export const graduatePrograms = [
    {
        titleAr: 'الدكتوراه في القانون العام والقانون الخاص',
        titleEn: 'PhD in Public Law and Private Law',
        descriptionAr:
            'يعد برنامج الدكتوراه في القانون العام أو الخاص امتداداً لسلسلة برامج الدراسات العليا التي تقدمها كلية البريمي الجامعية ممثلة في برنامج القانون بالتعاون الأكاديمي مع جامعة عين شمس في جمهورية مصر العربية.',
        descriptionEn:
            'The PhD in public or private law continues the college’s graduate law pathway, offered in academic partnership with Ain Shams University, Arab Republic of Egypt.',
        link: '/graduate-studies/phd',
        color: 'from-red-500 to-red-600',
    },
    {
        titleAr: 'ماجستير في القانون العام والماجستير في القانون الخاص',
        titleEn: 'Master of Public Law and Master of Private Law',
        descriptionAr:
            'أن نصبح رائدا متميزا ومنافسا قويا لمؤسسات التعليم القانوني على المستويين المحلي والإقليمي، بما يضمن تحقيق التنمية الثقافية القانونية.',
        descriptionEn:
            'Aims to excel as a leading, competitive legal education provider locally and regionally, supporting legal and cultural development.',
        link: '/graduate-studies/law-masters',
        color: 'from-orange-500 to-orange-600',
    },
    {
        titleAr: 'MBA - ماجستير في إدارة الأعمال',
        titleEn: 'MBA — Master of Business Administration',
        descriptionAr:
            'برنامج ماجستير إدارة الأعمال المتطور الذي يهدف إلى إعداد قادة الأعمال المستقبليين بمهارات إدارية وقيادية متقدمة.',
        descriptionEn:
            'An advanced MBA designed to prepare future business leaders with strong management and leadership skills.',
        link: '/graduate-studies/mba',
        color: 'from-green-500 to-green-600',
    },
    {
        titleAr: 'برنامج الماجستير في دراسات اللغة الإنجليزية',
        titleEn: 'Master in English Language Studies',
        descriptionAr:
            'برنامج متميز بالتعاون مع جامعة ولاية كاليفورنيا، نورثريدج (CSUN) يقدم تخصصين: الأدب واللغويات.',
        descriptionEn:
            'A distinguished programme in partnership with California State University, Northridge (CSUN), offering Literature and Linguistics tracks.',
        affiliationAr: 'جامعة ولاية كاليفورنيا، نورثريدج (CSUN)',
        affiliationEn: 'California State University, Northridge (CSUN)',
        specializationsAr: 'تخصص الأدب وتخصص اللغويات',
        specializationsEn: 'Literature track and Linguistics track',
        feesAr: '130 ريال عماني لكل ساعة معتمدة',
        feesEn: '130 OMR per credit hour',
        creditsAr: '33 ساعة معتمدة للبرنامج',
        creditsEn: '33 programme credit hours',
        totalFeesAr: 'إجمالي الرسوم الدراسية 4,290 ريال عماني',
        totalFeesEn: 'Total tuition fees: 4,290 OMR',
        link: '/graduate-studies/english-masters',
        color: 'from-blue-500 to-blue-600',
    },
];

export const departmentsFormMain = [
    {
        id: 'english',
        title: 'قسم اللغة الإنجليزية وآدابها',
        titleEn: 'English Language Department',
        programs: [
            'English Language',
            'برنامج الترجمة',
            'برنامج الماجستير في دراسات اللغة الإنجليزية'
        ],
        color: 'from-blue-500 to-blue-600',
        link: '/english-department'
    },
    {
        id: 'it',
        title: 'قسم تقنية المعلومات',
        titleEn: 'Information Technology Department',
        programs: [
            'تقنية المعلومات',
            'Computer Science',
            'تخصص هندسة البرمجيات',
            'الذكاء الاصطناعي',
            'الأمن السيبراني Program'
        ],
        color: 'from-purple-500 to-purple-600',
        link: '/it-department'
    },
    {
        id: 'business',
        title: 'قسم إدارة الأعمال والمحاسبة',
        titleEn: 'Business & Accounting Department',
        programs: [
            'برنامج المحاسبة',
            'تخصص تنمية الموارد البشرية',
            'Marketing',
            'برنامج إدارة الأعمال',
            'برنامج العلوم المالية والمصرفية',
            'برنامج اقتصاد الأعمال',
            'ماجستير إدارة الأعمال MBA Program'
        ],
        color: 'from-green-500 to-green-600',
        link: '/business-department'
    },
    {
        id: 'law',
        title: 'برنامج القانون - يطرح باللغة العربية',
        titleEn: 'Law Program - Arabic Language',
        programs: [
            'برنامج القانون',
            'الماجستير في القانون العام',
            'الماجستير في القانون الخاص',
            'برنامج الدكتوراة القانون العام',
            'برنامج الدكتوراة القانون الخاص'
        ],
        color: 'from-amber-500 to-amber-600',
        link: '/law-program'
    }
];