import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
function useCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
    retry: 1,
    retryDelay: 1000,
  });

  return { isLoading, cabins, error };
}

export default useCabins;
