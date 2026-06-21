import Navbar from "../components/common/Navbar";

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--neutral-primary-soft)" }}>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 md:py-8">
        {children}
      </main>
    </div>
  );
}
