import { useEffect, useState, useReducer } from "react";
import { faker } from "@faker-js/faker";

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

const initialState = {
  posts: Array.from({ length: 30 }, () => createRandomPost()),
  searchQuery: "",
  isFakeDark: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "add-post":
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };

    case "delete-post":
      return {
        ...state,
        posts: [],
      };

    case "dark-mode":
      return {
        ...state,
        isFakeDark: !state.isFakeDark,
      };

    case "search":
      return {
        ...state,
        searchQuery: action.payload,
      };
    default:
      throw new Error("Action is not defined");
  }
}

function App() {
  const [{ posts, searchQuery, isFakeDark }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // Convert to useReducer

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleClearPosts() {
    dispatch({ type: "delete-posts" });
  }

  useEffect(
    function () {
      document.documentElement.classList.toggle("fake-dark-mode");
    },
    [isFakeDark]
  );

  return (
    <section>
      <button
        onClick={() => dispatch({ type: "dark-mode" })}
        className="btn-fake-dark-mode"
      >
        {isFakeDark ? "☀️" : "🌙"}
      </button>

      <Header
        posts={searchedPosts}
        onClearPosts={handleClearPosts}
        searchQuery={searchQuery}
        dispatch={dispatch}
      />
      <Main posts={searchedPosts} dispatch={dispatch} />
      <Archive dispatch={dispatch} />
      <Footer />
    </section>
  );
}

function Header({ posts, onClearPosts, searchQuery, dispatch }) {
  return (
    <header>
      <h1>
        <span>⚛️</span>The Atomic Blog
      </h1>
      <div>
        <Results posts={posts} />
        <SearchPosts searchQuery={searchQuery} dispatch={dispatch} />
        <button onClick={onClearPosts}>Clear posts</button>
      </div>
    </header>
  );
}

function SearchPosts({ searchQuery, dispatch }) {
  return (
    <input
      value={searchQuery}
      onChange={(e) => dispatch({ type: "search", payload: e.target.value })}
      placeholder="Search posts..."
    />
  );
}

function Results({ posts }) {
  return <p>🚀 {posts.length} atomic posts found</p>;
}

function Main({ posts, dispatch }) {
  return (
    <main>
      <FormAddPost dispatch={dispatch} />
      <Posts posts={posts} />
    </main>
  );
}

function Posts({ posts }) {
  return (
    <section>
      <List posts={posts} />
    </section>
  );
}

function FormAddPost({ dispatch }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = function (e) {
    e.preventDefault();
    if (!body || !title) return;
    dispatch({ type: "add-post", payload: { title, body } });
    setTitle("");
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Post body"
      />
      <button>Add post</button>
    </form>
  );
}

function List({ posts }) {
  return (
    <ul>
      {posts.map((post, i) => (
        <li key={i}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  );
}

function Archive({ dispatch }) {
  // Here we don't need the setter function. We're only using state to store these posts because the callback function passed into useState (which generates the posts) is only called once, on the initial render. So we use this trick as an optimization technique, because if we just used a regular variable, these posts would be re-created on every render. We could also move the posts outside the components, but I wanted to show you this trick 😉
  const [posts] = useState(() =>
    // 💥 WARNING: This might make your computer slow! Try a smaller `length` first
    Array.from({ length: 10000 }, () => createRandomPost())
  );

  const [showArchive, setShowArchive] = useState(false);

  return (
    <aside>
      <h2>Post archive</h2>
      <button onClick={() => setShowArchive((s) => !s)}>
        {showArchive ? "Hide archive posts" : "Show archive posts"}
      </button>

      {showArchive && (
        <ul>
          {posts.map((post, i) => (
            <li key={i}>
              <p>
                <strong>{post.title}:</strong> {post.body}
              </p>
              <button
                onClick={() => dispatch({ type: "add-post", payload: post })}
              >
                Add as new post
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

function Footer() {
  return <footer>&copy; by The Atomic Blog ✌️</footer>;
}

export default App;
