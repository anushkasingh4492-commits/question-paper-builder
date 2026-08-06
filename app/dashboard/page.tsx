"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import DashboardLayout from "@/components/DashboardLayout";
import CourseSelector from "@/components/dashboard/CourseSelector";
import ClassSelector from "@/components/dashboard/ClassSelector";
import SubjectSelector from "@/components/dashboard/SubjectSelector";
import ChapterSelector from "@/components/dashboard/chapterselector";

import {
  getBoards,
  getClasses,
  getSubjects,
  getChapters,
} from "@/lib/dashboard";

export default function Dashboard() {
const allBoards = getBoards() as string[];


const [boards] = useState<string[]>(allBoards);

const [allowedCourses, setAllowedCourses] = useState<string[]>([]);

useEffect(() => {
  const saved = JSON.parse(
    localStorage.getItem("allowedCourses") || "[]"
  );

  setAllowedCourses(saved);
}, []);
const [selectedBoard, setSelectedBoard] =
useState("");
useEffect(() => {
  if (boards.length && !selectedBoard) {
    setSelectedBoard(boards[0]);
  }
}, [boards]);

const classes = getClasses(selectedBoard) as string[];

const [selectedClass, setSelectedClass] = useState(classes[0] ?? "");

const subjects = getSubjects(selectedBoard, selectedClass) as string[];

const [selectedSubject, setSelectedSubject] = useState(subjects[0] ?? "");

const chapters = getChapters(selectedSubject) as string[];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold">
            Question Paper Builder
          </h1>

          <p className="text-gray-500 mt-2">
            Select Board, Class, Subject and Chapter.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">
            Select Board
          </h2>
<CourseSelector
  courses={boards}
  allowedCourses={allowedCourses}
  selected={selectedBoard}
  onSelect={(board) => {

    const newClasses = getClasses(board) as string[];
    setSelectedClass(newClasses[0] ?? "");
    const newSubjects = getSubjects(board, newClasses[0]) as string[];
    setSelectedSubject(newSubjects[0] ?? "");
  }}
/>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">
            Select Class
          </h2>

          <ClassSelector
  classes={classes}
  selected={selectedClass}
  onSelect={(cls) => {
    setSelectedClass(cls);

    const newSubjects = getSubjects(selectedBoard, cls) as string[];
    setSelectedSubject(newSubjects[0] ?? "");
  }}
/>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">
            Select Subject
          </h2>

         <SubjectSelector
  subjects={subjects}
  selected={selectedSubject}
  onSelect={setSelectedSubject}
/>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">
            Select Chapter
          </h2>

          <ChapterSelector chapters={chapters} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">
            Quick Actions
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
<Link
  href="/create-paper"
  onClick={() => {
    localStorage.setItem("board", selectedBoard);
    localStorage.setItem("class", selectedClass);
    localStorage.setItem("subject", selectedSubject);
  }}
  className="border rounded-xl p-6 hover:bg-blue-50"
>
  <h3 className="font-bold text-lg">
    Create Paper
  </h3>

  <p className="text-gray-500 mt-2">
    Build a new question paper.
  </p>
</Link>
    
            <Link
              href="/builders"
              className="border rounded-xl p-6 hover:bg-blue-50"
            >
              <h3 className="font-bold text-lg">
                Question Builder
              </h3>

              <p className="text-gray-500 mt-2">
                Drag & Drop Questions
              </p>
            </Link>

            <Link
              href="/papers"
              className="border rounded-xl p-6 hover:bg-blue-50"
            >
              <h3 className="font-bold text-lg">
                Saved Papers
              </h3>

              <p className="text-gray-500 mt-2">
                View generated papers.
              </p>
            </Link>

            <Link
              href="/admin/uploads"
              className="border rounded-xl p-6 hover:bg-blue-50"
            >
              <h3 className="font-bold text-lg">
                Upload Dataset
              </h3>

              <p className="text-gray-500 mt-2">
                Upload new question banks.
              </p>
            </Link>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}