import React from "react";
import ReactDom from "react-dom/client";
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
    key: 1,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
    key: 2,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
    key: 3,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
    key: 4,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
    key: 5,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
    key: 6,
  },
];

function App() {
  return (
    <div className="container">
      <header className="header">
        <h1>Fast React Pizza co.</h1>
      </header>
      <Menu />
      <Footer />
    </div>
  );
}

function Menu() {
  return (
    <div className="menu">
      <h2 className="menu__header">Our menu</h2>
      {pizzaData.length > 0 ? (
        <>
          <p className="description">
            Authentic Italian cuisine, 6 creative dishes to choose from. All
            from our stone oven, all orgainc, all delicious
          </p>
          <ul className="menu__list">
            {pizzaData.map((menu) => {
              return <MenuItem menuObj={menu} key={menu.key} />;
            })}
          </ul>
        </>
      ) : (
        <p>We're still working on our menu. Please come back later</p>
      )}
    </div>
  );
}
function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 21 - 1;
  const isOpen = hour >= openHour && hour <= closeHour;
  return (
    <footer className="footer order">
      <p>
        {isOpen
          ? `We\'re open until ${
              closeHour + 1
            }:00. Come visit us or order online`
          : `Closed`}
      </p>
      <button className="btn">Order now</button>
    </footer>
  );
}

function MenuItem({ menuObj }) {
  return (
    <li className={`menu__item ${menuObj.soldOut ? "sold-out" : ""}`}>
      <img className="menu__img" src={menuObj.photoName} alt="pizza img" />
      <div className="menu__description-box">
        <h3 className="menu__name">{menuObj.name}</h3>
        <p className="menu__description">{menuObj.ingredients}</p>
        <span className="price">
          {!menuObj.soldOut ? menuObj.price : "SOLD OUT"}
        </span>
      </div>
    </li>
  );
}

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
