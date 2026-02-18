import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

type Variant = "default" | "ghost" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variants: Record<Variant, string> = {
  default: "bg-neon/20 text-neon border border-neon/40 hover:bg-neon/30",
  ghost: "hover:bg-white/10",
  outline: "border border-white/20 hover:border-neon/40"
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon",
        variants[variant],
        className
      )}
      {...props}
    />
  )
);

Button.displayName = "Button";
