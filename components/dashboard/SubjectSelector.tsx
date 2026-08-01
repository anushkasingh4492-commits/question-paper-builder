"use client";

interface Props {
  subjects: string[];
  selected: string;
  onSelect: (subject: string) => void;
}

export default function SubjectSelector({
  subjects,
  selected,
  onSelect,
}: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
      {subjects.map((subject) => (
        <button
          key={subject}
          onClick={() => onSelect(subject)}
          className={`rounded-xl border p-5 transition ${
            selected === subject
              ? "bg-purple-600 text-white"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          {subject}
        </button>
      ))}
    </div>
  );
}