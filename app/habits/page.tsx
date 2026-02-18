"use client";

import { HabitForm } from "@/components/forms/HabitForm";
import { GlassCard } from "@/components/cards/GlassCard";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store/useAppStore";

export default function HabitsPage() {
  const { habits, checkinHabit, deleteHabit } = useAppStore();

  return (
    <div className="space-y-4">
      <GlassCard><HabitForm /></GlassCard>
      <div className="grid gap-3 lg:grid-cols-2">
        {habits.map((habit) => (
          <GlassCard key={habit.id}>
            <p className="font-medium">{habit.name}</p>
            <p className="text-xs text-slate-400">Atual {habit.streak} • Melhor {habit.bestStreak} • Consistência {Math.round(habit.consistency * 100)}%</p>
            <div className="mt-3 flex gap-2"><Button onClick={() => checkinHabit(habit.id)}>Check-in</Button><Button variant="ghost" onClick={() => deleteHabit(habit.id)}>Excluir</Button></div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
