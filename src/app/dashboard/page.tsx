"use client";
// src/app/dashboard/page.tsx
import { useEffect, useState } from "react";
import Link from "next/link";
import { TOPIC_META } from "@/lib/data";
import { PROBLEMS } from "@/lib/problems";

type Stats = {
  totalSolved: number;
  topicMap: Record<string, { easy: number; medium: number; hard: number }>;
  activity: { date: string; count: number }[];
  streak: number;
  recentTests: { testName: string; completedAt: string; score: number; totalQ: number }[];
};

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/stats").then(r => r.json()).then(d => { setStats(d); setLoading(false); });
  }, []);

  const totalProblems = Object.values(PROBLEMS).reduce((s, arr) => s + arr.length, 0);
  const topicKeys = Object.keys(TOPIC_META).sort((a, b) => TOPIC_META[a].order - TOPIC_META[b].order);

  if (loading) return <div style={{ padding: 40, color: "var(--t2)", textAlign: "center" }}>Loading your stats...</div>;
  if (!stats) return null;

  const pct = Math.round((stats.totalSolved / totalProblems) * 100);
  const topicsDone = topicKeys.filter(k => {
    const total = PROBLEMS[k]?.length || 0;
    const done = (stats.topicMap[k]?.easy || 0) + (stats.topicMap[k]?.medium || 0) + (stats.topicMap[k]?.hard || 0);
    return done === total && total > 0;
  }).length;

  return (
    <div style={{ padding: 24, maxWidth: 1100 }}>
      <div style={{ marginBottom: 6 }}>
        <h1 style={{ fontSize: 22, fontWeight: 600 }}>Dashboard</h1>
        <p style={{ color: "var(--t2)", fontSize: 13 }}>Your DSA progress toward top product companies</p>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, margin: "20px 0" }}>
        <StatCard label="Problems Solved" value={stats.totalSolved} sub={`of ${totalProblems} total`} color="var(--green)" />
        <StatCard label="Completion" value={`${pct}%`} sub="overall progress" color="var(--blue)" />
        <StatCard label="Topics Completed" value={`${topicsDone}/15`} sub="topics mastered" color="var(--amber)" />
        <StatCard label="Day Streak" value={`${stats.streak} 🔥`} sub="days in a row" color="var(--red)" />
      </div>

      {/* Heatmap */}
      <div className="card" style={{ padding: 20, marginBottom: 16 }}>
        <h2 style={{ fontSize: 14, fontWeight: 600, marginBottom: 14 }}>Activity — last 12 weeks</h2>
        <ActivityGrid activity={stats.activity} />
        <div style={{ display: "flex", gap: 8, marginTop: 10, alignItems: "center", fontSize: 11, color: "var(--t3)" }}>
          <span>Less</span>
          {[0, 1, 2, 3, 4].map(l => (
            <div key={l} style={{ width: 11, height: 11, borderRadius: 2, background: l === 0 ? "var(--bg3)" : `rgba(59,109,17,${l * 0.25})` }} />
          ))}
          <span>More</span>
        </div>
      </div>

      {/* Topic grid */}
      <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Topic Progress</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))", gap: 10, marginBottom: 24 }}>
        {topicKeys.map(k => {
          const meta = TOPIC_META[k];
          const probs = PROBLEMS[k] || [];
          const total = probs.length;
          const tm = stats.topicMap[k] || { easy: 0, medium: 0, hard: 0 };
          const done = tm.easy + tm.medium + tm.hard;
          const pct = total > 0 ? Math.round((done / total) * 100) : 0;
          return (
            <Link key={k} href={`/topics/${k}`} style={{ textDecoration: "none" }}>
              <div className="card" style={{ padding: "14px 16px", cursor: "pointer", transition: "border-color .15s" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{meta.icon} {meta.name}</span>
                  <span className="badge badge-blue">{done}/{total}</span>
                </div>
                <div style={{ height: 5, background: "var(--bg3)", borderRadius: 3, overflow: "hidden", marginBottom: 6 }}>
                  <div style={{ height: "100%", width: `${pct}%`, background: pct === 100 ? "var(--green)" : "var(--blue)", borderRadius: 3, transition: "width .4s" }} />
                </div>
                <div style={{ display: "flex", gap: 10, fontSize: 11, color: "var(--t2)" }}>
                  <span style={{ color: "var(--green)" }}>●{tm.easy} easy</span>
                  <span style={{ color: "var(--amber)" }}>●{tm.medium} med</span>
                  <span style={{ color: "var(--red)" }}>●{tm.hard} hard</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent tests */}
      {stats.recentTests.length > 0 && (
        <div>
          <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Recent Tests</h2>
          <div className="card" style={{ overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "var(--bd)" }}>
                  <th style={TH}>Test Name</th>
                  <th style={TH}>Score</th>
                  <th style={TH}>Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentTests.map((t, i) => (
                  <tr key={i} style={{ borderBottom: "var(--bd)" }}>
                    <td style={TD}>{t.testName}</td>
                    <td style={TD}><span className="badge badge-blue">{t.score}/{t.totalQ}</span></td>
                    <td style={TD}>{new Date(t.completedAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

const TH: React.CSSProperties = { textAlign: "left", padding: "8px 16px", fontSize: 11, fontWeight: 500, color: "var(--t2)", textTransform: "uppercase", letterSpacing: ".3px" };
const TD: React.CSSProperties = { padding: "10px 16px", fontSize: 13 };

function StatCard({ label, value, sub, color }: { label: string; value: string | number; sub: string; color: string }) {
  return (
    <div className="card" style={{ padding: "16px 18px" }}>
      <div style={{ fontSize: 11, fontWeight: 500, color: "var(--t2)", marginBottom: 6, textTransform: "uppercase", letterSpacing: ".3px" }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 600, color, marginBottom: 2 }}>{value}</div>
      <div style={{ fontSize: 11, color: "var(--t3)" }}>{sub}</div>
    </div>
  );
}

function ActivityGrid({ activity }: { activity: { date: string; count: number }[] }) {
  const days = 84;
  const actMap: Record<string, number> = {};
  activity.forEach(a => { actMap[new Date(a.date).toDateString()] = a.count; });
  const cells = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today); d.setDate(d.getDate() - i);
    const key = d.toDateString();
    const cnt = actMap[key] || 0;
    const opacity = cnt === 0 ? 0 : cnt <= 1 ? 0.25 : cnt <= 3 ? 0.5 : cnt <= 5 ? 0.75 : 1;
    cells.push(
      <div key={key} title={`${key}: ${cnt} problems`} style={{ width: 11, height: 11, borderRadius: 2, background: cnt === 0 ? "var(--bg3)" : `rgba(59,109,17,${opacity})`, border: "var(--bd)" }} />
    );
  }
  return <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>{cells}</div>;
}
