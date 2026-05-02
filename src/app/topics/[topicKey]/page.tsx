"use client";
import { use, useEffect, useState, useCallback } from "react";
import { TOPIC_META } from "@/lib/data";
import { PROBLEMS } from "@/lib/problems";
import { TOPIC_CONTENT } from "@/lib/content";

type DbProblem = { id: string; number: number; title: string; difficulty: string; pattern: string; lcUrl: string };
type Progress = { problemId: string; topicKey: string; number: number };

// ── simple markdown renderer ──────────────────────────────────────
function renderMd(text: string) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    // code block line
    if (line.startsWith("```") || line.startsWith("    ")) {
      return <pre key={i} style={{ fontFamily: "monospace", fontSize: 12, background: "var(--bg3)", padding: "2px 8px", borderRadius: 4, overflowX: "auto", margin: "2px 0", whiteSpace: "pre" }}>{line.replace(/^```[a-z]*/, "").replace(/^    /, "")}</pre>;
    }
    // blank line
    if (!line.trim()) return <div key={i} style={{ height: 8 }} />;
    // parse inline bold/code
    const parts = line.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
    return (
      <div key={i} style={{ lineHeight: 1.7, marginBottom: 1 }}>
        {parts.map((p, j) => {
          if (p.startsWith("**") && p.endsWith("**")) return <strong key={j}>{p.slice(2, -2)}</strong>;
          if (p.startsWith("`") && p.endsWith("`")) return <code key={j} style={{ background: "var(--bg3)", padding: "1px 5px", borderRadius: 3, fontFamily: "monospace", fontSize: 12 }}>{p.slice(1, -1)}</code>;
          return <span key={j}>{p}</span>;
        })}
      </div>
    );
  });
}

export default function TopicPage({ params }: { params: Promise<{ topicKey: string }> }) {
  const { topicKey } = use(params);

  // ── guard: unknown topic ─────────────────────────────────────────
  const meta = TOPIC_META[topicKey];
  const content = TOPIC_CONTENT[topicKey];
  const localProblems = PROBLEMS[topicKey] || [];

  const [dbProblems, setDbProblems] = useState<DbProblem[]>([]);
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [filter, setFilter] = useState<"all" | "easy" | "medium" | "hard" | "done" | "todo">("all");
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"problems" | "concepts" | "resources">("problems");
  const [openConceptIdx, setOpenConceptIdx] = useState<number | null>(null);
  const [openSectionIdx, setOpenSectionIdx] = useState<number | null>(null);
  const [noteModal, setNoteModal] = useState<{ problemId: string; title: string } | null>(null);
  const [noteContent, setNoteContent] = useState("");
  const [noteSaving, setNoteSaving] = useState(false);
  const [notes, setNotes] = useState<Record<string, string>>({});

  // ── 404 page if topic not recognised ────────────────────────────
  if (!meta) {
    return (
      <div style={{ padding: 40, textAlign: "center", color: "var(--t2)" }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Topic not found</h2>
        <p style={{ fontSize: 13 }}>The topic <code style={{ background: "var(--bg2)", padding: "2px 6px", borderRadius: 4 }}>{topicKey}</code> doesn't exist yet.</p>
      </div>
    );
  }

  useEffect(() => {
    fetch(`/api/problems?topic=${topicKey}`).then(r => r.json()).then(d => {
      if (Array.isArray(d) && d.length > 0) setDbProblems(d);
    }).catch(() => { });
    fetch(`/api/progress?topic=${topicKey}`).then(r => r.json()).then((d: Progress[]) => {
      if (Array.isArray(d)) {
        const map: Record<string, boolean> = {};
        d.forEach(p => { map[`${p.topicKey}_${p.number}`] = true; });
        setProgress(map);
      }
    });
  }, [topicKey]);

  const toggleSolved = useCallback(async (prob: typeof localProblems[0]) => {
    const key = `${topicKey}_${prob.number}`;
    const wasSolved = progress[key];
    setProgress(prev => ({ ...prev, [key]: !wasSolved }));
    const dbP = dbProblems.find(p => p.number === prob.number);
    if (!dbP) return;
    await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ problemId: dbP.id, solved: !wasSolved }),
    });
  }, [progress, topicKey, dbProblems]);

  const openNote = useCallback(async (prob: typeof localProblems[0]) => {
    const dbP = dbProblems.find(p => p.number === prob.number);
    if (!dbP) return;
    setNoteModal({ problemId: dbP.id, title: prob.title });
    setNoteContent(notes[dbP.id] || "");
    try {
      const r = await fetch(`/api/notes?problemId=${dbP.id}`);
      const d = await r.json();
      setNoteContent(d.content || "");
      setNotes(prev => ({ ...prev, [dbP.id]: d.content || "" }));
    } catch { }
  }, [dbProblems, notes]);

  const saveNote = useCallback(async () => {
    if (!noteModal) return;
    setNoteSaving(true);
    await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ problemId: noteModal.problemId, content: noteContent }),
    });
    setNotes(prev => ({ ...prev, [noteModal.problemId]: noteContent }));
    setNoteSaving(false);
    setNoteModal(null);
  }, [noteModal, noteContent]);

  const filtered = localProblems.filter(p => {
    const key = `${topicKey}_${p.number}`;
    if (filter === "easy") return p.difficulty === "easy";
    if (filter === "medium") return p.difficulty === "medium";
    if (filter === "hard") return p.difficulty === "hard";
    if (filter === "done") return progress[key];
    if (filter === "todo") return !progress[key];
    return true;
  }).filter(p => !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.pattern.toLowerCase().includes(search.toLowerCase()));

  const total = localProblems.length;
  const done = localProblems.filter(p => progress[`${topicKey}_${p.number}`]).length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div style={{ padding: 24, maxWidth: 1000 }}>
      {/* ── Header ─────────────────────────────────────────────── */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 22 }}>{meta.icon}</span>
          <h1 style={{ fontSize: 22, fontWeight: 600 }}>{meta.name}</h1>
          <span className="badge badge-blue" style={{ marginLeft: 4 }}>{done}/{total}</span>
        </div>
        <p style={{ color: "var(--t2)", fontSize: 13 }}>{meta.sub}</p>
        <div style={{ marginTop: 10, height: 6, background: "var(--bg3)", borderRadius: 3, overflow: "hidden", maxWidth: 400 }}>
          <div style={{ height: "100%", width: `${pct}%`, background: pct === 100 ? "var(--green)" : "var(--blue)", borderRadius: 3, transition: "width .4s" }} />
        </div>
        <div style={{ fontSize: 11, color: "var(--t2)", marginTop: 4 }}>Weeks {meta.timelineWeeks[0]}–{meta.timelineWeeks[1]} of the 12-week plan</div>
      </div>

      {/* ── Tabs ────────────────────────────────────────────────── */}
      <div style={{ display: "flex", gap: 2, borderBottom: "var(--bd)", marginBottom: 20 }}>
        {(["problems", "concepts", "resources"] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            padding: "8px 18px", background: "none", border: "none",
            borderBottom: `2px solid ${activeTab === tab ? "var(--green)" : "transparent"}`,
            color: activeTab === tab ? "var(--green)" : "var(--t2)",
            fontWeight: activeTab === tab ? 600 : 400,
            marginBottom: -1, cursor: "pointer", textTransform: "capitalize", fontSize: 14,
          }}>{tab}</button>
        ))}
      </div>

      {/* ══════════════ PROBLEMS TAB ════════════════════════════ */}
      {activeTab === "problems" && (
        <>
          <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
            {(["all", "easy", "medium", "hard", "done", "todo"] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={filter === f ? "btn-primary" : "btn-secondary"}
                style={{ padding: "4px 12px", fontSize: 12 }}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
            <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--t2)", alignSelf: "center" }}>
              {filtered.length} problem{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search problems or patterns..."
            style={{ width: "100%", padding: "8px 12px", border: "var(--bd)", borderRadius: "var(--radius)", background: "var(--bg2)", color: "var(--t1)", marginBottom: 12, outline: "none" }}
          />
          <div className="card" style={{ overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "var(--bd)", background: "var(--bg2)" }}>
                  <th style={{ ...TH, width: 36 }}></th>
                  <th style={{ ...TH, width: 36 }}>#</th>
                  <th style={TH}>Problem</th>
                  <th style={TH}>Difficulty</th>
                  <th style={TH}>Pattern</th>
                  <th style={{ ...TH, width: 40 }}>Note</th>
                  <th style={{ ...TH, width: 60 }}>Link</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={7} style={{ textAlign: "center", padding: 24, color: "var(--t3)", fontSize: 13 }}>No problems match filter.</td></tr>
                )}
                {filtered.map(p => {
                  const key = `${topicKey}_${p.number}`;
                  const solved = progress[key];
                  const dbP = dbProblems.find(d => d.number === p.number);
                  const hasNote = dbP && notes[dbP.id];
                  return (
                    <tr key={p.number} style={{ borderBottom: "var(--bd)", opacity: solved ? 0.65 : 1, transition: "opacity .2s" }}>
                      <td style={{ padding: "8px 12px" }}>
                        <button onClick={() => toggleSolved(p)} style={{
                          width: 20, height: 20, borderRadius: 4,
                          border: `1.5px solid ${solved ? "var(--green)" : "var(--t3)"}`,
                          background: solved ? "var(--green)" : "transparent",
                          color: "#fff", fontSize: 11, cursor: "pointer",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>{solved ? "✓" : ""}</button>
                      </td>
                      <td style={{ ...TD, color: "var(--t3)", fontSize: 12 }}>{p.number}</td>
                      <td style={{ ...TD, fontWeight: 500, textDecoration: solved ? "line-through" : "none" }}>{p.title}</td>
                      <td style={TD}><span className={`badge badge-${p.difficulty}`}>{p.difficulty}</span></td>
                      <td style={{ ...TD, color: "var(--t2)", fontSize: 12 }}>{p.pattern}</td>
                      <td style={TD}>
                        <button onClick={() => openNote(p)} title={hasNote ? "Edit note" : "Add note"}
                          style={{ background: "none", border: "none", fontSize: 15, cursor: "pointer", color: hasNote ? "var(--amber)" : "var(--t3)" }}>
                          {hasNote ? "📝" : "✏️"}
                        </button>
                      </td>
                      <td style={TD}>
                        <a href={p.lcUrl} target="_blank" rel="noreferrer"
                          style={{ color: "var(--blue)", fontSize: 12, fontWeight: 500 }}>LC →</a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* ══════════════ CONCEPTS TAB ════════════════════════════ */}
      {activeTab === "concepts" && (
        <div>
          {/* Quick stats bar */}
          {content && (
            <div className="card" style={{ padding: "14px 18px", marginBottom: 16, borderLeft: "3px solid var(--green)" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--green)", marginBottom: 4 }}>⚡ Core Insight</div>
              <div style={{ fontSize: 13, lineHeight: 1.7 }}>{content.keyInsight}</div>
            </div>
          )}

          {/* TLDR */}
          {content && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
              <div className="card" style={{ padding: "12px 16px" }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "var(--t2)", marginBottom: 6, textTransform: "uppercase", letterSpacing: ".4px" }}>When To Use</div>
                {content.whenToUse.map((w, i) => (
                  <div key={i} style={{ fontSize: 12, padding: "3px 0", borderBottom: i < content.whenToUse.length - 1 ? "var(--bd)" : "none", color: "var(--t1)" }}>
                    <span style={{ color: "var(--green)", marginRight: 6 }}>→</span>{w}
                  </div>
                ))}
              </div>
              <div className="card" style={{ padding: "12px 16px" }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "var(--t2)", marginBottom: 6, textTransform: "uppercase", letterSpacing: ".4px" }}>Complexity</div>
                <div style={{ fontSize: 12, marginBottom: 4 }}><span style={{ fontWeight: 600, color: "var(--green)" }}>Time: </span>{content.complexity.time}</div>
                <div style={{ fontSize: 12, marginBottom: 4 }}><span style={{ fontWeight: 600, color: "var(--blue)" }}>Space: </span>{content.complexity.space}</div>
                <div style={{ fontSize: 11, color: "var(--t2)", fontStyle: "italic", marginTop: 6 }}>{content.complexity.note}</div>
              </div>
            </div>
          )}

          {/* Concept list — each clickable, expands to relevant deep-dive section */}
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Key Concepts</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>
            {meta.concepts.map((concept, ci) => {
              const isOpen = openConceptIdx === ci;
              // Map concept to the best matching content section
              return (
                <div key={ci} className="card" style={{ overflow: "hidden", transition: "all .2s" }}>
                  <button
                    onClick={() => setOpenConceptIdx(isOpen ? null : ci)}
                    style={{
                      width: "100%", display: "flex", alignItems: "center", gap: 12,
                      padding: "13px 16px", background: "none", border: "none",
                      cursor: "pointer", textAlign: "left",
                    }}
                  >
                    <div style={{
                      width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
                      background: isOpen ? "var(--green)" : "var(--green-bg)",
                      color: isOpen ? "#fff" : "var(--green)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11, fontWeight: 700, transition: "all .2s",
                    }}>{ci + 1}</div>
                    <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: "var(--t1)" }}>{concept}</span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Code Template */}
          {content?.template && (
            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>📋 Code Template / Pattern</h3>
              <div className="card" style={{ overflow: "hidden" }}>
                <div style={{ padding: "8px 16px", background: "var(--bg3)", borderBottom: "var(--bd)", fontSize: 11, color: "var(--t2)", fontWeight: 600, letterSpacing: ".4px", textTransform: "uppercase" }}>
                  Template — memorise the structure, not the code
                </div>
                <pre style={{
                  padding: 16, margin: 0, fontSize: 12, lineHeight: 1.6,
                  fontFamily: "'SF Mono', 'Fira Code', monospace",
                  overflowX: "auto", background: "var(--bg2)", color: "var(--t1)",
                  whiteSpace: "pre",
                }}>
                  {content.template}
                </pre>
              </div>
            </div>
          )}

          {/* Common mistakes */}
          {content?.commonMistakes && (
            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>⚠️ Common Mistakes</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {content.commonMistakes.map((m, i) => (
                  <div key={i} className="card" style={{ padding: "10px 16px", display: "flex", gap: 10, alignItems: "flex-start", borderLeft: "3px solid var(--amber)" }}>
                    <span style={{ color: "var(--amber)", fontSize: 14, flexShrink: 0 }}>⚠</span>
                    <span style={{ fontSize: 13 }}>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All deep-dive sections accordion */}
          {content?.sections && content.sections.length > 0 && (
            <div>
              <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>📚 Deep Dive Sections</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {content.sections.map((sec, si) => {
                  const isOpen = openSectionIdx === si;
                  return (
                    <div key={si} className="card" style={{ overflow: "hidden" }}>
                      <button
                        onClick={() => setOpenSectionIdx(isOpen ? null : si)}
                        style={{
                          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                          padding: "13px 16px", background: "none", border: "none",
                          cursor: "pointer", textAlign: "left", gap: 12,
                        }}
                      >
                        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--t1)" }}>{sec.heading}</span>
                        <span style={{
                          fontSize: 12, color: "var(--t2)", flexShrink: 0,
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform .2s",
                        }}>▼</span>
                      </button>
                      {isOpen && (
                        <div style={{ padding: "0 16px 16px", borderTop: "var(--bd)", fontSize: 13, lineHeight: 1.7, color: "var(--t1)" }}>
                          <div style={{ marginTop: 12 }}>{renderMd(sec.body)}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* No content fallback */}
          {!content && (
            <div className="card" style={{ padding: 24, textAlign: "center", color: "var(--t2)" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📖</div>
              <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 6 }}>Deep-dive content coming soon</div>
              <div style={{ fontSize: 13 }}>Check the Resources tab for videos and articles to get started.</div>
            </div>
          )}
        </div>
      )}

      {/* ══════════════ RESOURCES TAB ═══════════════════════════ */}
      {activeTab === "resources" && (
        <div>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 14 }}>Learning Resources for {meta.name}</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {meta.resources.map((r, i) => (
              <a key={i} href={r.url} target="_blank" rel="noreferrer" className="card"
                style={{ padding: "14px 18px", textDecoration: "none", display: "block" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 18 }}>{r.type === "video" ? "▶️" : r.type === "book" ? "📖" : "📄"}</span>
                  <span style={{ fontWeight: 600, fontSize: 14, color: "var(--blue)" }}>{r.title}</span>
                  <span className={`badge ${r.type === "video" ? "badge-hard" : r.type === "book" ? "badge-medium" : "badge-easy"}`} style={{ marginLeft: "auto" }}>{r.type}</span>
                </div>
                <div style={{ fontSize: 12, color: "var(--t3)", paddingLeft: 28 }}>↗ {r.url.replace(/^https?:\/\//, "").split("/")[0]}</div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════ NOTE MODAL ══════════════════════════════ */}
      {noteModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 20 }}>
          <div className="card" style={{ width: "100%", maxWidth: 560, padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ fontSize: 15, fontWeight: 600 }}>📝 Note: {noteModal.title}</h3>
              <button onClick={() => setNoteModal(null)} style={{ background: "none", border: "none", fontSize: 22, color: "var(--t2)", cursor: "pointer", lineHeight: 1 }}>×</button>
            </div>
            <textarea
              value={noteContent}
              onChange={e => setNoteContent(e.target.value)}
              placeholder={"Write your approach, time/space complexity, key insight, edge cases...\n\nExample:\n- Approach: two pointers from both ends\n- TC: O(n), SC: O(1)\n- Key insight: sorted array lets us narrow by sum comparison\n- Edge case: duplicates — skip after finding a valid pair"}
              style={{ width: "100%", height: 200, padding: "10px 12px", border: "var(--bd)", borderRadius: "var(--radius)", background: "var(--bg3)", color: "var(--t1)", resize: "vertical", outline: "none", lineHeight: 1.6, fontSize: 13 }}
            />
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 14 }}>
              <button onClick={() => setNoteModal(null)} className="btn-secondary">Cancel</button>
              <button onClick={saveNote} className="btn-primary" disabled={noteSaving}>
                {noteSaving ? "Saving..." : "Save Note"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const TH: React.CSSProperties = { textAlign: "left", padding: "8px 12px", fontSize: 11, fontWeight: 500, color: "var(--t2)", textTransform: "uppercase", letterSpacing: ".3px" };
const TD: React.CSSProperties = { padding: "9px 12px", fontSize: 13 };
