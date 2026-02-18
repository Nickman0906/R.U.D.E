import { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export const Badge = ({ children, className }: { children: ReactNode; className?: string }) => (
  <span className={cn("rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-xs", className)}>
    {children}
  </span>
);
