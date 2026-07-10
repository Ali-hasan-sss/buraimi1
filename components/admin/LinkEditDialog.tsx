"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  label: string;
  value: string;
  onSave: (link: string) => void;
};

export default function LinkEditDialog({ label, value, onSave }: Props) {
  const t = useTranslations("heroAdmin");
  const [open, setOpen] = useState(false);
  const [href, setHref] = useState(value);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) setHref(value);
      }}
    >
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full bg-white/90 text-[#254151] p-2 shadow hover:bg-white"
          aria-label={label}
        >
          <Pencil className="size-4" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
          <DialogDescription>{t("linkEditDescription")}</DialogDescription>
        </DialogHeader>
        <Input
          value={href}
          onChange={(e) => setHref(e.target.value)}
          placeholder={t("linkPlaceholder")}
          dir="ltr"
          className="font-mono text-sm"
        />
        <DialogFooter>
          <Button
            type="button"
            onClick={() => {
              onSave(href.trim());
              setOpen(false);
            }}
          >
            {t("save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
