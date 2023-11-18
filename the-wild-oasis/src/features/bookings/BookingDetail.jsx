import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useParams } from "react-router-dom";

import { toast } from "sonner";
import Spinner from "../../ui/Spinner";
import useBooking from "./useBooking";
import { useNavigate } from "react-router-dom";
import {
  deleteBooking as deleteBookingApi,
  updateBooking,
} from "../../services/apiBookings";
import useCustomMutation from "../../hooks/useCustomMutation";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  let { id } = useParams();
  const { booking, isLoading, error } = useBooking(id);
  const status = booking?.status;
  const navigate = useNavigate();

  const { id: bookingId } = { ...booking };

  const moveBack = useMoveBack();

  const { mutate: checkOut, isLoading: isCheckingOut } = useCustomMutation(
    updateBooking,
    "bookings"
  );

  const { mutate: deleteBooking, isLoading: isDeleting } = useCustomMutation(
    deleteBookingApi,
    "bookings"
  );

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resourceName="booking" />;
  if (error) return toast.error("Something went wrong");

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status.toLowerCase() === "unconfirmed" ? (
          <Button
            onClick={() => navigate(`/checkin/${bookingId}`)}
            variation="primary"
          >
            Check in
          </Button>
        ) : status.toLowerCase() === "checked-in" ? (
          <Button
            disabled={isCheckingOut}
            onClick={() => {
              const obj = {
                status: "checked-out",
              };
              checkOut(
                { id: bookingId, obj },
                {
                  onSuccess: (data) => {
                    toast.success(
                      `Booking #${data.id} successfully checked out`
                    );
                  },
                }
              );
            }}
            variation="primary"
          >
            Check out
          </Button>
        ) : null}

        <Modal>
          <Modal.Open opens="delete-booking">
            <Button
              disabled={status === "checked-in" || isDeleting}
              variation="danger"
            >
              Delete booking
            </Button>
          </Modal.Open>
          <Modal.Window name="delete-booking">
            <ConfirmDelete
              disabled={isDeleting || status === "checked-in"}
              onConfirm={() =>
                deleteBooking(bookingId, {
                  onSuccess: () => {
                    navigate(-1);
                    toast.success(`Booking ${bookingId} successfully deleted`);
                  },
                })
              }
              resourceName="booking"
            />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
