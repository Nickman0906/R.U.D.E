"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AudioControls } from "@/components/chat/AudioControls";

export const Composer = ({ onSend }: { onSend: (text: string) => void }) => {
  const [text, setText] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };
  return (
    <form onSubmit={submit} className="flex gap-2">
      <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Comando para JARVIS..." />
      <AudioControls />
      <Button type="submit">Enviar</Button>
    </form>
  );
};
