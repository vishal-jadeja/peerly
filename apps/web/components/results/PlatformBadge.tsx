// Pill badge showing the source platform (Reddit / X / LinkedIn)
import type { Platform } from "@/types";
import { cn } from "@/lib/utils";

const PLATFORM_STYLES: Record<Platform, string> = {
  reddit: "bg-orange-500/20 text-orange-400",
  twitter: "bg-sky-500/20 text-sky-400",
  linkedin: "bg-blue-600/20 text-blue-400",
};

const PLATFORM_LABELS: Record<Platform, string> = {
  reddit: "Reddit",
  twitter: "X",
  linkedin: "LinkedIn",
};

interface PlatformBadgeProps {
  platform: Platform;
}

export function PlatformBadge({ platform }: PlatformBadgeProps) {
  return (
    <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", PLATFORM_STYLES[platform])}>
      {PLATFORM_LABELS[platform]}
    </span>
  );
}
