import { useSearchParams } from "react-router-dom";

function useUrlParams(query) {
  const [searchParams, setSearchParams] = useSearchParams();
  const param = searchParams.get(query);

  return [param, setSearchParams, searchParams];
}
export default useUrlParams;
