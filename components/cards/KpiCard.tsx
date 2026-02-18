import { GlassCard } from "@/components/cards/GlassCard";

export const KpiCard = ({ title, value, subtitle }: { title: string; value: string | number; subtitle?: string }) => (
  <GlassCard>
    <p className="text-xs uppercase tracking-wider text-slate-400">{title}</p>
    <p className="mt-2 text-3xl font-semibold text-neon">{value}</p>
    {subtitle ? <p className="mt-1 text-xs text-slate-400">{subtitle}</p> : null}
  </GlassCard>
);
