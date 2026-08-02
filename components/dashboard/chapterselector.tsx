"use client";

interface Props {
  chapters: string[];
}

export default function ChapterSelector({ chapters }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
      {chapters.map((chapter) => (
        <button
          key={chapter}
          className="border rounded-lg p-3 hover:bg-blue-100"
        >
          {chapter}
        </button>
      ))}
    </div>
  );
}