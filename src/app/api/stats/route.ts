// src/app/api/stats/route.ts

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const uid = session.user.id;

  const start = new Date(Date.now() - 84 * 86400000)
    .toISOString()
    .split("T")[0];

  // 🔥 parallel queries (fixed)
  const [totalSolved, activity, testSessions, solvedProblems] =
    await Promise.all([
      prisma.userProgress.count({
        where: { userId: uid, solved: true },
      }),

      prisma.dailyActivity.findMany({
        where: { userId: uid, date: { gte: start } },
        orderBy: { date: "asc" },
      }),

      prisma.testSession.findMany({
        where: { userId: uid },
        orderBy: { completedAt: "desc" },
        take: 5,
      }),

      prisma.userProgress.findMany({
        where: { userId: uid, solved: true },
        include: {
          problem: {
            select: {
              tags: true,
              difficulty: true,
            },
          },
        },
      }),
    ]);

  // 🔥 topic + difficulty aggregation
  const topicMap: Record<
    string,
    { easy: number; medium: number; hard: number; total: number }
  > = {};

  const difficultyCount = {
    easy: 0,
    medium: 0,
    hard: 0,
  };

  for (const item of solvedProblems) {
    const topic = item.problem.tags[0];
    const d = item.problem.difficulty as "easy" | "medium" | "hard";

    // topic stats
    if (!topicMap[topic]) {
      topicMap[topic] = {
        easy: 0,
        medium: 0,
        hard: 0,
        total: 0,
      };
    }

    topicMap[topic][d]++;
    topicMap[topic].total++;

    // global difficulty stats
    difficultyCount[d]++;
  }

  // 🔥 streak calc (FIXED properly)
  const actSet = new Set(activity.map((a) => a.date));

  let streak = 0;
  const today = new Date();

  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);

    const ds = d.toISOString().split("T")[0];

    if (actSet.has(ds)) streak++;
    else break;
  }

  return NextResponse.json({
    totalSolved,
    topicMap,
    difficultyCount,
    activity,
    streak,
    recentTests: testSessions,
  });
}