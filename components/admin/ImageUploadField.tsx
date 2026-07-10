'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

type Props = {
    onUploaded: (relativePath: string, fullUrl: string) => void;
};

export default function ImageUploadField({ onUploaded }: Props) {
    const t = useTranslations('heroAdmin');
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    const upload = async () => {
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
                ok: boolean;
                message?: string;
                relativePath?: string;
                url?: string;
            };
            if (!res.ok || !data.ok || !data.relativePath) {
                setError(data.message || t('uploadFailed'));
                return;
            }
            onUploaded(data.relativePath, data.url || data.relativePath);
        } catch {
            setError(t('uploadFailed'));
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-2">
            <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="text-sm"
            />
            <Button type="button" variant="outline" onClick={upload} disabled={!file || uploading}>
                {uploading ? t('uploading') : t('uploadImage')}
            </Button>
            {error && <p className="text-xs text-red-600">{error}</p>}
        </div>
    );
}
