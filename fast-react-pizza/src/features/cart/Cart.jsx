import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useSelector, useDispatch } from "react-redux";
import { cartCLEAR } from "./CartSlice";
import EmptyCart from "./EmptyCart";
import { getUser } from "../user/userSlice";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const {userName} = useSelector(getUser);
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;
  return (
    <div>
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2>Your cart, {userName}</h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>
      <div className="mt-6 space-x-2">
        <Button type="primary" to="/order/new">
          Order Pizzas
        </Button>
        <Button onClick={() => dispatch(cartCLEAR())} type="secondary">
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
