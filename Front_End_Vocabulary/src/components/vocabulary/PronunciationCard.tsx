interface Props {
  word: string;
  pronunciation: string;
}

export default function PronunciationCard({ word, pronunciation }: Props) {
  return (
    <div
      className="mt-3 p-3"
      style={{
        backgroundColor: "var(--surface-muted)",
        borderRadius: "var(--radius-xs)",
      }}
    >
      <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
        {pronunciation}
      </p>
    </div>
  );
}
