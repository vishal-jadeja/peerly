// Step 3: Takes a person result + user goal, returns a drafted outreach message via Groq
import { NextRequest, NextResponse } from "next/server";
import { draftMessage } from "@/lib/groq";
import type { PersonResult } from "@/types";

export async function POST(req: NextRequest) {
  const { person, goal }: { person: PersonResult; goal: string } = await req.json();

  if (!person || !goal) {
    return NextResponse.json({ error: "person and goal are required" }, { status: 400 });
  }

  const message = await draftMessage(person, goal);
  return NextResponse.json({ message });
}
