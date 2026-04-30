// Dashboard — sidebar + results grid after a search is submitted
import { Sidebar } from "@/components/layout/Sidebar";
import { ResultsGrid } from "@/components/results/ResultsGrid";
import { Navbar } from "@/components/layout/Navbar";

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <ResultsGrid />
        </main>
      </div>
    </div>
  );
}
