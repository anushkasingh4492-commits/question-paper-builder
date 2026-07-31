import { Question } from "./question";

export interface PaperHeader {
  schoolName: string;
  logo: string;

  examName: string;

  className: string;

  subject: string;

  duration: string;

  date: string;

  totalMarks: number;

  instructions: string;
}

export interface PaperQuestion {

  id: string;

  type: "question" | "or";

  questions: Question[];

}

export interface Paper {

  header: PaperHeader;

  items: PaperQuestion[];

}