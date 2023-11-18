import styled from "styled-components";
import BookingDataBox from "../bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import { toast } from "react-hot-toast";
import Spinner from "../../ui/Spinner";
import { useState, useEffect } from "react";
import useSettings from "../settings/useSettings";
import { formatCurrency } from "../../utils/helpers";
import useCustomMutation from "../../hooks/useCustomMutation";
import { updateBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const CheckBox = styled.input`
  height: 2.4rem;
  width: 2.4rem;
`;
const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();

  const { id } = useParams();

  const [addBreakfast, setBreakfast] = useState(false);

  const [confirmPaid, setConfirmPaid] = useState(false);

  const { booking, error, isLoading } = useBooking(id);

  const {
    data: { breakfastPrice } = {},
    error: settingsError,
    isLoading: settingsLoading,
  } = useSettings();

  const {
    id: bookingId,
    hasBreakfast,
    totalPrice,
    numGuests,
    totalNights,
    isPaid,
    guests: { fullName } = {},
  } = { ...booking };

  useEffect(() => setConfirmPaid(isPaid ?? false), [isPaid]);

  const { isLoading: isCheckingIn, mutate: checkIn } =
    useCustomMutation(updateBooking);

  if (isLoading || settingsLoading) return <Spinner />;

  if (settingsError) return toast.error("Something went wrong");
  if (error) return toast.error("Something went wrong");

  function handleCheckin() {
    if (!confirmPaid) return;

    let breakfast = {};
    if (addBreakfast)
      breakfast = {
        hasBreakfast: true,
        extrasPrice: totalBreakFast,
        totalPrice: totalBookingFee,
      };
    else breakfast = {};

    const obj = { status: "checked-in", isPaid: true, ...breakfast };
    checkIn(
      { id: bookingId, obj },
      {
        onSuccess: (data) => {
          toast.success(`Booking #${data.id} successfully checked in`);
          // navigate("/");
        },
      }
    );
    // custom mutation
  }

  const totalBreakFast = totalNights * breakfastPrice * (numGuests + 1);

  const totalBookingFee = addBreakfast
    ? totalPrice + totalBreakFast
    : totalPrice;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {booking.status.toLowerCase() === "unconfirmed" && (
        <>
          {hasBreakfast || (
            <Box>
              <CheckBox
                id="breakfast"
                checked={addBreakfast}
                type="checkbox"
                onChange={() => {
                  setBreakfast((add) => !add);
                  setConfirmPaid(false);
                }}
              />

              <label htmlFor="breakfast">
                Want to add breakfast for {formatCurrency(totalBreakFast)}
              </label>
            </Box>
          )}

          <Box>
            <CheckBox
              id="confirm"
              checked={confirmPaid}
              type="checkbox"
              disabled={confirmPaid || isCheckingIn}
              onChange={() => setConfirmPaid((checked) => !checked)}
            />
            <label htmlFor="confirm">
              I confirm that {fullName} has paid the total amount of{" "}
              {formatCurrency(totalBookingFee)}
              {addBreakfast &&
                ` (${formatCurrency(totalPrice)} + ${formatCurrency(
                  totalBreakFast
                )})`}
            </label>
          </Box>
        </>
      )}

      <ButtonGroup>
        {booking.status.toLowerCase() === "unconfirmed" && (
          <Button
            disabled={!confirmPaid || isCheckingIn}
            onClick={handleCheckin}
          >
            Check in booking #{bookingId}
          </Button>
        )}

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
