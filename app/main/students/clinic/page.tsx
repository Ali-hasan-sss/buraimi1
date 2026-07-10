import Link from 'next/link';
// import heroImage from 'figma:asset/45055be20909d1ebaedec3a64366e8291321fd00.png';
import StudentsSidebar from '@/components/student/clinic/StudentsSidebar';
import ClinicMain from '@/components/student/clinic/MainClinic';

export default function ClinicPage() {

    return (
        <div className="min-h-screen bg-white">

            {/* Hero Section */}
            <div
                className="relative h-[350px] bg-cover bg-center"
                style={{
                    // backgroundImage: `url(${heroImage})`,
                }}
            >
                <div className="absolute inset-0 bg-[#254151]/60"></div>

                <div className="container mx-auto px-6 h-full flex flex-col justify-center relative z-10">
                    <h1 className="text-5xl text-white mb-4">عيادة الكلية</h1>

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-white mt-4">
                        <Link href="/main" className="hover:text-[#c2a772] transition-colors">
                            الرئيسية
                        </Link>
                        <span>/</span>
                        <Link href="/main/students" className="hover:text-[#c2a772] transition-colors">
                            الطلبة
                        </Link>
                        <span>/</span>
                        <span className="text-[#c2a772]">عيادة الكلية</span>
                    </div>
                </div>
            </div>

            {/* Main Content with Sidebar */}
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sidebar */}
                    <StudentsSidebar activeId="clinic" />

                    {/* Main Content */}
                    <ClinicMain />
                </div>
            </div>
        </div>
    );
}