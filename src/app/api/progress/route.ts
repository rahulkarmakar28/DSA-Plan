// src/app/api/progress/route.ts

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/progress?topic=arrays
export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const topic = searchParams.get("topic");

  const where: any = {
    userId: session.user.id,
    solved: true,
  };

  // ✅ FIX: filter using tags
  if (topic) {
    where.problem = {
      tags: {
        has: topic, // 🔥 Mongo + Prisma array filter
      },
    };
  }

  const progress = await prisma.userProgress.findMany({
    where,
    include: {
      problem: {
        select: {
          id: true,
          tags: true,        // ✅ instead of topicKey
          difficulty: true,  // optional but useful
        },
      },
    },
  });

  return NextResponse.json(
    progress.map((p) => ({
      problemId: p.problemId,
      topic: p.problem.tags[0], // ✅ main topic
      solvedAt: p.solvedAt,
    }))
  );
}

// POST /api/progress
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { problemId, solved } = await req.json();

  if (!problemId) {
    return NextResponse.json({ error: "problemId required" }, { status: 400 });
  }

  const result = await prisma.userProgress.upsert({
    where: {
      userId_problemId: {
        userId: session.user.id,
        problemId,
      },
    },
    update: {
      solved,
      solvedAt: solved ? new Date() : null,
    },
    create: {
      userId: session.user.id,
      problemId,
      solved,
      solvedAt: solved ? new Date() : null,
    },
  });

  // 🔥 FIX: daily activity (string date)
  if (solved) {
    const today = new Date().toISOString().split("T")[0];

    await prisma.dailyActivity.upsert({
      where: {
        userId_date: {
          userId: session.user.id,
          date: today,
        },
      },
      update: {
        count: { increment: 1 },
      },
      create: {
        userId: session.user.id,
        date: today,
        count: 1,
      },
    });
  }

  return NextResponse.json(result);
}