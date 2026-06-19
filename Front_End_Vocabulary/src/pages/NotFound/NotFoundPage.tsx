import { Link } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import Icon from "../../components/common/Icon";

export default function NotFoundPage() {
  return (
    <MainLayout>
      <div className="max-w-md mx-auto text-center py-16 animate-fade-up">
        <Icon name="search" size={60} color="var(--text-body-subtle)" />
        <h1 className="text-[36px] font-extrabold mt-4" style={{ color: "var(--text-heading)" }}>
          Page not found
        </h1>
        <p className="mt-2" style={{ color: "var(--text-body)" }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 mt-8 font-bold text-sm uppercase tracking-wide no-underline"
          style={{
            padding: "14px 20px",
            height: "48px",
            backgroundColor: "var(--brand)",
            color: "#FFFFFF",
            borderRadius: "var(--radius-default)",
            boxShadow: "0 4px 0 var(--brand-strong)",
          }}
        >
          ← Back to Home
        </Link>
      </div>
    </MainLayout>
  );
}
