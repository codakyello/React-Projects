import Header from "./Header";
import Loader from "./Loader";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";

// So basically before it sees any of the children to render i want it to see the auth clause

function AppLayout() {
  const navigation = useNavigation();
  return (
    <div className="grid h-screen grid-rows-[min-content_1fr_min-content]">
      {navigation.state === "loading" && <Loader />}
      <Header />
      <div className="overflow-scroll">
        <main className=" mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
