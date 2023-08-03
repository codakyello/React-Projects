import { useState } from "react";

export default function Form({ updateList }) {
  const [value, setValue] = useState(1);
  const [input, setInput] = useState("");
  function handleChange(e) {
    setValue(+e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!input) return;
    updateList({
      id: Date.now(),
      description: `${value} ${input}`,
      isPacked: false,
    });

    setInput("");
    setValue(1);
  }
  return (
    <div className="form" onSubmit={handleSubmit}>
      <form>
        <h3>What do you need for your 😍 trip?</h3>
        <select value={value} onChange={handleChange}>
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          required
          type="text"
          id="item"
          placeholder="Item..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />

        <button type="submit" onClick={handleSubmit}>
          Add
        </button>
      </form>
    </div>
  );
}
