// Top navigation bar with logo and optional search shortcut
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b border-border px-6 py-3">
      <Link href="/" className="text-lg font-bold tracking-tight">
        Peerly
      </Link>
      <span className="text-xs text-muted-foreground">Find your next peer</span>
    </nav>
  );
}
