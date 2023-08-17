import styles from "./Button.module.css";
import PropTypes from "prop-types";

Button.propTypes = {
  text: PropTypes.string,
  type: PropTypes.any,
  onClick: PropTypes.func,
  children: PropTypes.string,
  disabled: PropTypes.bool,
};

function Button({ children, type, onClick, disabled }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${styles.btn} ${styles[type]}`}
    >
      {children}
    </button>
  );
}

export default Button;
