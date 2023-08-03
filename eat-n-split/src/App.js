import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

// function app() {
//   const myName = "Ola";
//   call(myName)
// }

// function call(myName) {

//   console.log(myName);
// }

export default function App() {
  const [friends, updateFriends] = useState(initialFriends);
  const [selected, setSelected] = useState("");

  const addFriend = function (newFriend) {
    updateFriends((friends) => [...friends, newFriend]);
  };

  const changeBalance = function (id, balance) {
    updateFriends((friends) =>
      friends.map((friend) =>
        friend.id === id
          ? {
              id: friend.id,
              name: friend.name,
              image: friend.image,
              balance: balance,
            }
          : friend
      )
    );
  };

  return (
    <div className="app">
      <div className="sidebar">
        <ul>
          {friends.map((friend) => (
            <li>
              <Friend
                setSelected={(id) => setSelected(id)}
                selected={selected}
                friend={friend}
              />
            </li>
          ))}
        </ul>
        <AddFriend updateList={addFriend} setSelected={setSelected} />
      </div>
      <div>
        <SplitBill
          selected={selected}
          changeBalance={changeBalance}
          friends={friends}
        />
      </div>
    </div>
  );
}

function Friend({
  setSelected,
  friend: { balance, name, image, id },
  selected,
}) {
  const isSelected = selected === id;

  return (
    <div className={`friend ${isSelected ? "selected" : ""}`}>
      <img className="friend__img" alt="userImg" src={image} />

      <h3>{name}</h3>
      <button
        onClick={() => {
          setSelected(selected === id ? null : id);
        }}
        className="button"
      >
        {isSelected ? "Close" : "Select"}
      </button>

      {balance > 0 && (
        <p className="credit">
          {name} owes you ${balance}
        </p>
      )}
      {balance < 0 && (
        <p className="debit">
          You owe {name} ${Math.abs(balance)}
        </p>
      )}
      {balance === 0 && <p className="even">You and {name} are even</p>}
    </div>
  );
}

function AddFriend({ updateList, setSelected }) {
  const [friendName, setName] = useState("");
  const [imageUrl, setUrl] = useState("");
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="add-friend">
      <form className={`form-add-friend ${!isOpen ? "hidden" : ""}`}>
        <label>🧑‍🤝‍🧑Friend name</label>
        <input
          value={friendName}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="form__input"
        ></input>

        <label>🖼️ Image URL</label>
        <input
          value={imageUrl}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
          className="form__input"
        ></input>

        <button
          onClick={(e) => {
            e.preventDefault();
            const id = Date.now();
            updateList({
              id: id,
              name: friendName,
              image: imageUrl,
              balance: 0,
            });
            setSelected(id);
          }}
          className="button"
        >
          Add
        </button>
      </form>
      <button
        onClick={(e) => setOpen((openState) => !openState)}
        className="button close"
      >
        {isOpen ? "Close" : "Add Friend"}
      </button>
    </div>
  );
}

function SplitBill({ selected, changeBalance, friends }) {
  const selectedName = friends.find((friend) => friend.id === selected)?.name;

  const [bill, setBill] = useState("");
  const [expense, setExpense] = useState("");
  const [friendExpense, setFriendExpense] = useState("");
  const [payer, setPayer] = useState("You");

  if (!selectedName) return;

  return (
    <form
      className="form-split-bill"
      onSubmit={(e) => {
        e.preventDefault();
        if (selectedName === payer) {
          changeBalance(selected, -expense);
        }
        if (payer === "You") {
          changeBalance(selected, friendExpense);
        }
        setBill("");
        setExpense("");
        setFriendExpense("");
      }}
    >
      <h2>Split a bill with {selectedName}</h2>
      <label>💰 Bill value</label>
      <input
        type="number"
        value={bill || ""}
        onChange={(e) => {
          if (+e.target.value < expense) return;
          setFriendExpense(e.target.value - expense);
          setBill(+e.target.value);
        }}
        className="form__input"
      ></input>
      <label>👨 Your expense</label>
      <input
        type="number"
        value={expense || ""}
        onChange={(e) => {
          if (+e.target.value > bill) return;
          setExpense(+e.target.value);
          setFriendExpense(bill - e.target.value);
        }}
        className="form__input"
      ></input>
      <label>🧑‍🤝‍🧑{selectedName}'s expense</label>
      <div className="display__expense">{friendExpense}</div>
      <label>🤑 Who is paying the bill?</label>
      <select
        value={payer}
        onChange={(e) => setPayer(e.target.value)}
        className="form__input"
        style={{ textAlign: "center" }}
      >
        <option>You</option>
        <option>{selectedName}</option>
      </select>
      <button className="button split-bill">Split bill</button>
    </form>
  );
}
