"use client";

import { FinanceForm } from "@/components/forms/FinanceForm";
import { GlassCard } from "@/components/cards/GlassCard";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store/useAppStore";
import { formatCurrency } from "@/lib/utils/currency";

export default function FinancePage() {
  const { finances, deleteFinance } = useAppStore();
  const balance = finances.reduce((acc, item) => acc + (item.type === "income" ? item.amount : -item.amount), 0);

  return (
    <div className="space-y-4">
      <GlassCard><FinanceForm /></GlassCard>
      <GlassCard>
        <p className="mb-2 text-sm text-slate-300">Saldo do mês: <span className="text-neon">{formatCurrency(balance)}</span></p>
        <div className="space-y-2">
          {finances.map((entry) => (
            <div key={entry.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/40 p-3">
              <p>{entry.category} • {entry.type} • {formatCurrency(entry.amount)}</p>
              <Button variant="ghost" onClick={() => deleteFinance(entry.id)}>Excluir</Button>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
