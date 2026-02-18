import { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export const GlassCard = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <section className={cn("glass rounded-2xl p-4", className)}>{children}</section>
);
