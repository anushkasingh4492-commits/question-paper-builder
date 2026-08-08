"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { defaultTemplate } from "@/lib/defaultTemplate";

export default function TemplatesPage() {
  const [template, setTemplate] = useState(defaultTemplate);
const [headerOrder, setHeaderOrder] = useState([
  "School Name",
  "Paper Title",
  "Class",
  "Subject",
  "Date",
  "Duration",
  "Total Marks",
]);
const [presets, setPresets] = useState<any[]>([]);
useEffect(() => {
  const saved = localStorage.getItem("paperTemplate");

  if (saved) {
    const parsed = JSON.parse(saved);

    setTemplate(parsed);

    if (parsed.headerOrder) {
      setHeaderOrder(parsed.headerOrder);
    }
  }

  const savedPresets = JSON.parse(
    localStorage.getItem("paperPresets") || "[]"
  );

  setPresets(savedPresets);

}, []);

function saveTemplate() {
  const presetName =
    prompt("Enter Preset Name");

  if (!presetName) return;

  const presets = JSON.parse(
    localStorage.getItem("paperPresets") || "[]"
  );

  presets.push({
    id: Date.now(),
    name: presetName,
    template,
    headerOrder,
  });

  localStorage.setItem(
    "paperPresets",
    JSON.stringify(presets)
  );
setPresets(presets);
  alert("Preset Saved!");
}
  return (
    <DashboardLayout>
      <div className="rounded-[14px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)]">

        <h1
          style={{ fontFamily: "Source Serif 4, serif" }}
          className="text-3xl font-bold mb-2 text-[var(--color-text)]"
        >
          Customize Template
        </h1>

        <p className="text-[var(--color-text-muted)] mb-8">
          Personalize your default question paper template.
        </p>

        <div className="grid grid-cols-2 gap-8">

          {/* Left Side */}

          <div className="space-y-6">

            {/* School Name */}

            <div>
              <label className="font-medium block mb-2 text-[var(--color-text)]">
                School Name
              </label>

              <input
                className="w-full rounded-[8px] border border-[var(--color-border)] bg-[var(--color-paper-0)] p-3 text-sm text-[var(--color-text)] outline-none transition-colors focus:border-[var(--color-brand)]"
                value={template.schoolName}
                onChange={(e) =>
                  setTemplate({
                    ...template,
                    schoolName: e.target.value,
                  })
                }
              />
            </div>

            {/* Header Color */}

            <div>
              <label className="font-medium block mb-2">
                Header Color
              </label>
{/* Header Color */}

<div>
  <label className="font-medium block mb-2">
    Header Color
  </label>

  <div className="flex flex-wrap gap-3">

    {[
      "#2563eb",
      "#dc2626",
      "#16a34a",
      "#7c3aed",
      "#ea580c",
      "#0891b2",
      "#1f2937",
      "#be123c",
      "#ca8a04",
      "#000000",
    ].map((color) => (
      <button
        key={color}
        type="button"
        onClick={() =>
          setTemplate({
            ...template,
            headerColor: color,
          })
        }
        className="w-10 h-10 rounded-full border-2"
        style={{
          backgroundColor: color,
        }}
      />
    ))}

  </div>

  <input
    type="color"
    className="mt-4 w-full rounded-[8px] border border-[var(--color-border)] bg-[var(--color-paper-0)] p-3 text-sm text-[var(--color-text)] outline-none transition-colors focus:border-[var(--color-brand)]"
    value={template.headerColor}
    onChange={(e) =>
      setTemplate({
        ...template,
        headerColor: e.target.value,
      })
    }
  />

  <input
    className="w-full rounded-[8px] border border-[var(--color-border)] bg-[var(--color-paper-0)] p-3 text-sm text-[var(--color-text)] outline-none transition-colors focus:border-[var(--color-brand)] mt-3"
    placeholder="#2563EB"
    value={template.headerColor}
    onChange={(e) =>
      setTemplate({
        ...template,
        headerColor: e.target.value,
      })
    }
  />
</div>

            </div>

            {/* Font */}

            <div>
              <label className="font-medium block mb-2">
                Font Family
              </label>

              <select
                className="w-full rounded-[8px] border border-[var(--color-border)] bg-[var(--color-paper-0)] p-3 text-sm text-[var(--color-text)] outline-none transition-colors focus:border-[var(--color-brand)]"
                value={template.fontFamily}
                onChange={(e) =>
                  setTemplate({
                    ...template,
                    fontFamily: e.target.value,
                  })
                }
              >
                <option>Times New Roman</option>
                <option>Arial</option>
                <option>Calibri</option>
                <option>Georgia</option>
              </select>
            </div>

            {/* Question Font */}

            <div>
              <label className="font-medium block mb-2">
                Question Font Size
              </label>

              <input
                type="range"
                min="12"
                max="22"
                value={template.questionFont}
                onChange={(e) =>
                  setTemplate({
                    ...template,
                    questionFont: Number(e.target.value),
                  })
                }
              />

              <span className="ml-3">
                {template.questionFont}px
              </span>
            </div>

            {/* Heading Font */}

            <div>
              <label className="font-medium block mb-2">
                Heading Font Size
              </label>

              <input
                type="range"
                min="18"
                max="40"
                value={template.headingFont}
                onChange={(e) =>
                  setTemplate({
                    ...template,
                    headingFont: Number(e.target.value),
                  })
                }
              />

              <span className="ml-3">
                {template.headingFont}px
              </span>
            </div>

            {/* Spacing */}

            <div>
              <label className="font-medium block mb-2">
                Question Spacing
              </label>

              <select
                className="w-full rounded-[8px] border border-[var(--color-border)] bg-[var(--color-paper-0)] p-3 text-sm text-[var(--color-text)] outline-none transition-colors focus:border-[var(--color-brand)]"
                value={template.spacing}
                onChange={(e) =>
                  setTemplate({
                    ...template,
                    spacing: e.target.value,
                  })
                }
              >
                <option value="compact">Compact</option>
                <option value="normal">Normal</option>
                <option value="spacious">Spacious</option>
              </select>
            </div>

            {/* Margin */}

            <div>
              <label className="font-medium block mb-2">
                Page Margin
              </label>

              <select
                className="w-full rounded-[8px] border border-[var(--color-border)] bg-[var(--color-paper-0)] p-3 text-sm text-[var(--color-text)] outline-none transition-colors focus:border-[var(--color-brand)]"
                value={template.margin}
                onChange={(e) =>
                  setTemplate({
                    ...template,
                    margin: e.target.value,
                  })
                }
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>

            {/* Footer */}

            <div>
              <label className="font-medium block mb-2">
                Footer Text
              </label>

              <input
                className="w-full rounded-[8px] border border-[var(--color-border)] bg-[var(--color-paper-0)] p-3 text-sm text-[var(--color-text)] outline-none transition-colors focus:border-[var(--color-brand)]"
                value={template.footer}
                onChange={(e) =>
                  setTemplate({
                    ...template,
                    footer: e.target.value,
                  })
                }
              />
            </div>

            {/* Checkboxes */}

            <div className="space-y-3">

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={template.showMarks}
                  onChange={(e) =>
                    setTemplate({
                      ...template,
                      showMarks: e.target.checked,
                    })
                  }
                />
                Show Marks
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={template.showPageNumbers}
                  onChange={(e) =>
                    setTemplate({
                      ...template,
                      showPageNumbers: e.target.checked,
                    })
                  }
                />
                Show Page Numbers
              </label>

            </div>

<div className="mt-8 border-t border-[var(--color-border)] pt-6">

  <h2
    style={{ fontFamily: "Source Serif 4, serif" }}
    className="text-2xl font-bold mb-4 text-[var(--color-text)]"
  >
    Saved Presets
  </h2>

  <select
    className="w-full rounded-[8px] border border-[var(--color-border)] bg-[var(--color-paper-0)] p-3 text-sm text-[var(--color-text)] outline-none transition-colors focus:border-[var(--color-brand)]"
    defaultValue=""
    onChange={(e) => {
      const preset = presets.find(
        (p) => p.id === Number(e.target.value)
      );

      if (!preset) return;

      setTemplate(preset.template);
      setHeaderOrder(
        preset.headerOrder || headerOrder
      );
    }}
  >
    <option value="">
      Select Preset
    </option>

    {presets.map((preset) => (
      <option
        key={preset.id}
        value={preset.id}
      >
        {preset.name}
      </option>
    ))}
  </select>

  <button
    className="mt-4 rounded-[8px] border border-[var(--color-board-tag)] px-4 py-2 text-sm font-medium text-[var(--color-board-tag)] transition-colors hover:bg-[var(--color-board-tag)] hover:text-white"
    onClick={() => {
      const name = prompt("Enter preset name to delete");

      if (!name) return;

      const updated = presets.filter(
        (p) => p.name !== name
      );

      setPresets(updated);

      localStorage.setItem(
        "paperPresets",
        JSON.stringify(updated)
      );

      alert("Preset Deleted!");
    }}
  >
    Delete Preset
  </button>

</div>
            <button
              onClick={saveTemplate}
              className="bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] text-white px-8 py-3 rounded-[8px]"
            >
              Save Template
            </button>

          </div>

          {/* Preview */}

          <div className="rounded-[14px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)]">

            <div
              style={{
                color: template.headerColor,
                fontFamily: template.fontFamily,
              }}
            >
              <h1
                style={{
                  fontSize: template.headingFont,
                }}
                className="font-bold"
              >
                {template.schoolName}
              </h1>

              <p>Unit Test</p>

              <hr className="my-4" />

              <div
                style={{
                  fontSize: template.questionFont,
                }}
              >
                <p>Q1. What is photosynthesis?</p>

                {template.showMarks && (
                  <p>(5 Marks)</p>
                )}

                <br />

                <p>Q2. Define ecosystem.</p>

                {template.showMarks && (
                  <p>(3 Marks)</p>
                )}
              </div>

              <hr className="my-6" />

              <div className="flex justify-between">

                <span>{template.footer}</span>

                {template.showPageNumbers && (
                  <span>Page 1</span>
                )}

              </div>

            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}