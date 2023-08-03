export default function Item({ item, removeItem, checkItem }) {
  function Checkbox() {
    return (
      <label>
        <input
          type="checkbox"
          value={item.isPacked}
          defaultChecked={item.isPacked}
          onChange={() => {
            checkItem(item.id);
          }}
        />
      </label>
    );
  }
  return (
    <li>
      <Checkbox />
      <p className={item.isPacked ? "cleared" : ""}>{item.description}</p>
      <button
        onClick={() => {
          removeItem(item.id);
        }}
      >
        &times;
      </button>
    </li>
  );
}
