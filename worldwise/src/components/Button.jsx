import styles from "./Button.module.css";
import PropTypes from "prop-types";

Button.propTypes = {
  text: PropTypes.string,
  type: PropTypes.any,
};

function Button({ text, type }) {
  return <button className={`${styles.btn} ${styles[type]}`}>{text}</button>;
}

export default Button;
