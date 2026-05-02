# DSA Tracker 🚀

A full-stack web application to track your **Data Structures & Algorithms** preparation for top product-based companies — Google, Amazon, Microsoft, Flipkart, Swiggy, Adobe, Paytm, PhonePe, and more.

Built with **Next.js 15**, **PostgreSQL**, **Prisma ORM**, and **NextAuth.js v5**.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **User Accounts** | Email/password signup & login — each user's data is completely isolated |
| 📊 **Dashboard** | Live stats: problems solved, streak, topic progress bars, GitHub-style heatmap |
| 📝 **290+ Problems** | LeetCode-linked problems across 15 topics, sorted easy → hard |
| ✅ **Progress Tracking** | Per-user checkbox — mark solved, unmark, filter by difficulty/status |
| 🗒️ **Per-Problem Notes** | Write your approach, complexity, and insights — saved to PostgreSQL per user |
| 🌙 **Dark / Light Mode** | Toggle from sidebar — saved in DB + localStorage, zero flash on load |
| 📅 **12-Week Study Plan** | Daily + weekly structured tasks for placement prep |
| ⏱️ **Timed Tests** | Topic tests + full FAANG mock with live countdown, results saved to DB |
| 📚 **Resources Per Topic** | Curated videos, articles, and concept checklists per topic |
| 🔥 **Activity Heatmap** | Daily solving activity tracked and visualized |

---

## 🛠️ Tech Stack

```
Frontend    Next.js 15 (App Router) · TypeScript · Pure CSS Variables
Backend     Next.js API Routes (serverless-ready)
Database    PostgreSQL (any provider)
ORM         Prisma 5
Auth        NextAuth.js v5 · JWT sessions · bcryptjs passwords
Deploy      Vercel / Railway / Docker
```

---

## 📁 Project Structure

```
dsa-tracker/
├── prisma/
│   ├── schema.prisma          # DB models: User, Problem, Progress, Note, Test, Activity
│   └── seed.ts                # Seeds 290+ LeetCode problems across 15 topics
│
├── src/
│   ├── app/
│   │   ├── (auth)/login/      # Login + Register page (CSS Modules)
│   │   ├── api/
│   │   │   ├── auth/          # [...nextauth] handler + /register endpoint
│   │   │   ├── problems/      # GET problems by topic
│   │   │   ├── progress/      # GET/POST solved status per user
│   │   │   ├── notes/         # GET/POST/DELETE per-problem notes
│   │   │   ├── stats/         # Dashboard aggregated stats + heatmap data
│   │   │   ├── tests/         # GET/POST timed test session results
│   │   │   └── user/          # GET/PATCH user prefs (theme)
│   │   ├── dashboard/         # Main dashboard — stats + heatmap + topic grid
│   │   ├── topics/[topicKey]/ # Per-topic: Problems table · Concepts · Resources
│   │   ├── plan/              # 12-week plan with daily task breakdown
│   │   ├── tests/             # Timed test runner with live countdown timer
│   │   ├── resources/         # Resource hub grouped by topic and company
│   │   ├── globals.css        # CSS custom properties + dark/light mode
│   │   ├── layout.tsx         # Root layout with theme-init inline script
│   │   └── page.tsx           # Root → redirect to /dashboard or /login
│   │
│   ├── components/
│   │   └── layout/
│   │       ├── AppShell.tsx   # Collapsible sidebar + main layout
│   │       └── Providers.tsx  # NextAuth SessionProvider
│   │
│   └── lib/
│       ├── auth.ts            # NextAuth config (Credentials provider, JWT)
│       ├── prisma.ts          # PrismaClient singleton (dev hot-reload safe)
│       └── data.ts            # Single source: all problems, topic meta,
│                              # resources, concepts, 12-week plan
│
├── .env.example               # Environment variable template
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+**
- **PostgreSQL** database — local or any cloud provider

---

### Step 1 — Install dependencies

```bash
cd dsa-tracker
npm install
```

---

### Step 2 — Configure environment

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in:

```env
# PostgreSQL connection string
DATABASE_URL="postgresql://postgres:password@localhost:5432/dsa_tracker"

# Generate with: openssl rand -base64 32
NEXTAUTH_SECRET="paste-your-generated-secret-here"

# Local development
NEXTAUTH_URL="http://localhost:3000"
```

#### Free Cloud Database Options

| Provider | Free Tier | Notes |
|---|---|---|
| **Neon** ⭐ | 512 MB | Best DX, instant branches |
| **Supabase** | 500 MB | Also gives you a dashboard |
| **Railway** | $5 credit | Easy one-click Postgres |
| **Aiven** | 1 service | Production-grade |

For Neon, your `DATABASE_URL` will look like:
```
postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require
```

---

### Step 3 — Set up the database

```bash
# Create all tables from schema
npm run db:push

# Seed 290+ problems (run once)
npm run db:seed
```

---

### Step 4 — Run the app

```bash
npm run dev
```

Visit **http://localhost:3000** → redirects to login → **Sign up** → Start tracking!

---

## 🗄️ Database Schema

```
User
  id · name · email · password (bcrypt) · theme · createdAt

Problem
  id · topicKey · number · title · difficulty · pattern · lcUrl
  ─ unique: [topicKey, number]

UserProgress
  userId · problemId · solved · solvedAt
  ─ unique: [userId, problemId]

UserNote
  userId · problemId · content
  ─ unique: [userId, problemId]

TestSession
  userId · testName · testType · topicKey
  durationMin · timeUsedSec · score · totalQ · completedAt

DailyActivity
  userId · date · count
  ─ unique: [userId, date]
```

---

## 📚 Topics Covered

| # | Topic | Problems | Patterns Covered |
|---|---|---|---|
| 1 | Arrays & Strings | 20 | Prefix sum, Kadane's, Matrix ops |
| 2 | Hashing | 10 | HashMap, HashSet, LRU |
| 3 | Two Pointers | 10 | Opposite ends, Dutch Flag, 3Sum |
| 4 | Sliding Window | 11 | Fixed, Variable, Monotonic Deque |
| 5 | Stack & Queue | 12 | Monotonic stack, NGE, Histogram |
| 6 | Linked List | 13 | Floyd's, Slow-Fast, Dummy head |
| 7 | Trees | 16 | DFS, BFS, BST, LCA, Serialize |
| 8 | Graphs | 17 | Union-Find, Topo Sort, Dijkstra |
| 9 | Dynamic Programming | 20 | 1D, 2D, Knapsack, LCS, LIS, Interval |
| 10 | Binary Search | 12 | Classic, Answer space, 2D matrix |
| 11 | Heap / Priority Queue | 11 | Top-K, Merge K, Two Heaps |
| 12 | Backtracking | 11 | Subsets, Perms, N-Queens, Pruning |
| 13 | Greedy | 10 | Intervals, Jump Game, Scheduling |
| 14 | Trie | 8 | Prefix, Wildcard, XOR Trie |
| 15 | Bit Manipulation | 10 | XOR tricks, Bitmask, Brian Kernighan |

---

## 📅 12-Week Study Plan

| Week | Focus | Daily Target |
|---|---|---|
| 1 | Arrays & Strings | 3–4 problems/day |
| 2 | Hashing + Two Pointers | 3–4 problems/day |
| 3 | Sliding Window + Binary Search | 3–4 problems/day |
| 4 | Stack + Linked List | 3–4 problems/day |
| 5 | Trees — DFS & BFS | 3–4 problems/day |
| 6 | Trees Advanced + Heap | 3–4 problems/day |
| 7 | Graphs | 3–4 problems/day |
| 8 | Backtracking + Greedy | 3–4 problems/day |
| 9 | Dynamic Programming — 1D & 2D | 3–4 problems/day |
| 10 | DP Advanced — Knapsack & LIS | 3–4 problems/day |
| 11 | Trie + Bit Manipulation | 3–4 problems/day |
| 12 | Full Revision + Mock Interviews | 4–5 problems/day + 2 mocks |

Each Sunday = test day. Results saved to your account.

---

## ⏱️ Timed Tests

| Test | Duration | Difficulty |
|---|---|---|
| Topic Test — Arrays & Hashing | 60 min | Easy–Medium |
| Topic Test — Two Pointers + Sliding Window | 60 min | Medium |
| Topic Test — Trees BFS/DFS | 75 min | Medium |
| Topic Test — Dynamic Programming | 75 min | Medium–Hard |
| Topic Test — Graphs | 75 min | Medium–Hard |
| Weekly Mock — Mixed Topics | 90 min | Mixed |
| FAANG Full Simulation | 120 min | Hard |

---

## 🌙 Dark / Light Mode

- Toggle via 🌙/☀️ button in the sidebar footer
- Saved to PostgreSQL (`user.theme`) and `localStorage`
- Applied via inline `<script>` in `<head>` — **zero FOUC** (flash of unstyled content)
- Full CSS custom property system — every color is a variable

---

## 🚢 Deployment

### Vercel (Recommended — free tier)

```bash
# 1. Push to GitHub
git init && git add . && git commit -m "init"
git remote add origin https://github.com/yourname/dsa-tracker.git
git push -u origin main

# 2. Import project on vercel.com
# 3. Add environment variables:
#    DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL

# 4. After first deploy, seed the database:
npx tsx prisma/seed.ts
```

### Docker

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate && npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

```bash
docker build -t dsa-tracker .
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://..." \
  -e NEXTAUTH_SECRET="..." \
  -e NEXTAUTH_URL="http://localhost:3000" \
  dsa-tracker
```

---

## 🧰 Scripts Reference

```bash
npm run dev           # Start dev server with hot reload
npm run build         # Production build (also runs prisma generate)
npm run start         # Start production server

npm run db:push       # Apply schema changes to DB (no migration files — good for prototyping)
npm run db:migrate    # Create versioned migration files (use for production)
npm run db:studio     # Open Prisma Studio — visual database browser at :5555
npm run db:seed       # Seed all 290+ problems (idempotent — safe to run multiple times)
```

---

## 🔒 Security

- Passwords hashed with **bcryptjs** at 12 salt rounds
- Sessions via **JWT** — stateless, no session table needed
- Every API route validates session before touching the database
- `NEXTAUTH_SECRET` signs and encrypts all JWT tokens
- No sensitive data in client-side state or localStorage

---

## 🤝 Contributing

```bash
git checkout -b feat/your-feature
# make changes
git commit -m "feat: describe your change"
git push origin feat/your-feature
# open a Pull Request on GitHub
```

---

## 📄 License

MIT — free to use, modify, and deploy for personal or commercial projects.

---

## 🎯 Target Companies

**Google · Amazon · Microsoft · Adobe · Flipkart · Swiggy · Zomato · Uber · Paytm · PhonePe · Dream11 · Atlassian · Meesho · CRED · Razorpay · Dunzo · Groww · Zepto**

---

## 💡 How to Get the Most Out of This

1. **Follow the 12-week plan in order** — skipping topics creates knowledge gaps
2. **Do timed practice from week 3 onwards** — speed matters in real interviews
3. **Write a note for every problem you solve** — your own words stick far better
4. **Struggle first, hint second** — spend at least 20 minutes before looking up
5. **Review your wrong approaches** — note why they failed, not just what worked
6. **Maintain the daily streak** — 1 problem/day beats cramming on weekends
7. **Do 2–3 mock contests per month** — LeetCode Contests, Codeforces Div 2

---

*Good luck on your placement journey! Consistency is the only strategy that works. 🚀*
