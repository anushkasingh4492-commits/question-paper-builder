"use client";

import { useEffect, useState } from "react";

export default function PapersPage() {
  const [papers, setPapers] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem("savedPapers") || "[]"
    );

    setPapers(data);
  }, []);

  function openPaper(paper: any) {
    localStorage.setItem(
      "paperData",
      JSON.stringify(paper)
    );

    window.location.href = "/builders/preview";
  }

  function deletePaper(id: number) {
    const updated = papers.filter((p) => p.id !== id);

    setPapers(updated);

    localStorage.setItem(
      "savedPapers",
      JSON.stringify(updated)
    );
  }

  function duplicatePaper(paper: any) {
    const copy = {
      ...paper,
      id: Date.now(),
      title: paper.title + " (Copy)",
      createdAt: new Date().toLocaleString(),
    };

    const updated = [copy, ...papers];

    setPapers(updated);

    localStorage.setItem(
      "savedPapers",
      JSON.stringify(updated)
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-8">
        My Papers
      </h1>

      {papers.length === 0 && (
        <p>No papers created yet.</p>
      )}

      {papers.map((paper) => (
        <div
          key={paper.id}
          className="border rounded-xl p-5 mb-5 shadow-sm"
        >
          <h2 className="text-xl font-semibold">
            {paper.title}
          </h2>

          <p className="var(--color-text-muted)500 mt-1">
            {paper.questions.length} Questions
          </p>

          <p className="var(--color-text-muted)500">
            {paper.createdAt}
          </p>

          <div className="flex gap-3 mt-4">

            <button
              onClick={() => openPaper(paper)}
              className="bg-[#7a233b]600 text-white px-4 py-2 rounded"
            >
              Open
            </button>

            <button
              onClick={() => duplicatePaper(paper)}
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Duplicate
            </button>

            <button
              onClick={() => deletePaper(paper.id)}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete
            </button>

          </div>
        </div>
      ))}
    </div>
  );
}