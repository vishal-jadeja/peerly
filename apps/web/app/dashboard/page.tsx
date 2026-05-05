import { Suspense } from "react";
import { SearchProvider } from "@/contexts/SearchContext";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default function DashboardPage() {
  return (
    <Suspense>
      <SearchProvider>
        <DashboardShell />
      </SearchProvider>
    </Suspense>
  );
}
