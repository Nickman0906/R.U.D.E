import type { Metadata } from "next";
import "./globals.css";
import { Shell } from "@/components/layout/Shell";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "JARVIS",
  description: "MVP estrutural de produtividade com HUD futurista"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Shell>{children}</Shell>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
