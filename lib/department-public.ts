import type { headMessage } from '@/types/department';
import type { LucideIcon } from 'lucide-react';
import { Award, BookOpen, Building2, Users } from 'lucide-react';

/** Gradients for overview cards (matches previous static styling per domain). */
export function departmentOverviewGradient(domain: string): string {
    const map: Record<string, string> = {
        english: 'from-blue-500 to-blue-600',
        'it-department': 'from-purple-500 to-purple-600',
        'business-department': 'from-green-500 to-green-600',
        'law-program': 'from-amber-500 to-amber-600',
    };
    return map[domain] ?? 'from-[#254151] to-[#6096b4]';
}

export function depCardVisual(domain: string): {
    Icon: LucideIcon;
    iconClass: string;
    wrapClass: string;
} {
    switch (domain) {
        case 'english':
            return {
                Icon: BookOpen,
                iconClass: 'text-blue-600',
                wrapClass: 'from-blue-100 to-blue-50',
            };
        case 'business-department':
            return {
                Icon: Users,
                iconClass: 'text-green-600',
                wrapClass: 'from-green-100 to-green-50',
            };
        case 'it-department':
            return {
                Icon: Building2,
                iconClass: 'text-purple-600',
                wrapClass: 'from-purple-100 to-purple-50',
            };
        case 'law-program':
            return {
                Icon: Award,
                iconClass: 'text-amber-600',
                wrapClass: 'from-amber-100 to-amber-50',
            };
        default:
            return {
                Icon: BookOpen,
                iconClass: 'text-[#6096b4]',
                wrapClass: 'from-slate-100 to-slate-50',
            };
    }
}

export type DepartmentProgramPublic = {
    titleAr: string;
    titleEn: string;
};

export type DepartmentOverviewRow = {
    domain: string;
    titleAr: string;
    titleEn: string;
    color: string;
    programs: DepartmentProgramPublic[];
    image: string;
    showcaseImage: string;
};

type ProgramLike = {
    titleAr?: string;
    titleEn?: string;
};

type DepartmentDocLike = {
    domain: string;
    titleAr: string;
    titleEn: string;
    programs?: unknown;
    showcaseImage?: unknown;
};

const DOMAIN_SHOWCASE_IMAGE: Record<string, string> = {
    english: '/assets/landing/department/english.webp',
    'business-department': '/assets/landing/department/business.webp',
    'it-department': '/assets/landing/department/information-technology.webp',
    'law-program': '/assets/landing/department/law.webp',
};

/** مسار الصورة لبطاقة القسم في الرئيسية: مرفوع من الإدارة أو افتراضي حسب domain */
export function resolveDepartmentShowcaseImage(domain: string, showcaseImage?: string | null): string {
    const custom = (showcaseImage ?? '').trim();
    const fallback = DOMAIN_SHOWCASE_IMAGE[domain] ?? '/assets/landing/department/english.webp';
    return custom.length > 0 ? custom : fallback;
}

/** Build overview rows from Mongo lean documents (used by listing page and API). */
export function mapDepartmentsToOverview(docs: DepartmentDocLike[]): DepartmentOverviewRow[] {
    return docs.map((doc) => {
        const rawShowcase =
            doc.showcaseImage != null && String(doc.showcaseImage).trim() !== ''
                ? String(doc.showcaseImage).trim()
                : undefined;
        return {
            domain: doc.domain,
            titleAr: doc.titleAr,
            titleEn: doc.titleEn,
            color: departmentOverviewGradient(doc.domain),
            programs: Array.isArray(doc.programs)
                ? (doc.programs as ProgramLike[]).map((p) => ({
                      titleAr: typeof p?.titleAr === 'string' ? p.titleAr : '',
                      titleEn: typeof p?.titleEn === 'string' ? p.titleEn : '',
                  }))
                : [],
            image: resolveDepartmentShowcaseImage(doc.domain, rawShowcase),
            showcaseImage: rawShowcase ?? '',
        };
    });
}

function extractHtml(raw: unknown): string {
    if (typeof raw === 'string') return raw;
    if (raw && typeof raw === 'object' && '__html' in raw) {
        const inner = (raw as { __html?: unknown }).__html;
        return typeof inner === 'string' ? inner : '';
    }
    return '';
}

/** Accepts Mongo / JSON shapes so public HeadMessage always gets `{ __html }`. */
export function normalizeHeadMessage(raw: unknown): headMessage | null {
    if (!raw || typeof raw !== 'object') return null;
    const o = raw as Record<string, unknown>;

    // Support both old format (message) and new format (messageAr/messageEn)
    const messageArHtml = extractHtml(o.messageAr) || extractHtml(o.message) || '';
    const messageEnHtml = extractHtml(o.messageEn) || '';

    const writer = typeof o.writer === 'string' ? o.writer : '';
    const mail = typeof o.mail === 'string' ? o.mail : '';
    const phone = typeof o.phone === 'string' ? o.phone : '';
    const image = typeof o.image === 'string' ? o.image : undefined;

    const hasContent = messageArHtml.trim().length > 0 || messageEnHtml.trim().length > 0 || writer.trim().length > 0 || mail.trim().length > 0 || phone.trim().length > 0;
    if (!hasContent) return null;

    return {
        messageAr: { __html: messageArHtml },
        messageEn: { __html: messageEnHtml },
        writer,
        mail,
        phone,
        image,
    };
}

/** بطاقات قسم «الأقسام لمتابعة دراستك» في الصفحة الرئيسية */
export type DepartmentShowcaseCard = {
    titleAr: string;
    titleEn: string;
    descriptionAr: string;
    descriptionEn: string;
    image: string;
    link: string;
};

export function mapDepartmentsToShowcaseCards(
    docs: Array<{
        domain: string;
        titleAr: string;
        titleEn: string;
        subTitleAr?: string;
        subTitleEn?: string;
        showcaseImage?: string;
    }>
): DepartmentShowcaseCard[] {
    return docs.map((d) => ({
        titleAr: d.titleAr,
        titleEn: d.titleEn,
        descriptionAr: d.subTitleAr ?? '',
        descriptionEn: d.subTitleEn ?? '',
        image: resolveDepartmentShowcaseImage(d.domain, d.showcaseImage),
        link: `/main/department/${encodeURIComponent(d.domain)}`,
    }));
}
