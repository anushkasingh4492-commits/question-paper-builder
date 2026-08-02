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

  template: any;
  schoolName: string;
  examName: string;
  className: string;
  subjectName: string;
  examDate: string;
  duration: string;
  totalMarks: number;
  instructions: string;
}
export default function PaperCanvas({
  questions,
  removeQuestion,
  setOrTarget,
  orTarget,
  template,
  schoolName,
  examName,
  className,
  subjectName,
  examDate,
  duration,
  totalMarks,
  instructions,
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
     <div
  className="text-center border-b pb-5 mb-6"
  style={{
    color: template.headerColor,
    fontFamily: template.fontFamily,
  }}
>
  <h1
    style={{
      fontSize: template.headingFont,
      fontWeight: "bold",
    }}
  >
    {schoolName}
  </h1>

  <h2 className="text-xl mt-2">
    {examName}
  </h2>

  <p>
    {className} | {subjectName}
  </p>

  <p>
    Date: {examDate || "________"}
  </p>

  <div className="flex justify-between mt-3 text-black">
    <span>Duration: {duration}</span>

    <span>Total Marks: {totalMarks}</span>
  </div>

  <div className="mt-4 text-left whitespace-pre-line text-gray-700">
    {instructions}
  </div>
</div>

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
                 <h3
  style={{
    fontFamily: template.fontFamily,
    fontSize: template.questionFont,
    lineHeight:
      template.spacing === "compact"
        ? "1.4"
        : template.spacing === "normal"
        ? "1.7"
        : "2.1",
  }}
>
  <strong>Q{index + 1}.</strong> {q.stem}
</h3>
{template.showMarks && (
  <div className="text-sm text-blue-600 mt-2">
    Marks: {(q as any).marks ?? (q as any).mark}
  </div>
)}
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
      <hr className="mt-8 mb-3" />

<div className="flex justify-between text-sm text-gray-500">
  <span>{template.footer}</span>

  {template.showPageNumbers && (
    <span>Page 1</span>
  )}
</div>
    </div>
  );
}