"use client";

interface ClassItem {
  name: string;
  subjects: string[];
}

interface Props {
  classes: ClassItem[];
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
          key={cls.name}
          onClick={() => onSelect(cls.name)}
          className={`rounded-lg border p-4 ${
            selected === cls.name
              ? "bg-green-600 text-white"
              : "bg-white"
          }`}
        >
          {cls.name}
        </button>
      ))}
    </div>
  );
}