import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case "USER/NAME":
      return { ...state, userName: action.payload };
    case "USER/ADDRESS":
      return { ...state, address: action.payload, error: "", loading: false };
    case "error":
      return { ...state, error: action.payload, loading: false };
    case "loading":
      return { ...state, loading: true };
    default:
      return state;
  }
}

export function addUser(user) {
  return { type: "USER/NAME", payload: user };
}

export function addUserAddress() {
  return async function (dispatch) {
    dispatch({ type: "loading" });
    try {
      // 1) We get the user's geolocation position
      const positionObj = await getPosition();
      const position = {
        latitude: positionObj.coords.latitude,
        longitude: positionObj.coords.longitude,
      };

      // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong

      const addressObj = await getAddress(position);
      console.log("success");
      const { locality, city, postcode, countryName } = addressObj;
      const address = `${locality}, ${city}, ${postcode}${countryName}`;
      dispatch({ type: "USER/ADDRESS", payload: address });
    } catch (e) {
      console.log("error");
      dispatch({
        type: "error",
        payload:
          "There was a problem getting your address. Please manually fill this field",
      });
    }

    // 3) Then we return an object with the data that we are interested in

    // return { position, address };
  };
}

export const fetchAddress = createAsyncThunk("USER/ADDRESS", async function () {
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  const addressObj = await getAddress(position);
  const { locality, city, postcode, countryName } = addressObj;

  const address = `${locality}, ${city}, ${postcode}${countryName}`;

  return { position, address };
});

export const getUser = (state) => state.user;
