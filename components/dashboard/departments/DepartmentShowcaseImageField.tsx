'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ImageUp, Loader2, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';
import { isLocallyStoredUploadSrc, resolveUploadImageSrc } from '@/lib/upload-public-url';

type Props = {
    name?: string;
    defaultPath?: string;
};

/**
 * منطقة معاينة واحدة: النقر يفتح اختيار الملف ويُرفع تلقائياً (بدون حقل ملف ظاهر ولا زر رفع منفصل).
 */
export default function DepartmentShowcaseImageField({ name = 'showcaseImage', defaultPath = '' }: Props) {
    const t = useTranslations('dashboardDepartments');
    const [path, setPath] = useState(defaultPath.trim());
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const openPicker = () => {
        if (!uploading) inputRef.current?.click();
    };

    const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        e.target.value = '';
        if (!file) return;

        setUploading(true);
        setError('');
        try {
            const formData = new FormData();
            formData.append('file', file);
            const res = await fetch('/api/uploads', {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });
            const data = (await res.json()) as {
                ok?: boolean;
                message?: string;
                relativePath?: string;
                url?: string;
            };
            if (!res.ok || !data.ok || !data.relativePath) {
                setError(data.message || t('uploadFailed'));
                return;
            }
            setPath(data.relativePath);
        } catch {
            setError(t('uploadFailed'));
        } finally {
            setUploading(false);
        }
    };

    const clearImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setPath('');
        setError('');
    };

    return (
        <div className="space-y-2 rounded-lg border border-dashed border-muted-foreground/25 bg-muted/30 p-4">
            <div>
                <p className="text-sm font-medium">{t('showcase.title')}</p>
                <p className="text-xs text-muted-foreground">
                    {t('showcase.description')}
                </p>
            </div>

            <input type="hidden" name={name} value={path} key={path || 'empty'} />
            <input
                ref={inputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                className="sr-only"
                onChange={onFileChange}
                tabIndex={-1}
                aria-hidden
            />

            <div className="relative inline-block">
                <button
                    type="button"
                    onClick={openPicker}
                    disabled={uploading}
                    className={cn(
                        'group relative flex h-28 w-44 shrink-0 items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-muted-foreground/35 bg-background text-center transition-colors',
                        'hover:border-[#6096b4] hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                        uploading && 'pointer-events-none opacity-80'
                    )}
                    aria-label={t('showcase.uploadImage')}
                >
                    {path ? (
                        <>
                            <Image
                                src={resolveUploadImageSrc(path)}
                                alt=""
                                fill
                                className="object-cover"
                                sizes="176px"
                                unoptimized={isLocallyStoredUploadSrc(path)}
                            />
                            <div
                                className={cn(
                                    'absolute inset-0 flex flex-col items-center justify-center gap-1 bg-[#254151]/65 text-white transition-opacity',
                                    'opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'
                                )}
                            >
                                <ImageUp className="size-8" strokeWidth={1.5} />
                                <span className="px-2 text-xs font-medium">{t('showcase.uploadImage')}</span>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-2 px-3 text-muted-foreground">
                            <ImageUp className="size-9 stroke-[#6096b4]" strokeWidth={1.25} />
                            <span className="text-xs font-medium leading-tight text-[#254151]">{t('showcase.uploadImage')}</span>
                        </div>
                    )}

                    {uploading && (
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-background/85 text-[#254151]">
                            <Loader2 className="size-8 animate-spin" />
                            <span className="text-xs font-medium">{t('showcase.uploading')}</span>
                        </div>
                    )}
                </button>

                {path && !uploading && (
                    <button
                        type="button"
                        onClick={clearImage}
                        className="absolute -right-2 -top-2 z-20 flex size-7 items-center justify-center rounded-full border border-background bg-destructive text-destructive-foreground shadow-md hover:bg-destructive/90"
                        aria-label={t('showcase.removeImage')}
                        title={t('showcase.removeImage')}
                    >
                        <X className="size-3.5" strokeWidth={2.5} />
                    </button>
                )}
            </div>

            {error ? <p className="text-xs text-red-600">{error}</p> : null}
        </div>
    );
}
