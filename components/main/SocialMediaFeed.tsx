"use client";
import { SocialPlatformIcon } from "@/components/social/SocialPlatformIcon";
import { siteSocialIconLabel } from "@/lib/site-contact-settings-icons";
import type { SiteSocialLink } from "@/types/site-contact-settings";
import {
  Instagram,
  Facebook,
  Pencil,
  Plus,
  Save,
  Trash2,
  X,
  ImageUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

interface SocialPost {
  _id?: string;
  platform: "instagram" | "facebook" | "twitter";
  image: string;
  titleAr: string;
  titleEn: string;
  postUrl: string;
  pageName: string;
  order: number;
  createdAt?: string;
}

export function SocialMediaFeed({
  socialLinks = [],
}: {
  socialLinks?: SiteSocialLink[];
}) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [draft, setDraft] = useState<SocialPost[]>([]);
  const [saving, setSaving] = useState(false);
  const [locale, setLocale] = useState<"ar" | "en">("ar");

  useEffect(() => {
    async function load() {
      try {
        const [postsRes, meRes] = await Promise.all([
          fetch("/api/social-posts", { cache: "no-store" }),
          fetch("/api/auth/me", {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          }),
        ]);
        const postsJson = (await postsRes.json()) as {
          ok: boolean;
          data?: SocialPost[];
        };
        const meJson = (await meRes.json()) as {
          ok: boolean;
          isAdmin?: boolean;
        };
        if (postsJson.ok && Array.isArray(postsJson.data)) {
          setPosts(postsJson.data.sort((a, b) => a.order - b.order));
        }
        setIsAdmin(Boolean(meJson.ok && meJson.isAdmin));
      } catch {
        setIsAdmin(false);
      }
    }
    const htmlLang = (document?.documentElement?.lang || "ar").toLowerCase();
    setLocale(htmlLang.startsWith("en") ? "en" : "ar");
    void load();
  }, []);

  const viewPosts = isEditing ? draft : posts;
  const latestFourPosts = useMemo(() => {
    if (isEditing) return viewPosts;
    return [...viewPosts]
      .sort((a, b) => {
        const da = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const db = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return db - da;
      })
      .slice(0, 4);
  }, [isEditing, viewPosts]);
  const isAr = locale === "ar";

  const updateDraft = (index: number, patch: Partial<SocialPost>) => {
    setDraft((prev) =>
      prev.map((p, i) => (i === index ? { ...p, ...patch } : p)),
    );
  };

  const onUploadImage = async (index: number, file: File) => {
    const fd = new FormData();
    fd.set("file", file);
    const upRes = await fetch("/api/uploads", {
      method: "POST",
      credentials: "include",
      body: fd,
    });
    const upJson = (await upRes.json()) as {
      ok: boolean;
      relativePath?: string;
    };
    if (upRes.ok && upJson.ok && upJson.relativePath) {
      updateDraft(index, { image: upJson.relativePath });
    }
  };

  const saveChanges = async () => {
    setSaving(true);
    try {
      const existingIds = new Set(
        posts.filter((p) => p._id).map((p) => String(p._id)),
      );
      const draftIds = new Set(
        draft.filter((p) => p._id).map((p) => String(p._id)),
      );
      const removed = [...existingIds].filter((id) => !draftIds.has(id));
      for (const id of removed) {
        await fetch(`/api/social-posts/${id}`, {
          method: "DELETE",
          credentials: "include",
        });
      }
      for (let i = 0; i < draft.length; i++) {
        const item = { ...draft[i], order: i };
        if (item._id) {
          await fetch(`/api/social-posts/${item._id}`, {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item),
          });
        } else {
          await fetch("/api/social-posts", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item),
          });
        }
      }
      const refreshed = await fetch("/api/social-posts", { cache: "no-store" });
      const json = (await refreshed.json()) as {
        ok: boolean;
        data?: SocialPost[];
      };
      if (json.ok && Array.isArray(json.data))
        setPosts(json.data.sort((a, b) => a.order - b.order));
      setIsEditing(false);
      setDraft([]);
    } finally {
      setSaving(false);
    }
  };

  const platformIcon = (
    platform: SocialPost["platform"],
    className: string,
  ) => {
    if (platform === "instagram") return <Instagram className={className} />;
    if (platform === "facebook") return <Facebook className={className} />;
    return <SocialPlatformIcon name="twitter" className={className} />;
  };

  return (
    <section className="relative overflow-visible bg-gray-50 py-16 pb-4">
      <div className="relative z-10">
        <div className="px-4 md:px-8 lg:px-16">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
            <h2 className="text-3xl md:text-4xl text-[#254151] order-1 md:order-1">
              ابق على تواصل
            </h2>
            {isAdmin && (
              <div className="flex items-center gap-2">
                {!isEditing ? (
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#254151] px-4 py-2 text-white"
                    onClick={() => {
                      setDraft(posts.map((p) => ({ ...p })));
                      setIsEditing(true);
                    }}
                  >
                    <Pencil className="size-4" />
                    {isAr ? "تعديل القسم" : "Edit section"}
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white"
                      onClick={saveChanges}
                      disabled={saving}
                    >
                      <Save className="size-4" />
                      {isAr ? "حفظ" : "Save"}
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-lg bg-gray-700 px-4 py-2 text-white"
                      onClick={() => {
                        setIsEditing(false);
                        setDraft([]);
                      }}
                    >
                      <X className="size-4" />
                      {isAr ? "إلغاء" : "Cancel"}
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-lg bg-[#6096b4] px-4 py-2 text-white"
                      onClick={() =>
                        setDraft((prev) => [
                          ...prev,
                          {
                            platform: "instagram",
                            image:
                              "/assets/697518319cfbd5386e1be0c0c198fb998764dde2.png",
                            titleAr: "عنوان عربي",
                            titleEn: "English title",
                            postUrl: "",
                            pageName: "",
                            order: prev.length,
                          },
                        ])
                      }
                    >
                      <Plus className="size-4" />
                      {isAr ? "إضافة بوست" : "Add post"}
                    </button>
                  </>
                )}
              </div>
            )}

            {socialLinks.length > 0 ? (
              <div
                dir="ltr"
                className="flex items-center gap-3 flex-wrap order-2 md:order-2 justify-center md:justify-end"
              >
                {socialLinks.map((link, i) => {
                  const href = link.url.trim();
                  const isHttp =
                    href.startsWith("http://") || href.startsWith("https://");
                  return (
                    <a
                      key={`${link.icon}-${i}`}
                      href={href}
                      target={isHttp ? "_blank" : undefined}
                      rel={isHttp ? "noopener noreferrer" : undefined}
                      title={siteSocialIconLabel(link.icon)}
                      aria-label={siteSocialIconLabel(link.icon)}
                      className="flex size-11 items-center justify-center overflow-visible rounded-lg border-2 border-gray-200 bg-white p-1.5 text-[#254151] shadow-sm transition-all hover:border-[#6096b4] hover:bg-[#254151] hover:text-white"
                    >
                      <SocialPlatformIcon
                        name={link.icon}
                        className="size-[1.35rem] max-h-full max-w-full"
                      />
                    </a>
                  );
                })}
              </div>
            ) : null}
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestFourPosts.map((post, index) => (
              <a
                key={post._id || `new-${index}`}
                href={isEditing ? undefined : post.postUrl}
                target={isEditing ? undefined : "_blank"}
                rel={isEditing ? undefined : "noopener noreferrer"}
                className="group relative bg-white shadow-lg overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-xl rounded-xl"
              >
                {isEditing && (
                  <button
                    type="button"
                    className="absolute top-3 left-3 z-20 size-8 rounded-full bg-red-600 text-white flex items-center justify-center"
                    onClick={(e) => {
                      e.preventDefault();
                      setDraft((prev) =>
                        prev
                          .filter((_, i) => i !== index)
                          .map((p, i) => ({ ...p, order: i })),
                      );
                    }}
                  >
                    <Trash2 className="size-4" />
                  </button>
                )}

                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    fill
                    src={post.image}
                    alt={isAr ? post.titleAr : post.titleEn}
                    sizes="(min-width: 1536px) 25vw, (min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Footer */}
                <div className="p-4 flex items-center justify-between">
                  {/* User Info */}
                  <div className="flex items-center gap-3">
                    <div className="size-10 bg-gradient-to-br from-[#254151] to-[#6096b4] shadow-md flex items-center justify-center">
                      {platformIcon(post.platform, "size-5 text-white")}
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">{post.pageName}</p>
                      <p className="text-xs text-gray-500">{post.platform}</p>
                    </div>
                  </div>

                  {/* Platform Icon */}
                  <div className="size-8 bg-gray-100 shadow-sm flex items-center justify-center">
                    {platformIcon(post.platform, "size-4 text-gray-700")}
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[#254151]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center text-white p-6">
                    {!isEditing ? (
                      <>
                        <p className="mb-4">
                          {isAr ? post.titleAr : post.titleEn}
                        </p>
                        <span className="bg-white text-[#254151] px-6 py-2 shadow-md hover:bg-[#6096b4] hover:text-white transition-colors">
                          {isAr ? "عرض المنشور" : "View post"}
                        </span>
                      </>
                    ) : (
                      <div className="grid gap-2 w-64 text-white">
                        <input
                          type="text"
                          value={post.titleAr}
                          onChange={(e) =>
                            updateDraft(index, { titleAr: e.target.value })
                          }
                          className="rounded-md border border-white/40 bg-white/10 px-2 py-1 text-sm text-white placeholder:text-white/80"
                          placeholder="العنوان عربي"
                          onClick={(e) => e.preventDefault()}
                        />
                        <input
                          type="text"
                          value={post.titleEn}
                          onChange={(e) =>
                            updateDraft(index, { titleEn: e.target.value })
                          }
                          className="rounded-md border border-white/40 bg-white/10 px-2 py-1 text-sm text-white placeholder:text-white/80"
                          placeholder="Title English"
                          onClick={(e) => e.preventDefault()}
                        />
                        <input
                          type="text"
                          value={post.pageName}
                          onChange={(e) =>
                            updateDraft(index, { pageName: e.target.value })
                          }
                          className="rounded-md border border-white/40 bg-white/10 px-2 py-1 text-sm text-white placeholder:text-white/80"
                          placeholder={isAr ? "اسم الصفحة" : "Page name"}
                          onClick={(e) => e.preventDefault()}
                        />
                        <input
                          type="text"
                          value={post.postUrl}
                          onChange={(e) =>
                            updateDraft(index, { postUrl: e.target.value })
                          }
                          className="rounded-md border border-white/40 bg-white/10 px-2 py-1 text-sm text-white placeholder:text-white/80"
                          placeholder={isAr ? "رابط المنشور" : "Post URL"}
                          onClick={(e) => e.preventDefault()}
                        />
                        <select
                          value={post.platform}
                          onChange={(e) =>
                            updateDraft(index, {
                              platform: e.target
                                .value as SocialPost["platform"],
                            })
                          }
                          className="rounded-md border border-white/40 bg-white/10 px-2 py-1 text-sm text-white"
                          onClick={(e) => e.preventDefault()}
                        >
                          <option value="instagram">Instagram</option>
                          <option value="facebook">Facebook</option>
                          <option value="twitter">X</option>
                        </select>
                        <label className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-[#254151]">
                          <ImageUp className="size-4" />
                          {isAr ? "تغيير الصورة" : "Change image"}
                          <input
                            type="file"
                            accept="image/png,image/jpeg,image/webp,image/gif"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) void onUploadImage(index, file);
                              e.target.value = "";
                            }}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* View More Button - Full Width Strip */}
        <div className="w-full mt-12">
          <Link
            href="/main/social-posts"
            className="block w-full bg-[#6096b4] hover:bg-[#254151] text-white py-6 text-xl text-center transition-all"
          >
            {isAr ? "عرض المزيد من المنشورات" : "View more posts"}
          </Link>
        </div>
      </div>
    </section>
  );
}
