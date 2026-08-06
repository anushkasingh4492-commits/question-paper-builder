"use client";

import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import { getQuestions } from "@/lib/loader";
import { useEffect, useMemo, useState } from "react";

export default function CreatePaper() {

  const router = useRouter();
  const questions = getQuestions();

  const [board, setBoard] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [subject, setSubject] = useState("");

  const [paperType, setPaperType] = useState("Class Test");
  const [examGroup, setExamGroup] = useState("Internal");
  const [testName, setTestName] = useState("");

  const [selectedChapters, setSelectedChapters] = useState<string[]>([]);

const [showChapters, setShowChapters] = useState(false);
  // Load saved values
  useEffect(() => {

    const savedBoard = localStorage.getItem("board");
    const savedClass = localStorage.getItem("class");
    const savedSubject = localStorage.getItem("subject");

    if (savedBoard) setBoard(savedBoard);
    if (savedClass) setStudentClass(savedClass);
    if (savedSubject) setSubject(savedSubject);

  }, []);



  // -----------------------------
  // Dropdown Data
  // -----------------------------

  const boards = useMemo(() => {

    return [
      ...new Set(
        questions.map((q:any)=>q.curriculum)
      )
    ];

  }, [questions]);


const classes = Array.from(
  new Set(
    questions
      .map((q: any) => q.class)
      .filter(
        (c) => c !== undefined && c !== null && c !== ""
      )
  )
);





  const subjects = useMemo(() => {

    return [
      ...new Set(

        questions
        .filter((q:any)=>

          (!board || q.curriculum === board) &&

          (!studentClass ||
            q.class === Number(studentClass)
          )

        )
        .map((q:any)=>q.subject)

      )
    ];

  }, [
    questions,
    board,
    studentClass
  ]);




  const chapters = useMemo(() => {

    return [
      ...new Set(

        questions
        .filter((q:any)=>

          (!board ||
            q.curriculum === board
          )

          &&

          (!studentClass ||
            q.class === Number(studentClass)
          )

          &&

          (!subject ||
            q.subject === subject
          )

        )
        .map((q:any)=>
          q.chapter.title
        )

      )
    ];


  },[
    questions,
    board,
    studentClass,
    subject
  ]);




  // Select / Remove chapter

  const toggleChapter = (chapter:string)=>{

    setSelectedChapters((prev)=>

      prev.includes(chapter)

      ?
      prev.filter(
        c=>c!==chapter
      )

      :
      [
        ...prev,
        chapter
      ]

    );

  };


console.log(classes);

  return (

    <DashboardLayout>


      <div className="bg-white rounded-xl shadow p-8">


        <h1 className="text-3xl font-bold">
          Create Paper
        </h1>


        <p className="text-gray-500 mb-8">
          Assessment Creation Tool
        </p>



        {/* First Row */}

        <div className="grid grid-cols-3 gap-6">


          <div>

            <label className="font-medium">
              Board
            </label>


            <select

              className="w-full border rounded-lg p-3 mt-2"

              value={board}
onChange={(e) => {
  setShowChapters(false);
  setBoard(e.target.value);
}}

            >

              <option value="">
                Select Board
              </option>


              {
              boards.map((b: any, index: number) => (
  <option key={`${b}-${index}`} value={b}>
    {b}
  </option>
))
              }


            </select>


          </div>





          <div>


            <label className="font-medium">
              Class
            </label>


            <select

              className="w-full border rounded-lg p-3 mt-2"

              value={studentClass}
              onChange={(e) => {
                setShowChapters(false);
                setStudentClass(e.target.value);
              }}
            >

              <option value="">
                Select Class
              </option>


              
              {
  [...new Set(classes)].map((c: any) => (
    <option key={c} value={c}>
      {c}
    </option>
  ))
}

            </select>


          </div>






          <div>


            <label className="font-medium">
              Subject
            </label>


            <select

              className="w-full border rounded-lg p-3 mt-2"

              value={subject}
onChange={(e) => {
  setShowChapters(false);
  setSubject(e.target.value);
}}
            >


              <option value="">
                Select Subject
              </option>


              
               {
  [...new Set(subjects)].map((s: any) => (
    <option key={s} value={s}>
      {s}
    </option>
  ))
}
              


            </select>


          </div>


        </div>





        {/* Second Row */}


        <div className="grid grid-cols-2 gap-6 mt-6">


          <div>


            <label className="font-medium">
              Paper Type
            </label>


            <select

              className="w-full border rounded-lg p-3 mt-2"

              value={paperType}

              onChange={(e)=>
                setPaperType(e.target.value)
              }

            >

              <option>
                Class Test
              </option>

              <option>
                Unit Test
              </option>

              <option>
                Half Yearly
              </option>

              <option>
                Final Exam
              </option>


            </select>


          </div>





          <div>


            <label className="font-medium">
          Exam Group
            </label>


         <select
  value={examGroup}
  onChange={(e) => setExamGroup(e.target.value)}
  className="w-full border rounded-lg px-3 py-2"
>
  <option value="Assignment">Assignment</option>
  <option value="Test">Test</option>
</select>

            




          </div>


        </div>





        {/* Test Name */}


        <div className="mt-6">


          <label className="font-medium">
            Test Name
          </label>


          <input

            className="w-full border rounded-lg p-3 mt-2"

            placeholder="Enter Test Name"

            value={testName}

            onChange={(e)=>
              setTestName(e.target.value)
            }

          />


        </div>






        {/* Chapters */}


        <div className="mt-8">

  <h2 className="font-bold text-lg mb-3">
    Available Chapters
  </h2>

  {!showChapters ? (
    <button
      onClick={() => setShowChapters(true)}
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
    >
      Show Chapters
    </button>
  ) : (
    <>
      <div className="grid grid-cols-3 gap-3">
        {[...new Set(chapters)].map((chapter: any) => (
          <div
            key={chapter}
            onClick={() => toggleChapter(chapter)}
            className={`
              border rounded-lg p-3 cursor-pointer transition
              ${
                selectedChapters.includes(chapter)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-50 hover:bg-blue-50"
              }
            `}
          >
            {chapter}
          </div>
        ))}
      </div>

      <p className="mt-3 text-sm text-gray-500">
        Selected Chapters: {selectedChapters.length}
      </p>
    </>
  )}

          </div>



          <p className="mt-3 text-sm text-gray-500">

            Selected Chapters:
            {" "}
            {selectedChapters.length}

          </p>



        </div>





        {/* Button */}


        <div className="flex justify-end mt-8">


          <button


            onClick={()=>{


              localStorage.setItem(
                "selectedChapters",
                JSON.stringify(selectedChapters)
              );


              localStorage.setItem(
                "board",
                board
              );


              localStorage.setItem(
                "class",
                studentClass
              );


              localStorage.setItem(
                "subject",
                subject
              );


              localStorage.setItem(
                "paperType",
                paperType
              );


              localStorage.setItem(
                "testName",
                testName
              );


              router.push("/chapters");


            }}


            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"

          >

            Save & Proceed

          </button>


        </div>



     


    </DashboardLayout>

  );

}