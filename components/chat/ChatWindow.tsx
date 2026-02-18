"use client";

import { Action } from "@/lib/jarvis/types";
import { useAppStore } from "@/lib/store/useAppStore";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { Composer } from "@/components/chat/Composer";
import { ActionCard } from "@/components/cards/ActionCard";
import { toast } from "sonner";

export const ChatWindow = () => {
  const { messages, pushMessage, applyAction } = useAppStore();

  const onSend = async (text: string) => {
    pushMessage({ id: crypto.randomUUID(), role: "user", content: text, createdAt: new Date().toISOString() });
    const res = await fetch("/api/jarvis/chat", { method: "POST", body: JSON.stringify({ message: text }) });
    const data = await res.json() as { message: string; actions?: Action[] };
    pushMessage({ id: crypto.randomUUID(), role: "assistant", content: data.message, actions: data.actions, createdAt: new Date().toISOString() });
  };

  return (
    <section className="glass rounded-2xl p-4">
      <div className="mb-3 max-h-[50vh] space-y-2 overflow-y-auto pr-1">
        {messages.length === 0 ? <p className="text-sm text-slate-400">Sem mensagens. Experimente: “crie uma tarefa para amanhã”.</p> : null}
        {messages.map((message) => (
          <div key={message.id} className="space-y-2">
            <MessageBubble message={message} />
            {message.actions?.map((action, i) => (
              <ActionCard key={`${message.id}-${i}`} action={action} onApply={(a) => { applyAction(a); toast.success("Ação aplicada"); }} />
            ))}
          </div>
        ))}
      </div>
      <Composer onSend={onSend} />
    </section>
  );
};
