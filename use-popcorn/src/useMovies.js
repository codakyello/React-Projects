import { useEffect, useState } from "react";

export function useMovies(search, callback) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, updateData] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    async function getMovieData() {
      setIsLoading(true);
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?s=${search}&apikey=bce66a65`,
          { signal: controller.signal }
        );

        // Connected to server
        if (!res.ok) {
          updateData([]);
          throw new Error("Something went wrong while fetching");
        }

        const data = await res.json();

        if (data.Response === "False") {
          updateData([]);
          throw new Error("Movie not Found!!");
        }

        updateData(data.Search);
        setError("");
      } catch (e) {
        if (e.name !== "AbortError") {
          setError(e.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (search.length < 2) {
      setError("");
      updateData([]);
      return;
    }

    callback?.("");
    getMovieData();

    // Unmounts before rerender
    return function () {
      controller.abort();
    };
  }, [search, callback]);

  return { data, isLoading, error };
}
