import PropTypes from "prop-types";
import { Link } from "react-router-dom";

Button.propTypes = {
  children: PropTypes.string,
  disabled: PropTypes.bool,
  to: PropTypes.string,
  type: PropTypes.string,
};

function Button({ children, to, disabled, type }) {
  const styles = {
    base: "text-stone 800  inline-block rounded-full bg-yellow-400 font-semibold uppercase tracking-wide transition-colors duration-300 hover:bg-yellow-300 focus-visible:bg-yellow-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-yellow-300 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:hover:bg-yellow-400",

    primary: "px-4 py-3 md:px-6 md:py-4",
    small: "px-4 py-1.5 md:px-5 md:py-2.5 text-sm",
  };
  if (to)
    return (
      <Link
        to={to}
        className={`${styles.base} ${
          type === "primary" ? styles.primary : styles.small
        }`}
      >
        {children}
      </Link>
    );
  return (
    <button
      disabled={disabled}
      className={`${styles.base} ${
        type === "primary" ? styles.primary : styles.small
      }`}
    >
      {children}
    </button>
  );
}

export default Button;
