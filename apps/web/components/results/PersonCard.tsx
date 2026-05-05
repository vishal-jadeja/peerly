"use client";

import { useState, useEffect, useRef } from "react";
import { PlatformBadge } from "./PlatformBadge";
import { useDraft } from "@/hooks/useDraft";
import type { PersonResult } from "@/types";

const AVATAR_COLORS = [
  ["#5b21b6", "#c4b5fd"],
  ["#0e7490", "#67e8f9"],
  ["#065f46", "#6ee7b7"],
  ["#92400e", "#fcd34d"],
  ["#9d174d", "#f9a8d4"],
  ["#1e3a5f", "#93c5fd"],
];

function getAvatarColors(username: string) {
  const idx = username.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[idx];
}

function Typewriter({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [text]);

  return (
    <>
      {displayed}
      {displayed.length < text.length && (
        <span style={{ animation: "blink 0.8s step-end infinite", opacity: 1 }}>▌</span>
      )}
    </>
  );
}

interface PersonCardProps {
  person: PersonResult;
  goal: string;
  index: number;
}

export function PersonCard({ person, goal, index }: PersonCardProps) {
  const { draft, generate, isFetching } = useDraft(person, goal);
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const prevDraft = useRef<string | null>(null);

  const [bgColor, textColor] = getAvatarColors(person.username);

  function handleToggle() {
    if (!expanded && !draft && !isFetching) {
      generate();
    }
    setExpanded((v) => !v);
  }

  async function handleCopy() {
    if (!draft) return;
    await navigator.clipboard.writeText(draft);
    setCopied(true);
    setTimeout(() => setCopied(false), 500);
  }

  // Reset typewriter when a new draft arrives
  useEffect(() => {
    prevDraft.current = draft;
  }, [draft]);

  function formatTime(iso: string) {
    try {
      const d = new Date(iso);
      const diff = Date.now() - d.getTime();
      const h = Math.floor(diff / 3600000);
      if (h < 1) return "just now";
      if (h < 24) return `${h}h ago`;
      return `${Math.floor(h / 24)}d ago`;
    } catch {
      return iso;
    }
  }

  return (
    <div
      className="d-card"
      style={{ "--card-i": index } as React.CSSProperties}
    >
      {/* Crop marks */}
      <span className="d-crop d-crop-tl" />
      <span className="d-crop d-crop-tr" />
      <span className="d-crop d-crop-bl" />
      <span className="d-crop d-crop-br" />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            className="d-avatar"
            style={{ background: bgColor, color: textColor }}
          >
            {person.username[0].toUpperCase()}
          </div>
          <div>
            <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--cream)", letterSpacing: "0.02em", lineHeight: 1.2 }}>
              {person.username}
            </p>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}>
              {formatTime(person.postedAt)}
            </p>
          </div>
        </div>
        <PlatformBadge platform={person.platform} />
      </div>

      {/* Excerpt */}
      <p className="d-excerpt">{person.snippet}</p>

      {/* Draft section */}
      <div>
        <button className="d-draft-label" onClick={handleToggle}>
          <span className="d-spark">✦</span>
          DRAFT MESSAGE
          <span style={{ marginLeft: "auto", opacity: 0.5, fontSize: "10px" }}>
            {expanded ? "▲" : "▼"}
          </span>
        </button>

        {expanded && (
          <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "10px" }}>
            {isFetching && !draft ? (
              <div className="d-draft-body" style={{ color: "rgba(255,255,255,0.3)" }}>
                Drafting<span style={{ animation: "blink 0.8s step-end infinite" }}>…</span>
              </div>
            ) : draft ? (
              <div className="d-draft-body">
                <Typewriter text={draft} />
              </div>
            ) : null}

            {draft && (
              <div className="d-draft-actions">
                <button className="d-draft-btn" onClick={handleCopy}>
                  {copied ? "COPIED ✓" : "COPY"}
                </button>
                <a
                  className="d-draft-btn"
                  href={person.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  OPEN PROFILE ↗
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
