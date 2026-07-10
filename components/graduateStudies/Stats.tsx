import { Award, Globe, GraduationCap, Users } from "lucide-react";

const stats = [
    { number: '4', label: 'برامج دراسات عليا', icon: GraduationCap },
    { number: '3', label: 'شراكات أكاديمية دولية', icon: Globe },
    { number: '100+', label: 'طالب دراسات عليا', icon: Users },
    { number: '20+', label: 'عضو هيئة تدريس متخصص', icon: Award }
];
export default function StatsComponent() {
    return (
        <section className="py-12 bg-white border-b-2 border-gray-100">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="flex justify-center mb-3">
                                <div className="bg-gradient-to-br from-[#6096b4] to-[#254151] p-4 rounded-full">
                                    <stat.icon className="size-8 text-white" />
                                </div>
                            </div>
                            <div className="text-4xl font-bold text-[#254151] mb-2">{stat.number}</div>
                            <div className="text-gray-600 font-semibold">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}