import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "sonner";

function useCheckout() {
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: updateBooking,
    onSuccess: () => {
      queryClient.invalidateQueries("today-activity");
      toast.success("Bookings successfully checked out");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isLoading, mutate };
}

export default useCheckout;
