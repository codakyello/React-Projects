import styles from "./CountryItem.module.css";

function CountryItem() {
  return (
    <div className={styles.countryitem}>
      <span>PT</span>
      <p>Portugal</p>
    </div>
  );
}

export default CountryItem;
