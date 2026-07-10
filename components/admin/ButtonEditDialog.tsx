'use client';

import { useState } from 'react';
import { Pencil } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

type Props = {
    label: string;
    textAr: string;
    textEn: string;
    link: string;
    onSave: (next: { textAr: string; textEn: string; link: string }) => void;
};

export default function ButtonEditDialog({ label, textAr, textEn, link, onSave }: Props) {
    const t = useTranslations('heroAdmin');
    const [open, setOpen] = useState(false);
    const [ar, setAr] = useState(textAr);
    const [en, setEn] = useState(textEn);
    const [href, setHref] = useState(link);

    return (
        <Dialog
            open={open}
            onOpenChange={(next) => {
                setOpen(next);
                if (next) {
                    setAr(textAr);
                    setEn(textEn);
                    setHref(link);
                }
            }}
        >
            <DialogTrigger asChild>
                <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full bg-white/90 text-[#254151] p-2 shadow hover:bg-white"
                >
                    <Pencil className="size-4" />
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{label}</DialogTitle>
                    <DialogDescription>{t('buttonEditDescription')}</DialogDescription>
                </DialogHeader>
                <div className="space-y-3">
                    <div>
                        <div className="text-sm mb-1">{t('buttonTextAr')}</div>
                        <Input value={ar} onChange={(e) => setAr(e.target.value)} />
                    </div>
                    <div>
                        <div className="text-sm mb-1">{t('buttonTextEn')}</div>
                        <Input value={en} onChange={(e) => setEn(e.target.value)} />
                    </div>
                    <div>
                        <div className="text-sm mb-1">{t('link')}</div>
                        <Input value={href} onChange={(e) => setHref(e.target.value)} dir="ltr" className="font-mono text-sm" />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type="button"
                        onClick={() => {
                            onSave({ textAr: ar.trim(), textEn: en.trim(), link: href.trim() });
                            setOpen(false);
                        }}
                    >
                        {t('save')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
