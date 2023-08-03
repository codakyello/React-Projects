import { useState } from "react";
import Logo from "./logo";
import Form from "./form";
import PackingList from "./packing";
import Stats from "./stats";

export default function App() {
  const [items, setItems] = useState([]);

  return (
    <div className="container">
      <Logo />
      <Form
        updateList={(item) => {
          setItems((items) => [...items, item]);
        }}
      />
      <PackingList
        items={items}
        removeItem={(id) => {
          setItems((items) => items.filter((item) => item.id !== id));
        }}
        checkItem={(id) => {
          setItems((items) =>
            items.map((item) =>
              item.id === id ? { ...item, isPacked: !item.isPacked } : item
            )
          );
        }}
        clearList={() => {
          if (items.length > 0) {
            const confirmed = window.confirm(
              "Are you sure you want to clear your items?"
            );
            confirmed && setItems([]);
          }
        }}
        sortList={(order) => {
          console.log(order);
        }}
      />
      <Stats items={items} />
    </div>
  );
}
