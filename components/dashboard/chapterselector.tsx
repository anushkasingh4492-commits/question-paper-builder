
"use client";

interface Props {
  chapters: string[];
}

export default function ChapterSelector({ chapters }: Props) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
      {chapters.map((chapter) => (
        <button
          key={chapter}
          type="button"
          className="rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] p-3 text-left text-sm text-[var(--color-text)] transition-colors duration-150 hover:border-[var(--color-brand)] hover:bg-[var(--color-paper-50)]"
        >
          {chapter}
        </button>
      ))}
    </div>
  );
}

