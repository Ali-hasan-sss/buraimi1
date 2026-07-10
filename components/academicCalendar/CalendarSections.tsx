import { Calendar } from "lucide-react";

export type CalendarEvent = {
  date: string;
  note: string;
  highlight?: boolean;
};

export function SemesterSection({
  title,
  events,
}: {
  title: string;
  events: CalendarEvent[];
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      <div className="bg-gradient-to-l from-[#254151] to-[#6096b4] px-6 py-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <Calendar className="size-6" />
          {title}
        </h2>
      </div>
      <div className="p-6">
        <div className="space-y-3">
          {events.map((event, index) => (
            <div
              key={index}
              className={`flex gap-4 p-4 rounded-lg border transition-all hover:shadow-md ${
                event.highlight
                  ? "bg-[#c2a772]/10 border-[#c2a772] hover:bg-[#c2a772]/20"
                  : "bg-gray-50 border-gray-200 hover:bg-gray-100"
              }`}
            >
              <div
                className={`flex-shrink-0 px-4 py-2 rounded-lg font-bold text-sm ${
                  event.highlight
                    ? "bg-[#c2a772] text-white"
                    : "bg-[#6096b4] text-white"
                }`}
              >
                {event.date}
              </div>
              <div className="flex-1">
                <p className="text-gray-800 leading-relaxed">{event.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function NoteBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-l from-[#6096b4]/10 to-[#c2a772]/10 border-r-4 border-[#c2a772] rounded-lg p-6">
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <div className="size-8 bg-[#c2a772] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">!</span>
          </div>
        </div>
        <div className="flex-1 text-gray-700 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
