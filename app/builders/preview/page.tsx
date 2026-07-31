"use client";

import { useEffect, useState } from "react";
import jsPDF from "jspdf";

interface Question {
  id: string;
  stem: string;
  marks?: number;

  options: {
    id: string;
    text: string;
  }[];

  orQuestions?: Question[];

  answer?: {
    option_id: string;
    text: string;
    explanation?: string;
  };
}


interface PaperData {
  schoolName: string;
  examName: string;
  className: string;
subjectName: string;
examDate: string;

  title: string;
  time: string;
  totalMarks: number;
instructions: string;
  questions: Question[];
}

export default function PreviewPage() {
  const [paper, setPaper] = useState<PaperData | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("paperData");

    if (data) {
      setPaper(JSON.parse(data));
    }
  }, []);

  const downloadPDF = () => {
    if (!paper) return;

    const pdf = new jsPDF();

    pdf.setFontSize(18);
    pdf.text(paper.title, 20, 20);

    pdf.setFontSize(12);
    pdf.text(`Time: ${paper.time}`, 20, 35);
    pdf.text(`Maximum Marks: ${paper.totalMarks}`, 20, 45);

    let y = 60;

    paper.questions.forEach((q, index) => {
      pdf.text(`${index + 1}. ${q.stem}`, 20, y);

      y += 8;

      q.options.forEach((option) => {
        pdf.text(`${option.id}. ${option.text}`, 30, y);
        y += 7;
      });

      y += 5;

      if (y > 270) {
        pdf.addPage();
        y = 20;
      }
    });

    pdf.save(`${paper.title}.pdf`);
  };

  const downloadAnswerKey = () => {
    if (!paper) return;

    const pdf = new jsPDF();

    pdf.setFontSize(18);
    pdf.text(`${paper.title} - Answer Key`, 20, 20);

    let y = 35;

    paper.questions.forEach((q, index) => {
      pdf.setFontSize(12);

      const answer = q.answer
        ? `${q.answer.option_id}. ${q.answer.text}`
        : "Answer not available";

      pdf.text(`${index + 1}. ${answer}`, 20, y);

      y += 10;

      if (y > 280) {
        pdf.addPage();
        y = 20;
      }
    });

    pdf.save(`${paper.title}-Answer-Key.pdf`);
  };

  if (!paper) {
    return (
      <div className="p-10 text-center text-lg">
        Loading paper...
      </div>
    );
  }

 return (
  <div className="max-w-4xl mx-auto p-10 bg-white">

    {/* Header */}
    <div className="text-center border-b pb-6">
      <h1 className="text-3xl font-bold">
        {paper.schoolName}
      </h1>

      <p className="text-xl mt-2">
        {paper.examName}
      </p>

      <p className="mt-2">
        {paper.className}
      </p>

      <p>
        Subject: {paper.subjectName}
      </p>

      <p>
        Date: {paper.examDate}
      </p>

      <p>
        Time: {paper.time}
      </p>

      <p>
        Maximum Marks: {paper.totalMarks}
      </p>
    </div>

    {/* Name */}
    <div className="flex justify-between mt-8 mb-8">
      <div>
        Name :
        ___________________________
      </div>

      <div>
        Roll No :
        ____________________
      </div>
    </div>

    {/* Instructions */}
    <div className="border rounded-lg p-4 mb-8">
      <h3 className="font-bold mb-3">
        General Instructions
      </h3>

      {(paper.instructions ?? "")
        .split("\n")
        .map((line, index) => (
          <p key={index}>{line}</p>
        ))}
    </div>

    {/* Section */}
    <h2 className="text-2xl font-bold text-center mb-8 underline">
      SECTION A
    </h2>

    {/* Questions */}
    {paper.questions.map((q, index) => (
      <div
        key={q.id}
        className="mb-8 border rounded-lg p-4"
      >
        <p className="font-semibold">
          {index + 1}. {q.stem}
        </p>

        <div className="mt-3 ml-4 space-y-2">
          {q.options.map((option) => (
            <p key={option.id}>
              {option.id}. {option.text}
            </p>
          ))}
        </div>

        {q.orQuestions?.length ? (
          <div className="mt-6 ml-8 border-l-4 border-orange-500 pl-5">
            {q.orQuestions.map((orQ, i) => (
              <div
                key={`${orQ.id}-${i}`}
                className="mb-6"
              >
                <p className="font-bold text-orange-600">
                  OR
                </p>

                <p className="font-semibold mt-2">
                  {orQ.stem}
                </p>

                <div className="mt-2 ml-4">
                  {orQ.options.map((option) => (
                    <p key={option.id}>
                      {option.id}. {option.text}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    ))}

    {/* Buttons */}
    <div className="flex gap-4 mt-8">
      <button
        onClick={() => window.print()}
        className="bg-blue-600 text-white px-5 py-2 rounded"
      >
        Print Paper
      </button>

      <button
        onClick={downloadPDF}
        className="bg-green-600 text-white px-5 py-2 rounded"
      >
        Download PDF
      </button>

      <button
        onClick={downloadAnswerKey}
        className="bg-purple-600 text-white px-5 py-2 rounded"
      >
        Download Answer Key
      </button>
    </div>

  </div>
  )};