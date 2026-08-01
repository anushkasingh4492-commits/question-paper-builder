"use client";

import { courses } from "@/lib/courseData";

interface Props {
  selected: string;
  onSelect: (course: string) => void;
}

export default function CourseSelector({
  selected,
  onSelect,
}: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {courses.map((course) => (
        <button
          key={course.id}
          onClick={() => onSelect(course.id)}
          className={`rounded-xl border p-5 transition-all ${
            selected === course.id
              ? "bg-blue-600 text-white"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          <h2 className="font-bold text-lg">
            {course.name}
          </h2>
        </button>
      ))}
    </div>
  );
}