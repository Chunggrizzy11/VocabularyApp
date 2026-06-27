import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { useAuthStore } from "./store/auth.store";
import { hydrateVolume } from "./store/volume.store";
import Loading from "./components/common/Loading";

// Hydrate volume from localStorage on app start
hydrateVolume();

function App() {
  const checkAuth = useAuthStore((s) => s.checkAuth);
  const isLoading = useAuthStore((s) => s.isLoading);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Wait for auth check before rendering any routes
  if (isLoading) {
    return <Loading />;
  }

  return <AppRoutes />;
}

export default App;