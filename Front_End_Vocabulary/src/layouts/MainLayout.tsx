import { useState } from "react";
import MobileNav from "../components/common/MobileNav";
import Sidebar from "../components/common/Sidebar";

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--neutral-primary-soft)" }}>
      <MobileNav />
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((prev) => !prev)} />

      {/* Desktop: push right for sidebar. Mobile: no offset, bottom padding for mobile nav */}
      <main
        className={`px-4 py-4 md:px-8 md:py-6 pb-20 md:pb-6 transition-all duration-300 ease-in-out ${
          collapsed ? "md:ml-0" : "md:ml-[220px]"
        }`}
        style={{ minHeight: "100vh" }}
      >
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
