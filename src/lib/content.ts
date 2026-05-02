// src/lib/content.ts
// In-app readable learning content — theory, patterns, pseudocode, examples
// Users read this BEFORE solving problems. This IS the resource.

export type ContentSection = {
  heading: string;
  body: string; // markdown-lite: supports **bold**, `code`, and \n for newlines
};

export type TopicContent = {
  tldr: string; // one-sentence essence
  whenToUse: string[];
  keyInsight: string;
  template: string; // code template / pseudocode
  complexity: { time: string; space: string; note: string };
  commonMistakes: string[];
  sections: ContentSection[];
};

export const TOPIC_CONTENT: Record<string, TopicContent> = {

  arrays: {
    tldr: "Arrays give O(1) random access. Most array problems reduce to: prefix sums, two pointers, or sliding window.",
    whenToUse: [
      "Contiguous subarray sum/product → prefix sum",
      "Find pair/triplet with a property → two pointers (if sorted)",
      "Max/min in a window → sliding window",
      "In-place modification → two pointer swap",
    ],
    keyInsight: "Before coding, ask: Is the array sorted? Do I need indices or just values? Can I process left-to-right in one pass? These three questions eliminate 80% of wrong approaches.",
    template: `// Prefix Sum Template
const prefix = new Array(n + 1).fill(0);
for (let i = 0; i < n; i++) prefix[i+1] = prefix[i] + nums[i];
// rangeSum(l, r) = prefix[r+1] - prefix[l]

// Kadane's Algorithm (max subarray)
let maxSum = nums[0], curr = nums[0];
for (let i = 1; i < n; i++) {
  curr = Math.max(nums[i], curr + nums[i]);
  maxSum = Math.max(maxSum, curr);
}`,
    complexity: { time: "O(n) for most patterns", space: "O(1) if in-place, O(n) for prefix", note: "Prefix sum builds O(n) extra space to answer range queries in O(1)" },
    commonMistakes: [
      "Off-by-one in prefix sum: prefix[r+1] - prefix[l], not prefix[r] - prefix[l]",
      "Forgetting to handle empty subarray vs at-least-one-element in Kadane's",
      "Using O(n²) nested loop when a single pass + hashmap would work",
      "Mutating the input array without being asked to",
    ],
    sections: [
      {
        heading: "1. Prefix Sum — range queries in O(1)",
        body: `A prefix sum array lets you compute the sum of any subarray in O(1) after O(n) preprocessing.

**Build:** \`prefix[i] = prefix[i-1] + arr[i]\` (with prefix[0] = 0)
**Query:** \`sum(l, r) = prefix[r+1] - prefix[l]\`

**Example:** arr = [1, 2, 3, 4, 5]
prefix = [0, 1, 3, 6, 10, 15]
sum(1, 3) = prefix[4] - prefix[1] = 10 - 1 = 9 ✓

**Key extension — Prefix + HashMap:** If you want to find subarrays with sum = k, store prefix sums in a hashmap. At each index i, check if (prefix[i] - k) was seen before.

This is how **Subarray Sum Equals K** works in O(n).`
      },
      {
        heading: "2. Kadane's Algorithm — maximum subarray",
        body: `The core idea: at each position, decide whether to extend the existing subarray or start fresh.

**Rule:** \`curr = max(nums[i], curr + nums[i])\`

If curr + nums[i] < nums[i], the previous subarray is hurting us — start over.

**Why it works:** We're asking "what's the best subarray ending exactly here?" The answer is either just this element, or extend whatever was best before.

**Variant — max product:** Track both max and min (negative × negative = positive).
\`maxProd = max(nums[i], maxProd*nums[i], minProd*nums[i])\`
\`minProd = min(nums[i], maxProd*nums[i], minProd*nums[i])\``
      },
      {
        heading: "3. Two Pointers on Arrays",
        body: `Two pointers eliminate the need for nested loops. They only work when:
1. The array is **sorted** (or you can sort it), or
2. You're doing in-place modifications

**Pattern 1 — Opposite ends (sorted array):**
\`let l = 0, r = n - 1;\`
Move l right if sum is too small, move r left if sum is too large.
Used for: 2Sum, 3Sum, Container With Most Water.

**Pattern 2 — Same direction (fast + slow):**
\`let write = 0;\`
Read pointer scans everything, write pointer only advances for valid elements.
Used for: Remove Duplicates, Move Zeroes.

**Pattern 3 — Dutch National Flag (3 values):**
Maintain three regions: [0..low-1] = 0s, [low..mid-1] = 1s, [mid..high] = unknown, [high+1..n-1] = 2s`
      },
      {
        heading: "4. Matrix Problems",
        body: `Most matrix problems are just array problems with 2D indexing.

**Rotate 90° clockwise:** Transpose then reverse each row.
- Transpose: \`matrix[i][j] ↔ matrix[j][i]\`
- Reverse rows: \`matrix[i].reverse()\`

**Spiral traversal:** Maintain four boundaries (top, bottom, left, right). Shrink after each direction.

**Set Matrix Zeroes:** First scan to record which rows/cols to zero. Then apply. Don't zero as you go — it corrupts the scan.

**Search in sorted matrix:** Treat as 1D array (binary search), or start from top-right: go down if too small, go left if too large.`
      },
    ],
  },

  hashing: {
    tldr: "HashMaps trade O(n) space for O(1) lookup — turning O(n²) nested loops into a single pass.",
    whenToUse: [
      "Count frequencies of elements",
      "Find if complement/pair exists",
      "Group elements by a key (anagrams, frequencies)",
      "Track seen elements to find duplicates",
      "Map one set of values to another (isomorphism)",
    ],
    keyInsight: "HashMap is the Swiss Army knife of DSA. The moment you find yourself doing 'for each element, scan the rest of the array', stop — use a HashMap instead.",
    template: `// Two Sum pattern — O(n)
const seen = new Map(); // value → index
for (let i = 0; i < nums.length; i++) {
  const complement = target - nums[i];
  if (seen.has(complement)) return [seen.get(complement), i];
  seen.set(nums[i], i);
}

// Frequency map pattern
const freq = new Map();
for (const x of arr) freq.set(x, (freq.get(x) || 0) + 1);

// Sliding window + HashMap (at most K distinct)
const window = new Map();
let l = 0;
for (let r = 0; r < s.length; r++) {
  window.set(s[r], (window.get(s[r]) || 0) + 1);
  while (window.size > k) {
    window.set(s[l], window.get(s[l]) - 1);
    if (window.get(s[l]) === 0) window.delete(s[l]);
    l++;
  }
}`,
    complexity: { time: "O(n) average for all operations", space: "O(n) for the map", note: "Worst case O(n) for collisions, but amortized O(1) with good hash functions" },
    commonMistakes: [
      "Using array index as a map when values can be negative or very large",
      "Forgetting Map vs Object in JS: use Map for non-string keys",
      "Not handling the case where a key maps to 0 (falsy) — use .has() not just truthiness",
      "For anagram grouping: sorted key works, but char-frequency array as key is faster",
    ],
    sections: [
      {
        heading: "1. How HashMap works internally",
        body: `A HashMap stores key-value pairs using a **hash function** to compute an array index.

**Hash function:** converts key → integer index in [0, capacity)
**Collision handling:** Two keys hashing to the same slot is a collision.
- **Chaining:** Each slot holds a linked list. O(1) average, O(n) worst.
- **Open addressing:** If slot is taken, probe next slot (linear, quadratic, or double hashing).

**Load factor:** When (size / capacity) > threshold (usually 0.75), resize by doubling.

**JavaScript Map** is ordered (insertion order) and allows any key type. Objects only allow string/symbol keys.

**Time complexity:** O(1) average for get/set/has/delete. O(n) worst case (degenerate hash).`
      },
      {
        heading: "2. Classic HashMap Patterns",
        body: `**Pattern 1: Complement lookup (Two Sum)**
Goal: find two numbers that sum to target.
Naive: O(n²) nested loop.
HashMap: for each num, check if (target - num) is in map. O(n).

**Pattern 2: Frequency counting**
Count occurrences with \`map.set(x, (map.get(x)||0)+1)\`.
Use for: Top K frequent, Group Anagrams (sort chars as key), Valid Anagram (two freq maps must match).

**Pattern 3: Prefix sum + HashMap**
Track running prefix sums. If (prefix - k) was seen, a subarray of sum k exists.
This is the core of Subarray Sum Equals K.

**Pattern 4: Bijection / Isomorphism**
Two maps: forward (a→b) and backward (b→a).
Check both directions — isomorphic means one-to-one mapping.`
      },
      {
        heading: "3. LRU Cache — the ultimate HashMap problem",
        body: `LRU Cache needs O(1) get and O(1) put. This requires combining two data structures:

**HashMap:** key → node (for O(1) lookup)
**Doubly Linked List:** maintains access order (most recent at head, least recent at tail)

**Get:** lookup in map, move node to head, return value.
**Put:** if key exists, update and move to head. If new, add at head. If over capacity, evict tail.

\`\`\`
Map: {key → ListNode}
List: head ↔ [most recent] ↔ ... ↔ [least recent] ↔ tail
\`\`\`

The dummy head and tail nodes eliminate edge cases (never need to check null neighbors).

This pattern — **HashMap + Doubly Linked List** — also appears in LFU Cache, Design Twitter (recent tweets), and Browser History.`
      },
    ],
  },

  twopointers: {
    tldr: "Two pointers scan from both ends (or same direction) to reduce O(n²) to O(n). Only works on sorted data or for in-place writes.",
    whenToUse: [
      "Sorted array + find pair/triplet with a target sum",
      "Remove elements in-place (keep/discard pattern)",
      "Palindrome check (mirror from both ends)",
      "Find the longest valid window (sometimes overlaps with sliding window)",
    ],
    keyInsight: "The invariant is key. For opposite-end pointers: if arr[l] + arr[r] < target, moving l right increases the sum; moving r left decreases it. This binary choice eliminates half the search space each step.",
    template: `// Opposite ends (sorted array)
let l = 0, r = arr.length - 1;
while (l < r) {
  const sum = arr[l] + arr[r];
  if (sum === target) { /* found */ }
  else if (sum < target) l++;
  else r--;
}

// Same direction — in-place write (slow/fast)
let write = 0; // slow pointer
for (let read = 0; read < arr.length; read++) { // fast pointer
  if (isValid(arr[read])) arr[write++] = arr[read];
}
// arr[0..write-1] contains valid elements

// Dutch National Flag (3-way partition)
let lo = 0, mid = 0, hi = arr.length - 1;
while (mid <= hi) {
  if (arr[mid] === 0) swap(lo++, mid++);
  else if (arr[mid] === 1) mid++;
  else swap(mid, hi--);
}`,
    complexity: { time: "O(n) — each pointer moves at most n steps", space: "O(1) — pointers only, no extra space", note: "Sorting first costs O(n log n) but the two-pointer scan is O(n)" },
    commonMistakes: [
      "Applying two pointers to unsorted data where it doesn't logically work",
      "In 3Sum: not skipping duplicates at both the outer loop and inner pointers",
      "Moving both pointers at once — only move ONE per step based on the condition",
      "For palindrome: forgetting to skip non-alphanumeric characters first",
    ],
    sections: [
      {
        heading: "1. Why sorting unlocks two pointers",
        body: `Sorted arrays have a critical property: every element to the right is ≥ current.

This means if arr[l] + arr[r] < target, there's **no hope** for this l with any r' < r (they'd all be smaller). So we move l right — guaranteed safe.

If arr[l] + arr[r] > target, there's **no hope** for this r with any l' > l (they'd all be larger). So we move r left.

This logical certainty is what makes two pointers work. Without sorted order, moving a pointer doesn't guarantee progress — you might miss solutions.

**When sorting isn't allowed** (you need original indices), use a HashMap instead (Two Sum unsorted).`
      },
      {
        heading: "2. 3Sum — the canonical deduplication problem",
        body: `3Sum extends 2Sum by fixing one element and running two pointers for the rest.

\`\`\`
sort(nums)
for i from 0 to n-3:
  if i > 0 && nums[i] == nums[i-1]: continue  // skip dup outer
  l = i+1, r = n-1
  while l < r:
    sum = nums[i] + nums[l] + nums[r]
    if sum == 0:
      add triplet
      while l < r && nums[l] == nums[l+1]: l++  // skip dup left
      while l < r && nums[r] == nums[r-1]: r--  // skip dup right
      l++; r--
    elif sum < 0: l++
    else: r--
\`\`\`

**Why skip duplicates?** After finding a triplet, if nums[l] is repeated, the same triplet would be added again. Skip forward until the value changes.

**Time:** O(n²) — outer loop O(n) × inner two-pointer O(n).`
      },
      {
        heading: "3. Dutch National Flag — 3-way partition",
        body: `Problem: sort an array of 0s, 1s, and 2s in-place in O(n) with one pass.

**Invariant at each step:**
- \`arr[0..lo-1]\` = all 0s
- \`arr[lo..mid-1]\` = all 1s
- \`arr[mid..hi]\` = unknown
- \`arr[hi+1..n-1]\` = all 2s

**Rules:**
- \`arr[mid] == 0\`: swap(lo, mid), lo++, mid++
- \`arr[mid] == 1\`: mid++ (already in place)
- \`arr[mid] == 2\`: swap(mid, hi), hi-- (don't increment mid — newly swapped element unknown)

This is also the foundation for **quicksort's partition step**.`
      },
    ],
  },

  sliding: {
    tldr: "Sliding window: expand right to include elements, shrink left when a constraint is violated. O(n) for most subarray/substring problems.",
    whenToUse: [
      "Longest/shortest subarray/substring with a property",
      "Fixed-size window: max/min/sum over all windows of size k",
      "Subarrays with at most K distinct elements",
      "String permutation / anagram in another string",
    ],
    keyInsight: "The window always represents a 'valid' state. Right pointer expands to explore; left pointer contracts to restore validity. The key question is: **what makes a window invalid?**",
    template: `// Variable window — find LONGEST valid window
let l = 0, maxLen = 0;
const state = new Map(); // track window contents

for (let r = 0; r < s.length; r++) {
  // Add s[r] to window state
  state.set(s[r], (state.get(s[r]) || 0) + 1);

  // Shrink while invalid
  while (isInvalid(state)) {
    state.set(s[l], state.get(s[l]) - 1);
    if (state.get(s[l]) === 0) state.delete(s[l]);
    l++;
  }

  // Window [l..r] is now valid
  maxLen = Math.max(maxLen, r - l + 1);
}

// Fixed window of size k
for (let r = 0; r < arr.length; r++) {
  // add arr[r]
  if (r >= k) { /* remove arr[r-k] */ }
  if (r >= k - 1) { /* record answer */ }
}`,
    complexity: { time: "O(n) — each element enters and leaves the window at most once", space: "O(k) where k = window size or distinct characters", note: "Even though there's a nested while loop, l only moves right — total work is O(2n) = O(n)" },
    commonMistakes: [
      "Thinking the nested while loop makes it O(n²) — it's O(n) because l only moves right",
      "For character problems: using array[26] instead of Map for cleaner code with any characters",
      "Fixed window: off-by-one when removing the element leaving the window (index r-k, not r-k+1)",
      "Variable window for MINIMUM: need to check validity differently than for maximum",
    ],
    sections: [
      {
        heading: "1. Fixed vs Variable window — know the difference",
        body: `**Fixed window (size = k):** Add right element, remove left element (r-k) once window is full. One pass, no shrinking needed.

Example: Maximum average subarray of length k.
\`\`\`
let sum = 0;
for r in range(n):
  sum += arr[r]
  if r >= k: sum -= arr[r-k]  // remove element leaving window
  if r >= k-1: answer = max(answer, sum/k)
\`\`\`

**Variable window:** Right expands freely. Left shrinks only when window becomes invalid.

The definition of "invalid" is the core of the pattern:
- Longest substring without repeating: invalid when a char appears twice
- Max consecutive ones after flipping k zeros: invalid when zero count > k
- Minimum window substring: invalid once all required chars are covered (we want MINIMUM so we shrink to find tightest fit)`
      },
      {
        heading: "2. Sliding Window + HashMap — character problems",
        body: `For string problems, track character frequencies in a hashmap.

**Permutation in String / Find All Anagrams:**
- Build frequency map of pattern p.
- Slide a window of size len(p) over string s.
- Track how many characters in the window match required frequencies (use a 'matches' counter).
- Window is valid when matches == number of unique chars in p.

**Minimum Window Substring:**
- Expand right until all required chars are covered (valid window).
- Then shrink left as much as possible while staying valid.
- Record minimum valid window length.
- Repeat from new right position.

The **'formed' counter** trick: increment formed when a char's window count matches its required count. Decrement when it drops below.`
      },
      {
        heading: "3. Sliding Window Maximum — monotonic deque",
        body: `Finding max in every window of size k naively is O(nk). With a monotonic deque: O(n).

**Idea:** Maintain a deque of indices where values are in decreasing order.

**Rule:**
- Before adding right element: remove all indices from deque's back where arr[back] ≤ arr[right] (they can never be the max)
- Remove front if it's outside current window (index < r-k+1)
- Front of deque is always the max of current window

**Why this works:** If arr[i] ≤ arr[j] and i < j, then arr[i] will never be a window maximum — arr[j] is always in the window when arr[i] is and it's larger. So we can safely discard arr[i].`
      },
    ],
  },

  stack: {
    tldr: "Stack = LIFO. The monotonic stack pattern solves 'next greater/smaller element' problems in O(n) by maintaining an ordered stack.",
    whenToUse: [
      "Balanced parentheses / bracket matching",
      "Next greater/smaller element in array",
      "Largest rectangle in histogram",
      "Evaluate expressions (RPN, calculator)",
      "Undo/redo operations, DFS simulation",
    ],
    keyInsight: "For monotonic stack: as you scan left to right, when you find an element that 'beats' the stack top, the stack top has found its answer. Pop and record. This processes each element at most twice — O(n) total.",
    template: `// Monotonic Stack — Next Greater Element
const result = new Array(n).fill(-1);
const stack = []; // stores indices

for (let i = 0; i < n; i++) {
  // Pop all elements smaller than current — they found their NGE
  while (stack.length && nums[stack[stack.length-1]] < nums[i]) {
    result[stack.pop()] = nums[i];
  }
  stack.push(i);
}
// Remaining in stack: no NGE exists → result stays -1

// Balanced Parentheses
const stack = [];
const pairs = {')':'(', ']':'[', '}':'{'};
for (const ch of s) {
  if ('([{'.includes(ch)) stack.push(ch);
  else if (stack[stack.length-1] !== pairs[ch]) return false;
  else stack.pop();
}
return stack.length === 0;`,
    complexity: { time: "O(n) — each element pushed and popped at most once", space: "O(n) for the stack in worst case", note: "Even though there's a while loop inside the for loop, total pops ≤ total pushes = n" },
    commonMistakes: [
      "Using stack.length-1 for peeking vs just checking the last element",
      "For NGE with circular array: iterate 2n with index mod n",
      "Histogram: forgetting to process remaining elements in stack after the main loop",
      "Not using a monotonic DECreasing stack when you need previous smaller element",
    ],
    sections: [
      {
        heading: "1. Monotonic Stack — the core pattern",
        body: `A monotonic stack maintains elements in sorted order (increasing or decreasing) as you push.

**Monotonic Increasing Stack** (bottom to top: smallest to largest):
- When pushing element x, pop all elements ≥ x from the top.
- Use for: **Previous/Next Smaller Element**.

**Monotonic Decreasing Stack** (bottom to top: largest to smallest):
- When pushing element x, pop all elements ≤ x from the top.
- Use for: **Previous/Next Greater Element**.

**Key observation:** When you pop element i because nums[j] > nums[i], element j is the **next greater element** for i.

**Daily Temperatures:** For each day, you want the next warmer day. Use monotonic increasing stack of temperatures (or decreasing stack of temperatures depending on perspective — just store indices).`
      },
      {
        heading: "2. Largest Rectangle in Histogram",
        body: `This is the hardest stack problem but appears at Google and Amazon frequently.

**Idea:** For each bar, find the maximum rectangle where this bar is the **shortest bar** (the height limiter).

To maximize width, extend left until you hit a shorter bar, and right until you hit a shorter bar.

**Monotonic increasing stack approach:**
- Maintain a stack of bars in increasing height order.
- When a shorter bar arrives (arr[i] < stack top): the stack top found its right boundary.
- The new left boundary is the element just below the stack top.
- Width = right_boundary - left_boundary - 1

**Add sentinel values:** prepend and append 0 to handle edge cases cleanly.

**Maximal Rectangle in 2D Matrix:** Apply histogram algorithm to each row. Build a "height array" incrementally: if matrix[r][c] == '1', height[c]++, else height[c] = 0. Run histogram algorithm on each row's heights.`
      },
      {
        heading: "3. Stack for Expression Evaluation",
        body: `**Reverse Polish Notation (RPN):**
Numbers → push onto stack.
Operators → pop two operands, compute, push result.

\`\`\`
for token in tokens:
  if isNumber: stack.push(int(token))
  else:
    b = stack.pop(); a = stack.pop()
    if token == '+': stack.push(a + b)
    elif token == '-': stack.push(a - b)
    elif token == '*': stack.push(a * b)
    elif token == '/': stack.push(int(a / b))  // truncate toward zero
\`\`\`

**Decode String** (e.g., "3[a2[bc]]" → "abcbcabcbcabcbc"):
Two stacks — one for counts, one for strings.
When you see '[': push current count and current string.
When you see ']': pop count and string, repeat current string count times.`
      },
    ],
  },

  linkedlist: {
    tldr: "Linked list problems are all about pointer manipulation. Master three patterns: slow-fast pointers, reverse in-place, and dummy head node.",
    whenToUse: [
      "Cycle detection → slow-fast (Floyd's)",
      "Find middle / kth from end → slow-fast",
      "Reverse entire list or k-groups → iterative with prev/curr",
      "Merge sorted lists → two-pointer scan",
      "Deep copy with random pointers → HashMap",
    ],
    keyInsight: "Draw the pointers. Before writing a single line of code, draw boxes for nodes and arrows for pointers. Update arrows step by step. Every bug in linked list problems comes from not drawing this.",
    template: `// Reverse Linked List — iterative
let prev = null, curr = head;
while (curr) {
  const next = curr.next; // save next
  curr.next = prev;       // reverse pointer
  prev = curr;            // move prev forward
  curr = next;            // move curr forward
}
return prev; // new head

// Slow-Fast (middle of list)
let slow = head, fast = head;
while (fast && fast.next) {
  slow = slow.next;
  fast = fast.next.next;
}
// slow is now at middle

// Floyd's Cycle Detection
let slow = head, fast = head;
while (fast && fast.next) {
  slow = slow.next;
  fast = fast.next.next;
  if (slow === fast) return true; // cycle!
}
return false;

// Dummy head pattern (simplifies edge cases)
const dummy = new ListNode(0);
dummy.next = head;
let curr = dummy;
// ... manipulate list ...
return dummy.next;`,
    complexity: { time: "O(n) for traversal", space: "O(1) for pointer-only solutions, O(n) if using extra DS", note: "Recursive solutions use O(n) call stack — prefer iterative for large lists" },
    commonMistakes: [
      "Not saving curr.next before setting curr.next = prev in reversal",
      "Losing track of the head during in-place operations",
      "Off-by-one in 'find kth from end': fast should start k steps ahead",
      "For cycle detection II (find entry point): after meeting point, reset one pointer to head, move both at speed 1",
    ],
    sections: [
      {
        heading: "1. Slow-Fast Pointer — three problems, one pattern",
        body: `**Problem 1: Find middle**
Fast moves 2x. When fast reaches end, slow is at middle.
\`while fast && fast.next: slow=slow.next; fast=fast.next.next\`

**Problem 2: Cycle detection (Floyd's)**
Same movement. If there's a cycle, fast eventually laps slow and they meet.
If fast reaches null → no cycle.

**Problem 3: Find cycle entry point**
After slow and fast meet inside the cycle:
- Reset one pointer to head.
- Move both at speed 1.
- They meet at the cycle entry.

**Why it works mathematically:** If the meeting point is distance d from the cycle entry, and the entry is distance F from the head, then F = d (mod cycle length). Moving one pointer to head and both at speed 1 makes them meet at the entry after F steps.

**Problem 4: Find duplicate number (no extra space)**
Treat array values as "next pointers": index i points to nums[i]. There's a cycle iff there's a duplicate. Apply Floyd's.`
      },
      {
        heading: "2. Reverse — the building block",
        body: `Reversing a linked list is a building block used in Reorder List, Reverse K-Group, and Palindrome Linked List.

**Iterative template:**
\`\`\`
prev = null
curr = head
while curr:
  nxt = curr.next
  curr.next = prev
  prev = curr
  curr = nxt
return prev  // new head
\`\`\`

**Reorder List** (1→2→3→4→5 becomes 1→5→2→4→3):
1. Find middle with slow-fast.
2. Reverse the second half.
3. Merge the two halves alternately.

**Palindrome Linked List:**
1. Find middle.
2. Reverse second half.
3. Compare first half with reversed second half.
4. (Optionally restore the list.)`
      },
      {
        heading: "3. Merge K Sorted Lists — a heap classic",
        body: `Merging 2 sorted lists is O(n+m) with two pointers.
Merging K sorted lists naively (merge pairs) is O(nk log k).

**Optimal approach: Min-Heap**
1. Add the head of each list to a min-heap.
2. Pop minimum, add to result, push its next node.
3. Repeat until heap is empty.

**Time:** O(n log k) where n = total nodes, k = number of lists.
The heap always has at most k elements, so each push/pop is O(log k).

**Alternative: Divide and Conquer**
Pair up lists and merge pairs. Repeat.
Total work: k/2 merges of size 2, k/4 merges of size 4, etc. = O(n log k).`
      },
    ],
  },

  trees: {
    tldr: "Tree problems = choosing the right traversal (DFS preorder/inorder/postorder or BFS level-order) and deciding what each recursive call returns.",
    whenToUse: [
      "Path problems (root to leaf, any to any) → DFS, accumulate path",
      "Level-wise properties → BFS with queue",
      "BST search/validation → use BST property (left < root < right)",
      "LCA → DFS returning node reference",
      "Construct tree from traversals → recursion with index ranges",
    ],
    keyInsight: "For DFS tree problems, always ask: 'What should this function return?' Usually it returns the answer for the subtree rooted at the current node. Combining left and right subtree answers gives the parent's answer. This is the post-order DFS template.",
    template: `// Post-order DFS — most common template
function dfs(node) {
  if (!node) return baseCase; // null node
  const left = dfs(node.left);   // solve left subtree
  const right = dfs(node.right); // solve right subtree
  // combine left, right, and node.val
  return answer;
}

// BFS Level Order
const result = [];
const queue = [root];
while (queue.length) {
  const levelSize = queue.length;
  const level = [];
  for (let i = 0; i < levelSize; i++) {
    const node = queue.shift();
    level.push(node.val);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  result.push(level);
}

// BST validation
function isValid(node, min, max) {
  if (!node) return true;
  if (node.val <= min || node.val >= max) return false;
  return isValid(node.left, min, node.val) &&
         isValid(node.right, node.val, max);
}`,
    complexity: { time: "O(n) for most traversals — visit each node once", space: "O(h) for DFS call stack (h = height), O(w) for BFS queue (w = max width)", note: "Balanced tree: h = O(log n). Skewed tree (worst case): h = O(n)" },
    commonMistakes: [
      "Using global variable to pass info down instead of function parameter — hard to reason about",
      "BST validation: comparing only with direct parent (wrong). Must pass min/max bounds down.",
      "LCA: not handling the case where one node is an ancestor of the other",
      "Level order: forgetting to capture queue.length at the START of each level (it changes as you add children)",
    ],
    sections: [
      {
        heading: "1. The four traversal orders",
        body: `**Preorder (Root → Left → Right):** Used for serialization, copying tree, prefix expressions.
\`process(node) → recurse left → recurse right\`

**Inorder (Left → Root → Right):** For BST, this gives elements in sorted order. Used for BST validation, kth smallest.
\`recurse left → process(node) → recurse right\`

**Postorder (Left → Right → Root):** Used when you need answers from children before processing parent. Used for height, diameter, LCA, path sum.
\`recurse left → recurse right → process(node)\`

**Level Order (BFS):** Process all nodes at depth d before depth d+1. Used for right side view, average of levels, zigzag traversal.
\`Queue: process current level, add all children for next level\`

**Which to use?** If you need info from children first → postorder. If you're searching/pruning top-down → preorder. If you need levels → BFS.`
      },
      {
        heading: "2. DFS: the 'return value' trick",
        body: `Most tree DFS problems become easy when you clearly define what the function returns.

**Diameter of Binary Tree:**
- Return: height of subtree
- Side effect: update maxDiameter = max(maxDiameter, leftHeight + rightHeight)

**Binary Tree Maximum Path Sum:**
- Return: max path sum starting from this node going DOWN (only one direction)
- Side effect: update maxSum = max(maxSum, left + right + node.val)
- Note: return max(node.val, node.val + max(left, right)) — never go both directions in the return

**Lowest Common Ancestor:**
- Return: LCA node if found, null if neither p nor q is in subtree
- If both left and right return non-null → current node is LCA
- If only one returns non-null → propagate that up

**Balanced Binary Tree:**
- Return: -1 if subtree is unbalanced, else its height
- If left or right returns -1 → return -1 (propagate imbalance)
- If |leftHeight - rightHeight| > 1 → return -1`
      },
      {
        heading: "3. BST — using the ordering property",
        body: `A BST guarantees: all nodes in left subtree < root < all nodes in right subtree.

**Inorder traversal = sorted array.** Use this for Kth Smallest (count nodes in inorder).

**Search:** At each node, go left if target < node.val, right if target > node.val. O(h).

**Validation:** Don't just check node.val vs parent. Pass down bounds.
- Root can be anything: (-∞, +∞)
- Root's left child must be in (-∞, root.val)
- Root's right child must be in (root.val, +∞)

**LCA in BST:** Both p and q are less → go left. Both greater → go right. They split → current node is LCA. O(h), no extra space.

**Insert:** Recurse until null spot, insert there. Return the modified subtree root.

**Delete:** Three cases: no children (return null), one child (return that child), two children (replace with inorder successor, delete successor from right subtree).`
      },
    ],
  },

  graphs: {
    tldr: "Graphs generalize trees. Master BFS (shortest path), DFS (connectivity/cycles), Union-Find (grouping), and Topological Sort (dependencies).",
    whenToUse: [
      "Connectivity / components → BFS/DFS or Union-Find",
      "Shortest path in unweighted graph → BFS",
      "Shortest path in weighted graph → Dijkstra (non-negative) or Bellman-Ford (negative)",
      "Ordering with dependencies → Topological Sort",
      "Cycle detection → DFS with color marking or Union-Find",
      "Grid problems → treat cells as nodes, 4-directional edges",
    ],
    keyInsight: "Most graph problems are one of: (1) flood fill / connected components, (2) shortest path, (3) ordering (topo sort), or (4) cycle detection. Identify which before coding.",
    template: `// BFS — shortest path / level-by-level
const visited = new Set([start]);
const queue = [[start, 0]]; // [node, distance]
while (queue.length) {
  const [node, dist] = queue.shift();
  if (node === target) return dist;
  for (const neighbor of graph[node]) {
    if (!visited.has(neighbor)) {
      visited.add(neighbor);
      queue.push([neighbor, dist + 1]);
    }
  }
}

// Topological Sort (Kahn's BFS)
const inDegree = new Array(n).fill(0);
for each edge (u, v): inDegree[v]++;
const queue = all nodes with inDegree 0;
const order = [];
while (queue.length) {
  const u = queue.shift();
  order.push(u);
  for (const v of adj[u]) {
    if (--inDegree[v] === 0) queue.push(v);
  }
}
// If order.length < n → cycle exists

// Union-Find
const parent = Array.from({length:n}, (_,i)=>i);
const rank = new Array(n).fill(0);
function find(x) { return parent[x] === x ? x : parent[x] = find(parent[x]); }
function union(x, y) {
  const px = find(x), py = find(y);
  if (px === py) return false; // already connected
  if (rank[px] < rank[py]) parent[px] = py;
  else if (rank[px] > rank[py]) parent[py] = px;
  else { parent[py] = px; rank[px]++; }
  return true;
}`,
    complexity: { time: "BFS/DFS: O(V+E). Dijkstra: O((V+E) log V). Union-Find: O(α(n)) ≈ O(1) amortized", space: "O(V+E) for adjacency list, O(V) for visited set", note: "α(n) is the inverse Ackermann function — practically constant for all n you'll ever see" },
    commonMistakes: [
      "Forgetting to mark nodes as visited BEFORE adding to queue (not after dequeuing) — causes duplicates",
      "Directed vs undirected: in directed graphs, edge (u,v) does NOT mean (v,u)",
      "Topological sort only works on DAGs (no cycles) — check for cycle after",
      "Dijkstra with negative edges gives wrong answers — use Bellman-Ford instead",
    ],
    sections: [
      {
        heading: "1. BFS vs DFS — when to use which",
        body: `**Use BFS when:**
- You want the SHORTEST PATH in an unweighted graph
- You want level-by-level processing
- The graph is wide but not deep (BFS uses O(w) space where w = max width)

**Use DFS when:**
- You want to detect cycles
- You want to find ALL paths (backtracking)
- You're doing topological sort
- The graph is deep but not wide (DFS uses O(h) stack space)

**For grid problems:** BFS is almost always preferred for "minimum steps" problems. DFS works for "can we reach" or "count connected cells".

**Multi-source BFS:** Start BFS from multiple sources simultaneously. Used in:
- Rotting Oranges (start from all rotten oranges)
- 01 Matrix (distance from nearest 0)
- Pacific Atlantic (start from both oceans simultaneously)`
      },
      {
        heading: "2. Union-Find — the grouping data structure",
        body: `Union-Find (Disjoint Set Union) efficiently answers: "Are nodes x and y in the same component?"

**Two operations:**
- **find(x):** Return the representative (root) of x's component.
- **union(x, y):** Merge the components containing x and y.

**Path compression:** In find(), make every node point directly to root.
\`find(x) = parent[x] == x ? x : parent[x] = find(parent[x])\`

**Union by rank:** Always attach smaller tree under larger tree.

Together, these make both operations O(α(n)) ≈ O(1).

**When to use Union-Find over BFS/DFS:**
- When edges are added dynamically (online algorithm)
- When you need to count components efficiently
- Redundant Connection: if union returns false (already same component), edge is redundant

**Limitations:** Union-Find doesn't work for directed graphs or for finding shortest paths.`
      },
      {
        heading: "3. Dijkstra's Algorithm — weighted shortest path",
        body: `Dijkstra finds shortest paths from a source to all other nodes. Requires non-negative edge weights.

**Algorithm:**
1. dist[source] = 0, dist[all others] = ∞
2. Add (0, source) to min-heap
3. While heap not empty:
   - Pop (cost, node) with minimum cost
   - If cost > dist[node], skip (outdated entry)
   - For each neighbor: if dist[node] + weight < dist[neighbor], update and push to heap

\`\`\`
const dist = new Array(n).fill(Infinity);
dist[src] = 0;
const heap = [[0, src]]; // [cost, node]
while (heap.length) {
  const [cost, u] = heap.pop(); // use min-heap
  if (cost > dist[u]) continue;
  for (const [v, w] of graph[u]) {
    if (dist[u] + w < dist[v]) {
      dist[v] = dist[u] + w;
      heap.push([dist[v], v]);
    }
  }
}
\`\`\`

**Time:** O((V+E) log V) with binary heap.

**Bellman-Ford** (for negative weights): Relax all edges V-1 times. O(VE).`
      },
    ],
  },

  dp: {
    tldr: "DP = recursion + memoization. Always start with the recursive solution, add a cache, then optionally convert to bottom-up table.",
    whenToUse: [
      "Problem asks for count of ways, minimum cost, maximum value, or existence",
      "Choices at each step with overlapping subproblems",
      "Optimal substructure: optimal solution to whole = optimal solutions to subparts",
      "Keywords: 'minimum', 'maximum', 'number of ways', 'can we achieve'",
    ],
    keyInsight: "The hardest part of DP is defining the state. Ask: 'What information do I need at each step to make the optimal decision?' That's your state. Then ask: 'How does a problem of size n relate to smaller subproblems?' That's your transition.",
    template: `// Step 1: Define state and think recursively
// dp[i] = answer for subproblem i

// Step 2: Memoization (top-down)
const memo = new Map();
function dp(i) {
  if (base case) return base value;
  if (memo.has(i)) return memo.get(i);
  const result = // combine dp(i-1), dp(i-2), etc.
  memo.set(i, result);
  return result;
}

// Step 3: Tabulation (bottom-up) — usually preferred
const dp = new Array(n + 1).fill(0);
dp[0] = base0; dp[1] = base1;
for (let i = 2; i <= n; i++) {
  dp[i] = // combine dp[i-1], dp[i-2], etc.
}

// 2D DP (LCS, Edit Distance)
const dp = Array.from({length:m+1}, ()=>new Array(n+1).fill(0));
for (let i = 1; i <= m; i++) {
  for (let j = 1; j <= n; j++) {
    if (s1[i-1] === s2[j-1]) dp[i][j] = dp[i-1][j-1] + 1;
    else dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
  }
}`,
    complexity: { time: "O(states × transition cost) — usually O(n) or O(n²)", space: "O(states) — often reducible to O(1) or O(n) with space optimization", note: "Space optimization: if dp[i] only depends on dp[i-1], use two variables instead of an array" },
    commonMistakes: [
      "Defining state with too much or too little information",
      "Wrong base cases — off by one or missing the empty case (i=0)",
      "For 0/1 knapsack: iterating weights in reverse when doing in-place optimization",
      "Not considering all transitions (forgetting a case in the recurrence)",
    ],
    sections: [
      {
        heading: "1. The 8 DP Patterns you must know",
        body: `**Pattern 1: 1D DP (Fibonacci-style)**
dp[i] depends on dp[i-1] and/or dp[i-2].
Examples: Climbing Stairs, House Robber, Fibonacci.
\`dp[i] = dp[i-1] + dp[i-2]\`

**Pattern 2: 0/1 Knapsack**
For each item, decide: include or exclude.
dp[i][w] = max value using first i items with weight ≤ w.
\`dp[i][w] = max(dp[i-1][w], dp[i-1][w-wt[i]] + val[i])\`
Problems: Partition Equal Subset Sum, Target Sum, Last Stone Weight II.

**Pattern 3: Unbounded Knapsack**
Items can be reused. Same as 0/1 but iterate weights forward.
Problems: Coin Change, Coin Change II.

**Pattern 4: LCS (Longest Common Subsequence)**
2D DP. If chars match: extend diagonal. Else: max of top or left.
Problems: LCS, Edit Distance, Shortest Common Supersequence.

**Pattern 5: LIS (Longest Increasing Subsequence)**
1D DP: dp[i] = length of LIS ending at index i.
O(n log n) with patience sorting + binary search.

**Pattern 6: Palindromic DP**
Expand from center or fill 2D table.
Problems: Longest Palindromic Substring, Palindromic Substrings, Palindrome Partitioning II.

**Pattern 7: Interval DP**
dp[l][r] = answer for subarray from l to r.
Fill by length (small intervals first).
Problems: Burst Balloons, Matrix Chain Multiplication, Stone Merge.

**Pattern 8: State Machine DP**
Multiple states at each position (e.g., holding/not holding stock).
Problems: Stock with Cooldown, Stock with Fee, Best Time IV.`
      },
      {
        heading: "2. Edit Distance — the template for string DP",
        body: `Edit Distance (Levenshtein) asks: minimum operations (insert, delete, replace) to convert s1 to s2.

**State:** dp[i][j] = min ops to convert s1[0..i-1] to s2[0..j-1]

**Base cases:**
- dp[0][j] = j (delete all j chars from s2, or insert j chars)
- dp[i][0] = i (delete all i chars from s1)

**Transition:**
\`\`\`
if s1[i-1] == s2[j-1]:
  dp[i][j] = dp[i-1][j-1]  // no operation needed
else:
  dp[i][j] = 1 + min(
    dp[i-1][j],    // delete from s1
    dp[i][j-1],    // insert into s1
    dp[i-1][j-1]   // replace in s1
  )
\`\`\`

This exact same structure works for: Wildcard Matching, Regular Expression Matching, Distinct Subsequences, Shortest Common Supersequence.`
      },
      {
        heading: "3. Coin Change — unbounded knapsack deep dive",
        body: `**Coin Change (min coins):**
dp[amount] = minimum coins to make this amount.
Base: dp[0] = 0.
Transition: \`dp[a] = min(dp[a], dp[a-coin] + 1)\` for each coin ≤ a.

Iterate amounts 1 to target. For each amount, try every coin. This is bottom-up unbounded knapsack.

**Coin Change II (number of ways):**
dp[amount] = number of ways to make this amount.
Base: dp[0] = 1 (one way to make 0: use no coins).
**Critical:** iterate coins in outer loop, amounts in inner. This ensures each coin combination is counted once (not as permutations).

\`\`\`
for each coin:
  for a from coin to target:
    dp[a] += dp[a - coin]
\`\`\`

If you swap the loops (amounts outer, coins inner), you count permutations. Know which one the problem wants.`
      },
    ],
  },

  bsearch: {
    tldr: "Binary search isn't just for sorted arrays — apply it to any monotone function. If 'is X valid?' is monotone (yes/yes/.../no/no), binary search on X.",
    whenToUse: [
      "Sorted array → find element, boundary, or peak",
      "Minimize maximum / maximize minimum → binary search on answer",
      "Rotated sorted array → identify which half is sorted",
      "Problem says 'find threshold where condition changes' → binary search on answer",
    ],
    keyInsight: "The template confusion (lo < hi vs lo <= hi, mid+1 vs mid) is eliminated by being precise about invariants. Decide: is your answer always in [lo, hi] or [lo, hi)? Then every update must maintain that invariant.",
    template: `// Template 1: Find exact value (lo <= hi)
let lo = 0, hi = n - 1;
while (lo <= hi) {
  const mid = lo + Math.floor((hi - lo) / 2); // avoids overflow
  if (arr[mid] === target) return mid;
  else if (arr[mid] < target) lo = mid + 1;
  else hi = mid - 1;
}
return -1; // not found

// Template 2: Find left boundary (first True)
// Predicate: [F, F, F, T, T, T]
let lo = 0, hi = n;  // [lo, hi) — answer always in this range
while (lo < hi) {
  const mid = lo + Math.floor((hi - lo) / 2);
  if (predicate(mid)) hi = mid;  // mid might be the answer
  else lo = mid + 1;             // mid is definitely not the answer
}
return lo; // first index where predicate is true

// Binary Search on Answer Space
let lo = minPossibleAnswer, hi = maxPossibleAnswer;
while (lo < hi) {
  const mid = lo + Math.floor((hi - lo) / 2);
  if (isFeasible(mid)) hi = mid;  // mid works, try smaller
  else lo = mid + 1;              // mid doesn't work, need bigger
}
return lo;`,
    complexity: { time: "O(log n) per search, plus O(cost of check function)", space: "O(1) iterative, O(log n) recursive", note: "Binary search on answer: if check function is O(n), total is O(n log(answer range))" },
    commonMistakes: [
      "Integer overflow: use mid = lo + (hi-lo)/2, NOT (lo+hi)/2",
      "Infinite loop: if mid = lo when hi = lo+1, and you do hi = mid, loop never terminates. Use hi = mid or lo = mid+1 consistently.",
      "Wrong predicate direction: for minimum valid, predicate should be isFeasible(x). hi=mid when true, lo=mid+1 when false.",
      "Off by one in rotated array: after finding which half is sorted, include the boundary element in the range check",
    ],
    sections: [
      {
        heading: "1. Two templates — choose based on what you're looking for",
        body: `**Template 1 (exact match):** lo <= hi, both move past mid.
Used for: standard search, find if target exists.

**Template 2 (boundary search):** lo < hi, answer stays in [lo, hi).
Used for: first/last occurrence, lower/upper bound.

The key insight for Template 2:
- When predicate(mid) is true: mid COULD be the answer → hi = mid (don't exclude mid)
- When predicate(mid) is false: mid CANNOT be the answer → lo = mid + 1 (exclude mid)
- At the end, lo == hi and points to the first index where predicate is true.

**Finding last occurrence:** Flip the predicate. Or use \`lo = mid + 1\` when condition is met and return lo-1 at end.

**Rotated Sorted Array:**
One half is always sorted. Identify which half, check if target is in that half, narrow down.
\`if arr[lo] <= arr[mid]\` → left half is sorted.`
      },
      {
        heading: "2. Binary Search on Answer Space",
        body: `This is the hardest and most powerful form. Instead of searching in an array, you search in the SPACE OF POSSIBLE ANSWERS.

**Recipe:**
1. Identify the answer range: [min possible, max possible]
2. Write a check function: isFeasible(x) → can we achieve answer ≤ x?
3. This function must be monotone: if x works, x+1 also works (or vice versa)
4. Binary search for the boundary

**Koko Eating Bananas:** Answer = eating speed. Range = [1, max(piles)].
isFeasible(speed): can Koko eat all piles in h hours at this speed? → O(n) check.

**Capacity to Ship Packages:** Answer = capacity. Range = [max(weight), sum(weights)].
isFeasible(cap): can we ship all packages in d days? → O(n) check.

**Split Array Largest Sum:** Answer = largest sum. Range = [max(arr), sum(arr)].
isFeasible(maxSum): can we split into ≤ m subarrays each with sum ≤ maxSum? → O(n) check.

The total time is O(n log(range_size)). Since range is often at most 10^9, log is about 30 → very fast.`
      },
    ],
  },

  heap: {
    tldr: "Heap = always-sorted partial order. Use min-heap for 'K largest', max-heap for 'K smallest'. Two heaps solve median problems.",
    whenToUse: [
      "K largest/smallest/frequent → heap of size K",
      "Merge K sorted lists/arrays → min-heap with (value, list index)",
      "Median from stream → two heaps (max-heap for lower half, min-heap for upper half)",
      "Task scheduling by frequency → max-heap of (count, task)",
      "Dijkstra's shortest path → min-heap of (cost, node)",
    ],
    keyInsight: "Maintain a heap of exactly size K for 'top K' problems. Using a min-heap for K largest: when heap exceeds K, pop the minimum. What remains is the K largest.",
    template: `// K Largest Elements (min-heap of size K)
// JS doesn't have a built-in heap — common interview assumption: use sorted array or implement
// Conceptual implementation:
const minHeap = new MinHeap();
for (const num of nums) {
  minHeap.push(num);
  if (minHeap.size > k) minHeap.pop(); // remove smallest
}
return minHeap.top(); // Kth largest

// Merge K sorted arrays
const minHeap = new MinHeap(); // stores [value, arrayIndex, elementIndex]
for (let i = 0; i < arrays.length; i++) {
  if (arrays[i].length) minHeap.push([arrays[i][0], i, 0]);
}
const result = [];
while (minHeap.size) {
  const [val, ai, ei] = minHeap.pop();
  result.push(val);
  if (ei + 1 < arrays[ai].length) minHeap.push([arrays[ai][ei+1], ai, ei+1]);
}

// Two Heaps — median of stream
const lo = new MaxHeap(); // lower half
const hi = new MinHeap(); // upper half
// Invariant: lo.size == hi.size or lo.size == hi.size + 1
// Median = lo.top() if odd, (lo.top() + hi.top()) / 2 if even`,
    complexity: { time: "Insert/extract: O(log n). Peek: O(1). Build heap: O(n).", space: "O(n) for n elements", note: "Heapify (building from array) is O(n), not O(n log n) — counterintuitive but provable" },
    commonMistakes: [
      "Using max-heap for K largest (keeps everything, O(n log n)) — use min-heap of size K instead (O(n log k))",
      "Not maintaining size invariant in two-heap median problem after each insertion",
      "For task scheduler: using priority queue naively — need to handle cooldown period correctly",
      "Forgetting that JS has no built-in priority queue — in interviews, clarify you'd use one",
    ],
    sections: [
      {
        heading: "1. Min-heap vs Max-heap — the counterintuitive choice",
        body: `**For K LARGEST elements → use a MIN-HEAP of size K.**
Logic: heap keeps K candidates. When a new element arrives that's larger than the smallest in the heap, evict the smallest. After processing all n elements, the K largest remain.
If you used a max-heap, you'd need to hold all n elements and extract K times = O(n log n + K log n).
With min-heap of size K: O(n log K). Better when K << n.

**For K SMALLEST elements → use a MAX-HEAP of size K.**
Same logic inverted.

**Top K Frequent Elements:**
Count frequencies with HashMap, then use a min-heap of size K on (frequency, element).
O(n log k) total.

**Quick Select alternative for Kth Largest:** Average O(n), worst O(n²). Used by Arrays.sort() in Java. In interviews, heap is safer (guaranteed O(n log k)).`
      },
      {
        heading: "2. Find Median from Data Stream",
        body: `Maintain two heaps:
- **lo (max-heap):** stores the smaller half of elements
- **hi (min-heap):** stores the larger half of elements

**Invariant:**
- All elements in lo ≤ all elements in hi
- |lo.size - hi.size| ≤ 1 (sizes differ by at most 1)

**Insert x:**
1. Push to lo (max-heap)
2. Move lo.top() to hi if lo.top() > hi.top() (fix ordering)
3. Rebalance: if hi.size > lo.size, move hi.min() to lo

**Get median:**
- If sizes equal: (lo.top() + hi.top()) / 2
- If lo is larger: lo.top()

**Time:** O(log n) per insertion, O(1) for median.

This pattern extends to: sliding window median (add + remove), k-th quantile, etc.`
      },
    ],
  },

  backtrack: {
    tldr: "Backtracking = DFS on a decision tree. At each node: make a choice, recurse, undo the choice. Prune branches that can't lead to valid solutions.",
    whenToUse: [
      "Generate all subsets/permutations/combinations",
      "Find one or all valid arrangements (N-Queens, Sudoku)",
      "Partition string into valid segments",
      "Path-finding with constraints",
    ],
    keyInsight: "Always draw the decision tree first. Each node = a partial solution. Each edge = a choice. Leaves = complete solutions. Pruning = cutting branches where no valid leaf can exist.",
    template: `// General Backtracking Template
function backtrack(start, current, result) {
  // Base case: current is a complete valid solution
  if (isSolution(current)) {
    result.push([...current]); // copy!
    return;
  }

  for (let i = start; i < choices.length; i++) {
    if (!isValid(i, current)) continue; // prune

    current.push(choices[i]); // make choice
    backtrack(i + 1, current, result); // recurse (i+1 for no reuse, i for reuse)
    current.pop(); // undo choice
  }
}

// Subsets
function subsets(nums) {
  const result = [];
  function bt(start, curr) {
    result.push([...curr]);
    for (let i = start; i < nums.length; i++) {
      curr.push(nums[i]);
      bt(i + 1, curr);
      curr.pop();
    }
  }
  bt(0, []);
  return result;
}`,
    complexity: { time: "O(2^n) for subsets, O(n!) for permutations, O(n * 2^n) for subsets with copy", space: "O(n) recursion depth + O(answer size) for output", note: "Pruning can dramatically reduce actual runtime despite same theoretical complexity" },
    commonMistakes: [
      "Pushing current without copying: result.push(current) stores a reference that gets modified. Use result.push([...current])",
      "For subsets: using start index prevents duplicates. For permutations: use a visited set instead.",
      "For Subsets II (with duplicates): sort first, then skip nums[i] == nums[i-1] at same level (not in recursive call)",
      "Not pruning: always check constraints before recursing",
    ],
    sections: [
      {
        heading: "1. Subsets vs Permutations vs Combinations",
        body: `**Subsets** (order doesn't matter, no reuse):
- Include or skip each element
- Use start index to avoid reuse
- 2^n results total

**Permutations** (order matters, no reuse):
- Choose any unused element at each position
- Use a boolean visited array
- n! results total

**Combination Sum** (order doesn't matter, elements reusable):
- Same as subsets but pass i (not i+1) to allow reuse
- Prune when remaining target < 0

**Combination Sum II** (no reuse, has duplicates):
- Sort the array first
- Skip nums[i] == nums[i-1] AT THE SAME LEVEL (i > start)

\`\`\`
for i from start to n:
  if i > start && nums[i] == nums[i-1]: continue  // skip duplicate
  curr.push(nums[i])
  backtrack(i+1, curr)
  curr.pop()
\`\`\``
      },
      {
        heading: "2. N-Queens — constraint checking",
        body: `Place N queens on N×N board such that no two queens attack each other.

**Track three sets:** columns used, diagonals (row-col), anti-diagonals (row+col).

Queens on the same diagonal have the same (row-col) value.
Queens on the same anti-diagonal have the same (row+col) value.

\`\`\`
const cols = new Set(), diag = new Set(), antiDiag = new Set();
function backtrack(row):
  if row == n: add current board to results
  for col in range(n):
    if col in cols or (row-col) in diag or (row+col) in antiDiag: continue
    place queen: cols.add(col), diag.add(row-col), antiDiag.add(row+col)
    backtrack(row+1)
    remove queen: cols.delete(col), diag.delete(row-col), antiDiag.delete(row+col)
\`\`\`

Set lookup is O(1) vs O(n) for scanning previous queens. This is the key optimization.`
      },
    ],
  },

  greedy: {
    tldr: "Greedy: make the locally optimal choice at each step and never reconsider. Works only when local optimality guarantees global optimality — prove it or test with examples.",
    whenToUse: [
      "Interval scheduling (always sort by end time)",
      "Activity selection / non-overlapping intervals",
      "Minimize cost with choices (always pick cheapest valid option)",
      "Build optimal solution incrementally (Huffman coding, Kruskal's MST)",
    ],
    keyInsight: "Greedy vs DP: in DP, future choices can undo past ones. In greedy, you commit permanently. Greedy is correct when making the 'best looking' choice now never prevents a better global solution — this requires a proof by exchange argument.",
    template: `// Interval Scheduling — sort by end time
intervals.sort((a, b) => a[1] - b[1]); // sort by end
let count = 0, lastEnd = -Infinity;
for (const [start, end] of intervals) {
  if (start >= lastEnd) { // non-overlapping
    count++;
    lastEnd = end;
  }
}

// Jump Game
let farthest = 0;
for (let i = 0; i <= farthest && farthest < n - 1; i++) {
  farthest = Math.max(farthest, i + nums[i]);
}
return farthest >= n - 1;

// Gas Station
let total = 0, tank = 0, start = 0;
for (let i = 0; i < n; i++) {
  total += gas[i] - cost[i];
  tank += gas[i] - cost[i];
  if (tank < 0) { start = i + 1; tank = 0; }
}
return total >= 0 ? start : -1;`,
    complexity: { time: "Usually O(n log n) due to sorting + O(n) scan", space: "O(1) to O(n) depending on problem", note: "Greedy is faster than DP (O(n) vs O(n²)) when applicable — always check if greedy works first" },
    commonMistakes: [
      "Assuming greedy works without verification — always test with a counterexample",
      "Intervals: sorting by start vs end matters. Non-overlapping max: sort by end. Meeting rooms: sort by start.",
      "Jump Game II: tracking per-level max reach, not per-step",
      "Confusing greedy with DP: if you need to consider all possible past decisions, use DP",
    ],
    sections: [
      {
        heading: "1. Interval problems — always sort first",
        body: `**Pattern 1: Merge Overlapping Intervals**
Sort by start time. If current interval overlaps with previous (start ≤ prev.end), merge by extending prev.end.

**Pattern 2: Non-overlapping Intervals (max count)**
Sort by END time. Greedily select intervals that don't overlap with last selected.
Why end time? Selecting the earliest-ending interval leaves maximum room for future intervals — this is provable by exchange argument.

**Pattern 3: Minimum Meeting Rooms**
Sort by start time. Use a min-heap of end times. If current start ≥ heap.min(), reuse that room (pop and push new end). Else open new room.
At any point, heap size = rooms currently in use.

**Pattern 4: Insert Interval**
Three phases: add all intervals ending before new interval, merge all overlapping, add remaining.`
      },
      {
        heading: "2. Greedy vs DP — the decision framework",
        body: `**Ask yourself: Does the optimal choice ever depend on future choices?**

If NO → Greedy might work.
If YES → Need DP.

**Greedy works for:**
- Activity selection (earliest end time always safe)
- Huffman encoding (always merge two smallest frequencies)
- Kruskal's MST (always add cheapest non-cycle edge)

**Greedy fails for:**
- 0/1 Knapsack (taking the most valuable item might prevent fitting more items)
- Coin Change with non-canonical denominations
- Most path optimization problems with reconsiderable choices

**The exchange argument:** Assume greedy solution differs from optimal at some point. Show you can swap the optimal's choice for the greedy choice without making things worse. If you can always do this, greedy is optimal.`
      },
    ],
  },

  trie: {
    tldr: "Trie stores strings character by character. O(L) insert/search where L = string length. Perfect for prefix matching and word dictionaries.",
    whenToUse: [
      "Prefix search / autocomplete",
      "Word existence with wildcard characters",
      "Longest prefix of given word",
      "Maximum XOR of two numbers (binary trie)",
      "Count strings with a given prefix",
    ],
    keyInsight: "Each node represents a prefix. The path from root to a node spells out a string. Store 'isEndOfWord' flag at nodes where a complete word ends — this is what distinguishes a prefix from a complete word.",
    template: `// Trie Node
class TrieNode {
  constructor() {
    this.children = {}; // or new Array(26) for lowercase letters
    this.isEnd = false;
  }
}

class Trie {
  constructor() { this.root = new TrieNode(); }

  insert(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children[ch]) node.children[ch] = new TrieNode();
      node = node.children[ch];
    }
    node.isEnd = true;
  }

  search(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children[ch]) return false;
      node = node.children[ch];
    }
    return node.isEnd; // must be end of word
  }

  startsWith(prefix) {
    let node = this.root;
    for (const ch of prefix) {
      if (!node.children[ch]) return false;
      node = node.children[ch];
    }
    return true; // any path means prefix exists
  }
}`,
    complexity: { time: "O(L) per insert/search/prefix where L = word length", space: "O(ALPHABET_SIZE × N × L) worst case — each node has up to 26 children", note: "HashMap-based children uses less memory than fixed array when alphabet is sparse" },
    commonMistakes: [
      "Confusing search (must hit isEnd=true) with startsWith (just reach last char)",
      "For Word Search II: not pruning branches during backtracking (the whole point of using Trie)",
      "Binary Trie for XOR: insert numbers bit by bit from MSB to LSB, always choose opposite bit path",
      "Not deleting words properly — tricky with shared prefixes (need reference counting)",
    ],
    sections: [
      {
        heading: "1. When to use Trie vs HashMap",
        body: `**HashMap** stores complete strings: O(L) lookup, O(L) insert, O(N×L) space.
**Trie** stores strings character by character: O(L) lookup, O(L) insert, but shares prefixes.

**Use Trie when:**
- You need prefix queries (does any stored word start with 'pre-'?)
- You need lexicographic ordering
- You have many strings sharing prefixes (saves space)
- You need wildcard matching with DFS

**Use HashMap when:**
- You only need exact string lookups
- Simplicity matters more than prefix operations

**Word Search II (find all words in grid):**
Naively: for each word, do DFS on grid = O(words × 4^L) = too slow.
With Trie: Build trie of all words. DFS on grid, traverse trie simultaneously. Prune when current path has no matching prefix. O(4^L × unique_prefix_count).`
      },
      {
        heading: "2. Binary Trie — Maximum XOR",
        body: `XOR of two numbers is maximized when bits differ as much as possible.

**Binary Trie:** Store numbers bit by bit from MSB (bit 31) to LSB (bit 0).

**Insert:** For each bit of number, go to child '1' if bit is 1, else child '0'.

**Query (max XOR with x):**
For each bit of x from MSB to LSB:
- Try to go to the OPPOSITE bit child (this maximizes XOR at this bit)
- If opposite child doesn't exist, go to same bit child
- Accumulate XOR result

Time: O(32) per query = O(1) per query after O(32×n) build.

This is much faster than O(n) pairwise comparison for Maximum XOR problem.`
      },
    ],
  },

  bitwise: {
    tldr: "Bit manipulation enables O(1) solutions to problems that look hard. XOR self-cancels, n&(n-1) clears lowest set bit, n&(-n) isolates lowest set bit.",
    whenToUse: [
      "Find single/unique element in pairs → XOR",
      "Subset enumeration → iterate 0 to 2^n - 1",
      "Check power of 2 → n & (n-1) == 0",
      "Multiply/divide by power of 2 → bit shifts",
      "Count set bits → Brian Kernighan's algorithm",
    ],
    keyInsight: "XOR is the most useful bit operation: a⊕a=0 (self-cancels), a⊕0=a (identity), it's commutative and associative. These properties make it perfect for finding unique elements in arrays of pairs.",
    template: `// XOR tricks
const single = nums.reduce((acc, n) => acc ^ n, 0); // find single number

// Count set bits (Brian Kernighan)
function countBits(n) {
  let count = 0;
  while (n) { n &= n - 1; count++; } // n & (n-1) clears lowest set bit
  return count;
}

// Check if power of 2
const isPow2 = n > 0 && (n & (n-1)) === 0;

// Get bit at position i
const bit = (n >> i) & 1;

// Set bit at position i
const withBit = n | (1 << i);

// Clear bit at position i
const cleared = n & ~(1 << i);

// Enumerate all subsets via bitmask
for (let mask = 0; mask < (1 << n); mask++) {
  const subset = [];
  for (let i = 0; i < n; i++) {
    if (mask & (1 << i)) subset.push(arr[i]);
  }
}`,
    complexity: { time: "All bit operations are O(1). Bitmask enumeration of all subsets: O(2^n * n)", space: "O(1) for bit tricks", note: "Integer is 32 bits in most languages — bit tricks apply to integers up to 2^31" },
    commonMistakes: [
      "Operator precedence: (n & 1) === 0, not n & 1 === 0 (comparison binds tighter than &)",
      "Signed vs unsigned right shift: >> vs >>> in JavaScript. Use >>> for unsigned.",
      "For Sum of Two Integers without +: need to handle negative numbers with mask = 0xFFFFFFFF",
      "Counting bits naively with % is O(log n) — Brian Kernighan's is O(set bit count)",
    ],
    sections: [
      {
        heading: "1. XOR properties — the magic trick",
        body: `**Properties:**
- a ⊕ 0 = a (identity)
- a ⊕ a = 0 (self-inverse)
- Commutative: a ⊕ b = b ⊕ a
- Associative: (a ⊕ b) ⊕ c = a ⊕ (b ⊕ c)

**Single Number:** XOR all elements. Pairs cancel out, single remains.
\`result = nums.reduce((acc, n) => acc ^ n, 0)\`

**Missing Number (0 to n):** XOR all numbers 0..n with all array elements. All pairs cancel, missing number remains.

**Single Number III (two singles):** XOR all to get x = a⊕b (both singles). x ≠ 0, so at least one bit differs. Find any set bit in x (use x & -x for lowest). Split numbers by that bit — each group contains one of the singles. XOR each group separately.

**Find two missing numbers:** Similar approach using bit partition.`
      },
      {
        heading: "2. Bitmask DP — TSP and subset problems",
        body: `Bitmask DP represents the "set of items chosen" as an integer. Bit i = 1 means item i is in the set.

**Enumerate all subsets:** Loop mask from 0 to (1<<n)-1. O(2^n).

**Enumerate subsets of a given mask:** O(2^k) where k = number of set bits.
\`\`\`
for (let sub = mask; sub > 0; sub = (sub - 1) & mask) {
  // process subset sub
}
\`\`\`

**Classic: Count subsets with equal sum**
dp[mask] = is this subset achievable?
Use bit masking to represent which elements are included.

**Traveling Salesman (TSP):**
dp[mask][i] = minimum cost to visit all cities in mask, ending at city i.
States: 2^n × n. Transition: O(n). Total: O(n² × 2^n).
Feasible for n ≤ 20.`
      },
    ],
  },

  strings: {
    tldr: "String problems combine array techniques (two pointers, sliding window) with character-level operations. Know: anagram detection, palindrome check, KMP for pattern matching.",
    whenToUse: [
      "Anagram / permutation check → frequency map or sorted key",
      "Palindrome → two pointers from ends or expand from center",
      "Substring search → KMP (O(n+m)) or sliding window with hashmap",
      "Parse/evaluate expressions → stack",
    ],
    keyInsight: "Most string problems are disguised array problems. Treat each character as an element. The main extras: sorted order by char (for anagram key), ASCII arithmetic (ch - 'a'), and character frequency arrays (size 26).",
    template: `// Anagram check
function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const freq = new Array(26).fill(0);
  for (const ch of s) freq[ch.charCodeAt(0) - 97]++;
  for (const ch of t) {
    freq[ch.charCodeAt(0) - 97]--;
    if (freq[ch.charCodeAt(0) - 97] < 0) return false;
  }
  return true;
}

// Expand around center for palindrome
function longestPalindrome(s) {
  let start = 0, maxLen = 0;
  for (let i = 0; i < s.length; i++) {
    for (const [l, r] of [[i,i],[i,i+1]]) { // odd and even
      let lo = l, hi = r;
      while (lo >= 0 && hi < s.length && s[lo] === s[hi]) { lo--; hi++; }
      if (hi - lo - 1 > maxLen) { maxLen = hi - lo - 1; start = lo + 1; }
    }
  }
  return s.slice(start, start + maxLen);
}`,
    complexity: { time: "O(n) for most single-pass string ops; O(n²) for naive palindrome; O(n+m) for KMP", space: "O(1) with char frequency array[26]; O(k) for HashMap with k distinct chars", note: "Sorting a string for anagram key: O(L log L) per string. Frequency array key: O(26) = O(1) effectively" },
    commonMistakes: [
      "Using string concatenation in a loop: O(n²) in most languages. Use array + join.",
      "Not accounting for uppercase/lowercase/non-alphanumeric in palindrome problems",
      "KMP failure function: off-by-one errors are common — use the standard template",
      "Multi-line string parsing: check for \\r\\n vs \\n line endings",
    ],
    sections: [
      {
        heading: "1. Pattern Matching — when to use KMP",
        body: `Naive pattern matching is O(nm). KMP (Knuth-Morris-Pratt) is O(n+m).

**KMP idea:** Use a failure function (also called LPS — Longest Proper Prefix which is also Suffix) to avoid re-scanning characters we already know match.

**Failure function:** lps[i] = length of longest proper prefix of pattern[0..i] that is also a suffix.
Pattern "AAACAAAA": lps = [0,1,2,0,1,2,3,3]

**Search:**
When mismatch at position j in pattern, don't reset to j=0. Set j = lps[j-1].
This skips the part that we know matches.

**In interviews:** KMP is rarely expected for coding problems — sliding window + hashmap is usually sufficient. Know KMP for system design or if asked about efficient string search.

**Z-algorithm:** Alternative to KMP. z[i] = length of longest substring starting at i that matches a prefix. Also O(n+m).`
      },
    ],
  },

  math: {
    tldr: "Number theory patterns: Sieve of Eratosthenes for primes, Euclidean for GCD, fast exponentiation for large powers, and modular arithmetic.",
    whenToUse: [
      "Count/find primes → Sieve of Eratosthenes",
      "GCD/LCM → Euclidean algorithm",
      "Large powers → fast exponentiation (repeated squaring)",
      "Digit manipulation → % 10 for last digit, / 10 to remove last digit",
    ],
    keyInsight: "Math problems are about recognizing which mathematical property applies. The Sieve is O(n log log n). Fast exponentiation is O(log n). Most math optimizations reduce O(n) problems to O(log n) or O(sqrt(n)).",
    template: `// Sieve of Eratosthenes — all primes up to n
function sieve(n) {
  const isPrime = new Array(n + 1).fill(true);
  isPrime[0] = isPrime[1] = false;
  for (let i = 2; i * i <= n; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= n; j += i) isPrime[j] = false;
    }
  }
  return isPrime;
}

// GCD (Euclidean)
function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
function lcm(a, b) { return a / gcd(a, b) * b; }

// Fast Exponentiation
function pow(base, exp, mod) {
  let result = 1;
  base %= mod;
  while (exp > 0) {
    if (exp & 1) result = result * base % mod;
    base = base * base % mod;
    exp >>= 1;
  }
  return result;
}

// Count digits
function digitSum(n) {
  let sum = 0;
  while (n > 0) { sum += n % 10; n = Math.floor(n / 10); }
  return sum;
}`,
    complexity: { time: "Sieve: O(n log log n). GCD: O(log min(a,b)). Fast exp: O(log n).", space: "Sieve: O(n). Others: O(1) iterative, O(log n) recursive", note: "Sieve starts marking at i*i (not 2*i) because smaller multiples already marked by smaller primes" },
    commonMistakes: [
      "Integer overflow in multiplication before modulo — compute a*b%mod as (a%mod)*(b%mod)%mod",
      "Factorial trailing zeroes: count pairs of (2,5). Since 2s are abundant, just count 5s in prime factorization: n/5 + n/25 + n/125...",
      "GCD with 0: gcd(a,0) = a. Always handle the base case.",
      "Pow(x,n) with negative n: compute 1/pow(x,-n)",
    ],
    sections: [
      {
        heading: "1. Number Theory Essentials",
        body: `**Prime Factorization:** Every integer > 1 has unique prime factorization. To factorize n: trial division up to sqrt(n).
\`\`\`
const factors = [];
for (let d = 2; d*d <= n; d++) {
  while (n % d === 0) { factors.push(d); n /= d; }
}
if (n > 1) factors.push(n); // remaining prime factor
\`\`\`

**GCD applications:**
- Simplify fractions: divide numerator and denominator by GCD.
- LCM(a,b) = a*b / GCD(a,b). Use this to avoid overflow: a / gcd(a,b) * b.

**Modular Arithmetic:**
- (a + b) % m = ((a % m) + (b % m)) % m
- (a * b) % m = ((a % m) * (b % m)) % m
- Subtraction: (a - b) % m = ((a % m) - (b % m) + m) % m (add m to handle negative)
- Division requires modular inverse (only when m is prime): a/b % m = a * b^(m-2) % m (Fermat's little theorem)

**Trailing zeros in n!:** Count factors of 5 (since 2s are more abundant).
\`n/5 + n/25 + n/125 + ...\` (integer division each time)`
      },
    ],
  },

  intervals: {
    tldr: "Sort intervals by start time, then use greedy or heap-based approaches. The key insight: sorting converts a 2D problem into a 1D scan.",
    whenToUse: [
      "Merge overlapping intervals → sort by start, extend end",
      "Find minimum rooms needed → sort by start, min-heap of end times",
      "Maximum non-overlapping → sort by end, greedy selection",
      "Insert a new interval → three-phase linear scan",
    ],
    keyInsight: "After sorting by start time, you only ever need to compare the current interval's start against the previous interval's end. This reduces O(n²) comparison to O(n) scan.",
    template: `// Merge Intervals
intervals.sort((a, b) => a[0] - b[0]);
const merged = [intervals[0]];
for (const [start, end] of intervals.slice(1)) {
  if (start <= merged[merged.length-1][1]) {
    merged[merged.length-1][1] = Math.max(merged[merged.length-1][1], end);
  } else {
    merged.push([start, end]);
  }
}

// Meeting Rooms II — minimum number of rooms
starts.sort((a,b) => a-b); ends.sort((a,b) => a-b);
let rooms = 0, j = 0;
for (let i = 0; i < n; i++) {
  if (starts[i] < ends[j]) rooms++;  // need new room
  else j++;                           // reuse a room (meeting ended)
}
return rooms;`,
    complexity: { time: "O(n log n) for sorting + O(n) for scan", space: "O(n) for output, O(1) extra if in-place sort", note: "The sorted start/end arrays trick for Meeting Rooms II is O(n log n) space but very clean" },
    commonMistakes: [
      "Using >= vs > when checking overlap: [1,3] and [3,5] are they overlapping? Depends on problem (usually yes: start ≤ prevEnd)",
      "Forgetting to handle the remaining stack/heap after main loop for some interval problems",
      "Insert Interval: don't forget the case where new interval doesn't overlap anything",
    ],
    sections: [
      {
        heading: "1. The four interval problem types",
        body: `**Type 1: Merge**
Goal: combine all overlapping intervals.
Sort by start. Extend current interval's end if next overlaps.

**Type 2: Non-overlapping (maximum non-overlapping count)**
Goal: select maximum number of non-overlapping intervals.
Sort by END time (not start!). Greedily select earliest-ending non-overlapping intervals.
Minimum removals = n - max non-overlapping.

**Type 3: Meeting Rooms (minimum resources)**
Goal: minimum conference rooms (or workers, machines, etc.)
Sort by start. Use min-heap of end times. 
Heap size at any moment = resources currently in use.

**Type 4: Insert**
Given sorted non-overlapping intervals + new interval:
Phase 1: add all intervals ending before new interval starts.
Phase 2: merge all overlapping intervals with new interval (extend new interval's end).
Phase 3: add remaining intervals.`
      },
    ],
  },
};
