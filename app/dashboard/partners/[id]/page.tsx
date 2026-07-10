import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";

import dbConnect from "@/lib/dbConnect";
import { Partnership } from "@/models/Partnership";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PartnerLogoUpload } from "@/components/dashboard/partners/PartnerLogoUpload";

type PartnerDoc = {
    _id: unknown;
    order: number;
    name: string;
    nameEn: string;
    logo?: string;
    type: string;
    description: string;
    date: string;
    link?: string;
    international: boolean;
};

async function updatePartner(id: string, formData: FormData) {
    "use server";

    const orderRaw = String(formData.get("order") || "").trim();
    const order = Number(orderRaw);

    const name = String(formData.get("name") || "").trim();
    const nameEn = String(formData.get("nameEn") || "").trim();
    const type = String(formData.get("type") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const date = String(formData.get("date") || "").trim();
    const logo = String(formData.get("logo") || "").trim();
    const link = String(formData.get("link") || "").trim();
    const international = formData.get("international") === "on";

    if (!Number.isFinite(order) || !name) {
        return;
    }

    await dbConnect();
    await Partnership.findByIdAndUpdate(id, {
        order,
        name,
        nameEn,
        type,
        description,
        date,
        logo,
        link,
        international,
    });

    revalidatePath("/dashboard/partners");
    redirect("/dashboard/partners");
}

export default async function UpdatePartnerPage({ params }: { params: Promise<{ id: string }> }) {
    const t = await getTranslations("dashboardPartners");
    const { id } = await params;

    await dbConnect();

    const partner = (await Partnership.findById(id).lean()) as PartnerDoc | null;

    if (!partner) {
        notFound();
    }

    const action = updatePartner.bind(null, id);

    return (
        <div className="max-w-xl space-y-6">
            <div className="space-y-1">
                <h1 className="text-2xl font-semibold tracking-tight">{t("editTitle")}</h1>
                <p className="text-sm text-muted-foreground">{t("listTitle")}</p>
            </div>

            <form action={action} className="space-y-4 rounded-xl border bg-background p-4">
                <div className="space-y-2 hidden">
                    <label className="text-sm font-medium" htmlFor="order">
                        {t("fields.order")}
                    </label>
                    <Input id="order" name="order" type="number" defaultValue={partner.order} required />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="name">
                        {t("fields.name")}
                    </label>
                    <Input id="name" name="name" defaultValue={partner.name} required />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="nameEn">
                        {t("fields.nameEn")}
                    </label>
                    <Input id="nameEn" name="nameEn" defaultValue={partner.nameEn} />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="type">
                        {t("fields.type")}
                    </label>
                    <Input id="type" name="type" defaultValue={partner.type} />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="description">
                        {t("fields.description")}
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        defaultValue={partner.description}
                        className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="date">
                        {t("fields.date")}
                    </label>
                    <Input id="date" name="date" defaultValue={partner.date} />
                </div>

                <PartnerLogoUpload inputName="logo" defaultPath={partner.logo || ""} />

                <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="link">
                        {t("fields.link")}
                    </label>
                    <Input id="link" name="link" defaultValue={partner.link || ""} />
                </div>

                <div className="flex items-center gap-2">
                    <input
                        id="international"
                        name="international"
                        type="checkbox"
                        defaultChecked={Boolean(partner.international)}
                        className="h-4 w-4 rounded border border-input"
                    />
                    <label className="text-sm" htmlFor="international">
                        {t("fields.international")}
                    </label>
                </div>

                <div className="flex items-center justify-end gap-2">
                    <Button type="submit" className="w-full sm:w-auto">
                        {t("save")}
                    </Button>
                </div>
            </form>
        </div>
    );
}
