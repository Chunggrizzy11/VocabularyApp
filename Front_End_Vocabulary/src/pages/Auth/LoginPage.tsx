import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import Icon from "../../components/common/Icon";
import { validateLoginForm } from "../../utils/validation";
import logo from "../../assets/images/Logo.png";

export default function LoginPage() {
  const { login, isLoading, error, fieldErrors: serverFieldErrors, clearError } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Kiểm tra token + role ngay khi mount — redirect theo role
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      const { user, checkAuth } = useAuthStore.getState();
      if (user) {
        window.location.href = user.role === "admin" ? "/admin" : "/";
      } else {
        // Chưa hydrate user → fetch từ API rồi mới redirect
        checkAuth().then(() => {
          const u = useAuthStore.getState().user;
          window.location.href = u?.role === "admin" ? "/admin" : "/";
        });
      }
    }
  }, []);

  const clearField = (field: string) => {
    setFieldErrors(prev => { const n = {...prev}; delete n[field]; return n; });
    clearError();
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    clearField("email");
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    clearField("password");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setFieldErrors({});

    const clientErrors = validateLoginForm(email, password);
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      return;
    }

    try {
      await login(email, password);
      // Redirect dựa trên role — admin vào thẳng admin page
      const user = useAuthStore.getState().user;
      window.location.href = user?.role === "admin" ? "/admin" : "/";
    } catch {
      // error handled by store
    }
  };

  // Merge field errors from store
  const mergedFieldErrors = { ...fieldErrors };
  if (serverFieldErrors) {
    Object.assign(mergedFieldErrors, serverFieldErrors);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-4 md:p-6" style={{ backgroundColor: "var(--neutral-bg)" }}>
      <div
        className="w-full max-w-md rounded-[12px] p-4 sm:p-8"
        style={{
          backgroundColor: "var(--neutral-primary-soft)",
          border: "2px solid var(--border-default)",
        }}
      >
        {/* Logo / Brand */}
        <div className="text-center mb-6 sm:mb-8">
          <img
            src={logo}
            alt="Parroto"
            className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-[12px] object-cover"
            style={{ boxShadow: "0 4px 0 var(--brand-strong)" }}
          />
          <h1 className="font-extrabold mt-3 sm:mt-4" style={{ color: "var(--text-heading)", fontSize: "clamp(1.1rem, 5vw, 1.75rem)" }}>
            Welcome Parroto-Vocabulary
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-body)" }}>
            Sign in to continue learning
          </p>
        </div>

        {/* Error */}
        {error && (
          <div
            className="flex items-center gap-2 p-3 mb-4 rounded-[8px] text-sm font-medium"
            style={{
              backgroundColor: "rgba(255, 75, 75, 0.1)",
              color: "#FF4B4B",
              border: "1px solid rgba(255, 75, 75, 0.2)",
            }}
          >
            <Icon name="alert" size={16} color="#FF4B4B" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-bold mb-1.5" style={{ color: "var(--text-heading)" }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 rounded-[8px] text-sm outline-none transition-colors duration-200"
              style={{
                backgroundColor: "var(--neutral-bg)",
                border: "2px solid",
                borderColor: mergedFieldErrors.email ? "#FF4B4B" : "var(--border-default)",
                color: "var(--text-heading)",
              }}
              onFocus={(e) => !mergedFieldErrors.email && (e.target.style.borderColor = "var(--brand)")}
              onBlur={(e) => !mergedFieldErrors.email && (e.target.style.borderColor = "var(--border-default)")}
            />
            {mergedFieldErrors.email && (
              <p className="text-xs mt-1 font-medium" style={{ color: "#FF4B4B" }}>
                <Icon name="alert" size={12} color="#FF4B4B" /> {mergedFieldErrors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-bold mb-1.5" style={{ color: "var(--text-heading)" }}>
              Mật khẩu
            </label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="••••••••"
              required
              minLength={6}
              className="w-full px-4 py-3 rounded-[8px] text-sm outline-none transition-colors duration-200"
              style={{
                backgroundColor: "var(--neutral-bg)",
                border: "2px solid",
                borderColor: mergedFieldErrors.password ? "#FF4B4B" : "var(--border-default)",
                color: "var(--text-heading)",
              }}
              onFocus={(e) => !mergedFieldErrors.password && (e.target.style.borderColor = "var(--brand)")}
              onBlur={(e) => !mergedFieldErrors.password && (e.target.style.borderColor = "var(--border-default)")}
            />
            {mergedFieldErrors.password && (
              <p className="text-xs mt-1 font-medium" style={{ color: "#FF4B4B" }}>
                <Icon name="alert" size={12} color="#FF4B4B" /> {mergedFieldErrors.password}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full font-bold text-sm uppercase tracking-wide py-3 rounded-[8px] transition-all duration-200"
            style={{
              backgroundColor: "var(--brand)",
              color: "#FFFFFF",
              boxShadow: "0 4px 0 var(--brand-strong)",
              opacity: isLoading ? 0.6 : 1,
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Register link */}
        <p className="text-center text-sm mt-6" style={{ color: "var(--text-body)" }}>
          Don't have an account?{" "}
          <Link to="/register" className="font-bold no-underline" style={{ color: "var(--brand)" }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
