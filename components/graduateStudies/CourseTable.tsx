import { Course } from "@/types/GraduateTyps";

export default function CourseTable({
    index,
    accent,
    title,
    isRtl,
    courses,
    headers,
}: {
    index: number;
    accent: 'blue' | 'green' | 'purple' | 'red';
    title: string;
    isRtl: boolean;
    courses: Course[];
    headers: { seq: string; code: string; title: string; credits: string };
}) {
    const headerGradient =
        accent === 'blue'
            ? 'from-blue-600 to-blue-700'
            : accent === 'green'
                ? 'from-green-600 to-green-700'
                : accent === 'purple'
                    ? 'from-purple-600 to-purple-700'
                    : 'from-red-600 to-red-700';
    const rowHover =
        accent === 'blue'
            ? 'hover:bg-blue-50'
            : accent === 'green'
                ? 'hover:bg-green-50'
                : accent === 'purple'
                    ? 'hover:bg-purple-50'
                    : 'hover:bg-red-50';
    const codeColor =
        accent === 'blue'
            ? 'text-blue-600'
            : accent === 'green'
                ? 'text-green-600'
                : accent === 'purple'
                    ? 'text-purple-600'
                    : 'text-red-600';

    return (
        <div className="mb-8">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#254151] mb-4 sm:mb-6 flex items-center gap-3">
                <div
                    className={`text-white size-9 sm:size-10 rounded-full flex items-center justify-center ${accent === 'blue'
                        ? 'bg-blue-600'
                        : accent === 'green'
                            ? 'bg-green-600'
                            : accent === 'purple'
                                ? 'bg-purple-600'
                                : 'bg-red-600'
                        }`}
                >
                    {index}
                </div>
                {title}
            </h3>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-200">
                <div className="w-full overflow-x-auto">
                    <table className="w-full min-w-[720px]">
                        <thead className={`bg-gradient-to-r ${headerGradient} text-white`}>
                            <tr>
                                <th className="px-4 sm:px-6 py-4 text-right">{headers.seq}</th>
                                <th className="px-4 sm:px-6 py-4 text-right">{headers.code}</th>
                                <th className="px-4 sm:px-6 py-4 text-right">{headers.title}</th>
                                <th className="px-4 sm:px-6 py-4 text-center">{headers.credits}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course, i) => {
                                const title = isRtl ? course.titleAr : course.titleEn;
                                const credits = course.times ? course.credits * course.times : course.credits;
                                return (
                                    <tr key={`${course.code}-${i}`} className={`border-b ${rowHover} transition-colors`}>
                                        <td className="px-4 sm:px-6 py-4 font-semibold">{i + 1}</td>
                                        <td className={`px-4 sm:px-6 py-4 font-mono ${codeColor}`}>{course.code}</td>
                                        <td className="px-4 sm:px-6 py-4">{title}</td>
                                        <td className="px-4 sm:px-6 py-4 text-center font-bold">{credits}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
