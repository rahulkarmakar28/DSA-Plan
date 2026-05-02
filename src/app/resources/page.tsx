"use client";
// src/app/resources/page.tsx
import { useState } from "react";
import { TOPIC_META } from "@/lib/data";
import Link from "next/link";

const GENERAL_RESOURCES = [
  {
    category: "Problem Sheets",
    icon: "📋",
    items: [
      { title: "NeetCode 150", desc: "150 most important LeetCode problems with video solutions for every single one. The best structured list.", url: "https://neetcode.io/practice", tag: "Free" },
      { title: "Blind 75", desc: "The original famous list by a Meta engineer. 75 handpicked problems covering all topics. Still the gold standard.", url: "https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions", tag: "Free" },
      { title: "LeetCode 75 (Official)", desc: "LeetCode's own curated 75-problem study plan. Structured by topic with difficulty progression.", url: "https://leetcode.com/studyplan/leetcode-75/", tag: "Free" },
      { title: "Striver's SDE Sheet", desc: "180 problems for SDE-1/SDE-2 roles at top Indian product companies — Flipkart, Amazon, Google, etc.", url: "https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/", tag: "Free" },
      { title: "Grind 169", desc: "Extended Blind 75 with 169 problems and a suggested weekly schedule. More complete for 3-month prep.", url: "https://www.techinterviewhandbook.org/grind75", tag: "Free" },
      { title: "Striver's A2Z DSA Sheet", desc: "450+ problems covering everything from basics to advanced. Best for complete beginners starting from scratch.", url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/", tag: "Free" },
    ],
  },
  {
    category: "Video Courses",
    icon: "▶️",
    items: [
      { title: "NeetCode YouTube Channel", desc: "Best DSA channel on YouTube. Crystal-clear explanations with visual diagrams. Covers all 150 problems with patterns.", url: "https://youtube.com/@NeetCode", tag: "Free" },
      { title: "TakeUForward (Striver)", desc: "Most popular Hindi/English DSA channel. Extremely detailed, covers every topic with full series. Highly recommended for Indian devs.", url: "https://youtube.com/@takeUforward", tag: "Free" },
      { title: "William Fiset — Graph Theory", desc: "The definitive graph theory playlist. Covers BFS, DFS, Dijkstra, Bellman-Ford, Floyd-Warshall, MST in depth.", url: "https://www.youtube.com/playlist?list=PLDV1Zeh2NRsDGO4--qE8yH72HFL1Km93P", tag: "Free" },
      { title: "Back To Back SWE", desc: "Deep whiteboard-style explanations. Best for DP, Trees, and understanding the intuition behind algorithms.", url: "https://youtube.com/@BackToBackSWE", tag: "Free" },
      { title: "Abdul Bari — Algorithms", desc: "University-level algorithm explanations. Great for sorting, recursion, DP foundations and mathematical proofs.", url: "https://www.youtube.com/watch?v=0IAPZzGSbME&list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O", tag: "Free" },
    ],
  },
  {
    category: "Books & Articles",
    icon: "📚",
    items: [
      { title: "CP Algorithms", desc: "The most comprehensive reference for competitive programming algorithms. In-depth with proofs, complexity analysis, and code.", url: "https://cp-algorithms.com/", tag: "Free" },
      { title: "Tech Interview Handbook", desc: "Covers both DSA and behavioral interview prep. Best practices, patterns, and company-specific advice.", url: "https://www.techinterviewhandbook.org/", tag: "Free" },
      { title: "MIT 6.006 OpenCourseWare", desc: "MIT's Introduction to Algorithms lecture notes and videos. Best theoretical foundation you can get for free.", url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/", tag: "Free" },
      { title: "Cracking the Coding Interview", desc: "The classic book by Gayle McDowell. 189 problems with detailed explanations. Still widely used in industry.", url: "https://www.amazon.in/Cracking-Coding-Interview-Programming-Questions/dp/0984782850", tag: "Paid" },
      { title: "Elements of Programming Interviews", desc: "Harder than CTCI. Best for Google/Facebook-level preparation. Java, Python, and C++ versions available.", url: "https://elementsofprogramminginterviews.com/", tag: "Paid" },
    ],
  },
  {
    category: "Practice Platforms",
    icon: "💻",
    items: [
      { title: "LeetCode", desc: "The primary platform. Use it for all problem solving. Premium is worth it for company-specific questions if targeting FAANG.", url: "https://leetcode.com/", tag: "Free/Premium" },
      { title: "Codeforces", desc: "Best for competitive programming. Use Div 3 and Div 4 contests to improve speed. EDU section has structured courses.", url: "https://codeforces.com/", tag: "Free" },
      { title: "InterviewBit", desc: "Company-specific questions and mock interviews. Good for Indian product companies like Flipkart, Paytm.", url: "https://www.interviewbit.com/", tag: "Free" },
      { title: "HackerRank", desc: "Some companies use this for OA rounds. Practice their domain-specific tracks to get familiar with the format.", url: "https://www.hackerrank.com/", tag: "Free" },
      { title: "Codeforces EDU", desc: "Free structured courses on Segment Trees, DSU, Suffix Arrays, and more advanced data structures.", url: "https://codeforces.com/edu/courses", tag: "Free" },
    ],
  },
  {
    category: "Patterns & Guides",
    icon: "🗺",
    items: [
      { title: "14 DP Patterns — LeetCode Discuss", desc: "The most shared DP guide. Categorizes all DP problems into 14 patterns with templates and problem lists.", url: "https://leetcode.com/discuss/general-discussion/458695/dynamic-programming-patterns", tag: "Free" },
      { title: "Sliding Window Beginners Guide", desc: "Comprehensive guide on the sliding window pattern with all variants, templates, and 20+ practice problems.", url: "https://leetcode.com/discuss/general-discussion/657507/sliding-window-for-beginners", tag: "Free" },
      { title: "Graph Patterns — LeetCode Discuss", desc: "BFS, DFS, Union Find, Topological Sort patterns with templates and problem categorization.", url: "https://leetcode.com/discuss/general-discussion/655708/graph-for-beginners-problems-pattern-sample-solutions", tag: "Free" },
      { title: "Binary Search Template", desc: "The definitive binary search template that handles all edge cases and variants without bugs.", url: "https://leetcode.com/discuss/general-discussion/786126/python-powerful-ultimate-binary-search-template", tag: "Free" },
    ],
  },
];

const COMPANY_GUIDES = [
  { company: "Google", color: "#4285F4", tips: ["Focus on Trees, Graphs, DP", "Expect 2-3 follow-up questions per problem", "Clarify constraints before coding", "Discuss time/space tradeoffs", "LeetCode Hard is common"], lcTag: "google" },
  { company: "Amazon", color: "#FF9900", tips: ["Heavy on arrays, hashing, trees", "LP (Leadership Principles) equally important", "OA uses CodeSignal — practice speed", "Behavioral prep is 50% of the interview", "2 coding rounds + LP round"], lcTag: "amazon" },
  { company: "Microsoft", color: "#00A4EF", tips: ["Standard LC Medium difficulty", "Strong emphasis on system design for SDE-2+", "Behavioral: growth mindset, collaboration", "4-5 rounds including a hiring manager", "Focus on clean code, not just working code"], lcTag: "microsoft" },
  { company: "Flipkart", color: "#2874F0", tips: ["Machine coding round is critical", "Focus on OOP design patterns", "Arrays, DP, Trees most common", "1 coding + 1 machine coding + 2 HLD/LLD", "Practice designing classes in 90 min"], lcTag: "flipkart" },
  { company: "Swiggy/Zomato", color: "#FC8019", tips: ["Strong CS fundamentals required", "System design at senior level", "Location-based algorithms (geo hash, k-nearest)", "Focus on scalability discussion", "2-3 coding rounds + culture fit"], lcTag: "" },
  { company: "Adobe", color: "#FF0000", tips: ["Heavy on data structures and algorithms", "Creative coding problems sometimes", "OOP and design patterns important", "4 rounds: 2 coding + 1 design + 1 HR", "Graph and tree problems are very common"], lcTag: "adobe" },
];

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState<"general" | "bytopic" | "companies">("general");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const topicKeys = Object.keys(TOPIC_META).sort((a, b) => TOPIC_META[a].order - TOPIC_META[b].order);

  return (
    <div style={{ padding: 24, maxWidth: 1000 }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>📚 Resources</h1>
        <p style={{ color: "var(--t2)", fontSize: 13 }}>Curated learning materials, guides, and company-specific prep — all free unless marked.</p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 2, borderBottom: "var(--bd)", marginBottom: 24 }}>
        {([
          { key: "general", label: "General Resources" },
          { key: "bytopic", label: "By Topic" },
          { key: "companies", label: "Company Guide" },
        ] as const).map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)} style={{
            padding: "8px 16px", background: "none", border: "none",
            borderBottom: `2px solid ${activeTab === t.key ? "var(--green)" : "transparent"}`,
            color: activeTab === t.key ? "var(--green)" : "var(--t2)",
            fontWeight: activeTab === t.key ? 500 : 400,
            marginBottom: -1, cursor: "pointer", fontSize: 13,
          }}>{t.label}</button>
        ))}
      </div>

      {/* General Resources */}
      {activeTab === "general" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {GENERAL_RESOURCES.map(section => (
            <div key={section.category}>
              <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                <span>{section.icon}</span>{section.category}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {section.items.map(item => (
                  <a key={item.title} href={item.url} target="_blank" rel="noreferrer"
                    className="card"
                    style={{ padding: "14px 18px", textDecoration: "none", display: "block", transition: "border-color .15s" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontWeight: 500, fontSize: 14, color: "var(--blue)" }}>{item.title}</span>
                      <span className={`badge ${item.tag === "Free" ? "badge-easy" : item.tag === "Paid" ? "badge-hard" : "badge-medium"}`} style={{ marginLeft: "auto", flexShrink: 0 }}>{item.tag}</span>
                    </div>
                    <p style={{ fontSize: 12, color: "var(--t2)", lineHeight: 1.5 }}>{item.desc}</p>
                    <div style={{ fontSize: 11, color: "var(--t3)", marginTop: 4 }}>↗ {item.url.replace(/^https?:\/\//, "").split("/")[0]}</div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* By Topic */}
      {activeTab === "bytopic" && (
        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {topicKeys.map(k => (
              <button key={k} onClick={() => setSelectedTopic(k)}
                style={{
                  textAlign: "left", padding: "8px 12px", borderRadius: 6, background: selectedTopic === k ? "var(--green-bg)" : "transparent",
                  border: "none", color: selectedTopic === k ? "var(--green)" : "var(--t2)", fontWeight: selectedTopic === k ? 500 : 400, fontSize: 13, cursor: "pointer",
                }}>
                {TOPIC_META[k].icon} {TOPIC_META[k].name}
              </button>
            ))}
          </div>
          <div>
            {selectedTopic ? (
              <div>
                <div style={{ marginBottom: 16 }}>
                  <h2 style={{ fontSize: 17, fontWeight: 600 }}>{TOPIC_META[selectedTopic].icon} {TOPIC_META[selectedTopic].name}</h2>
                  <p style={{ fontSize: 13, color: "var(--t2)", marginTop: 4 }}>{TOPIC_META[selectedTopic].sub}</p>
                </div>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: "var(--t2)", textTransform: "uppercase", letterSpacing: ".3px", marginBottom: 10 }}>Resources</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                  {TOPIC_META[selectedTopic].resources.map((r, i) => (
                    <a key={i} href={r.url} target="_blank" rel="noreferrer" className="card"
                      style={{ padding: "12px 16px", textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 20 }}>{r.type === "video" ? "▶️" : "📄"}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 500, fontSize: 13, color: "var(--blue)" }}>{r.title}</div>
                        <div style={{ fontSize: 11, color: "var(--t3)" }}>{r.url.replace(/^https?:\/\//, "").split("/")[0]}</div>
                      </div>
                      <span className={`badge ${r.type === "video" ? "badge-hard" : "badge-easy"}`}>{r.type}</span>
                    </a>
                  ))}
                </div>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: "var(--t2)", textTransform: "uppercase", letterSpacing: ".3px", marginBottom: 10 }}>Key Concepts</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {TOPIC_META[selectedTopic].concepts.map((c, i) => (
                    <div key={i} className="card" style={{ padding: "10px 14px", display: "flex", gap: 10, alignItems: "center" }}>
                      <span style={{ width: 20, height: 20, borderRadius: "50%", background: "var(--green-bg)", color: "var(--green)", fontSize: 11, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</span>
                      <span style={{ fontSize: 13 }}>{c}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 16 }}>
                  <Link href={`/topics/${selectedTopic}`} className="btn-primary" style={{ display: "inline-block", textDecoration: "none", fontSize: 13 }}>
                    → Practice {TOPIC_META[selectedTopic].name} Problems
                  </Link>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: 40, color: "var(--t3)" }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>👈</div>
                <div>Select a topic to see its resources</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Companies */}
      {activeTab === "companies" && (
        <div>
          <div style={{ background: "var(--amber-bg)", border: "1px solid var(--amber)", borderRadius: "var(--radius)", padding: "12px 16px", marginBottom: 20, fontSize: 13, color: "var(--amber)" }}>
            💡 <strong>Pro tip:</strong> LeetCode Premium lets you filter problems by company. Focus on top 50 recent problems per company in the last 6 months before your interview.
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))", gap: 12 }}>
            {COMPANY_GUIDES.map(c => (
              <div key={c.company} className="card" style={{ padding: "16px 18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: c.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13 }}>
                    {c.company[0]}
                  </div>
                  <h3 style={{ fontWeight: 600, fontSize: 15 }}>{c.company}</h3>
                  {c.lcTag && (
                    <a href={`https://leetcode.com/company/${c.lcTag}/`} target="_blank" rel="noreferrer" style={{ marginLeft: "auto", fontSize: 11, color: "var(--blue)" }}>LC Tag →</a>
                  )}
                </div>
                <ul style={{ paddingLeft: 16, display: "flex", flexDirection: "column", gap: 5 }}>
                  {c.tips.map((tip, i) => (
                    <li key={i} style={{ fontSize: 12, color: "var(--t2)", lineHeight: 1.5 }}>{tip}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
