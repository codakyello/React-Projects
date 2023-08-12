import PageNav from "../components/PageNav";
import styles from "./Pricing.module.css";

function Product() {
  return (
    <header className={styles.pricing}>
      <PageNav />
      <section className={styles.hero}>
        <img
          className={styles.hero__img}
          src="img-1.jpg"
          alt="overview of a large city with skyscrapers"
        />

        <div className={styles.hero__box}>
          <h2>About WorldWide.</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est
            dicta illum vero culpa cum quaerat architecto sapiente eius non
            soluta, molestiae nihil laborum, placeat debitis, laboriosam at fuga
            perspiciatis?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
            doloribus libero sunt expedita ratione iusto, magni, id sapiente
            sequi officiis et.
          </p>
        </div>
      </section>
    </header>
  );
}

export default Product;
