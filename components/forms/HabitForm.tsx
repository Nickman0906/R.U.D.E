"use client";
import { FormEvent, useState } from "react";
import { habitSchema } from "@/lib/schemas";
import { useAppStore } from "@/lib/store/useAppStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { toast } from "sonner";

export const HabitForm = () => {
  const upsertHabit = useAppStore((s) => s.upsertHabit);
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState<"daily" | "weekly" | "custom">("daily");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const parsed = habitSchema.safeParse({ name, frequency, targetPerPeriod: 1 });
    if (!parsed.success) return toast.error("Hábito inválido");
    upsertHabit(parsed.data);
    setName("");
    toast.success("Hábito salvo");
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-2 md:grid-cols-[1fr_150px_auto]">
      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Novo hábito" required />
      <Select value={frequency} onChange={(e) => setFrequency(e.target.value as "daily" | "weekly" | "custom") }>
        <option value="daily">Diário</option><option value="weekly">Semanal</option><option value="custom">Custom</option>
      </Select>
      <Button type="submit">Criar</Button>
    </form>
  );
};
