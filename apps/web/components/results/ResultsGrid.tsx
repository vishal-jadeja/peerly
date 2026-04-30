// Masonry-style grid of PersonCards rendered from search results
"use client";

import { useSearch } from "@/hooks/useSearch";
import { PersonCard } from "./PersonCard";

export function ResultsGrid() {
  const { results, goal, isPending } = useSearch();

  if (isPending) {
    return <p className="text-muted-foreground text-sm">Finding people…</p>;
  }

  if (!results.length) {
    return <p className="text-muted-foreground text-sm">No results yet. Try a search.</p>;
  }

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
      {results.map((person) => (
        <div key={person.id} className="break-inside-avoid">
          <PersonCard person={person} goal={goal} />
        </div>
      ))}
    </div>
  );
}
