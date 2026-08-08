
"use client";

import { Check, Lock } from "lucide-react";

interface Props {
  courses: string[];
  allowedCourses: string[];
  selected: string;
  onSelect: (course: string) => void;
}

export default function CourseSelector({
  courses,
  allowedCourses,
  selected,
  onSelect,
}: Props) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {courses.map((course) => {
        const subscribed =
          allowedCourses.length === 0 ||
          allowedCourses.some((c) => c.includes(course));

        const isSelected = selected === course;

        return (
          <button
            key={course}
            type="button"
            onClick={() => {
              if (subscribed) {
                onSelect(course);
              } else {
                alert("You are not subscribed to this course.");
              }
            }}
            className={`rounded-[8px] border p-4 text-left transition-colors duration-150 ${
              isSelected
                ? "border-[var(--color-brand)] bg-[var(--color-paper-50)]"
                : "border-[var(--color-border)] bg-[var(--color-surface)]"
            } ${
              subscribed
                ? "hover:border-[var(--color-brand)] hover:bg-[var(--color-paper-50)]"
                : "cursor-not-allowed opacity-60"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <h3
                className="text-base font-semibold text-[var(--color-text)]"
                style={{ fontFamily: "Source Serif 4, serif" }}
              >
                {course}
              </h3>

              {subscribed ? (
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                    isSelected
                      ? "bg-[var(--color-brand)] text-white"
                      : "bg-[var(--color-paper-100)] text-[var(--color-brand)]"
                  }`}
                >
                  <Check size={15} strokeWidth={2.5} />
                </span>
              ) : (
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-paper-100)] text-[var(--color-text-muted)]">
                  <Lock size={14} />
                </span>
              )}
            </div>

            <p className="mt-2 text-xs text-[var(--color-text-muted)]">
              {subscribed ? "Available" : "Not subscribed"}
            </p>
          </button>
        );
      })}
    </div>
  );
}

