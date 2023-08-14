import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Spinner from "./Spinner";

import PropTypes from "prop-types";

CityList.propTypes = {
  cities: PropTypes.array,
  isLoading: PropTypes.bool,
};

function CityList({ cities, isLoading }) {
  return (
    <>
      {isLoading && <Spinner />}

      {!isLoading && (
        <ul className={styles.cityList}>
          {cities.map((city, i) => (
            <CityItem key={i} city={city} />
          ))}
        </ul>
      )}
    </>
  );
}

export default CityList;
