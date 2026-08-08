"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  FileText,
  BookOpen,
  FileClock,
  ArrowRight,
  Plus,
  ChevronRight,
} from "lucide-react";

import DashboardLayout from "@/components/DashboardLayout";

type SavedPaper = {
  id?: string;
  title?: string;
  className?: string;
  totalMarks?: number;
  createdAt?: string;
  questions?: unknown[];
};

type Draft = {
  id?: string;
  name?: string;
  className?: string;
  subject?: string;
  totalMarks?: number;
  paperQuestions?: unknown[];
};

export default function Dashboard() {
  const [username, setUsername] = useState("Anushka");
  const [papers, setPapers] = useState<SavedPaper[]>([]);
  const [drafts, setDrafts] = useState<Draft[]>([]);

  useEffect(() => {
    // Username
    const savedUsername = localStorage.getItem("username");

    if (savedUsername) {
      setUsername(savedUsername);
    }

    // Saved papers
    try {
      const savedPapers = JSON.parse(
        localStorage.getItem("savedPapers") || "[]"
      );

      if (Array.isArray(savedPapers)) {
        setPapers(savedPapers);
      }
    } catch {
      setPapers([]);
    }

    // Drafts
    try {
      const savedDrafts = JSON.parse(
        localStorage.getItem("paperDrafts") || "[]"
      );

      if (Array.isArray(savedDrafts)) {
        setDrafts(savedDrafts);
      }
    } catch {
      setDrafts([]);
    }
  }, []);

  /*
   * Papers created this month
   */
  const papersThisMonth = useMemo(() => {
    const now = new Date();

    return papers.filter((paper) => {
      if (!paper.createdAt) return false;

      const date = new Date(paper.createdAt);

      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    }).length;
  }, [papers]);

  /*
   * Count actual questions from saved papers.
   *
   * We count every question contained in the user's
   * saved papers. Nothing is mocked.
   */
  const questionsAdded = useMemo(() => {
    return papers.reduce((total, paper) => {
      return total + (Array.isArray(paper.questions)
        ? paper.questions.length
        : 0);
    }, 0);
  }, [papers]);

  /*
   * Most recent papers first.
   */
  const recentPapers = useMemo(() => {
    return [...papers]
      .sort((a, b) => {
        const dateA = a.createdAt
          ? new Date(a.createdAt).getTime()
          : 0;

        const dateB = b.createdAt
          ? new Date(b.createdAt).getTime()
          : 0;

        return dateB - dateA;
      })
      .slice(0, 5);
  }, [papers]);

  /*
   * Open a saved paper using the same mechanism
   * already used by the existing Papers page.
   */
  const openPaper = (paper: SavedPaper) => {
    localStorage.setItem("paperData", JSON.stringify(paper));
    window.location.href = "/builders/preview";
  };

  /*
   * Open the most recent draft.
   *
   * Your builder already understands paperDrafts.
   * We simply store the selected draft and return
   * to the builder.
   */
  const resumeDraft = (draft: Draft) => {
    localStorage.setItem("resumeDraft", JSON.stringify(draft));
    window.location.href = "/builders";
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-[var(--color-paper-50)]">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
          <div>
            <p className="text-sm font-medium text-[var(--color-text-muted)] mb-2">
              Test Generator
            </p>

            <h1
              className="text-4xl font-semibold text-[var(--color-text)]"
              style={{
                fontFamily: "Source Serif 4, serif",
              }}
            >
              Good morning, {username}
            </h1>

            <p className="mt-2 text-[var(--color-text-muted)]">
              Create and manage your assessment papers.
            </p>
          </div>

          <Link
            href="/create-paper"
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              h-11
              px-5
              rounded-[8px]
              bg-[var(--color-brand)]
              text-white
              text-sm
              font-medium
              hover:brightness-95
              transition
            "
          >
            <Plus size={18} />
            Create paper
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

          {/* Papers */}
          <div
            className="
              bg-[var(--color-surface)]
              border border-[var(--color-border)]
              rounded-[14px]
              p-6
              shadow-[var(--shadow-card)]
            "
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Papers this month
                </p>

                <p
                  className="mt-3 text-3xl font-semibold text-[var(--color-text)]"
                  style={{
                    fontFamily: "Source Serif 4, serif",
                  }}
                >
                  {papersThisMonth}
                </p>
              </div>

              <div className="w-10 h-10 rounded-[8px] bg-[var(--color-paper-100)] flex items-center justify-center text-[var(--color-brand)]">
                <FileText size={20} />
              </div>
            </div>
          </div>

          {/* Questions */}
          <div
            className="
              bg-[var(--color-surface)]
              border border-[var(--color-border)]
              rounded-[14px]
              p-6
              shadow-[var(--shadow-card)]
            "
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Questions added
                </p>

                <p
                  className="mt-3 text-3xl font-semibold text-[var(--color-text)]"
                  style={{
                    fontFamily: "Source Serif 4, serif",
                  }}
                >
                  {questionsAdded}
                </p>
              </div>

              <div className="w-10 h-10 rounded-[8px] bg-[var(--color-paper-100)] flex items-center justify-center text-[var(--color-brand)]">
                <BookOpen size={20} />
              </div>
            </div>
          </div>

          {/* Drafts */}
          <div
            className="
              bg-[var(--color-surface)]
              border border-[var(--color-border)]
              rounded-[14px]
              p-6
              shadow-[var(--shadow-card)]
            "
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Drafts
                </p>

                <p
                  className="mt-3 text-3xl font-semibold text-[var(--color-text)]"
                  style={{
                    fontFamily: "Source Serif 4, serif",
                  }}
                >
                  {drafts.length}
                </p>
              </div>

              <div className="w-10 h-10 rounded-[8px] bg-[var(--color-paper-100)] flex items-center justify-center text-[var(--color-brand)]">
                <FileClock size={20} />
              </div>
            </div>
          </div>

        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-6">

          {/* Recent papers */}
          <section
            className="
              bg-[var(--color-surface)]
              border border-[var(--color-border)]
              rounded-[14px]
              shadow-[var(--shadow-card)]
              overflow-hidden
            "
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-border)]">
              <div>
                <h2
                  className="text-2xl font-semibold text-[var(--color-text)]"
                  style={{
                    fontFamily: "Source Serif 4, serif",
                  }}
                >
                  Recent papers
                </h2>

                <p className="text-sm text-[var(--color-text-muted)] mt-1">
                  Your latest generated papers
                </p>
              </div>

              <Link
                href="/papers"
                className="
                  inline-flex
                  items-center
                  gap-1
                  text-sm
                  font-medium
                  text-[var(--color-brand)]
                  hover:underline
                "
              >
                View all
                <ArrowRight size={15} />
              </Link>
            </div>

            {recentPapers.length === 0 ? (
              <div className="px-6 py-16 text-center">
                <FileText
                  size={34}
                  className="mx-auto text-[var(--color-text-muted)]"
                />

                <h3
                  className="mt-4 text-xl font-semibold text-[var(--color-text)]"
                  style={{
                    fontFamily: "Source Serif 4, serif",
                  }}
                >
                  No papers yet
                </h3>

                <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                  Create your first paper to see it here.
                </p>

                <Link
                  href="/create-paper"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    mt-5
                    px-4
                    py-2.5
                    rounded-[8px]
                    bg-[var(--color-brand)]
                    text-white
                    text-sm
                    font-medium
                  "
                >
                  <Plus size={16} />
                  Create paper
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-[var(--color-border)]">
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                        Paper
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                        Standard
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                        Marks
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                        Status
                      </th>

                      <th className="px-6 py-4" />
                    </tr>
                  </thead>

                  <tbody>
                    {recentPapers.map((paper, index) => (
                      <tr
                        key={paper.id || `${paper.title}-${index}`}
                        className="
                          border-b
                          border-[var(--color-border)]
                          last:border-b-0
                          hover:bg-[var(--color-surface-muted)]
                          transition
                        "
                      >
                        <td className="px-6 py-5">
                          <button
                            onClick={() => openPaper(paper)}
                            className="text-left"
                          >
                            <p className="font-medium text-[var(--color-text)] hover:text-[var(--color-brand)]">
                              {paper.title || "Untitled paper"}
                            </p>

                            <p className="text-xs text-[var(--color-text-muted)] mt-1">
                              {paper.questions?.length || 0} questions
                            </p>
                          </button>
                        </td>

                        <td className="px-6 py-5 text-sm text-[var(--color-text-muted)]">
                          {paper.className || "—"}
                        </td>

                        <td className="px-6 py-5 text-sm text-[var(--color-text-muted)]">
                          {paper.totalMarks ?? "—"}
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className="
                              inline-flex
                              items-center
                              px-2.5
                              py-1
                              rounded-full
                              bg-[var(--color-paper-100)]
                              text-[var(--color-brand)]
                              text-xs
                              font-medium
                            "
                          >
                            Saved
                          </span>
                        </td>

                        <td className="px-6 py-5 text-right">
                          <button
                            onClick={() => openPaper(paper)}
                            className="text-[var(--color-brand)] hover:underline"
                            aria-label="Open paper"
                          >
                            <ChevronRight size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* Right rail */}
          <aside className="space-y-6">

            {/* Continue draft */}
            <section
              className="
                bg-[var(--color-surface)]
                border border-[var(--color-border)]
                rounded-[14px]
                p-6
                shadow-[var(--shadow-card)]
              "
            >
              <div className="flex items-center gap-2">
                <FileClock
                  size={19}
                  className="text-[var(--color-brand)]"
                />

                <h2
                  className="text-xl font-semibold text-[var(--color-text)]"
                  style={{
                    fontFamily: "Source Serif 4, serif",
                  }}
                >
                  Continue draft
                </h2>
              </div>

              {drafts.length === 0 ? (
                <div className="mt-5">
                  <p className="text-sm text-[var(--color-text-muted)]">
                    You have no saved drafts.
                  </p>

                  <Link
                    href="/create-paper"
                    className="
                      inline-flex
                      items-center
                      gap-2
                      mt-4
                      text-sm
                      font-medium
                      text-[var(--color-brand)]
                    "
                  >
                    Start a paper
                    <ArrowRight size={15} />
                  </Link>
                </div>
              ) : (
                <>
                  {(() => {
                    const draft = drafts[drafts.length - 1];

                    return (
                      <div className="mt-5">
                        <p className="font-medium text-[var(--color-text)]">
                          {draft.name || "Untitled draft"}
                        </p>

                        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                          {draft.className || "Class not selected"}
                          {draft.subject
                            ? ` · ${draft.subject}`
                            : ""}
                        </p>

                        <button
                          onClick={() => resumeDraft(draft)}
                          className="
                            w-full
                            mt-5
                            h-10
                            rounded-[8px]
                            bg-[var(--color-brand)]
                            text-white
                            text-sm
                            font-medium
                            hover:brightness-95
                            transition
                          "
                        >
                          Resume
                        </button>
                      </div>
                    );
                  })()}
                </>
              )}
            </section>

            {/* Start something */}
            <section
              className="
                bg-[var(--color-surface)]
                border border-[var(--color-border)]
                rounded-[14px]
                p-6
                shadow-[var(--shadow-card)]
              "
            >
              <h2
                className="text-xl font-semibold text-[var(--color-text)]"
                style={{
                  fontFamily: "Source Serif 4, serif",
                }}
              >
                Start something
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                Start a new assessment paper using your existing question
                bank.
              </p>

              <Link
                href="/create-paper"
                className="
                  mt-5
                  flex
                  items-center
                  justify-between
                  w-full
                  px-4
                  py-3
                  rounded-[8px]
                  border
                  border-[var(--color-border)]
                  text-sm
                  font-medium
                  text-[var(--color-text)]
                  hover:bg-[var(--color-surface-muted)]
                  transition
                "
              >
                <span className="flex items-center gap-2">
                  <Plus size={17} />
                  New paper
                </span>

                <ArrowRight size={17} />
              </Link>
            </section>

          </aside>
        </div>
      </div>
    </DashboardLayout>
  );
}