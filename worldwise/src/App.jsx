import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/HomePage";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import { Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/FakeAuthContext";
import City from "./components/City";
import Form from "./components/Form";

export default function App() {
  // With this we will fix the entire app updating whenever a state is changed.
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index="/" element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />

          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="cities" />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="cities" element={<CityList />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
