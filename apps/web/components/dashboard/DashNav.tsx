"use client";

import { useSearchContext } from "@/contexts/SearchContext";
import { cn } from "@/lib/utils";
import type { Platform } from "@/types";

const PLATFORM_LABELS: Record<Platform, string> = {
  reddit: "REDDIT",
  twitter: "X",
  linkedin: "LINKEDIN",
};

const PLATFORMS: Platform[] = ["reddit", "twitter", "linkedin"];

function Counter({ value }: { value: number }) {
  return <>{value}</>;
}

export function DashNav() {
  const { view, goal, results, platforms, togglePlatform, setView, setGoal } =
    useSearchContext();

  const showMeta = view === "results" || view === "empty";

  function handleNewSearch() {
    setGoal("");
    setView("input");
  }

  return (
    <nav className="d-nav">
      {/* Wordmark */}
      <div className="d-nav-wordmark">
        PEERLY
        <span className="d-pulse-dot" />
      </div>

      {/* Query + result count pill */}
      {showMeta && goal && (
        <div className="d-nav-pill">
          <span style={{ fontStyle: "italic", opacity: 0.7 }}>
            &ldquo;{goal.length > 40 ? goal.slice(0, 40) + "…" : goal}&rdquo;
          </span>
          <span style={{ opacity: 0.35 }}>—</span>
          <Counter value={results.length} />
          <span style={{ opacity: 0.5 }}>results</span>
        </div>
      )}

      {/* Platform toggles + action */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {showMeta && (
          <div className="d-platform-toggles" style={{ display: "flex", gap: "6px" }}>
            {PLATFORMS.map((p) => (
              <button
                key={p}
                className={cn("d-platform-toggle", platforms[p] && "active")}
                onClick={() => togglePlatform(p)}
              >
                {PLATFORM_LABELS[p]}
              </button>
            ))}
          </div>
        )}
        {view !== "input" && (
          <button className="d-nav-new-search" onClick={handleNewSearch}>
            NEW SEARCH ↗
          </button>
        )}
      </div>
    </nav>
  );
}
