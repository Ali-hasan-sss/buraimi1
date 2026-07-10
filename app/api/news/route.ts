import dbConnect from "@/lib/dbConnect";
import { NewsModel } from "@/models/news";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = parseInt(searchParams.get("limit") || "6", 10);
        const category = searchParams.get("category");
        const search = searchParams.get("search");
        const skip = (page - 1) * limit;

        // Build filter object
        const filter: Record<string, unknown> = {};

        if (category && category !== "all") {
            filter.category = category;
        }

        // Add search filter if provided
        if (search && search.trim()) {
            const searchRegex = { $regex: search.trim(), $options: "i" };
            filter.$or = [
                { titleAr: searchRegex },
                { titleEn: searchRegex },
                { excerptAr: searchRegex },
                { excerptEn: searchRegex },
            ];
        }

        const [news, total, featured] = await Promise.all([
            NewsModel.find(filter).skip(skip).limit(limit).lean(),
            NewsModel.countDocuments(filter),
            NewsModel.countDocuments({ ...filter, featured: true }),
        ]);

        const serializedNews = news.map((n) => ({
            id: (n._id as string).toString(),
            titleAr: n.titleAr,
            titleEn: n.titleEn,
            excerptAr: n.excerptAr,
            excerptEn: n.excerptEn,
            date: n.date,
            category: n.category,
            image: n.image,
            readTime: n.readTime,
            featured: n.featured,
            link: n.link,
        }));

        const hasMore = skip + news.length < total;

        return NextResponse.json({
            ok: true,
            data: serializedNews,
            meta: {
                page,
                limit,
                total,
                hasMore,
                loadedCount: skip + news.length,
                featured
            },
        });
    } catch (e) {
        const message = e instanceof Error ? e.message : 'Unknown error';
        return NextResponse.json({ ok: false, message }, { status: 500 });
    }
}
