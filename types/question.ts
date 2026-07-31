export interface Option {
  id: string;
  text: string;
}

export interface Chapter {
  number: number;
  title: string;
  source_alias: string;
}

export interface Answer {
  option_id: string;
  text: string;
  explanation: string;
}

export interface Question {
  id: string;
  subject: string;
  chapter: {
    number: number;
    title: string;
    source_alias: string;
  };
  stem: string;
  difficulty: string;
  options: {
    id: string;
    text: string;
  }[];

  orQuestions?: Question[];
  isAlternative?: boolean;
}