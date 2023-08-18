import PageNav from "../components/PageNav";
import styles from "./HomePage.module.css";
import Cta from "../components/Cta";
// import { Link } from "react-router-dom";

function HomePage() {
  return (
    <header className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          You travel the world.
          <br />
          Worldwise keeps track of your adventures.
        </h1>
        <h2>
          A wolrd map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        <Cta text={"Start tracking now"} to="/login" />
      </section>
    </header>
  );
}

export default HomePage;
