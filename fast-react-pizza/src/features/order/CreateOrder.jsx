/* eslint-disable react-refresh/only-export-components */
// import { useState } from "react";

// https://uibakery.io/regex-library/phone-number
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

import { Form, redirect, useNavigation, useActionData } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { useSelector, useDispatch } from "react-redux";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { cartCLEAR, getTotalPrice } from "../cart/CartSlice";
import { useState } from "react";
import { addUserAddress, getUser } from "../user/userSlice";

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const {
    userName,
    address,
    error: errorAddress,
    isLoadingAddress,
  } = useSelector(getUser);
  const totalCartPrice = useSelector(getTotalPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="mt-8">
      <h2 className="mb-5">Ready to order? Lets go!</h2>
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input w-full "
            type="text"
            name="customer"
            required
            defaultValue={userName}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label>Phone number</label>
          <div className="grow">
            <input className="input w-full " type="tel" name="phone" required />
            {formErrors?.phone && (
              <p
                className="mt-2 rounded-full bg-red-100 p-2 text-xs text-red-700"
                style={{ color: "red" }}
              >
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label>Address</label>
          <div className="grow">
            <input
              className="input w-full "
              type="text"
              name="address"
              required
              defaultValue={address}
            />

            {errorAddress && (
              <p
                className="mt-2 rounded-full bg-red-100 p-2 text-xs text-red-700"
                style={{ color: "red" }}
              >
                {errorAddress}
              </p>
            )}
          </div>
          {!address && (
            <span className="absolute right-[3px] top-[3px] z-50 sm:right-[3px] sm:top-[5px]">
              <Button
                type="small"
                disabled={isLoadingAddress}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(addUserAddress());
                }}
              >
                {!isLoadingAddress ? "Get Position" : "...Loading"}
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="focus h-6 w-6 accent-yellow-400"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to give your order priority?</label>
        </div>

        <div className="grow">
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
            {!isSubmitting
              ? `Order now from ${formatCurrency(totalPrice)}`
              : "Placing order..."}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  console.log(order);

  const errors = {};
  if (!isValidPhone(order.phone)) errors.phone = "Input a valid phone number";

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  console.log(newOrder);
  store.dispatch(cartCLEAR());
  // With this form data make a request to order/new

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
