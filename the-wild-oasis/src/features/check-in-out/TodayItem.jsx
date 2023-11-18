import styled from "styled-components";
import PropTypes from "prop-types";
import Tag from "../../ui/Tag";
import { Link } from "react-router-dom";

import { Flag } from "../../ui/Flag";
import CheckoutButton from "./CheckoutButton";

TodayItem.propTypes = {
  activity: PropTypes.any,
};

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const {
    id,
    status,
    totalNights,
    guests: { fullName, nationality, countryFlag },
  } = activity;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
  };

  const Button = styled.button`
    border: none;
    border-radius: var(--border-radius-sm);
    box-shadow: var(--shadow-sm);
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);
  `;
  return (
    <StyledTodayItem>
      <Tag type={statusToTagName[status]}>
        {status === "checked-in" ? "Departing" : "Arriving"}
      </Tag>
      <Flag src={countryFlag} alt={`Flag of ${nationality}`} />
      <Guest>{fullName}</Guest>
      <div>{totalNights} nights</div>

      {status === "unconfirmed" && (
        <Button
          type="small"
          variation="primary"
          as={Link}
          to={`/checkin/${id}`}
        >
          CHECK IN
        </Button>
      )}

      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}

export default TodayItem;
