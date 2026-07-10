import SiteContactSettingsForm from "@/components/dashboard/contact/SiteContactSettingsForm";
import dbConnect from "@/lib/dbConnect";
import { getSiteContactSettings } from "@/lib/site-contact-settings";
import { contactModel } from "@/models/contact";
import { ContactDeleteDialog } from "@/components/dashboard/contact/ContactDeleteDialog";
import { ContactEditDialog, type ContactRow } from "@/components/dashboard/contact/ContactEditDialog";
import { ContactTableControls } from "@/components/dashboard/contact/ContactTableControls";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import TablePaginationController from "@/components/dashboard/TablePaginationController";

export type ContactDoc = {
    _id: unknown;
    title: string;
    name: string;
    department: string;
    position: string;
    phone: string;
    email: string;
};

export default async function Contact({
    searchParams,
}: {
    searchParams?: Record<string, string | string[] | undefined>;
}) {
    await dbConnect();
    const siteContactSettings = await getSiteContactSettings();

    const sp = (await searchParams) ?? {};
    const pageRaw = typeof sp.page === "string" ? Number(sp.page) : undefined;
    const limitRaw = typeof sp.limit === "string" ? Number(sp.limit) : undefined;
    const search = typeof sp.search === "string" ? sp.search.trim() : "";

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

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h1 className="text-2xl font-semibold tracking-tight">Contact Directory</h1>
                <p className="text-sm text-muted-foreground">Manage contacts</p>
            </div>

            <SiteContactSettingsForm initial={siteContactSettings} />

            <ContactTableControls initialSearch={search} />

            <TablePaginationController limit={limit} page={page} total={total} />

            <div className="overflow-hidden rounded-xl border bg-background">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead className="hidden sm:table-cell">Title</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead className="hidden md:table-cell">Department</TableHead>
                            <TableHead className="hidden md:table-cell">Position</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead className="text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {rows.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="py-10 text-center text-muted-foreground">
                                    {search ? "No contacts match your search." : "No contacts found."}
                                </TableCell>
                            </TableRow>
                        ) : (
                            rows.map((d) => (
                                <TableRow key={d.id}>
                                    <TableCell className="hidden sm:table-cell">{d.title}</TableCell>
                                    <TableCell className="font-medium">{d.name}</TableCell>
                                    <TableCell className="hidden md:table-cell">{d.department}</TableCell>
                                    <TableCell className="hidden md:table-cell">{d.position}</TableCell>
                                    <TableCell dir="ltr" className="font-mono text-xs sm:text-sm">
                                        {d.phone}
                                    </TableCell>
                                    <TableCell>
                                        <a
                                            className="underline underline-offset-4"
                                            href={`mailto:${d.email}`}
                                        >
                                            {d.email}
                                        </a>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-center gap-2">
                                            <ContactEditDialog item={d} />
                                            <ContactDeleteDialog id={d.id} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}