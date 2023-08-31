import { createContext, useContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";

CityProvider.propTypes = {
  children: PropTypes.any,
};

const BASE_URL = "http://localhost:9000";

// It will cause a rerender of the entire app when something is changed.
// We dont know how to pass data from one page to another but we know how to pass from one component to anoter in a page.
// Import state on every page you use it and then use context to bradcast the state.

// 1_ Create Context
const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "finish":
      return {
        ...state,
        isLoading: false,
      };
    case "fetch-cities":
      return {
        ...state,
        cities: action.payload,
      };

    case "add-city":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "get-city":
      if (state.cities.length) {
        console.log("here");
        console.log(state.cities.find((city) => city.id === action.payload));
        return {
          ...state,
          currentCity: state.cities.find((city) => city.id === action.payload),
        };
      }

      return {
        ...state,
        currentCity: action.payload,
      };

    case "delete-city":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    default:
      return new Error("The action type is not defined");
  }
}
//2. Create a provider
function CityProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // console.log(cities);

  useEffect(() => {
    dispatch({ type: "loading" });
    async function getCityData() {
      try {
        const res = await fetch(`${BASE_URL}/cities`);

        //Connect to server
        if (!res.ok) throw new Error("Something went wrong");

        const data = await res.json();
        dispatch({ type: "fetch-cities", payload: data });
        // This ran after the useEffect in the component has been called
      } catch (e) {
        alert(e.message);
      } finally {
        dispatch({ type: "finish" });
      }
    }

    getCityData();
  }, []);

  async function getCity(id) {
    // If useEffect is loaded
    if (cities.length) {
      return dispatch({ type: "get-city", payload: id });
    }

    // In any case this loads first before the useEffect, fectch new data
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "get-city", payload: data });
    } catch (e) {
      alert(e.message);
    } finally {
      dispatch({ type: "loading" });
    }
  }

  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" });
      await fetch(`${BASE_URL}/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: "add-city", payload: newCity });
    } catch (e) {
      alert("There was an error Adding city");
    } finally {
      dispatch({ type: "finish" });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "delete-city", payload: id });
      // setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (e) {
      alert("There was an error Deleting city");
    } finally {
      dispatch({ type: "finish" });
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        deleteCity,
        createCity,
        dispatch,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const cities = useContext(CitiesContext);
  if (!cities)
    throw new Error("You are trying to use a context outside its provider");

  return cities;
}

// eslint-disable-next-line react-refresh/only-export-components
export { CityProvider, useCities };
