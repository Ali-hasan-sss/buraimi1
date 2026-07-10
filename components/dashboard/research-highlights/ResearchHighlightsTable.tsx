import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ResearchHighlightDeleteDialog } from "./ResearchHighlightDeleteDialog";
import { ResearchHighlightEditDialog } from "./ResearchHighlightEditDialog";

type Row = {
  id: string;
  slug: string;
  type: "research" | "award";
  titleAr: string;
  titleEn: string;
  summaryAr: string;
  summaryEn: string;
  contentAr: string;
  contentEn: string;
  date: string;
  image: string;
  order: number;
};

export function ResearchHighlightsTable({
  data,
  isAr,
}: {
  data: Row[];
  isAr: boolean;
}) {
  const typeLabel = (type: Row["type"]) =>
    isAr
      ? type === "research"
        ? "بحث"
        : "جائزة"
      : type === "research"
        ? "Research"
        : "Award";

  return (
    <div className="rounded-xl border bg-white overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className={isAr ? "text-right" : "text-left"}>
              {isAr ? "العنوان" : "Title"}
            </TableHead>
            <TableHead className={isAr ? "text-right" : "text-left"}>
              {isAr ? "النوع" : "Type"}
            </TableHead>
            <TableHead className={isAr ? "text-right" : "text-left"}>
              {isAr ? "التاريخ" : "Date"}
            </TableHead>
            <TableHead className={isAr ? "text-right" : "text-left"}>
              {isAr ? "الترتيب" : "Order"}
            </TableHead>
            <TableHead className="text-center">
              {isAr ? "الإجراءات" : "Actions"}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className={isAr ? "text-right" : "text-left"}>
                {isAr ? item.titleAr : item.titleEn}
              </TableCell>
              <TableCell className={isAr ? "text-right" : "text-left"}>
                {typeLabel(item.type)}
              </TableCell>
              <TableCell className={isAr ? "text-right" : "text-left"}>
                {new Date(item.date).toLocaleDateString(
                  isAr ? "ar-SA" : "en-US",
                )}
              </TableCell>
              <TableCell className={isAr ? "text-right" : "text-left"}>
                {item.order}
              </TableCell>
              <TableCell>
                <div className="flex justify-center gap-2">
                  <ResearchHighlightEditDialog item={item} isAr={isAr} />
                  <ResearchHighlightDeleteDialog id={item.id} isAr={isAr} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
