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
  const handleChange = (course: string) => {
    const allowedCourses = JSON.parse(
      localStorage.getItem("allowedCourses") || "[]"
    );

    // If nothing is configured by admin, allow everything
    if (allowedCourses.length === 0) {
      onSelect(course);
      return;
    }

    const subscribed = allowedCourses.some((item: string) => {
      if (course === "CBSE") return item.includes("CBSE");
      if (course === "ICSE") return item.includes("ICSE");
      if (course === "Maharashtra Board")
        return item.includes("Maharashtra");
      if (course === "JEE Main") return item.includes("JEE");
      if (course === "NEET") return item.includes("NEET");
      if (course === "MHT CET") return item.includes("MHT");
      return false;
    });

    if (!subscribed) {
      alert(
        `🚫 You haven't subscribed to ${course}.\n\nPlease contact the administrator to purchase this course.`
      );
      return;
    }

    onSelect(course);
  };

  return (
    <select
      value={selected}
      onChange={(e) => handleChange(e.target.value)}
      className="w-full rounded-xl border border-gray-300 bg-white p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {courses.map((course) => (
        <option key={course} value={course}>
          {course}
        </option>
      ))}
    </select>
  );
}