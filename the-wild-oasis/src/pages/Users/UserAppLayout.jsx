import { Outlet } from "react-router-dom";

function UserAppLayout() {
  return (
    <>
      <header>HEADER</header>
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </>
  );
}

export default UserAppLayout;
