"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Question } from "@/types/question";

interface Props {
  question: Question;
}

export default function QuestionCard({ question }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
  } = useDraggable({
    id: question.id,
    data: {
      question,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="border rounded-xl bg-white p-4 shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md transition"
    >
      <div className="flex justify-between items-center">
        <div className="text-xs text-gray-500">
          {question.subject} • Chapter {question.chapter.number}
        </div>

        <span className="text-lg">☰</span>
      </div>

      <h3 className="font-semibold mt-3">
        {question.stem}
      </h3>

      <div className="mt-3 space-y-1">
        {question.options.map((option) => (
          <p key={option.id}>
            {option.id}. {option.text}
          </p>
        ))}
      </div>
    </div>
  );
}