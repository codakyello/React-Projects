import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";
import PropTypes from "prop-types";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

ConfirmDelete.propTypes = {
  onConfirm: PropTypes.func,
  disabled: PropTypes.bool,
  resourceName: PropTypes.string,
  onClose: PropTypes.func,
};

function ConfirmDelete({ resourceName, onClose, onConfirm, disabled }) {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">Delete {resourceName}</Heading>
      <p>
        Are you sure you want to delete this {resourceName}? This action cannot
        be undone.
      </p>

      <div>
        <Button onClick={onClose} variation="secondary" disabled={disabled}>
          Cancel
        </Button>
        <Button onClick={onConfirm} variation="danger" disabled={disabled}>
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
