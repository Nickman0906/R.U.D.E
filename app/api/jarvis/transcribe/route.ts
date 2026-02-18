import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ text: "Transcrição simulada: revisar prioridades da semana." });
}
