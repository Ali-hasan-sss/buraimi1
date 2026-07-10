import { getLocale } from "next-intl/server"
import NewsState from "@/components/dashboard/news/State"
import { NewsTable } from "@/components/dashboard/news/Table"
import { NewsDashClient } from "./NewsDashClient"
import type { CategoryKey } from "@/types/news"
import TablePaginationController from "@/components/dashboard/TablePaginationController"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import dbConnect from "@/lib/dbConnect"
import { NewsModel } from "@/models/news"

export default async function DashboardNewsPage(
    { searchParams }: { searchParams?: Promise<Record<string, string | string[] | undefined>> }
) {

    const sp = (await searchParams) ?? {}

    const category = typeof sp.category === "string" ? sp.category : "all"
    const search = typeof sp.search === "string" ? sp.search : undefined
    const locale = await getLocale()
    const isAr = locale === "ar"

    const categoriesKeys: CategoryKey[] = [
        "all",
        "events",
        "academic",
        "research",
        "partnerships",
    ]

    const pageRaw = typeof sp.page === "string" ? Number(sp.page) : undefined
    const limitRaw = typeof sp.limit === "string" ? Number(sp.limit) : undefined
    const page = Number.isFinite(pageRaw) && (pageRaw as number) > 0 ? (pageRaw as number) : 1
    const limit = Number.isFinite(limitRaw) && (limitRaw as number) > 0 ? (limitRaw as number) : 20

    await dbConnect()
    const skip = (page - 1) * limit

    const filter: Record<string, unknown> = {}

    if (category && category !== "all") {
        filter.category = category
    }

    if (search && search.trim()) {
        const searchRegex = { $regex: search.trim(), $options: "i" }
        filter.$or = [
            { titleAr: searchRegex },
            { titleEn: searchRegex },
            { excerptAr: searchRegex },
            { excerptEn: searchRegex },
        ]
    }

    const [news, total, featured] = await Promise.all([
        NewsModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
        NewsModel.countDocuments(filter),
        NewsModel.countDocuments({ ...filter, featured: true }),
    ])

    const data = news.map((n) => ({
        id: String(n._id),
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
    }))

    const hasMore = skip + news.length < total
    const meta = {
        page,
        limit,
        total,
        hasMore,
        loadedCount: skip + news.length,
        featured,
    }

    return (
        <>
            <div className="flex items-center justify-end">
                <Button asChild>
                    <Link href="/dashboard/news/create">
                        {isAr ? "إضافة خبر" : "Create News"}
                    </Link>
                </Button>
            </div>

            {meta &&
                <NewsState total={meta?.total} featured={meta?.featured} />
            }

            {meta && (
                <>
                    <NewsDashClient
                        initialSearch={search ?? ""}
                        isAr={isAr}
                        categoriesKeys={categoriesKeys}
                    />

                    <TablePaginationController limit={meta.limit} page={meta.page} total={meta.total} />
                </>
            )}

            <NewsTable data={data} meta={meta} />

        </>
    )
}