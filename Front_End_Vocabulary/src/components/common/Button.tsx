interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "brand" | "secondary" | "tertiary" | "danger" | "success" | "ghost";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  fullWidth?: boolean;
  /** Small, base, large, xl */
  size?: "xs" | "sm" | "base" | "lg" | "xl";
}

const SIZE_MAP = {
  xs: { fontSize: "12px", padding: "8px 14px", height: "36px" },
  sm: { fontSize: "13px", padding: "10px 16px", height: "40px" },
  base: { fontSize: "15px", padding: "14px 20px", height: "48px" },
  lg: { fontSize: "16px", padding: "16px 28px", height: "52px" },
  xl: { fontSize: "17px", padding: "18px 32px", height: "56px" },
};

const variantStyles: Record<string, React.CSSProperties> = {
  brand: {
    backgroundColor: "var(--brand)",
    color: "var(--text-white)",
    border: "2px solid transparent",
    boxShadow: "0 4px 0 var(--shadow-btn-brand)",
  },
  secondary: {
    backgroundColor: "var(--neutral-primary-soft)",
    color: "var(--text-heading)",
    border: "2px solid var(--border-default)",
    boxShadow: "0 4px 0 var(--shadow-btn-secondary)",
  },
  tertiary: {
    backgroundColor: "var(--neutral-primary-soft)",
    color: "var(--fg-brand)",
    border: "2px solid var(--border-default)",
    boxShadow: "0 4px 0 var(--shadow-btn-secondary)",
  },
  success: {
    backgroundColor: "var(--success)",
    color: "var(--text-white)",
    border: "2px solid transparent",
    boxShadow: "0 4px 0 var(--shadow-btn-success)",
  },
  danger: {
    backgroundColor: "var(--danger)",
    color: "var(--text-white)",
    border: "2px solid transparent",
    boxShadow: "0 4px 0 var(--shadow-btn-danger)",
  },
  ghost: {
    backgroundColor: "transparent",
    color: "var(--text-heading)",
    border: "2px solid transparent",
    boxShadow: "none",
  },
};

const hoverStyles: Record<string, string> = {
  brand: "var(--brand-medium)",
  secondary: "var(--neutral-secondary-medium)",
  tertiary: "var(--brand-softer)",
  success: "var(--success-medium)",
  danger: "var(--danger-medium)",
};

export default function Button({
  children, onClick, type = "button",
  variant = "brand", disabled, loading, className = "", fullWidth,
  size = "base",
}: Props) {
  const s = SIZE_MAP[size];
  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    height: s.height,
    padding: s.padding,
    fontSize: s.fontSize,
    fontWeight: 700,
    fontFamily: "var(--font-primary)",
    borderRadius: "var(--radius-default)",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    cursor: disabled || loading ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    width: fullWidth ? "100%" : undefined,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    transition: "background-color 100ms ease-out, transform 100ms ease-out",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={className}
      style={{ ...baseStyle, ...variantStyles[variant] }}
      onMouseEnter={(e) => {
        if (disabled || loading || variant === "ghost") return;
        const hover = hoverStyles[variant];
        if (hover) e.currentTarget.style.backgroundColor = hover;
        if (variant === "secondary" || variant === "tertiary") {
          if (variant === "tertiary") {
            e.currentTarget.style.borderColor = "var(--border-brand-subtle)";
          }
        }
      }}
      onMouseLeave={(e) => {
        if (disabled || loading) return;
        const vs = variantStyles[variant];
        e.currentTarget.style.backgroundColor = vs.backgroundColor as string;
        e.currentTarget.style.border = vs.border as string;
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = vs.boxShadow as string;
      }}
      onMouseDown={(e) => {
        if (disabled || loading || variant === "ghost") return;
        e.currentTarget.style.transform = "translateY(2px)";
        e.currentTarget.style.boxShadow = "0 2px 0 var(--shadow-btn-brand)";
      }}
      onMouseUp={(e) => {
        if (disabled || loading) return;
        e.currentTarget.style.transform = "translateY(0)";
        const vs = variantStyles[variant];
        e.currentTarget.style.boxShadow = vs.boxShadow as string;
      }}
    >
      {loading ? (
        <span
          className="inline-block w-4 h-4 rounded-full animate-spin"
          style={{
            border: "2px solid currentColor",
            borderTopColor: "transparent",
          }}
        />
      ) : null}
      {children}
    </button>
  );
}
