"use client";

import { Question } from "@/types/question";
import QuestionCard from "./QuestionCard";

interface Props {
  questions: Question[];
}

export default function QuestionBank({
  questions,
}: Props) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Question Bank
      </h2>

      <div className="space-y-4">
        {questions.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
          />
        ))}
      </div>
    </div>
  );
}