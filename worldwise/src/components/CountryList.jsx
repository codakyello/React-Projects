import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";
import Message from "./Message";

export default function CountryList() {
  const { cities, isLoading } = useCities();

  const countries = cities.reduce((acc, curr) => {
    if (!acc.map((el) => el.country).includes(curr.country)) {
      return [...acc, { country: curr.country, emoji: curr.emoji }];
    } else return acc;
  }, []);

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  return (
    <div className={styles.countrylist}>
      {countries.map((country, i) => (
        <CountryItem key={i} country={country} />
      ))}
    </div>
  );
}
