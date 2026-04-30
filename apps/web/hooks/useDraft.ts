// Per-person message draft generation — calls /api/draft on demand
"use client";

import { useState, useTransition } from "react";
import type { PersonResult } from "@/types";

interface DraftState {
  draft: string | null;
  isFetching: boolean;
  generate: () => void;
}

export function useDraft(person: PersonResult, goal: string): DraftState {
  const [draft, setDraft] = useState<string | null>(null);
  const [isFetching, startTransition] = useTransition();

  function generate() {
    startTransition(async () => {
      const res = await fetch("/api/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ person, goal }),
      });
      const { message } = await res.json();
      setDraft(message ?? null);
    });
  }

  return { draft, isFetching, generate };
}
