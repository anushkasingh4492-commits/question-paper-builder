"use client";

import { useState } from "react";
import { Question } from "@/types/question";

export function usePaperBuilder() {

  const [paperQuestions,setPaperQuestions] =
    useState<Question[]>([]);

  function addQuestion(question:Question){

    setPaperQuestions(prev=>{

      if(prev.find(q=>q.id===question.id))
        return prev;

      return [...prev,question];

    });

  }

  function removeQuestion(id:string){

    setPaperQuestions(prev=>

      prev.filter(q=>q.id!==id)

    );

  }

  return{

    paperQuestions,

    addQuestion,

    removeQuestion

  };

}