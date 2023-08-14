import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Spinner from "./Spinner";

import PropTypes from "prop-types";

CountryList.propTypes = {
  cities: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default function CountryList({ cities, isLoading }) {
  const countries = cities.reduce((acc, curr) => {
    if (!acc.map((el) => el.country).includes(curr.country)) {
      return [...acc, { country: curr.country, emoji: curr.emoji }];
    } else return acc;
  }, []);

  if (isLoading) return <Spinner />;
  return (
    <div className={styles.countrylist}>
      {countries.map((country, i) => (
        <CountryItem key={i} country={country} />
      ))}
    </div>
  );
}
