/* eslint-disable react-refresh/only-export-components */
// Test ID: IIDSAT
import { useLoaderData, useFetcher } from "react-router-dom";
import { getOrder, updateOrder } from "../../services/apiRestaurant";
import OrderItem from "./OrderItem";
import Button from "../../ui/Button";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import store from "../../store";
import { useEffect } from "react";

function Order() {
  const data = useLoaderData();
  const order = { ...data };

  const fetcher = useFetcher();

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
    },
    [fetcher],
  );

  const {
    id,
    cart,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 font-semibold uppercase tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 py-5 font-medium">
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="dive-stone-200 divide-y">
        {cart.map((item, index) => (
          <OrderItem
            item={item}
            key={index}
            isLoadingIngredients={fetcher.state === "loading"}
            ingredients={
              fetcher.data?.find((el) => el.id === item.pizzaId).ingredients ??
              []
            }
          />
        ))}
      </ul>
      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className=" text-sm font-black text-stone-600">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority && (
        <fetcher.Form method="PATCH">
          <Button type="primary">Make Priority</Button>
        </fetcher.Form>
      )}
    </div>
  );
}

export async function loader({ params }) {
  const { userName } = store.getState().user;
  if (!userName) return null;
  return await getOrder(params.orderId);
}

export async function action({ params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);

  // Refresh the page and get the updated data.
  return null;
}
export default Order;
