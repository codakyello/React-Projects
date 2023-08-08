import "./index.css";
import { useEffect, useState } from "react";
import { useMovies } from "./useMovies";
import { useLocalStorage } from "./useLocalStorage";

function App() {
  const [selectedId, setSelectedId] = useState(null);

  const [search, setSearch] = useState("");

  const { data: movies, isLoading, error } = useMovies(search, setSelectedId);

  const { storageData: watch, updateStorageData: updateWatch } =
    useLocalStorage([], "watch");

  function handleDelete(id) {
    const updatedData = watch.filter((watch) => watch.imDbID !== id);
    updateWatch(updatedData);
  }

  function handleAdd(newWatched) {
    updateWatch((watch) => [...watch, newWatched]);
  }

  function checkIfAdded(id) {
    const isAdded = watch.some((watched) => watched.imDbID === id);

    const movie = watch.find((watched) => watched.imDbID === id);

    return { isAdded, movie };
  }

  return (
    <div className="app">
      <Header>
        <nav>
          <div className="logo">🍿 usePopcorn</div>
          <input
            onChange={(e) => {
              setSearch(e.target.value);
              // Start the fetching
            }}
            value={search}
            className="search-movie"
            placeholder="Search movies..."
          ></input>
          <p className="results">
            Found <span style={{ fontWeight: "bold" }}>{movies.length}</span>{" "}
            results
          </p>
        </nav>
      </Header>
      <MovieBox
        isLoading={isLoading}
        error={error}
        movies={movies}
        setSelectedId={setSelectedId}
      />
      <WatchedBox watch={watch} deleteWatched={handleDelete}>
        <MovieDetails
          updateWatch={handleAdd}
          setSelectedId={setSelectedId}
          selectedId={selectedId}
          checkIfAdded={checkIfAdded}
        />
      </WatchedBox>
    </div>
  );
}

function MovieBox({ setSelectedId, movies, isLoading, error }) {
  const [isOpen, setIsOpen] = useState(true);

  function handleOnClick(id) {
    setSelectedId((selectedId) => (id === selectedId ? "" : id));
  }

  return (
    <div className="movies">
      <Toggle isOpen={isOpen} setIsOpen={setIsOpen} />

      {isLoading && <Loader />}
      {!isLoading && error && <ShowError error={error} />}
      {!isLoading && !error && (
        <ul style={{ display: !isOpen ? "none" : "block" }}>
          {movies.map((movie) => (
            <MovieCard
              movie={movie}
              key={movie.imdbID}
              hoverClassName={"hover-card"}
              handleOnClick={handleOnClick}
            >
              {" "}
              <p className="movie__date">
                <span>📅</span> {movie.Year}
              </p>{" "}
            </MovieCard>
          ))}
        </ul>
      )}
    </div>
  );
}

function WatchedBox({ children, watch, deleteWatched }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="watched">
      <Toggle isOpen={isOpen} setIsOpen={setIsOpen} />
      <div style={{ display: !isOpen ? "none" : "block" }}>
        <WatchedAnalysisCard watch={watch} />
        {watch.map((watched) => {
          return (
            <MovieCard movie={watched} key={watched.imDbID}>
              {" "}
              <ul className="watched__analysis-details">
                <li className="watched__rating">
                  <span>⭐</span> {watched.imdbRating}
                </li>
                <li className="watched__review">
                  <span>🌟</span> {watched.Rated}
                </li>
                <li className="watched__time">
                  <span>⌛</span> {watched.Runtime}
                </li>
              </ul>
              <button
                onClick={() => deleteWatched(watched.imDbID)}
                className="btn-delete"
              >
                X
              </button>
            </MovieCard>
          );
        })}
        {children}
      </div>
    </div>
  );
}
function Loader() {
  return (
    <p
      style={{
        textAlign: "Center",
        fontSize: "2rem",
        textTransform: "uppercase",
        marginTop: "3rem",
      }}
    >
      ...Loading
    </p>
  );
}

function ShowError({ error }) {
  return (
    <p style={{ textAlign: "center", fontSize: "2rem", marginTop: "3rem" }}>
      {" "}
      <span style={{ marginRight: ".7rem" }}>⛔</span>
      {error}
    </p>
  );
}

function Header({ children }) {
  return <header>{children}</header>;
}
function MovieCard({ movie, children, handleOnClick, hoverClassName = "" }) {
  return (
    <li
      onClick={() => {
        return handleOnClick ? handleOnClick(movie.imdbID) : "";
      }}
      className={`movie__card ${hoverClassName}`}
    >
      <div className="movie__img-box">
        <img className="movie__img" src={movie.Poster} alt="movie img" />
      </div>
      <h3 className="movie__title">{movie.Title}</h3>
      {children}
    </li>
  );
}

function Toggle({ isOpen, setIsOpen }) {
  return (
    <div
      onClick={() => {
        setIsOpen((isOpen) => !isOpen);
      }}
      className="toggle"
    >
      <span>{isOpen ? "-" : "+"}</span>
    </div>
  );
}

function WatchedAnalysisCard({ watch }) {
  const avgImdbRating = watch
    .reduce((acc, cur, _, arr) => {
      return acc + +cur.imdbRating / arr.length;
    }, 0)
    .toFixed(1);
  const totalMin = watch.reduce((acc, cur, _, arr) => {
    if (cur.Runtime.split(" ")[0] === "N/A") return acc;
    return acc + +cur.Runtime.split(" ")[0];
  }, 0);
  const avgUserRating = watch
    .reduce((acc, cur, _, arr) => {
      return acc + +cur.Rated / arr.length;
    }, 0)
    .toFixed(1);

  return (
    <div className="watched__analysis">
      <h2
        style={{
          textTransform: "uppercase",
          fontSize: "inherit",
          marginBottom: ".8rem",
        }}
      >
        Movies You Watched
      </h2>
      <ul className="watched__analysis-details">
        <li className="watched__count">
          <span>🔄️</span> {watch.length} movies
        </li>
        <li className="watched__rating">
          <span>⭐</span> {avgImdbRating}
        </li>
        <li className="watched__review">
          <span>🌟</span> {avgUserRating}
        </li>
        <li className="watched__time">
          <span>⌛</span> {totalMin} min
        </li>
      </ul>
    </div>
  );
}

// It mounts when there is a selected id
function MovieDetails({
  updateWatch,
  selectedId,
  setSelectedId,
  checkIfAdded,
}) {
  const [userRating, setuserRating] = useState(0);
  const [movieDetails, setMovieDetail] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [isAdded, setAlreadyAdded] = useState(false);

  const {
    Title,
    Poster,
    Runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
    Rated,
  } = movieDetails;

  useEffect(() => {
    function callback(e) {
      document.addEventListener("keydown", (e) => {
        if (e.code === "Escape") {
          setSelectedId("");
          setMovieDetail({});
        }
      });
    }
    document.addEventListener("keydown", callback);

    return function () {
      document.removeEventListener("keydown", callback);
    };
  }, [selectedId, setSelectedId, setMovieDetail]);

  useEffect(() => {
    setAlreadyAdded(false);
    const controller = new AbortController();
    async function fetchMovieDetails() {
      setLoading(true);
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?i=${selectedId}&apikey=bce66a65`,
          { signal: controller.signal }
        );

        // Connected to server, start to handle your errors
        if (!res.ok) {
          throw new Error("Something Went Wrong!!");
        }

        const data = await res.json();

        if (data.Response === "False") {
          throw new Error("No Movie Detail Found!!");
        }

        setMovieDetail(data);
      } catch (e) {
        if (e.name === "AbortError") return;
        console.log(e.message);
      } finally {
        setLoading(false);
      }
    }

    if (!selectedId) return;
    const checked = checkIfAdded(selectedId);
    if (checked.isAdded) {
      setAlreadyAdded(true);
      setMovieDetail(checked.movie);
      return;
    }
    fetchMovieDetails();

    return function () {
      controller.abort();
    };
    // If selectedId is changed
  }, [selectedId, setMovieDetail, checkIfAdded]);

  useEffect(() => {
    if (!Title) return;
    document.title = `Movie | ${Title}`;

    return function () {
      document.title = "usePopcorn";
    };
  }, [Title]);

  if (!selectedId) return;

  return (
    <div className="movie-box">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="movie-hero">
            <button
              onClick={() => {
                setSelectedId("");
                setMovieDetail({});
              }}
              className="btn-back"
            >
              &larr;
            </button>
            <img src={Poster} alt="movie-img" />

            <div className="movie-description">
              <h2 className="description-title">{Title}</h2>
              <p>
                {released} . {Runtime}
              </p>
              <p>{genre}</p>
              <p>⭐ {imdbRating} IMDB rating</p>
            </div>
          </div>
          <div className="movie-overview">
            <div className="review-box">
              {!isAdded && (
                <>
                  <StarRating
                    key={selectedId}
                    starNumber={10}
                    color="gold"
                    starSize="2.2rem"
                    labelSize="1.7rem"
                    labelColor="gold"
                    starColor="gold"
                    onSetRating={setuserRating}
                  />
                  <button
                    onClick={() => {
                      updateWatch({
                        imDbID: selectedId,
                        Title,
                        Poster,
                        imdbRating: Number(imdbRating),
                        Rated: userRating.toFixed(1),
                        Runtime,
                        Director: director,
                        Released: released,
                        Actors: actors,
                        Plot: plot,
                        Genre: genre,
                      });
                      setSelectedId("");
                      setuserRating("");
                    }}
                    style={{ display: userRating ? "block" : "none" }}
                    className="btn-add"
                  >
                    + Add to list
                  </button>
                </>
              )}
              {isAdded && <p>You rated this movie {Rated} ⭐</p>}
            </div>

            <div className="narration">
              <p>{plot}</p>

              <p style={{ color: "#aaa" }}>Starring: {actors}</p>

              <p style={{ color: "#aaa" }}>Director: {director}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Star({
  index,
  setIshoverRating,
  setRating,
  starColor,
  starSize,
  hoverRating,
  rating,
  onSetRating,
}) {
  return (
    <li
      onMouseOver={() => {
        setIshoverRating(index);
      }}
      onMouseOut={() => {
        setIshoverRating(0);
      }}
      onClick={() => {
        setRating(index);
        onSetRating(index);
      }}
      style={{
        cursor: "pointer",
        color: starColor,
        fontSize: starSize,
        marginRight: "0.1rem",
      }}
    >
      {hoverRating && hoverRating >= index ? (
        <ion-icon className="star" name="star"></ion-icon>
      ) : !hoverRating && rating >= index ? (
        <ion-icon className="star" name="star"></ion-icon>
      ) : (
        <ion-icon className="star" name="star-outline"></ion-icon>
      )}
    </li>
  );
}

function StarRating({
  starNumber = 5,
  starColor = "black",
  starSize = "1.6rem",
  labelSize = ".5rem",
  labelColor = "gold",
  onSetRating,
}) {
  const [hoverRating, setIshoverRating] = useState(0);
  const [rating, setRating] = useState(0);

  return (
    <ul
      style={{
        display: "flex",
        alignItems: "center",
        borderRadius: "8px",
      }}
    >
      {Array.from({ length: starNumber }, (_, i) => (
        <Star
          index={i + 1}
          key={i + 1}
          setIshoverRating={setIshoverRating}
          setRating={setRating}
          starColor={starColor}
          starSize={starSize}
          hoverRating={hoverRating}
          rating={rating}
          onSetRating={onSetRating}
        />
      ))}

      <li
        style={{
          marginLeft: "1rem",
          fontWeight: "bold",
          color: labelColor,
          fontSize: labelSize,
        }}
      >
        {hoverRating || rating || ""}
      </li>
    </ul>
  );
}

export default App;
