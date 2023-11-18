import { getSettings } from "../../services/apiSettings";
import { useQuery } from "@tanstack/react-query";
export default function useSettings() {
  const { isLoading, data, error, isFetching } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { isLoading, data, error, isFetching };
}
