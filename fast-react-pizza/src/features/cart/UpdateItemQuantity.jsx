import Button from "../../ui/Button";
import PropTypes from "prop-types";
import { cartDEC, cartINC } from "./CartSlice";
import { useDispatch, useSelector } from "react-redux";
UpdateItemQuantity.propTypes = {
  pizzaId: PropTypes.number,
};

function UpdateItemQuantity({ pizzaId }) {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) =>
    state.cart.find((item) => item.pizzaId === pizzaId),
  );
  return (
    <div className="flex items-center gap-1 md:gap-3">
      <Button
        type="round"
        onClick={() => {
          dispatch(cartDEC(pizzaId));
        }}
      >
        -
      </Button>
      <span className="text-sm font-medium">{cartItem.quantity}</span>
      <Button type="round" onClick={() => dispatch(cartINC(pizzaId))}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
