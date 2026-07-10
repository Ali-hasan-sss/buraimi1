"use client";

import { useState } from 'react';
import { BookOpen, GraduationCap } from 'lucide-react';
import CalendarHeader from '@/components/academicCalendar/Header';
import CalendarYearSelector from '@/components/academicCalendar/YearSelector';
import UniversityCalendarYear from '@/components/academicCalendar/UniversityCalendarYear';
import { NoteBox, SemesterSection } from '@/components/academicCalendar/CalendarSections';

export function AcademicCalendar() {
    const [activeYear, setActiveYear] = useState('2025-2026');
    const [activeProgram, setActiveProgram] = useState<'university' | 'foundation'>('university');

    const years = [
        '2025 – 2026',
        '2024 – 2025',
        '2023 – 2024',
        '2022 – 2023',
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Page Header */}
            <CalendarHeader />
            {/* Year Selector */}
            <CalendarYearSelector
                years={years}
                activeYear={activeYear}
                onYearChange={setActiveYear}
            />

            {/* Program Type Selector */}
            <section className="py-8 bg-gray-100">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => setActiveProgram('university')}
                            className={`flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-md hover:shadow-lg ${activeProgram === 'university'
                                ? 'bg-[#c2a772] text-white scale-105'
                                : 'bg-white text-[#254151] border-2 border-[#c2a772] hover:bg-[#c2a772]/10'
                                }`}
                        >
                            <GraduationCap className="size-6" />
                            التقويم الجامعي
                        </button>
                        <button
                            onClick={() => setActiveProgram('foundation')}
                            className={`flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-md hover:shadow-lg ${activeProgram === 'foundation'
                                ? 'bg-[#c2a772] text-white scale-105'
                                : 'bg-white text-[#254151] border-2 border-[#c2a772] hover:bg-[#c2a772]/10'
                                }`}
                        >
                            <BookOpen className="size-6" />
                            البرنامج التأسيسي
                        </button>
                    </div>
                </div>
            </section>

            {/* Calendar Content */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    {activeYear === '2025 – 2026' && activeProgram === 'university' && <Calendar2025University />}
                    {activeYear === '2025 – 2026' && activeProgram === 'foundation' && <Calendar2025Foundation />}
                    {activeProgram === 'university' && activeYear !== '2025 – 2026' && (
                        <UniversityCalendarYear year={activeYear} />
                    )}
                </div>
            </section>
        </div>
    );
}

// Calendar 2025-2026 University
function Calendar2025University() {
    return (
        <div className="space-y-8">
            <SemesterSection
                title="الفصل الدراسي الأول 2025 - 2026"
                events={[
                    { date: 'الأربعاء 10/9/2025', note: 'بدء الدوام الرسمي لأعضاء هيئة التدريس' },
                    { date: 'الأحد 14/09/2025', note: 'تسجيل المقررات الدراسية للطلاب المستمرين (ينتهي يوم الخميس 18/9/2025).' },
                    { date: 'Saturday 21/09/2025', note: 'بدء الدراسة يبدأ السحب والأظافة (ينتهي يوم الخميس 25/9/2025).' },
                    { date: 'الأحد 02/11/2025', note: 'بدء القبول للفصل الدراسي الثاني 2025/2026' },
                    { date: 'Saturday 08/11/2025', note: 'بدء امتحانات منتصف الفصل الدراسي لبرنامج الدراسات العليا (تنتهي يوم الخميس 20/11/2025).' },
                    { date: 'الأحد 08/11/2025', note: 'بدء امتحانات منتصف الفصل الدراسي للمرحلة الجامعية الأولى (تنتهي يوم الخميس 20/11/2025).' },
                    { date: 'Thursday-Friday 20-21/11/2025', note: 'العيد الوطني المجيد ال 55 لسلطنة عمان', highlight: true },
                    { date: 'الخميس 18/12/2025', note: 'نهاية فترة الانسحاب.' },
                    { date: 'الأربعاء 24/12/2025', note: 'بدء الامتحانات النهائية', highlight: true },
                    { date: 'الثلاثاء 06/01/2025', note: 'نهاية الامتحانات النهائية.' },
                    { date: 'الخميس 08/01/2025', note: 'الأجازة الفصلية للطلاب.' },
                    { date: 'الخميس 08/01/2025', note: 'إعلان النتائج النهائية.', highlight: true },
                    { date: 'الأحد 11/01/2025', note: 'اجازة رسمية بمناسبة تولي صاحب الجلالة السلطان هيثم بن طارق مقاليد الحكم في البلاد', highlight: true },
                ]}
            />

            <SemesterSection
                title="الفصل الدراسي الثاني 2025 - 2026"
                events={[
                    { date: 'الأحد 25/01/2026', note: 'تسجيل الدورات الدراسية للطلاب المستمرين (ينتهي يوم الخميس 30/1/2025).' },
                    { date: 'Friday 16/01/2026', note: 'اجازة رسمية بمناسبة ذكرى الأسراء والمعراج', highlight: true },
                    { date: 'Saturday 31/01/2026', note: 'تبدأ الدراسة في برنامج الدراسات العليا بدء السحب والإظافة (ينتهي يوم الخميس 5/2/2026).' },
                    { date: 'الأحد 01/02/2026', note: 'بدء الدراسة في المرحلة الجامعية الأولى بدء الأنسحاب والإظافة (ينتهي يوم الخميس 5/2/2026).' },
                    { date: 'الأربعاء 18/02/2026', note: 'الموعد المتوقع لبدء شهر رمضان المبارك', highlight: true },
                    { date: 'الأحد 15/03/2026', note: 'بدء القبول للفصل الدراسي الأول 2026 - 2027' },
                    { date: 'Friday 20/03/2026', note: 'التاريخ المتوقع لعيد الفطر السعيد', highlight: true },
                    { date: 'Saturday 21/03/2026', note: 'بدء امتحانات منتصف الفصل الدراسي لبرنامج الدراسات العليا (تنتهي يوم الخميس 2/4/2026).' },
                    { date: 'الأحد 22/03/2026', note: 'Start of Midterm Exams for undergraduate program (ends by Thursday 2/4/2026).' },
                    { date: 'الخميس 30/04/2026', note: 'نهاية فترة الانسحاب.' },
                    { date: 'الأحد 10/05/2026', note: 'بدء الامتحانات النهائية', highlight: true },
                    { date: 'الخميس 21/05/2026', note: 'نهاية الامتحانات النهائية.' },
                    { date: 'الأحد 24/05/2026', note: 'بداية العطلة الصيفية للطلاب' },
                    { date: 'الأحد 24/05/2026', note: 'إعلان النتائج النهائية.', highlight: true },
                ]}
            />

            <SemesterSection
                title="الفصل الدراسي الصيفي 2025 - 2026"
                events={[
                    { date: 'الأحد 02/06/2026', note: 'يبدأ التسجيل الصيفي وإضافة/حذف المواد الدراسية. (ينتهي يوم الثلاثاء 2/6/2026)' },
                    { date: 'الأربعاء 03/06/2026', note: 'بدء الدراسة.' },
                    { date: 'الأحد 21/06/2026', note: 'بدء امتحانات منتصف الفصل الدراسي (تنتهي يوم الأربعاء 28/06/2026).' },
                    { date: 'الأربعاء 08/07/2026', note: 'تنتهي فترة السحب.' },
                    { date: 'الأربعاء 15/07/2026', note: 'بدء الامتحانات النهائية (تنتهي يوم الأربعاء 22/7/2026)', highlight: true },
                    { date: 'الأحد 23/07/2026', note: 'الأجازة الصيفية للطلاب.' },
                    { date: 'الأحد 26/07/2026', note: 'بدء إجازات أعضاء الهيئة التدريسة' },
                    { date: 'الأحد 26/07/2026', note: 'إعلان النتائج النهائية.', highlight: true },
                    { date: 'الأربعاء 09/09/2026', note: 'عودة أعضاء الهيئة التدريسية إلى العمل.' },
                    { date: 'الأحد 20/09/2026', note: 'بداية الفصل الدراسي الأول 2026/2027' },
                ]}
            />

            <NoteBox>
                في الفصل الصيفي، سيتم توزيع المحاضرات على النحو التالي:
                <br />• الفترة الصباحية : (08:00-09:30، 09:30-11:00، 11:00-12:30، 12:30-02:00) من الأحد إلى الأربعاء.
                <br />• الفترة المسائية : (02-3:30، 3:30-05:00، 05:00-06:30، 06:30-08:00، 08:00-09:30) من الأحد إلى الأربعاء.
            </NoteBox>
        </div>
    );
}

// Calendar 2025-2026 Foundation
function Calendar2025Foundation() {
    return (
        <div className="space-y-8">
            <SemesterSection
                title="الفصل الدراسي الأول 2025 - 2026"
                events={[
                    { date: 'الأربعاء 03/9/2025', note: 'بدء الدوام الرسمي لأعضاء هيئة التدريس' },
                    { date: 'Friday 05/09/2025', note: 'ذكرى المولد النبوي الشريف', highlight: true },
                    { date: 'الأحد 07/09/2025', note: 'تسجيل المقررات الدراسية للطلبة البرنامج التأسيسي (ينتهي يوم الخميس 18/9/2025).' },
                    { date: 'الأثنين 08/09/2025', note: 'اختبار تحديد المستوى للطلاب الجدد (ينتهي يوم الأربعاء 10/09/2025).' },
                    { date: 'الأحد 14/09/2025', note: 'بدء الدراسة يبدأ السحب والأظافة (ينتهي يوم الخميس 18/9/2025).' },
                    { date: 'الأحد 02/11/2025', note: 'بدء امتحانات منتصف الفصل الدراسي (تنتهي يوم الخميس 10/11/2022).' },
                    { date: 'Thursday-Friday 20-21/11/2025', note: 'العيد الوطني المجيد ال 55 لسلطنة عمان', highlight: true },
                    { date: 'الخميس 11/12/2025', note: 'نهاية فترة الانسحاب.' },
                    { date: 'الأحد 21/12/2025', note: 'بدء الامتحانات النهائية', highlight: true },
                    { date: 'الثلاثاء 25/12/2025', note: 'نهاية الامتحانات النهائية.' },
                    { date: 'الأحد 28/12/2025', note: 'الأجازة الفصلية للطلاب.' },
                    { date: 'الأحد 28/12/2025', note: 'إعلان النتائج النهائية.', highlight: true },
                    { date: 'الأحد 28/12/2025', note: 'امتحان الاعادة' },
                    { date: 'الأثنين 29/12/2025', note: 'إعلان نتائج اعادة الإمتحان' },
                    { date: 'Friday 16/01/2026', note: 'ذكرى مناسبة الإسراء والمعراج', highlight: true },
                ]}
            />

            <SemesterSection
                title="الفصل الدراسي الثاني 2025 - 2026"
                events={[
                    { date: 'الأحد 11/01/2026', note: 'اجازة رسمية بمناسبة تولي صاحب الجلالة السلطان هيثم بن طارق مقاليد الحكم في البلاد', highlight: true },
                    { date: 'الأثنين 12/01/2026', note: 'اختبار تحديد المستوى للطلاب الجدد (ينتهي يوم الاثنين 20/01/2026).' },
                    { date: 'الثلاثاء 13/01/2026', note: 'تسجيل المقررات الدراسية للطلبة البرنامج التأسيسي (ينتهي يوم الخميس 15/01/2026).' },
                    { date: 'Friday 16/01/2026', note: 'عطلة رسمية بمناسبة ذكرى الإسراء والمعراج', highlight: true },
                    { date: 'الأحد 18/01/2026', note: 'بدء الدراسة في البرنامج التأسيسي وبدء الأنسحاب والإظافة (ينتهي يوم الخميس 22/01/2026).' },
                    { date: 'الأربعاء 18/02/2026', note: 'الموعد المتوقع لبدء شهر رمضان المبارك', highlight: true },
                    { date: 'الأحد 08/03/2026', note: 'Start of Midterm Exams ( ends by Monday 16/03/2026 ).' },
                    { date: 'Friday 20-03/2026', note: 'التاريخ المتوقع لعيد الفطر السعيد', highlight: true },
                    { date: 'الخميس 16/04/2026', note: 'نهاية فترة الانسحاب.' },
                    { date: 'الأحد 26/04/2026', note: 'بدء الامتحانات النهائية', highlight: true },
                    { date: 'الثلاثاء 30/04/2026', note: 'نهاية الامتحانات النهائية.' },
                    { date: 'الأحد 03/05/2026', note: 'الأجازة الفصلية للطلاب.' },
                    { date: 'الأحد 03/05/2026', note: 'إعلان النتائج النهائية.', highlight: true },
                    { date: 'الأحد 03/05/2025', note: 'امتحان الاعادة' },
                    { date: 'الأثنين 04/05/2026', note: 'إعلان نتائج اعادة الإمتحان' },
                ]}
            />

            <SemesterSection
                title="الفصل الدراسي الصيفي 2025 - 2026"
                events={[
                    { date: 'الأثنين 04/05/2026', note: 'يبدأ التسجيل الصيفي وإضافة/حذف المواد الدراسية. (ينتهي يوم الثلاثاء 07/05/2026)' },
                    { date: 'الأحد 10/05/2026', note: 'بدء الدراسة.' },
                    { date: 'الأربعاء 27/05/2026', note: 'التاريخ المتوقع لعيد الأصحى المبارك', highlight: true },
                    { date: 'الأثنين 01/06/2026', note: 'بدء امتحانات منتصف الفصل الدراسي (تنتهي يوم الأربعاء 08/06/2026).' },
                    { date: 'الأربعاء 01/07/2026', note: 'تنتهي فترة السحب.' },
                    { date: 'الثلاثاء 07/07/2026', note: 'بدء الامتحانات النهائية (تنتهي يوم الثلاثاء 14/07/2026)', highlight: true },
                    { date: 'الثلاثاء 15/07/2026', note: 'الأجازة الصيفية للطلاب.' },
                    { date: 'الأحد 19/07/2026', note: 'بدء إجازات أعضاء الهيئة التدريسة' },
                    { date: 'الأحد 19/07/2026', note: 'إعلان النتائج النهائية.', highlight: true },
                    { date: 'الأربعاء 02/09/2026', note: 'العودة إلى العمل لأعضاء الهيئة التدريسية.' },
                    { date: 'الأحد 13/09/2026', note: 'بداية الفصل الدراسي الأول 2026/2027' },
                ]}
            />

            <NoteBox>
                في الفصل الصيفي، سيتم توزيع المحاضرات على النحو التالي:
                <br />• الفترة الصباحية : (08:00-09:30، 09:30-11:00، 11:00-12:30، 12:30-02:00) من الأحد إلى الأربعاء.
                <br />• الفترة المسائية : (02-3:30، 3:30-05:00، 05:00-06:30، 06:30-08:00، 08:00-09:30) من الأحد إلى الأربعاء.
            </NoteBox>
        </div>
    );
}

export default AcademicCalendar;