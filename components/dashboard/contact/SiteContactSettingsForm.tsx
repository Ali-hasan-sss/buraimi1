"use client";

import { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import { updateSiteContactSettingsAction } from "@/app/dashboard/contact/actions/updateSiteContactSettings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SocialPlatformIcon } from "@/components/social/SocialPlatformIcon";
import {
  SITE_SOCIAL_ICON_OPTIONS,
  siteSocialIconLabel,
} from "@/lib/site-contact-settings-icons";
import type { SiteContactSettingsPublic } from "@/types/site-contact-settings";

export { SITE_SOCIAL_ICON_OPTIONS } from "@/lib/site-contact-settings-icons";

type Row = { icon: string; url: string };

export default function SiteContactSettingsForm({
  initial,
}: {
  initial: SiteContactSettingsPublic;
}) {
  const [rows, setRows] = useState<Row[]>(() =>
    initial.socialLinks.length
      ? initial.socialLinks.map((l) => ({ icon: l.icon, url: l.url }))
      : [],
  );

  const jsonPayload = useMemo(() => JSON.stringify(rows), [rows]);

  const addRow = () => setRows((r) => [...r, { icon: "facebook", url: "" }]);
  const removeRow = (i: number) => setRows((r) => r.filter((_, idx) => idx !== i));

  const setIcon = (i: number, icon: string) =>
    setRows((r) => r.map((row, idx) => (idx === i ? { ...row, icon } : row)));
  const setUrl = (i: number, url: string) =>
    setRows((r) => r.map((row, idx) => (idx === i ? { ...row, url } : row)));

  return (
    <section className="rounded-xl border bg-background p-4 sm:p-6">
      <div className="mb-4 space-y-1">
        <h2 className="text-lg font-semibold tracking-tight">
          Site contact and social links
        </h2>
        <p className="text-sm text-muted-foreground">
          WhatsApp number, call lines, and social profiles. Use{" "}
          <code className="rounded bg-muted px-1 text-xs">getSiteContactSettings()</code>{" "}
          from <code className="rounded bg-muted px-1 text-xs">@/lib/site-contact-settings</code>{" "}
          on public pages.
        </p>
      </div>

      <form action={updateSiteContactSettingsAction} className="space-y-6">
        <input type="hidden" name="socialLinksJson" value={jsonPayload} />

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <label className="text-sm font-medium" htmlFor="whatsappPhone">
              WhatsApp number
            </label>
            <Input
              id="whatsappPhone"
              name="whatsappPhone"
              dir="ltr"
              placeholder="968XXXXXXXX"
              defaultValue={initial.whatsappPhone}
            />
            <p className="text-xs text-muted-foreground">
              Digits only or with country code; used for wa.me links in the site.
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="callPhone1">
              Call line 1
            </label>
            <Input
              id="callPhone1"
              name="callPhone1"
              dir="ltr"
              defaultValue={initial.callPhone1}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="callPhone2">
              Call line 2
            </label>
            <Input
              id="callPhone2"
              name="callPhone2"
              dir="ltr"
              defaultValue={initial.callPhone2}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <label className="text-sm font-medium" htmlFor="callPhone3">
              Call line 3
            </label>
            <Input
              id="callPhone3"
              name="callPhone3"
              dir="ltr"
              defaultValue={initial.callPhone3}
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm font-medium">Social links</span>
            <Button type="button" variant="outline" size="sm" onClick={addRow}>
              <Plus className="me-1 size-4" />
              Add link
            </Button>
          </div>
          {rows.length === 0 ? (
            <p className="rounded-lg border border-dashed py-6 text-center text-sm text-muted-foreground">
              No social links yet. Click &quot;Add link&quot; to add one.
            </p>
          ) : null}
          <div className="space-y-3">
            {rows.map((row, i) => {
              const isPreset = SITE_SOCIAL_ICON_OPTIONS.some(
                (o) => o.value === row.icon,
              );
              return (
              <div
                key={i}
                className="flex flex-col gap-3 rounded-lg border bg-muted/20 p-3 sm:flex-row sm:items-end"
              >
                <div className="grid flex-1 gap-3 sm:grid-cols-2">
                  <div className="space-y-2">
                    <span className="text-xs font-medium text-muted-foreground">
                      Icon
                    </span>
                    <Select
                      value={row.icon}
                      onValueChange={(v) => setIcon(i, v)}
                    >
                      <SelectTrigger className="h-auto min-h-9 w-full py-1.5">
                        <span className="flex min-w-0 flex-1 items-center gap-2">
                          <SocialPlatformIcon
                            name={row.icon}
                            className="size-4 shrink-0 text-muted-foreground"
                          />
                          <SelectValue placeholder="Platform">
                            {siteSocialIconLabel(row.icon)}
                            {!isPreset && row.icon
                              ? ` (${row.icon})`
                              : null}
                          </SelectValue>
                        </span>
                      </SelectTrigger>
                      <SelectContent>
                        {!isPreset && row.icon ? (
                          <SelectItem value={row.icon}>
                            <SocialPlatformIcon
                              name={row.icon}
                              className="size-4 shrink-0"
                            />
                            {siteSocialIconLabel(row.icon)} (legacy)
                          </SelectItem>
                        ) : null}
                        {SITE_SOCIAL_ICON_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            <SocialPlatformIcon
                              name={opt.value}
                              className="size-4 shrink-0"
                            />
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-medium text-muted-foreground">
                      URL
                    </span>
                    <div className="relative">
                      <span className="pointer-events-none absolute start-2.5 top-1/2 z-[1] -translate-y-1/2 text-muted-foreground">
                        <SocialPlatformIcon
                          name={row.icon}
                          className="size-4"
                        />
                      </span>
                      <Input
                        dir="ltr"
                        placeholder="https://…"
                        value={row.url}
                        onChange={(e) => setUrl(i, e.target.value)}
                        className="ps-9"
                      />
                    </div>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="shrink-0 text-destructive hover:text-destructive"
                  onClick={() => removeRow(i)}
                  aria-label="Remove row"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            );
            })}
          </div>
        </div>

        <div className="flex justify-end border-t pt-4">
          <Button type="submit">Save contact settings</Button>
        </div>
      </form>
    </section>
  );
}
