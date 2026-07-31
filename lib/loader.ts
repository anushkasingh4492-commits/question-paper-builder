import data from "@/data/json/CBSE_Class_IX_NCERT_MCQs.json";

export function getQuestions() {
  return (data as any).records;
}