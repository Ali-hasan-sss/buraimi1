export interface EditorMember {
    positionAr: string;
    positionEn: string;
    name: string;
    email: string;
}

export interface MagazineIssue {
    id: number;
    titleAr: string;
    titleEn: string;
    issueNumberAr: string;
    issueNumberEn: string;
    coverImage: string;
    pdfUrl?: string;
    fileUrl?: string;
    fileName?: string;
}
