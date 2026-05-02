// src/app/api/notes/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// POST /api/notes
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { problemId, content } = await req.json();

  if (!problemId) {
    return NextResponse.json({ error: "problemId required" }, { status: 400 });
  }

  if (typeof content !== "string") {
    return NextResponse.json({ error: "content must be string" }, { status: 400 });
  }

  if (content.length > 5000) {
    return NextResponse.json({ error: "content too long" }, { status: 400 });
  }

  try {
    const note = await prisma.userNote.upsert({
      where: {
        userId_problemId: {
          userId: session.user.id,
          problemId,
        },
      },
      update: { content },
      create: {
        userId: session.user.id,
        problemId,
        content,
      },
    });

    return NextResponse.json(note);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
