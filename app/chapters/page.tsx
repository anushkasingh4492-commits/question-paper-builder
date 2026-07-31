"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { getQuestions } from "@/lib/loader";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function ChaptersPage() {
  const router = useRouter();

  const questions = getQuestions();

  // Filters
  const [board, setBoard] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [subject, setSubject] = useState("");

  // Selected Chapters
  const [selectedChapters, setSelectedChapters] = useState<string[]>([]);

  // ---------------- Boards ----------------

  const boards = useMemo(
    () => [...new Set(questions.map((q: any) => q.curriculum))],
    [questions]
  );

  // ---------------- Classes ----------------

  const classes = useMemo(
    () => [...new Set(questions.map((q: any) => q.class))],
    [questions]
  );

  // ---------------- Subjects ----------------

  const subjects = useMemo(() => {
    return [
      ...new Set(
        questions
          .filter(
            (q: any) =>
              (!board || q.curriculum === board) &&
              (!studentClass || q.class === Number(studentClass))
          )
          .map((q: any) => q.subject)
      ),
    ];
  }, [questions, board, studentClass]);

  // ---------------- Chapters ----------------

  const chapters = useMemo(() => {
    return [
      ...new Set(
        questions
          .filter(
            (q: any) =>
              (!board || q.curriculum === board) &&
              (!studentClass || q.class === Number(studentClass)) &&
              (!subject || q.subject === subject)
          )
          .map((q: any) => q.chapter.title)
      ),
    ];
  }, [questions, board, studentClass, subject]);

  // ---------------- Select Chapter ----------------

  function toggleChapter(chapter: string) {
    if (selectedChapters.includes(chapter)) {
      setSelectedChapters(
        selectedChapters.filter((c) => c !== chapter)
      );
    } else {
      setSelectedChapters([...selectedChapters, chapter]);
    }
  }

  return (
    <DashboardLayout>
      <div className="bg-white rounded-xl shadow p-8">

        <h1 className="text-3xl font-bold">
          Select Chapters
        </h1>

        <p className="text-gray-500 mb-8">
          Choose chapters for the paper
        </p>

        {/* Filters */}

        <div className="grid grid-cols-3 gap-5">

          {/* Board */}

          <select
            value={board}
            onChange={(e) => setBoard(e.target.value)}
            className="border rounded-lg p-3"
          >
            <option value="">Board</option>

            {boards.map((b: any) => (
              <option key={b}>{b}</option>
            ))}
          </select>

          {/* Class */}

          <select
            value={studentClass}
            onChange={(e) => setStudentClass(e.target.value)}
            className="border rounded-lg p-3"
          >
            <option value="">Class</option>

            {classes.map((c: any) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          {/* Subject */}

          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="border rounded-lg p-3"
          >
            <option value="">Subject</option>

            {subjects.map((s: any) => (
              <option key={s}>{s}</option>
            ))}
          </select>

        </div>

        {/* Chapters */}

        <div className="mt-8">

          <h2 className="font-semibold text-xl mb-4">
            Available Chapters
          </h2>

          <div className="grid md:grid-cols-3 gap-4">

            {chapters.map((chapter: any) => {

              const active =
                selectedChapters.includes(chapter);

              return (

                <div
                  key={chapter}
                  onClick={() => toggleChapter(chapter)}
                  className={`cursor-pointer rounded-xl border p-4 transition

                  ${
                    active
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white hover:bg-blue-50"
                  }`}
                >
                  {chapter}
                </div>

              );
            })}

          </div>

        </div>

        {/* Bottom */}

        <div className="flex justify-between mt-10">

          <div className="font-medium">
            Selected : {selectedChapters.length}
          </div>

          <button
            onClick={() => router.push("/builders")}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
          >
            Continue →
          </button>

        </div>

      </div>
    </DashboardLayout>
  );
}