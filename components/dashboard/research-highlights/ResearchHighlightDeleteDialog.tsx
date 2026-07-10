"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteResearchHighlightAction } from "./actions";

export function ResearchHighlightDeleteDialog({ id, isAr }: { id: string; isAr: boolean }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDelete = async () => {
    setLoading(true);
    setError(null);
    const res = await deleteResearchHighlightAction(id);
    if (!res.ok) setError(res.message);
    else {
      setOpen(false);
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon-sm" className="text-red-600"><Trash2 className="size-4" /></Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isAr ? "حذف العنصر" : "Delete item"}</DialogTitle>
          <DialogDescription>{isAr ? "لا يمكن التراجع عن هذا الإجراء." : "This action cannot be undone."}</DialogDescription>
        </DialogHeader>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>{isAr ? "إلغاء" : "Cancel"}</Button>
          <Button variant="destructive" onClick={onDelete} disabled={loading}>
            {loading ? <Loader2 className="size-4 animate-spin" /> : isAr ? "حذف" : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
