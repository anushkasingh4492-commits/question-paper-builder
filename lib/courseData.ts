
import courseData from "@/data/datasets/maths1-8/case_studies_master.json";
export const courses = [
  {
    id: courseData.board.toLowerCase(),
    name: courseData.board,
    classes: [
      {
        name: courseData.class,
        subjects: [courseData.subject],
      },
    ],
  },
];