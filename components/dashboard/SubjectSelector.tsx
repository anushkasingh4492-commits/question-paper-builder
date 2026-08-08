
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
    <div className="grid gap-3 sm:grid-cols-2">
      {subjects.map((subject) => {
        const isSelected = selected === subject;

        return (
          <button
            key={subject}
            type="button"
            onClick={() => onSelect(subject)}
            className={`rounded-[8px] border px-4 py-3 text-left text-sm font-medium transition-colors duration-150 ${
              isSelected
                ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-white"
                : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-brand)] hover:bg-[var(--color-paper-50)]"
            }`}
          >
            {subject}
          </button>
        );
      })}
    </div>
  );
}

