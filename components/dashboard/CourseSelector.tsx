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
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Course
      </label>

      <select
        value={selected}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
      >
        {courses.map((course) => (
          <option key={course} value={course}>
            {course}
          </option>
        ))}
      </select>
    </div>
  );
}