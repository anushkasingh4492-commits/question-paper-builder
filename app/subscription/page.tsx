"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const subscriptionData = [
  {
    title: "CBSE",
    items: [
      "CBSE Class 9",
      "CBSE Class 10",
      "CBSE Class 11",
      "CBSE Class 12",
    ],
  },
  {
    title: "ICSE",
    items: [
      "ICSE Class 9",
      "ICSE Class 10",
      "ICSE Class 11",
      "ICSE Class 12",
    ],
  },
  {
    title: "Maharashtra Board",
    items: [
      "Maharashtra Class 9",
      "Maharashtra Class 10",
      "Maharashtra Class 11",
      "Maharashtra Class 12",
    ],
  },
  {
    title: "Competitive Exams",
    items: [
      "JEE Main",
      "JEE Advanced",
      "NEET",
      "MHT-CET",
    ],
  },
];

export default function SubscriptionPage() {
  const router = useRouter();

  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const toggleCourse = (course: string) => {
    if (selectedCourses.includes(course)) {
      setSelectedCourses(
        selectedCourses.filter((c) => c !== course)
      );
    } else {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  const saveSubscription = () => {
    localStorage.setItem(
      "allowedCourses",
      JSON.stringify(selectedCourses)
    );

    alert("Subscription Saved Successfully!");

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold">
            Choose Your Subscription
          </h1>

          <p className="text-gray-500 mt-3">
            Select every course you want access to.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
        {subscriptionData.map((section) => (
          <div
            key={section.title}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-5">
              {section.title}
            </h2>

            <div className="space-y-3">
              {section.items.map((course) => (
                <label
                  key={course}
                  className="flex items-center justify-between border rounded-xl p-4 cursor-pointer hover:bg-blue-50 transition"
                >
                  <div>
                    <p className="font-semibold">{course}</p>
                  </div>

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
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <button
          onClick={saveSubscription}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-4 rounded-xl text-lg transition"
        >
          Save Subscription
        </button>
      </div>
            </div>
    </div>
  );
}