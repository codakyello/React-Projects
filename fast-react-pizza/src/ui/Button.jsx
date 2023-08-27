import PropTypes from "prop-types";
import { Link } from "react-router-dom";

Button.propTypes = {
  children: PropTypes.string,
  disabled: PropTypes.bool,
  to: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

function Button({ children, to, disabled, type, onClick }) {
  const styles = {
    base: "text-stone 800 text-sm inline-block rounded-full  font-semibold uppercase tracking-wide transition-colors duration-300 disabled:cursor-not-allowed bg-yellow-400 hover:bg-yellow-300 focus-visible:bg-yellow-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-yellow-300 focus-visible:ring-offset-2bg-yellow-400 disabled:hover:bg-yellow-400",

    primary: "px-4 py-3 md:px-6 md:py-4",

    secondary:
      " border-2 text-stone-400 transition-color border-stone-300, px-4 py-2.5 md:px-6 md:py-3.5 focus:bg-stone-300 focus:outline-300 hover:text-stone-800 focus:ring-stone-200 hover:bg-stone-300 !bg-transparent",

    small: "px-4 py-1.5 md:px-5 md:py- text-sm",
    round: "px-2.5 py-1 md:px-3.5 md:py-2 text-sm",
  };
  if (to)
    return (
      <Link to={to} className={`${styles.base} ${styles[type]}`}>
        {children}
      </Link>
    );
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles.base} ${styles[type]}`}
    >
      {children}
    </button>
  );
}

export default Button;
