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
          className="mt-6 px-8 py-4 rounded-lg font-bold text-sm transition-all"
          style={{
            backgroundColor: "var(--brand)",
            color: "white", // Đảm bảo text màu trắng
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px 32px",
            fontSize: "16px",
            fontWeight: "700",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            transition: "all 0.3s ease",
            width: "auto",
            minWidth: "200px",
            maxWidth: "280px",
          }}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
