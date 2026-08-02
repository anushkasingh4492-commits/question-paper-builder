"use client";

import { useMemo, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { courses } from "@/lib/courseData";
import { questionBankData } from "@/lib/questionBankData";

export default function QuestionBankPage() {
  const [course, setCourse] = useState("cbse");
const [className, setClassName] = useState("");
  const [subject, setSubject] = useState("");

  const classes = useMemo(() => {
    return courses.find((c) => c.id === course)?.classes || [];
  }, [course]);

const subjects = useMemo(() => {
  const selectedClass = classes.find(
    (c) => c.name === className
  );

  return selectedClass?.subjects || [];
}, [classes, className]);
 const data: any = questionBankData;

const chapters: string[] =
  data?.[course]?.[className]?.[subject] ?? [];

  return (
    <DashboardLayout>
      <div className="space-y-6">

        <h1 className="text-3xl font-bold">
          Question Bank
        </h1>

        <div className="grid md:grid-cols-3 gap-4">

          <select
            className="border rounded p-3"
            value={course}
            onChange={(e) => {
              setCourse(e.target.value);
              setSubject("");
            }}
          >
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            className="border rounded p-3"
            value={className}
            onChange={(e) => {
              setClassName(e.target.value);
              setSubject("");
            }}
          >
            {classes.map((c) => (
  <option key={c.name} value={c.name}>
    {c.name}
  </option>
))}
          </select>

          <select
            className="border rounded p-3"
            value={subject}
            onChange={(e) =>
              setSubject(e.target.value)
            }
          >
            <option value="">
              Select Subject
            </option>

            {subjects.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

          {chapters.map((chapter) => (
            <div
              key={chapter}
              className="border rounded-xl p-5 shadow-sm"
            >
              <h2 className="font-semibold text-lg">
                {chapter}
              </h2>
            </div>
          ))}

        </div>

      </div>
    </DashboardLayout>
  );
}