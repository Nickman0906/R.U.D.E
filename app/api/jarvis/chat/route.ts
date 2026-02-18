import { NextResponse } from "next/server";
import { Action } from "@/lib/jarvis/types";

export async function POST(request: Request) {
  const body = (await request.json()) as { message?: string };
  const message = body.message ?? "";

  const actions: Action[] = message.toLowerCase().includes("tarefa")
    ? [{ kind: "create_task", payload: { title: "Nova tarefa sugerida", priority: "med", dueDate: new Date(Date.now() + 86400000).toISOString() } }]
    : [];

  return NextResponse.json({
    message: "Entendido. Estruturei um próximo passo e posso aplicar agora.",
    actions
  });
}
