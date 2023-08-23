import PropTypes from "prop-types";
import Button from "../../ui/Button";

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
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  id;
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
          <Button type="small">Add to cart</Button>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
