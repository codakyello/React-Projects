import styles from "./CityItem.module.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

CityItem.propTypes = {
  city: PropTypes.object.isRequired,
};

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city: { cityName, date, id, position, emoji } }) {
  return (
    <li>
      <Link
        className={`${styles.cityItem}`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button
          className={styles.deleteBtn}
          onClick={() => {
            console.log(date);
          }}
        >
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
