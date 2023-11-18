import Stat from "./Stat";
import PropTypes from "prop-types";

Stats.propTypes = {
  bookings: PropTypes.any,
  confirmedStays: PropTypes.any,
  cabinCount: PropTypes.any,
  cabins: PropTypes.any,
  numDays: PropTypes.any,
};
import {
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineBanknotes,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, cabinCount, numDays }) {
  // Cabins that are currently occupied
  // const occupiedCabins = cabins
  //   ?.map((cabin) => cabin.id)
  //   .filter((unbookedCabinId) =>
  //     confirmedStays
  //       ?.filter((stay) => stay.status === "checked-in")
  //       ?.map((stay) => stay.cabinId)
  //       .find((bookedCabinId) => unbookedCabinId === bookedCabinId)
  //   );

  // numDays;
  // // 1. Get all active bookings both unconfirmed and checkedIn
  // const activeBookings = bookings?.filter(
  //   (booking) =>
  //     booking.status === "unconfirmed" || booking.status === "checked-in"
  // ).length;

  // 1. Number of Bookings
  const numBookings = bookings.length;

  // 2. Total Sales
  const totalSales = formatCurrency(
    bookings
      ?.filter((booking) => booking.isPaid === true)
      .reduce((acc, curr) => acc + curr.totalPrice, 0)
  );

  // 3. CheckIns
  const checkIns = confirmedStays.length;

  // const occupancyRate = Math.round((occupiedCabins?.length / cabinCount) * 100);

  // console.log(occupancyRate1);

  // const occupancyRate = Math.round(
  //   confirmedStays.reduce((acc, curr) => acc + curr.totalNights, 0) /
  //     (numDays * cabinCount)
  // );

  // 4. Occupancy Rates
  const occupancyRate = Math.round(
    (confirmedStays.reduce((acc, curr) => acc + curr.totalNights, 0) /
      (numDays * cabinCount)) *
      100
  );

  const stats = [
    {
      icon: <HiOutlineBriefcase />,
      title: "Bookings",
      value: numBookings,
      color: "blue",
    },
    {
      icon: <HiOutlineBanknotes />,
      title: "Sales",
      value: totalSales,
      color: "green",
    },
    {
      icon: <HiOutlineCalendarDays />,
      title: "Check INS",
      value: checkIns,
      color: "indigo",
    },
    {
      icon: <HiOutlineChartBar />,
      title: "Occupancy Rate",
      value: `${occupancyRate}%`,
      color: "yellow",
    },
  ];

  return (
    <>
      {stats.map((stat, index) => (
        <Stat
          key={index}
          icon={stat.icon}
          title={stat.title}
          value={stat.value}
          color={stat.color}
        />
      ))}
    </>
  );
}

export default Stats;
