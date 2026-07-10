import { ContactDoc } from '@/app/dashboard/contact/page';
import ContactDirectoryClient from '@/components/contactDirectory/ContactDirectoryClient';
import { ContactRow } from '@/components/dashboard/contact/ContactEditDialog';
import TablePaginationController from '@/components/dashboard/TablePaginationController';
import dbConnect from '@/lib/dbConnect';
import { contactModel } from '@/models/contact';
import { contactsDataArray } from '@/staticData/Contact';
import { SiteSocialLinksBar } from '@/components/social/SiteSocialLinksBar';
import { Phone } from 'lucide-react';

export default async function Page(
    { searchParams }: { searchParams?: Record<string, string | string[] | undefined>; }
) {

    await dbConnect()
    const sp = (await searchParams) ?? {}
    const pageValue = typeof sp.page === "string" ? sp.page : Array.isArray(sp.page) ? sp.page[0] : undefined;
    const limitValue = typeof sp.limit === "string" ? sp.limit : Array.isArray(sp.limit) ? sp.limit[0] : undefined;
    const searchValue = typeof sp.search === "string" ? sp.search : Array.isArray(sp.search) ? sp.search[0] : undefined;

    const pageRaw = pageValue ? Number(pageValue) : undefined;
    const limitRaw = limitValue ? Number(limitValue) : undefined;
    const search = searchValue ? searchValue.trim() : "";


    const page = Number.isFinite(pageRaw) && (pageRaw as number) > 0 ? (pageRaw as number) : 1;
    const limit = Number.isFinite(limitRaw) && (limitRaw as number) > 0 ? (limitRaw as number) : 10;
    const skip = (page - 1) * limit;


    const filter: Record<string, unknown> = {};
    if (search) {
        const r = { $regex: search, $options: "i" };
        filter.$or = [{ name: r }, { title: r }, { position: r }];
    }

    const [docs, total] = await Promise.all([
        contactModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
        contactModel.countDocuments(filter),
    ]);

    const typedDocs = docs as ContactDoc[];

    const rows: ContactRow[] = typedDocs.map((d) => ({
        id: String(d._id),
        title: d.title,
        name: d.name,
        department: d.department,
        position: d.position,
        phone: d.phone,
        email: d.email,
    }));


    const meta = {
        page, limit, total
    }

    return <>
        <div className="min-h-screen bg-gray-50">
            {/* Page Header */}

            <section className="relative bg-gradient-to-l from-[#254151] via-[#6096b4] to-[#254151] py-20 overflow-hidden">
                <div className="relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <div className="w-16 h-0.5 bg-gradient-to-l from-[#c2a772] to-transparent"></div>
                            <Phone className="size-8 text-[#c2a772]" />
                            <div className="w-16 h-0.5 bg-gradient-to-r from-[#c2a772] to-transparent"></div>
                        </div>
                        <h1 className="text-5xl lg:text-6xl text-white mb-6">دليل الاتصال</h1>
                        <p className="text-white/90 text-xl leading-relaxed">
                            دليل شامل لجميع جهات الاتصال في كلية البريمي الجامعية
                        </p>
                        <div className="mt-8">
                            <SiteSocialLinksBar />
                        </div>
                    </div>
                </div>
            </section>

            <ContactDirectoryClient contacts={rows} meta={meta} />

        </div>
    </>
}