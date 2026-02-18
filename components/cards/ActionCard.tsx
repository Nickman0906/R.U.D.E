import { Action } from "@/lib/jarvis/types";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/cards/GlassCard";

export const ActionCard = ({ action, onApply }: { action: Action; onApply: (action: Action) => void }) => (
  <GlassCard className="space-y-2">
    <p className="text-sm font-semibold text-neon">Sugestão: {action.kind}</p>
    <pre className="overflow-auto rounded-xl bg-slate-950/50 p-2 text-xs text-slate-300">{JSON.stringify(action.payload, null, 2)}</pre>
    <Button onClick={() => onApply(action)} className="w-full">Aplicar</Button>
  </GlassCard>
);
