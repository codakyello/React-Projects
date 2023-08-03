export default function Stats({ items }) {
  // Check for the amount that isPacked is true
  const numItems = items.length;
  const numPacked = items.filter((item) => item.isPacked === true).length;
  const percentPacked = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      {/* {isNaN(percentPacked) ? (
          <p>You have 0 items on your list</p>
        ) : (
          <p>
            💼 You have {numItems} items on your list, and you already packed{" "}
            {numPacked} ({percentPacked}%)
          </p>
        )} */}
      <em>
        {percentPacked === 100
          ? "You got everything! Ready to go ✈️"
          : numItems !== 0
          ? `💼 You have ${numItems} items on your list, and you already packed ${numPacked} (${percentPacked}%)`
          : `Start adding some items to your packing list 🚀`}
      </em>
    </footer>
  );
}
