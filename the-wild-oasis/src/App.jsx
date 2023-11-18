import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyle";
import Dashboard from "./pages/Admins/Dashboard";
import Bookings from "./pages/Admins/Bookings";
import Cabins from "./pages/Admins/Cabins";
import Users from "./pages/Admins/Users";
import Settings from "./pages/Admins/Settings";
import Account from "./pages/Admins/Account";
import Login from "./pages/Admins/Login";
import PageNotFound from "./pages/PageNotFound";
import AdminAppLayout from "./pages/Admins/AdminAppLayout";
// import UserAppLayout from "./pages/Users/UserAppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { Toaster } from "react-hot-toast";
import { Toaster } from "sonner";

import CheckIn from "./pages/Admins/CheckIn";
import ProtectedRoute from "./ui/ProtectedRoute";

import { useDarkMode } from "./context/DarkModeContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      retry: 1,
      retryDelay: 2000,
    },
  },
});

function App() {
  const { isDarkMode } = useDarkMode();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<UserAppLayout />}>
            <Route index element={<Navigate replace to="home" />} />
            <Route index path="home" element={<div>Customer Routes</div>} />
          </Route> */}
          {/* <Route path="login" element={<Login />} /> */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AdminAppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="bookings/*" element={<Bookings />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="account" element={<Account />} />
            {/* <Route path="bookings/:id" element={<Booking />} /> */}
            <Route path="checkin/:id" element={<CheckIn />} />
          </Route>
          <Route path="/login" element={<Login />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      {/* <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: { duration: 3000 },
            error: { duration: 5000 },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        /> */}
      {
        <Toaster
          theme={isDarkMode ? "dark" : "light"}
          richColors
          position="top-center"
          offset="8px"
          closeButton={true}
          toastOptions={{
            duration: 3500,
          }}
        />
      }
    </QueryClientProvider>
  );
}

export default App;
