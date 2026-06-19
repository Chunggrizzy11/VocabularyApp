import Icon from "../common/Icon";

interface Props {
  word: string;
  imageUrl?: string;
}

export default function VocabularyImage({ word, imageUrl }: Props) {
  return (
    <div
      className="mt-4 overflow-hidden"
      style={{ borderRadius: "var(--radius-default)" }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={word}
          className="w-full h-40 object-cover"
          style={{ borderRadius: "var(--radius-default)" }}
        />
      ) : (
        <div
          className="w-full h-40 flex items-center justify-center gap-2"
          style={{
            backgroundColor: "var(--neutral-secondary-medium)",
            borderRadius: "var(--radius-default)",
            color: "var(--text-body-subtle)",
            border: "2px solid var(--border-default)",
            fontSize: "14px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.6px",
          }}
        >
          <Icon name="search" size={20} color="var(--text-body-subtle)" /> No image
        </div>
      )}
    </div>
  );
}
