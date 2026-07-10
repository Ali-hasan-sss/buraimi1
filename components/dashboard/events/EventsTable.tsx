import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EventDeleteDialog } from "./EventDeleteDialog";
import { EventEditDialog } from "./EventEditDialog";

type EventRow = {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  summaryAr: string;
  summaryEn: string;
  contentAr: string;
  contentEn: string;
  date: string;
  locationAr: string;
  locationEn: string;
  image: string;
  type: "events" | "conferences" | "student";
};

export function EventsTable({
  data,
  isAr,
}: {
  data: EventRow[];
  isAr: boolean;
}) {
  const typeLabel = (type: EventRow["type"]) => {
    if (isAr) {
      if (type === "events") return "فعاليات";
      if (type === "conferences") return "مؤتمرات";
      return "أنشطة طلاب";
    }
    if (type === "events") return "Events";
    if (type === "conferences") return "Conferences";
    return "Student Activities";
  };

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
              {isAr ? "الموقع" : "Location"}
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
                {isAr ? item.locationAr : item.locationEn}
              </TableCell>
              <TableCell>
                <div className="flex justify-center gap-2">
                  <EventEditDialog item={item} isAr={isAr} />
                  <EventDeleteDialog id={item.id} isAr={isAr} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
