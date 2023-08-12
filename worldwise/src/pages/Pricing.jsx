import PageNav from "../components/PageNav";
import styles from "./Pricing.module.css";

function Pricing() {
  return (
    <header className={styles.pricing}>
      <PageNav />
      <section className={styles.hero}>
        <div className={styles.hero__box}>
          <h2>Simple pricing Just $9/month.</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam in
            repellat recusandae excepturi reprehenderit dolorum modi sequi.
          </p>
        </div>
        <img
          className={styles.hero__img}
          src="img-2.jpg"
          alt="overview of a large city with skyscrapers"
        />
      </section>
    </header>
  );
}

export default Pricing;
