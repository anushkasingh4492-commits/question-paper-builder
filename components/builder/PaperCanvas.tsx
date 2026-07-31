"use client";

import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Question } from "@/types/question";
import SortableQuestion from "./SortableQuestion";

interface Props {
  questions: Question[];
  removeQuestion: (id: string) => void;
  setOrTarget: React.Dispatch<
    React.SetStateAction<Question | null>
  >;
  orTarget: Question | null;
}

export default function PaperCanvas({
  questions,
  removeQuestion,
  setOrTarget,
  orTarget,
}: Props) {
  const { isOver, setNodeRef } = useDroppable({
    id: "paper-drop-zone",
  });

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[650px] rounded-xl border-2 border-dashed p-5 transition ${
        isOver
          ? "border-blue-600 bg-blue-50"
          : "border-gray-300"
      }`}
    >
      <h2 className="text-2xl font-bold mb-6">
        Question Paper
      </h2>

      {questions.length === 0 && (
        <div className="text-center text-gray-400 mt-24">
          Drag questions here
        </div>
      )}

      <SortableContext
        items={questions.map((q) => q.id)}
        strategy={verticalListSortingStrategy}
      >
        {questions.map((q, index) => (
          <SortableQuestion
            key={q.id}
            question={q}
          >
            <div
              className={`rounded-xl border p-5 mb-5 transition-all ${
                orTarget?.id === q.id
                  ? "border-orange-500 bg-orange-50 shadow-lg"
                  : "border-gray-300 bg-white"
              }`}
            >
              {/* Header */}
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-lg">
                    Q{index + 1}. {q.stem}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {q.subject} • {q.chapter.title}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOrTarget(q);
                  }}
                  className={`px-4 py-2 rounded text-white transition ${
                    orTarget?.id === q.id
                      ? "bg-orange-700"
                      : "bg-orange-500 hover:bg-orange-600"
                  }`}
                >
                  {orTarget?.id === q.id
                    ? "Adding OR..."
                    : "+ OR"}
                </button>
              </div>

              {/* Remove */}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => removeQuestion(q.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Remove Question
                </button>
              </div>

              {/* OR Questions */}
              {q.orQuestions &&
                q.orQuestions.length > 0 && (
                  <div className="mt-6">
                    {q.orQuestions.map((orQ, index) => (
                      <div
                        key={`${orQ.id}-${index}`}
                        className="ml-8 mt-4 border-l-4 border-orange-500 bg-orange-50 pl-4 py-3 rounded-r-lg"
                      >
                        <div className="font-bold text-orange-600">
                          OR
                        </div>

                        <div className="mt-2">
                          {orQ.stem}
                        </div>

                        <div className="mt-2 text-sm text-gray-500">
                          {orQ.subject} • {orQ.chapter.title}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
            </div>
          </SortableQuestion>
        ))}
      </SortableContext>
    </div>
  );
}