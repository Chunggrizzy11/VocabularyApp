import { useState } from "react";
import { Outlet } from "react-router-dom";
import MobileNav from "../components/common/MobileNav";
import Sidebar from "../components/common/Sidebar";

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--neutral-primary-soft)" }}>
      <MobileNav />
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((prev) => !prev)} />

      <main
        className={`px-4 py-4 pb-20 md:px-8 md:py-6 md:pb-6 transition-all duration-300 ease-in-out ${
          collapsed ? "md:ml-0" : "md:ml-[220px]"
        }`}
        style={{ minHeight: "100vh" }}
      >
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
