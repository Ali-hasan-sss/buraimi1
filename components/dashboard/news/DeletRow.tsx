import { NewsItemFromAPI } from "@/types/news";
import { AlertCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface DeleteNewsRowProps {
    isAr: boolean;
    selectedNews: NewsItemFromAPI;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function DeleteNewsRow({
    isAr,
    selectedNews,
    open,
    onOpenChange,
}: DeleteNewsRowProps) {

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent showCloseButton={false} className="sm:max-w-md">
                <DialogHeader>
                    <div className={`flex items-center gap-3 ${isAr ? "flex-row-reverse" : ""}`}>
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                            <AlertCircle className="size-6 text-red-600" />
                        </div>
                        <DialogTitle className={`${isAr ? "text-right" : "text-left"} text-[#254151]`}>
                            {isAr ? "تأكيد الحذف" : "Confirm Delete"}
                        </DialogTitle>
                    </div>
                    <DialogDescription className={isAr ? "text-right" : "text-left"}>
                        {isAr
                            ? `هل أنت متأكد من حذف "${selectedNews.titleAr}"؟ لا يمكن التراجع عن هذا الإجراء.`
                            : `Are you sure you want to delete "${selectedNews.titleEn}"? This action cannot be undone.`}
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className={isAr ? "sm:flex-row-reverse" : ""}>
                    <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={() => onOpenChange(false)}
                    >
                        {isAr ? "إلغاء" : "Cancel"}
                    </Button>
                    <Button type="button" variant="destructive" className="flex-1">
                        <Trash2 className="size-4" />
                        {isAr ? "حذف" : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}