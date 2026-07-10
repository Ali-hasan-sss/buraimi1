import GradProgram from '@/components/graduateStudies/GradProgram';
import StatsComponent from '@/components/graduateStudies/Stats';
import WhyProgram from '@/components/graduateStudies/WhyUs';
import { listGradProgramsForPage } from '@/lib/graduate-program-public';
import { GraduationCap } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function GraduateStudiesPage() {
    const programs = await listGradProgramsForPage();

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[450px] overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center bg-primary">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#254151]/95 to-[#6096b4]/90"></div>
                </div>
                <div className="relative h-full flex items-center justify-center text-white text-center px-4">
                    <div className="max-w-5xl">
                        <div className="flex justify-center mb-6">
                            <div className="bg-white/20 backdrop-blur-sm p-5 rounded-full">
                                <GraduationCap className="size-16 text-white" />
                            </div>
                        </div>
                        <h1 className="text-6xl font-bold mb-6">الدراسات العليا</h1>
                        <p className="text-2xl max-w-4xl mx-auto leading-relaxed">
                            برامج دراسات عليا متميزة تلبي احتياجات سوق العمل وتساهم في التنمية الشاملة بشراكات أكاديمية دولية
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <StatsComponent />

            {/* Programs Section */}
            <GradProgram programs={programs} />
            {/* Why Choose Our Graduate Programs */}
            <WhyProgram />

        </div>
    );
}
