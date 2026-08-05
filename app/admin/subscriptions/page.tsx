"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";

export default function SubscriptionPage() {
  const courses = [
    // School Boards
    "CBSE (Classes 9–12)",
    "ICSE (Classes 9–12)",
    "Maharashtra Board (Classes 9–12)",

    // JEE Main
    "JEE Main - Class 11",
    "JEE Main - Class 12",
    "JEE Main - Class 11 + 12",

    // NEET
    "NEET - Class 11",
    "NEET - Class 12",
    "NEET - Class 11 + 12",

    // MHT CET
    "MHT CET - Class 11",
    "MHT CET - Class 12",
    "MHT CET - Class 11 + 12",
  ];

  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("allowedCourses") || "[]"
    );
    setSelectedCourses(saved);
  }, []);

  const toggleCourse = (course: string) => {
    if (selectedCourses.includes(course)) {
      setSelectedCourses(
        selectedCourses.filter((c) => c !== course)
      );
    } else {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  const saveCourses = () => {
    localStorage.setItem(
      "allowedCourses",
      JSON.stringify(selectedCourses)
    );

    alert("Subscriptions Saved!");
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold mb-2">
          Course Subscriptions
        </h1>

        <p className="text-gray-500 mb-8">
          Select which courses the user can access.
        </p>

        {/* School Boards */}

        <div className="mb-10">

          <h2 className="text-2xl font-bold text-blue-700 mb-5">
            📚 School Boards
          </h2>

          <div className="space-y-3">

            {courses.slice(0, 3).map((course, index) => (
              <label
                key={`${course}-${index}`}
                className="flex items-center justify-between border rounded-xl p-4 hover:bg-blue-50 cursor-pointer"
              >
                <span>{course}</span>

                <input
                  type="checkbox"
                  checked={selectedCourses.includes(course)}
                  onChange={() => toggleCourse(course)}
                  className="w-5 h-5"
                />
              </label>
            ))}

          </div>

        </div>

        {/* Competitive Exams */}

        <div>

          <h2 className="text-2xl font-bold text-purple-700 mb-5">
            🏆 Competitive Exams
          </h2>

          <div className="space-y-3">

            {courses.slice(3).map((course, index) => (
              <label
                key={`${course}-${index}`}
                className="flex items-center justify-between border rounded-xl p-4 hover:bg-purple-50 cursor-pointer"
              >
                <span>{course}</span>

                <input
                  type="checkbox"
                  checked={selectedCourses.includes(course)}
                  onChange={() => toggleCourse(course)}
                  className="w-5 h-5"
                />
              </label>
            ))}

          </div>

        </div>

        <button
          onClick={saveCourses}
          className="mt-10 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
        >
          Save Subscriptions
        </button>

      </div>
    </DashboardLayout>
  );
}