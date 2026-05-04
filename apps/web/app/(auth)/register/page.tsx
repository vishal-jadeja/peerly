"use client";

import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const { error: msg } = await res.json();
        setError(msg ?? "Registration failed. Try again.");
        return;
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Account created but sign-in failed. Please log in.");
        router.push("/login");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    });
  }

  const inputStyle: React.CSSProperties = {
    background: "rgba(250,245,235,.04)",
    border: "1px solid rgba(250,245,235,.18)",
    padding: "12px 14px",
    color: "var(--cream)",
    fontSize: "0.95rem",
    fontFamily: "var(--font-dm-sans)",
    outline: "none",
    width: "100%",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "0.65rem",
    letterSpacing: "0.26em",
    textTransform: "uppercase",
    color: "var(--p-muted)",
    fontFamily: "var(--font-mono)",
  };

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
          Create account.
        </h1>
        <p
          style={{
            fontSize: "0.82rem",
            color: "var(--p-muted)",
            marginBottom: "32px",
            letterSpacing: "0.04em",
          }}
        >
          Already have an account?{" "}
          <Link
            href="/login"
            style={{ color: "var(--cyan)", textDecoration: "underline" }}
          >
            Sign in
          </Link>
        </p>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 18 }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label htmlFor="name" style={labelStyle}>
              Name (optional)
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isPending}
              style={inputStyle}
              placeholder="Your name"
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label htmlFor="email" style={labelStyle}>
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
              style={inputStyle}
              placeholder="you@example.com"
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label htmlFor="password" style={labelStyle}>
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isPending}
              style={inputStyle}
              placeholder="Min. 8 characters"
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
            {isPending ? "CREATING ACCOUNT…" : "CREATE ACCOUNT →"}
          </button>
        </form>
      </div>

      <p
        style={{
          textAlign: "center",
          fontSize: "0.66rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--p-muted)",
          marginTop: 24,
        }}
      >
        No spam · ever
      </p>
    </div>
  );
}
