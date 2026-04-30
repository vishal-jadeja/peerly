// Step 1: Receives a plain-English goal, returns platform-specific search queries via Groq
import { NextRequest, NextResponse } from "next/server";
import { generateSearchQueries } from "@/lib/groq";

export async function POST(req: NextRequest) {
  const { goal } = await req.json();

  if (!goal || typeof goal !== "string") {
    return NextResponse.json({ error: "goal is required" }, { status: 400 });
  }

  const queries = await generateSearchQueries(goal);
  return NextResponse.json({ queries });
}
