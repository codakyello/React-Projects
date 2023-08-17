import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
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

//2. Create a provider
function CityProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    setIsLoading(true);
    async function getCityData() {
      try {
        const res = await fetch(`${BASE_URL}/cities`);

        //Connect to server
        if (!res.ok) throw new Error("Something went wrong");

        const data = await res.json();
        setCities(data);
        // This ran after the useEffect in the component has been called
      } catch (e) {
        alert(e.message);
      } finally {
        setIsLoading(false);
      }
    }

    getCityData();
  }, []);

  async function getCity(id) {
    // If useEffect is loaded
    if (cities.length) {
      return setCurrentCity(cities.find((city) => city.id === id));
    }

    // In any case this loads first before the useEffect, fectch new data
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (e) {
      alert(e.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      await fetch(`${BASE_URL}/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setCities((cities) => [...cities, newCity]);
    } catch (e) {
      alert("There was an error Adding city");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setIsLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (e) {
      alert("There was an error Deleting city");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        setCities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
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
