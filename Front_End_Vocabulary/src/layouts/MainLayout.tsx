import Navbar from "../components/common/Navbar";
import MobileNav from "../components/common/MobileNav";

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--neutral-primary-soft)" }}>
      <Navbar />
      <MobileNav />

      {/* Desktop: push right for sidebar. Mobile: no offset, bottom padding for mobile nav */}
      <main
        className="px-4 py-4 md:ml-[220px] md:px-8 md:py-6 pb-20 md:pb-6"
        style={{ minHeight: "100vh" }}
      >
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
