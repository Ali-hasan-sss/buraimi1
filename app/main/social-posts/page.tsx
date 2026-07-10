import Image from "next/image";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import { ArrowLeft, ArrowRight, Facebook, Instagram } from "lucide-react";

import dbConnect from "@/lib/dbConnect";
import { SocialPostModel } from "@/models/SocialPost";
import { SocialPlatformIcon } from "@/components/social/SocialPlatformIcon";

export const dynamic = "force-dynamic";

export default async function SocialPostsPage() {
  const locale = await getLocale();
  const isAr = locale === "ar";
  await dbConnect();
  const docs = await SocialPostModel.find({}).sort({ createdAt: -1 }).lean();

  const icon = (platform: "instagram" | "facebook" | "twitter") => {
    if (platform === "instagram")
      return <Instagram className="size-5 text-white" />;
    if (platform === "facebook")
      return <Facebook className="size-5 text-white" />;
    return <SocialPlatformIcon name="twitter" className="size-5 text-white" />;
  };

  return (
    <main className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-[#254151]">
            {isAr ? "جميع منشورات التواصل" : "All Social Posts"}
          </h1>
          <Link
            href="/main"
            className="text-[#6096b4] hover:text-[#254151] underline"
          >
            {isAr ? "العودة للرئيسية" : "Back to home"}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {docs.map((post) => (
            <a
              key={String(post._id)}
              href={post.postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl rounded-xl"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  fill
                  src={post.image}
                  alt={isAr ? post.titleAr : post.titleEn}
                  sizes="(min-width: 1536px) 25vw, (min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-10 bg-gradient-to-br from-[#254151] to-[#6096b4] shadow-md flex items-center justify-center">
                    {icon(post.platform)}
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">{post.pageName}</p>
                    <p className="text-xs text-gray-500">{post.platform}</p>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-[#254151]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center text-white p-6">
                  <p className="mb-4">{isAr ? post.titleAr : post.titleEn}</p>
                  <span className="bg-white text-[#254151] px-6 py-2 shadow-md">
                    {isAr ? "عرض المنشور" : "View post"}{" "}
                    {isAr ? (
                      <ArrowLeft className="inline size-4" />
                    ) : (
                      <ArrowRight className="inline size-4" />
                    )}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
