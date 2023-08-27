import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { cartDEL } from "./CartSlice";

DeleteItem.propTypes = {
  pizzaId: PropTypes.any,
};

function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();
  return (
    <Button onClick={() => dispatch(cartDEL(pizzaId))} type="small">
      Delete
    </Button>
  );
}

export default DeleteItem;
