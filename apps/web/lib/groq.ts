// Single Groq client — all prompt functions for query generation and message drafting
import Groq from "groq-sdk";
import type { PersonResult, PlatformQueries } from "@/types";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const MODEL = "llama-3.3-70b-versatile";

export async function generateSearchQueries(goal: string): Promise<PlatformQueries> {
  const completion = await groq.chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: "system",
        content: `You generate search queries for Reddit, X (Twitter), and LinkedIn to find people who recently posted about a learning topic. Return JSON only, no markdown. Schema: { reddit: string[], twitter: string[], linkedin: string[] }. 2-3 queries per platform.`,
      },
      { role: "user", content: `Learning goal: ${goal}` },
    ],
    response_format: { type: "json_object" },
  });

  const raw = completion.choices[0].message.content ?? "{}";
  return JSON.parse(raw) as PlatformQueries;
}

export async function draftMessage(person: PersonResult, goal: string): Promise<string> {
  const completion = await groq.chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: "system",
        content: `You write short, casual, personalized outreach DMs. 3-4 sentences. Reference the person's specific post. State the sender's goal. End with a low-friction ask (15 min call, quick chat, mock round). Sound human.`,
      },
      {
        role: "user",
        content: `Person: ${person.username} on ${person.platform}\nTheir post: "${person.snippet}"\nMy goal: ${goal}`,
      },
    ],
  });

  return completion.choices[0].message.content ?? "";
}
