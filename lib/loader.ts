import data from "@/data/datasets/class9/CBSE_Class_IX_NCERT_MCQs.json";

export function getQuestions() {
  return (data as any).records;
}