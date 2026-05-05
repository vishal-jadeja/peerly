"use client";

import { useSearchContext } from "@/contexts/SearchContext";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const HISTORY_OPACITIES = [1, 0.85, 0.7, 0.6, 0.5, 0.42];

export function DashSidebar() {
  const { history, submit, sort, setSort, setView, setGoal } =
    useSearchContext();

  function handleNewSearch() {
    setGoal("");
    setView("input");
  }

  return (
    <aside className="d-sidebar">
      {/* Recent searches */}
      <div>
        <p className="d-sidebar-label">RECENT SEARCHES</p>
        {history.length === 0 ? (
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)", fontStyle: "italic" }}>
            No searches yet
          </p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {history.map((h, i) => (
              <li key={h + i}>
                <button
                  className="d-history-item"
                  style={{
                    opacity: HISTORY_OPACITIES[i] ?? 0.3,
                    width: "100%",
                    textAlign: "left",
                    border: "none",
                    background: "transparent",
                    color: "var(--cream)",
                  }}
                  onClick={() => submit(h)}
                >
                  {h}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Sort by */}
      <div>
        <p className="d-sidebar-label">SORT BY</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {(["relevant", "recent"] as const).map((s) => (
            <button
              key={s}
              className={cn("d-sort-btn", sort === s && "active")}
              onClick={() => setSort(s)}
            >
              {s === "relevant" ? "MOST RELEVANT" : "MOST RECENT"}
              {sort === s && (
                <motion.span
                  className="d-sort-underline"
                  layoutId="sort-underline"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* New search */}
      <button className="d-sidebar-new-search" onClick={handleNewSearch}>
        + NEW SEARCH
      </button>
    </aside>
  );
}
