"use client";
import { FormEvent, useState } from "react";
import { financeSchema } from "@/lib/schemas";
import { useAppStore } from "@/lib/store/useAppStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { toast } from "sonner";

export const FinanceForm = () => {
  const addFinance = useAppStore((s) => s.addFinance);
  const [type, setType] = useState<"income" | "expense">("expense");
  const [category, setCategory] = useState("Geral");
  const [amount, setAmount] = useState("0");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const parsed = financeSchema.safeParse({ type, amount: Number(amount), category, date: new Date().toISOString(), description: "" });
    if (!parsed.success) return toast.error("Lançamento inválido");
    addFinance(parsed.data);
    toast.success("Lançamento criado");
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-2 md:grid-cols-4">
      <Select value={type} onChange={(e) => setType(e.target.value as "income" | "expense") }>
        <option value="income">Receita</option><option value="expense">Despesa</option>
      </Select>
      <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Categoria" required />
      <Input type="number" min="0" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      <Button type="submit">Adicionar</Button>
    </form>
  );
};
