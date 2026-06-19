interface Props {
  label?: string;
}

export default function Loading({ label }: Props) {
  return (
    <div
      className="flex flex-col items-center justify-center py-16"
      role="status"
      aria-label={label || "Loading content"}
    >
      <div
        className="w-10 h-10 rounded-full animate-spin"
        style={{
          border: "3px solid var(--border-default)",
          borderTopColor: "var(--brand)",
        }}
      />
      {label && (
        <p className="mt-4 text-sm font-bold uppercase tracking-wide" style={{ color: "var(--text-body-subtle)" }}>
          {label}
        </p>
      )}
      <span className="sr-only">{label || "Loading"}</span>
    </div>
  );
}
