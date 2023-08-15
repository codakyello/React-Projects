import styles from "./Map.module.css";
import { useNavigate } from "react-router-dom";
function Map() {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate("form")} className={styles.map}>
      Map
    </div>
  );
}

export default Map;
