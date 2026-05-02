// src/app/api/problems/route.ts

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const topic = searchParams.get("topic");

  const where: any = {};

  // ✅ FIX: use tags instead of topicKey
  if (topic) {
    where.tags = {
      has: topic,
    };
  }

  const problems = await prisma.problem.findMany({
    where,
    orderBy: { createdAt: "asc" }, // ✅ FIX
  });

  return NextResponse.json(problems);
}