"use client";


import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";
import { defaultTemplate } from "@/lib/defaultTemplate";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
} from "docx";

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

  template: {
    schoolName: string;
    headerColor: string;
    fontFamily: string;
    questionFont: number;
    headingFont: number;
    spacing: string;
    margin: string;
    showMarks: boolean;
    showPageNumbers: boolean;
    footer: string;
  };

  questions: Question[];
}

export default function PreviewPage() {
  const [paper, setPaper] = useState<PaperData | null>(null);
  const template = paper?.template ?? defaultTemplate;

  useEffect(() => {
    const data = localStorage.getItem("paperData");

    if (data) {
      setPaper(JSON.parse(data));
    }
  }, []);

  const downloadPDF = () => {
    if (!paper) return;

    const pdf = new jsPDF();

pdf.setFont("times", "bold");

pdf.setFontSize(template.headingFont);

pdf.text(
  paper.schoolName,
  105,
  20,
  { align: "center" }
);

pdf.setFontSize(18);

pdf.text(
  paper.examName,
  105,
  30,
  { align: "center" }
);

pdf.setFontSize(12);

pdf.text(
  `${paper.className} | ${paper.subjectName}`,
  105,
  40,
  { align: "center" }
);

pdf.text(
  `Date : ${paper.examDate}`,
  20,
  50
);

pdf.text(
  `Time : ${paper.time}`,
  20,
  58
);

pdf.text(
  `Maximum Marks : ${paper.totalMarks}`,
  140,
  58
);

pdf.line(20,65,190,65);

    let y = 75;

    paper.questions.forEach((q, index) => {
      pdf.text(`${index + 1}. ${q.stem}`, 20, y);

     y +=
template.spacing === "compact"
? 6
: template.spacing === "normal"
? 9
: 12;
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
const downloadDOCX = async () => {
  if (!paper) return;

  const children: Paragraph[] = [];

  // Header
  children.push(
    new Paragraph({
      heading: HeadingLevel.TITLE,
      children: [
        new TextRun({
          text: paper.schoolName,
          bold: true,
          size: 36,
        }),
      ],
    })
  );

  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: paper.examName,
          bold: true,
          size: 28,
        }),
      ],
    })
  );

  children.push(
    new Paragraph({
      text: `${paper.className} | ${paper.subjectName}`,
    })
  );

  children.push(
    new Paragraph({
      text: `Date: ${paper.examDate}`,
    })
  );

  children.push(
    new Paragraph({
      text: `Time: ${paper.time}     Maximum Marks: ${paper.totalMarks}`,
    })
  );

  children.push(new Paragraph(""));

  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: "General Instructions",
          bold: true,
        }),
      ],
    })
  );

  paper.instructions.split("\n").forEach((line) => {
    children.push(
      new Paragraph({
        text: line,
      })
    );
  });

  children.push(new Paragraph(""));

  // Questions
  paper.questions.forEach((q, index) => {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `${index + 1}. ${q.stem}`,
            bold: true,
          }),
        ],
      })
    );

    q.options.forEach((option) => {
      children.push(
        new Paragraph({
          text: `${option.id}. ${option.text}`,
        })
      );
    });

    if (q.orQuestions?.length) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "OR",
              bold: true,
            }),
          ],
        })
      );

      q.orQuestions.forEach((orQ) => {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: orQ.stem,
                bold: true,
              }),
            ],
          })
        );

        orQ.options.forEach((option) => {
          children.push(
            new Paragraph({
              text: `${option.id}. ${option.text}`,
            })
          );
        });
      });
    }

    children.push(new Paragraph(""));
  });

  children.push(
    new Paragraph({
      text: paper.template?.footer || "All the Best!",
    })
  );

  const doc = new Document({
    sections: [
      {
        children,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);

  saveAs(blob, `${paper.title}.docx`);
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

  pdf.setFontSize(
  template.questionFont
);

pdf.setFont("times","normal");

pdf.text(
  `${index + 1}. ${q.stem}`,
  20,
  y
);
if (template.showMarks) {
  pdf.setFontSize(10);

  pdf.text(
    `(${q.marks} Marks)`,
    170,
    y
  );
}

      y += 10;

      if (y > 280) {
        pdf.addPage();
        y = 20;
      }
    });
pdf.setFontSize(10);

pdf.line(20,280,190,280);

pdf.text(
  template.footer,
  20,
  287
);

if (template.showPageNumbers) {

  pdf.text(
    "Page 1",
    170,
    287
  );

}
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
    <div
  className="border-b pb-6 text-center"
  style={{
    color: template.headerColor,
    fontFamily: template.fontFamily,
  }}
>
  <h1
    style={{
      fontSize: template.headingFont,
      fontWeight: "bold",
    }}
  >
    {paper.schoolName}
  </h1>

  <p className="text-xl mt-2">
    {paper.examName}
  </p>

  <p>
    {paper.className}
  </p>

  <p>
    Subject : {paper.subjectName}
  </p>

  <p>
    Date : {paper.examDate}
  </p>

  <div className="flex justify-between mt-4">
    <span>Time : {paper.time}</span>

    <span>
      Maximum Marks : {paper.totalMarks}
    </span>
  </div>
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
<div
  style={{
    fontFamily: template.fontFamily,
    fontSize: template.questionFont,
    lineHeight:
      template.spacing === "compact"
        ? "1.4"
        : template.spacing === "normal"
        ? "1.7"
        : "2.1",
  }}
>
  <div className="flex justify-between items-start">
    <p>
      {index + 1}. {q.stem}
    </p>

    {template.showMarks && (
      <span className="text-blue-600 font-medium">
        {q.marks} Marks
      </span>
    )}
  </div>
</div>

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
<hr className="mt-10 mb-4" />

<div className="flex justify-between text-gray-500">

  <span>
    {template.footer}
  </span>

  {template.showPageNumbers && (
    <span>Page 1</span>
  )}

</div>
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
      <button
  onClick={downloadDOCX}
  className="bg-blue-800 text-white px-5 py-2 rounded"
>
  Download DOCX
</button>
      <button
  onClick={() => {
    setPaper((prev) =>
      prev ? { ...prev, template: defaultTemplate } : prev
    );
    localStorage.setItem(
      "paperTemplate",
      JSON.stringify(defaultTemplate)
    );
  }}
  className="bg-gray-500 text-white px-6 py-3 rounded-lg"
>
  Reset to Default
</button>
    </div>

  </div>
  )};