"use client";
import { FormEvent, useState } from "react";
import { eventSchema } from "@/lib/schemas";
import { useAppStore } from "@/lib/store/useAppStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const EventForm = () => {
  const upsertEvent = useAppStore((s) => s.upsertEvent);
  const [title, setTitle] = useState("");
  const [startDateTime, setStart] = useState("");
  const [endDateTime, setEnd] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const parsed = eventSchema.safeParse({ title, startDateTime, endDateTime, location: "", notes: "" });
    if (!parsed.success) return toast.error("Evento inválido");
    upsertEvent(parsed.data);
    setTitle("");
    toast.success("Evento salvo");
  };
  return (
    <form onSubmit={onSubmit} className="grid gap-2 md:grid-cols-4">
      <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título" required />
      <Input type="datetime-local" value={startDateTime} onChange={(e) => setStart(e.target.value)} required />
      <Input type="datetime-local" value={endDateTime} onChange={(e) => setEnd(e.target.value)} required />
      <Button type="submit">Salvar</Button>
    </form>
  );
};
