import type { CSSProperties } from "react";

type IconName =
  // Audio
  | "volume-mute"
  | "volume-low"
  | "volume-high"
  | "volume-max"
  | "play"
  | "pause"
  // Navigation
  | "menu"
  | "chevron-left"
  | "chevron-right"
  | "arrow-left"
  | "arrow-right"
  | "home"
  // Actions
  | "refresh"
  | "search"
  | "plus"
  | "sparkle"
  | "seed"
  | "flashcard"
  // Status
  | "check"
  | "close"
  | "alert"
  | "info"
  // Content
  | "book"
  | "book-open"
  | "star"
  | "fire"
  | "folder"
  | "edit"
  | "mail"
  | "heart"
  | "music"
  | "globe"
  | "briefcase"
  | "coffee"
  | "paw"
  | "palette"
  | "leaf"
  // Empty / Misc
  | "inbox"
  | "party"
  | "target";

interface Props {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

const paths: Record<IconName, string> = {
  // Audio
  "volume-mute":
    "M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6",
  "volume-low":
    "M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 010 7.07",
  "volume-high":
    "M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07",
  "volume-max":
    "M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07M8 12h.01",
  "play":
    "M5 3l14 9-14 9V3z",
  "pause":
    "M6 4h4v16H6zM14 4h4v16h-4z",

  // Navigation
  "menu":
    "M3 6h18M3 12h18M3 18h18",
  "chevron-left":
    "M15 18l-6-6 6-6",
  "chevron-right":
    "M9 18l6-6-6-6",
  "arrow-left":
    "M19 12H5M12 19l-7-7 7-7",
  "arrow-right":
    "M5 12h14M12 5l7 7-7 7",
  "home":
    "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9zM9 22V12h6v10",

  // Actions
  "refresh":
    "M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15",
  "search":
    "M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35",
  "plus":
    "M12 5v14M5 12h14",
  "sparkle":
    "M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z",
  "seed":
    "M12 22c-4-3-8-7.5-8-12a8 8 0 0116 0c0 4.5-4 9-8 12zM12 13a3 3 0 100-6 3 3 0 000 6z",
  "flashcard":
    "M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z",

  // Status
  "check":
    "M20 6L9 17l-5-5",
  "close":
    "M18 6L6 18M6 6l12 12",
  "alert":
    "M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z",
  "info":
    "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 16v-4M12 8h.01",

  // Content
  "book":
    "M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 014 17V5a2 2 0 012-2h14v14H6.5A2.5 2.5 0 004 19.5z",
  "book-open":
    "M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z",
  "star":
    "M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z",
  "fire":
    "M12 23c-3.6 0-8-3.2-8-9.2C4 10 8 6.6 9.6 4.8c.3-.3.8-.1.8.3 0 2 1.2 3.2 2.6 3.2.6 0 1-.4 1-1V6c0-.3.4-.5.7-.3C18 7.4 20 11.4 20 13.8 20 19.8 16.8 23 12 23z",
  "folder":
    "M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z",
  "edit":
    "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  "mail":
    "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
  "heart":
    "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z",
  "music":
    "M9 18V5l12-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zM21 16a3 3 0 11-6 0 3 3 0 016 0z",
  "globe":
    "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z",
  "briefcase":
    "M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16",
  "coffee":
    "M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3",
  "paw":
    "M12 10a2 2 0 100 4 2 2 0 000-4zM7.5 8a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM16.5 8a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM4.5 14a2 2 0 100 4 2 2 0 000-4zM19.5 14a2 2 0 100 4 2 2 0 000-4z",
  "palette":
    "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.1 0 2-.9 2-2 0-.51-.19-.97-.51-1.32-.31-.34-.49-.78-.49-1.26 0-1.1.9-2 2-2h2.35c3.04 0 5.5-2.46 5.5-5.5C23 5.92 18.07 2 12 2zM6.5 13a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm3-5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm3 5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z",
  "leaf":
    "M11 20A7 7 0 019.8 6.9C15.5 4.9 20 1 20 1s.5 4.5-2 8.5A7 7 0 0111 20zM2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12",

  // Empty / Misc
  "inbox":
    "M22 12h-6l-2 3h-4l-2-3H2M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z",
  "party":
    "M5.8 11.3L2 22l10.7-3.8M18 3l-2.1 2.1M14 10l2.1-2.1M3 15l2.1 2.1M21 3l-4.2 4.2M14.8 8.2L12 11",
  "target":
    "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 18a6 6 0 100-12 6 6 0 000 12zM12 14a2 2 0 100-4 2 2 0 000 4z",
};

export default function Icon({ name, size = 18, color = "currentColor", className, style }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}

export type { IconName };
