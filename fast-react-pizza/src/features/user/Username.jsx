import { useSelector } from "react-redux";
import { getUser } from "./userSlice";

function Username() {
  const { userName } = useSelector(getUser);
  return (
    <div className="text-sm-font-semibold hidden md:block">{userName}</div>
  );
}

export default Username;
