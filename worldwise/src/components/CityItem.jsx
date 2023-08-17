import styles from "./CityItem.module.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";

CityItem.propTypes = {
  city: PropTypes.object.isRequired,
  active: PropTypes.bool,
};

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));

// .cityItem--active
// If is active give it a javascript obj else give it ''
function CityItem({ active, city: { cityName, date, id, position, emoji } }) {
  const { deleteCity } = useCities();
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          active ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button
          className={styles.deleteBtn}
          onClick={(e) => {
            e.preventDefault();
            deleteCity(id);
            // Delete where does the state live
            // create a delete function there and call it here
          }}
        >
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
