import styles from "./City.module.css";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "./Button";
import Spinner from "./Spinner";

Country.propTypes = {
  cities: PropTypes.array,
  isLoading: PropTypes.bool,
};

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function Country({ cities, isLoading }) {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  console.log(searchParams.get("lat"));
  setSearchParams;
  if (isLoading) return <Spinner />;
  const { cityName, emoji, date, notes } = cities.find(
    (city) => city.id === +id
  );

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>Cityname</h6>
        <h3>
          {emoji} {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <p>Link</p>
      </div>

      <Button
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
        type="back"
      >
        &larr; Back
      </Button>
    </div>
  );
}

export default Country;
