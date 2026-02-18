"use client";

import { FormEvent, useState } from "react";
import { taskSchema } from "@/lib/schemas";
import { useAppStore } from "@/lib/store/useAppStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { toast } from "sonner";

export const TaskForm = () => {
  const addTask = useAppStore((s) => s.addTask);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"low" | "med" | "high">("med");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const parsed = taskSchema.safeParse({ title, description: "", dueDate: new Date().toISOString(), priority, status: "todo", tags: [] });
    if (!parsed.success) {
      toast.error("Dados inválidos");
      return;
    }
    addTask(parsed.data);
    setTitle("");
    toast.success("Tarefa criada");
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-2 md:grid-cols-[1fr_160px_auto]">
      <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Nova tarefa" aria-label="Nova tarefa" required />
      <Select value={priority} onChange={(e) => setPriority(e.target.value as "low" | "med" | "high") }>
        <option value="low">Baixa</option><option value="med">Média</option><option value="high">Alta</option>
      </Select>
      <Button type="submit">Adicionar</Button>
    </form>
  );
};
