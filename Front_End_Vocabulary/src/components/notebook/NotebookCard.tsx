import { Link } from "react-router-dom";
import type { INotebook } from "../../types/notebook";

interface NotebookCardProps {
  notebook: INotebook;
}

export default function NotebookCard({ notebook }: NotebookCardProps) {
  return (
    <Link
      to={`/notebooks/${notebook._id}`}
      className="block card hover:shadow-lg transition-shadow p-4 sm:p-5"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-brand-softer flex items-center justify-center">
          <svg className="w-6 h-6" style={{ color: "var(--brand)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-base sm:text-lg truncate" style={{ color: "var(--text-heading)" }}>
            {notebook.name}
          </h3>
          <p className="text-xs sm:text-sm truncate" style={{ color: "var(--text-body-subtle)" }}>
            {notebook.description || "Personal vocabulary collection"}
          </p>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t" style={{ borderColor: "var(--border-subtle)" }}>
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <span style={{ color: "var(--text-body-subtle)" }}>Words: 0</span>
          <span style={{ color: "var(--text-body-subtle)" }}>Last updated: --</span>
        </div>
      </div>
    </Link>
  );
}