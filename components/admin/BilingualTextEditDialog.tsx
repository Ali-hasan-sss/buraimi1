'use client';

import { useState } from 'react';
import { Pencil } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
    valueAr: string;
    valueEn: string;
    multiline?: boolean;
    onSave: (next: { ar: string; en: string }) => void;
};

export default function BilingualTextEditDialog({
    label,
    valueAr,
    valueEn,
    multiline = false,
    onSave,
}: Props) {
    const t = useTranslations('heroAdmin');
    const [open, setOpen] = useState(false);
    const [ar, setAr] = useState(valueAr);
    const [en, setEn] = useState(valueEn);

    const Field = multiline ? Textarea : Input;

    return (
        <Dialog
            open={open}
            onOpenChange={(next) => {
                setOpen(next);
                if (next) {
                    setAr(valueAr);
                    setEn(valueEn);
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
                    <DialogDescription>{t('bilingualDescription')}</DialogDescription>
                </DialogHeader>
                <div className="space-y-3">
                    <div>
                        <div className="text-sm mb-1">{t('labelArabic')}</div>
                        <Field value={ar} onChange={(e) => setAr(e.target.value)} />
                    </div>
                    <div>
                        <div className="text-sm mb-1">{t('labelEnglish')}</div>
                        <Field value={en} onChange={(e) => setEn(e.target.value)} />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type="button"
                        onClick={() => {
                            onSave({ ar: ar.trim(), en: en.trim() });
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
