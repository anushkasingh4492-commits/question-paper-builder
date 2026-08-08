"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SortableQuestion({
  question,
  children,
}: {
  question: any;
  children: React.ReactNode;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: question.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="relative"
    >
      {/* Drag handle */}
      <div
        {...listeners}
        className="cursor-grab select-none var(--color-text-muted)400 mb-2"
      >
        ☰ Drag
      </div>

      {children}
    </div>
  );
}