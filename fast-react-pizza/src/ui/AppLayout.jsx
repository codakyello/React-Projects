import Header from "./Header";
import Loader from "./Loader";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";

function AppLayout() {
  const navigation = useNavigation();
  return (
    <div className="layout">
      {navigation.state === "loading" && <Loader />}
      {navigation.state === "idle" || navigation.state === "submitting" ? (
        <>
          <Header />
          <main>
            <Outlet />
          </main>
          <CartOverview />
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default AppLayout;
