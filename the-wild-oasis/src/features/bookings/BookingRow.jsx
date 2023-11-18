import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import Menus from "../../ui/Menus";
// import { formatDistanceFromNow } from "../../utils/helpers";
import PropTypes from "prop-types";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Modal from "../../ui/Modal";
import useCustomMutation from "../../hooks/useCustomMutation";
import {
  updateBooking,
  deleteBooking as deleteBookingApi,
} from "../../services/apiBookings";
import { toast } from "sonner";
import ConfirmDelete from "../../ui/ConfirmDelete";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

BookingRow.propTypes = {
  booking: PropTypes.object,
};
function BookingRow({
  booking: {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests: { fullName, email },
    cabins: { name: cabinName },
  },
}) {
  const navigate = useNavigate();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const { mutate: checkOut, isLoading: isCheckingOut } = useCustomMutation(
    updateBooking,
    "bookings"
  );

  const { mutate: deleteBooking, isLoading: isDeleting } = useCustomMutation(
    deleteBookingApi,
    "bookings"
  );
  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{fullName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate)) ? "Today" : "Yesterday"} &rarr;{" "}
          {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              onClick={() => navigate(`/bookings/${bookingId}`)}
              icon={<HiEye />}
            >
              See details
            </Menus.Button>
            {status.toLowerCase() === "unconfirmed" ? (
              <Menus.Button
                onClick={() => navigate(`/checkin/${bookingId}`)}
                icon={<HiArrowDownOnSquare />}
              >
                Check in
              </Menus.Button>
            ) : status.toLowerCase() === "checked-in" ? (
              <>
                <Menus.Button
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
                  disabled={isCheckingOut}
                  icon={<HiArrowUpOnSquare />}
                >
                  Check out
                </Menus.Button>
              </>
            ) : null}

            <Modal.Open opens="delete-booking">
              <Menus.Button
                disabled={isDeleting || status === "checked-in"}
                icon={<HiTrash />}
              >
                Delete Booking
              </Menus.Button>
            </Modal.Open>
          </Menus.List>
          <Modal.Window name="delete-booking">
            <ConfirmDelete
              disabled={isDeleting || status === "checked-in"}
              onConfirm={() =>
                deleteBooking(bookingId, {
                  onSuccess: () => {
                    toast.success(`Booking ${bookingId} successfully deleted`);
                  },
                })
              }
              resourceName="booking"
            />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
