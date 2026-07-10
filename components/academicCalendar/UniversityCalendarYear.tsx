import { NoteBox, SemesterSection } from "@/components/academicCalendar/CalendarSections";
import { universityCalendarData } from "@/components/academicCalendar/universityCalendarData";

export default function UniversityCalendarYear({ year }: { year: string }) {
  const yearData = universityCalendarData[year];

  if (!yearData) return null;

  return (
    <div className="space-y-8">
      {yearData.sections.map((section: { title: string; events: { date: string; note: string; highlight?: boolean }[] }) => (
        <SemesterSection
          key={section.title}
          title={section.title}
          events={section.events}
        />
      ))}

      {yearData.noteLines?.length ? (
        <NoteBox>
          {yearData.noteLines.map((line: string, idx: number) => (
            <div key={`${line}-${idx}`}>{line}</div>
          ))}
        </NoteBox>
      ) : null}
    </div>
  );
}
