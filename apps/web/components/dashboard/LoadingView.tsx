"use client";

import { StatusBar } from "@/components/dashboard/StatusBar";

function SkeletonCard() {
  return (
    <div className="d-skeleton-card">
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div className="d-shimmer d-shimmer-avatar" />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
          <div className="d-shimmer d-shimmer-line" style={{ width: "60%" }} />
          <div className="d-shimmer d-shimmer-line" style={{ width: "40%" }} />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <div className="d-shimmer d-shimmer-line" />
        <div className="d-shimmer d-shimmer-line" />
        <div className="d-shimmer d-shimmer-line" style={{ width: "75%" }} />
      </div>
      <div className="d-shimmer d-shimmer-line" style={{ width: "40%", marginTop: "4px" }} />
    </div>
  );
}

export function LoadingView() {
  return (
    <div>
      <StatusBar />
      <div className="d-grid">
        {Array.from({ length: 9 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
