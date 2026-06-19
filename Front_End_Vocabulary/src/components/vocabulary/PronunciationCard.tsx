interface Props {
  word?: string;
  pronunciation?: string;
}

export default function PronunciationCard({ pronunciation }: Props) {
  return (
    <div
      className="mt-3 p-3"
      style={{
        backgroundColor: "var(--neutral-secondary-medium)",
        borderRadius: "var(--radius-default)",
      }}
    >
      {pronunciation && (
        <p className="text-sm font-bold" style={{ color: "var(--text-heading)" }}>
          {pronunciation}
        </p>
      )}
    </div>
  );
}
