"use client";

import { Question } from "@/types/question";
import QuestionBank from "./QuestionBank";

interface Props {
  questions: Question[];
  addQuestion: (question: Question) => void;
}

export default function QuestionBuilderClient({
  questions,
  addQuestion,
}: Props) {
  return (
    <QuestionBank
      questions={questions}
      addQuestion={addQuestion}
    />
  );
}