import { useQuery, useQueryClient } from "@tanstack/react-query";
import useUrlParams from "../../hooks/useUrlParams";
import { getBookings } from "../../services/apiBookings";
import { RESULTS_PER_PAGE } from "../../utils/constants";

export default function useBookings() {
  const queryClient = useQueryClient();
  const [filterValue] = useUrlParams("status");
  let [sortByRaw] = useUrlParams("sortBy");
  sortByRaw = sortByRaw || "startDate-desc";
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method: "eq" };

  const [field, direction] = sortByRaw.split("-");

  const sortBy = { field, direction };

  const [pageValue] = useUrlParams("page");

  const page = Number(pageValue);

  const {
    data = {},
    error,
    isLoading,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  const { count, data: bookings } = data;

  const pageCount = Math.ceil(count / RESULTS_PER_PAGE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { count, bookings, error, isLoading };
}
