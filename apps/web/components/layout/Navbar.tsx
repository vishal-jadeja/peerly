"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export function Navbar() {
  const { user, isLoggedIn, isLoading, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between border-b border-border px-6 py-3">
      <Link href="/" className="text-lg font-bold tracking-tight">
        Peerly
      </Link>

      <div className="flex items-center gap-4">
        {!isLoading && (
          <>
            {isLoggedIn && user ? (
              <>
                <span className="text-xs text-muted-foreground hidden sm:block">
                  {user.email}
                </span>
                <button
                  onClick={logout}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity"
                >
                  Get started
                </Link>
              </>
            )}
          </>
        )}
      </div>
    </nav>
  );
}
