import Icon from "./Icon";
import type { IconName } from "./Icon";

interface Props {
  title: string;
  description?: string;
  icon?: IconName;
  action?: { label: string; onClick: () => void };
}

export default function EmptyState({ title, description, icon = "inbox", action }: Props) {
  return (
    <div
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
      style={{
        backgroundColor: "var(--neutral-primary-soft)",
        borderRadius: "var(--radius-default)",
        border: "2px dashed var(--border-default)",
        maxWidth: "400px",
        margin: "32px auto",
      }}
    >
      <Icon name={icon} size={48} color="var(--text-body-subtle)" />
      <h3 className="text-xl font-bold mt-4" style={{ color: "var(--text-heading)" }}>
        {title}
      </h3>
      {description && (
        <p className="mt-2 text-sm" style={{ color: "var(--text-body)", maxWidth: "280px" }}>
          {description}
        </p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="mt-6 font-bold text-sm uppercase tracking-wide"
          style={{
            padding: "14px 20px",
            height: "48px",
            backgroundColor: "var(--brand)",
            color: "#FFFFFF",
            borderRadius: "var(--radius-default)",
            boxShadow: "0 4px 0 var(--brand-strong)",
            border: "none",
            cursor: "pointer",
          }}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
