"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, CheckSquare, CircleDollarSign, LayoutDashboard, MessageSquare, Repeat } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/tasks", label: "Tarefas", icon: CheckSquare },
  { href: "/events", label: "Eventos", icon: CalendarDays },
  { href: "/habits", label: "Hábitos", icon: Repeat },
  { href: "/finance", label: "Finanças", icon: CircleDollarSign },
  { href: "/jarvis", label: "Jarvis", icon: MessageSquare }
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="glass h-full w-full rounded-2xl p-3">
      <h1 className="px-2 py-3 text-lg font-semibold tracking-wide">JARVIS</h1>
      <nav className="space-y-1">
        {items.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className={cn("flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition", active ? "bg-neon/20 text-neon" : "text-slate-300 hover:bg-white/10") }>
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
