import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";
export default function useUser() {
  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ["user"],
  });

  return {
    user,
    isAuthenticated: user?.role === "authenticated",
    isLoading,
    error,
  };
}
