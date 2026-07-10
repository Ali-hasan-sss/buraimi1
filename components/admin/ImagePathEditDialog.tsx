'use client';

import { useState } from 'react';
import { Pencil } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ImageUploadField from '@/components/admin/ImageUploadField';
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
    value: string;
    onSave: (next: string) => void;
};

export default function ImagePathEditDialog({ label, value, onSave }: Props) {
    const t = useTranslations('heroAdmin');
    const [open, setOpen] = useState(false);
    const [path, setPath] = useState(value);
    const [uploadedUrl, setUploadedUrl] = useState('');

    return (
        <Dialog
            open={open}
            onOpenChange={(next) => {
                setOpen(next);
                if (next) {
                    setPath(value);
                    setUploadedUrl('');
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
                    <DialogDescription>{t('imagePathDescription')}</DialogDescription>
                </DialogHeader>
                <ImageUploadField
                    onUploaded={(relativePath, fullUrl) => {
                        setPath(relativePath);
                        setUploadedUrl(fullUrl);
                    }}
                />
                <Input value={path} onChange={(e) => setPath(e.target.value)} dir="ltr" className="font-mono text-sm" />
                {uploadedUrl && (
                    <p className="text-xs text-gray-600">
                        {t('urlPrefix')} {uploadedUrl}
                    </p>
                )}
                <DialogFooter>
                    <Button
                        type="button"
                        onClick={() => {
                            onSave(path.trim());
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
