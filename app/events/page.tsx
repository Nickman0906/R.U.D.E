"use client";

import { EventForm } from "@/components/forms/EventForm";
import { GlassCard } from "@/components/cards/GlassCard";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store/useAppStore";
import { formatDateTime } from "@/lib/utils/date";

export default function EventsPage() {
  const { events, deleteEvent } = useAppStore();

  return (
    <div className="space-y-4">
      <GlassCard><EventForm /></GlassCard>
      <GlassCard>
        <p className="mb-3 text-sm text-slate-300">Agenda</p>
        <div className="space-y-2">
          {events.map((event) => (
            <div key={event.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/40 p-3">
              <div><p className="font-medium">{event.title}</p><p className="text-xs text-slate-400">{formatDateTime(event.startDateTime)} → {formatDateTime(event.endDateTime)}</p></div>
              <Button variant="ghost" onClick={() => deleteEvent(event.id)}>Excluir</Button>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
