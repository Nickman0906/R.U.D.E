"use client";

import { useEffect, useState } from "react";
import { StatusPill } from "@/components/hud/StatusPill";
import { Button } from "@/components/ui/button";

export const Topbar = () => {
  const [clock, setClock] = useState("");

  useEffect(() => {
    const update = () => setClock(new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(new Date()));
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="glass flex items-center justify-between rounded-2xl px-4 py-3">
      <div className="font-mono text-neon">{clock}</div>
      <div className="flex items-center gap-3">
        <StatusPill online />
        <Button variant="outline">Modo Jarvis</Button>
      </div>
    </header>
  );
};
