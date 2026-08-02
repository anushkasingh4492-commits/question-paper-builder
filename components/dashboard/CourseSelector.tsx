"use client";

interface Props {
  courses: string[];
  selected: string;
  onSelect: (course: string) => void;
}

export default function CourseSelector({
  courses,
  selected,
  onSelect,
}: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {courses.map((course) => (
        <button
          key={course}
          onClick={() => onSelect(course)}
          className={`rounded-xl border p-5 transition-all ${
            selected === course
              ? "bg-blue-600 text-white"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          <h2 className="font-bold text-lg">
            {course}
          </h2>
        </button>
      ))}
    </div>
  );
}