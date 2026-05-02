// src/app/topics/layout.tsx
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Providers from "@/components/layout/Providers";
import AppShell from "@/components/layout/AppShell";

export default async function TopicsLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  return (
    <Providers>
      <AppShell>{children}</AppShell>
    </Providers>
  );
}
