"use client";
// src/app/plan/page.tsx
import { useState } from "react";
import { WEEKLY_PLAN, TOPIC_META } from "@/lib/data";
import Link from "next/link";

export default function PlanPage() {
  const [activeWeek, setActiveWeek] = useState(1);
  const week = WEEKLY_PLAN.find(w => w.week === activeWeek) || WEEKLY_PLAN[0];

  const totalDailyProblems = week.dailyTasks.reduce((s, d) => s + d.problems, 0);

  return (
    <div style={{ padding: 24, maxWidth: 1000 }}>
      <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>📅 12-Week Study Plan</h1>
      <p style={{ color: "var(--t2)", fontSize: 13, marginBottom: 24 }}>
        Structured daily & weekly breakdown to land a top product company offer. ~3–5 problems/day.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 20 }}>
        {/* Week selector */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 500, color: "var(--t3)", textTransform: "uppercase", letterSpacing: ".4px", marginBottom: 8 }}>Weeks</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {WEEKLY_PLAN.map(w => (
              <button
                key={w.week}
                onClick={() => setActiveWeek(w.week)}
                style={{
                  textAlign: "left", padding: "8px 12px", borderRadius: 8,
                  background: activeWeek === w.week ? "var(--green-bg)" : "var(--bg2)",
                  border: `1px solid ${activeWeek === w.week ? "var(--green)" : "var(--bd)".replace("1px solid ", "")}`,
                  color: activeWeek === w.week ? "var(--green)" : "var(--t1)",
                  fontWeight: activeWeek === w.week ? 600 : 400,
                  cursor: "pointer", fontSize: 13,
                }}
              >
                <div>Week {w.week}</div>
                <div style={{ fontSize: 11, color: activeWeek === w.week ? "var(--green)" : "var(--t3)", fontWeight: 400, marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {w.title}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Week detail */}
        <div>
          {/* Week header */}
          <div className="card" style={{ padding: "18px 20px", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 11, color: "var(--t3)", marginBottom: 4, textTransform: "uppercase", letterSpacing: ".4px" }}>Week {week.week}</div>
                <h2 style={{ fontSize: 18, fontWeight: 600 }}>{week.title}</h2>
              </div>
              <span className="badge badge-blue">{totalDailyProblems} problems</span>
            </div>

            {/* Topics covered */}
            {week.topics.length > 0 && (
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
                {week.topics.map(t => (
                  <Link key={t} href={`/topics/${t}`}>
                    <span className="badge badge-blue" style={{ cursor: "pointer", padding: "4px 10px", fontSize: 12 }}>
                      {TOPIC_META[t]?.icon} {TOPIC_META[t]?.name}
                    </span>
                  </Link>
                ))}
              </div>
            )}

            {/* Goals */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--t2)", marginBottom: 6, textTransform: "uppercase", letterSpacing: ".3px" }}>Weekly Goals</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {week.goals.map((g, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 13 }}>
                    <span style={{ color: "var(--green)", flexShrink: 0, marginTop: 1 }}>✓</span>
                    <span>{g}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Daily breakdown */}
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Daily Schedule</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {week.dailyTasks.map((day, i) => (
              <div key={i} className="card" style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: day.day === "Sun" ? "var(--purple-bg)" : day.day === "Sat" ? "var(--amber-bg)" : "var(--blue-bg)",
                  color: day.day === "Sun" ? "var(--purple)" : day.day === "Sat" ? "var(--amber)" : "var(--blue)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, fontSize: 12, flexShrink: 0,
                }}>
                  {day.day}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{day.task}</div>
                  {day.day === "Sun" && (
                    <div style={{ fontSize: 11, color: "var(--purple)", marginTop: 2 }}>📋 Weekly test + review session</div>
                  )}
                </div>
                {day.problems > 0 && (
                  <span className="badge badge-easy" style={{ flexShrink: 0 }}>
                    {day.problems} problem{day.problems > 1 ? "s" : ""}
                  </span>
                )}
                {day.problems === 0 && (
                  <span className="badge" style={{ background: "var(--purple-bg)", color: "var(--purple)", flexShrink: 0 }}>
                    Test day
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
            <button
              className="btn-secondary"
              onClick={() => setActiveWeek(w => Math.max(1, w - 1))}
              disabled={activeWeek === 1}
            >
              ← Previous Week
            </button>
            <button
              className="btn-primary"
              onClick={() => setActiveWeek(w => Math.min(WEEKLY_PLAN.length, w + 1))}
              disabled={activeWeek === WEEKLY_PLAN.length}
            >
              Next Week →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
