import { GraduationCap } from "lucide-react"
import Image from "next/image"
export default function FoundHero() {
    return (
        <section className="relative h-[400px] overflow-hidden">
            <Image
                src="https://images.unsplash.com/photo-1759922378123-a1f4f1e39bae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHN0dWR5aW5nJTIwY2xhc3Nyb29tJTIwZWR1Y2F0aW9ufGVufDF8fHx8MTc3MzE2MTY5MXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Students Studying"
                className="absolute inset-0 w-full h-full object-cover"
                fill
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#254151]/95 to-[#6096b4]/90"></div>
            <div className="relative h-full flex items-center justify-center text-white text-center px-4">
                <div className="max-w-5xl">
                    <div className="flex justify-center mb-6">
                        <div className="bg-white/20 backdrop-blur-sm p-5 rounded-full">
                            <GraduationCap className="size-16 text-white" />
                        </div>
                    </div>
                    <h1 className="text-5xl font-bold mb-4">البرنامج التأسيسي العام</h1>
                    <h2 className="text-2xl font-bold mb-6">General Foundation Program</h2>
                    <p className="text-xl opacity-95">
                        بوابتك نحو النجاح الأكاديمي في كلية البريمي الجامعية
                    </p>
                </div>
            </div>
        </section>

    )
}