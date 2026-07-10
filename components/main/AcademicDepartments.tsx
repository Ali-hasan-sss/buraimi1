"use client"
import { ArrowLeft, BookOpen, Calculator, Code, ChevronLeft, ChevronRight, Hand } from 'lucide-react';
import Image from 'next/image';
import { useState, useRef, MouseEvent } from 'react';
import type { ComponentType } from 'react';

interface Department {
    id: number;
    title: string;
    image: string;
    icon: ComponentType<{ className?: string }>;
    color: string;
    description: string;
    category: string;
}

function DepartmentCard({ dept }: { dept: Department }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * 10;
        const rotateY = ((centerX - x) / centerX) * 10;

        setTransform({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setTransform({ x: 0, y: 0 });
    };

    const Icon = dept.icon;

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 border-2 border-[#c2a772]/20 hover:shadow-2xl hover:-translate-y-2"
            style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px'
            }}
        >
            <div className="relative h-80 overflow-hidden">
                <Image
                    fill
                    src={dept.image}
                    alt={dept.title}
                    sizes="(min-width: 1024px) 420px, 88vw"
                    className="w-full h-full object-cover transition-all duration-300"
                    style={{
                        transform: `scale(1.1) translateX(${transform.y * 2}px) translateY(${transform.x * 2}px)`,
                        transition: 'transform 0.3s ease-out'
                    }}
                />
            </div>

            <div className={`absolute inset-0 bg-gradient-to-t ${dept.color} opacity-70 group-hover:opacity-80 transition-opacity duration-300`}></div>

            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                <div className="mb-4 transform transition-transform duration-300 group-hover:-translate-y-2">
                    <div className="inline-flex bg-white/20 backdrop-blur-md p-3 rounded-xl border border-white/30">
                        <Icon className="size-8" />
                    </div>
                </div>

                <h3 className="text-[41px] lg:text-[51px] font-bold mb-3 transform transition-transform duration-300 group-hover:-translate-y-2">
                    {dept.title}
                </h3>

                <p className="text-white/90 mb-4 leading-relaxed transform transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:-translate-y-2">
                    {dept.description}
                </p>

                <a
                    href={`#department-${dept.id}`}
                    className="inline-flex items-center gap-2 text-white font-semibold hover:gap-3 transition-all duration-300 group/link"
                >
                    <span>اعرف المزيد</span>
                    <ArrowLeft className="size-5 transform group-hover/link:translate-x-1 transition-transform" />
                </a>
            </div>

            <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-white/30 rounded-tl-2xl transform transition-all duration-300 group-hover:scale-110"></div>
        </div>
    );
}

export function AcademicDepartments() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [showCursor, setShowCursor] = useState(false);
    const [mouseVelocity, setMouseVelocity] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);
    const lastMouseX = useRef<number>(0);
    const animationFrame = useRef<number | null>(null);

    const departments: Department[] = [
        {
            id: 1,
            title: 'قسم اللغة الإنجليزية وآدابها',
            image: 'https://images.unsplash.com/photo-1699523525646-ae96e089474f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdsaXNoJTIwbGl0ZXJhdHVyZSUyMGJvb2tzfGVufDF8fHx8MTc2NzE3NDI1Mnww&ixlib=rb-4.1.0&q=80&w=1080',
            icon: BookOpen,
            color: 'from-blue-600 to-blue-700',
            description: 'برنامج متميز لتطوير المهارات اللغوية والأدبية في اللغة الإنجليزية',
            category: 'language'
        },
        {
            id: 2,
            title: 'قسم إدارة الأعمال والمحاسبة',
            image: 'https://images.unsplash.com/photo-1634326080825-985cfc816db6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGFjY291bnRpbmclMjBtZWV0aW5nfGVufDF8fHx8MTc2NzE3NDI1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
            icon: Calculator,
            color: 'from-emerald-600 to-emerald-700',
            description: 'تعليم متقدم في مجالات الإدارة والمحاسبة والمالية',
            category: 'business'
        },
        {
            id: 3,
            title: 'قسم تقنية المعلومات',
            image: 'https://images.unsplash.com/photo-1654764325076-72248803659d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmZvcm1hdGlvbiUyMHRlY2hub2xvZ3klMjBjb21wdXRlcnxlbnwxfHx8fDE3NjcxMDU2NTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
            icon: Code,
            color: 'from-purple-600 to-purple-700',
            description: 'برامج حديثة في علوم الحاسوب وتكنولوجيا المعلومات',
            category: 'technology'
        },
    ];

    const scrollToIndex = (index: number) => {
        if (carouselRef.current) {
            const cardWidth = carouselRef.current.scrollWidth / departments.length;
            carouselRef.current.scrollTo({
                left: cardWidth * index,
                behavior: 'smooth'
            });
            setCurrentIndex(index);
        }
    };

    const handlePrev = () => {
        const newIndex = currentIndex > 0 ? currentIndex - 1 : departments.length - 1;
        scrollToIndex(newIndex);
    };

    const handleNext = () => {
        const newIndex = currentIndex < departments.length - 1 ? currentIndex + 1 : 0;
        scrollToIndex(newIndex);
    };

    const handleMouseEnter = () => {
        setShowCursor(true);
    };

    const handleMouseLeave = () => {
        setShowCursor(false);
        if (animationFrame.current !== null) cancelAnimationFrame(animationFrame.current);
        animationFrame.current = null;
    };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const newPos = { x: e.clientX, y: e.clientY };
        setCursorPos(newPos);

        if (!carouselRef.current) return;

        const currentX = e.clientX;
        const deltaX = currentX - lastMouseX.current;

        if (Math.abs(deltaX) > 0.5) {
            carouselRef.current.scrollLeft += deltaX * -1.5;
            setMouseVelocity(deltaX);
        }

        lastMouseX.current = currentX;
    };

    const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        lastMouseX.current = e.clientX;
    };

    const handleMouseUp = () => {
        if (animationFrame.current !== null) cancelAnimationFrame(animationFrame.current);
        animationFrame.current = null;

        const currentVelocity = mouseVelocity;
        const currentLeft = carouselRef.current ? carouselRef.current.scrollLeft : 0;
        const cardWidth = carouselRef.current ? carouselRef.current.scrollWidth / departments.length : 1;
        const currentCardIndex = Math.round(currentLeft / cardWidth);

        let nextCardIndex = currentVelocity > 0 ? currentCardIndex + 1 : currentCardIndex - 1;
        if (nextCardIndex < 0) nextCardIndex = 0;
        if (nextCardIndex > departments.length - 1) nextCardIndex = departments.length - 1;

        const nextLeft = nextCardIndex * cardWidth;
        const el = carouselRef.current;
        if (el) {
            el.scrollTo({
                left: nextLeft,
                behavior: 'smooth'
            });
            setCurrentIndex(nextCardIndex);
        }
    };

    return (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative">
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    width: '200px',
                    height: '200px',
                    backgroundColor: 'red',
                    zIndex: 999999,
                    fontSize: '30px',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold'
                }}
            >
                TEST 123
            </div>

            <div className="container mx-auto px-4">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-block mb-4">
                        <div className="flex items-center gap-3 bg-gradient-to-l from-primary/10 to-secondary/10 px-6 py-2">
                            <div className="w-12 h-0.5 bg-gradient-to-l from-primary to-secondary"></div>
                            <span className="text-secondary font-semibold">تعرف على برامجنا</span>
                            <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-secondary"></div>
                        </div>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
                        {departments.length} أقسام لمتابعة دراستك
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        نقدم مجموعة متنوعة من البرامج الأكاديمية المتميزة في مختلف المجالات
                    </p>
                </div>

                {/* Carousel Container */}
                <div className="relative max-w-7xl mx-auto">
                    {/* Custom Cursor - بدون Portal للاختبار */}
                    {showCursor && (
                        <div
                            className="fixed pointer-events-none"
                            style={{
                                left: cursorPos.x - 40,
                                top: cursorPos.y - 40,
                                zIndex: 999999,
                                position: 'fixed',
                                width: '80px',
                                height: '80px'
                            }}
                        >
                            <div
                                className="w-20 h-20 bg-white rounded-full flex items-center justify-center border-4 border-[#254151]"
                                style={{
                                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                                    animation: 'pulse 1.5s ease-in-out infinite'
                                }}
                            >
                                <Hand className="size-9 text-[#254151]" style={{ strokeWidth: 2.5 }} />
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <button
                        onClick={handlePrev}
                        className="absolute top-1/2 -left-6 transform -translate-y-1/2 z-30 bg-white p-4 rounded-full border-2 border-gray-300 hover:bg-[#6096b4] hover:border-[#6096b4] hover:text-white transition-all duration-300 shadow-lg"
                    >
                        <ChevronRight className="size-6" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute top-1/2 -right-6 transform -translate-y-1/2 z-30 bg-white p-4 rounded-full border-2 border-gray-300 hover:bg-[#6096b4] hover:border-[#6096b4] hover:text-white transition-all duration-300 shadow-lg"
                    >
                        <ChevronLeft className="size-6" />
                    </button>

                    {/* Carousel Wrapper */}
                    <div
                        ref={carouselRef}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseLeave}
                        onMouseEnter={handleMouseEnter}
                        className="overflow-x-auto overflow-y-visible scrollbar-hide relative"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                            cursor: showCursor ? 'none' : 'default'
                        }}
                    >
                        <div className="flex gap-8 px-4 py-4" style={{ minWidth: 'min-content' }}>
                            {departments.map((dept) => (
                                <div key={dept.id} className="flex-shrink-0" style={{ width: '420px' }}>
                                    <DepartmentCard dept={dept} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* All Programs CTA */}
                <div className="text-center mt-16">
                    <a
                        href="#all-programs"
                        className="inline-flex items-center gap-2 bg-gradient-to-l from-primary to-secondary text-white px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl text-lg font-semibold"
                    >
                        <span>استعرض جميع البرامج</span>
                        <ArrowLeft className="size-5" />
                    </a>
                </div>

            </div>
        </section>
    );
}