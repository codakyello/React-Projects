import PropTypes from "prop-types";
import { formatCurrency } from "../../utils/helpers";

OrderItem.propTypes = {
  item: PropTypes.object,
  isLoadingIngredients: PropTypes.any,
  ingredients: PropTypes.any,
};

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;
  isLoadingIngredients, ingredients;
  return (
    <li className="py-3">
      <div className="gap flex items-center justify-between gap-4 text-sm">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
