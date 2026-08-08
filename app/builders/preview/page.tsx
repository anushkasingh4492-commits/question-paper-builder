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
import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import HeaderItem from "@/components/builder/HeaderItem";
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

headerOrder?: string[];

questions: Question[];
}

export default function PreviewPage() {
  const [paper, setPaper] = useState<PaperData | null>(null);
  const template = paper?.template ?? defaultTemplate;
  const [templates, setTemplates] = useState<any[]>([]);
  const [headerOrder, setHeaderOrder] = useState<string[]>([
    "schoolName",
    "examName",
    "className",
    "subjectName",
    "examDate",
    "time",
    "totalMarks",
  ]);

  useEffect(() => {
    if (paper?.headerOrder) {
      setHeaderOrder(paper.headerOrder);
    }
  }, [paper]);

  useEffect(() => {
    const savedTemplates = JSON.parse(
      localStorage.getItem("paperPresets") || "[]"
    );

    if (savedTemplates.length > 0) {
      setTemplates(savedTemplates);
      return;
    }

    const defaultTemplates = [
      {
        id: 1,
        name: "Default Template",
        ...defaultTemplate,
      },
      {
        id: 2,
        name: "Compact Template",
        ...defaultTemplate,
        spacing: "compact",
      },
    ];

    setTemplates(defaultTemplates);
    localStorage.setItem("paperTemplates", JSON.stringify(defaultTemplates));
  }, []);

  function handleHeaderDragEnd(event: any) {
  const { active, over } = event;

  if (!over || active.id === over.id) return;

  setHeaderOrder((items) => {
    const oldIndex = items.indexOf(active.id);
    const newIndex = items.indexOf(over.id);

    return arrayMove(items, oldIndex, newIndex);
  });
}
  useEffect(() => {
    const data = localStorage.getItem("paperData");

    if (data) {
      setPaper(JSON.parse(data));
    }
  }, []);

  const downloadPDF = () => {
    if (!paper) return;

    const pdf = new jsPDF();
    const left =
  template.margin === "small"
    ? 10
    : template.margin === "medium"
    ? 20
    : 30;

let headerY = 20;

pdf.setFont("times", "bold");

pdf.setFontSize(template.headingFont);

pdf.text(
  paper.schoolName,
  left,
  headerY,
  
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
  left,
  50
);

pdf.text(
  `Time : ${paper.time}`,
  left,
  58
);

pdf.text(
  `Maximum Marks : ${paper.totalMarks}`,
  140,
  58
);

pdf.line(left,65,190-left,65);

    let y = 75;

    paper.questions.forEach((q, index) => {
    pdf.text(`${index + 1}. ${q.stem}`, left, y);
     y +=
template.spacing === "compact"
? 6
: template.spacing === "normal"
? 9
: 12;
      q.options.forEach((option) => {
   pdf.text(`${option.id}. ${option.text}`, left + 10, y);
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
      const answerText = q.answer
        ? `${q.answer.option_id}. ${q.answer.text}`
        : "Answer not available";

      pdf.setFont("times", "normal");
      pdf.setFontSize(template.questionFont);
      pdf.text(`${index + 1}. ${q.stem}`, 20, y);
      y += 8;

      pdf.setFontSize(12);
      pdf.text(`Answer: ${answerText}`, 30, y);
      y += 10;

      if (template.showMarks) {
        pdf.setFontSize(10);
        pdf.text(`(${q.marks} Marks)`, 170, y - 10);
      }

      y += 8;

      if (y > 280) {
        pdf.addPage();
        y = 20;
      }
    });

    pdf.setFontSize(10);
    pdf.line(20, 280, 190, 280);
    pdf.text(template.footer, 20, 287);

    if (template.showPageNumbers) {
      pdf.text("Page 1", 170, 287);
    }

    pdf.save(`${paper.title}-Answer-Key.pdf`);
  };

  const savePreset = () => {
    if (!paper) return;

    const presetName = prompt("Preset Name");
    if (!presetName) return;

    const presets = JSON.parse(
      localStorage.getItem("paperPresets") || "[]"
    );

    presets.push({
      id: Date.now(),
      name: presetName,
      template: paper.template ?? defaultTemplate,
      headerOrder,
    });

    localStorage.setItem("paperPresets", JSON.stringify(presets));
    alert("Preset Saved!");
  };

  if (!paper) {
    return (
      <div className="p-10 text-center text-lg">
        Loading paper...
      </div>
    );
  }

 return (
  <div className="max-w-4xl mx-auto">
    <div className="mb-6">
      <label className="block font-semibold mb-2">
        Choose Template
      </label>

      <select
        className="border rounded-lg p-2 w-full"
        defaultValue=""
        onChange={(e) => {
          const temp = templates.find(
            (t: any) => t.id === Number(e.target.value)
          );

          if (!temp || !paper) return;

          setPaper({
            ...paper,
            template: temp.template,
          });
        }}
      >
        <option value="">Select Template</option>

        {templates.map((t: any) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>
    </div>

    <div
      className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl"
      style={{
        padding:
          template.margin === "small"
            ? "20px"
            : template.margin === "medium"
            ? "40px"
            : "70px",
      }}
    >
      {/* Header */}
      <div
        className="border-b pb-6 text-center"
        style={{
          color: template.headerColor,
          fontFamily: template.fontFamily,
        }}
      >
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleHeaderDragEnd}
        >
          <SortableContext
            items={headerOrder}
            strategy={verticalListSortingStrategy}
          >
            {headerOrder.map((item) => {
              let value: React.ReactNode = null;

              switch (item) {
                case "schoolName":
                  value = (
                    <h1
                      style={{ fontSize: template.headingFont }}
                      className="font-bold"
                    >
                      {paper?.schoolName}
                    </h1>
                  );
                  break;

                case "examName":
                  value = (
                    <p className="mt-2 font-medium">
                      {paper?.examName}
                    </p>
                  );
                  break;

                case "className":
                  value = (
                    <p className="mt-2 font-medium">
                      {paper?.className}
                    </p>
                  );
                  break;

                case "subjectName":
                  value = (
                    <p className="font-medium">
                      {paper?.subjectName}
                    </p>
                  );
                  break;

                case "examDate":
                  value = (
                    <p>📅 {paper?.examDate}</p>
                  );
                  break;

                case "time":
                  value = (
                    <p>⏱ {paper?.time}</p>
                  );
                  break;

                case "totalMarks":
                  value = (
                    <p>📝 {paper?.totalMarks} Marks</p>
                  );
                  break;
              }

              return (
                <HeaderItem key={item} id={item}>
                  {value}
                </HeaderItem>
              );
            })}
          </SortableContext>
        </DndContext>

        <hr className="my-4" />
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
        <h3 className="font-bold mb-3">General Instructions</h3>

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
        <div key={q.id} className="mb-8 border rounded-lg p-4">
          <div
            style={{
              fontSize: template.questionFont,
              lineHeight:
                template.spacing === "compact"
                  ? 1.2
                  : template.spacing === "normal"
                  ? 1.6
                  : 2.2,
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
                <div key={`${orQ.id}-${i}`} className="mb-6">
                  <p className="font-bold text-orange-600">OR</p>

                  <p className="font-semibold mt-2">{orQ.stem}</p>

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

      <div className="flex justify-between var(--color-text-muted)500">
        <span>{template.footer}</span>

        {template.showPageNumbers && <span>Page 1</span>}
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={() => window.print()}
          className="bg-[#7a233b]600 text-white px-5 py-2 rounded"
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
          className="bg-[#7a233b]800 text-white px-5 py-2 rounded"
        >
          Download DOCX
        </button>

        <button
          onClick={savePreset}
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          💾 Save Layout as Preset
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
  </div>
 );
}
