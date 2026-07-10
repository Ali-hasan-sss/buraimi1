import React from 'react';
import Link from 'next/link';
import { Award, Globe, Users, Clock, Laptop, ChartColumn, BookOpen, FileText, Target, CircleCheckBig, Monitor, Smartphone, ChevronLeft, GraduationCap, TrendingUp } from 'lucide-react';
import { getLocale } from 'next-intl/server';

export default async function OxfordPlacementTestPage() {
  const locale = await getLocale();
  const isAr = locale === 'ar';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#254151] via-[#6096b4] to-[#254151] text-white py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm p-5 rounded-full">
                <Award className="size-16" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-4">{isAr ? 'اختبار تحديد المستوى من أكسفورد' : 'Oxford Placement Test'}</h1>
            <h2 className="text-2xl font-bold mb-6 opacity-90">{isAr ? 'Oxford Placement Test' : 'اختبار تحديد المستوى من أكسفورد'}</h2>
            <p className="text-xl opacity-95 leading-relaxed">
              {isAr 
                ? 'اختبر مستوى طلابك في اللغة الإنجليزية بسرعة وسهولة باستخدام اختبار تحديد المستوى من أكسفورد، الذي ساعد ملايين الطلاب في الالتحاق بالفصل الدراسي المناسب لهم.'
                : 'Assess your students\' English level quickly and easily using the Oxford Placement Test, which has helped millions of students enroll in the right class for them.'}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* About Section */}
          <div className="mb-12">
            <div className="bg-white rounded-lg shadow-xl p-10 border-2 border-blue-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-blue-600 text-white p-4 rounded-full">
                  <Globe className="size-8" />
                </div>
                <h2 className="text-3xl font-bold text-[#254151]">{isAr ? 'نبذة عن الاختبار' : 'About the Test'}</h2>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 border-2 border-blue-200">
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  {isAr 
                    ? 'اختبار تحديد المستوى من أكسفورد هو أداة تقييم متقدمة ومعترف بها دولياً لقياس مستوى الكفاءة في اللغة الإنجليزية. يستخدم الاختبار تقنية التكيف الحاسوبي المتطورة لتوفير تقييم دقيق وسريع لمستوى الطالب.'
                    : 'The Oxford Placement Test is an advanced, internationally recognized assessment tool for measuring English language proficiency. The test uses sophisticated computer-adaptive technology to provide accurate and rapid assessment of student level.'}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-6 rounded-lg shadow-md border-2 border-blue-200">
                    <div className="flex items-center gap-3 mb-2">
                      <Users className="size-6 text-blue-600" />
                      <h3 className="font-bold text-[#254151]">{isAr ? 'الفئة المستهدفة' : 'Target Audience'}</h3>
                    </div>
                    <p className="text-gray-700">{isAr ? 'طلاب المرحلة الثانوية العليا والطلاب الكبار' : 'Upper secondary school students and adult learners'}</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md border-2 border-blue-200">
                    <div className="flex items-center gap-3 mb-2">
                      <Award className="size-6 text-blue-600" />
                      <h3 className="font-bold text-[#254151]">{isAr ? 'الاعتماد الدولي' : 'International Accreditation'}</h3>
                    </div>
                    <p className="text-gray-700">{isAr ? 'معتمد على إطار CEFR العالمي المعترف به' : 'Aligned with the internationally recognized CEFR framework'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#254151] mb-8 text-center">{isAr ? 'مميزات الاختبار' : 'Test Features'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Users, title: isAr ? 'مناسب للمرحلة الثانوية والكبار' : 'Suitable for Secondary & Adults', desc: isAr ? 'مصمم خصيصاً لطلاب المرحلة الثانوية العليا والطلاب الكبار' : 'Designed specifically for upper secondary and adult students', color: 'blue' },
                { icon: Globe, title: isAr ? '100% عبر الإنترنت' : '100% Online', desc: isAr ? 'مصمم للاستخدام على أي جهاز - في المنزل أو المدرسة أو العمل' : 'Designed for use on any device - at home, school, or work', color: 'green' },
                { icon: Clock, title: isAr ? 'التصحيح التلقائي' : 'Automatic Scoring', desc: isAr ? 'يوفر لك الوقت من خلال التصحيح التلقائي الفوري' : 'Saves you time with immediate automatic scoring', color: 'purple' },
                { icon: ChartColumn, title: isAr ? 'نظام إدارة التعلم' : 'Learning Management System', desc: isAr ? 'يسهل إعداد الاختبارات وإدارة النتائج بكفاءة' : 'Makes it easy to set up tests and manage results efficiently', color: 'amber' },
                { icon: Laptop, title: isAr ? 'التكيف الحاسوبي' : 'Computer-Adaptive', desc: isAr ? 'توفر تقنية التكيف الحاسوبي نتائج أكثر دقة' : 'Computer-adaptive technology provides more accurate results', color: 'red' },
                { icon: Award, title: isAr ? 'نتائج شاملة' : 'Comprehensive Results', desc: isAr ? 'مستوى CEFR ودرجة من 120 والوقت المستغرق' : 'CEFR level, score out of 120, and time taken', color: 'indigo' },
              ].map((feature, idx) => (
                <div key={idx} className={`bg-white rounded-lg shadow-xl p-8 border-2 border-${feature.color}-200 hover:shadow-2xl transition-all`}>
                  <div className={`bg-${feature.color}-600 text-white size-16 rounded-full flex items-center justify-center mb-4`}>
                    <feature.icon className="size-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[#254151] mb-3">{feature.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CEFR Levels Section */}
          <div className="mb-12">
            <div className="bg-white rounded-lg shadow-xl p-10 border-2 border-purple-200">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-purple-600 text-white p-4 rounded-full">
                  <TrendingUp className="size-8" />
                </div>
                <h2 className="text-3xl font-bold text-[#254151]">{isAr ? 'مستويات CEFR' : 'CEFR Levels'}</h2>
              </div>
              <div className="space-y-4">
                {[
                  { level: 'Pre-A1', title: isAr ? 'مبتدئ' : 'Beginner', desc: isAr ? 'معرفة أساسية جداً باللغة الإنجليزية' : 'Very basic knowledge of English', score: '0-20/120', color: 'red' },
                  { level: 'A1', title: isAr ? 'مستوى أساسي' : 'Elementary', desc: isAr ? 'قدرة على فهم واستخدام تعبيرات مألوفة وجمل بسيطة جداً' : 'Can understand and use familiar expressions and very basic phrases', score: '21-30/120', color: 'orange' },
                  { level: 'A2', title: isAr ? 'ابتدائي' : 'Pre-Intermediate', desc: isAr ? 'قدرة على التواصل في مهام بسيطة ومباشرة' : 'Can communicate in simple and routine tasks', score: '31-40/120', color: 'amber' },
                  { level: 'B1', title: isAr ? 'متوسط' : 'Intermediate', desc: isAr ? 'قدرة على التعامل مع معظم المواقف في بلد يتحدث اللغة' : 'Can deal with most situations likely to arise while traveling', score: '41-55/120', color: 'yellow' },
                  { level: 'B2', title: isAr ? 'متوسط متقدم' : 'Upper-Intermediate', desc: isAr ? 'قدرة على التفاعل بطلاقة وعفوية مع الناطقين الأصليين' : 'Can interact with a degree of fluency and spontaneity', score: '56-75/120', color: 'lime' },
                  { level: 'C1', title: isAr ? 'متقدم' : 'Advanced', desc: isAr ? 'قدرة على استخدام اللغة بمرونة وفعالية للأغراض الاجتماعية والأكاديمية' : 'Can use language flexibly and effectively for social, academic purposes', score: '76-95/120', color: 'green' },
                  { level: 'C2', title: isAr ? 'إتقان' : 'Proficient', desc: isAr ? 'قدرة على فهم كل ما يُسمع أو يُقرأ تقريباً بسهولة' : 'Can understand with ease virtually everything heard or read', score: '96-120/120', color: 'blue' },
                ].map((item, idx) => (
                  <div key={idx} className={`bg-${item.color}-50 rounded-lg p-6 border-2 border-${item.color}-200 hover:shadow-lg transition-all`}>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`bg-${item.color}-600 text-white size-16 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0`}>
                          {item.level}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-[#254151] mb-1">{item.title}</h3>
                          <p className="text-gray-700">{item.desc}</p>
                        </div>
                      </div>
                      <div className={`bg-${item.color}-600 text-white px-6 py-3 rounded-full font-bold text-lg`}>{item.score}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-purple-50 p-6 rounded-lg border-2 border-purple-200">
                <div className="flex items-start gap-3">
                  <Award className="size-8 text-purple-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-[#254151] text-xl mb-2">{isAr ? 'ما هو إطار CEFR؟' : 'What is CEFR?'}</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {isAr 
                        ? 'الإطار الأوروبي المرجعي المشترك للغات (CEFR) هو معيار دولي لوصف الكفاءة اللغوية على مقياس من ستة نقاط، من A1 للمبتدئين إلى C2 للذين أتقنوا اللغة. يتم استخدامه على نطاق واسع في جميع أنحاء العالم كمعيار لقياس مستوى اللغة.'
                        : 'The Common European Framework of Reference for Languages (CEFR) is an international standard for describing language ability on a six-point scale, from A1 for beginners to C2 for those who have mastered a language. It is used widely around the world as a benchmark for measuring language proficiency.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Test Sections */}
          <div className="mb-12">
            <div className="bg-white rounded-lg shadow-xl p-10 border-2 border-green-200">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-green-600 text-white p-4 rounded-full">
                  <FileText className="size-8" />
                </div>
                <h2 className="text-3xl font-bold text-[#254151]">{isAr ? 'أقسام الاختبار' : 'Test Sections'}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: BookOpen, title: isAr ? 'الاستخدام اللغوي' : 'Use of English', subtitle: 'Use of English', desc: isAr ? 'اختبار القواعد والمفردات والتراكيب اللغوية' : 'Tests grammar, vocabulary, and language structures', color: 'blue' },
                  { icon: Award, title: isAr ? 'الاستماع' : 'Listening', subtitle: 'Listening', desc: isAr ? 'اختبار القدرة على فهم المحادثات والنصوص المسموعة' : 'Tests ability to understand conversations and audio texts', color: 'green' },
                  { icon: FileText, title: isAr ? 'القراءة' : 'Reading', subtitle: 'Reading', desc: isAr ? 'اختبار الفهم القرائي والقدرة على استخراج المعلومات' : 'Tests reading comprehension and information extraction', color: 'purple' },
                  { icon: Target, title: isAr ? 'الكتابة' : 'Writing', subtitle: 'Writing', desc: isAr ? 'اختبار القدرة على الكتابة والتعبير بوضوح' : 'Tests writing ability and clear expression', color: 'amber' },
                ].map((section, idx) => (
                  <div key={idx} className={`bg-${section.color}-50 rounded-lg p-8 border-2 border-${section.color}-200`}>
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`bg-${section.color}-600 text-white size-16 rounded-full flex items-center justify-center flex-shrink-0`}>
                        <section.icon className="size-8" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#254151] mb-1">{section.title}</h3>
                        <p className="text-gray-600 text-lg">{section.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{section.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-green-50 p-6 rounded-lg border-2 border-green-200">
                <p className="text-gray-700 text-lg">
                  <strong>{isAr ? 'ملاحظة:' : 'Note:'}</strong> {isAr ? 'يستخدم الاختبار تقنية التكيف الحاسوبي، مما يعني أن مستوى الأسئلة يتغير تلقائياً بناءً على إجابات الطالب لتوفير تقييم أكثر دقة.' : 'The test uses computer-adaptive technology, meaning the difficulty level changes automatically based on student responses to provide a more accurate assessment.'}
                </p>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-12">
            <div className="bg-white rounded-lg shadow-xl p-10 border-2 border-indigo-200">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-indigo-600 text-white p-4 rounded-full">
                  <Target className="size-8" />
                </div>
                <h2 className="text-3xl font-bold text-[#254151]">{isAr ? 'كيف يعمل الاختبار' : 'How It Works'}</h2>
              </div>
              <div className="relative">
                {[
                  { step: 1, title: isAr ? 'التسجيل' : 'Registration', desc: isAr ? 'يقوم الطالب بالتسجيل في النظام باستخدام رمز الوصول المقدم من الكلية' : 'Student registers in the system using the access code provided by the college' },
                  { step: 2, title: isAr ? 'بدء الاختبار' : 'Start Test', desc: isAr ? 'يبدأ الطالب الاختبار عبر الإنترنت من خلال أي جهاز متصل بالإنترنت' : 'Student starts the test online through any internet-connected device' },
                  { step: 3, title: isAr ? 'الإجابة التكيفية' : 'Adaptive Response', desc: isAr ? 'يتكيف مستوى الأسئلة تلقائياً بناءً على إجابات الطالب للحصول على تقييم دقيق' : 'Question difficulty adapts automatically based on student responses for accurate assessment' },
                  { step: 4, title: isAr ? 'النتائج الفورية' : 'Instant Results', desc: isAr ? 'يحصل الطالب والمدرس على النتائج فوراً مع مستوى CEFR والتوصيات' : 'Student and teacher receive immediate results with CEFR level and recommendations' },
                  { step: 5, title: isAr ? 'التوجيه الأكاديمي' : 'Academic Guidance', desc: isAr ? 'يتم توجيه الطالب إلى المستوى المناسب في البرنامج التأسيسي بناءً على النتائج' : 'Student is guided to the appropriate level in the foundation program based on results' },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6 mb-8 last:mb-0">
                    <div className="flex flex-col items-center">
                      <div className="bg-indigo-600 text-white size-16 rounded-full flex items-center justify-center font-bold text-2xl flex-shrink-0">
                        {item.step}
                      </div>
                      {idx < 4 && <div className="w-0.5 h-full bg-indigo-200 mt-2"></div>}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="bg-indigo-50 rounded-lg p-6 border-2 border-indigo-200">
                        <h3 className="text-xl font-bold text-[#254151] mb-2">{item.title}</h3>
                        <p className="text-gray-700 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Advantages */}
          <div className="mb-12">
            <div className="bg-white rounded-lg shadow-xl p-10 border-2 border-amber-200">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-amber-600 text-white p-4 rounded-full">
                  <CircleCheckBig className="size-8" />
                </div>
                <h2 className="text-3xl font-bold text-[#254151]">{isAr ? 'مزايا استخدام الاختبار' : 'Advantages of Using the Test'}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: Clock, title: isAr ? 'سرعة النتائج' : 'Fast Results', desc: isAr ? 'احصل على نتائج فورية فور انتهاء الطالب من الاختبار' : 'Get immediate results as soon as student finishes the test' },
                  { icon: Target, title: isAr ? 'دقة عالية' : 'High Accuracy', desc: isAr ? 'تقنية التكيف الحاسوبي توفر تقييماً دقيقاً لمستوى الطالب الحقيقي' : 'Computer-adaptive technology provides accurate assessment of student level' },
                  { icon: CircleCheckBig, title: isAr ? 'سهولة الاستخدام' : 'Easy to Use', desc: isAr ? 'واجهة بسيطة وسهلة الاستخدام للطلاب والمدرسين' : 'Simple, user-friendly interface for students and teachers' },
                  { icon: Globe, title: isAr ? 'مرونة الوصول' : 'Flexible Access', desc: isAr ? 'يمكن إجراء الاختبار من أي مكان وعلى أي جهاز' : 'Test can be taken from anywhere on any device' },
                  { icon: ChartColumn, title: isAr ? 'تقارير شاملة' : 'Comprehensive Reports', desc: isAr ? 'تقارير مفصلة لكل طالب مع توصيات للمستوى المناسب' : 'Detailed reports for each student with level recommendations' },
                  { icon: Award, title: isAr ? 'معيار دولي' : 'International Standard', desc: isAr ? 'معتمد على إطار CEFR المعترف به عالمياً' : 'Aligned with globally recognized CEFR framework' },
                ].map((adv, idx) => (
                  <div key={idx} className="bg-amber-50 rounded-lg p-6 border-2 border-amber-200">
                    <div className="bg-amber-600 text-white size-14 rounded-full flex items-center justify-center mb-4">
                      <adv.icon className="size-7" />
                    </div>
                    <h3 className="font-bold text-[#254151] text-lg mb-2">{adv.title}</h3>
                    <p className="text-gray-700">{adv.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Report Cards */}
          <div className="mb-12">
            <div className="bg-white rounded-lg shadow-xl p-10 border-2 border-teal-200">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-teal-600 text-white p-4 rounded-full">
                  <ChartColumn className="size-8" />
                </div>
                <h2 className="text-3xl font-bold text-[#254151]">{isAr ? 'بطاقات التقرير' : 'Report Cards'}</h2>
              </div>
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-8 border-2 border-teal-200 mb-6">
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  {isAr 
                    ? 'يحصل كل طالب على بطاقة تقرير شاملة تتضمن معلومات تفصيلية عن أدائه في الاختبار. تساعد هذه التقارير المدرسين في اتخاذ قرارات مستنيرة بشأن المستوى الأكاديمي المناسب لكل طالب.'
                    : 'Each student receives a comprehensive report card with detailed information about their test performance. These reports help teachers make informed decisions about the appropriate academic level for each student.'}
                </p>
                <h3 className="font-bold text-[#254151] text-xl mb-4">{isAr ? 'تتضمن بطاقة التقرير:' : 'Report Card Includes:'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    isAr ? 'مستوى CEFR الكامل (من Pre-A1 إلى C2)' : 'Full CEFR level (from Pre-A1 to C2)',
                    isAr ? 'درجة رقمية من 120 نقطة' : 'Numerical score out of 120',
                    isAr ? 'الوقت المستغرق لإتمام الاختبار' : 'Time taken to complete the test',
                    isAr ? 'نتائج تفصيلية لكل قسم من أقسام الاختبار' : 'Detailed results for each test section',
                    isAr ? 'دليل تفسير الدرجات والمستويات' : 'Guide to interpreting scores and levels',
                    isAr ? 'معلومات عن الكفاءات اللغوية التفاعلية' : 'Information on interactive language competences',
                    isAr ? 'توصيات للمستوى الدراسي المناسب' : 'Recommendations for appropriate study level',
                    isAr ? 'مقارنة الأداء بالمعايير الدولية' : 'Performance comparison with international standards',
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-4 shadow-md border-2 border-teal-200">
                      <div className="flex items-start gap-3">
                        <CircleCheckBig className="size-6 text-teal-600 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-700 font-semibold">{item}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 border-2 border-teal-300 shadow-lg">
                <div className="flex items-start gap-4">
                  <FileText className="size-10 text-teal-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-[#254151] text-xl mb-2">{isAr ? 'نموذج بطاقة التقرير' : 'Sample Report Card'}</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {isAr 
                        ? 'للاطلاع على نموذج بطاقة التقرير وفهم كيفية قراءة النتائج، يمكنك تحميل دليل تفسير النتائج.'
                        : 'To view a sample report card and understand how to read the results, you can download the score interpretation guide.'}
                    </p>
                    <button className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-teal-700 transition-all">
                      {isAr ? 'تحميل دليل تفسير النتائج' : 'Download Score Interpretation Guide'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Device Compatibility */}
          <div className="mb-12">
            <div className="bg-white rounded-lg shadow-xl p-10 border-2 border-blue-200">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-blue-600 text-white p-4 rounded-full">
                  <Monitor className="size-8" />
                </div>
                <h2 className="text-3xl font-bold text-[#254151]">{isAr ? 'متوافق مع جميع الأجهزة' : 'Compatible with All Devices'}</h2>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 border-2 border-blue-200 mb-6">
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  {isAr 
                    ? 'تم تصميم الاختبار ليعمل بسلاسة على أي جهاز متصل بالإنترنت، مما يوفر مرونة كاملة للطلاب لإجراء الاختبار من أي مكان.'
                    : 'The test is designed to work smoothly on any internet-connected device, providing complete flexibility for students to take the test from anywhere.'}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { icon: Monitor, label: isAr ? 'الحاسوب المكتبي' : 'Desktop Computer' },
                    { icon: Laptop, label: isAr ? 'الحاسوب المحمول' : 'Laptop' },
                    { icon: Smartphone, label: isAr ? 'الهاتف الذكي' : 'Smartphone' },
                    { icon: Smartphone, label: isAr ? 'الجهاز اللوحي' : 'Tablet' },
                  ].map((device, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-6 text-center shadow-md border-2 border-blue-200 hover:shadow-lg transition-all">
                      <div className="bg-blue-600 text-white size-16 rounded-full flex items-center justify-center mx-auto mb-3">
                        <device.icon className="size-8" />
                      </div>
                      <p className="font-bold text-[#254151]">{device.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                <div className="flex items-start gap-3">
                  <Globe className="size-8 text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-[#254151] text-xl mb-2">{isAr ? 'اختبر من أي مكان' : 'Test from Anywhere'}</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {isAr 
                        ? 'يمكن للطلاب إجراء الاختبار من المنزل، المدرسة، العمل، أو أي مكان آخر متصل بالإنترنت، مما يوفر راحة وسهولة الوصول للجميع.'
                        : 'Students can take the test from home, school, work, or any other internet-connected location, providing convenience and easy access for everyone.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* More Info */}
          <div className="mb-12">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-xl p-10 border-2 border-purple-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-purple-600 text-white p-4 rounded-full">
                  <Globe className="size-8" />
                </div>
                <h2 className="text-3xl font-bold text-[#254151]">{isAr ? 'للمزيد من المعلومات' : 'For More Information'}</h2>
              </div>
              <div className="bg-white rounded-lg p-8 shadow-lg">
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  {isAr 
                    ? 'للحصول على معلومات تفصيلية أكثر حول اختبار تحديد المستوى من أكسفورد، والوصول إلى الموارد التعليمية، والاطلاع على الدراسات والأبحاث المتعلقة بالاختبار، يرجى زيارة الموقع الرسمي.'
                    : 'For more detailed information about the Oxford Placement Test, access to educational resources, and to review studies and research related to the test, please visit the official website.'}
                </p>
                <a 
                  href="https://www.oxfordenglishtesting.com/placement-test" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-purple-700 transition-all text-lg shadow-lg"
                >
                  <Globe className="size-6" />
                  <span>{isAr ? 'زيارة موقع اختبار أكسفورد الرسمي' : 'Visit Oxford Placement Test Official Website'}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-xl p-10 border-2 border-green-200">
            <div className="flex items-start gap-4">
              <div className="bg-green-600 text-white size-16 rounded-full flex items-center justify-center flex-shrink-0">
                <Award className="size-8" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[#254151] text-2xl mb-3">{isAr ? 'هل لديك أسئلة؟' : 'Have Questions?'}</h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  {isAr 
                    ? 'لمزيد من المعلومات حول اختبار تحديد المستوى من أكسفورد أو للحصول على المساعدة في التسجيل، يرجى التواصل مع مكتب البرنامج التأسيسي في كلية البريمي الجامعية.'
                    : 'For more information about the Oxford Placement Test or for help with registration, please contact the Foundation Program office at Buraimi University College.'}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-200">
                    <h4 className="font-bold text-[#254151] mb-2">{isAr ? 'ساعات العمل' : 'Working Hours'}</h4>
                    <p className="text-gray-700">{isAr ? 'الأحد - الخميس: 8:00 ص - 4:00 م' : 'Sunday - Thursday: 8:00 AM - 4:00 PM'}</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-200">
                    <h4 className="font-bold text-[#254151] mb-2">{isAr ? 'التواصل' : 'Contact'}</h4>
                    <p className="text-gray-700">{isAr ? 'زيارة مكتب البرنامج التأسيسي' : 'Visit the Foundation Program Office'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#6096b4] to-[#254151] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">{isAr ? 'هل أنت مستعد لمعرفة مستواك؟' : 'Ready to Know Your Level?'}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {isAr 
              ? 'اكتشف مستواك الحقيقي في اللغة الإنجليزية باستخدام اختبار أكسفورد المعتمد دولياً'
              : 'Discover your true English level using the internationally recognized Oxford Test'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/main/foundation-program" 
              className="inline-flex items-center gap-2 bg-white text-[#254151] px-8 py-4 rounded-lg font-bold hover:shadow-2xl transition-all text-lg"
            >
              <GraduationCap className="size-6" />
              <span>{isAr ? 'البرنامج التأسيسي' : 'Foundation Program'}</span>
            </Link>
            <Link 
              href="/foundation-completion-exam" 
              className="inline-flex items-center gap-2 bg-[#c2a772] text-white px-8 py-4 rounded-lg font-bold hover:shadow-2xl transition-all text-lg"
            >
              <FileText className="size-6" />
              <span>{isAr ? 'امتحان الإكمال' : 'Completion Exam'}</span>
            </Link>
            <Link 
              href="/academic-affairs" 
              className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-[#254151] transition-all text-lg"
            >
              <ChevronLeft className="size-6" />
              <span>{isAr ? 'العودة للشؤون الأكاديمية' : 'Back to Academic Affairs'}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
