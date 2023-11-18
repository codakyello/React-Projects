import PropTypes from "prop-types";
Empty.propTypes = {
  resourceName: PropTypes.any,
};

function Empty({ resourceName }) {
  return <p>No {resourceName} could be found.</p>;
}

export default Empty;
