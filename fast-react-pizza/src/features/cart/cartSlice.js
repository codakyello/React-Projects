export default function cartReducer(state = [], action) {
  switch (action.type) {
    case "CART/ADD":
      return [...state, action.payload];

    case "CART/CLEAR":
      return [];

    case "CART/DEL":
      return state.filter((item) => item.pizzaId !== action.payload);

    case "CART/INC": {
      const quantity =
        state.find((item) => item.pizzaId === action.payload).quantity + 1;
      return state.map((item) =>
        action.payload === item.pizzaId
          ? {
              ...item,
              quantity,
              totalPrice: item.unitPrice * quantity,
            }
          : item,
      );
    }

    case "CART/DEC": {
      const quantity =
        state.find((item) => item.pizzaId === action.payload).quantity - 1;
      if (quantity < 1)
        return state.filter((item) => item.pizzaId !== action.payload);
      return state.map((item) =>
        action.payload === item.pizzaId
          ? {
              ...item,
              quantity,
              totalPrice: item.unitPrice * quantity,
            }
          : item,
      );
    }

    default:
      return state;
  }
}

export function cartAdd(item) {
  return { type: "CART/ADD", payload: item };
}
export function cartDEL(id) {
  return { type: "CART/DEL", payload: id };
}
export function cartINC(id) {
  return { type: "CART/INC", payload: id };
}
export function cartDEC(id) {
  return { type: "CART/DEC", payload: id };
}
export function cartCLEAR() {
  return { type: "CART/CLEAR" };
}

export function getTotalPrice(state) {
  return state.cart.reduce((acc, curr) => acc + curr.totalPrice, 0);
}

export function getTotalQuantity(state) {
  return state.cart.reduce((acc, curr) => acc + curr.quantity, 0);
}
