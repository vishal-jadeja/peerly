// Search state and submission logic — calls /api/search then /api/scrape
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { PersonResult } from "@/types";

interface SearchState {
  goal: string;
  setGoal: (v: string) => void;
  results: PersonResult[];
  isPending: boolean;
  submit: () => void;
}

export function useSearch(): SearchState {
  const [goal, setGoal] = useState("");
  const [results, setResults] = useState<PersonResult[]>([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function submit() {
    startTransition(async () => {
      const queryRes = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal }),
      });
      const { queries } = await queryRes.json();

      const scrapeRes = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(queries),
      });
      const { people } = await scrapeRes.json();

      setResults(people ?? []);
      router.push("/dashboard");
    });
  }

  return { goal, setGoal, results, isPending, submit };
}
