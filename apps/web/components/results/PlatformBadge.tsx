import type { Platform } from "@/types";

const PLATFORM_CONFIG: Record<
  Platform,
  { label: string; color: string; borderColor: string; icon: React.ReactNode }
> = {
  reddit: {
    label: "REDDIT",
    color: "#FF4500",
    borderColor: "rgba(255,69,0,0.3)",
    icon: (
      <svg viewBox="0 0 20 20" width="11" height="11" fill="#FF4500">
        <path d="M10 0C4.478 0 0 4.478 0 10s4.478 10 10 10 10-4.478 10-10S15.522 0 10 0zm5.01 10.781a1.217 1.217 0 0 1-.528 1.278c.017.14.026.28.026.421 0 2.16-2.513 3.91-5.613 3.91s-5.613-1.75-5.613-3.91c0-.141.009-.281.026-.421a1.217 1.217 0 1 1 1.34-1.947 5.95 5.95 0 0 1 3.231-.966l.624-2.938a.271.271 0 0 1 .326-.208l2.07.437a.851.851 0 1 1-.08.525l-1.831-.386-.55 2.605a5.961 5.961 0 0 1 3.187.963 1.217 1.217 0 0 1 1.385 1.637zM7.5 11a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm2.5 2a2.75 2.75 0 0 1-2.25-.75.25.25 0 1 0-.5.35 3.25 3.25 0 0 0 2.75.9 3.25 3.25 0 0 0 2.75-.9.25.25 0 1 0-.5-.35A2.75 2.75 0 0 1 10 13zm2.5-2a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z" />
      </svg>
    ),
  },
  twitter: {
    label: "X",
    color: "rgba(255,255,255,0.9)",
    borderColor: "rgba(255,255,255,0.15)",
    icon: (
      <svg viewBox="0 0 24 24" width="11" height="11" fill="rgba(255,255,255,0.9)">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.632 5.905-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  linkedin: {
    label: "LINKEDIN",
    color: "#0A66C2",
    borderColor: "rgba(10,102,194,0.35)",
    icon: (
      <svg viewBox="0 0 24 24" width="11" height="11" fill="#0A66C2">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
};

interface PlatformBadgeProps {
  platform: Platform;
}

export function PlatformBadge({ platform }: PlatformBadgeProps) {
  const cfg = PLATFORM_CONFIG[platform];
  return (
    <span
      className="d-platform-pill"
      style={{
        color: cfg.color,
        borderColor: cfg.borderColor,
      }}
    >
      {cfg.icon}
      {cfg.label}
    </span>
  );
}
