"use client";

interface Props {
  classes: string[];
  selected: string;
  onSelect: (cls: string) => void;
}

export default function ClassSelector({
  classes,
  selected,
  onSelect,
}: Props) {
  return (
    <div className="grid grid-cols-3 gap-3 mt-6">
      {classes.map((cls) => (
        <button
          key={cls}
          onClick={() => onSelect(cls)}
          className={`rounded-lg border p-4 ${
            selected === cls
              ? "bg-green-600 text-white"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          {cls}
        </button>
      ))}
    </div>
  );
}