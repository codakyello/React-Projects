import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
// import Menus from "../../ui/Menus";

import Spinner from "../../ui/Spinner";
import { toast } from "sonner";
import useBookings from "./useBookings";
import Pagination from "../../ui/Pagination";
import Menus from "../../ui/Menus";

function BookingTable() {
  const { error, isLoading, bookings, count } = useBookings();

  // const { data, count } = bookings;
  // console.log(data, count);
  // let filteredBookings = bookings;

  // if (statusFilter === "checked-out")
  //   filteredBookings = bookings.filter(
  //     (booking) => booking.status.toLowerCase() === statusFilter
  //   );

  // if (statusFilter === "checked-in")
  //   filteredBookings = bookings.filter(
  //     (booking) => booking.status.toLowerCase() === statusFilter
  //   );

  // if (statusFilter === "unconfirmed")
  //   filteredBookings = bookings.filter(
  //     (booking) => booking.status.toLowerCase() === statusFilter
  //   );

  // let sortedBookings = filteredBookings;
  // if (bookingSort === "startDate-asc")
  //   sortedBookings = filteredBookings
  //     .slice()
  //     .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

  // if (bookingSort === "startDated-desc")
  //   sortedBookings = filteredBookings
  //     .slice()
  //     .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  // if (bookingSort === "totalPrice-desc")
  //   sortedBookings = filteredBookings
  //     .slice()
  //     .sort((a, b) => b.totalPrice - a.totalPrice);

  // if (bookingSort === "totalPrice-asc")
  //   sortedBookings = filteredBookings
  //     .slice()
  //     .sort((a, b) => a.totalPrice - b.totalPrice);

  if (isLoading) return <Spinner></Spinner>;

  if (error) {
    return toast.error(error.message);
  }

  if (!bookings.length) return "No bookings found";
  return (
    <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
      <Table.Header
        headings={["Cabins", "Guest", "Dates", "Status", "Amount", ""]}
      />

      <Menus>
        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
      </Menus>

      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Table>
  );
}

export default BookingTable;
