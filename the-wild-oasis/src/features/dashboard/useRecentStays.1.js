import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";
import { toast } from "sonner";

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), numDays).toISOString();
  console.log(queryDate);

  // get stay that have started from query date till today
  // get bookings that have started and are checkedin or checkedout
  const { isLoading, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${numDays}`],
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // We will use this to get the amount of checkins from a particular date
  const confirmedStays = stays?.filter(
    (stays) => stays.status === "checked-in" || stays.status === "checked-out"
  );

  return { isLoading, stays, confirmedStays, numDays };
}
