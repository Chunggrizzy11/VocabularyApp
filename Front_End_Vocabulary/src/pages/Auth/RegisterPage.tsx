import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import Icon from "../../components/common/Icon";
import { validateRegisterForm } from "../../utils/validation";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, isLoading, error, fieldErrors: serverFieldErrors, clearError } = useAuthStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Redirect về login sau 2s
  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => navigate("/login", { replace: true }), 2000);
      return () => clearTimeout(timer);
    }
  }, [successMsg, navigate]);

  // Merge field errors from store
  useEffect(() => {
    if (serverFieldErrors) {
      setFieldErrors(prev => ({ ...prev, ...serverFieldErrors }));
    }
  }, [serverFieldErrors]);

  const clearFieldError = (field: string) => {
    setFieldErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
    clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(null);
    clearError();

    const clientErrors = validateRegisterForm(name, email, password, confirmPassword);
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      return;
    }
    setFieldErrors({});

    try {
      await register(name, email, password);
      useAuthStore.getState().logout();
      setSuccessMsg("Account created successfully! Redirecting to login...");
    } catch {
      // error + fieldErrors handled by store
    }
  };

  // Merge field errors
  const mergedFieldErrors = { ...fieldErrors };

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
          <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-[12px] flex items-center justify-center" style={{ backgroundColor: "var(--brand)" }}>
            <Icon name="book" size={20} color="#FFFFFF" />
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold mt-3 sm:mt-4" style={{ color: "var(--text-heading)" }}>
            Create Account
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-body)" }}>
            Start your learning journey
          </p>
        </div>

        {/* Success message - MÀU XANH */}
        {successMsg && (
          <div
            className="flex items-center gap-2 p-3 mb-4 rounded-[8px] text-sm font-medium"
            style={{
              backgroundColor: "rgba(88, 204, 2, 0.1)",
              color: "#58CC02",
              border: "1px solid rgba(88, 204, 2, 0.3)",
            }}
          >
            <Icon name="check" size={16} color="#58CC02" />
            {successMsg}
          </div>
        )}

        {/* Server error - MÀU ĐỎ */}
        {error && !successMsg && (
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
          {/* Name */}
          <div>
            <label className="block text-sm font-bold mb-1.5" style={{ color: "var(--text-heading)" }}>
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); clearFieldError("name"); }}
              placeholder="Your name"
              required
              className="w-full px-4 py-3 rounded-[8px] text-sm outline-none transition-colors duration-200"
              style={{
                backgroundColor: "var(--neutral-bg)",
                border: "2px solid",
                borderColor: mergedFieldErrors.name ? "#FF4B4B" : "var(--border-default)",
                color: "var(--text-heading)",
              }}
              onFocus={(e) => !mergedFieldErrors.name && (e.target.style.borderColor = "var(--brand)")}
              onBlur={(e) => !mergedFieldErrors.name && (e.target.style.borderColor = "var(--border-default)")}
            />
            {mergedFieldErrors.name && (
              <p className="text-xs mt-1 font-medium" style={{ color: "#FF4B4B" }}>
                <Icon name="alert" size={12} color="#FF4B4B" /> {mergedFieldErrors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-bold mb-1.5" style={{ color: "var(--text-heading)" }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); clearFieldError("email"); }}
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
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); clearFieldError("password"); }}
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

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-bold mb-1.5" style={{ color: "var(--text-heading)" }}>
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value); clearFieldError("confirmPassword"); }}
              placeholder="••••••••"
              required
              minLength={6}
              className="w-full px-4 py-3 rounded-[8px] text-sm outline-none transition-colors duration-200"
              style={{
                backgroundColor: "var(--neutral-bg)",
                border: "2px solid",
                borderColor: mergedFieldErrors.confirmPassword ? "#FF4B4B" : "var(--border-default)",
                color: "var(--text-heading)",
              }}
              onFocus={(e) => !mergedFieldErrors.confirmPassword && (e.target.style.borderColor = "var(--brand)")}
              onBlur={(e) => !mergedFieldErrors.confirmPassword && (e.target.style.borderColor = "var(--border-default)")}
            />
            {mergedFieldErrors.confirmPassword && (
              <p className="text-xs mt-1 font-medium" style={{ color: "#FF4B4B" }}>
                <Icon name="alert" size={12} color="#FF4B4B" /> {mergedFieldErrors.confirmPassword}
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
            {isLoading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        {/* Login link */}
        <p className="text-center text-sm mt-6" style={{ color: "var(--text-body)" }}>
          Already have an account?{" "}
          <Link to="/login" className="font-bold no-underline" style={{ color: "var(--brand)" }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
