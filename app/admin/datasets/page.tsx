"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { getDatasets } from "@/lib/datasetStore";
const datasets = getDatasets();
export default function DatasetPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div>
          <h1 className="text-3xl font-bold">
            Dataset Manager
          </h1>

          <p className="var(--color-text-muted)500">
            View and manage uploaded datasets.
          </p>
        </div>

        <table className="w-full border rounded-lg overflow-hidden">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3 text-left">course</th>

              <th className="p-3 text-left">Class</th>

              <th className="p-3 text-left">Subject</th>

              <th className="p-3 text-left">Questions</th>

              <th className="p-3 text-left">Updated</th>

              <th className="p-3 text-left">Actions</th>

            </tr>

          </thead>

         <tbody>
  {datasets.length === 0 ? (
    <tr>
      <td
        colSpan={6}
        className="p-6 text-center var(--color-text-muted)500"
      >
        No datasets uploaded yet.
      </td>
    </tr>
  ) : (
    datasets.map((d, index) => (
      <tr key={index} className="border-t">

        <td className="p-3">
          {d.course || d.collection?.curriculum}
        </td>

        <td className="p-3">
          {d.class || d.collection?.class}
        </td>

        <td className="p-3">
          {d.subject || d.collection?.subject}
        </td>

        <td className="p-3">
          {d.record_count ??
            d.records?.length ??
            0}
        </td>

        <td className="p-3">
          {d.generated_on || "-"}
        </td>

        <td className="p-3 space-x-2">

          <button className="px-3 py-1 bg-[#7a233b]600 text-white rounded">
            View
          </button>

          <button className="px-3 py-1 bg-red-600 text-white rounded">
            Delete
          </button>

        </td>

      </tr>
    ))
  )}
</tbody>

        </table>

      </div>
    </DashboardLayout>
  );
}