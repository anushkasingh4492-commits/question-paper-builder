"use client";

import { Question } from "@/types/question";
import QuestionBank from "./QuestionBank";

interface Props {
  questions: Question[];
}

export default function QuestionBuilderClient({
  questions,
}: Props) {
  return (
    <QuestionBank questions={questions} />
  );
}