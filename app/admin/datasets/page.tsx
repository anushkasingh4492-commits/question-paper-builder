"use client";

import DashboardLayout from "@/components/DashboardLayout";

const datasets = [
  {
    board: "CBSE",
    class: "IX",
    subject: "Mathematics",
    questions: 3592,
    updated: "30 Jul 2026",
  },
];

export default function DatasetPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div>
          <h1 className="text-3xl font-bold">
            Dataset Manager
          </h1>

          <p className="text-gray-500">
            View and manage uploaded datasets.
          </p>
        </div>

        <table className="w-full border rounded-lg overflow-hidden">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3 text-left">Board</th>

              <th className="p-3 text-left">Class</th>

              <th className="p-3 text-left">Subject</th>

              <th className="p-3 text-left">Questions</th>

              <th className="p-3 text-left">Updated</th>

              <th className="p-3 text-left">Actions</th>

            </tr>

          </thead>

          <tbody>

            {datasets.map((d, i) => (

              <tr key={i} className="border-t">

                <td className="p-3">{d.board}</td>

                <td className="p-3">{d.class}</td>

                <td className="p-3">{d.subject}</td>

                <td className="p-3">{d.questions}</td>

                <td className="p-3">{d.updated}</td>

                <td className="p-3 space-x-2">

                  <button className="px-3 py-1 bg-blue-600 text-white rounded">
                    View
                  </button>

                  <button className="px-3 py-1 bg-red-600 text-white rounded">
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </DashboardLayout>
  );
}