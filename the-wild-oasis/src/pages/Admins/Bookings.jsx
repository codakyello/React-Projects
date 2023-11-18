import BookingTable from "../../features/bookings/BookingTable";
import BookingTableOperations from "../../features/bookings/BookingTableOperations";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import { Routes, Route } from "react-router-dom";
import Booking from "./Booking";
import PageNotFound from "../PageNotFound";

function Bookings() {
  return (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <Row type="horizontal">
                <Heading as="h1">All bookings</Heading>
                <BookingTableOperations />
              </Row>

              <Row>
                <BookingTable />
              </Row>
            </>
          }
        />
        <Route path=":id" element={<Booking />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default Bookings;
