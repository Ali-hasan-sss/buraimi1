import { BookOpen, Target } from 'lucide-react';

export default function AboutMag({
    aboutHeading,
    aboutText,
    goalsHeading,
    goalsText1,
    goalsText2,
}: {
    aboutHeading: string;
    aboutText: string;
    goalsHeading: string;
    goalsText1: string;
    goalsText2: string;
}) {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-10 mb-8">
                <h2 className="text-3xl text-[#254151] mb-6 flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#6096b4]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <BookOpen className="size-6 text-[#6096b4]" />
                    </div>
                    {aboutHeading}
                </h2>
                <p className="text-gray-700 leading-loose text-lg">{aboutText}</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-10">
                <h2 className="text-3xl text-[#254151] mb-6 flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#c2a772]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Target className="size-6 text-[#c2a772]" />
                    </div>
                    {goalsHeading}
                </h2>
                <div className="text-gray-700 leading-loose text-lg space-y-4">
                    <p>{goalsText1}</p>
                    <p>{goalsText2}</p>
                </div>
            </div>
        </div>
    );
}
