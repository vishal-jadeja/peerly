// Landing page — hero section with the main goal input
import { SearchInput } from "@/components/search/SearchInput";
import { Navbar } from "@/components/layout/Navbar";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center gap-8 px-4">
        <div className="text-center space-y-3 max-w-xl">
          <h1 className="text-4xl font-bold tracking-tight">Find your next peer</h1>
          <p className="text-muted-foreground text-lg">
            Describe what you want to learn. We find real people who posted about it.
          </p>
        </div>
        <SearchInput />
      </main>
    </div>
  );
}
