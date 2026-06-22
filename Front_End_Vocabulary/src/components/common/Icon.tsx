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
  | "target"
  // Topic-specific
  | "shopping-bag"
  | "graduation"
  | "scissors"
  | "home-filled"
  | "weather-cloud"
  | "person-smile"
  | "microscope"
  | "speech-bubble"
  | "settings"
  | "chart";

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
    "M8.5 5a3 3 0 1 0-1 5.8 3 3 0 0 0-3 3c0 1.7 1.3 3 3 3h7a3 3 0 0 0 3-3 3 3 0 0 0-3-3 3 3 0 0 0-1-5.8z M5.2 3.3 3.6 7 M18.8 3.3l1.6 3.7 M3 13a2 2 0 0 0 4 0 M17 13a2 2 0 0 0 4 0 M6 16a1.5 1.5 0 0 0 3 0 M15 16a1.5 1.5 0 0 0 3 0",
  "palette":
    "M12 2a10 10 0 0 1 6.3 17.6.5.5 0 0 1-.3.4h-.2a.5.5 0 0 1-.4-.4V16.5a2 2 0 0 0-2-2h-.2a3 3 0 0 1-3-3 3 3 0 0 1 3-3h.2a2 2 0 0 0 2-2V7.1a.5.5 0 0 1 .3-.4A10 10 0 0 1 12 2z M7.5 10a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z M11 8a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z M14.5 12a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z M8 15a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z",
  "leaf":
    "M3.5 20.5 Q 6 15, 11.5 12 Q 17 8, 20.5 3 Q 18 8, 14 11 Q 17 13, 21 14 Q 16 18, 12 20 Q 8 22, 3.5 20.5z M16 13 L10 19 M10.5 14.5 L13 12",

  // Empty / Misc
  "inbox":
    "M22 12h-6l-2 3h-4l-2-3H2M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z",
  "party":
    "M5.8 11.3L2 22l10.7-3.8M18 3l-2.1 2.1M14 10l2.1-2.1M3 15l2.1 2.1M21 3l-4.2 4.2M14.8 8.2L12 11",
  "target":
    "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 18a6 6 0 100-12 6 6 0 000 12zM12 14a2 2 0 100-4 2 2 0 000 4z",
  // Topic-specific (filled, bold, distinctive)
  "shopping-bag":
    "M4 4 L8 4 L10 20 L18 20 L20 4 L24 4",
  "graduation":
    "M12 2 L2 8 L12 14 L22 8 Z M6 10 L6 17 C6 17 8.5 20 12 20 C15.5 20 18 17 18 17 L18 10",
  "scissors":
    "M4 4 A2.5 2.5 0 1 0 4 9 A2.5 2.5 0 1 0 4 4z M16 16 A2.5 2.5 0 1 0 16 21 A2.5 2.5 0 1 0 16 16z M6.8 6.8 L17.2 17.2",
  "home-filled":
    "M2 12 L12 3 L22 12 L22 22 Q22 23 21 23 L16 23 L16 15 L14 15 L14 23 L10 23 L10 15 L8 15 L8 23 L3 23 Q2 23 2 22 Z",
  "weather-cloud":
    "M5 17 A4 4 0 0 1 5 9 A6 6 0 0 1 17 9 A4 4 0 0 1 19 17 Z M8 21 L16 21",
  "person-smile":
    "M12 2 A6 6 0 1 0 12 14 A6 6 0 1 0 12 2 Z M7 17 Q12 22 17 17 M9 11 L9.01 11 M15 11 L15.01 11",
  "microscope":
    "M6 21 L10 17 M18 21 L14 17 M10 17 L14 17 M12 13 L12 17 M9 9 A3 3 0 1 1 15 9 L15 13 L9 13 Z M7 5 L17 5",
  "speech-bubble":
    "M4 4 L20 4 L20 15 L14 15 L10 19 L10 15 L4 15 Z",
  "settings":
    "M12.22 2h-.44a2 2 0 00-2 2v.18a2 2 0 01-1 1.73l-.43.25a2 2 0 01-2 0l-.15-.08a2 2 0 00-2.73.73l-.22.38a2 2 0 00.73 2.73l.15.1a2 2 0 011 1.72v.51a2 2 0 01-1 1.74l-.15.09a2 2 0 00-.73 2.73l.22.38a2 2 0 002.73.73l.15-.08a2 2 0 012 0l.43.25a2 2 0 011 1.73V20a2 2 0 002 2h.44a2 2 0 002-2v-.18a2 2 0 011-1.73l.43-.25a2 2 0 012 0l.15.08a2 2 0 002.73-.73l.22-.39a2 2 0 00-.73-2.73l-.15-.08a2 2 0 01-1-1.74v-.5a2 2 0 011-1.74l.15-.09a2 2 0 00.73-2.73l-.22-.38a2 2 0 00-2.73-.73l-.15.08a2 2 0 01-2 0l-.43-.25a2 2 0 01-1-1.73V4a2 2 0 00-2-2zM12 15a3 3 0 100-6 3 3 0 000 6z",
  "chart":
    "M18 20V10M12 20V4M6 20v-6",
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
