import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/auth.store";
import { authService } from "../../services/auth.service";
import { useAdminAnimation } from "../../hooks/useAdminAnimation";
import AdminIcon from "../../components/common/AdminIcon";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
}

export default function AdminUsersPage() {
  const { user } = useAuthStore();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const containerRef = useAdminAnimation([users.length], {
    sections: true,
    tableRows: "[data-user-row]",
    staggerItems: "[data-users-section]",
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.getUsers();
      setUsers(data);
    } catch {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadgeColor = (role: string) => {
    return role === "admin"
      ? "#CE82FF"
      : "#58CC02";
  };

  const getRoleBadgeText = (role: string) => {
    return role === "admin" ? "Admin" : "User";
  };

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Header */}
      <div data-users-section className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold" style={{ color: "var(--text-heading)" }}>
            User Management
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-body)" }}>
            View all registered users
          </p>
        </div>
        <div
          className="px-4 py-2 rounded-[8px]"
          style={{ backgroundColor: "var(--neutral-primary-soft)", border: "2px solid var(--border-default)" }}
        >
          <span
            className="text-sm font-bold"
            style={{ color: "var(--text-body-subtle)" }}
          >
            Total: {users.length}
          </span>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div data-users-section
          className="p-3 rounded-[8px] text-sm font-medium"
          style={{ backgroundColor: "rgba(255, 75, 75, 0.1)", color: "#FF4B4B" }}
        >
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div data-users-section className="flex items-center justify-center py-16">
          <div
            className="w-12 h-12 rounded-full animate-spin mx-auto mb-4"
            style={{ border: "4px solid var(--border-default)", borderTopColor: "var(--brand)" }}
          />
          <p style={{ color: "var(--text-body)" }}>Loading users...</p>
        </div>
      ) : (
        <div
          className="rounded-[12px] overflow-hidden"
          style={{ border: "2px solid var(--border-default)" }}
        >
          {/* Desktop table header — hidden on mobile */}
          <div
            className="hidden md:grid grid-cols-12 gap-4 px-4 py-3"
            style={{ backgroundColor: "var(--neutral-bg)", color: "var(--text-body-subtle)" }}
          >
            <div className="col-span-4 font-bold uppercase tracking-wide text-[11px]">User</div>
            <div className="col-span-4 font-bold uppercase tracking-wide text-[11px]">Email</div>
            <div className="col-span-2 font-bold uppercase tracking-wide text-[11px]">Role</div>
            <div className="col-span-2 font-bold uppercase tracking-wide text-[11px] text-right">Joined</div>
          </div>

          <div className="divide-y" style={{ borderColor: "var(--border-default)" }}>
            {users.map((u) => (
              <div
                key={u._id}
                data-user-row
                className="px-4 py-3 hover:bg-black/5 transition-colors cursor-pointer"
                style={{ backgroundColor: "var(--neutral-primary-soft)" }}
              >
                {/* Desktop layout */}
                <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-[12px] flex items-center justify-center text-sm font-bold text-white shrink-0"
                        style={{ backgroundColor: "var(--brand)", boxShadow: "0 2px 0 var(--brand-strong)" }}
                      >
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-sm" style={{ color: "var(--text-heading)" }}>{u.name}</p>
                        <p className="text-[11px] truncate" style={{ color: "var(--text-body-subtle)" }}>ID: {u._id}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-4 text-sm" style={{ color: "var(--text-body)" }}>{u.email}</div>
                  <div className="col-span-2">
                    <span
                      className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase"
                      style={{ backgroundColor: `${getRoleBadgeColor(u.role)}20`, color: getRoleBadgeColor(u.role) }}
                    >
                      {getRoleBadgeText(u.role)}
                    </span>
                  </div>
                  <div className="col-span-2 text-right">
                    <span className="text-xs" style={{ color: "var(--text-body-subtle)" }}>
                      {new Date(u.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                    </span>
                  </div>
                </div>

                {/* Mobile layout — card style */}
                <div className="md:hidden flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-[12px] flex items-center justify-center text-sm font-bold text-white shrink-0"
                    style={{ backgroundColor: "var(--brand)", boxShadow: "0 2px 0 var(--brand-strong)" }}
                  >
                    {u.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm truncate" style={{ color: "var(--text-heading)" }}>{u.name}</p>
                      <span
                        className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase shrink-0"
                        style={{ backgroundColor: `${getRoleBadgeColor(u.role)}20`, color: getRoleBadgeColor(u.role) }}
                      >
                        {getRoleBadgeText(u.role)}
                      </span>
                    </div>
                    <p className="text-xs truncate" style={{ color: "var(--text-body-subtle)" }}>{u.email}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {users.length === 0 && !loading && (
            <div data-users-section className="text-center py-16">
              <AdminIcon name="users" size={56} className="mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text-heading)" }}>No users yet</h3>
              <p style={{ color: "var(--text-body)" }}>Users will appear here when they register</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}