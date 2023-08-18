import SideBar from "../components/SideBar";
import Map from "../components/Map";
import styles from "./AppLayout.module.css";
import { CityProvider } from "../contexts/CitiesContext";
import ProtectedRoute from "./ProtectedRoute";

function AppLayout() {
  return (
    <div className={styles.app}>
      <ProtectedRoute>
        <CityProvider>
          <SideBar />
          <Map />
        </CityProvider>
      </ProtectedRoute>
    </div>
  );
}

export default AppLayout;
