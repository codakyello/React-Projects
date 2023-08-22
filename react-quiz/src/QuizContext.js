import { createContext, useContext, useReducer, useEffect } from "react";

const SECS_PER_QUESTION = 1;

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  error: null,
  answer: null,
  score: 0,
  time: 0,
  highScore: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
        time: action.payload.length * SECS_PER_QUESTION,
      };

    case "dataFailed":
      return {
        ...state,
        status: "error",
        error: action.payload.error,
      };

    case "startQuiz":
      return {
        ...state,
        status: "active",
      };
    case "answer":
      return {
        ...state,
        answer: action.payload,
        score:
          state.questions.at(state.index).correctOption === action.payload
            ? state.score + state.questions.at(state.index).points
            : state.score,
      };

    case "nextQuestion":
      return {
        ...state,
        index: state.index++,
        answer: null,
      };

    case "tick":
      return {
        ...state,
        time: state.time === 0 ? state.time : state.time - 1,
        status: state.time === 0 ? "finish" : state.status,
        highScore:
          state.score > state.highScore ? state.score : state.highScore,
      };

    case "finished":
      return {
        ...state,
        status: "finish",
        highScore:
          state.score > state.highScore ? state.score : state.highScore,
      };

    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highScore: state.highScore,
        time: state.questions.length * SECS_PER_QUESTION,
      };

    default:
      throw new Error("Not a valid type");
  }
}
// 1.Create context
const QuizContext = createContext();

// 2. Create provider
function QuizProvider({ children }) {
  const [
    { questions, index, status, time, error, answer, score, highScore },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:8000/questions");

        // Connected to server
        if (res.status !== 200) {
          throw new Error("Something happened");
        }
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (e) {
        dispatch({ type: "dataFailed", payload: { error: e.message } });
      }
    }

    fetchData();
  }, []);
  return (
    <QuizContext.Provider
      value={{
        questions,
        index,
        status,
        time,
        error,
        answer,
        score,
        highScore,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (!context)
    throw new Error(
      "You are trying to use quiz context outside of its provider"
    );
  return context;
}

export { QuizProvider, useQuiz };
