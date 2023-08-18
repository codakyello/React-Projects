import { useContext, createContext, useReducer } from "react";
import PropTypes from "prop-types";

AuthProvider.propTypes = {
  children: PropTypes.any,
};

const initialState = {
  isAuthenticated: false,
  user: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case "logout":
      return initialState;
    default:
      return new Error("Unknown Action");
  }
}

const FAKE_USER = {
  name: "codakYello",
  email: "olaoluwaolorede8@gmail.com",
  password: "olaola03",
  avatar:
    "https://pbs.twimg.com/profile_images/1672878921891676162/XFtHZkfe_400x400.jpg",
};
// Create a context

const AuthContext = createContext();
// Create a provider

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      return dispatch({ type: "login", payload: FAKE_USER });

    alert("Email or Password Incorrect");
  }

  function logout() {
    if (user) {
      dispatch({ type: "logout" });
    }
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
// Return the context with a hook
function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("You are trying to use Auth outside of its provider");
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { useAuth, AuthProvider };
