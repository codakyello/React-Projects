import styles from "./Cta.module.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

Cta.propTypes = {
  text: PropTypes.string,
  to: PropTypes.any,
};

function Cta({ to, text }) {
  return (
    <Link to={to} className={styles.cta}>
      {text}
    </Link>
  );
}

export default Cta;
