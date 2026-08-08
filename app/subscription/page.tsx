
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ArrowRight } from "lucide-react";

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
    <main className="min-h-screen bg-[var(--color-paper-50)] px-6 py-10">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-5 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center">
              <img
                src="/logo.png"
                alt="Paper Tree"
                className="h-14 w-14 object-contain"
              />
            </div>
          </div>

          <h1
            className="text-4xl font-semibold text-[var(--color-brand)] sm:text-5xl"
            style={{ fontFamily: "Source Serif 4, serif" }}
          >
            Choose your subscription
          </h1>

          <p className="mt-3 text-sm text-[var(--color-text-muted)]">
            Select every course you want access to.
          </p>
        </div>

        {/* Course sections */}
        <div className="grid gap-6 md:grid-cols-2">
          {subscriptionData.map((section) => (
            <section
              key={section.title}
              className="rounded-[14px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)]"
            >
              <h2
                className="mb-5 text-2xl font-semibold text-[var(--color-text)]"
                style={{ fontFamily: "Source Serif 4, serif" }}
              >
                {section.title}
              </h2>

              <div className="space-y-2">
                {section.items.map((course) => {
                  const selected = selectedCourses.includes(course);

                  return (
                    <label
                      key={course}
                      className={`flex cursor-pointer items-center justify-between rounded-[8px] border px-4 py-3 transition-colors duration-150 ${
                        selected
                          ? "border-[var(--color-brand)] bg-[var(--color-paper-50)]"
                          : "border-[var(--color-border)] hover:bg-[var(--color-paper-50)]"
                      }`}
                    >
                      <span className="text-sm font-medium text-[var(--color-text)]">
                        {course}
                      </span>

                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-[4px] border transition-colors duration-150 ${
                          selected
                            ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-white"
                            : "border-[var(--color-border-strong)] bg-[var(--color-surface)]"
                        }`}
                      >
                        {selected && (
                          <Check
                            size={14}
                            strokeWidth={2.5}
                          />
                        )}

                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => toggleCourse(course)}
                          className="sr-only"
                        />
                      </span>
                    </label>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Save */}
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={saveSubscription}
            className="flex items-center gap-2 rounded-[8px] bg-[var(--color-brand)] px-8 py-3.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[var(--color-brand-dark)]"
          >
            Save subscription
            <ArrowRight size={18} strokeWidth={2} />
          </button>
        </div>

      </div>
    </main>
  );
}

