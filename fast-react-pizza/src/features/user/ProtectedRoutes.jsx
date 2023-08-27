import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { getUser } from "./userSlice";

ProtectedRoute.propTypes = {
  children: PropTypes.any,
};

function ProtectedRoute({ children }) {
  const {userName} = useSelector(getUser);
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!userName) navigate("/");
    },
    [userName, navigate],
  );
  return userName ? children : null;
}

export default ProtectedRoute;
