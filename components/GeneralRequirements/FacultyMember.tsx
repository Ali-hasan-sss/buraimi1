"use client";

import { Award, Mail, Phone, UserCircle, Users } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useLocale } from "next-intl";

type ColorKey = 'blue' | 'green' | 'purple' | 'amber';

type LocaleKey = "ar" | "en";

type FacultyMember = {
    name: string;
    nameEn: string;
    position: string;
    positionEn: string;
    email: string;
    phone: string;
    color: ColorKey;
    isHead?: boolean;
    isDr?: boolean;
};

const facultyMembers: FacultyMember[] = [
    {
        name: 'الفاضلة بدرية الهنائي',
        nameEn: 'Ms. Badriya Al Hinai',
        position: 'رئيس القسم',
        positionEn: 'Head of Department',
        email: 'badriya@buc.edu.om',
        phone: '+968-25657521',
        color: 'blue',
        isHead: true
    },
    {
        name: 'الفاضل محمد المراد',
        nameEn: 'Mr. Mohammed Al Murad',
        position: 'محاضر',
        positionEn: 'Lecturer',
        email: 'mamoon@buc.edu.om',
        phone: '+968-25657522',
        color: 'green'
    },
    {
        name: 'الفاضلة سماح المعمري',
        nameEn: 'Ms. Samah Al Maamari',
        position: 'محاضر',
        positionEn: 'Lecturer',
        email: 'samah@buc.edu.om',
        phone: '+968-25657526',
        color: 'purple'
    },
    {
        name: 'الدكتورة منار المصري',
        nameEn: 'Dr. Manar Al Masri',
        position: 'أستاذ مساعد',
        positionEn: 'Assistant Professor',
        email: 'manar@buc.edu.om',
        phone: '+968-25657523',
        color: 'amber',
        isDr: true
    }
];

import badriyadImage from '@/public/assets/Badrya.webp';
import mohammedImage from '@/public/assets/Mamon.webp';
import samahImage from '@/public/assets/Samah.webp';

export default function FacultyMemberComp(
    { colorStyles }: {
        colorStyles: Record<
            ColorKey,
            {
                border200: string;
                border500: string;
                bg50: string;
                from600: string;
                to700: string;
                text600: string;
                text700: string;
                bg600: string;
            }
        >
    }
) {
    const locale = useLocale() as LocaleKey;

    const t = {
        "ar": {
            "sectionTitle": "أعضاء هيئة التدريس",
            "headBadge": "رئيس القسم",
            "emailLabel": "البريد الإلكتروني",
            "phoneLabel": "رقم الهاتف",
            "doctorBadge": "دكتور",
            "headAlt": "الفاضلة بدرية الهنائي",
        },
        "en": {
            "sectionTitle": "Faculty Members",
            "headBadge": "Head of Department",
            "emailLabel": "Email",
            "phoneLabel": "Phone",
            "doctorBadge": "Doctor",
            "headAlt": "Ms. Badriya Al Hinai",
        },
    } as const;

    const content = t[locale] ?? t["en"];

    return (
        <div className="mb-12">
            <div className="bg-white rounded-lg shadow-xl p-5 sm:p-10 border-2 border-teal-200">
                <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <div className="bg-teal-600 text-white p-3 sm:p-4 rounded-full">
                        <Users className="size-6 sm:size-8" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#254151]">{content.sectionTitle}</h2>
                </div>

                {/* Head of Department */}
                <div className="mb-8">
                    {facultyMembers.filter((m) => m.isHead).map((member) => {
                        const c = colorStyles[member.color];
                        const displayName = locale === "ar" ? member.name : member.nameEn;
                        const displayNameSub = locale === "ar" ? member.nameEn : member.name;
                        return (
                            <div
                                key={member.email}
                                className={`bg-gradient-to-br ${c.bg50} to-white rounded-lg shadow-xl border-2 ${c.border200} overflow-hidden`}
                            >
                                <div className={`bg-gradient-to-r ${c.from600} ${c.to700} text-white p-5 sm:p-8`}>
                                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-start">
                                        <Image
                                            src={badriyadImage}
                                            alt={content.headAlt}
                                            width={128}
                                            height={128}
                                            className="size-24 sm:size-32 rounded-full object-cover border-4 border-white shadow-xl"
                                        />
                                        <div>
                                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-3">
                                                <Award className="size-5" />
                                                <span className="font-bold">{content.headBadge}</span>
                                            </div>
                                            <h3 className="text-2xl sm:text-3xl font-bold mb-1">{displayName}</h3>
                                            <p className="text-base sm:text-lg opacity-90">{displayNameSub}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 sm:p-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                        <div className={`bg-white p-4 sm:p-6 rounded-lg border-2 ${c.border200} shadow-md`}>
                                            <div className="flex items-center gap-4">
                                                <div className={`${c.bg600} text-white size-12 sm:size-14 rounded-full hidden sm:flex items-center justify-center flex-shrink-0`}>
                                                    <Mail className="size-6 sm:size-7" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600 mb-1">{content.emailLabel}</p>
                                                    <a href={`mailto:${member.email}`} className={`font-bold text-base sm:text-lg ${c.text700} hover:underline break-all`}>
                                                        {member.email}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={`bg-white p-4 sm:p-6 rounded-lg border-2 ${c.border200} shadow-md`}>
                                            <div className="flex items-center gap-4">
                                                <div className={`${c.bg600} text-white size-12 sm:size-14 rounded-full hidden sm:flex items-center justify-center flex-shrink-0`}>
                                                    <Phone className="size-6 sm:size-7" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600 mb-1">{content.phoneLabel}</p>
                                                    <a href={`tel:${member.phone}`} className={`font-bold text-base sm:text-lg ${c.text700} hover:underline`} dir="ltr">
                                                        {member.phone}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Other Faculty */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
                    {facultyMembers.filter((m) => !m.isHead).map((member) => {
                        const c = colorStyles[member.color];
                        const displayName = locale === "ar" ? member.name : member.nameEn;
                        const displayNameSub = locale === "ar" ? member.nameEn : member.name;
                        const displayPosition = locale === "ar" ? member.position : member.positionEn;
                        const displayPositionSub = locale === "ar" ? member.positionEn : member.position;
                        const memberImage: StaticImageData | null =
                            member.name === 'الفاضل محمد المراد'
                                ? mohammedImage
                                : member.name === 'الفاضلة سماح المعمري'
                                    ? samahImage
                                    : null;

                        return (
                            <div
                                key={member.email}
                                className={`bg-white rounded-lg shadow-xl border-2 ${c.border200} overflow-hidden hover:shadow-2xl transition-all`}
                            >
                                <div className={`bg-gradient-to-r ${c.from600} ${c.to700} text-white p-5 sm:p-6 text-center`}>
                                    {memberImage ? (
                                        <Image
                                            src={memberImage}
                                            alt={displayName}
                                            width={96}
                                            height={96}
                                            className="size-20 sm:size-24 rounded-full object-cover border-4 border-white shadow-xl mx-auto mb-4"
                                        />
                                    ) : (
                                        <div className="bg-white/20 backdrop-blur-sm size-16 sm:size-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <UserCircle className="size-10 sm:size-12" />
                                        </div>
                                    )}
                                    <h3 className="text-lg sm:text-xl font-bold mb-1">{displayName}</h3>
                                    <p className="text-sm opacity-90 mb-3">{displayNameSub}</p>
                                    {member.isDr && (
                                        <div className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                                            <Award className="size-4" />
                                            <span className="text-xs">{content.doctorBadge}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="p-4 sm:p-6">
                                    <div className={`${c.bg50} p-4 rounded-lg border-2 ${c.border200} mb-4 text-center`}>
                                        <p className="font-bold text-[#254151] mb-1">{displayPosition}</p>
                                        <p className="text-sm text-gray-600">{displayPositionSub}</p>
                                    </div>

                                    <div className="space-y-3">
                                        <div className={`${c.bg50} p-3 rounded-lg border-2 ${c.border200}`}>
                                            <div className="flex items-center gap-2 mb-1">
                                                <Mail className={`size-4 ${c.text600}`} />
                                                <p className="text-xs text-gray-600">{content.emailLabel}</p>
                                            </div>
                                            <a href={`mailto:${member.email}`} className={`text-sm font-semibold ${c.text700} hover:underline break-all`}>
                                                {member.email}
                                            </a>
                                        </div>

                                        <div className={`${c.bg50} p-3 rounded-lg border-2 ${c.border200}`}>
                                            <div className="flex items-center gap-2 mb-1">
                                                <Phone className={`size-4 ${c.text600}`} />
                                                <p className="text-xs text-gray-600">{content.phoneLabel}</p>
                                            </div>
                                            <a href={`tel:${member.phone}`} className={`text-sm font-semibold ${c.text700} hover:underline`} dir="ltr">
                                                {member.phone}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>

    )
}