"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Question } from "@/types/question";

interface Props {
  question: Question;
  addQuestion?: (question: Question) => void;
}
export default function QuestionCard({
  question,
  addQuestion,
}: Props) {
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

  <div className="flex items-center gap-2">

    {addQuestion && (
      <button
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          addQuestion(question);
        }}
        className="w-8 h-8 rounded-full bg-green-600 hover:bg-green-700 text-white font-bold"
      >
        +
      </button>
    )}

    <span className="text-lg cursor-grab">
      ☰
    </span>

  </div>

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