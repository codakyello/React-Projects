import { createContext, useContext, useMemo } from "react";
import { faker } from "@faker-js/faker";
import { useReducer } from "react";

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

    case "delete-posts":
      return {
        ...state,
        posts: [],
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

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

// Create Context
const PostContext = createContext();

// Create a Provider
function PostProvider({ children }) {
  const [{ posts, searchQuery }, dispatch] = useReducer(reducer, initialState);

  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  const value = useMemo(() => {
    return {
      posts: searchedPosts,
      searchQuery,
      dispatch,
    };
  }, [searchQuery, searchedPosts]);

  return (
    // Provide context to children
    <PostContext.Provider value={value}>{children}</PostContext.Provider>
  );
}
// Consume context
function usePost() {
  const context = useContext(PostContext);
  if (!context)
    throw new Error("PostContext was used outside of the PostProvider");
  return context;
}

export { usePost, PostProvider };

// Create context.
// Provide context at the top of parent.
// Children consume created context with useContext hook.

// Created a custom hook for all my states and used the Provider to boradcast my state.
