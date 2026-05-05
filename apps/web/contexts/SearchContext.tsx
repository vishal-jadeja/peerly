"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { useSearchParams } from "next/navigation";
import type { PersonResult, Platform } from "@/types";

type View = "input" | "loading" | "results" | "empty";

interface SearchCtx {
  goal: string;
  setGoal: (v: string) => void;
  results: PersonResult[];
  view: View;
  setView: (v: View) => void;
  platforms: Record<Platform, boolean>;
  togglePlatform: (p: Platform) => void;
  sort: "recent" | "relevant";
  setSort: (s: "recent" | "relevant") => void;
  history: string[];
  submit: (overrideGoal?: string) => void;
}

const SearchContext = createContext<SearchCtx | null>(null);

export function useSearchContext() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearchContext must be inside SearchProvider");
  return ctx;
}

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const [goal, setGoal] = useState("");
  const [results, setResults] = useState<PersonResult[]>([]);
  const [view, setView] = useState<View>("input");
  const [platforms, setPlatforms] = useState<Record<Platform, boolean>>({
    reddit: true,
    twitter: true,
    linkedin: true,
  });
  const [sort, setSort] = useState<"recent" | "relevant">("relevant");
  const [history, setHistory] = useState<string[]>([]);
  const autoSubmitted = useRef(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("peerly-history");
      if (stored) setHistory(JSON.parse(stored) as string[]);
    } catch {}
  }, []);

  async function runSearch(searchGoal: string, prevHistory: string[]) {
    if (!searchGoal.trim()) return;
    setView("loading");

    const next = [
      searchGoal,
      ...prevHistory.filter((h) => h !== searchGoal),
    ].slice(0, 6);
    setHistory(next);
    try {
      localStorage.setItem("peerly-history", JSON.stringify(next));
    } catch {}

    try {
      const queryRes = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal: searchGoal }),
      });
      const { queries } = await queryRes.json();

      const scrapeRes = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(queries),
      });
      const { people } = await scrapeRes.json();

      const fetched: PersonResult[] = people ?? [];
      setResults(fetched);
      setView(fetched.length > 0 ? "results" : "empty");
    } catch {
      setResults([]);
      setView("empty");
    }
  }

  function submit(overrideGoal?: string) {
    const searchGoal = overrideGoal ?? goal;
    if (overrideGoal) setGoal(overrideGoal);
    runSearch(searchGoal, history);
  }

  useEffect(() => {
    if (autoSubmitted.current) return;
    const q = searchParams.get("q");
    if (q) {
      autoSubmitted.current = true;
      setGoal(q);
      runSearch(q, []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function togglePlatform(p: Platform) {
    setPlatforms((prev) => ({ ...prev, [p]: !prev[p] }));
  }

  const sortedResults =
    sort === "recent"
      ? [...results].sort(
          (a, b) =>
            new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
        )
      : results;

  return (
    <SearchContext.Provider
      value={{
        goal,
        setGoal,
        results: sortedResults,
        view,
        setView,
        platforms,
        togglePlatform,
        sort,
        setSort,
        history,
        submit,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
