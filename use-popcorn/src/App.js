import "./index.css";
import { useEffect, useState } from "react";

function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [movies, updateMovies] = useState([]);
  const [watch, updateWatch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  function getStorageData() {
    const watchData = localStorage.getItem("watch");
    if (!watchData) return [];
    if (watchData) return JSON.parse(watchData);
  }

  function handleAdd(newWatched) {
    const watchData = getStorageData();
    watchData.push(newWatched);
    localStorage.setItem("watch", JSON.stringify(watchData));
    updateWatch(getStorageData());
  }

  useEffect(() => {
    function loadAllWatchedData() {
      updateWatch(getStorageData());
    }
    loadAllWatchedData();
  }, []);

  function handleDelete(id) {
    const watchData = getStorageData();
    localStorage.clear();
    const updatedData = watchData.filter((watch) => watch.imDbID !== id);
    localStorage.setItem("watch", JSON.stringify(updatedData));
    updateWatch(getStorageData());
  }

  function checkIfAdded(id) {
    const added = watch.some((watched) => watched.imDbID === id);

    const userRating = watch.find(
      (watched) => watched.imDbID === id
    )?.userRating;

    return { added, userRating };
  }

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
          throw new Error("Something went wrong while fetching");
        }

        const data = await res.json();

        if (data.Response === "False") {
          throw new Error("Movie not Found!!");
        }

        updateMovies(data.Search);
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
      updateMovies([]);
      return;
    }

    setSelectedId("");
    getMovieData();

    // Unmounts before rerender
    return function () {
      controller.abort();
    };
  }, [search]);

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
        <WatchedAnalysisCard />
        {watch.map((watched) => (
          <MovieCard movie={watched} key={watched.imDbID}>
            {" "}
            <ul className="watched__analysis-details">
              <li className="watched__rating">
                <span>⭐</span> {watched.imdbRating}
              </li>
              <li className="watched__review">
                <span>🌟</span> {watched.userRating}
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
        ))}
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

function WatchedAnalysisCard() {
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
          <span>🔄️</span> 2 movies
        </li>
        <li className="watched__rating">
          <span>⭐</span> 8.65
        </li>
        <li className="watched__review">
          <span>🌟</span> 9.5
        </li>
        <li className="watched__time">
          <span>⌛</span> 132 min
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
  const [isAdded, setAlreadyAdded] = useState({});

  // It rerenders when i add to watch calling a fresh api again
  // I want to stop this behaviour that when i update watch and when there is api data it shouldnt call another api for now
  // SetSelectedId closes the page

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
      console.log("comment removed");
    };
  }, [selectedId, setSelectedId, setMovieDetail]);

  useEffect(() => {
    setAlreadyAdded({});
    async function fetchMovieDetails() {
      setLoading(true);
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?i=${selectedId}&apikey=bce66a65`
        );

        // Connected to server, start to handle your errors
        if (!res.ok) {
          throw new Error("Something Went Wrong!!");
        }

        const data = await res.json();
        console.log("Fetch some data");

        if (data.Response === "False") {
          throw new Error("No Movie Detail Found!!");
        }

        setMovieDetail(data);
        setAlreadyAdded(checkIfAdded(selectedId));
      } catch (e) {
        console.log(e.message);
      } finally {
        setLoading(false);
      }
    }
    if (!selectedId) return;
    fetchMovieDetails();
    // If selectedId is changed
  }, [selectedId, checkIfAdded]);

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
              {!isAdded.added && (
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
                        userRating: userRating.toFixed(1),
                        Runtime,
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
              {isAdded.added && (
                <p>You rated this movie {isAdded.userRating} ⭐</p>
              )}
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
