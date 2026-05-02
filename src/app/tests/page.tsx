"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { WEEKLY_PLAN } from "@/lib/data";

// ── All test definitions ────────────────────────────────────────────────────
type TestDef = {
  id: string;
  name: string;
  category: "topic" | "weekly" | "mock" | "company";
  week?: number;          // roadmap week this aligns to
  durationMin: number;
  difficulty: "easy-medium" | "medium" | "medium-hard" | "hard" | "mixed";
  description: string;
  problems: { title: string; lcUrl: string; difficulty: "easy"|"medium"|"hard" }[];
};

const ALL_TESTS: TestDef[] = [
  // ── Week 1 ─────────────────────────────────────────────────────
  {
    id:"w1-arrays", name:"Week 1 — Arrays & Prefix Sum", category:"weekly", week:1,
    durationMin:60, difficulty:"easy-medium",
    description:"Foundation test: in-place ops, prefix sum, Kadane's algorithm.",
    problems:[
      { title:"Two Sum",                         difficulty:"easy",   lcUrl:"https://leetcode.com/problems/two-sum/" },
      { title:"Best Time to Buy and Sell Stock", difficulty:"easy",   lcUrl:"https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
      { title:"Maximum Subarray",                difficulty:"medium", lcUrl:"https://leetcode.com/problems/maximum-subarray/" },
      { title:"Product of Array Except Self",    difficulty:"medium", lcUrl:"https://leetcode.com/problems/product-of-array-except-self/" },
    ],
  },
  // ── Week 2 ─────────────────────────────────────────────────────
  {
    id:"w2-hashing", name:"Week 2 — Hashing", category:"weekly", week:2,
    durationMin:60, difficulty:"easy-medium",
    description:"HashMap frequency count, complement lookup, anagram grouping.",
    problems:[
      { title:"Valid Anagram",               difficulty:"easy",   lcUrl:"https://leetcode.com/problems/valid-anagram/" },
      { title:"Group Anagrams",              difficulty:"medium", lcUrl:"https://leetcode.com/problems/group-anagrams/" },
      { title:"Top K Frequent Elements",     difficulty:"medium", lcUrl:"https://leetcode.com/problems/top-k-frequent-elements/" },
      { title:"Longest Consecutive Sequence",difficulty:"medium", lcUrl:"https://leetcode.com/problems/longest-consecutive-sequence/" },
    ],
  },
  {
    id:"w2-twoptr", name:"Week 2 — Two Pointers", category:"topic", week:2,
    durationMin:50, difficulty:"medium",
    description:"Opposite-ends pointers on sorted arrays.",
    problems:[
      { title:"Valid Palindrome",    difficulty:"easy",   lcUrl:"https://leetcode.com/problems/valid-palindrome/" },
      { title:"Two Sum II",          difficulty:"medium", lcUrl:"https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/" },
      { title:"3Sum",                difficulty:"medium", lcUrl:"https://leetcode.com/problems/3sum/" },
      { title:"Sort Colors",         difficulty:"medium", lcUrl:"https://leetcode.com/problems/sort-colors/" },
    ],
  },
  // ── Week 3 ─────────────────────────────────────────────────────
  {
    id:"w3-sliding", name:"Week 3 — Sliding Window", category:"topic", week:3,
    durationMin:60, difficulty:"medium",
    description:"Fixed and variable-size window. Character frequency tracking.",
    problems:[
      { title:"Longest Substring Without Repeating Characters", difficulty:"medium", lcUrl:"https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
      { title:"Longest Repeating Character Replacement",         difficulty:"medium", lcUrl:"https://leetcode.com/problems/longest-repeating-character-replacement/" },
      { title:"Permutation in String",                           difficulty:"medium", lcUrl:"https://leetcode.com/problems/permutation-in-string/" },
      { title:"Minimum Size Subarray Sum",                       difficulty:"medium", lcUrl:"https://leetcode.com/problems/minimum-size-subarray-sum/" },
    ],
  },
  {
    id:"w3-bsearch", name:"Week 3 — Binary Search", category:"topic", week:3,
    durationMin:60, difficulty:"medium",
    description:"Classic binary search and answer-space search.",
    problems:[
      { title:"Binary Search",                    difficulty:"easy",   lcUrl:"https://leetcode.com/problems/binary-search/" },
      { title:"Search a 2D Matrix",               difficulty:"medium", lcUrl:"https://leetcode.com/problems/search-a-2d-matrix/" },
      { title:"Koko Eating Bananas",              difficulty:"medium", lcUrl:"https://leetcode.com/problems/koko-eating-bananas/" },
      { title:"Search in Rotated Sorted Array",   difficulty:"medium", lcUrl:"https://leetcode.com/problems/search-in-rotated-sorted-array/" },
      { title:"Capacity to Ship Packages",        difficulty:"medium", lcUrl:"https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/" },
    ],
  },
  {
    id:"w3-mixed", name:"Week 3 — Mixed (Wks 1–3 Revision)", category:"weekly", week:3,
    durationMin:75, difficulty:"mixed",
    description:"Sunday test covering Arrays, Hashing, Two Pointers, Sliding Window, Binary Search.",
    problems:[
      { title:"Subarray Sum Equals K",                          difficulty:"medium", lcUrl:"https://leetcode.com/problems/subarray-sum-equals-k/" },
      { title:"Container With Most Water",                      difficulty:"medium", lcUrl:"https://leetcode.com/problems/container-with-most-water/" },
      { title:"Find All Anagrams in a String",                  difficulty:"medium", lcUrl:"https://leetcode.com/problems/find-all-anagrams-in-a-string/" },
      { title:"Time Based Key-Value Store",                     difficulty:"medium", lcUrl:"https://leetcode.com/problems/time-based-key-value-store/" },
    ],
  },
  // ── Week 4 ─────────────────────────────────────────────────────
  {
    id:"w4-stack", name:"Week 4 — Stack & Monotonic Stack", category:"topic", week:4,
    durationMin:60, difficulty:"medium",
    description:"Balanced brackets, NGE, monotonic stack pattern.",
    problems:[
      { title:"Valid Parentheses",              difficulty:"easy",   lcUrl:"https://leetcode.com/problems/valid-parentheses/" },
      { title:"Min Stack",                      difficulty:"medium", lcUrl:"https://leetcode.com/problems/min-stack/" },
      { title:"Daily Temperatures",             difficulty:"medium", lcUrl:"https://leetcode.com/problems/daily-temperatures/" },
      { title:"Car Fleet",                      difficulty:"medium", lcUrl:"https://leetcode.com/problems/car-fleet/" },
      { title:"Largest Rectangle in Histogram", difficulty:"hard",   lcUrl:"https://leetcode.com/problems/largest-rectangle-in-histogram/" },
    ],
  },
  {
    id:"w4-linkedlist", name:"Week 4 — Linked List", category:"topic", week:4,
    durationMin:60, difficulty:"medium",
    description:"Reversal, slow-fast pointers, Floyd's cycle detection.",
    problems:[
      { title:"Reverse Linked List",         difficulty:"easy",   lcUrl:"https://leetcode.com/problems/reverse-linked-list/" },
      { title:"Linked List Cycle",           difficulty:"easy",   lcUrl:"https://leetcode.com/problems/linked-list-cycle/" },
      { title:"Reorder List",                difficulty:"medium", lcUrl:"https://leetcode.com/problems/reorder-list/" },
      { title:"Remove Nth Node From End",    difficulty:"medium", lcUrl:"https://leetcode.com/problems/remove-nth-node-from-end-of-list/" },
      { title:"LRU Cache",                   difficulty:"medium", lcUrl:"https://leetcode.com/problems/lru-cache/" },
    ],
  },
  // ── Week 5-6 ────────────────────────────────────────────────────
  {
    id:"w5-trees-easy", name:"Week 5 — Trees: DFS Fundamentals", category:"topic", week:5,
    durationMin:60, difficulty:"easy-medium",
    description:"All traversal orders, basic DFS problems.",
    problems:[
      { title:"Invert Binary Tree",                difficulty:"easy",   lcUrl:"https://leetcode.com/problems/invert-binary-tree/" },
      { title:"Maximum Depth of Binary Tree",      difficulty:"easy",   lcUrl:"https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
      { title:"Diameter of Binary Tree",           difficulty:"easy",   lcUrl:"https://leetcode.com/problems/diameter-of-binary-tree/" },
      { title:"Balanced Binary Tree",              difficulty:"easy",   lcUrl:"https://leetcode.com/problems/balanced-binary-tree/" },
      { title:"Subtree of Another Tree",           difficulty:"easy",   lcUrl:"https://leetcode.com/problems/subtree-of-another-tree/" },
    ],
  },
  {
    id:"w5-trees-bfs", name:"Week 5 — Trees: BFS & Level Order", category:"topic", week:5,
    durationMin:60, difficulty:"medium",
    description:"Level-order traversal, right side view, level averages.",
    problems:[
      { title:"Binary Tree Level Order Traversal", difficulty:"medium", lcUrl:"https://leetcode.com/problems/binary-tree-level-order-traversal/" },
      { title:"Binary Tree Right Side View",       difficulty:"medium", lcUrl:"https://leetcode.com/problems/binary-tree-right-side-view/" },
      { title:"Count Good Nodes in Binary Tree",   difficulty:"medium", lcUrl:"https://leetcode.com/problems/count-good-nodes-in-binary-tree/" },
    ],
  },
  {
    id:"w6-trees-bst", name:"Week 6 — BST & Advanced Trees", category:"topic", week:6,
    durationMin:75, difficulty:"medium-hard",
    description:"BST operations, LCA, path sum, serialize/deserialize.",
    problems:[
      { title:"Validate Binary Search Tree",              difficulty:"medium", lcUrl:"https://leetcode.com/problems/validate-binary-search-tree/" },
      { title:"Kth Smallest Element in BST",              difficulty:"medium", lcUrl:"https://leetcode.com/problems/kth-smallest-element-in-a-bst/" },
      { title:"Lowest Common Ancestor of Binary Tree",    difficulty:"medium", lcUrl:"https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/" },
      { title:"Binary Tree Maximum Path Sum",             difficulty:"hard",   lcUrl:"https://leetcode.com/problems/binary-tree-maximum-path-sum/" },
      { title:"Serialize and Deserialize Binary Tree",    difficulty:"hard",   lcUrl:"https://leetcode.com/problems/serialize-and-deserialize-binary-tree/" },
    ],
  },
  // ── Week 7 ─────────────────────────────────────────────────────
  {
    id:"w7-graphs-basic", name:"Week 7 — Graphs: BFS/DFS on Grids", category:"topic", week:7,
    durationMin:60, difficulty:"medium",
    description:"Island problems, flood fill, multi-source BFS.",
    problems:[
      { title:"Number of Islands",           difficulty:"medium", lcUrl:"https://leetcode.com/problems/number-of-islands/" },
      { title:"Max Area of Island",          difficulty:"medium", lcUrl:"https://leetcode.com/problems/max-area-of-island/" },
      { title:"Pacific Atlantic Water Flow", difficulty:"medium", lcUrl:"https://leetcode.com/problems/pacific-atlantic-water-flow/" },
      { title:"Rotting Oranges",             difficulty:"medium", lcUrl:"https://leetcode.com/problems/rotting-oranges/" },
    ],
  },
  {
    id:"w7-graphs-advanced", name:"Week 7 — Graphs: Union-Find & Topo Sort", category:"topic", week:7,
    durationMin:75, difficulty:"medium-hard",
    description:"Union-Find, topological sort, Dijkstra.",
    problems:[
      { title:"Course Schedule",                 difficulty:"medium", lcUrl:"https://leetcode.com/problems/course-schedule/" },
      { title:"Course Schedule II",              difficulty:"medium", lcUrl:"https://leetcode.com/problems/course-schedule-ii/" },
      { title:"Redundant Connection",            difficulty:"medium", lcUrl:"https://leetcode.com/problems/redundant-connection/" },
      { title:"Network Delay Time",              difficulty:"medium", lcUrl:"https://leetcode.com/problems/network-delay-time/" },
      { title:"Cheapest Flights Within K Stops", difficulty:"medium", lcUrl:"https://leetcode.com/problems/cheapest-flights-within-k-stops/" },
    ],
  },
  // ── Week 8 ─────────────────────────────────────────────────────
  {
    id:"w8-backtrack", name:"Week 8 — Backtracking", category:"topic", week:8,
    durationMin:75, difficulty:"medium",
    description:"Decision tree thinking: subsets, permutations, combinations, pruning.",
    problems:[
      { title:"Subsets",                              difficulty:"medium", lcUrl:"https://leetcode.com/problems/subsets/" },
      { title:"Combination Sum",                      difficulty:"medium", lcUrl:"https://leetcode.com/problems/combination-sum/" },
      { title:"Permutations",                         difficulty:"medium", lcUrl:"https://leetcode.com/problems/permutations/" },
      { title:"Word Search",                          difficulty:"medium", lcUrl:"https://leetcode.com/problems/word-search/" },
      { title:"Palindrome Partitioning",              difficulty:"medium", lcUrl:"https://leetcode.com/problems/palindrome-partitioning/" },
    ],
  },
  {
    id:"w8-greedy", name:"Week 8 — Greedy & Intervals", category:"topic", week:8,
    durationMin:60, difficulty:"medium",
    description:"Interval scheduling, jump game, gas station.",
    problems:[
      { title:"Jump Game",               difficulty:"medium", lcUrl:"https://leetcode.com/problems/jump-game/" },
      { title:"Jump Game II",            difficulty:"medium", lcUrl:"https://leetcode.com/problems/jump-game-ii/" },
      { title:"Gas Station",             difficulty:"medium", lcUrl:"https://leetcode.com/problems/gas-station/" },
      { title:"Merge Intervals",         difficulty:"medium", lcUrl:"https://leetcode.com/problems/merge-intervals/" },
      { title:"Non-overlapping Intervals",difficulty:"medium",lcUrl:"https://leetcode.com/problems/non-overlapping-intervals/" },
    ],
  },
  // ── Week 9-10 ───────────────────────────────────────────────────
  {
    id:"w9-dp-1d", name:"Week 9 — DP: 1D Patterns", category:"topic", week:9,
    durationMin:75, difficulty:"medium",
    description:"Memoization, tabulation, house robber, decode ways, coin change.",
    problems:[
      { title:"Climbing Stairs",            difficulty:"easy",   lcUrl:"https://leetcode.com/problems/climbing-stairs/" },
      { title:"House Robber",               difficulty:"medium", lcUrl:"https://leetcode.com/problems/house-robber/" },
      { title:"House Robber II",            difficulty:"medium", lcUrl:"https://leetcode.com/problems/house-robber-ii/" },
      { title:"Decode Ways",                difficulty:"medium", lcUrl:"https://leetcode.com/problems/decode-ways/" },
      { title:"Coin Change",                difficulty:"medium", lcUrl:"https://leetcode.com/problems/coin-change/" },
      { title:"Word Break",                 difficulty:"medium", lcUrl:"https://leetcode.com/problems/word-break/" },
    ],
  },
  {
    id:"w10-dp-2d", name:"Week 10 — DP: 2D & Knapsack", category:"topic", week:10,
    durationMin:90, difficulty:"medium-hard",
    description:"LCS, Edit Distance, 0/1 Knapsack, LIS, Palindrome DP.",
    problems:[
      { title:"Longest Common Subsequence",   difficulty:"medium", lcUrl:"https://leetcode.com/problems/longest-common-subsequence/" },
      { title:"Edit Distance",                difficulty:"medium", lcUrl:"https://leetcode.com/problems/edit-distance/" },
      { title:"Partition Equal Subset Sum",   difficulty:"medium", lcUrl:"https://leetcode.com/problems/partition-equal-subset-sum/" },
      { title:"Longest Increasing Subsequence",difficulty:"medium",lcUrl:"https://leetcode.com/problems/longest-increasing-subsequence/" },
      { title:"Burst Balloons",               difficulty:"hard",   lcUrl:"https://leetcode.com/problems/burst-balloons/" },
    ],
  },
  // ── Week 11 ─────────────────────────────────────────────────────
  {
    id:"w11-heap", name:"Week 11 — Heap / Priority Queue", category:"topic", week:11,
    durationMin:60, difficulty:"medium-hard",
    description:"Top-K elements, two heaps (median), merge K sorted.",
    problems:[
      { title:"Kth Largest Element in Array",  difficulty:"medium", lcUrl:"https://leetcode.com/problems/kth-largest-element-in-an-array/" },
      { title:"K Closest Points to Origin",    difficulty:"medium", lcUrl:"https://leetcode.com/problems/k-closest-points-to-origin/" },
      { title:"Task Scheduler",                difficulty:"medium", lcUrl:"https://leetcode.com/problems/task-scheduler/" },
      { title:"Find Median from Data Stream",  difficulty:"hard",   lcUrl:"https://leetcode.com/problems/find-median-from-data-stream/" },
      { title:"Merge K Sorted Lists",          difficulty:"hard",   lcUrl:"https://leetcode.com/problems/merge-k-sorted-lists/" },
    ],
  },
  {
    id:"w11-trie", name:"Week 11 — Trie & Bit Manipulation", category:"topic", week:11,
    durationMin:60, difficulty:"medium",
    description:"Prefix tree implementation and XOR bit tricks.",
    problems:[
      { title:"Implement Trie (Prefix Tree)",  difficulty:"medium", lcUrl:"https://leetcode.com/problems/implement-trie-prefix-tree/" },
      { title:"Design Add and Search Words",   difficulty:"medium", lcUrl:"https://leetcode.com/problems/design-add-and-search-words-data-structure/" },
      { title:"Single Number",                 difficulty:"easy",   lcUrl:"https://leetcode.com/problems/single-number/" },
      { title:"Sum of Two Integers",           difficulty:"medium", lcUrl:"https://leetcode.com/problems/sum-of-two-integers/" },
      { title:"Counting Bits",                 difficulty:"easy",   lcUrl:"https://leetcode.com/problems/counting-bits/" },
    ],
  },
  // ── Week 12 — Mock Interviews ────────────────────────────────────
  {
    id:"w12-mock1", name:"Week 12 — Mock #1: Mixed Medium", category:"mock", week:12,
    durationMin:90, difficulty:"mixed",
    description:"Simulate a real interview. 4 mixed-topic medium problems. No hints.",
    problems:[
      { title:"Longest Substring Without Repeating Characters", difficulty:"medium", lcUrl:"https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
      { title:"Binary Tree Level Order Traversal",              difficulty:"medium", lcUrl:"https://leetcode.com/problems/binary-tree-level-order-traversal/" },
      { title:"Coin Change",                                    difficulty:"medium", lcUrl:"https://leetcode.com/problems/coin-change/" },
      { title:"Number of Islands",                              difficulty:"medium", lcUrl:"https://leetcode.com/problems/number-of-islands/" },
    ],
  },
  {
    id:"w12-mock2", name:"Week 12 — Mock #2: Hard Focus", category:"mock", week:12,
    durationMin:120, difficulty:"hard",
    description:"3 hard problems, 2 hours. Google/Meta difficulty simulation.",
    problems:[
      { title:"Trapping Rain Water",            difficulty:"hard", lcUrl:"https://leetcode.com/problems/trapping-rain-water/" },
      { title:"Binary Tree Maximum Path Sum",   difficulty:"hard", lcUrl:"https://leetcode.com/problems/binary-tree-maximum-path-sum/" },
      { title:"Median of Two Sorted Arrays",    difficulty:"hard", lcUrl:"https://leetcode.com/problems/median-of-two-sorted-arrays/" },
    ],
  },
  // ── Company simulations ─────────────────────────────────────────
  {
    id:"company-amazon", name:"Amazon SDE Simulation", category:"company",
    durationMin:90, difficulty:"mixed",
    description:"Amazon frequently asks LP (Leadership Principles) + 2 coding. Focus: Arrays, DP, Trees.",
    problems:[
      { title:"Two Sum",                      difficulty:"easy",   lcUrl:"https://leetcode.com/problems/two-sum/" },
      { title:"LRU Cache",                    difficulty:"medium", lcUrl:"https://leetcode.com/problems/lru-cache/" },
      { title:"Merge Intervals",              difficulty:"medium", lcUrl:"https://leetcode.com/problems/merge-intervals/" },
      { title:"Word Ladder",                  difficulty:"hard",   lcUrl:"https://leetcode.com/problems/word-ladder/" },
    ],
  },
  {
    id:"company-google", name:"Google L3/L4 Simulation", category:"company",
    durationMin:120, difficulty:"hard",
    description:"Google focuses on optimal solutions. Expect follow-ups. BFS/DFS/DP heavy.",
    problems:[
      { title:"Trapping Rain Water",                   difficulty:"hard",   lcUrl:"https://leetcode.com/problems/trapping-rain-water/" },
      { title:"Alien Dictionary",                      difficulty:"hard",   lcUrl:"https://leetcode.com/problems/alien-dictionary/" },
      { title:"Maximum Profit in Job Scheduling",      difficulty:"hard",   lcUrl:"https://leetcode.com/problems/maximum-profit-in-job-scheduling/" },
      { title:"Serialize and Deserialize Binary Tree", difficulty:"hard",   lcUrl:"https://leetcode.com/problems/serialize-and-deserialize-binary-tree/" },
    ],
  },
  {
    id:"company-flipkart", name:"Flipkart SDE Simulation", category:"company",
    durationMin:90, difficulty:"medium-hard",
    description:"Flipkart (Walmart Global Tech): Arrays, Strings, Trees, Graphs, DP.",
    problems:[
      { title:"Longest Consecutive Sequence",  difficulty:"medium", lcUrl:"https://leetcode.com/problems/longest-consecutive-sequence/" },
      { title:"Edit Distance",                 difficulty:"medium", lcUrl:"https://leetcode.com/problems/edit-distance/" },
      { title:"Course Schedule",               difficulty:"medium", lcUrl:"https://leetcode.com/problems/course-schedule/" },
      { title:"Burst Balloons",                difficulty:"hard",   lcUrl:"https://leetcode.com/problems/burst-balloons/" },
    ],
  },
  {
    id:"company-microsoft", name:"Microsoft SDE Simulation", category:"company",
    durationMin:90, difficulty:"medium",
    description:"Microsoft: medium difficulty, emphasises clean code and edge cases. Trees + Arrays.",
    problems:[
      { title:"Set Matrix Zeroes",               difficulty:"medium", lcUrl:"https://leetcode.com/problems/set-matrix-zeroes/" },
      { title:"Lowest Common Ancestor of BST",   difficulty:"medium", lcUrl:"https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/" },
      { title:"Validate Binary Search Tree",     difficulty:"medium", lcUrl:"https://leetcode.com/problems/validate-binary-search-tree/" },
      { title:"Word Search",                     difficulty:"medium", lcUrl:"https://leetcode.com/problems/word-search/" },
    ],
  },
  {
    id:"company-adobe", name:"Adobe MTS Simulation", category:"company",
    durationMin:75, difficulty:"medium",
    description:"Adobe: data structures, string manipulation, and OOP. Medium-heavy.",
    problems:[
      { title:"Group Anagrams",                  difficulty:"medium", lcUrl:"https://leetcode.com/problems/group-anagrams/" },
      { title:"Decode String",                   difficulty:"medium", lcUrl:"https://leetcode.com/problems/decode-string/" },
      { title:"Kth Largest Element in Array",    difficulty:"medium", lcUrl:"https://leetcode.com/problems/kth-largest-element-in-an-array/" },
      { title:"Binary Tree Right Side View",     difficulty:"medium", lcUrl:"https://leetcode.com/problems/binary-tree-right-side-view/" },
    ],
  },
  {
    id:"faang-final", name:"FAANG Final Simulation", category:"mock",
    durationMin:120, difficulty:"hard",
    description:"Full 5-problem simulation. 2 hours. Mixed hard topics. Best done after week 12.",
    problems:[
      { title:"Minimum Window Substring",       difficulty:"hard",   lcUrl:"https://leetcode.com/problems/minimum-window-substring/" },
      { title:"Trapping Rain Water",            difficulty:"hard",   lcUrl:"https://leetcode.com/problems/trapping-rain-water/" },
      { title:"Binary Tree Maximum Path Sum",   difficulty:"hard",   lcUrl:"https://leetcode.com/problems/binary-tree-maximum-path-sum/" },
      { title:"Alien Dictionary",               difficulty:"hard",   lcUrl:"https://leetcode.com/problems/alien-dictionary/" },
      { title:"Regular Expression Matching",    difficulty:"hard",   lcUrl:"https://leetcode.com/problems/regular-expression-matching/" },
    ],
  },
];

const DIFF_COLORS: Record<string, string> = {
  "easy-medium":"var(--green)", "medium":"var(--blue)",
  "medium-hard":"var(--amber)", "hard":"var(--red)", "mixed":"var(--purple)",
};
const DIFF_BG: Record<string, string> = {
  "easy-medium":"var(--green-bg)", "medium":"var(--blue-bg)",
  "medium-hard":"var(--amber-bg)", "hard":"var(--red-bg)", "mixed":"var(--purple-bg)",
};
const CAT_LABEL: Record<string, string> = { topic:"Topic Test", weekly:"Weekly Test", mock:"Mock Interview", company:"Company Sim" };

export default function TestsPage() {
  const [tab,        setTab]        = useState<"roadmap"|"topic"|"mock"|"company">("roadmap");
  const [running,    setRunning]    = useState<TestDef | null>(null);
  const [secsLeft,   setSecsLeft]   = useState(0);
  const [paused,     setPaused]     = useState(false);
  const [finished,   setFinished]   = useState(false);
  const [testHistory,setTestHistory]= useState<{ testName:string; completedAt:string; durationMin:number }[]>([]);
  const intervalRef  = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    fetch("/api/tests").then(r=>r.json()).then(d=>{ if(Array.isArray(d)) setTestHistory(d.slice(0,8)); }).catch(()=>{});
  },[]);

  // ── Timer ────────────────────────────────────────────────────────
  const startTest = useCallback((test: TestDef) => {
    if(intervalRef.current) clearInterval(intervalRef.current);
    setRunning(test);
    setSecsLeft(test.durationMin * 60);
    setPaused(false);
    setFinished(false);
    window.scrollTo({ top:0, behavior:"smooth" });
  },[]);

  useEffect(() => {
    if(!running || paused || finished) return;
    intervalRef.current = setInterval(() => {
      setSecsLeft(s => {
        if(s <= 1) {
          clearInterval(intervalRef.current!);
          setFinished(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current!);
  },[running, paused, finished]);

  const endTest = useCallback(async () => {
    if(!running) return;
    clearInterval(intervalRef.current!);
    const timeUsed = running.durationMin*60 - secsLeft;
    setFinished(true);
    await fetch("/api/tests", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({
        testName: running.name,
        testType: running.category,
        topicKey: null,
        durationMin: running.durationMin,
        timeUsedSec: timeUsed,
        score: 0,
        totalQ: running.problems.length,
      }),
    });
    setTestHistory(prev => [{ testName:running.name, completedAt:new Date().toISOString(), durationMin:running.durationMin }, ...prev].slice(0,8));
  },[running, secsLeft]);

  const mm = Math.floor(secsLeft/60).toString().padStart(2,"0");
  const ss = (secsLeft%60).toString().padStart(2,"0");
  const timerColor = secsLeft<300 ? "var(--red)" : secsLeft<600 ? "var(--amber)" : "var(--green)";

  // ── Filters ──────────────────────────────────────────────────────
  const filtered = ALL_TESTS.filter(t => {
    if(tab==="roadmap") return t.week !== undefined;
    if(tab==="topic")   return t.category === "topic";
    if(tab==="mock")    return t.category === "mock";
    if(tab==="company") return t.category === "company";
    return true;
  });

  // Group by week for roadmap tab
  const byWeek: Record<number, TestDef[]> = {};
  if(tab==="roadmap") {
    filtered.forEach(t => { if(t.week){ byWeek[t.week] = byWeek[t.week]||[]; byWeek[t.week].push(t); } });
  }

  return (
    <div style={{ padding:24, maxWidth:960 }}>
      <div style={{ marginBottom:20 }}>
        <h1 style={{ fontSize:22, fontWeight:600, marginBottom:4 }}>⏱ Timed Tests</h1>
        <p style={{ color:"var(--t2)", fontSize:13 }}>
          {ALL_TESTS.length} tests aligned to the 12-week roadmap — topic drills, weekly reviews, mock interviews, and company simulations.
        </p>
      </div>

      {/* ── Active timer ─────────────────────────────────────────── */}
      {running && (
        <div className="card" style={{ padding:24, marginBottom:20, textAlign:"center", borderLeft:`3px solid ${timerColor}` }}>
          <div style={{ fontSize:12, color:"var(--t2)", marginBottom:4, fontWeight:500 }}>{running.name}</div>
          <div style={{ fontSize:56, fontWeight:700, letterSpacing:4, color:timerColor, fontVariantNumeric:"tabular-nums", marginBottom:12 }}>
            {finished ? "Done!" : `${mm}:${ss}`}
          </div>
          {!finished ? (
            <div style={{ display:"flex", gap:10, justifyContent:"center", marginBottom:16 }}>
              <button className="btn-secondary" onClick={() => setPaused(p=>!p)}>
                {paused ? "▶ Resume" : "⏸ Pause"}
              </button>
              <button className="btn-primary" style={{ background:"var(--red)" }} onClick={endTest}>Stop & Save</button>
            </div>
          ) : (
            <div style={{ marginBottom:16 }}>
              <div style={{ fontSize:14, fontWeight:500, color:"var(--green)", marginBottom:8 }}>Test complete! Results saved.</div>
              <button className="btn-secondary" onClick={() => setRunning(null)}>Close</button>
            </div>
          )}
          {/* Problems list */}
          <div style={{ textAlign:"left", maxWidth:500, margin:"0 auto" }}>
            <div style={{ fontSize:12, fontWeight:600, color:"var(--t2)", marginBottom:8, textTransform:"uppercase", letterSpacing:".3px" }}>Problems</div>
            {running.problems.map((p,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"5px 0", borderBottom:"var(--bd)" }}>
                <span style={{ fontSize:12, color:"var(--t2)", width:16 }}>{i+1}</span>
                <a href={p.lcUrl} target="_blank" rel="noreferrer"
                  style={{ flex:1, fontSize:13, color:"var(--blue)", fontWeight:500 }}>{p.title}</a>
                <span className={`badge badge-${p.difficulty}`}>{p.difficulty}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Tabs ─────────────────────────────────────────────────── */}
      <div style={{ display:"flex", gap:2, borderBottom:"var(--bd)", marginBottom:20 }}>
        {([["roadmap","📅 By Roadmap"],["topic","📖 Topic Tests"],["mock","🎯 Mock Interviews"],["company","🏢 Company Sims"]] as [string,string][]).map(([key,label]) => (
          <button key={key} onClick={() => setTab(key as typeof tab)} style={{
            padding:"8px 16px", background:"none", border:"none",
            borderBottom:`2px solid ${tab===key?"var(--green)":"transparent"}`,
            color: tab===key?"var(--green)":"var(--t2)",
            fontWeight: tab===key?600:400,
            marginBottom:-1, cursor:"pointer", fontSize:13,
          }}>{label}</button>
        ))}
      </div>

      {/* ── Roadmap view ─────────────────────────────────────────── */}
      {tab==="roadmap" && (
        <div>
          {Object.keys(byWeek).sort((a,b)=>+a-+b).map(weekStr => {
            const wn = +weekStr;
            const planWeek = WEEKLY_PLAN.find(w=>w.week===wn);
            return (
              <div key={wn} style={{ marginBottom:24 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                  <div style={{ width:32, height:32, borderRadius:"50%", background:"var(--green)", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:13, flexShrink:0 }}>{wn}</div>
                  <div>
                    <div style={{ fontWeight:600, fontSize:14 }}>Week {wn}{planWeek ? ` — ${planWeek.title}` : ""}</div>
                    {planWeek && <div style={{ fontSize:12, color:"var(--t2)" }}>{planWeek.goals[0]}</div>}
                  </div>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:10, paddingLeft:42 }}>
                  {byWeek[wn].map(t => <TestCard key={t.id} test={t} onStart={startTest} />)}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── List view for other tabs ─────────────────────────────── */}
      {tab !== "roadmap" && (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:12 }}>
          {filtered.map(t => <TestCard key={t.id} test={t} onStart={startTest} />)}
        </div>
      )}

      {/* ── History ──────────────────────────────────────────────── */}
      {testHistory.length > 0 && (
        <div style={{ marginTop:32 }}>
          <h3 style={{ fontSize:14, fontWeight:600, marginBottom:12 }}>Recent Test History</h3>
          <div className="card" style={{ overflow:"hidden" }}>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead>
                <tr style={{ borderBottom:"var(--bd)" }}>
                  <th style={TH}>Test</th>
                  <th style={TH}>Duration</th>
                  <th style={TH}>Date</th>
                </tr>
              </thead>
              <tbody>
                {testHistory.map((t,i) => (
                  <tr key={i} style={{ borderBottom:"var(--bd)" }}>
                    <td style={TD}>{t.testName}</td>
                    <td style={TD}>{t.durationMin} min</td>
                    <td style={{ ...TD, color:"var(--t2)" }}>{new Date(t.completedAt).toLocaleDateString()}</td>
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

// ── TestCard component ──────────────────────────────────────────────────────
function TestCard({ test, onStart }: { test: TestDef; onStart: (t: TestDef) => void }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="card" style={{ display:"flex", flexDirection:"column" }}>
      <div style={{ padding:"14px 16px", flex:1 }}>
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:8, marginBottom:6 }}>
          <div style={{ fontWeight:600, fontSize:13, lineHeight:1.3 }}>{test.name}</div>
          <span style={{ fontSize:10, padding:"2px 7px", borderRadius:10, fontWeight:600, background:DIFF_BG[test.difficulty], color:DIFF_COLORS[test.difficulty], flexShrink:0, whiteSpace:"nowrap" }}>
            {test.difficulty}
          </span>
        </div>
        <div style={{ fontSize:12, color:"var(--t2)", marginBottom:10, lineHeight:1.5 }}>{test.description}</div>
        <div style={{ display:"flex", gap:10, fontSize:11, color:"var(--t3)", marginBottom:10 }}>
          <span>⏱ {test.durationMin} min</span>
          <span>📋 {test.problems.length} problems</span>
          <span style={{ background:"var(--bg3)", padding:"1px 6px", borderRadius:8 }}>{CAT_LABEL[test.category]}</span>
        </div>

        {/* Problem list toggle */}
        <button onClick={() => setExpanded(e=>!e)} style={{ background:"none", border:"none", fontSize:12, color:"var(--blue)", cursor:"pointer", padding:0 }}>
          {expanded ? "▲ Hide problems" : "▼ Show problems"}
        </button>
        {expanded && (
          <div style={{ marginTop:8 }}>
            {test.problems.map((p,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:8, padding:"4px 0", borderBottom:"var(--bd)", fontSize:12 }}>
                <span style={{ color:"var(--t3)", width:14 }}>{i+1}</span>
                <a href={p.lcUrl} target="_blank" rel="noreferrer" style={{ flex:1, color:"var(--blue)" }}>{p.title}</a>
                <span className={`badge badge-${p.difficulty}`} style={{ fontSize:10 }}>{p.difficulty}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{ padding:"10px 16px", borderTop:"var(--bd)" }}>
        <button onClick={() => onStart(test)} className="btn-primary" style={{ width:"100%", padding:"8px" }}>
          Start Test
        </button>
      </div>
    </div>
  );
}

const TH: React.CSSProperties = { textAlign:"left", padding:"8px 16px", fontSize:11, fontWeight:500, color:"var(--t2)", textTransform:"uppercase", letterSpacing:".3px" };
const TD: React.CSSProperties = { padding:"10px 16px", fontSize:13 };
