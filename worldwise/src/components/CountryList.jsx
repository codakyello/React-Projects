import styles from "./CountryList.module.css";
import PropTypes from "prop-types";
import CountryItem from "./CountryItem";

CountryList.propTypes = {
  cities: PropTypes.array,
};
function CountryList() {
  // const countries = [];
  // cities.forEach((curr)=> {
  //     countries.forEach((cur)=> {
  //         if(curr.countryName !== cur.countryName)
  //     })
  // })
  return (
    <div className={styles.countrylist}>
      <CountryItem />
      {/* {.map((city, i) => (
        <CountryItem key={i} />
      ))} */}
    </div>
  );
}

export default CountryList;

// How to check if somehting already exist in a list before
