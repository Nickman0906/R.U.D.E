"use client";

import { TaskForm } from "@/components/forms/TaskForm";
import { GlassCard } from "@/components/cards/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store/useAppStore";
import { formatDate } from "@/lib/utils/date";

export default function TasksPage() {
  const { tasks, toggleTask, deleteTask } = useAppStore();

  return (
    <div className="space-y-4">
      <GlassCard><TaskForm /></GlassCard>
      <GlassCard className="space-y-2">
        {tasks.length === 0 ? <p className="text-sm text-slate-400">Sem tarefas ainda.</p> : null}
        {tasks.map((task) => (
          <div key={task.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-slate-900/40 p-3">
            <div>
              <p className="font-medium">{task.title}</p>
              <div className="mt-1 flex gap-2"><Badge>{task.priority}</Badge><Badge>{task.status}</Badge><Badge>{formatDate(task.dueDate)}</Badge></div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => toggleTask(task.id)}>{task.status === "done" ? "Reabrir" : "Concluir"}</Button>
              <Button variant="ghost" onClick={() => deleteTask(task.id)}>Excluir</Button>
            </div>
          </div>
        ))}
      </GlassCard>
    </div>
  );
}
