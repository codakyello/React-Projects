import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/HomePage";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import { useEffect, useState } from "react";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import { Navigate } from "react-router-dom";

const BASE_URL = "http://localhost:9000";
export default function App() {
  const [cities, setcities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log(isLoading);
  useEffect(() => {
    async function getCityData() {
      setIsLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/cities`);

        //Connect to server
        if (!res.ok) throw new Error("Something went wrong");

        const data = await res.json();
        setcities(data);
      } catch (e) {
        alert(e.message);
      } finally {
        setIsLoading(false);
      }
    }

    getCityData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index="/" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<Navigate replace to="cities" />} />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path="countries" element={<CountryList />} />
          <Route path="form" element={<p>Form</p>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}