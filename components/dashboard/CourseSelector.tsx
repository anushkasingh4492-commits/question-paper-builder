"use client";

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
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {courses.map((course) => {
        const subscribed =
          allowedCourses.length === 0 ||
          allowedCourses.some((c) => c.includes(course));

        return (
          <button
            key={course}
            onClick={() => {
              if (subscribed) {
                onSelect(course);
              } else {
                alert(
                  "🔒 You are not subscribed to this course."
                );
              }
            }}
            className={`rounded-xl border p-5 text-left transition ${
              selected === course
                ? "border-blue-600 bg-blue-50"
                : "border-gray-300 bg-white"
            } ${
              subscribed
                ? "hover:border-blue-500 hover:shadow"
                : "opacity-70"
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">{course}</h3>

              {subscribed ? (
                <span className="text-green-600 text-xl">✓</span>
              ) : (
                <span className="text-red-500 text-xl">🔒</span>
              )}
            </div>

            <p className="mt-2 text-sm text-gray-500">
              {subscribed
                ? "Available"
                : "Not Subscribed"}
            </p>
          </button>
        );
      })}
    </div>
  );
}