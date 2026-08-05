
import courseData from "@/data/datasets/maths1-8/case_studies_master.json";
export const courses = [
  {
    id: courseData.course.toLowerCase(),
    name: courseData.course,
    classes: [
      {
        name: courseData.class,
        subjects: [courseData.subject],
      },
    ],
  },
];