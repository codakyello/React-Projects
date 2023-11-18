import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading: isAuthenticating, mutate: login } = useMutation({
    mutationFn: (credentials) => loginApi(credentials),
    onSuccess: (user) => {
      queryClient.setQueriesData(["user"], user.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isAuthenticating, login };
}
