import dbConnect from "@/lib/dbConnect";
import { NewsModel } from "@/models/news";
import { localizedNewsData } from "@/staticData/news";
import { NextResponse } from "next/server";

async function seed() {
    try {
        await dbConnect();

        const operations = localizedNewsData.map((n) => ({
            updateOne: {
                filter: { titleEn: n.titleEn },
                update: {
                    $set: {
                        titleAr: n.titleAr,
                        titleEn: n.titleEn,
                        excerptAr: n.excerptAr,
                        excerptEn: n.excerptEn,
                        date: n.date,
                        category: n.category,
                        image: n.image,
                        readTime: n.readTime,
                        featured: n.featured
                    }
                },
                upsert: true,
            },
        }));

        const result = await NewsModel.bulkWrite(operations);

        return NextResponse.json({ ok: true, result });
    } catch (e) {
        const message = e instanceof Error ? e.message : 'Unknown error';
        return NextResponse.json({ ok: false, message }, { status: 500 });
    }
}

export async function GET(_request: Request) {
    void _request;
    return seed();
}

export async function POST(_request: Request) {
    void _request;
    return seed();
}
