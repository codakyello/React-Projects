import { useState } from "react";
import Item from "./item";

export default function PackingList({
  items,
  removeItem,
  checkItem,
  clearList,
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description") {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }
  if (sortBy === "packed") {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.isPacked) - Number(b.isPacked));
  }

  return (
    <>
      <div className="list">
        <ul>
          {sortedItems.map((item) => (
            <Item
              item={item}
              removeItem={removeItem}
              checkItem={checkItem}
              key={item.id}
            />
          ))}
        </ul>
        <div className="sort">
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
            }}
          >
            <option value="input">Sort by input Order</option>
            <option value="description">Sort by description</option>
            <option value="packed">Sort by packed status</option>
          </select>

          <button
            onClick={() => {
              clearList();
            }}
          >
            {" "}
            Clear List
          </button>
        </div>
      </div>
    </>
  );
}
