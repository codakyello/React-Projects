import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useCustomMutation(mutateFn, queryKey) {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: mutateFn,
    onSuccess: () => {
      console.log("invalidated");
      queryClient.invalidateQueries({ queryKey, exact: true });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isLoading, mutate };
}
