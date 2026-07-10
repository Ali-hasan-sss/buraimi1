import { DepartmentCourse } from "@/types/department";

export default function CourseContain(
    { title, data, totalCredits }:
        { title: string, data: DepartmentCourse[], totalCredits: number }
) {
    return (
        <div className="mb-10">
            <h3 className="text-2xl text-[#254151] mb-4 flex items-center gap-3">
                <div className="w-2 h-8 bg-[#c2a772] rounded"></div>
                {title}
                <span className="text-lg text-[#6096b4]">({totalCredits} ساعة معتمدة)</span>
            </h3>
            <div className="overflow-x-auto border-2 border-[#c2a772]/20">
                <table className="w-full bg-white">
                    <thead>
                        <tr className="bg-gradient-to-l from-[#254151] to-[#6096b4] text-white">
                            <th className="px-4 py-3 text-right border-l border-white/20">التسلسل</th>
                            <th className="px-4 py-3 text-right border-l border-white/20">رمز المساق</th>
                            <th className="px-4 py-3 text-right border-l border-white/20">عنوان الدورة</th>
                            <th className="px-4 py-3 text-center border-l border-white/20">الساعات المعتمدة</th>
                            <th className="px-4 py-3 text-center border-l border-white/20">OQF Credit Value</th>
                            <th className="px-4 py-3 text-center">المتطلب السابق</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((course, index) => (
                            <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                                <td className="px-4 py-3 border-l border-gray-200 text-center">{course.seq}</td>
                                <td className="px-4 py-3 border-l border-gray-200 text-[#6096b4] font-semibold">{course.code}</td>
                                <td className="px-4 py-3 border-l border-gray-200 text-gray-700">{course.title}</td>
                                <td className="px-4 py-3 border-l border-gray-200 text-center text-gray-700">{course.credits}</td>
                                <td className="px-4 py-3 border-l border-gray-200 text-center text-gray-700">{course.oqf}</td>
                                <td className="px-4 py-3 text-center text-gray-700">{course.prerequisite}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}