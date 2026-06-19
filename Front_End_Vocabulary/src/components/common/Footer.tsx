interface Props {
  children?: React.ReactNode;
}

export default function Footer({ children }: Props) {
  return (
    <footer
      className="mt-16 py-8 text-center text-sm font-bold uppercase tracking-wide"
      style={{
        color: "var(--text-body-subtle)",
        borderTop: "2px solid var(--border-default)",
      }}
    >
      {children ?? (
        <span>
          © {new Date().getFullYear()} <strong style={{ color: "var(--text-heading)" }}>Parroto</strong> Vocabulary
        </span>
      )}
    </footer>
  );
}
