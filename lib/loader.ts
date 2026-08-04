import mcqData from "@/data/datasets/class9/CBSE_Class_IX_NCERT_MCQs.json";
import assertionData from "@/data/datasets/class9/CBSE_Class_IX_NCERT_Assertion_Reasoning.json";
import nonObjectiveData from "@/data/datasets/class9/FINAL_CBSE_Class_IX_Maths_Non_Objective_Question_Bank_With_Embedded_Images.json";
import scienceData from "@/data/datasets/class9/FINAL_CBSE_Class_IX_Science_Complete_Question_Bank_All_Types_With_Solutions_And_Embedded_Images.json";

import socialScienceData from "@/data/datasets/class9/FINAL_CBSE_Class_IX_Social_Science_Complete_Question_Bank_All_Types_With_Solutions_And_Embedded_Images.json";
function normalizeNonObjective(
  records: any[],
  subject: string
) {
  return records.map((q: any, index: number) => ({
  id: q.id || `Q-${index}`,

subject: q.subject || subject,

  chapter: {
    number: q.chapter?.number || "",
    title: q.chapter?.title || "Unknown",
  },

  difficulty: q.difficulty || "Medium",

  type:
    q.type ||
    q.question_type ||
    "Unknown",

  stem:
    q.stem ||
    q.question ||
    "",

  options: Array.isArray(q.options)
    ? q.options
    : q.options
    ? Object.entries(q.options).map(
        ([id, text]) => ({
          id,
          text,
        })
      )
    : [],

  marks:
    q.marks ||
    1,

  answer:
    q.answer ||
    q.solution?.correct_answer ||
    q.solution?.final_answer ||
    "",

  orQuestions: [],
}));
}

export function getQuestions() {
  const mcqs = (mcqData as any).records ?? [];

  const assertions =
    (assertionData as any).records ?? [];

  const nonObjectives =
  normalizeNonObjective(
    (nonObjectiveData as any).records ?? [],
    "Mathematics"
  );
  const science =
  normalizeNonObjective(
    (scienceData as any).records ?? [],
    "Science"
  );
  const socialScience =
  normalizeNonObjective(
    (socialScienceData as any).records ?? [],
    "Social Science"
  );

 const allQuestions = [
  ...mcqs,
  ...assertions,
  ...nonObjectives,
  ...science,
  ...socialScience,
];

const uniqueQuestions = Array.from(
  new Map(
    allQuestions.map((q: any) => [q.id, q])
  ).values()
);

return uniqueQuestions;
}