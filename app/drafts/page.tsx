"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";

export default function DraftsPage() {
  const router = useRouter();
  const [drafts, setDrafts] = useState<any[]>([]);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("paperDrafts") || "[]"
    );

    setDrafts(saved);
  }, []);

  function openDraft(draft: any) {
    localStorage.setItem(
      "paperDraft",
      JSON.stringify(draft)
    );

    router.push("/builders");
  }

  function deleteDraft(id: number) {
    const updated = drafts.filter(
      (d) => d.id !== id
    );

    setDrafts(updated);

    localStorage.setItem(
      "paperDrafts",
      JSON.stringify(updated)
    );
  }

  return (
    <DashboardLayout>
      <div className="bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-6">
          Saved Drafts
        </h1>

        {drafts.length === 0 && (
          <p>No drafts found.</p>
        )}

        {drafts.map((draft) => (
          <div
            key={draft.id}
            className="border rounded-lg p-4 mb-4 flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold">
                {draft.paperTitle}
              </h2>

              <p className="var(--color-text-muted)500">
                {draft.subjectName}
              </p>
            </div>

            <div className="flex gap-2">

              <button
                onClick={() => openDraft(draft)}
                className="bg-[#7a233b]600 text-white px-4 py-2 rounded"
              >
                Open
              </button>

              <button
                onClick={() => deleteDraft(draft.id)}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>
    </DashboardLayout>
  );
}