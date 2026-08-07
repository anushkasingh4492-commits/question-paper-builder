"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { getQuestions } from "@/lib/loader";

import {
  DndContext,
  DragOverlay,
  closestCenter,
} from "@dnd-kit/core";

import QuestionBuilderClient from "@/components/builder/QuestionBuilderClient";
import PaperCanvas from "@/components/builder/PaperCanvas";
import QuestionCard from "@/components/builder/QuestionCard";

import { Question } from "@/types/question";

const PaperCanvasAny = PaperCanvas as any;

// lightweight replacement for arrayMove from @dnd-kit/sortable
function arrayMove<T>(array: T[], from: number, to: number) {
  const newArray = array.slice();
  if (from < 0) from = newArray.length + from;
  if (to < 0) to = newArray.length + to;
  if (from >= newArray.length) return newArray;
  const item = newArray.splice(from, 1)[0];
  newArray.splice(to, 0, item);
  return newArray;
}

export default function BuildersPage() {
  const [schoolName, setSchoolName] = useState("ABC PUBLIC SCHOOL");
const [examName, setExamName] = useState("UNIT TEST - I");
const [className, setClassName] = useState("Class IX");
const [subjectName, setSubjectName] = useState("Mathematics");
const [examDate, setExamDate] = useState("");
const [instructions, setInstructions] = useState(
`1. All questions are compulsory.
2. Read all questions carefully.
3. Internal choices are provided where applicable.
4. Show all necessary calculations.`
);
const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [paperQuestions, setPaperQuestions] =
    useState<Question[]>([]);

  const [activeQuestion, setActiveQuestion] =
    useState<Question | null>(null);
const [paperTitle, setPaperTitle] =
  useState("Class IX Mathematics Question Paper");

const [duration, setDuration] =
  useState("1 Hour");

const [totalMarks, setTotalMarks] =
  useState(20);
  const [subject, setSubject] =
    useState("All");

  const [chapter, setChapter] =
    useState("All");

  const [difficulty, setDifficulty] =
    useState("All");

  const [search, setSearch] =
    useState("");

  const [page, setPage] =
    useState(1);
const [orTarget, setOrTarget] = useState<Question | null>(null);
console.log("OR TARGET:", orTarget);
  const questionsPerPage = 20;
  useEffect(() => {
  const preset = JSON.parse(
    localStorage.getItem("paperPreset") || "null"
  );

  if (!preset) return;

  setSchoolName(preset.schoolName || "");
  setExamName(preset.examName || "");
  setClassName(preset.className || "");
  setSubjectName(preset.subjectName || "");
  setExamDate(preset.examDate || "");
  setDuration(preset.duration || "1 Hour");
  setTotalMarks(preset.totalMarks || 80);

  const draft = JSON.parse(
    localStorage.getItem("paperDraft") || "null"
  );

  if (draft) {
    setSchoolName(draft.schoolName);
    setExamName(draft.examName);
    setClassName(draft.className);
    setSubjectName(draft.subjectName);
    setExamDate(draft.examDate);
    setPaperTitle(draft.paperTitle);
    setDuration(draft.duration);
    setTotalMarks(draft.totalMarks);
    setInstructions(draft.instructions);
    setTemplate(draft.template);
    setPaperQuestions(draft.paperQuestions);
  }
}, []);
const [template, setTemplate] = useState({
  schoolName: "ABC Public School",
  headerColor: "#2563eb",
  fontFamily: "Times New Roman",
  questionFont: 14,
  headingFont: 24,
  spacing: "normal",
  margin: "medium",
  showMarks: true,
  showPageNumbers: true,
  footer: "All the Best!"
});
useEffect(() => {
  const all = getQuestions() as Question[];

  const selected = JSON.parse(
    localStorage.getItem("selectedChapters") || "[]"
  );

  if (selected.length === 0) {
    setAllQuestions(all);
  } else {
    setAllQuestions(
      all.filter((q: any) =>
        selected.includes(q.chapter.title)
      )
    );
  }
}, []);
useEffect(() => {
  const saved = localStorage.getItem("paperTemplate");

  if (saved) {
    setTemplate(JSON.parse(saved));
  }
}, []);
const [questionType, setQuestionType] = useState("All");
const [questionSourceFilter, setQuestionSourceFilter] = useState("all");
useEffect(() => {
  const savedQuestionType = localStorage.getItem("questionType");
  if (savedQuestionType) {
    setQuestionSourceFilter(savedQuestionType);
  }
}, []);
function addQuestion(question: Question) {
  setPaperQuestions((prev) => {
    console.log("Paper count:", prev.length + 1);

    if (prev.find((q) => q.id === question.id))
      return prev;

    return [...prev, question];
  });
}
  function removeQuestion(id: string) {

    setPaperQuestions(prev =>
      prev.filter(q => q.id !== id)
    );

  }

  function handleDragStart(event: any) {

    const q =
      event.active.data.current?.question;

    if (q)
      setActiveQuestion(q);

  }
  function addORQuestion(parentId:string, orQuestion:Question){

 console.log(
   "ADDING OR",
   parentId,
   orQuestion.id
 );

 setPaperQuestions(prev =>
   prev.map(q=>{
     if(q.id !== parentId) return q;

     return {
       ...q,
       orQuestions:[
          ...(q.orQuestions || []),
          orQuestion
       ]
     };
   })
 );
}
function handleDragEnd(event: any) {
  setActiveQuestion(null);

  const { active, over } = event;

  if (!over) return;

  const draggedQuestion =
    active.data.current?.question;

  if (!draggedQuestion) return;

  // ===== OR MODE =====
  if (orTarget) {
    addORQuestion(orTarget.id, draggedQuestion);
    setOrTarget(null);
    return;
  }

  // ===== ADD TO PAPER =====
  const overId = String(over.id);

  const isPaperDrop =
    overId === "paper-drop-zone" ||
    paperQuestions.some((q) => q.id === overId);

  if (isPaperDrop) {
    addQuestion(draggedQuestion);
    return;
  }

  // ===== REORDER =====
  const oldIndex = paperQuestions.findIndex(
    (q) => q.id === active.id
  );

  const newIndex = paperQuestions.findIndex(
    (q) => q.id === over.id
  );

  if (oldIndex !== -1 && newIndex !== -1) {
    setPaperQuestions((items) =>
      arrayMove(items, oldIndex, newIndex)
    );
  }
}
  const subjects = useMemo(() => [

    "All",

    ...Array.from(

      new Set(

        allQuestions.map(
          q => q.subject
        )

      )

    )

  ], [allQuestions]);

  const chapters = useMemo(() => [

    "All",

    ...Array.from(

      new Set(

        allQuestions

          .filter(q =>
            subject === "All"
              ? true
              : q.subject === subject
          )

          .map(
            q => q.chapter.title
          )

      )

    )

  ], [subject, allQuestions]);

  const difficulties = [
    "All",
    "Easy",
    "Medium",
    "Hard",
  ];
  const questionTypes = [
  "All",
  ...Array.from(
    new Set(
      allQuestions
        .map((q: any) => q.type)
        .filter(Boolean)
    )
  ),
];
    const filteredQuestions = useMemo(() => {

    return allQuestions.filter((q) =>

      (subject === "All" ||
        q.subject === subject)

      &&

      (chapter === "All" ||
        q.chapter.title === chapter)

      &&

      (difficulty === "All" ||
        q.difficulty === difficulty)

      &&

      (questionSourceFilter !== "pyq" ||
        (q as any).source_type === "PYQ" ||
        (q as any).question_type === "PYQ" ||
        (q as any).type === "PYQ")

      &&

(questionType === "All" ||
 ( (q as any).type === questionType))

&&

((q as any).stem || "")
  .toLowerCase()
  .includes(search.toLowerCase())


    );

  }, [
    allQuestions,
    subject,
    chapter,
    difficulty,
    search,
    questionType,
  ]);
  const availableQuestions = filteredQuestions.filter(
  (question) =>
    !paperQuestions.some(
      (paperQuestion) => paperQuestion.id === question.id
    )
);
function savePreset() {
  const name = prompt("Preset Name");

  if (!name) return;

  const presets = JSON.parse(
    localStorage.getItem("paperPresets") || "[]"
  );

  presets.push({
    id: Date.now(),
    name,
    template,
  });

  localStorage.setItem(
    "paperPresets",
    JSON.stringify(presets)
  );

  alert("Preset Saved!");
}
function saveDraft() {
  const draftName =
    prompt("Enter Draft Name");

  if (!draftName) return;

  const drafts = JSON.parse(
    localStorage.getItem("paperDrafts") || "[]"
  );

  drafts.push({
    id: Date.now(),
    name: draftName,

    schoolName,
    examName,
    className,
    subjectName,
    examDate,

    paperTitle,
    duration,
    totalMarks,
    instructions,

    template,
    paperQuestions,
  });

  localStorage.setItem(
    "paperDrafts",
    JSON.stringify(drafts)
  );

  alert("Draft Saved Successfully!");
}

  const totalPages = Math.ceil(
    filteredQuestions.length /
      questionsPerPage
  );

  const startIndex =
    (page - 1) *
    questionsPerPage;

  const currentQuestions =
    filteredQuestions.slice(
      startIndex,
      startIndex +
        questionsPerPage
    );

  const paperCanvasProps = {
    questions: paperQuestions,
    removeQuestion,
    setOrTarget,
    orTarget,
    schoolName,
    examName,
    className,
    subjectName,
    examDate,
    duration,
    totalMarks,
    instructions,
  } as any;

  return (

<DndContext

collisionDetection={closestCenter}

onDragStart={handleDragStart}

onDragEnd={handleDragEnd}

>

<DashboardLayout>

<div className="p-6">

<h1 className="text-3xl font-bold">

Paper Builder

</h1>

<p className="text-gray-600 mt-2">

Create your paper by dragging questions.

</p>

<div className="grid grid-cols-2 gap-6 mt-8">

{/* LEFT */}

<div className="border rounded-xl p-5">

<h2 className="text-xl font-semibold mb-4">

Question Bank

</h2>

<div className="grid grid-cols-2 gap-3 mb-5">

<select

className="border rounded p-2"

value={subject}

onChange={(e)=>{

setSubject(e.target.value);

setPage(1);

}}

>
{subjects.map((s, index) => (
  <option key={`${s}-${index}`} value={s}>
    {s}
  </option>
))}

</select>

<select

className="border rounded p-2"

value={chapter}

onChange={(e)=>{

setChapter(e.target.value);

setPage(1);

}}

>

{chapters.map((c, index) => (
  <option
    key={`${c}-${index}`}
    value={c}
  >
    {c}
  </option>
))}

</select>
<select
  className="border rounded p-2"
  value={questionType}
  onChange={(e) => {
    setQuestionType(e.target.value);
    setPage(1);
  }}
>
  {questionTypes.map((t, index) => (
    <option
      key={`${t}-${index}`}
      value={t}
    >
      {t}
    </option>
  ))}
</select>

<select
  className="border rounded p-2"
  value={questionSourceFilter}
  onChange={(e) => {
    setQuestionSourceFilter(e.target.value);
    setPage(1);
  }}
>
  <option value="all">All Questions</option>
  <option value="pyq">Previous Year Questions</option>
</select>

<select

className="border rounded p-2"

value={difficulty}

onChange={(e)=>{

setDifficulty(e.target.value);

setPage(1);

}}

>

{difficulties.map((d, index) => (
  <option
    key={`${d}-${index}`}
    value={d}
  >
    {d}
  </option>
))}

</select>

<input

className="border rounded p-2"

placeholder="Search..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>

</div>

<QuestionBuilderClient
  questions={availableQuestions}
  addQuestion={addQuestion}
/>
<div className="flex justify-between items-center mt-6">

<button

disabled={page===1}

onClick={()=>setPage(page-1)}

className="border px-4 py-2 rounded disabled:opacity-40"

>

Previous

</button>

<p>

Page {page} of {totalPages}

</p>

<button

disabled={page===totalPages}

onClick={()=>setPage(page+1)}

className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-40"

>

Next

</button>

</div>

</div>
{/* RIGHT */}

<div className="border rounded-xl p-5">

<h2 className="text-xl font-semibold mb-4">
Your Paper
</h2>

<div className="space-y-3 mb-5">

<input
  className="border rounded p-2 w-full"
  placeholder="School Name"
  value={schoolName}
  onChange={(e)=>setSchoolName(e.target.value)}
/>

<input
  className="border rounded p-2 w-full"
  placeholder="Exam Name"
  value={examName}
  onChange={(e)=>setExamName(e.target.value)}
/>

<input
  className="border rounded p-2 w-full"
  placeholder="Class"
  value={className}
  onChange={(e)=>setClassName(e.target.value)}
/>

<input
  className="border rounded p-2 w-full"
  placeholder="Subject"
  value={subjectName}
  onChange={(e)=>setSubjectName(e.target.value)}
/>

<input
  type="date"
  className="border rounded p-2 w-full"
  value={examDate}
  onChange={(e)=>setExamDate(e.target.value)}
/>
<input
className="border rounded p-2 w-full"
placeholder="Paper Title"
value={paperTitle}
onChange={(e)=>setPaperTitle(e.target.value)}
/>

<input
className="border rounded p-2 w-full"
placeholder="Duration"
value={duration}
onChange={(e)=>setDuration(e.target.value)}
/>

<input
type="number"
className="border rounded p-2 w-full"
placeholder="Total Marks"
value={totalMarks}
onChange={(e)=>setTotalMarks(Number(e.target.value))}
/>

<textarea
  className="border rounded p-2 w-full h-32"
  placeholder="Instructions"
  value={instructions}
  onChange={(e) =>
    setInstructions(e.target.value)
  }
/>
</div>

<div id="paper-drop-zone">

<PaperCanvas
  questions={paperQuestions}
  removeQuestion={removeQuestion}
  setOrTarget={setOrTarget}
  orTarget={orTarget}
  schoolName={schoolName}
  examName={examName}
  className={className}
  subjectName={subjectName}
  examDate={examDate}
  duration={duration}
  totalMarks={totalMarks}
  instructions={instructions}
  template={template}
/>

</div>
<div className="mt-5">

<button
className="bg-blue-600 text-white px-4 py-2 rounded"
onClick={()=>{
localStorage.setItem(
"paperPreset",
JSON.stringify({
schoolName,
examName,
className,
subjectName,
examDate,
duration,
totalMarks
})
);
alert("Preset Saved");
}}
>
Save Preset
</button>
<button
  className="w-full bg-green-600 text-white py-3 rounded-lg mt-4"
  onClick={() => {
  const paper = {
  id: Date.now(),
  schoolName,
  examName,
  className,
  subjectName,
  examDate,
  title: paperTitle,
  instructions,
  time: duration,
  totalMarks,
  createdAt: new Date().toLocaleString(),
  template,          // ⭐ Add this line
  questions: paperQuestions,
};

    localStorage.setItem(
      "paperData",
      JSON.stringify(paper)
    );

    const saved = JSON.parse(
      localStorage.getItem("savedPapers") || "[]"
    );

    saved.unshift(paper);

    localStorage.setItem(
      "savedPapers",
      JSON.stringify(saved)
    );

    window.location.href = "/builders/preview";
  }}
>
  Generate Preview
</button>
<button
  onClick={saveDraft}
  className="bg-yellow-500 text-white px-4 py-2 rounded-lg w-full"
>
  💾 Save Draft
</button>
<button
  onClick={() => {
    localStorage.removeItem("paperDraft");
    alert("Draft Deleted");
  }}
  className="bg-red-600 text-white px-4 py-2 rounded-lg w-full"
>
  🗑 Clear Draft
</button>
</div>
</div>

</div>

</div>
</DashboardLayout>

<DragOverlay>

  {activeQuestion ? (

    <div className="w-[500px]">

      <QuestionCard
        question={activeQuestion}
      />

    </div>

  ) : null}

</DragOverlay>

</DndContext>

);

}