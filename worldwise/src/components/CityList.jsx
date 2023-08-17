import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

function CityList() {
  const {
    cities,
    isLoading,
    currentCity: { id: currentCityId },
  } = useCities();

  // console.log(cities.at(0).emoji);

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  // Show spinner and message
  return (
    <ul className={styles.cityList}>
      {cities.map((city, i) => (
        <CityItem active={currentCityId === city.id} key={i} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
