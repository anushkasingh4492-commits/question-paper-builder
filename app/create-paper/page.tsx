"use client";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import { getQuestions } from "@/lib/loader";
import { useMemo, useState } from "react";

export default function CreatePaper() {
  const router = useRouter();
  const questions = getQuestions();

  // -----------------------------
  // States
  // -----------------------------

  const [board, setBoard] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [subject, setSubject] = useState("");

  const [paperType, setPaperType] = useState("Class Test");
  const [examGroup, setExamGroup] = useState("Internal");
  const [testName, setTestName] = useState("");

  // -----------------------------
  // Dropdown Data
  // -----------------------------

  const boards = useMemo(
    () => [...new Set(questions.map((q: any) => q.curriculum))],
    [questions]
  );

  const classes = useMemo(
    () => [...new Set(questions.map((q: any) => q.class))],
    [questions]
  );

  const subjects = useMemo(() => {
    return [
      ...new Set(
        questions
          .filter(
            (q: any) =>
              (!board || q.curriculum === board) &&
              (!studentClass || q.class == Number(studentClass))
          )
          .map((q: any) => q.subject)
      ),
    ];
  }, [questions, board, studentClass]);

  const chapters = useMemo(() => {
    return [
      ...new Set(
        questions
          .filter(
            (q: any) =>
              (!board || q.curriculum === board) &&
              (!studentClass || q.class == Number(studentClass)) &&
              (!subject || q.subject === subject)
          )
          .map((q: any) => q.chapter.title)
      ),
    ];
  }, [questions, board, studentClass, subject]);

  return (
    <DashboardLayout>
      <div className="bg-white rounded-xl shadow p-8">

        <h1 className="text-3xl font-bold">
          Create Paper
        </h1>

        <p className="text-gray-500 mb-8">
          Assessment Creation Tool
        </p>
</div>
        {/* ---------------- First Row ---------------- */}

        <div className="grid grid-cols-3 gap-6">

          <div>
            <label className="font-medium">Board</label>

            <select
              className="w-full border rounded-lg p-3 mt-2"
              value={board}
              onChange={(e) => setBoard(e.target.value)}
            >
              <option value="">Select Board</option>

              {boards.map((b: any) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-medium">Class</label>

            <select
              className="w-full border rounded-lg p-3 mt-2"
              value={studentClass}
              onChange={(e) => setStudentClass(e.target.value)}
            >
              <option value="">Select Class</option>

              {classes.map((c: any) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-medium">Subject</label>

            <select
              className="w-full border rounded-lg p-3 mt-2"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="">Select Subject</option>

              {subjects.map((s: any) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

        </div>

        {/* ---------------- Second Row ---------------- */}

        <div className="grid grid-cols-2 gap-6 mt-6">

          <div>
            <label className="font-medium">Paper Type</label>

            <select
              className="w-full border rounded-lg p-3 mt-2"
              value={paperType}
              onChange={(e) => setPaperType(e.target.value)}
            >
              <option>Class Test</option>
              <option>Unit Test</option>
              <option>Half Yearly</option>
              <option>Final Exam</option>
            </select>
          </div>

          <div>
            <label className="font-medium">Exam Group</label>

            <select
              className="w-full border rounded-lg p-3 mt-2"
              value={examGroup}
              onChange={(e) => setExamGroup(e.target.value)}
            >
              <option>Internal</option>
              <option>School</option>
              <option>Practice</option>
            </select>
          </div>

        </div>

        {/* ---------------- Third Row ---------------- */}

        <div className="mt-6">

          <label className="font-medium">Test Name</label>

          <input
            className="w-full border rounded-lg p-3 mt-2"
            placeholder="Enter Test Name"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
          />

        </div>

        <div className="mt-8">
          <h2 className="font-bold text-lg mb-3">
            Available Chapters
          </h2>

          <div className="grid grid-cols-3 gap-3">
            {chapters.map((chapter: any) => (
              <div
                key={chapter}
                className="border rounded-lg p-3 bg-gray-50 hover:bg-blue-50 cursor-pointer transition"
              >
                {chapter}
              </div>
            ))}

          </div>
            <div className="flex justify-end mt-8">
    <button
      onClick={() => router.push("/chapters")}
      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
    >
      Save & Proceed
    </button>
        </div>

      </div>
    </DashboardLayout>
  );
}