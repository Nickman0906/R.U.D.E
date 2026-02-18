"use client";

import { ReactNode, useEffect } from "react";
import { motion } from "framer-motion";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { GridBackground } from "@/components/hud/GridBackground";
import { Glow } from "@/components/hud/Glow";
import { useAppStore } from "@/lib/store/useAppStore";

export const Shell = ({ children }: { children: ReactNode }) => {
  const hydrate = useAppStore((s) => s.hydrate);
  useEffect(() => hydrate(), [hydrate]);

  return (
    <div className="relative min-h-screen p-4">
      <GridBackground />
      <Glow />
      <div className="relative z-10 grid min-h-[calc(100vh-2rem)] grid-cols-1 gap-4 lg:grid-cols-[260px_1fr]">
        <Sidebar />
        <div className="space-y-4">
          <Topbar />
          <motion.main initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            {children}
          </motion.main>
        </div>
      </div>
    </div>
  );
};
