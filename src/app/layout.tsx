import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "DSA Tracker — FAANG Prep",
  description: "Full-stack DSA preparation tracker for top product companies",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{const t=localStorage.getItem('dsa-theme')||'light';document.documentElement.setAttribute('data-theme',t)}catch(e){}` }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
