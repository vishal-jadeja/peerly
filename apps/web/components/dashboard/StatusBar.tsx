"use client";

import { useState, useEffect } from "react";
import { useSearchContext } from "@/contexts/SearchContext";

const STATUSES = ["INDEXING REDDIT", "SCANNING X", "SEARCHING LINKEDIN"];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function StatusBar() {
  const { goal } = useSearchContext();
  const [statusIdx, setStatusIdx] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const statusTimer = setInterval(() => {
      setStatusIdx((i) => (i + 1) % STATUSES.length);
    }, 2200);
    const elapsedTimer = setInterval(() => {
      setElapsed((s) => s + 1);
    }, 1000);
    return () => {
      clearInterval(statusTimer);
      clearInterval(elapsedTimer);
    };
  }, []);

  const mm = Math.floor(elapsed / 60);
  const ss = elapsed % 60;

  return (
    <div className="d-status-bar">
      <span className="d-pulse-dot" />
      <span>{STATUSES[statusIdx]}...</span>
      {goal && (
        <span style={{ color: "rgba(255,255,255,0.4)", fontStyle: "italic" }}>
          for &ldquo;{goal}&rdquo;
        </span>
      )}
      <span className="d-status-timer">
        · {pad(mm)}:{pad(ss)}
      </span>
    </div>
  );
}
