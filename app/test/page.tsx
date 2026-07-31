import { getQuestions } from "@/lib/loader";

export default function TestPage() {
  const questions = getQuestions();

  return (
    <div className="p-8">
      <h1>Total Questions: {questions.length}</h1>
    </div>
  );
}