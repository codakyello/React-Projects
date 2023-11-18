import styled from "styled-components";
import PropTypes from "prop-types";
import useUrlParams from "../hooks/useUrlParams";

const StyledSelect = styled.select`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
`;

SortBy.propTypes = {
  options: PropTypes.array,
};
function SortBy({ options }) {
  const [, Setparams, searchParams] = useUrlParams();

  return (
    <StyledSelect
      onChange={(e) => {
        searchParams.set("sortBy", e.target.value);
        Setparams(searchParams);
      }}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default SortBy;
