import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "react-hot-toast";
import { toast } from "sonner";
import { updateCurrentUser } from "../../services/apiAuth";
export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      queryClient.setQueryData(["user"], user);
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}
