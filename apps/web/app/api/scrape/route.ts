// Step 2: Forwards platform queries to the FastAPI scraper, returns PersonResult array
import { NextRequest, NextResponse } from "next/server";
import type { PlatformQueries, ScrapeResponse } from "@/types";

export async function POST(req: NextRequest) {
  const body: PlatformQueries = await req.json();

  const scraperUrl = process.env.NEXT_PUBLIC_SCRAPER_URL ?? "http://localhost:8000";

  const res = await fetch(`${scraperUrl}/scrape`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Scraper service error" }, { status: 502 });
  }

  const data: ScrapeResponse = await res.json();
  return NextResponse.json(data);
}
