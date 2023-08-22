import { createStore } from "redux";

import { configureStore } from "@reduxjs/toolkit";

configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

const intialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

function reducer(state = intialState, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };

    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };

    case "account/requestLoan":
      if (state.loan > 0) return state;
      return { ...state, loan: action.payload };

    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

store.dispatch({ type: "account/deposit", payload: 500 });

console.log("Hey Redux");

console.log(store.getState());
