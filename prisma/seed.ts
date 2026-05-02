import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import { PROBLEMS } from "../src/lib/problems";

async function main() {
  console.log("🌱 Seeding started...");

  const map = new Map<string, any>();

  for (const [topic, problems] of Object.entries(PROBLEMS)) {
    for (const p of problems) {
      const key = p.title;

      if (!map.has(key)) {
        map.set(key, {
          title: p.title,
          difficulty: p.difficulty,
          lcUrl: p.lcUrl,
          tags: [topic, p.pattern],
        });
      } else {
        // 🔥 merge tags if duplicate problem
        const existing = map.get(key);
        existing.tags = Array.from(
          new Set([...existing.tags, topic, p.pattern])
        );
      }
    }
  }

  const data = Array.from(map.values());

  await prisma.problem.deleteMany();

  await prisma.problem.createMany({
    data,
  });

  console.log(`✅ Inserted ${data.length} unique problems`);
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });