"use client";

import { X, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Course } from "@/types/GraduateTyps";

export default function CourseTableEditor({
  accent,
  title,
  isRtl,
  courses,
  onChange,
  labels,
}: {
  accent: "blue" | "green" | "purple" | "red";
  title: string;
  isRtl: boolean;
  courses: Course[];
  onChange: (next: Course[]) => void;
  labels: {
    thIndex: string;
    thCode: string;
    thTitle: string;
    thCredits: string;
    addCourse: string;
    removeCourse: string;
  };
}) {
  const headerGradient =
    accent === "blue"
      ? "from-blue-600 to-blue-700"
      : accent === "green"
        ? "from-green-600 to-green-700"
        : accent === "purple"
          ? "from-purple-600 to-purple-700"
          : "from-red-600 to-red-700";

  const codeColor =
    accent === "blue"
      ? "text-blue-600"
      : accent === "green"
        ? "text-green-600"
        : accent === "purple"
          ? "text-purple-600"
          : "text-red-600";

  const rowHover =
    accent === "blue"
      ? "hover:bg-blue-50"
      : accent === "green"
        ? "hover:bg-green-50"
        : accent === "purple"
          ? "hover:bg-purple-50"
          : "hover:bg-red-50";

  const addCourse = () => {
    onChange([
      ...courses,
      { code: "", titleAr: "", titleEn: "", credits: 0, times: undefined },
    ]);
  };

  const updateCourse = (idx: number, patch: Partial<Course>) => {
    const next = courses.map((c, i) => (i === idx ? { ...c, ...patch } : c));
    onChange(next);
  };

  const removeCourse = (idx: number) => {
    const next = courses.filter((_, i) => i !== idx);
    onChange(next);
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#254151] mb-4 sm:mb-6">
        {title}
      </h3>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-200">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead className={`bg-gradient-to-r ${headerGradient} text-white`}>
              <tr>
                <th className="px-4 sm:px-6 py-4 text-right">{labels.thIndex}</th>
                <th className="px-4 sm:px-6 py-4 text-right">{labels.thCode}</th>
                <th className="px-4 sm:px-6 py-4 text-right">{labels.thTitle}</th>
                <th className="px-4 sm:px-6 py-4 text-center">{labels.thCredits}</th>
                <th className="px-4 sm:px-6 py-4 text-center"> </th>
              </tr>
            </thead>

            <tbody>
              {courses.map((course, i) => (
                <tr
                  key={`${course.code}-${i}`}
                  className={`border-b ${rowHover} transition-colors`}
                >
                  <td className="px-4 sm:px-6 py-4 font-semibold">{i + 1}</td>

                  <td className="px-4 sm:px-6 py-4">
                    <div className={`flex items-center gap-2 ${isRtl ? "flex-row-reverse" : ""}`}>
                      <Input
                        value={course.code ?? ""}
                        onChange={(e) =>
                          updateCourse(i, { code: e.target.value })
                        }
                        className="w-36"
                      />
                    </div>
                  </td>

                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex flex-col gap-2">
                      <Input
                        value={course.titleAr ?? ""}
                        onChange={(e) =>
                          updateCourse(i, { titleAr: e.target.value })
                        }
                      />
                      <Input
                        value={course.titleEn ?? ""}
                        onChange={(e) =>
                          updateCourse(i, { titleEn: e.target.value })
                        }
                        className="text-left"
                      />
                    </div>
                  </td>

                  <td className="px-4 sm:px-6 py-4 text-center">
                    <Input
                      type="number"
                      min={0}
                      value={course.credits ?? 0}
                      onChange={(e) =>
                        updateCourse(i, {
                          credits: Number.parseFloat(e.target.value || "0"),
                        })
                      }
                      className={`text-center ${codeColor}`}
                    />
                  </td>

                  <td className="px-4 sm:px-6 py-4 text-center">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeCourse(i)}
                      className="h-8 w-8"
                      aria-label={labels.removeCourse}
                    >
                      <X className="size-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <Button type="button" variant="outline" onClick={addCourse}>
          <Plus className="size-4" />
          {labels.addCourse}
        </Button>
      </div>
    </div>
  );
}

