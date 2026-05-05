"use client";

import { useState, useEffect } from "react";
import { useSearchContext } from "@/contexts/SearchContext";
import { PersonCard } from "./PersonCard";
import type { Platform } from "@/types";

function Counter({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start: number | undefined;
    const duration = 800;

    function step(ts: number) {
      if (start === undefined) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(ease * value));
      if (p < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }, [value]);

  return <span className="d-results-count">{display}</span>;
}

const PLATFORM_LABELS: Record<Platform, string> = {
  reddit: "reddit",
  twitter: "x",
  linkedin: "linkedin",
};

export function ResultsGrid() {
  const { results, goal, platforms } = useSearchContext();

  const filtered = results.filter((r) => platforms[r.platform]);

  const counts = filtered.reduce(
    (acc, r) => ({ ...acc, [r.platform]: (acc[r.platform] ?? 0) + 1 }),
    {} as Record<Platform, number>
  );

  const breakdown = (["reddit", "twitter", "linkedin"] as Platform[])
    .filter((p) => counts[p])
    .map((p) => `${counts[p]} ${PLATFORM_LABELS[p]}`)
    .join(" · ");

  return (
    <div>
      <div className="d-results-header">
        <Counter value={filtered.length} />
        <span style={{ opacity: 0.45 }}>RESULTS</span>
        {breakdown && (
          <span style={{ opacity: 0.3 }}>· {breakdown}</span>
        )}
      </div>

      <div className="d-grid">
        {filtered.map((person, i) => (
          <PersonCard key={person.id} person={person} goal={goal} index={i} />
        ))}
      </div>
    </div>
  );
}
