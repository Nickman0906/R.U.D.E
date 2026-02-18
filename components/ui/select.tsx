import { SelectHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

export const Select = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement>
>(({ className, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "w-full rounded-2xl border border-white/15 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-neon/60 focus:ring-2 focus:ring-neon/30",
      className
    )}
    {...props}
  />
));

Select.displayName = "Select";
