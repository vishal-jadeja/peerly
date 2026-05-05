"use client";

import { useSearchContext } from "@/contexts/SearchContext";
import { DashNav } from "@/components/dashboard/DashNav";
import { DashSidebar } from "@/components/dashboard/DashSidebar";
import { ResultsGrid } from "@/components/results/ResultsGrid";
import { InputView } from "@/components/dashboard/InputView";
import { LoadingView } from "@/components/dashboard/LoadingView";
import { EmptyView } from "@/components/dashboard/EmptyView";

export function DashboardShell() {
  const { view } = useSearchContext();

  return (
    <div className="d-root">
      <DashNav />
      <div className="d-body">
        <DashSidebar />
        <main className="d-main">
          {view === "input" && <InputView />}
          {view === "loading" && <LoadingView />}
          {view === "results" && <ResultsGrid />}
          {view === "empty" && <EmptyView />}
        </main>
      </div>
    </div>
  );
}
