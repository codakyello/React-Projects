import SideBar from "../components/SideBar";
import Map from "../components/Map";
import styles from "./AppLayout.module.css";
import { CityProvider } from "../contexts/CitiesContext";

function AppLayout() {
  return (
    <div className={styles.app}>
      <CityProvider>
        <SideBar />
        <Map />
      </CityProvider>
    </div>
  );
}

export default AppLayout;
