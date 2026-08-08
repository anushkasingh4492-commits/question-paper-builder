
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
    <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
      {classes.map((cls) => {
        const isSelected = selected === cls;

        return (
          <button
            key={cls}
            type="button"
            onClick={() => onSelect(cls)}
            className={`rounded-[8px] border px-4 py-3 text-sm font-medium transition-colors duration-150 ${
              isSelected
                ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-white"
                : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-brand)] hover:bg-[var(--color-paper-50)]"
            }`}
          >
            {cls}
          </button>
        );
      })}
    </div>
  );
}

