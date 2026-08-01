"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useState } from "react";
import { validateDataset } from "@/lib/validateDataset";
export default function UploadPage() {
  const [dataset, setDataset] = useState<any>(null);
const [error, setError] = useState("");
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">

        <h1 className="text-3xl font-bold">
          Upload Dataset
        </h1>

        <p className="text-gray-500">
          Upload JSON question banks for any board, class and subject.
        </p>

        <div className="border rounded-xl p-6 space-y-5">

          <div>
            <label className="font-medium">
              Board
            </label>

            <select className="border rounded-lg w-full p-3 mt-2">
              <option>CBSE</option>
              <option>ICSE</option>
              <option>Maharashtra</option>
              <option>JEE</option>
              <option>NEET</option>
            </select>
          </div>

          <div>
            <label className="font-medium">
              Class
            </label>

            <input
              className="border rounded-lg w-full p-3 mt-2"
              placeholder="Class IX"
            />
          </div>

          <div>
            <label className="font-medium">
              Subject
            </label>

            <input
              className="border rounded-lg w-full p-3 mt-2"
              placeholder="Mathematics"
            />
          </div>

          <div>
            <label className="font-medium">
              Upload JSON
            </label>

           
          <input
  type="file"
  accept=".json"
  className="mt-2"
  onChange={(e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const json = JSON.parse(
          event.target?.result as string
        );

       const errors = validateDataset(json);

if (errors.length) {
  setError(errors.join(", "));
  setDataset(null);
} else {
  setError("");
  setDataset(json);
}
        setError("");

      } catch {
        setDataset(null);
        setError("Invalid JSON file");
      }
    };

    reader.readAsText(file);
  }}
/>
          </div>

          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Upload Dataset
          </button>
{error && (
  <div className="text-red-600 font-medium">
    {error}
  </div>
)}

{dataset && (
  <div className="border rounded-lg p-4 mt-6 bg-green-50 space-y-2">

    <h2 className="font-bold text-lg">
      Dataset Loaded Successfully
    </h2>

    <p>
      <strong>Schema:</strong> {dataset.schema_version}
    </p>

    <p>
      <strong>Board:</strong>{" "}
      {dataset.board || dataset.collection?.curriculum}
    </p>

    <p>
      <strong>Subject:</strong>{" "}
      {dataset.subject || dataset.collection?.subject}
    </p>

    <p>
      <strong>Questions:</strong>{" "}
      {dataset.record_count ??
        dataset.records?.length ??
        0}
    </p>

  </div>
)}
        </div>

      </div>
    </DashboardLayout>
  );
}