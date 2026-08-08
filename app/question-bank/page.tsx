"use client";

import { useMemo, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { courses } from "@/lib/courseData";
import { getQuestions } from "@/lib/loader";
import {
  BookOpen,
  ChevronLeft,
  Search,
  Plus,
} from "lucide-react";

export default function QuestionBankPage() {
  const [course, setCourse] = useState("cbse");
  const [className, setClassName] = useState("");
  const [subject, setSubject] = useState("");
  const [search, setSearch] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");

  const questions = getQuestions() as any[];

  const classes = useMemo(() => {
    return courses.find((c) => c.id === course)?.classes || [];
  }, [course]);

  const subjects = useMemo(() => {
    const selectedClass = classes.find(
      (c) => c.name === className
    );

    return selectedClass?.subjects || [];
  }, [classes, className]);

  const chapters = useMemo(() => {
    const chapterSet = new Set<string>();

    questions
      .filter((q) => {
        const questionClass = String(q.class ?? "");

        const selectedClassNumber =
          className.replace(/\D/g, "");

        return (
          questionClass === selectedClassNumber &&
          q.subject === subject
        );
      })
      .forEach((q) => {
        const chapter = q.chapter?.title;

        if (chapter) {
          chapterSet.add(chapter);
        }
      });

    return Array.from(chapterSet);
  }, [questions, className, subject]);

  const filteredChapters = chapters.filter((chapter) =>
    chapter.toLowerCase().includes(search.toLowerCase())
  );

  const chapterQuestions = useMemo(() => {
    if (!selectedChapter) return [];

    return questions.filter((q) => {
      const questionClass = String(q.class ?? "");

      const selectedClassNumber =
        className.replace(/\D/g, "");

      return (
        questionClass === selectedClassNumber &&
        q.subject === subject &&
        q.chapter?.title === selectedChapter
      );
    });
  }, [
    questions,
    className,
    subject,
    selectedChapter,
  ]);

  const handleBoardChange = (value: string) => {
    setCourse(value);
    setClassName("");
    setSubject("");
    setSelectedChapter("");
  };

  const handleClassChange = (value: string) => {
    setClassName(value);
    setSubject("");
    setSelectedChapter("");
  };

  const handleSubjectChange = (value: string) => {
    setSubject(value);
    setSelectedChapter("");
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl">

        {/* Header */}
        <div className="mb-7">
          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[var(--color-brand)] text-white">
              <BookOpen size={20} />
            </div>

            <div>
              <h1
                className="text-3xl font-semibold text-[var(--color-text)]"
                style={{
                  fontFamily: "Source Serif 4, serif",
                }}
              >
                Question Bank
              </h1>

              <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                Browse questions by board, class and subject.
              </p>
            </div>

          </div>
        </div>

        {/* Filters */}
        <div className="rounded-[14px] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-card)]">

          <div className="grid gap-4 md:grid-cols-3">

            {/* Board */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Board
              </label>

              <select
                value={course}
                onChange={(e) =>
                  handleBoardChange(e.target.value)
                }
                className="w-full rounded-[8px] border border-[var(--color-border-strong)] bg-[var(--color-paper-0)] px-3 py-2.5 text-sm outline-none focus:border-[var(--color-brand)]"
              >
                {courses.map((c) => (
                  <option
                    key={c.id}
                    value={c.id}
                  >
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Class */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Class
              </label>

              <select
                value={className}
                onChange={(e) =>
                  handleClassChange(e.target.value)
                }
                className="w-full rounded-[8px] border border-[var(--color-border-strong)] bg-[var(--color-paper-0)] px-3 py-2.5 text-sm outline-none focus:border-[var(--color-brand)]"
              >
                <option value="">
                  Select Class
                </option>

                {classes.map((c) => (
                  <option
                    key={c.name}
                    value={c.name}
                  >
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Subject
              </label>

              <select
                value={subject}
                onChange={(e) =>
                  handleSubjectChange(e.target.value)
                }
                className="w-full rounded-[8px] border border-[var(--color-border-strong)] bg-[var(--color-paper-0)] px-3 py-2.5 text-sm outline-none focus:border-[var(--color-brand)]"
              >
                <option value="">
                  Select Subject
                </option>

                {subjects.map((s) => (
                  <option
                    key={s}
                    value={s}
                  >
                    {s}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Search */}
          {subject && !selectedChapter && (
            <div className="mt-4 relative">

              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
              />

              <input
                type="text"
                placeholder="Search chapters..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full rounded-[8px] border border-[var(--color-border)] bg-[var(--color-paper-0)] py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[var(--color-brand)]"
              />

            </div>
          )}

        </div>

        {/* Chapter View */}
        {!selectedChapter ? (

          <div className="mt-7">

            {!subject ? (

              <div className="rounded-[14px] border border-dashed border-[var(--color-border-strong)] bg-[var(--color-surface-muted)] px-6 py-12 text-center">

                <BookOpen
                  size={30}
                  className="mx-auto mb-3 text-[var(--color-text-muted)]"
                />

                <h2
                  className="text-xl font-semibold"
                  style={{
                    fontFamily:
                      "Source Serif 4, serif",
                  }}
                >
                  Select a subject
                </h2>

                <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                  Choose a subject to view its chapters.
                </p>

              </div>

            ) : (

              <>
                <div className="mb-4">

                  <h2
                    className="text-xl font-semibold"
                    style={{
                      fontFamily:
                        "Source Serif 4, serif",
                    }}
                  >
                    Chapters
                  </h2>

                  <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                    {filteredChapters.length} chapters available
                  </p>

                </div>

                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">

                  {filteredChapters.map(
                    (chapter, index) => (

                      <button
                        key={chapter}
                        type="button"
                        onClick={() =>
                          setSelectedChapter(chapter)
                        }
                        className="group flex items-center justify-between rounded-[14px] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 text-left shadow-[var(--shadow-card)] transition-colors hover:border-[var(--color-brand-soft)] hover:bg-[var(--color-paper-0)]"
                      >

                        <div className="flex items-center gap-4">

                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-[var(--color-paper-100)] text-sm font-semibold text-[var(--color-brand)]">
                            {index + 1}
                          </div>

                          <div>

                            <h3 className="font-medium">
                              {chapter}
                            </h3>

                            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                              View questions
                            </p>

                          </div>

                        </div>

                        <Plus
                          size={18}
                          className="text-[var(--color-text-muted)] group-hover:text-[var(--color-brand)]"
                        />

                      </button>

                    )
                  )}

                </div>
              </>

            )}

          </div>

        ) : (

          /* Questions */
          <div className="mt-7">

            <button
              onClick={() =>
                setSelectedChapter("")
              }
              className="mb-5 flex items-center gap-2 text-sm font-medium text-[var(--color-brand)] hover:underline"
            >
              <ChevronLeft size={17} />
              Back to chapters
            </button>

            <div className="mb-5">

              <h2
                className="text-2xl font-semibold"
                style={{
                  fontFamily:
                    "Source Serif 4, serif",
                }}
              >
                {selectedChapter}
              </h2>

              <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                {chapterQuestions.length} questions
              </p>

            </div>

            <div className="space-y-4">

              {chapterQuestions.map(
                (question, index) => (

                  <div
                    key={question.id}
                    className="rounded-[14px] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-card)]"
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div className="flex gap-4">

                        <div className="font-semibold text-[var(--color-brand)]">
                          Q{index + 1}
                        </div>

                        <div>

                          <p className="leading-relaxed text-[var(--color-text)]">
                            {question.stem}
                          </p>

                          {question.options && (
                            <div className="mt-4 grid gap-2 md:grid-cols-2">

                              {question.options.map(
                                (
                                  option: any,
                                  optionIndex: number
                                ) => (

                                  <div
                                    key={optionIndex}
                                    className="rounded-[8px] border border-[var(--color-border)] bg-[var(--color-paper-50)] px-3 py-2 text-sm"
                                  >
                                    {typeof option ===
                                    "string"
                                      ? option
                                      : option.text}
                                  </div>

                                )
                              )}

                            </div>
                          )}

                        </div>

                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const existing = JSON.parse(
                            localStorage.getItem("questionBankSelection") || "[]"
                          );

                          const alreadyAdded = existing.some(
                            (q: any) => q.id === question.id
                          );

                          if (!alreadyAdded) {
                            existing.push(question);

                            localStorage.setItem(
                              "questionBankSelection",
                              JSON.stringify(existing)
                            );
                          }

                          alert(
                            "Question selected. We will connect this to the paper builder next."
                          );
                          window.location.href = "/builders";
                        }}
                        className="flex shrink-0 items-center gap-2 rounded-[8px] bg-[var(--color-brand)] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-brand-dark)]"
                      >
                        <Plus size={16} />
                        Add
                      </button>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        )}

      </div>
    </DashboardLayout>
  );
}