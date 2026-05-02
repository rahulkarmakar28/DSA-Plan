// src/app/api/tests/route.ts

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);

  const testType = searchParams.get("type"); // optional filter

  const where: any = {
    userId: session.user.id,
  };

  if (testType) {
    where.testType = testType;
  }

  const tests = await prisma.testSession.findMany({
    where,
    orderBy: { completedAt: "desc" },
    take: 20,
  });

  return NextResponse.json(tests);
}