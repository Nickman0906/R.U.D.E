"use client";

import { KpiCard } from "@/components/cards/KpiCard";
import { GlassCard } from "@/components/cards/GlassCard";
import { useAppStore } from "@/lib/store/useAppStore";
import { formatCurrency } from "@/lib/utils/currency";
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const colors = ["#5be7ff", "#8b5cf6", "#34d399", "#fb7185"];

export default function DashboardPage() {
  const { tasks, events, habits, finances } = useAppStore();
  const pending = tasks.filter((t) => t.status === "todo").length;
  const done = tasks.length - pending;
  const monthBalance = finances.reduce((acc, item) => acc + (item.type === "income" ? item.amount : -item.amount), 0);
  const habitData = habits.map((h) => ({ name: h.name.slice(0, 8), value: Math.round(h.consistency * 100) }));
  const byCategory = Object.values(finances.reduce<Record<string, { name: string; value: number }>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = { name: item.category, value: 0 };
    if (item.type === "expense") acc[item.category].value += item.amount;
    return acc;
  }, {}));

  return (
    <div className="space-y-4" data-testid="dashboard-page">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <KpiCard title="Pendentes" value={pending} />
        <KpiCard title="Concluídas" value={done} />
        <KpiCard title="Hábitos semana" value={habits.length} subtitle="check-ins monitorados" />
        <KpiCard title="Próximos eventos" value={events.length} />
        <KpiCard title="Saldo do mês" value={formatCurrency(monthBalance)} />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <GlassCard className="h-72">
          <p className="mb-4 text-sm text-slate-300">Consistência de hábitos (%)</p>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={habitData}><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="value" fill="#5be7ff" radius={[8, 8, 0, 0]} /></BarChart>
          </ResponsiveContainer>
        </GlassCard>
        <GlassCard className="h-72">
          <p className="mb-4 text-sm text-slate-300">Gastos por categoria</p>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart><Pie data={byCategory} dataKey="value" nameKey="name" outerRadius={90}>{byCategory.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}</Pie><Tooltip /></PieChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
    </div>
  );
}
