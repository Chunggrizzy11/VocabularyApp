import Navbar from "../components/common/Navbar";

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--neutral-primary-soft)" }}>
      <Navbar />
      <main
        className="ml-[220px] px-6 py-6"
        style={{ minHeight: "100vh" }}
      >
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
