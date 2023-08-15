import styles from "./Button.module.css";
import PropTypes from "prop-types";

Button.propTypes = {
  text: PropTypes.string,
  type: PropTypes.any,
  onClick: PropTypes.func,
  children: PropTypes.string,
};

function Button({ children, type, onClick }) {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}

export default Button;
