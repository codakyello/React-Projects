import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./ui/Home";
import Error from "./ui/Error";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";
import Order, {
  action as updatePriorityAction,
  loader as orderLoader,
} from "./features/order/Order";
import AppLayout from "./ui/AppLayout";
import { Provider } from "react-redux";
import store from "./store";
import ProtectedRoutes from "./features/user/ProtectedRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Provider store={store}>
        <AppLayout />
      </Provider>
    ),
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/menu",
        element: (
          <ProtectedRoutes>
            <Menu />
          </ProtectedRoutes>
        ),
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoutes>
            <Cart />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/order/:orderId",
        element: (
          <ProtectedRoutes>
            <Order />
          </ProtectedRoutes>
        ),
        loader: orderLoader,
        action: updatePriorityAction,
        errorElement: <Error />,
      },
      {
        path: "/order/new",
        element: (
          <ProtectedRoutes>
            <CreateOrder />
          </ProtectedRoutes>
        ),
        action: createOrderAction,
        errorElement: <Error />,
      },
    ],
  },
  { path: "*", element: <h1>Not Found</h1> },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
