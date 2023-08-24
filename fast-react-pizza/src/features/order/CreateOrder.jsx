/* eslint-disable react-refresh/only-export-components */
// import { useState } from "react";

// https://uibakery.io/regex-library/phone-number
import Button from "../../ui/Button";
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

import { Form, redirect, useNavigation, useActionData } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

fakeCart;
function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();
  const cart = fakeCart;

  return (
    <div>
      <h2>Ready to order? Lets go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input w-full "
            type="text"
            name="customer"
            required
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

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label>Address</label>
          <div className="grow">
            <input
              className="input w-full "
              type="text"
              name="address"
              required
            />
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="focus h-6 w-6 accent-yellow-400"
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to give your order priority?</label>
        </div>

        <div className="grow">
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button type="primary" disabled={isSubmitting}>
            {!isSubmitting ? "Order now" : "Placing order..."}
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
    priority: data.priority === "on",
  };

  const errors = {};
  if (!isValidPhone(order.phone)) errors.phone = "Input a valid phone number";

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  newOrder;
  // With this form data make a request to order/new

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
