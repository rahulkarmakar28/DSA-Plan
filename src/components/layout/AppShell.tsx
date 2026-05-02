"use client";
// src/components/layout/AppShell.tsx
import { useState, useEffect, useCallback } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TOPICS = [
  { key: "arrays", name: "Arrays & Strings", icon: "▦" },
  { key: "hashing", name: "Hashing", icon: "#" },
  { key: "twopointers", name: "Two Pointers", icon: "↔" },
  { key: "sliding", name: "Sliding Window", icon: "⊡" },
  { key: "stack", name: "Stack & Queue", icon: "⊟" },
  { key: "linkedlist", name: "Linked List", icon: "⊸" },
  { key: "trees", name: "Trees", icon: "🌲" },
  { key: "graphs", name: "Graphs", icon: "⬡" },
  { key: "dp", name: "Dynamic Programming", icon: "◈" },
  { key: "bsearch", name: "Binary Search", icon: "⊘" },
  { key: "heap", name: "Heap / Priority Queue", icon: "△" },
  { key: "backtrack", name: "Backtracking", icon: "↩" },
  { key: "greedy", name: "Greedy", icon: "⚡" },
  { key: "trie", name: "Trie", icon: "⊕" },
  { key: "bitwise", name: "Bit Manipulation", icon: "&" },
  { key: "strings", name: "Strings", icon: "Aa" },
  { key: "math", name: "Math & Number Theory", icon: "∑" },
  { key: "intervals", name: "Intervals", icon: "▬" },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [topicsOpen, setTopicsOpen] = useState(true);

  useEffect(() => {
    const t = (localStorage.getItem("dsa-theme") as "light" | "dark") || "light";
    setTheme(t);
    document.documentElement.setAttribute("data-theme", t);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("dsa-theme", next);
    document.documentElement.setAttribute("data-theme", next);
    fetch("/api/user", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ theme: next }) });
  }, [theme]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <aside style={{
        width: sidebarOpen ? "var(--sidebar-w)" : "48px",
        minWidth: sidebarOpen ? "var(--sidebar-w)" : "48px",
        background: "var(--bg2)",
        borderRight: "var(--bd)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        transition: "width .2s, min-width .2s",
        flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{ padding: "14px 12px", borderBottom: "var(--bd)", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: "var(--green)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 14, flexShrink: 0 }}>D</div>
          {sidebarOpen && <span style={{ fontWeight: 600, fontSize: 14, whiteSpace: "nowrap", overflow: "hidden" }}>DSA Tracker</span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ marginLeft: "auto", background: "none", border: "none", color: "var(--t2)", fontSize: 16, padding: 2, flexShrink: 0 }}>
            {sidebarOpen ? "◀" : "▶"}
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
          {/* Main nav */}
          <NavSection show={sidebarOpen}>
            <NavItem href="/dashboard" icon="◉" label="Dashboard" active={isActive("/dashboard")} open={sidebarOpen} />
            <NavItem href="/plan" icon="📅" label="Study Plan" active={isActive("/plan")} open={sidebarOpen} />
            <NavItem href="/tests" icon="⏱" label="Timed Tests" active={isActive("/tests")} open={sidebarOpen} />
            <NavItem href="/resources" icon="📚" label="Resources" active={isActive("/resources")} open={sidebarOpen} />
          </NavSection>

          {/* Topics */}
          <div style={{ padding: "8px 0" }}>
            {sidebarOpen && (
              <button
                onClick={() => setTopicsOpen(!topicsOpen)}
                style={{ display: "flex", alignItems: "center", gap: 6, width: "100%", padding: "4px 14px", background: "none", border: "none", color: "var(--t3)", fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".4px", cursor: "pointer" }}
              >
                <span style={{ fontSize: 9 }}>{topicsOpen ? "▼" : "▶"}</span>
                Topics
              </button>
            )}
            {(topicsOpen || !sidebarOpen) && TOPICS.map(t => (
              <NavItem
                key={t.key}
                href={`/topics/${t.key}`}
                icon={t.icon}
                label={t.name}
                active={isActive(`/topics/${t.key}`)}
                open={sidebarOpen}
              />
            ))}
          </div>
        </div>

        {/* Bottom user area */}
        <div style={{ borderTop: "var(--bd)", padding: "10px 12px", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--green-bg)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--green)", fontWeight: 600, fontSize: 12, flexShrink: 0 }}>
              {session?.user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            {sidebarOpen && (
              <>
                <div style={{ flex: 1, overflow: "hidden" }}>
                  <div style={{ fontSize: 12, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{session?.user?.name}</div>
                  <div style={{ fontSize: 11, color: "var(--t3)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{session?.user?.email}</div>
                </div>
                <button onClick={toggleTheme} title="Toggle theme" style={{ background: "none", border: "none", fontSize: 16, cursor: "pointer", flexShrink: 0 }}>
                  {theme === "light" ? "🌙" : "☀️"}
                </button>
                <button onClick={() => signOut()} title="Sign out" style={{ background: "none", border: "none", color: "var(--t3)", fontSize: 14, cursor: "pointer", flexShrink: 0 }}>⏏</button>
              </>
            )}
            {!sidebarOpen && (
              <button onClick={toggleTheme} title="Toggle theme" style={{ position: "absolute", bottom: 48, left: 10, background: "none", border: "none", fontSize: 16, cursor: "pointer" }}>
                {theme === "light" ? "🌙" : "☀️"}
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, overflow: "auto", background: "var(--bg3)" }}>
        {children}
      </main>
    </div>
  );
}

function NavSection({ children, show }: { children: React.ReactNode; show: boolean }) {
  return (
    <div style={{ padding: "8px 0", borderBottom: "var(--bd)" }}>
      {show && <div style={{ padding: "4px 14px", fontSize: 11, fontWeight: 500, color: "var(--t3)", textTransform: "uppercase", letterSpacing: ".4px" }}>Navigation</div>}
      {children}
    </div>
  );
}

function NavItem({ href, icon, label, active, open }: { href: string; icon: string; label: string; active: boolean; open: boolean }) {
  return (
    <Link href={href} style={{
      display: "flex",
      alignItems: "center",
      gap: 9,
      padding: "6px 12px",
      margin: "1px 6px",
      borderRadius: 6,
      color: active ? "var(--green)" : "var(--t2)",
      background: active ? "var(--green-bg)" : "transparent",
      fontWeight: active ? 500 : 400,
      fontSize: 13,
      textDecoration: "none",
      overflow: "hidden",
      whiteSpace: "nowrap",
      transition: "background .12s, color .12s",
    }}>
      <span style={{ fontSize: open ? 13 : 16, flexShrink: 0, width: 18, textAlign: "center" }}>{icon}</span>
      {open && <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{label}</span>}
    </Link>
  );
}
