import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/FakeAuthContext";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/FakeAuthContext";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    login(email, password);
  }

  useEffect(() => {
    setEmail("olaoluwaolorede8@gmail.com");
    setPassword("olaola03");
  }, []);

  useEffect(
    function () {
      if (isAuthenticated) navigate("/app", { replace: true });
    },
    [isAuthenticated, navigate]
  );
  return (
    <main className={styles.loginpage}>
      <PageNav />
      <form onSubmit={handleSubmit}>
        <label htmlFor="my-email" id="email">
          Email address
        </label>
        <input
          value={email}
          placeholder="email address"
          required
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="my-email"
          name="email"
        />

        <label htmlFor="my-password" id="password">
          Password
        </label>
        <input
          value={password}
          placeholder="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="my-password"
          name="password"
        />

        <Button type={"primary"}>Login</Button>
      </form>
    </main>
  );
}

export default Login;
