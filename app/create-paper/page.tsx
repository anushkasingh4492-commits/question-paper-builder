
"use client";

import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import { getQuestions } from "@/lib/loader";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  FileText,
  Shuffle,
} from "lucide-react";

export default function CreatePaper() {
  const router = useRouter();
  const questions = getQuestions();

  // --------------------------------------------------
  // State
  // --------------------------------------------------

  const [board, setBoard] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [subject, setSubject] = useState("");

  const [paperType, setPaperType] = useState("Class Test");
  const [examGroup, setExamGroup] = useState("Internal");
  const [testName, setTestName] = useState("");
  const [questionType, setQuestionType] = useState("all");

  const [mode, setMode] = useState<"manual" | "auto">("manual");
  const [count, setCount] = useState(10);

  const [selectedChapters, setSelectedChapters] = useState<string[]>(
    []
  );

  const [showChapters, setShowChapters] = useState(false);

  // --------------------------------------------------
  // Load saved values
  // --------------------------------------------------

  useEffect(() => {
    const savedBoard = localStorage.getItem("board");
    const savedClass = localStorage.getItem("class");
    const savedSubject = localStorage.getItem("subject");
    const savedQuestionType =
      localStorage.getItem("questionType");

    if (savedBoard) setBoard(savedBoard);
    if (savedClass) setStudentClass(savedClass);
    if (savedSubject) setSubject(savedSubject);
    if (savedQuestionType) setQuestionType(savedQuestionType);

    const savedMode = localStorage.getItem("mode");

    if (savedMode === "manual" || savedMode === "auto") {
      setMode(savedMode);
    }

    const savedCount = localStorage.getItem("count");

    if (savedCount) {
      const value = Number(savedCount);

      if (!Number.isNaN(value)) {
        setCount(value);
      }
    }
  }, []);

  // --------------------------------------------------
  // Dropdown data
  // --------------------------------------------------

  const boards = useMemo(() => {
    return [
      ...new Set(
        questions.map((q: any) => q.curriculum)
      ),
    ];
  }, [questions]);

  const classes = Array.from(
    new Set(
      questions
        .map((q: any) => q.class)
        .filter(
          (c) =>
            c !== undefined &&
            c !== null &&
            c !== ""
        )
    )
  );

  const subjects = useMemo(() => {
    return [
      ...new Set(
        questions
          .filter(
            (q: any) =>
              (!board || q.curriculum === board) &&
              (!studentClass ||
                q.class === Number(studentClass))
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
              (!board ||
                q.curriculum === board) &&
              (!studentClass ||
                q.class === Number(studentClass)) &&
              (!subject ||
                q.subject === subject)
          )
          .map((q: any) => q.chapter.title)
      ),
    ];
  }, [
    questions,
    board,
    studentClass,
    subject,
  ]);

  // --------------------------------------------------
  // Chapter selection
  // --------------------------------------------------

  const toggleChapter = (chapter: string) => {
    setSelectedChapters((prev) =>
      prev.includes(chapter)
        ? prev.filter((c) => c !== chapter)
        : [...prev, chapter]
    );
  };

  // --------------------------------------------------
  // Question generation
  // --------------------------------------------------

  function shuffle<T>(arr: T[]) {
    const copy = [...arr];

    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [copy[i], copy[j]] = [
        copy[j],
        copy[i],
      ];
    }

    return copy;
  }

  function getFilteredQuestions() {
    return questions.filter((q: any) => {
      if (board && q.curriculum !== board) {
        return false;
      }

      if (
        studentClass &&
        q.class !== Number(studentClass)
      ) {
        return false;
      }

      if (subject && q.subject !== subject) {
        return false;
      }

      if (
        selectedChapters.length > 0 &&
        !selectedChapters.includes(
          q.chapter.title
        )
      ) {
        return false;
      }

      if (questionType === "pyq") {
        return (
          q.source_type === "PYQ" ||
          q.question_type === "PYQ" ||
          q.type === "PYQ"
        );
      }

      return true;
    });
  }

  // --------------------------------------------------
  // Save & proceed
  // --------------------------------------------------

  const handleProceed = () => {
    localStorage.setItem(
      "selectedChapters",
      JSON.stringify(selectedChapters)
    );

    localStorage.setItem("board", board);
    localStorage.setItem("class", studentClass);
    localStorage.setItem("subject", subject);
    localStorage.setItem("paperType", paperType);
    localStorage.setItem("questionType", questionType);
    localStorage.setItem("mode", mode);
    localStorage.setItem("count", String(count));

    if (mode === "auto") {
      const filtered = getFilteredQuestions();

      if (filtered.length === 0) {
        alert(
          "No questions match the selected filters. Please adjust your board, class, subject, or chapter selections."
        );

        return;
      }

      const generated = shuffle(filtered).slice(
        0,
        count
      );

      localStorage.setItem(
        "generatedQuestions",
        JSON.stringify(generated)
      );
    } else {
      localStorage.removeItem(
        "generatedQuestions"
      );
    }

    router.push("/builders");
  };

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-7xl">

        {/* ------------------------------------------
            Header
        ------------------------------------------- */}

        <div className="mb-8">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] bg-[var(--color-brand)] text-white">
              <FileText size={21} />
            </div>

            <div>
              <p className="mb-1 text-sm font-medium text-[var(--color-brand)]">
                Assessment creation
              </p>

              <h1
                className="text-4xl font-semibold text-[var(--color-text)]"
                style={{
                  fontFamily:
                    "Source Serif 4, serif",
                }}
              >
                Create paper
              </h1>

              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                Set the paper details and choose
                the questions you want to use.
              </p>
            </div>
          </div>
        </div>

        {/* ------------------------------------------
            Main card
        ------------------------------------------- */}

        <div className="rounded-[14px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)] lg:p-8">

          {/* ----------------------------------------
              Step indicator
          ----------------------------------------- */}

          <div className="mb-8 flex items-center gap-3 border-b border-[var(--color-border)] pb-6">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-brand)] text-xs font-semibold text-white">
                1
              </span>

              <span className="text-sm font-semibold text-[var(--color-text)]">
                Details
              </span>
            </div>

            <ArrowRight
              size={16}
              className="text-[var(--color-text-muted)]"
            />

            <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--color-border)] text-xs font-semibold">
                2
              </span>

              <span className="text-sm">
                Questions
              </span>
            </div>

            <ArrowRight
              size={16}
              className="text-[var(--color-text-muted)]"
            />

            <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--color-border)] text-xs font-semibold">
                3
              </span>

              <span className="text-sm">
                Preview
              </span>
            </div>
          </div>

          {/* ----------------------------------------
              Generation mode
          ----------------------------------------- */}

          <section className="mb-8">
            <div className="mb-4">
              <h2
                className="text-xl font-semibold text-[var(--color-text)]"
                style={{
                  fontFamily:
                    "Source Serif 4, serif",
                }}
              >
                Question selection
              </h2>

              <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                Choose how questions should be
                added to the paper.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">

              <button
                type="button"
                onClick={() => setMode("manual")}
                className={`rounded-[8px] border p-4 text-left transition-colors duration-150 ${
                  mode === "manual"
                    ? "border-[var(--color-brand)] bg-[var(--color-paper-50)]"
                    : "border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-paper-50)]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[var(--color-text)]">
                      Cherry pick
                    </p>

                    <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                      Choose questions manually
                      in the builder.
                    </p>
                  </div>

                  {mode === "manual" && (
                    <Check
                      size={19}
                      className="text-[var(--color-brand)]"
                    />
                  )}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setMode("auto")}
                className={`rounded-[8px] border p-4 text-left transition-colors duration-150 ${
                  mode === "auto"
                    ? "border-[var(--color-brand)] bg-[var(--color-paper-50)]"
                    : "border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-paper-50)]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[var(--color-text)]">
                      Auto generate
                    </p>

                    <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                      Automatically select questions
                      from your filters.
                    </p>
                  </div>

                  {mode === "auto" && (
                    <Shuffle
                      size={19}
                      className="text-[var(--color-brand)]"
                    />
                  )}
                </div>
              </button>

            </div>
          </section>

          {/* ----------------------------------------
              Question count
          ----------------------------------------- */}

          <section className="mb-8">
            <label
              htmlFor="question-count"
              className="mb-2 block text-sm font-semibold text-[var(--color-text)]"
            >
              Number of questions
            </label>

            <input
              id="question-count"
              type="number"
              min={1}
              max={100}
              value={count}
              onChange={(e) =>
                setCount(Number(e.target.value))
              }
              className="w-32 rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 text-sm text-[var(--color-text)] outline-none transition-colors duration-150 focus:border-[var(--color-brand)]"
            />
          </section>

          {/* ----------------------------------------
              Paper details
          ----------------------------------------- */}

          <section className="border-t border-[var(--color-border)] pt-8">

            <div className="mb-5">
              <h2
                className="text-xl font-semibold text-[var(--color-text)]"
                style={{
                  fontFamily:
                    "Source Serif 4, serif",
                }}
              >
                Paper details
              </h2>

              <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                Define the academic context for
                this paper.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">

              {/* Board */}
              <div>
                <label
                  htmlFor="board"
                  className="mb-2 block text-sm font-medium text-[var(--color-text)]"
                >
                  Board
                </label>

                <div className="relative">
                  <select
                    id="board"
                    value={board}
                    onChange={(e) => {
                      setShowChapters(false);
                      setBoard(e.target.value);
                    }}
                    className="w-full appearance-none rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 pr-10 text-sm text-[var(--color-text)] outline-none transition-colors duration-150 focus:border-[var(--color-brand)]"
                  >
                    <option value="">
                      Select board
                    </option>

                    {boards.map(
                      (b: any, index: number) => (
                        <option
                          key={`${b}-${index}`}
                          value={b}
                        >
                          {b}
                        </option>
                      )
                    )}
                  </select>

                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                  />
                </div>
              </div>

              {/* Class */}
              <div>
                <label
                  htmlFor="class"
                  className="mb-2 block text-sm font-medium text-[var(--color-text)]"
                >
                  Class
                </label>

                <div className="relative">
                  <select
                    id="class"
                    value={studentClass}
                    onChange={(e) => {
                      setShowChapters(false);
                      setStudentClass(e.target.value);
                    }}
                    className="w-full appearance-none rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 pr-10 text-sm text-[var(--color-text)] outline-none transition-colors duration-150 focus:border-[var(--color-brand)]"
                  >
                    <option value="">
                      Select class
                    </option>

                    {[...new Set(classes)].map(
                      (c: any) => (
                        <option
                          key={c}
                          value={c}
                        >
                          {c}
                        </option>
                      )
                    )}
                  </select>

                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-[var(--color-text)]"
                >
                  Subject
                </label>

                <div className="relative">
                  <select
                    id="subject"
                    value={subject}
                    onChange={(e) => {
                      setShowChapters(false);
                      setSubject(e.target.value);
                    }}
                    className="w-full appearance-none rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 pr-10 text-sm text-[var(--color-text)] outline-none transition-colors duration-150 focus:border-[var(--color-brand)]"
                  >
                    <option value="">
                      Select subject
                    </option>

                    {[...new Set(subjects)].map(
                      (s: any) => (
                        <option
                          key={s}
                          value={s}
                        >
                          {s}
                        </option>
                      )
                    )}
                  </select>

                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                  />
                </div>
              </div>

              {/* Paper type */}
              <div>
                <label
                  htmlFor="paper-type"
                  className="mb-2 block text-sm font-medium text-[var(--color-text)]"
                >
                  Paper type
                </label>

                <div className="relative">
                  <select
                    id="paper-type"
                    value={paperType}
                    onChange={(e) =>
                      setPaperType(e.target.value)
                    }
                    className="w-full appearance-none rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 pr-10 text-sm text-[var(--color-text)] outline-none transition-colors duration-150 focus:border-[var(--color-brand)]"
                  >
                    <option>Class Test</option>
                    <option>Unit Test</option>
                    <option>Half Yearly</option>
                    <option>Final Exam</option>
                  </select>

                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                  />
                </div>
              </div>

              {/* Exam group */}
              <div>
                <label
                  htmlFor="exam-group"
                  className="mb-2 block text-sm font-medium text-[var(--color-text)]"
                >
                  Exam group
                </label>

                <div className="relative">
                  <select
                    id="exam-group"
                    value={examGroup}
                    onChange={(e) =>
                      setExamGroup(e.target.value)
                    }
                    className="w-full appearance-none rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 pr-10 text-sm text-[var(--color-text)] outline-none transition-colors duration-150 focus:border-[var(--color-brand)]"
                  >
                    <option value="Assignment">
                      Assignment
                    </option>

                    <option value="Test">
                      Test
                    </option>
                  </select>

                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                  />
                </div>
              </div>

              {/* Question type */}
              <div>
                <label
                  htmlFor="question-type"
                  className="mb-2 block text-sm font-medium text-[var(--color-text)]"
                >
                  Question type
                </label>

                <div className="relative">
                  <select
                    id="question-type"
                    value={questionType}
                    onChange={(e) =>
                      setQuestionType(e.target.value)
                    }
                    className="w-full appearance-none rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 pr-10 text-sm text-[var(--color-text)] outline-none transition-colors duration-150 focus:border-[var(--color-brand)]"
                  >
                    <option value="all">
                      All questions
                    </option>

                    <option value="pyq">
                      Previous Year Questions
                    </option>
                  </select>

                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                  />
                </div>
              </div>

            </div>

            {/* Test name */}
            <div className="mt-6">
              <label
                htmlFor="test-name"
                className="mb-2 block text-sm font-medium text-[var(--color-text)]"
              >
                Test name
              </label>

              <input
                id="test-name"
                type="text"
                placeholder="Enter test name"
                value={testName}
                onChange={(e) =>
                  setTestName(e.target.value)
                }
                className="w-full rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 text-sm text-[var(--color-text)] outline-none transition-colors duration-150 placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-brand)]"
              />
            </div>
          </section>

          {/* ----------------------------------------
              Chapters
          ----------------------------------------- */}

          <section className="mt-8 border-t border-[var(--color-border)] pt-8">

            <div className="mb-4">
              <h2
                className="text-xl font-semibold text-[var(--color-text)]"
                style={{
                  fontFamily:
                    "Source Serif 4, serif",
                }}
              >
                Available chapters
              </h2>

              <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                Select one or more chapters for
                this paper.
              </p>
            </div>

            {!showChapters ? (
              <button
                type="button"
                onClick={() => setShowChapters(true)}
                className="rounded-[8px] bg-[var(--color-brand)] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[var(--color-brand-dark)]"
              >
                Show chapters
              </button>
            ) : (
              <>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {[...new Set(chapters)].map(
                    (chapter: any) => {
                      const selected =
                        selectedChapters.includes(
                          chapter
                        );

                      return (
                        <button
                          type="button"
                          key={chapter}
                          onClick={() =>
                            toggleChapter(chapter)
                          }
                          className={`rounded-[8px] border p-3 text-left text-sm transition-colors duration-150 ${
                            selected
                              ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-white"
                              : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-brand)] hover:bg-[var(--color-paper-50)]"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span>
                              {chapter}
                            </span>

                            {selected && (
                              <Check
                                size={16}
                                className="shrink-0"
                              />
                            )}
                          </div>
                        </button>
                      );
                    }
                  )}
                </div>

                <p className="mt-4 text-sm text-[var(--color-text-muted)]">
                  Selected chapters:{" "}
                  <span className="font-semibold text-[var(--color-text)]">
                    {selectedChapters.length}
                  </span>
                </p>
              </>
            )}
          </section>

          {/* ----------------------------------------
              Footer action
          ----------------------------------------- */}

          <div className="mt-8 flex flex-col gap-4 border-t border-[var(--color-border)] pt-6 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-sm text-[var(--color-text-muted)]">
              Your selections will be saved before
              opening the question builder.
            </p>

            <button
              type="button"
              onClick={handleProceed}
              className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-[var(--color-brand)] px-7 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[var(--color-brand-dark)]"
            >
              Save & proceed
              <ArrowRight size={17} />
            </button>

          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
