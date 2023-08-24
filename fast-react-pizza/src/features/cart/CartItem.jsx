import PropTypes from "prop-types";
import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";

CartItem.propTypes = {
  item: PropTypes.object,
};

function CartItem({ item }) {
  const { name, quantity, totalPrice } = item;

  return (
    <li className="justify-between py-3 sm:flex sm:items-center">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p>{formatCurrency(totalPrice)}</p>
        <Button type="small"> Delete</Button>
      </div>
    </li>
  );
}

export default CartItem;
