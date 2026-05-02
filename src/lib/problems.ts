// src/lib/problems.ts
// 500+ curated LeetCode problems across 15 topics
// Enough to get placed at Google, Amazon, Microsoft, Flipkart, Adobe, etc.

export type Problem = {
  number: number;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  pattern: string;
  lcUrl: string;
  companies?: string[]; // which companies frequently ask this
  mustSolve?: boolean;  // blind75 / neetcode150 core problems
};

export const PROBLEMS: Record<string, Problem[]> = {

  // ─────────────────────────────────────────────────
  // ARRAYS & STRINGS  (35 problems)
  // ─────────────────────────────────────────────────
  arrays: [
    { number:1,  title:"Two Sum",                                   difficulty:"easy",   pattern:"HashMap",         lcUrl:"https://leetcode.com/problems/two-sum/",                                              mustSolve:true,  companies:["Google","Amazon","Facebook"] },
    { number:2,  title:"Best Time to Buy and Sell Stock",           difficulty:"easy",   pattern:"Sliding Window",  lcUrl:"https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",                      mustSolve:true,  companies:["Amazon","Google"] },
    { number:3,  title:"Contains Duplicate",                        difficulty:"easy",   pattern:"HashSet",         lcUrl:"https://leetcode.com/problems/contains-duplicate/",                                   mustSolve:true },
    { number:4,  title:"Missing Number",                            difficulty:"easy",   pattern:"XOR/Math",        lcUrl:"https://leetcode.com/problems/missing-number/" },
    { number:5,  title:"Find All Numbers Disappeared in Array",     difficulty:"easy",   pattern:"Index as Hash",   lcUrl:"https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/" },
    { number:6,  title:"Single Number",                             difficulty:"easy",   pattern:"XOR",             lcUrl:"https://leetcode.com/problems/single-number/" },
    { number:7,  title:"Move Zeroes",                               difficulty:"easy",   pattern:"Two Pointers",    lcUrl:"https://leetcode.com/problems/move-zeroes/" },
    { number:8,  title:"Plus One",                                  difficulty:"easy",   pattern:"Array",           lcUrl:"https://leetcode.com/problems/plus-one/" },
    { number:9,  title:"Remove Duplicates from Sorted Array",       difficulty:"easy",   pattern:"Two Pointers",    lcUrl:"https://leetcode.com/problems/remove-duplicates-from-sorted-array/" },
    { number:10, title:"Maximum Subarray",                          difficulty:"medium", pattern:"Kadane's",        lcUrl:"https://leetcode.com/problems/maximum-subarray/",                                     mustSolve:true,  companies:["Amazon","Microsoft"] },
    { number:11, title:"Product of Array Except Self",              difficulty:"medium", pattern:"Prefix Sum",      lcUrl:"https://leetcode.com/problems/product-of-array-except-self/",                         mustSolve:true,  companies:["Amazon","Facebook","Microsoft"] },
    { number:12, title:"Maximum Product Subarray",                  difficulty:"medium", pattern:"DP",              lcUrl:"https://leetcode.com/problems/maximum-product-subarray/",                             mustSolve:true },
    { number:13, title:"Find Minimum in Rotated Sorted Array",      difficulty:"medium", pattern:"Binary Search",   lcUrl:"https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",                 mustSolve:true },
    { number:14, title:"Search in Rotated Sorted Array",            difficulty:"medium", pattern:"Binary Search",   lcUrl:"https://leetcode.com/problems/search-in-rotated-sorted-array/",                       mustSolve:true,  companies:["Amazon","Microsoft"] },
    { number:15, title:"3Sum",                                      difficulty:"medium", pattern:"Two Pointers",    lcUrl:"https://leetcode.com/problems/3sum/",                                                 mustSolve:true,  companies:["Amazon","Google","Facebook"] },
    { number:16, title:"Container With Most Water",                 difficulty:"medium", pattern:"Two Pointers",    lcUrl:"https://leetcode.com/problems/container-with-most-water/",                            mustSolve:true },
    { number:17, title:"Subarray Sum Equals K",                     difficulty:"medium", pattern:"Prefix Sum",      lcUrl:"https://leetcode.com/problems/subarray-sum-equals-k/",                                companies:["Facebook","Google"] },
    { number:18, title:"Longest Consecutive Sequence",              difficulty:"medium", pattern:"HashSet",         lcUrl:"https://leetcode.com/problems/longest-consecutive-sequence/",                         mustSolve:true,  companies:["Google","Facebook"] },
    { number:19, title:"Set Matrix Zeroes",                         difficulty:"medium", pattern:"Matrix",          lcUrl:"https://leetcode.com/problems/set-matrix-zeroes/",                                    mustSolve:true,  companies:["Amazon","Microsoft"] },
    { number:20, title:"Spiral Matrix",                             difficulty:"medium", pattern:"Matrix",          lcUrl:"https://leetcode.com/problems/spiral-matrix/",                                        mustSolve:true,  companies:["Amazon","Microsoft"] },
    { number:21, title:"Rotate Image",                              difficulty:"medium", pattern:"Matrix",          lcUrl:"https://leetcode.com/problems/rotate-image/",                                         mustSolve:true },
    { number:22, title:"Jump Game",                                 difficulty:"medium", pattern:"Greedy",          lcUrl:"https://leetcode.com/problems/jump-game/",                                            mustSolve:true },
    { number:23, title:"Jump Game II",                              difficulty:"medium", pattern:"Greedy",          lcUrl:"https://leetcode.com/problems/jump-game-ii/" },
    { number:24, title:"Merge Intervals",                           difficulty:"medium", pattern:"Intervals",       lcUrl:"https://leetcode.com/problems/merge-intervals/",                                      mustSolve:true,  companies:["Google","Facebook","Amazon"] },
    { number:25, title:"Insert Interval",                           difficulty:"medium", pattern:"Intervals",       lcUrl:"https://leetcode.com/problems/insert-interval/",                                      mustSolve:true },
    { number:26, title:"Non-overlapping Intervals",                 difficulty:"medium", pattern:"Intervals",       lcUrl:"https://leetcode.com/problems/non-overlapping-intervals/" },
    { number:27, title:"4Sum",                                      difficulty:"medium", pattern:"Two Pointers",    lcUrl:"https://leetcode.com/problems/4sum/" },
    { number:28, title:"Sort Colors",                               difficulty:"medium", pattern:"Dutch Flag",      lcUrl:"https://leetcode.com/problems/sort-colors/",                                          companies:["Microsoft","Adobe"] },
    { number:29, title:"Next Permutation",                          difficulty:"medium", pattern:"Array",           lcUrl:"https://leetcode.com/problems/next-permutation/",                                     companies:["Amazon","Google"] },
    { number:30, title:"Find the Duplicate Number",                 difficulty:"medium", pattern:"Floyd's / BS",    lcUrl:"https://leetcode.com/problems/find-the-duplicate-number/",                            mustSolve:true },
    { number:31, title:"Trapping Rain Water",                       difficulty:"hard",   pattern:"Two Pointers",    lcUrl:"https://leetcode.com/problems/trapping-rain-water/",                                  mustSolve:true,  companies:["Amazon","Google","Facebook"] },
    { number:32, title:"Minimum Window Substring",                  difficulty:"hard",   pattern:"Sliding Window",  lcUrl:"https://leetcode.com/problems/minimum-window-substring/",                             mustSolve:true,  companies:["Amazon","Facebook"] },
    { number:33, title:"Largest Rectangle in Histogram",            difficulty:"hard",   pattern:"Monotonic Stack", lcUrl:"https://leetcode.com/problems/largest-rectangle-in-histogram/",                       mustSolve:true,  companies:["Google","Amazon"] },
    { number:34, title:"Maximum Points You Can Obtain from Cards",  difficulty:"medium", pattern:"Sliding Window",  lcUrl:"https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/" },
    { number:35, title:"Candy",                                     difficulty:"hard",   pattern:"Greedy",          lcUrl:"https://leetcode.com/problems/candy/" },
  ],

  // ─────────────────────────────────────────────────
  // HASHING  (20 problems)
  // ─────────────────────────────────────────────────
  hashing: [
    { number:1,  title:"Two Sum",                               difficulty:"easy",   pattern:"HashMap",       lcUrl:"https://leetcode.com/problems/two-sum/",                                             mustSolve:true },
    { number:2,  title:"Valid Anagram",                         difficulty:"easy",   pattern:"Frequency Map", lcUrl:"https://leetcode.com/problems/valid-anagram/",                                       mustSolve:true },
    { number:3,  title:"Ransom Note",                           difficulty:"easy",   pattern:"Frequency Map", lcUrl:"https://leetcode.com/problems/ransom-note/" },
    { number:4,  title:"Isomorphic Strings",                    difficulty:"easy",   pattern:"HashMap",       lcUrl:"https://leetcode.com/problems/isomorphic-strings/" },
    { number:5,  title:"Word Pattern",                          difficulty:"easy",   pattern:"HashMap",       lcUrl:"https://leetcode.com/problems/word-pattern/" },
    { number:6,  title:"Happy Number",                          difficulty:"easy",   pattern:"HashSet / Floyd's", lcUrl:"https://leetcode.com/problems/happy-number/",                                    companies:["Amazon"] },
    { number:7,  title:"Contains Duplicate II",                 difficulty:"easy",   pattern:"HashMap",       lcUrl:"https://leetcode.com/problems/contains-duplicate-ii/" },
    { number:8,  title:"Group Anagrams",                        difficulty:"medium", pattern:"HashMap",       lcUrl:"https://leetcode.com/problems/group-anagrams/",                                      mustSolve:true,  companies:["Amazon","Facebook","Google"] },
    { number:9,  title:"Top K Frequent Elements",               difficulty:"medium", pattern:"Bucket Sort",   lcUrl:"https://leetcode.com/problems/top-k-frequent-elements/",                            mustSolve:true },
    { number:10, title:"Encode and Decode Strings",             difficulty:"medium", pattern:"Design",        lcUrl:"https://leetcode.com/problems/encode-and-decode-strings/",                          mustSolve:true },
    { number:11, title:"Longest Consecutive Sequence",          difficulty:"medium", pattern:"HashSet",       lcUrl:"https://leetcode.com/problems/longest-consecutive-sequence/",                       mustSolve:true },
    { number:12, title:"LRU Cache",                             difficulty:"medium", pattern:"HashMap+DLL",   lcUrl:"https://leetcode.com/problems/lru-cache/",                                          mustSolve:true,  companies:["Amazon","Facebook","Google"] },
    { number:13, title:"Subarray Sum Equals K",                 difficulty:"medium", pattern:"Prefix+Map",    lcUrl:"https://leetcode.com/problems/subarray-sum-equals-k/" },
    { number:14, title:"4Sum II",                               difficulty:"medium", pattern:"HashMap",       lcUrl:"https://leetcode.com/problems/4sum-ii/" },
    { number:15, title:"Contiguous Array",                      difficulty:"medium", pattern:"HashMap",       lcUrl:"https://leetcode.com/problems/contiguous-array/",                                   companies:["Facebook"] },
    { number:16, title:"Brick Wall",                            difficulty:"medium", pattern:"HashMap",       lcUrl:"https://leetcode.com/problems/brick-wall/" },
    { number:17, title:"Longest Palindrome",                    difficulty:"easy",   pattern:"Frequency",     lcUrl:"https://leetcode.com/problems/longest-palindrome/" },
    { number:18, title:"First Missing Positive",                difficulty:"hard",   pattern:"Index Hashing", lcUrl:"https://leetcode.com/problems/first-missing-positive/",                             mustSolve:true,  companies:["Amazon"] },
    { number:19, title:"Design HashMap",                        difficulty:"easy",   pattern:"Design",        lcUrl:"https://leetcode.com/problems/design-hashmap/" },
    { number:20, title:"Design HashSet",                        difficulty:"easy",   pattern:"Design",        lcUrl:"https://leetcode.com/problems/design-hashset/" },
  ],

  // ─────────────────────────────────────────────────
  // TWO POINTERS  (18 problems)
  // ─────────────────────────────────────────────────
  twopointers: [
    { number:1,  title:"Valid Palindrome",                      difficulty:"easy",   pattern:"Two Pointers",  lcUrl:"https://leetcode.com/problems/valid-palindrome/",                                   mustSolve:true },
    { number:2,  title:"Remove Duplicates from Sorted Array",   difficulty:"easy",   pattern:"Two Pointers",  lcUrl:"https://leetcode.com/problems/remove-duplicates-from-sorted-array/" },
    { number:3,  title:"Remove Element",                        difficulty:"easy",   pattern:"Two Pointers",  lcUrl:"https://leetcode.com/problems/remove-element/" },
    { number:4,  title:"Squares of a Sorted Array",             difficulty:"easy",   pattern:"Two Pointers",  lcUrl:"https://leetcode.com/problems/squares-of-a-sorted-array/" },
    { number:5,  title:"Move Zeroes",                           difficulty:"easy",   pattern:"Two Pointers",  lcUrl:"https://leetcode.com/problems/move-zeroes/" },
    { number:6,  title:"Two Sum II",                            difficulty:"medium", pattern:"Two Pointers",  lcUrl:"https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",                   mustSolve:true },
    { number:7,  title:"3Sum",                                  difficulty:"medium", pattern:"Two Pointers",  lcUrl:"https://leetcode.com/problems/3sum/",                                               mustSolve:true },
    { number:8,  title:"3Sum Closest",                          difficulty:"medium", pattern:"Two Pointers",  lcUrl:"https://leetcode.com/problems/3sum-closest/" },
    { number:9,  title:"Container With Most Water",             difficulty:"medium", pattern:"Two Pointers",  lcUrl:"https://leetcode.com/problems/container-with-most-water/",                         mustSolve:true },
    { number:10, title:"4Sum",                                  difficulty:"medium", pattern:"Two Pointers",  lcUrl:"https://leetcode.com/problems/4sum/" },
    { number:11, title:"Sort Colors",                           difficulty:"medium", pattern:"Dutch Flag",    lcUrl:"https://leetcode.com/problems/sort-colors/" },
    { number:12, title:"Boats to Save People",                  difficulty:"medium", pattern:"Two Pointers",  lcUrl:"https://leetcode.com/problems/boats-to-save-people/" },
    { number:13, title:"Partition Array According to Given Pivot", difficulty:"medium", pattern:"Two Pointers", lcUrl:"https://leetcode.com/problems/partition-array-according-to-given-pivot/" },
    { number:14, title:"Minimum Length of String After Deleting",  difficulty:"medium", pattern:"Two Pointers", lcUrl:"https://leetcode.com/problems/minimum-length-of-string-after-deleting-similar-ends/" },
    { number:15, title:"Valid Palindrome II",                   difficulty:"easy",   pattern:"Two Pointers",  lcUrl:"https://leetcode.com/problems/valid-palindrome-ii/",                                companies:["Facebook"] },
    { number:16, title:"Merge Sorted Array",                    difficulty:"easy",   pattern:"Two Pointers",  lcUrl:"https://leetcode.com/problems/merge-sorted-array/",                                 companies:["Amazon","Microsoft"] },
    { number:17, title:"Trapping Rain Water",                   difficulty:"hard",   pattern:"Two Pointers",  lcUrl:"https://leetcode.com/problems/trapping-rain-water/",                               mustSolve:true },
    { number:18, title:"Minimum Window Substring",              difficulty:"hard",   pattern:"Two Pointers",  lcUrl:"https://leetcode.com/problems/minimum-window-substring/",                          mustSolve:true },
  ],

  // ─────────────────────────────────────────────────
  // SLIDING WINDOW  (18 problems)
  // ─────────────────────────────────────────────────
  sliding: [
    { number:1,  title:"Best Time to Buy and Sell Stock",               difficulty:"easy",   pattern:"Fixed Window",    lcUrl:"https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",                mustSolve:true },
    { number:2,  title:"Maximum Average Subarray I",                    difficulty:"easy",   pattern:"Fixed Window",    lcUrl:"https://leetcode.com/problems/maximum-average-subarray-i/" },
    { number:3,  title:"Contains Duplicate II",                         difficulty:"easy",   pattern:"Sliding Window",  lcUrl:"https://leetcode.com/problems/contains-duplicate-ii/" },
    { number:4,  title:"Longest Substring Without Repeating Characters",difficulty:"medium", pattern:"Variable Window", lcUrl:"https://leetcode.com/problems/longest-substring-without-repeating-characters/", mustSolve:true, companies:["Amazon","Google","Facebook"] },
    { number:5,  title:"Longest Repeating Character Replacement",       difficulty:"medium", pattern:"Variable Window", lcUrl:"https://leetcode.com/problems/longest-repeating-character-replacement/",       mustSolve:true },
    { number:6,  title:"Permutation in String",                         difficulty:"medium", pattern:"Fixed Window",    lcUrl:"https://leetcode.com/problems/permutation-in-string/",                          mustSolve:true },
    { number:7,  title:"Find All Anagrams in a String",                 difficulty:"medium", pattern:"Fixed Window",    lcUrl:"https://leetcode.com/problems/find-all-anagrams-in-a-string/",                  companies:["Facebook"] },
    { number:8,  title:"Max Consecutive Ones III",                      difficulty:"medium", pattern:"Variable Window", lcUrl:"https://leetcode.com/problems/max-consecutive-ones-iii/" },
    { number:9,  title:"Minimum Size Subarray Sum",                     difficulty:"medium", pattern:"Variable Window", lcUrl:"https://leetcode.com/problems/minimum-size-subarray-sum/",                       companies:["Amazon"] },
    { number:10, title:"Subarray Product Less Than K",                  difficulty:"medium", pattern:"Variable Window", lcUrl:"https://leetcode.com/problems/subarray-product-less-than-k/" },
    { number:11, title:"Longest Subarray of 1s After Deleting One Element", difficulty:"medium", pattern:"Variable Window", lcUrl:"https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/" },
    { number:12, title:"Fruit Into Baskets",                            difficulty:"medium", pattern:"Variable Window", lcUrl:"https://leetcode.com/problems/fruit-into-baskets/" },
    { number:13, title:"Maximum Points from Cards",                     difficulty:"medium", pattern:"Fixed Window",    lcUrl:"https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/" },
    { number:14, title:"Number of Substrings with All 3 Characters",    difficulty:"medium", pattern:"Variable Window", lcUrl:"https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/" },
    { number:15, title:"Minimum Window Substring",                      difficulty:"hard",   pattern:"Variable Window", lcUrl:"https://leetcode.com/problems/minimum-window-substring/",                        mustSolve:true },
    { number:16, title:"Sliding Window Maximum",                        difficulty:"hard",   pattern:"Monotonic Deque", lcUrl:"https://leetcode.com/problems/sliding-window-maximum/",                          mustSolve:true, companies:["Amazon","Google"] },
    { number:17, title:"Substring with Concatenation of All Words",     difficulty:"hard",   pattern:"Sliding Window",  lcUrl:"https://leetcode.com/problems/substring-with-concatenation-of-all-words/" },
    { number:18, title:"Minimum Number of Flips to Make Binary Grid Palindrome", difficulty:"medium", pattern:"Sliding Window", lcUrl:"https://leetcode.com/problems/minimum-number-of-flips-to-make-the-binary-grid-palindromic/" },
  ],

  // ─────────────────────────────────────────────────
  // STACK & QUEUE  (20 problems)
  // ─────────────────────────────────────────────────
  stack: [
    { number:1,  title:"Valid Parentheses",                     difficulty:"easy",   pattern:"Stack",           lcUrl:"https://leetcode.com/problems/valid-parentheses/",                                  mustSolve:true,  companies:["Google","Amazon","Microsoft"] },
    { number:2,  title:"Next Greater Element I",                difficulty:"easy",   pattern:"Monotonic Stack", lcUrl:"https://leetcode.com/problems/next-greater-element-i/" },
    { number:3,  title:"Remove Outermost Parentheses",          difficulty:"easy",   pattern:"Stack",           lcUrl:"https://leetcode.com/problems/remove-outermost-parentheses/" },
    { number:4,  title:"Baseball Game",                         difficulty:"easy",   pattern:"Stack",           lcUrl:"https://leetcode.com/problems/baseball-game/" },
    { number:5,  title:"Implement Stack using Queues",          difficulty:"easy",   pattern:"Design",          lcUrl:"https://leetcode.com/problems/implement-stack-using-queues/" },
    { number:6,  title:"Min Stack",                             difficulty:"medium", pattern:"Stack",           lcUrl:"https://leetcode.com/problems/min-stack/",                                          mustSolve:true },
    { number:7,  title:"Evaluate Reverse Polish Notation",      difficulty:"medium", pattern:"Stack",           lcUrl:"https://leetcode.com/problems/evaluate-reverse-polish-notation/",                   mustSolve:true },
    { number:8,  title:"Generate Parentheses",                  difficulty:"medium", pattern:"Backtracking",    lcUrl:"https://leetcode.com/problems/generate-parentheses/",                               mustSolve:true },
    { number:9,  title:"Daily Temperatures",                    difficulty:"medium", pattern:"Monotonic Stack", lcUrl:"https://leetcode.com/problems/daily-temperatures/",                                 mustSolve:true,  companies:["Amazon"] },
    { number:10, title:"Online Stock Span",                     difficulty:"medium", pattern:"Monotonic Stack", lcUrl:"https://leetcode.com/problems/online-stock-span/" },
    { number:11, title:"Car Fleet",                             difficulty:"medium", pattern:"Monotonic Stack", lcUrl:"https://leetcode.com/problems/car-fleet/",                                          mustSolve:true },
    { number:12, title:"Decode String",                         difficulty:"medium", pattern:"Stack",           lcUrl:"https://leetcode.com/problems/decode-string/",                                      companies:["Google","Amazon"] },
    { number:13, title:"Asteroid Collision",                    difficulty:"medium", pattern:"Stack",           lcUrl:"https://leetcode.com/problems/asteroid-collision/",                                 companies:["Amazon"] },
    { number:14, title:"Remove K Digits",                       difficulty:"medium", pattern:"Monotonic Stack", lcUrl:"https://leetcode.com/problems/remove-k-digits/" },
    { number:15, title:"132 Pattern",                           difficulty:"medium", pattern:"Monotonic Stack", lcUrl:"https://leetcode.com/problems/132-pattern/" },
    { number:16, title:"Next Greater Element II",               difficulty:"medium", pattern:"Monotonic Stack", lcUrl:"https://leetcode.com/problems/next-greater-element-ii/" },
    { number:17, title:"Simplify Path",                         difficulty:"medium", pattern:"Stack",           lcUrl:"https://leetcode.com/problems/simplify-path/",                                      companies:["Facebook"] },
    { number:18, title:"Largest Rectangle in Histogram",        difficulty:"hard",   pattern:"Monotonic Stack", lcUrl:"https://leetcode.com/problems/largest-rectangle-in-histogram/",                     mustSolve:true },
    { number:19, title:"Maximum Frequency Stack",               difficulty:"hard",   pattern:"Stack Design",    lcUrl:"https://leetcode.com/problems/maximum-frequency-stack/",                            mustSolve:true },
    { number:20, title:"Maximal Rectangle",                     difficulty:"hard",   pattern:"Stack",           lcUrl:"https://leetcode.com/problems/maximal-rectangle/",                                  companies:["Amazon"] },
  ],

  // ─────────────────────────────────────────────────
  // LINKED LIST  (20 problems)
  // ─────────────────────────────────────────────────
  linkedlist: [
    { number:1,  title:"Reverse Linked List",                   difficulty:"easy",   pattern:"Iterative/Recursive", lcUrl:"https://leetcode.com/problems/reverse-linked-list/",                            mustSolve:true,  companies:["Amazon","Microsoft"] },
    { number:2,  title:"Merge Two Sorted Lists",                difficulty:"easy",   pattern:"Merge",           lcUrl:"https://leetcode.com/problems/merge-two-sorted-lists/",                             mustSolve:true,  companies:["Amazon","Microsoft"] },
    { number:3,  title:"Linked List Cycle",                     difficulty:"easy",   pattern:"Floyd's",         lcUrl:"https://leetcode.com/problems/linked-list-cycle/",                                  mustSolve:true },
    { number:4,  title:"Palindrome Linked List",                difficulty:"easy",   pattern:"Slow-Fast",       lcUrl:"https://leetcode.com/problems/palindrome-linked-list/",                             mustSolve:true },
    { number:5,  title:"Intersection of Two Linked Lists",      difficulty:"easy",   pattern:"Two Pointers",    lcUrl:"https://leetcode.com/problems/intersection-of-two-linked-lists/",                   companies:["Amazon"] },
    { number:6,  title:"Delete Node in a Linked List",          difficulty:"medium", pattern:"Pointer Trick",   lcUrl:"https://leetcode.com/problems/delete-node-in-a-linked-list/" },
    { number:7,  title:"Middle of the Linked List",             difficulty:"easy",   pattern:"Slow-Fast",       lcUrl:"https://leetcode.com/problems/middle-of-the-linked-list/" },
    { number:8,  title:"Remove Duplicates from Sorted List",    difficulty:"easy",   pattern:"Pointers",        lcUrl:"https://leetcode.com/problems/remove-duplicates-from-sorted-list/" },
    { number:9,  title:"Remove Nth Node From End",              difficulty:"medium", pattern:"Slow-Fast",       lcUrl:"https://leetcode.com/problems/remove-nth-node-from-end-of-list/",                   mustSolve:true },
    { number:10, title:"Reorder List",                          difficulty:"medium", pattern:"Slow-Fast+Merge", lcUrl:"https://leetcode.com/problems/reorder-list/",                                       mustSolve:true },
    { number:11, title:"Copy List with Random Pointer",         difficulty:"medium", pattern:"HashMap",         lcUrl:"https://leetcode.com/problems/copy-list-with-random-pointer/",                      mustSolve:true,  companies:["Amazon","Google"] },
    { number:12, title:"Add Two Numbers",                       difficulty:"medium", pattern:"Simulation",      lcUrl:"https://leetcode.com/problems/add-two-numbers/",                                    mustSolve:true },
    { number:13, title:"Swap Nodes in Pairs",                   difficulty:"medium", pattern:"Pointers",        lcUrl:"https://leetcode.com/problems/swap-nodes-in-pairs/" },
    { number:14, title:"Odd Even Linked List",                  difficulty:"medium", pattern:"Pointers",        lcUrl:"https://leetcode.com/problems/odd-even-linked-list/",                               companies:["Amazon"] },
    { number:15, title:"Linked List Cycle II",                  difficulty:"medium", pattern:"Floyd's",         lcUrl:"https://leetcode.com/problems/linked-list-cycle-ii/" },
    { number:16, title:"Sort List",                             difficulty:"medium", pattern:"Merge Sort",      lcUrl:"https://leetcode.com/problems/sort-list/",                                          companies:["Google","Amazon"] },
    { number:17, title:"LRU Cache",                             difficulty:"medium", pattern:"DLL+HashMap",     lcUrl:"https://leetcode.com/problems/lru-cache/",                                          mustSolve:true },
    { number:18, title:"Remove Duplicates from Sorted List II", difficulty:"medium", pattern:"Dummy Head",      lcUrl:"https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/" },
    { number:19, title:"Merge K Sorted Lists",                  difficulty:"hard",   pattern:"Heap/Merge",      lcUrl:"https://leetcode.com/problems/merge-k-sorted-lists/",                               mustSolve:true,  companies:["Google","Amazon"] },
    { number:20, title:"Reverse Nodes in K-Group",              difficulty:"hard",   pattern:"Pointers",        lcUrl:"https://leetcode.com/problems/reverse-nodes-in-k-group/",                           mustSolve:true,  companies:["Google"] },
  ],

  // ─────────────────────────────────────────────────
  // TREES  (35 problems)
  // ─────────────────────────────────────────────────
  trees: [
    { number:1,  title:"Invert Binary Tree",                           difficulty:"easy",   pattern:"DFS",             lcUrl:"https://leetcode.com/problems/invert-binary-tree/",                           mustSolve:true },
    { number:2,  title:"Maximum Depth of Binary Tree",                 difficulty:"easy",   pattern:"DFS",             lcUrl:"https://leetcode.com/problems/maximum-depth-of-binary-tree/",                 mustSolve:true },
    { number:3,  title:"Diameter of Binary Tree",                      difficulty:"easy",   pattern:"DFS",             lcUrl:"https://leetcode.com/problems/diameter-of-binary-tree/",                      mustSolve:true },
    { number:4,  title:"Balanced Binary Tree",                         difficulty:"easy",   pattern:"DFS",             lcUrl:"https://leetcode.com/problems/balanced-binary-tree/",                         mustSolve:true },
    { number:5,  title:"Same Tree",                                    difficulty:"easy",   pattern:"DFS",             lcUrl:"https://leetcode.com/problems/same-tree/",                                     mustSolve:true },
    { number:6,  title:"Subtree of Another Tree",                      difficulty:"easy",   pattern:"DFS",             lcUrl:"https://leetcode.com/problems/subtree-of-another-tree/",                      mustSolve:true },
    { number:7,  title:"Symmetric Tree",                               difficulty:"easy",   pattern:"DFS",             lcUrl:"https://leetcode.com/problems/symmetric-tree/",                                companies:["Microsoft","Amazon"] },
    { number:8,  title:"Path Sum",                                     difficulty:"easy",   pattern:"DFS",             lcUrl:"https://leetcode.com/problems/path-sum/" },
    { number:9,  title:"Minimum Depth of Binary Tree",                 difficulty:"easy",   pattern:"BFS/DFS",         lcUrl:"https://leetcode.com/problems/minimum-depth-of-binary-tree/" },
    { number:10, title:"Binary Tree Level Order Traversal",            difficulty:"medium", pattern:"BFS",             lcUrl:"https://leetcode.com/problems/binary-tree-level-order-traversal/",             mustSolve:true,  companies:["Amazon","Microsoft"] },
    { number:11, title:"Binary Tree Right Side View",                  difficulty:"medium", pattern:"BFS",             lcUrl:"https://leetcode.com/problems/binary-tree-right-side-view/",                  mustSolve:true,  companies:["Facebook"] },
    { number:12, title:"Average of Levels in Binary Tree",             difficulty:"easy",   pattern:"BFS",             lcUrl:"https://leetcode.com/problems/average-of-levels-in-binary-tree/" },
    { number:13, title:"Binary Tree Zigzag Level Order Traversal",     difficulty:"medium", pattern:"BFS",             lcUrl:"https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/",     companies:["Amazon"] },
    { number:14, title:"Count Good Nodes in Binary Tree",              difficulty:"medium", pattern:"DFS",             lcUrl:"https://leetcode.com/problems/count-good-nodes-in-binary-tree/",              mustSolve:true },
    { number:15, title:"Validate Binary Search Tree",                  difficulty:"medium", pattern:"BST",             lcUrl:"https://leetcode.com/problems/validate-binary-search-tree/",                  mustSolve:true,  companies:["Amazon","Google"] },
    { number:16, title:"Kth Smallest Element in BST",                  difficulty:"medium", pattern:"BST Inorder",     lcUrl:"https://leetcode.com/problems/kth-smallest-element-in-a-bst/",                mustSolve:true,  companies:["Amazon","Google"] },
    { number:17, title:"Lowest Common Ancestor of BST",                difficulty:"medium", pattern:"BST",             lcUrl:"https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/", mustSolve:true },
    { number:18, title:"Lowest Common Ancestor of Binary Tree",        difficulty:"medium", pattern:"DFS",             lcUrl:"https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",      mustSolve:true,  companies:["Facebook","Amazon"] },
    { number:19, title:"Construct Binary Tree from Preorder+Inorder",  difficulty:"medium", pattern:"Recursion",       lcUrl:"https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/", mustSolve:true },
    { number:20, title:"Construct BST from Preorder Traversal",        difficulty:"medium", pattern:"BST",             lcUrl:"https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/" },
    { number:21, title:"Binary Tree Level Order Traversal II",         difficulty:"medium", pattern:"BFS",             lcUrl:"https://leetcode.com/problems/binary-tree-level-order-traversal-ii/" },
    { number:22, title:"Populating Next Right Pointers",               difficulty:"medium", pattern:"BFS",             lcUrl:"https://leetcode.com/problems/populating-next-right-pointers-in-each-node/",   companies:["Microsoft"] },
    { number:23, title:"Path Sum II",                                  difficulty:"medium", pattern:"DFS+Backtrack",   lcUrl:"https://leetcode.com/problems/path-sum-ii/" },
    { number:24, title:"Sum Root to Leaf Numbers",                     difficulty:"medium", pattern:"DFS",             lcUrl:"https://leetcode.com/problems/sum-root-to-leaf-numbers/" },
    { number:25, title:"Flatten Binary Tree to Linked List",           difficulty:"medium", pattern:"Morris/DFS",      lcUrl:"https://leetcode.com/problems/flatten-binary-tree-to-linked-list/",             companies:["Microsoft"] },
    { number:26, title:"Delete Node in BST",                           difficulty:"medium", pattern:"BST",             lcUrl:"https://leetcode.com/problems/delete-node-in-a-bst/" },
    { number:27, title:"Insert into BST",                              difficulty:"medium", pattern:"BST",             lcUrl:"https://leetcode.com/problems/insert-into-a-binary-search-tree/" },
    { number:28, title:"Convert BST to Greater Tree",                  difficulty:"medium", pattern:"Reverse Inorder", lcUrl:"https://leetcode.com/problems/convert-bst-to-greater-tree/" },
    { number:29, title:"All Nodes Distance K in Binary Tree",          difficulty:"medium", pattern:"BFS+Parent Map",  lcUrl:"https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/",            companies:["Google"] },
    { number:30, title:"Maximum Width of Binary Tree",                 difficulty:"medium", pattern:"BFS",             lcUrl:"https://leetcode.com/problems/maximum-width-of-binary-tree/",                   companies:["Amazon"] },
    { number:31, title:"Vertical Order Traversal",                     difficulty:"hard",   pattern:"BFS+Sort",        lcUrl:"https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/",     companies:["Facebook"] },
    { number:32, title:"Binary Tree Maximum Path Sum",                 difficulty:"hard",   pattern:"DFS",             lcUrl:"https://leetcode.com/problems/binary-tree-maximum-path-sum/",                  mustSolve:true,  companies:["Amazon","Facebook"] },
    { number:33, title:"Serialize and Deserialize Binary Tree",        difficulty:"hard",   pattern:"BFS/DFS",         lcUrl:"https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",          mustSolve:true,  companies:["Facebook","Google"] },
    { number:34, title:"Binary Tree Cameras",                          difficulty:"hard",   pattern:"DFS Greedy",      lcUrl:"https://leetcode.com/problems/binary-tree-cameras/",                            companies:["Google"] },
    { number:35, title:"Recover Binary Search Tree",                   difficulty:"hard",   pattern:"Morris Traversal",lcUrl:"https://leetcode.com/problems/recover-binary-search-tree/",                    companies:["Microsoft"] },
  ],

  // ─────────────────────────────────────────────────
  // GRAPHS  (35 problems)
  // ─────────────────────────────────────────────────
  graphs: [
    { number:1,  title:"Number of Islands",                            difficulty:"medium", pattern:"BFS/DFS",         lcUrl:"https://leetcode.com/problems/number-of-islands/",                            mustSolve:true,  companies:["Amazon","Facebook","Google"] },
    { number:2,  title:"Max Area of Island",                           difficulty:"medium", pattern:"DFS",             lcUrl:"https://leetcode.com/problems/max-area-of-island/",                           mustSolve:true },
    { number:3,  title:"Clone Graph",                                  difficulty:"medium", pattern:"BFS/DFS",         lcUrl:"https://leetcode.com/problems/clone-graph/",                                  mustSolve:true },
    { number:4,  title:"Pacific Atlantic Water Flow",                  difficulty:"medium", pattern:"Multi-source BFS",lcUrl:"https://leetcode.com/problems/pacific-atlantic-water-flow/",                  mustSolve:true },
    { number:5,  title:"Surrounded Regions",                           difficulty:"medium", pattern:"DFS from border", lcUrl:"https://leetcode.com/problems/surrounded-regions/",                           mustSolve:true },
    { number:6,  title:"Rotting Oranges",                              difficulty:"medium", pattern:"BFS",             lcUrl:"https://leetcode.com/problems/rotting-oranges/",                               mustSolve:true,  companies:["Amazon"] },
    { number:7,  title:"Flood Fill",                                   difficulty:"easy",   pattern:"DFS/BFS",         lcUrl:"https://leetcode.com/problems/flood-fill/" },
    { number:8,  title:"Island Perimeter",                             difficulty:"easy",   pattern:"Grid DFS",        lcUrl:"https://leetcode.com/problems/island-perimeter/" },
    { number:9,  title:"Number of Provinces",                          difficulty:"medium", pattern:"Union Find / DFS", lcUrl:"https://leetcode.com/problems/number-of-provinces/" },
    { number:10, title:"Course Schedule",                              difficulty:"medium", pattern:"Topological Sort", lcUrl:"https://leetcode.com/problems/course-schedule/",                              mustSolve:true,  companies:["Amazon","Google"] },
    { number:11, title:"Course Schedule II",                           difficulty:"medium", pattern:"Topological Sort", lcUrl:"https://leetcode.com/problems/course-schedule-ii/",                          mustSolve:true },
    { number:12, title:"Redundant Connection",                         difficulty:"medium", pattern:"Union Find",       lcUrl:"https://leetcode.com/problems/redundant-connection/",                         mustSolve:true },
    { number:13, title:"Number of Connected Components",               difficulty:"medium", pattern:"Union Find",       lcUrl:"https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/", mustSolve:true },
    { number:14, title:"Graph Valid Tree",                             difficulty:"medium", pattern:"Union Find",       lcUrl:"https://leetcode.com/problems/graph-valid-tree/",                             mustSolve:true },
    { number:15, title:"Accounts Merge",                               difficulty:"medium", pattern:"Union Find",       lcUrl:"https://leetcode.com/problems/accounts-merge/",                               companies:["Google","Facebook"] },
    { number:16, title:"Network Delay Time",                           difficulty:"medium", pattern:"Dijkstra",         lcUrl:"https://leetcode.com/problems/network-delay-time/",                           mustSolve:true },
    { number:17, title:"Cheapest Flights Within K Stops",              difficulty:"medium", pattern:"Bellman-Ford",     lcUrl:"https://leetcode.com/problems/cheapest-flights-within-k-stops/",              mustSolve:true,  companies:["Amazon"] },
    { number:18, title:"Path With Minimum Effort",                     difficulty:"medium", pattern:"Dijkstra/BFS",     lcUrl:"https://leetcode.com/problems/path-with-minimum-effort/" },
    { number:19, title:"Is Graph Bipartite?",                          difficulty:"medium", pattern:"BFS Coloring",     lcUrl:"https://leetcode.com/problems/is-graph-bipartite/" },
    { number:20, title:"01 Matrix",                                    difficulty:"medium", pattern:"Multi-source BFS", lcUrl:"https://leetcode.com/problems/01-matrix/",                                    companies:["Facebook"] },
    { number:21, title:"Find the Town Judge",                          difficulty:"easy",   pattern:"In/Out degree",    lcUrl:"https://leetcode.com/problems/find-the-town-judge/" },
    { number:22, title:"Find Eventual Safe States",                    difficulty:"medium", pattern:"Topological Sort", lcUrl:"https://leetcode.com/problems/find-eventual-safe-states/" },
    { number:23, title:"Minimum Number of Vertices to Reach All Nodes",difficulty:"medium", pattern:"In-degree",        lcUrl:"https://leetcode.com/problems/minimum-number-of-vertices-to-reach-all-nodes/" },
    { number:24, title:"Reorder Routes to Make All Paths Lead to City 0",difficulty:"medium",pattern:"BFS",            lcUrl:"https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/" },
    { number:25, title:"Evaluate Division",                            difficulty:"medium", pattern:"Weighted Graph DFS",lcUrl:"https://leetcode.com/problems/evaluate-division/",                           companies:["Google"] },
    { number:26, title:"Minimum Spanning Tree - Kruskal",              difficulty:"medium", pattern:"Union Find",       lcUrl:"https://leetcode.com/problems/min-cost-to-connect-all-points/" },
    { number:27, title:"Swim in Rising Water",                         difficulty:"hard",   pattern:"Dijkstra",         lcUrl:"https://leetcode.com/problems/swim-in-rising-water/",                         mustSolve:true },
    { number:28, title:"Word Ladder",                                  difficulty:"hard",   pattern:"BFS",              lcUrl:"https://leetcode.com/problems/word-ladder/",                                  mustSolve:true,  companies:["Amazon","Facebook"] },
    { number:29, title:"Alien Dictionary",                             difficulty:"hard",   pattern:"Topological Sort", lcUrl:"https://leetcode.com/problems/alien-dictionary/",                             mustSolve:true,  companies:["Google","Facebook"] },
    { number:30, title:"Critical Connections in a Network",            difficulty:"hard",   pattern:"Tarjan's",         lcUrl:"https://leetcode.com/problems/critical-connections-in-a-network/",            companies:["Amazon"] },
    { number:31, title:"Reconstruct Itinerary",                        difficulty:"hard",   pattern:"Eulerian Path",    lcUrl:"https://leetcode.com/problems/reconstruct-itinerary/",                        companies:["Google"] },
    { number:32, title:"Bus Routes",                                   difficulty:"hard",   pattern:"BFS",              lcUrl:"https://leetcode.com/problems/bus-routes/",                                   companies:["Google"] },
    { number:33, title:"Number of Ways to Arrive at Destination",      difficulty:"medium", pattern:"Dijkstra",         lcUrl:"https://leetcode.com/problems/number-of-ways-to-arrive-at-destination/" },
    { number:34, title:"Shortest Path in Binary Matrix",               difficulty:"medium", pattern:"BFS",              lcUrl:"https://leetcode.com/problems/shortest-path-in-binary-matrix/" },
    { number:35, title:"Making a Large Island",                        difficulty:"hard",   pattern:"Union Find",       lcUrl:"https://leetcode.com/problems/making-a-large-island/",                        companies:["Google"] },
  ],

  // ─────────────────────────────────────────────────
  // DYNAMIC PROGRAMMING  (40 problems)
  // ─────────────────────────────────────────────────
  dp: [
    { number:1,  title:"Climbing Stairs",                        difficulty:"easy",   pattern:"1D DP",           lcUrl:"https://leetcode.com/problems/climbing-stairs/",                                   mustSolve:true },
    { number:2,  title:"Min Cost Climbing Stairs",               difficulty:"easy",   pattern:"1D DP",           lcUrl:"https://leetcode.com/problems/min-cost-climbing-stairs/" },
    { number:3,  title:"House Robber",                           difficulty:"medium", pattern:"1D DP",           lcUrl:"https://leetcode.com/problems/house-robber/",                                      mustSolve:true,  companies:["Amazon","Google"] },
    { number:4,  title:"House Robber II",                        difficulty:"medium", pattern:"1D DP",           lcUrl:"https://leetcode.com/problems/house-robber-ii/",                                   mustSolve:true },
    { number:5,  title:"Decode Ways",                            difficulty:"medium", pattern:"1D DP",           lcUrl:"https://leetcode.com/problems/decode-ways/",                                       mustSolve:true,  companies:["Facebook"] },
    { number:6,  title:"Coin Change",                            difficulty:"medium", pattern:"Unbounded Knapsack",lcUrl:"https://leetcode.com/problems/coin-change/",                                     mustSolve:true,  companies:["Amazon","Google"] },
    { number:7,  title:"Coin Change II",                         difficulty:"medium", pattern:"Unbounded Knapsack",lcUrl:"https://leetcode.com/problems/coin-change-ii/" },
    { number:8,  title:"Word Break",                             difficulty:"medium", pattern:"1D DP",           lcUrl:"https://leetcode.com/problems/word-break/",                                        mustSolve:true,  companies:["Google","Amazon"] },
    { number:9,  title:"Maximum Product Subarray",               difficulty:"medium", pattern:"1D DP",           lcUrl:"https://leetcode.com/problems/maximum-product-subarray/",                          mustSolve:true },
    { number:10, title:"Longest Increasing Subsequence",         difficulty:"medium", pattern:"LIS",             lcUrl:"https://leetcode.com/problems/longest-increasing-subsequence/",                    mustSolve:true,  companies:["Google","Amazon"] },
    { number:11, title:"Longest Common Subsequence",             difficulty:"medium", pattern:"LCS",             lcUrl:"https://leetcode.com/problems/longest-common-subsequence/",                        mustSolve:true,  companies:["Amazon","Google"] },
    { number:12, title:"Edit Distance",                          difficulty:"medium", pattern:"LCS",             lcUrl:"https://leetcode.com/problems/edit-distance/",                                     mustSolve:true,  companies:["Google","Amazon","Flipkart"] },
    { number:13, title:"Unique Paths",                           difficulty:"medium", pattern:"2D DP",           lcUrl:"https://leetcode.com/problems/unique-paths/",                                      mustSolve:true },
    { number:14, title:"Unique Paths II",                        difficulty:"medium", pattern:"2D DP",           lcUrl:"https://leetcode.com/problems/unique-paths-ii/" },
    { number:15, title:"Minimum Path Sum",                       difficulty:"medium", pattern:"2D DP",           lcUrl:"https://leetcode.com/problems/minimum-path-sum/",                                  companies:["Amazon"] },
    { number:16, title:"Partition Equal Subset Sum",             difficulty:"medium", pattern:"0/1 Knapsack",    lcUrl:"https://leetcode.com/problems/partition-equal-subset-sum/",                        mustSolve:true },
    { number:17, title:"Target Sum",                             difficulty:"medium", pattern:"0/1 Knapsack",    lcUrl:"https://leetcode.com/problems/target-sum/",                                        companies:["Facebook"] },
    { number:18, title:"Last Stone Weight II",                   difficulty:"medium", pattern:"0/1 Knapsack",    lcUrl:"https://leetcode.com/problems/last-stone-weight-ii/" },
    { number:19, title:"Longest Palindromic Substring",          difficulty:"medium", pattern:"Expand Center",   lcUrl:"https://leetcode.com/problems/longest-palindromic-substring/",                     mustSolve:true,  companies:["Amazon","Google"] },
    { number:20, title:"Palindromic Substrings",                 difficulty:"medium", pattern:"Expand Center",   lcUrl:"https://leetcode.com/problems/palindromic-substrings/",                            mustSolve:true },
    { number:21, title:"Longest Palindromic Subsequence",        difficulty:"medium", pattern:"LCS variant",     lcUrl:"https://leetcode.com/problems/longest-palindromic-subsequence/" },
    { number:22, title:"Number of LIS",                          difficulty:"medium", pattern:"LIS variant",     lcUrl:"https://leetcode.com/problems/number-of-longest-increasing-subsequence/" },
    { number:23, title:"Interleaving String",                    difficulty:"medium", pattern:"2D DP",           lcUrl:"https://leetcode.com/problems/interleaving-string/",                               companies:["Google"] },
    { number:24, title:"Wildcard Matching",                      difficulty:"hard",   pattern:"2D DP",           lcUrl:"https://leetcode.com/problems/wildcard-matching/",                                 companies:["Facebook","Google"] },
    { number:25, title:"Regular Expression Matching",            difficulty:"hard",   pattern:"2D DP",           lcUrl:"https://leetcode.com/problems/regular-expression-matching/",                       mustSolve:true,  companies:["Google","Facebook"] },
    { number:26, title:"Distinct Subsequences",                  difficulty:"hard",   pattern:"2D DP",           lcUrl:"https://leetcode.com/problems/distinct-subsequences/",                             mustSolve:true },
    { number:27, title:"Burst Balloons",                         difficulty:"hard",   pattern:"Interval DP",     lcUrl:"https://leetcode.com/problems/burst-balloons/",                                    mustSolve:true },
    { number:28, title:"Stone Game",                             difficulty:"medium", pattern:"Interval DP",     lcUrl:"https://leetcode.com/problems/stone-game/" },
    { number:29, title:"Maximum Profit in Job Scheduling",       difficulty:"hard",   pattern:"DP+Binary Search",lcUrl:"https://leetcode.com/problems/maximum-profit-in-job-scheduling/",                  mustSolve:true,  companies:["Google"] },
    { number:30, title:"Paint House",                            difficulty:"medium", pattern:"1D DP",           lcUrl:"https://leetcode.com/problems/paint-house/" },
    { number:31, title:"Maximum Sum of 3 Non-Overlapping Subarrays",difficulty:"hard",pattern:"DP",             lcUrl:"https://leetcode.com/problems/maximum-sum-of-3-non-overlapping-subarrays/" },
    { number:32, title:"Best Time to Buy Stock with Cooldown",   difficulty:"medium", pattern:"State Machine DP",lcUrl:"https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/",     companies:["Amazon"] },
    { number:33, title:"Best Time to Buy Stock with Fee",        difficulty:"medium", pattern:"State Machine DP",lcUrl:"https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/" },
    { number:34, title:"Jump Game II",                           difficulty:"medium", pattern:"Greedy/DP",       lcUrl:"https://leetcode.com/problems/jump-game-ii/" },
    { number:35, title:"Minimum Cost for Tickets",               difficulty:"medium", pattern:"1D DP",           lcUrl:"https://leetcode.com/problems/minimum-cost-for-tickets/" },
    { number:36, title:"Triangle",                               difficulty:"medium", pattern:"DP Bottom-up",    lcUrl:"https://leetcode.com/problems/triangle/",                                          companies:["Amazon"] },
    { number:37, title:"Maximal Square",                         difficulty:"medium", pattern:"2D DP",           lcUrl:"https://leetcode.com/problems/maximal-square/",                                    companies:["Facebook","Amazon"] },
    { number:38, title:"Number of Dice Rolls with Target Sum",   difficulty:"medium", pattern:"DP",              lcUrl:"https://leetcode.com/problems/number-of-dice-rolls-with-target-sum/" },
    { number:39, title:"Solving Questions with Brainpower",      difficulty:"medium", pattern:"1D DP",           lcUrl:"https://leetcode.com/problems/solving-questions-with-brainpower/" },
    { number:40, title:"Count Ways to Build Good Strings",       difficulty:"medium", pattern:"1D DP",           lcUrl:"https://leetcode.com/problems/count-ways-to-build-good-strings/" },
  ],

  // ─────────────────────────────────────────────────
  // BINARY SEARCH  (20 problems)
  // ─────────────────────────────────────────────────
  bsearch: [
    { number:1,  title:"Binary Search",                          difficulty:"easy",   pattern:"Classic",         lcUrl:"https://leetcode.com/problems/binary-search/",                                     mustSolve:true },
    { number:2,  title:"First Bad Version",                      difficulty:"easy",   pattern:"Binary Search",   lcUrl:"https://leetcode.com/problems/first-bad-version/" },
    { number:3,  title:"Guess Number Higher or Lower",           difficulty:"easy",   pattern:"Binary Search",   lcUrl:"https://leetcode.com/problems/guess-number-higher-or-lower/" },
    { number:4,  title:"Count Negative Numbers in Sorted Matrix",difficulty:"easy",   pattern:"Binary Search",   lcUrl:"https://leetcode.com/problems/count-negative-numbers-in-a-sorted-matrix/" },
    { number:5,  title:"Sqrt(x)",                                difficulty:"easy",   pattern:"Answer Space",    lcUrl:"https://leetcode.com/problems/sqrtx/" },
    { number:6,  title:"Search Insert Position",                 difficulty:"easy",   pattern:"Lower Bound",     lcUrl:"https://leetcode.com/problems/search-insert-position/" },
    { number:7,  title:"Search a 2D Matrix",                     difficulty:"medium", pattern:"Binary Search",   lcUrl:"https://leetcode.com/problems/search-a-2d-matrix/",                                mustSolve:true },
    { number:8,  title:"Koko Eating Bananas",                    difficulty:"medium", pattern:"Answer Space",    lcUrl:"https://leetcode.com/problems/koko-eating-bananas/",                               mustSolve:true },
    { number:9,  title:"Find Minimum in Rotated Sorted Array",   difficulty:"medium", pattern:"Binary Search",   lcUrl:"https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",               mustSolve:true },
    { number:10, title:"Search in Rotated Sorted Array",         difficulty:"medium", pattern:"Binary Search",   lcUrl:"https://leetcode.com/problems/search-in-rotated-sorted-array/",                    mustSolve:true },
    { number:11, title:"Search in Rotated Sorted Array II",      difficulty:"medium", pattern:"Binary Search",   lcUrl:"https://leetcode.com/problems/search-in-rotated-sorted-array-ii/" },
    { number:12, title:"Find Peak Element",                      difficulty:"medium", pattern:"Binary Search",   lcUrl:"https://leetcode.com/problems/find-peak-element/" },
    { number:13, title:"Time Based Key-Value Store",             difficulty:"medium", pattern:"Binary Search",   lcUrl:"https://leetcode.com/problems/time-based-key-value-store/",                        mustSolve:true },
    { number:14, title:"Capacity to Ship Packages",              difficulty:"medium", pattern:"Answer Space",    lcUrl:"https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/",            companies:["Amazon"] },
    { number:15, title:"Find K Closest Elements",                difficulty:"medium", pattern:"Binary Search",   lcUrl:"https://leetcode.com/problems/find-k-closest-elements/",                           companies:["Google"] },
    { number:16, title:"Single Element in Sorted Array",         difficulty:"medium", pattern:"Binary Search",   lcUrl:"https://leetcode.com/problems/single-element-in-a-sorted-array/" },
    { number:17, title:"Minimize Maximum of Subarrays",          difficulty:"medium", pattern:"Answer Space",    lcUrl:"https://leetcode.com/problems/minimize-the-maximum-of-two-arrays/" },
    { number:18, title:"Split Array Largest Sum",                difficulty:"hard",   pattern:"Answer Space",    lcUrl:"https://leetcode.com/problems/split-array-largest-sum/",                            mustSolve:true },
    { number:19, title:"Median of Two Sorted Arrays",            difficulty:"hard",   pattern:"Binary Search",   lcUrl:"https://leetcode.com/problems/median-of-two-sorted-arrays/",                       mustSolve:true,  companies:["Google","Amazon"] },
    { number:20, title:"Find Minimum in Rotated Sorted Array II",difficulty:"hard",   pattern:"Binary Search",   lcUrl:"https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/" },
  ],

  // ─────────────────────────────────────────────────
  // HEAP / PRIORITY QUEUE  (20 problems)
  // ─────────────────────────────────────────────────
  heap: [
    { number:1,  title:"Kth Largest Element in Stream",          difficulty:"easy",   pattern:"Min Heap",        lcUrl:"https://leetcode.com/problems/kth-largest-element-in-a-stream/",                   mustSolve:true },
    { number:2,  title:"Last Stone Weight",                      difficulty:"easy",   pattern:"Max Heap",        lcUrl:"https://leetcode.com/problems/last-stone-weight/" },
    { number:3,  title:"Relative Ranks",                         difficulty:"easy",   pattern:"Heap",            lcUrl:"https://leetcode.com/problems/relative-ranks/" },
    { number:4,  title:"K Closest Points to Origin",             difficulty:"medium", pattern:"Min Heap",        lcUrl:"https://leetcode.com/problems/k-closest-points-to-origin/",                        mustSolve:true,  companies:["Facebook","Amazon"] },
    { number:5,  title:"Kth Largest Element in Array",           difficulty:"medium", pattern:"Heap/Quickselect",lcUrl:"https://leetcode.com/problems/kth-largest-element-in-an-array/",                   mustSolve:true,  companies:["Facebook","Amazon"] },
    { number:6,  title:"Top K Frequent Elements",                difficulty:"medium", pattern:"Bucket/Heap",     lcUrl:"https://leetcode.com/problems/top-k-frequent-elements/",                           mustSolve:true },
    { number:7,  title:"Top K Frequent Words",                   difficulty:"medium", pattern:"Heap",            lcUrl:"https://leetcode.com/problems/top-k-frequent-words/",                              companies:["Amazon"] },
    { number:8,  title:"Task Scheduler",                         difficulty:"medium", pattern:"Max Heap",        lcUrl:"https://leetcode.com/problems/task-scheduler/",                                    mustSolve:true,  companies:["Facebook","Google"] },
    { number:9,  title:"Design Twitter",                         difficulty:"medium", pattern:"Heap",            lcUrl:"https://leetcode.com/problems/design-twitter/",                                    mustSolve:true },
    { number:10, title:"Reorganize String",                      difficulty:"medium", pattern:"Max Heap",        lcUrl:"https://leetcode.com/problems/reorganize-string/",                                  companies:["Google"] },
    { number:11, title:"K-th Smallest in Sorted Matrix",         difficulty:"medium", pattern:"Heap",            lcUrl:"https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/" },
    { number:12, title:"Sort Characters By Frequency",           difficulty:"medium", pattern:"Max Heap",        lcUrl:"https://leetcode.com/problems/sort-characters-by-frequency/" },
    { number:13, title:"Maximum Subsequence Score",              difficulty:"medium", pattern:"Heap+Greedy",     lcUrl:"https://leetcode.com/problems/maximum-subsequence-score/" },
    { number:14, title:"Single-Threaded CPU",                    difficulty:"medium", pattern:"Heap",            lcUrl:"https://leetcode.com/problems/single-threaded-cpu/",                               companies:["Google"] },
    { number:15, title:"IPO",                                    difficulty:"hard",   pattern:"Two Heaps",       lcUrl:"https://leetcode.com/problems/ipo/" },
    { number:16, title:"Find Median from Data Stream",           difficulty:"hard",   pattern:"Two Heaps",       lcUrl:"https://leetcode.com/problems/find-median-from-data-stream/",                       mustSolve:true,  companies:["Amazon","Google"] },
    { number:17, title:"Sliding Window Median",                  difficulty:"hard",   pattern:"Two Heaps",       lcUrl:"https://leetcode.com/problems/sliding-window-median/" },
    { number:18, title:"Smallest Range Covering K Lists",        difficulty:"hard",   pattern:"Heap",            lcUrl:"https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/" },
    { number:19, title:"Merge K Sorted Lists",                   difficulty:"hard",   pattern:"Min Heap",        lcUrl:"https://leetcode.com/problems/merge-k-sorted-lists/",                               mustSolve:true },
    { number:20, title:"The Skyline Problem",                    difficulty:"hard",   pattern:"Heap",            lcUrl:"https://leetcode.com/problems/the-skyline-problem/",                               companies:["Google","Microsoft"] },
  ],

  // ─────────────────────────────────────────────────
  // BACKTRACKING  (18 problems)
  // ─────────────────────────────────────────────────
  backtrack: [
    { number:1,  title:"Subsets",                                difficulty:"medium", pattern:"Backtracking",    lcUrl:"https://leetcode.com/problems/subsets/",                                           mustSolve:true },
    { number:2,  title:"Subsets II",                             difficulty:"medium", pattern:"Backtracking",    lcUrl:"https://leetcode.com/problems/subsets-ii/",                                        mustSolve:true },
    { number:3,  title:"Combination Sum",                        difficulty:"medium", pattern:"Backtracking",    lcUrl:"https://leetcode.com/problems/combination-sum/",                                   mustSolve:true },
    { number:4,  title:"Combination Sum II",                     difficulty:"medium", pattern:"Backtracking",    lcUrl:"https://leetcode.com/problems/combination-sum-ii/",                                mustSolve:true },
    { number:5,  title:"Combination Sum III",                    difficulty:"medium", pattern:"Backtracking",    lcUrl:"https://leetcode.com/problems/combination-sum-iii/" },
    { number:6,  title:"Permutations",                           difficulty:"medium", pattern:"Backtracking",    lcUrl:"https://leetcode.com/problems/permutations/",                                      mustSolve:true },
    { number:7,  title:"Permutations II",                        difficulty:"medium", pattern:"Backtracking",    lcUrl:"https://leetcode.com/problems/permutations-ii/" },
    { number:8,  title:"Letter Combinations of a Phone Number",  difficulty:"medium", pattern:"Backtracking",    lcUrl:"https://leetcode.com/problems/letter-combinations-of-a-phone-number/",              mustSolve:true },
    { number:9,  title:"Word Search",                            difficulty:"medium", pattern:"Backtracking",    lcUrl:"https://leetcode.com/problems/word-search/",                                       mustSolve:true,  companies:["Amazon","Microsoft"] },
    { number:10, title:"Palindrome Partitioning",                difficulty:"medium", pattern:"Backtracking+DP", lcUrl:"https://leetcode.com/problems/palindrome-partitioning/",                           mustSolve:true },
    { number:11, title:"Restore IP Addresses",                   difficulty:"medium", pattern:"Backtracking",    lcUrl:"https://leetcode.com/problems/restore-ip-addresses/",                              companies:["Amazon"] },
    { number:12, title:"Generate Parentheses",                   difficulty:"medium", pattern:"Backtracking",    lcUrl:"https://leetcode.com/problems/generate-parentheses/",                              mustSolve:true,  companies:["Amazon","Google"] },
    { number:13, title:"All Paths from Source to Target",        difficulty:"medium", pattern:"Backtracking",    lcUrl:"https://leetcode.com/problems/all-paths-from-source-to-target/" },
    { number:14, title:"Letter Case Permutation",                difficulty:"medium", pattern:"Backtracking",    lcUrl:"https://leetcode.com/problems/letter-case-permutation/" },
    { number:15, title:"Expression Add Operators",               difficulty:"hard",   pattern:"Backtracking",    lcUrl:"https://leetcode.com/problems/expression-add-operators/",                           companies:["Google","Facebook"] },
    { number:16, title:"N-Queens",                               difficulty:"hard",   pattern:"Backtracking",    lcUrl:"https://leetcode.com/problems/n-queens/",                                          mustSolve:true },
    { number:17, title:"N-Queens II",                            difficulty:"hard",   pattern:"Backtracking",    lcUrl:"https://leetcode.com/problems/n-queens-ii/" },
    { number:18, title:"Sudoku Solver",                          difficulty:"hard",   pattern:"Backtracking",    lcUrl:"https://leetcode.com/problems/sudoku-solver/",                                     mustSolve:true },
  ],

  // ─────────────────────────────────────────────────
  // GREEDY  (18 problems)
  // ─────────────────────────────────────────────────
  greedy: [
    { number:1,  title:"Jump Game",                              difficulty:"medium", pattern:"Greedy",          lcUrl:"https://leetcode.com/problems/jump-game/",                                         mustSolve:true },
    { number:2,  title:"Jump Game II",                           difficulty:"medium", pattern:"Greedy",          lcUrl:"https://leetcode.com/problems/jump-game-ii/",                                      mustSolve:true },
    { number:3,  title:"Gas Station",                            difficulty:"medium", pattern:"Greedy",          lcUrl:"https://leetcode.com/problems/gas-station/",                                       mustSolve:true },
    { number:4,  title:"Hand of Straights",                      difficulty:"medium", pattern:"Greedy",          lcUrl:"https://leetcode.com/problems/hand-of-straights/",                                 mustSolve:true },
    { number:5,  title:"Merge Triplets to Form Target",          difficulty:"medium", pattern:"Greedy",          lcUrl:"https://leetcode.com/problems/merge-triplets-to-form-a-target-triplet/" },
    { number:6,  title:"Partition Labels",                       difficulty:"medium", pattern:"Greedy",          lcUrl:"https://leetcode.com/problems/partition-labels/",                                  mustSolve:true },
    { number:7,  title:"Valid Parenthesis String",               difficulty:"medium", pattern:"Greedy",          lcUrl:"https://leetcode.com/problems/valid-parenthesis-string/",                          mustSolve:true },
    { number:8,  title:"Non-overlapping Intervals",              difficulty:"medium", pattern:"Interval Greedy", lcUrl:"https://leetcode.com/problems/non-overlapping-intervals/",                         mustSolve:true },
    { number:9,  title:"Meeting Rooms",                          difficulty:"easy",   pattern:"Interval Sort",   lcUrl:"https://leetcode.com/problems/meeting-rooms/" },
    { number:10, title:"Meeting Rooms II",                       difficulty:"medium", pattern:"Intervals+Heap",  lcUrl:"https://leetcode.com/problems/meeting-rooms-ii/",                                  mustSolve:true,  companies:["Amazon","Google"] },
    { number:11, title:"Minimum Number of Arrows to Burst Balloons", difficulty:"medium", pattern:"Interval Greedy", lcUrl:"https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/" },
    { number:12, title:"Assign Cookies",                         difficulty:"easy",   pattern:"Greedy",          lcUrl:"https://leetcode.com/problems/assign-cookies/" },
    { number:13, title:"Lemonade Change",                        difficulty:"easy",   pattern:"Greedy",          lcUrl:"https://leetcode.com/problems/lemonade-change/" },
    { number:14, title:"Largest Number",                         difficulty:"medium", pattern:"Greedy + Sort",   lcUrl:"https://leetcode.com/problems/largest-number/",                                    companies:["Amazon"] },
    { number:15, title:"Task Scheduler",                         difficulty:"medium", pattern:"Greedy",          lcUrl:"https://leetcode.com/problems/task-scheduler/" },
    { number:16, title:"Minimum Platforms",                      difficulty:"medium", pattern:"Interval Greedy", lcUrl:"https://leetcode.com/problems/minimum-number-of-platforms-required-for-a-railway-station/" },
    { number:17, title:"Candy",                                  difficulty:"hard",   pattern:"Two Pass Greedy", lcUrl:"https://leetcode.com/problems/candy/",                                             mustSolve:true },
    { number:18, title:"IPO",                                    difficulty:"hard",   pattern:"Greedy+Heap",     lcUrl:"https://leetcode.com/problems/ipo/",                                               companies:["Google"] },
  ],

  // ─────────────────────────────────────────────────
  // TRIE  (12 problems)
  // ─────────────────────────────────────────────────
  trie: [
    { number:1,  title:"Implement Trie (Prefix Tree)",           difficulty:"medium", pattern:"Trie",            lcUrl:"https://leetcode.com/problems/implement-trie-prefix-tree/",                        mustSolve:true },
    { number:2,  title:"Design Add and Search Words",            difficulty:"medium", pattern:"Trie+DFS",        lcUrl:"https://leetcode.com/problems/design-add-and-search-words-data-structure/",         mustSolve:true },
    { number:3,  title:"Longest Word in Dictionary",             difficulty:"medium", pattern:"Trie",            lcUrl:"https://leetcode.com/problems/longest-word-in-dictionary/" },
    { number:4,  title:"Replace Words",                          difficulty:"medium", pattern:"Trie",            lcUrl:"https://leetcode.com/problems/replace-words/" },
    { number:5,  title:"Map Sum Pairs",                          difficulty:"medium", pattern:"Trie",            lcUrl:"https://leetcode.com/problems/map-sum-pairs/" },
    { number:6,  title:"Index Pairs of a String",                difficulty:"easy",   pattern:"Trie",            lcUrl:"https://leetcode.com/problems/index-pairs-of-a-string/" },
    { number:7,  title:"Maximum XOR of Two Numbers",             difficulty:"medium", pattern:"Binary Trie",     lcUrl:"https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/",              mustSolve:true,  companies:["Google"] },
    { number:8,  title:"Maximum XOR With an Element From Array", difficulty:"hard",   pattern:"Binary Trie",     lcUrl:"https://leetcode.com/problems/maximum-xor-with-an-element-from-array/" },
    { number:9,  title:"Prefix and Suffix Search",               difficulty:"hard",   pattern:"Trie",            lcUrl:"https://leetcode.com/problems/prefix-and-suffix-search/",                           companies:["Google"] },
    { number:10, title:"Word Search II",                         difficulty:"hard",   pattern:"Trie+Backtracking",lcUrl:"https://leetcode.com/problems/word-search-ii/",                                   mustSolve:true,  companies:["Amazon","Microsoft"] },
    { number:11, title:"Palindrome Pairs",                       difficulty:"hard",   pattern:"Trie",            lcUrl:"https://leetcode.com/problems/palindrome-pairs/",                                   companies:["Google"] },
    { number:12, title:"Stream of Characters",                   difficulty:"hard",   pattern:"Aho-Corasick",    lcUrl:"https://leetcode.com/problems/stream-of-characters/",                               companies:["Amazon"] },
  ],

  // ─────────────────────────────────────────────────
  // BIT MANIPULATION  (15 problems)
  // ─────────────────────────────────────────────────
  bitwise: [
    { number:1,  title:"Single Number",                          difficulty:"easy",   pattern:"XOR",             lcUrl:"https://leetcode.com/problems/single-number/",                                     mustSolve:true,  companies:["Amazon"] },
    { number:2,  title:"Number of 1 Bits",                       difficulty:"easy",   pattern:"Bit Count",       lcUrl:"https://leetcode.com/problems/number-of-1-bits/",                                  mustSolve:true },
    { number:3,  title:"Counting Bits",                          difficulty:"easy",   pattern:"DP+Bit",          lcUrl:"https://leetcode.com/problems/counting-bits/",                                     mustSolve:true },
    { number:4,  title:"Reverse Bits",                           difficulty:"easy",   pattern:"Bit Manipulation",lcUrl:"https://leetcode.com/problems/reverse-bits/",                                      mustSolve:true },
    { number:5,  title:"Missing Number",                         difficulty:"easy",   pattern:"XOR",             lcUrl:"https://leetcode.com/problems/missing-number/",                                    mustSolve:true },
    { number:6,  title:"Power of Two",                           difficulty:"easy",   pattern:"n & (n-1)",       lcUrl:"https://leetcode.com/problems/power-of-two/" },
    { number:7,  title:"Power of Four",                          difficulty:"easy",   pattern:"Bit Mask",        lcUrl:"https://leetcode.com/problems/power-of-four/" },
    { number:8,  title:"Sum of Two Integers",                    difficulty:"medium", pattern:"Bit Addition",    lcUrl:"https://leetcode.com/problems/sum-of-two-integers/",                               mustSolve:true },
    { number:9,  title:"Reverse Integer",                        difficulty:"medium", pattern:"Math",            lcUrl:"https://leetcode.com/problems/reverse-integer/" },
    { number:10, title:"Single Number II",                       difficulty:"medium", pattern:"Bit Counting",    lcUrl:"https://leetcode.com/problems/single-number-ii/",                                  mustSolve:true },
    { number:11, title:"Single Number III",                      difficulty:"medium", pattern:"XOR",             lcUrl:"https://leetcode.com/problems/single-number-iii/" },
    { number:12, title:"Bitwise AND of Numbers Range",           difficulty:"medium", pattern:"Common Prefix",   lcUrl:"https://leetcode.com/problems/bitwise-and-of-numbers-range/" },
    { number:13, title:"Subsets via Bitmask",                    difficulty:"medium", pattern:"Bitmask",         lcUrl:"https://leetcode.com/problems/subsets/" },
    { number:14, title:"Maximum XOR of Two Numbers",             difficulty:"medium", pattern:"Trie+Bit",        lcUrl:"https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/",              mustSolve:true },
    { number:15, title:"Minimum Flips to Make a OR b Equal to c",difficulty:"medium", pattern:"Bit Ops",         lcUrl:"https://leetcode.com/problems/minimum-flips-to-make-a-or-b-equal-to-c/" },
  ],

  // ─────────────────────────────────────────────────
  // STRINGS (extra topic — very frequent in interviews)
  // ─────────────────────────────────────────────────
  strings: [
    { number:1,  title:"Valid Palindrome",                       difficulty:"easy",   pattern:"Two Pointers",    lcUrl:"https://leetcode.com/problems/valid-palindrome/" },
    { number:2,  title:"Reverse String",                         difficulty:"easy",   pattern:"Two Pointers",    lcUrl:"https://leetcode.com/problems/reverse-string/" },
    { number:3,  title:"Reverse Words in a String",              difficulty:"medium", pattern:"String",          lcUrl:"https://leetcode.com/problems/reverse-words-in-a-string/",                          companies:["Microsoft","Amazon"] },
    { number:4,  title:"Longest Common Prefix",                  difficulty:"easy",   pattern:"String",          lcUrl:"https://leetcode.com/problems/longest-common-prefix/",                              companies:["Google"] },
    { number:5,  title:"Roman to Integer",                       difficulty:"easy",   pattern:"HashMap",         lcUrl:"https://leetcode.com/problems/roman-to-integer/" },
    { number:6,  title:"Integer to Roman",                       difficulty:"medium", pattern:"Greedy",          lcUrl:"https://leetcode.com/problems/integer-to-roman/" },
    { number:7,  title:"Count and Say",                          difficulty:"medium", pattern:"String",          lcUrl:"https://leetcode.com/problems/count-and-say/" },
    { number:8,  title:"Zigzag Conversion",                      difficulty:"medium", pattern:"String",          lcUrl:"https://leetcode.com/problems/zigzag-conversion/",                                  companies:["Amazon"] },
    { number:9,  title:"String to Integer (atoi)",               difficulty:"medium", pattern:"Parsing",         lcUrl:"https://leetcode.com/problems/string-to-integer-atoi/",                             companies:["Amazon","Microsoft"] },
    { number:10, title:"Longest Substring Without Repeating Chars",difficulty:"medium",pattern:"Sliding Window", lcUrl:"https://leetcode.com/problems/longest-substring-without-repeating-characters/",    mustSolve:true },
    { number:11, title:"Longest Palindromic Substring",          difficulty:"medium", pattern:"Expand Center",   lcUrl:"https://leetcode.com/problems/longest-palindromic-substring/",                      mustSolve:true },
    { number:12, title:"Group Anagrams",                         difficulty:"medium", pattern:"HashMap",         lcUrl:"https://leetcode.com/problems/group-anagrams/",                                     mustSolve:true },
    { number:13, title:"Find All Anagrams in a String",          difficulty:"medium", pattern:"Sliding Window",  lcUrl:"https://leetcode.com/problems/find-all-anagrams-in-a-string/" },
    { number:14, title:"Decode String",                          difficulty:"medium", pattern:"Stack",           lcUrl:"https://leetcode.com/problems/decode-string/",                                      companies:["Google","Amazon"] },
    { number:15, title:"Compare Version Numbers",                difficulty:"medium", pattern:"String Parsing",  lcUrl:"https://leetcode.com/problems/compare-version-numbers/",                            companies:["Flipkart","Amazon"] },
    { number:16, title:"Basic Calculator II",                    difficulty:"medium", pattern:"Stack",           lcUrl:"https://leetcode.com/problems/basic-calculator-ii/",                                companies:["Google","Amazon"] },
    { number:17, title:"Multiply Strings",                       difficulty:"medium", pattern:"Math Simulation", lcUrl:"https://leetcode.com/problems/multiply-strings/" },
    { number:18, title:"Word Break",                             difficulty:"medium", pattern:"DP",              lcUrl:"https://leetcode.com/problems/word-break/",                                         mustSolve:true },
    { number:19, title:"Minimum Window Substring",               difficulty:"hard",   pattern:"Sliding Window",  lcUrl:"https://leetcode.com/problems/minimum-window-substring/",                           mustSolve:true },
    { number:20, title:"Wildcard Matching",                      difficulty:"hard",   pattern:"DP",              lcUrl:"https://leetcode.com/problems/wildcard-matching/" },
    { number:21, title:"Regular Expression Matching",            difficulty:"hard",   pattern:"DP",              lcUrl:"https://leetcode.com/problems/regular-expression-matching/",                        mustSolve:true },
    { number:22, title:"Text Justification",                     difficulty:"hard",   pattern:"Simulation",      lcUrl:"https://leetcode.com/problems/text-justification/",                                 companies:["Google","Microsoft"] },
    { number:23, title:"Shortest Palindrome",                    difficulty:"hard",   pattern:"KMP",             lcUrl:"https://leetcode.com/problems/shortest-palindrome/",                                companies:["Google"] },
    { number:24, title:"Find the Index of First Occurrence",     difficulty:"easy",   pattern:"KMP / Sliding",   lcUrl:"https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/" },
    { number:25, title:"Longest Repeating Character Replacement",difficulty:"medium", pattern:"Sliding Window",  lcUrl:"https://leetcode.com/problems/longest-repeating-character-replacement/",            mustSolve:true },
  ],

  // ─────────────────────────────────────────────────
  // MATH & NUMBER THEORY  (new topic — companies love these)
  // ─────────────────────────────────────────────────
  math: [
    { number:1,  title:"Reverse Integer",                        difficulty:"medium", pattern:"Math",            lcUrl:"https://leetcode.com/problems/reverse-integer/" },
    { number:2,  title:"Palindrome Number",                      difficulty:"easy",   pattern:"Math",            lcUrl:"https://leetcode.com/problems/palindrome-number/" },
    { number:3,  title:"FizzBuzz",                               difficulty:"easy",   pattern:"Math",            lcUrl:"https://leetcode.com/problems/fizz-buzz/" },
    { number:4,  title:"Roman to Integer",                       difficulty:"easy",   pattern:"HashMap",         lcUrl:"https://leetcode.com/problems/roman-to-integer/" },
    { number:5,  title:"Integer to Roman",                       difficulty:"medium", pattern:"Greedy",          lcUrl:"https://leetcode.com/problems/integer-to-roman/" },
    { number:6,  title:"Pow(x, n)",                              difficulty:"medium", pattern:"Fast Exponentiation", lcUrl:"https://leetcode.com/problems/powx-n/",                                       companies:["Google","Amazon"] },
    { number:7,  title:"Sqrt(x)",                                difficulty:"easy",   pattern:"Binary Search",   lcUrl:"https://leetcode.com/problems/sqrtx/" },
    { number:8,  title:"Count Primes",                           difficulty:"medium", pattern:"Sieve of Eratosthenes", lcUrl:"https://leetcode.com/problems/count-primes/",                              companies:["Amazon","Microsoft"] },
    { number:9,  title:"Happy Number",                           difficulty:"easy",   pattern:"Floyd's",         lcUrl:"https://leetcode.com/problems/happy-number/" },
    { number:10, title:"GCD / LCM basics",                       difficulty:"easy",   pattern:"Euclidean",       lcUrl:"https://leetcode.com/problems/greatest-common-divisor-of-strings/" },
    { number:11, title:"Add Binary",                             difficulty:"easy",   pattern:"Bit/String",      lcUrl:"https://leetcode.com/problems/add-binary/" },
    { number:12, title:"Multiply Strings",                       difficulty:"medium", pattern:"Simulation",      lcUrl:"https://leetcode.com/problems/multiply-strings/" },
    { number:13, title:"Excel Sheet Column Number",              difficulty:"easy",   pattern:"Math Base 26",    lcUrl:"https://leetcode.com/problems/excel-sheet-column-number/" },
    { number:14, title:"Fraction to Recurring Decimal",          difficulty:"medium", pattern:"HashMap+Math",    lcUrl:"https://leetcode.com/problems/fraction-to-recurring-decimal/",                     companies:["Google"] },
    { number:15, title:"Ugly Number II",                         difficulty:"medium", pattern:"DP / Heap",       lcUrl:"https://leetcode.com/problems/ugly-number-ii/",                                    companies:["Google"] },
    { number:16, title:"Super Pow",                              difficulty:"medium", pattern:"Fast Expo + Mod", lcUrl:"https://leetcode.com/problems/super-pow/" },
    { number:17, title:"Factorial Trailing Zeroes",              difficulty:"medium", pattern:"Math",            lcUrl:"https://leetcode.com/problems/factorial-trailing-zeroes/",                          companies:["Amazon"] },
    { number:18, title:"Valid Perfect Square",                   difficulty:"easy",   pattern:"Binary Search",   lcUrl:"https://leetcode.com/problems/valid-perfect-square/" },
  ],

  // ─────────────────────────────────────────────────
  // INTERVALS  (dedicated topic — very frequent)
  // ─────────────────────────────────────────────────
  intervals: [
    { number:1,  title:"Meeting Rooms",                          difficulty:"easy",   pattern:"Sort",            lcUrl:"https://leetcode.com/problems/meeting-rooms/" },
    { number:2,  title:"Merge Intervals",                        difficulty:"medium", pattern:"Sort + Merge",    lcUrl:"https://leetcode.com/problems/merge-intervals/",                                   mustSolve:true },
    { number:3,  title:"Insert Interval",                        difficulty:"medium", pattern:"Linear Scan",     lcUrl:"https://leetcode.com/problems/insert-interval/",                                   mustSolve:true },
    { number:4,  title:"Non-overlapping Intervals",              difficulty:"medium", pattern:"Greedy",          lcUrl:"https://leetcode.com/problems/non-overlapping-intervals/",                         mustSolve:true },
    { number:5,  title:"Meeting Rooms II",                       difficulty:"medium", pattern:"Min Heap",        lcUrl:"https://leetcode.com/problems/meeting-rooms-ii/",                                  mustSolve:true },
    { number:6,  title:"Min Number of Arrows to Burst Balloons", difficulty:"medium", pattern:"Greedy",          lcUrl:"https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/" },
    { number:7,  title:"Maximum Overlap",                        difficulty:"medium", pattern:"Sort+Sweep",      lcUrl:"https://leetcode.com/problems/maximum-overlap-of-contiguous-intervals/" },
    { number:8,  title:"Interval List Intersections",            difficulty:"medium", pattern:"Two Pointers",    lcUrl:"https://leetcode.com/problems/interval-list-intersections/",                        companies:["Facebook"] },
    { number:9,  title:"Employee Free Time",                     difficulty:"hard",   pattern:"Heap/Sort",       lcUrl:"https://leetcode.com/problems/employee-free-time/",                                companies:["Google","Uber"] },
    { number:10, title:"Data Stream as Disjoint Intervals",      difficulty:"hard",   pattern:"TreeMap",         lcUrl:"https://leetcode.com/problems/data-stream-as-disjoint-intervals/",                  companies:["Google"] },
    { number:11, title:"Minimum Interval to Include Each Query", difficulty:"hard",   pattern:"Heap+Sort",       lcUrl:"https://leetcode.com/problems/minimum-interval-to-include-each-query/",             mustSolve:true },
    { number:12, title:"Maximum Profit in Job Scheduling",       difficulty:"hard",   pattern:"DP+BS",           lcUrl:"https://leetcode.com/problems/maximum-profit-in-job-scheduling/",                   mustSolve:true },
  ],
};

// Count stats
export const TOTAL_PROBLEMS = Object.values(PROBLEMS).reduce((s, arr) => s + arr.length, 0);
export const MUST_SOLVE_COUNT = Object.values(PROBLEMS).flat().filter(p => p.mustSolve).length;
