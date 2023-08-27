import { useState } from "react";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, getUser } from "./userSlice";

function CreateUser() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userName } = useSelector(getUser);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(addUser(username));
    navigate("/menu");
  }

  return (
    <form onSubmit={handleSubmit}>
      {userName && (
        <div>
          <h2 className="mb-4 text-sm text-stone-600 md:text-base">
            Contiue ordering for {userName}
          </h2>
          <Button to="/menu" type="primary" disabled={false}>
            Continue ordering
          </Button>
        </div>
      )}
      {!userName && (
        <>
          <p className="mb-4 text-sm text-stone-600 md:text-base">
            👋 Welcome! Please start by telling us your name:
          </p>

          <input
            type="text"
            placeholder="Your full name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input mb-8 w-72"
          />

          {username && (
            <div>
              <Button type="primary" disabled={false}>
                Start ordering
              </Button>
            </div>
          )}
        </>
      )}
    </form>
  );
}

export default CreateUser;
