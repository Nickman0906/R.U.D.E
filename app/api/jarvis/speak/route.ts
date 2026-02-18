import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ url: "/audio/fake-jarvis-response.mp3" });
}
