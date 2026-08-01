import courseData from "@/data/json/case_studies_master.json";

export function getCourseData() {
  return courseData;
}

export function getBoards() {
  return [courseData.board];
}

export function getClasses() {
  return [courseData.class];
}

export function getSubjects() {
  return [courseData.subject];
}

export function getChapters() {
  return courseData.chapters;
}