import { Outlet } from "react-router-dom";
import LandingNavbar from "../components/landing/LandingNavbar";
import LandingFooter from "../components/landing/LandingFooter";

export default function LandingLayout() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--neutral-primary-soft)" }}
    >
      <LandingNavbar />
      <main className="flex-1 pt-16 md:pt-20">
        <Outlet />
      </main>
      <LandingFooter />
    </div>
  );
}