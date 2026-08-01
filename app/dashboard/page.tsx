"use client";

import { useMemo, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import CourseSelector from "@/components/dashboard/CourseSelector";
import ClassSelector from "@/components/dashboard/ClassSelector";
import { courses } from "@/lib/courseData";
import SubjectSelector from "@/components/dashboard/SubjectSelector";
import Link from "next/link";

export default function Dashboard() {
  const [selectedCourse, setSelectedCourse] = useState(courses[0].id);
  const [selectedClass, setSelectedClass] = useState("");
const [selectedSubject, setSelectedSubject] = useState("");
  const currentCourse = useMemo(
    () => courses.find((c) => c.id === selectedCourse),
    [selectedCourse]
  );
  const currentClass = currentCourse?.classes.find(
    (cls) => cls.name === selectedClass
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div>
          <h1 className="text-4xl font-bold">
            Question Paper Builder
          </h1>

          <p className="text-gray-500 mt-2">
            Select a course and class to begin.
          </p>
        </div>

        {/* Course */}

        <div>
          <h2 className="text-xl font-semibold mb-4">
            Select Course
          </h2>

          <CourseSelector
            selected={selectedCourse}
            onSelect={(course) => {
              setSelectedCourse(course);
              setSelectedClass("");
            }}
          />
        </div>

        {/* Class */}

        {currentCourse && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Select Class
            </h2>

            <ClassSelector
              classes={currentCourse.classes}
              selected={selectedClass}
              onSelect={(cls) => {
                setSelectedClass(cls);
                setSelectedSubject("");
              }}
            />

            {currentClass && (
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Select Subject
                </h2>

                <SubjectSelector
                  subjects={currentClass.subjects}
                  selected={selectedSubject}
                  onSelect={setSelectedSubject}
                />
              </div>
            )}
          </div>
        )}

        {/* Quick Actions */}

        {selectedSubject && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Quick Actions
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
<Link
  href="/create-paper"
  onClick={() => {
    localStorage.setItem(
      "selectedCourse",
      selectedCourse
    );

    localStorage.setItem(
      "selectedClass",
      selectedClass
    );

    localStorage.setItem(
      "selectedSubject",
      selectedSubject
    );
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
  onClick={() => {
    localStorage.setItem(
      "selectedCourse",
      selectedCourse
    );

    localStorage.setItem(
      "selectedClass",
      selectedClass
    );

    localStorage.setItem(
      "selectedSubject",
      selectedSubject
    );
  }}
>
                className="border rounded-xl p-6 hover:bg-blue-50"
              
                <h3 className="font-bold text-lg">
                  Question Builder
                </h3>

                <p className="text-gray-500 mt-2">
                  Drag & drop questions.
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
                href="/admin"
                className="border rounded-xl p-6 hover:bg-blue-50"
              >
                <h3 className="font-bold text-lg">
                  Admin
                </h3>

                <p className="text-gray-500 mt-2">
                  Manage courses and uploads.
                </p>
              </Link>

            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}