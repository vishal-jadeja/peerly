// Main plain-English goal input with submit button
"use client";

import { useSearch } from "@/hooks/useSearch";

export function SearchInput() {
  const { goal, setGoal, submit, isPending } = useSearch();

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); submit(); }}
      className="flex w-full max-w-xl gap-2"
    >
      <input
        type="text"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="e.g. system design interviews, Rust async programming..."
        className="flex-1 rounded-lg border border-border bg-secondary px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
      <button
        type="submit"
        disabled={isPending || !goal.trim()}
        className="rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground disabled:opacity-50"
      >
        {isPending ? "Searching…" : "Find people"}
      </button>
    </form>
  );
}
