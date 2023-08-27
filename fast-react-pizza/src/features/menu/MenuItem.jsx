import PropTypes from "prop-types";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { cartAdd } from "../cart/CartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/updateItemQuantity";

MenuItem.propTypes = {
  pizza: PropTypes.object,
};

function formatCurrency(price) {
  const formattedPrice = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
  }).format(price);
  return formattedPrice;
}

function MenuItem({ pizza }) {
  const {
    id: pizzaId,
    name,
    unitPrice,
    ingredients,
    soldOut,
    imageUrl,
  } = pizza;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const cartItem = cart.find((item) => item.pizzaId === pizzaId);

  return (
    <li className="flex flex-1 gap-4 py-2">
      <img
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
        src={imageUrl}
        alt={name}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-ston-500 text-sm uppercase">Sold out</p>
          )}
          {cartItem && (
            <div className="flex items-center justify-between sm:gap-6">
              <UpdateItemQuantity pizzaId={pizzaId} />
              <DeleteItem pizzaId={pizzaId} />
            </div>
          )}
          {!soldOut && !cartItem && (
            <Button
              disabled={soldOut}
              onClick={() => {
                const newItem = {
                  pizzaId,
                  name,
                  quantity: 1,
                  unitPrice,
                  totalPrice: unitPrice,
                  ingredients,
                };

                dispatch(cartAdd(newItem));
              }}
              type="small"
            >
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
