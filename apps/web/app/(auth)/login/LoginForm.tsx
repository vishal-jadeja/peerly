"use client";

import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";
  const urlError = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(
    urlError === "CredentialsSignin" ? "Invalid email or password." : null
  );
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password.");
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    });
  }

  return (
    <div className="w-full max-w-sm px-4">
      <div
        className="flex items-center gap-2 justify-center mb-10"
        style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "1.6rem",
          letterSpacing: "0.06em",
          color: "var(--cream)",
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "var(--cyan)",
            boxShadow: "0 0 10px var(--cyan)",
            flexShrink: 0,
          }}
        />
        PEERLY
      </div>

      <div
        style={{
          border: "1px dashed rgba(250,245,235,.2)",
          padding: "36px 32px",
          position: "relative",
        }}
      >
        <span className="p-tick p-tick-tl" />
        <span className="p-tick p-tick-tr" />
        <span className="p-tick p-tick-bl" />
        <span className="p-tick p-tick-br" />

        <h1
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "2.8rem",
            lineHeight: 0.9,
            color: "var(--cream)",
            marginBottom: "6px",
          }}
        >
          Sign in.
        </h1>
        <p
          style={{
            fontSize: "0.82rem",
            color: "var(--p-muted)",
            marginBottom: "32px",
            letterSpacing: "0.04em",
          }}
        >
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            style={{ color: "var(--cyan)", textDecoration: "underline" }}
          >
            Create one
          </Link>
        </p>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 18 }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label
              htmlFor="email"
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: "var(--p-muted)",
                fontFamily: "var(--font-mono)",
              }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isPending}
              placeholder="you@example.com"
              style={{
                background: "rgba(250,245,235,.04)",
                border: "1px solid rgba(250,245,235,.18)",
                padding: "12px 14px",
                color: "var(--cream)",
                fontSize: "0.95rem",
                fontFamily: "var(--font-dm-sans)",
                outline: "none",
                width: "100%",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label
              htmlFor="password"
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: "var(--p-muted)",
                fontFamily: "var(--font-mono)",
              }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isPending}
              placeholder="••••••••"
              style={{
                background: "rgba(250,245,235,.04)",
                border: "1px solid rgba(250,245,235,.18)",
                padding: "12px 14px",
                color: "var(--cream)",
                fontSize: "0.95rem",
                fontFamily: "var(--font-dm-sans)",
                outline: "none",
                width: "100%",
              }}
            />
          </div>

          {error && (
            <p
              style={{
                fontSize: "0.8rem",
                color: "#f87171",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.04em",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            style={{
              background: "linear-gradient(180deg,#7c3aed,#5b21b6)",
              color: "#fff",
              border: "none",
              padding: "14px",
              fontSize: "0.72rem",
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              fontWeight: 600,
              cursor: isPending ? "not-allowed" : "pointer",
              fontFamily: "var(--font-dm-sans)",
              opacity: isPending ? 0.7 : 1,
              boxShadow:
                "inset 0 0 0 1px rgba(255,255,255,.1), 0 8px 24px -8px rgba(124,58,237,.7)",
              marginTop: 4,
              transition: "opacity 0.2s",
            }}
          >
            {isPending ? "SIGNING IN…" : "SIGN IN →"}
          </button>
        </form>
      </div>
    </div>
  );
}
