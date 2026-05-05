"use client";

import { useSearchContext } from "@/contexts/SearchContext";

export function EmptyView() {
  const { setView, setGoal } = useSearchContext();

  function reset() {
    setGoal("");
    setView("input");
  }

  return (
    <div className="d-empty-view">
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        style={{ opacity: 0.4 }}
      >
        <circle cx="22" cy="22" r="14" stroke="#7c3aed" strokeWidth="2" strokeDasharray="4 3" />
        <line x1="32" y1="32" x2="44" y2="44" stroke="#7c3aed" strokeWidth="2" />
        <line x1="16" y1="28" x2="28" y2="16" stroke="#7c3aed" strokeWidth="1.5" />
        <line x1="28" y1="28" x2="16" y2="16" stroke="#7c3aed" strokeWidth="1.5" />
      </svg>
      <h2 className="d-empty-heading">NO RESULTS FOUND</h2>
      <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", maxWidth: "340px", lineHeight: 1.6 }}>
        No one posted about this recently. Try rephrasing or broadening your topic.
      </p>
      <button className="d-sidebar-new-search" onClick={reset}>
        TRY AGAIN
      </button>
    </div>
  );
}
