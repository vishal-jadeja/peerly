// Single result card — person info, post snippet, and drafted outreach message
"use client";

import { PlatformBadge } from "./PlatformBadge";
import { useDraft } from "@/hooks/useDraft";
import type { PersonResult } from "@/types";

interface PersonCardProps {
  person: PersonResult;
  goal: string;
}

export function PersonCard({ person, goal }: PersonCardProps) {
  const { draft, generate, isFetching } = useDraft(person, goal);

  return (
    <div className="rounded-xl border border-border bg-secondary p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-sm">{person.username}</p>
          <p className="text-xs text-muted-foreground">{person.profileUrl}</p>
        </div>
        <PlatformBadge platform={person.platform} />
      </div>

      <p className="text-sm text-muted-foreground line-clamp-3">{person.snippet}</p>

      {draft ? (
        <div className="rounded-lg bg-muted p-3 text-sm">{draft}</div>
      ) : (
        <button
          onClick={generate}
          disabled={isFetching}
          className="text-xs font-medium text-primary underline-offset-2 hover:underline disabled:opacity-50"
        >
          {isFetching ? "Drafting…" : "Draft message"}
        </button>
      )}
    </div>
  );
}
