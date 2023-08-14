import styles from "./CountryItem.module.css";
import PropTypes from "prop-types";

CountryItem.propTypes = {
  country: PropTypes.any,
};

function CountryItem({ country: { country, emoji } }) {
  return (
    <div className={styles.countryitem}>
      <span>{emoji}</span>
      <p>{country}</p>
    </div>
  );
}

export default CountryItem;
