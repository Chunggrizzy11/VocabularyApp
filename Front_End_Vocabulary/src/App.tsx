import AppRoutes from "./routes/AppRoutes";
import { hydrateVolume } from "./store/volume.store";

// Hydrate volume from localStorage on app start
hydrateVolume();

function App() {
  return <AppRoutes />;
}

export default App;