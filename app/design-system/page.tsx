import Link from "next/link";

export default function DesignSystemPage() {
  return (
    <main style={{ padding: "2rem", background: "var(--color-paper-50)", minHeight: "100vh" }}>
      <div className="pt-card" style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          <div>
            <p className="pt-badge">Paper Tree Design System</p>
            <h1 className="pt-card-title">Academic, warm, and print-first</h1>
            <p className="pt-card-subtitle">The system pairs a maroon brand with warm paper surfaces, serif study typography, and restrained software UI.</p>
          </div>
          <Link href="/" className="pt-button-outline">Back to app</Link>
        </div>

        <section style={{ marginTop: "2rem", display: "grid", gap: "1rem" }}>
          <div className="pt-card" style={{ padding: "1.25rem" }}>
            <h2 style={{ fontSize: "1.25rem", marginBottom: "0.75rem" }}>Buttons and tags</h2>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
              <button className="pt-button">Primary action</button>
              <button className="pt-button-secondary">Secondary action</button>
              <button className="pt-button-outline">Outline action</button>
              <button className="pt-button-ghost">Ghost action</button>
              <span className="pt-tag">PYQ</span>
              <span className="pt-badge">Board pattern</span>
            </div>
          </div>

          <div className="pt-card" style={{ padding: "1.25rem" }}>
            <h2 style={{ fontSize: "1.25rem", marginBottom: "0.75rem" }}>Form controls</h2>
            <div style={{ display: "grid", gap: "0.9rem", maxWidth: 420 }}>
              <input className="pt-input" placeholder="Paper title" />
              <select className="pt-select" defaultValue="" aria-label="Select board">
                <option value="" disabled>Select board</option>
                <option value="cbse">CBSE</option>
                <option value="icse">ICSE</option>
              </select>
              <label className="pt-checkbox">
                <input type="checkbox" defaultChecked />
                <span>Include answer key</span>
              </label>
              <label className="pt-radio">
                <input type="radio" name="mode" defaultChecked />
                <span>Question bank</span>
              </label>
              <label className="pt-switch">
                <input type="checkbox" defaultChecked />
                <span>Publish draft</span>
              </label>
            </div>
          </div>

          <div className="pt-card" style={{ padding: "1.25rem" }}>
            <h2 style={{ fontSize: "1.25rem", marginBottom: "0.75rem" }}>Software UI primitives</h2>
            <div style={{ display: "grid", gap: "0.75rem", maxWidth: 480 }}>
              <div className="pt-toast">Saved changes to the draft.</div>
              <div className="pt-tooltip">Question bank updated</div>
              <div className="pt-dialog">
                <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.125rem" }}>Confirm paper export</h3>
                <p style={{ margin: "0 0 0.75rem" }}>Export the current paper in the selected board pattern.</p>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button className="pt-button">Export</button>
                  <button className="pt-button-ghost">Cancel</button>
                </div>
              </div>
              <div className="pt-tabs">
                <button className="pt-tab active">Details</button>
                <button className="pt-tab">Questions</button>
                <button className="pt-tab">Preview</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
