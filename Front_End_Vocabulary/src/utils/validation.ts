const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN_LENGTH = 6;
const NAME_MIN_LENGTH = 2;

export interface FieldErrors {
  [key: string]: string;
}

export function validateEmail(email: string): string {
  if (!email.trim()) return "Vui lòng nhập email";
  if (!EMAIL_REGEX.test(email.trim())) return "Email không đúng định dạng (vd: name@example.com)";
  return "";
}

export function validatePassword(password: string): string {
  if (!password) return "Vui lòng nhập mật khẩu";
  if (password.length < PASSWORD_MIN_LENGTH) return `Mật khẩu phải có ít nhất ${PASSWORD_MIN_LENGTH} ký tự`;
  return "";
}

export function validateName(name: string): string {
  if (!name.trim()) return "Vui lòng nhập họ tên";
  if (name.trim().length < NAME_MIN_LENGTH) return "Họ tên phải có ít nhất 2 ký tự";
  if (name.trim().length > 50) return "Họ tên không được vượt quá 50 ký tự";
  return "";
}

export function validateConfirmPassword(password: string, confirmPassword: string): string {
  if (!confirmPassword) return "Vui lòng nhập lại mật khẩu";
  if (password !== confirmPassword) return "Mật khẩu nhập lại không khớp";
  return "";
}

export function validateLoginForm(email: string, password: string): FieldErrors {
  const errors: FieldErrors = {};
  const emailErr = validateEmail(email);
  if (emailErr) errors.email = emailErr;
  const passErr = validatePassword(password);
  if (passErr) errors.password = passErr;
  return errors;
}

export function validateRegisterForm(name: string, email: string, password: string, confirmPassword: string): FieldErrors {
  const errors: FieldErrors = {};
  const nameErr = validateName(name);
  if (nameErr) errors.name = nameErr;
  const emailErr = validateEmail(email);
  if (emailErr) errors.email = emailErr;
  const passErr = validatePassword(password);
  if (passErr) errors.password = passErr;
  const confirmErr = validateConfirmPassword(password, confirmPassword);
  if (confirmErr) errors.confirmPassword = confirmErr;
  return errors;
}

export function getFieldError(errors: FieldErrors, field: string): string {
  return errors[field] || "";
}
