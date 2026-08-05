import cbseData from "@/data/datasets/class9/CBSE_Class_IX_NCERT_MCQs.json";
import mhtData from "@/data/datasets/mht-cet/physics/question_bank_v1.1.2.json";

const cbseQuestions = (cbseData as any).records;
const mhtQuestions = mhtData as any[];

export function getBoards() {
  return [
    "CBSE",
    "ICSE",
    "Maharashtra Board",
    "JEE Main",
    "NEET",
    "MHT CET",
  ];
}
export function getClasses(course?: string) {
  switch (course) {
    case "CBSE":
      return ["9","10","11","12"];

    case "ICSE":
      return ["9","10","11","12"];
    case "Maharashtra Board":
      return ["9","10","11","12"];

    case "MHT-CET":
      return ["11","12","11 + 12"];

    case "JEE Main":
      return ["11","12","11 + 12"];

    case "NEET":
      return ["11","12","11 + 12"];

    default:
      return [];
  }
}

export function getSubjects(course?: string, cls?: string) {

  switch(course){

    case "CBSE":
      return [...new Set(cbseQuestions.map((q:any)=>q.subject))];

    case "MHT-CET":
      return [
        "Physics",
        "Chemistry",
        "Mathematics",
        "Biology",
      ];

    case "JEE":
      return [
        "Physics",
        "Chemistry",
        "Mathematics",
      ];

    case "NEET":
      return [
        "Physics",
        "Chemistry",
        "Biology",
      ];

    case "ICSE":
      return [
        "Mathematics",
        "Science",
        "English",
        "History",
      ];

    case "State course":
      return [
        "Mathematics",
        "Science",
        "English",
      ];

    default:
      return [];
  }
}


export function getChapters(subject: string) {
  if (subject === "Physics") {
    return [
      ...new Set(
        mhtQuestions.map((q: any) => q.chapter_name)
      ),
    ];
  }

  return [
    ...new Set(
      cbseQuestions
        .filter((q: any) => q.subject === subject)
        .map((q: any) => q.chapter.title)
    ),
  ];
}