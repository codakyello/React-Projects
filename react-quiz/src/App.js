import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Progress from "./Progress";
import Finished from "./Finished";

const SECS_PER_QUESTION = 3;

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
        time: state.time - 1,
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

export default function App() {
  const [
    { questions, index, status, time, error, answer, score, highScore },
    dispatch,
  ] = useReducer(reducer, initialState);

  const maxPoints = questions.reduce((acc, curr) => {
    return acc + curr.points;
  }, 0);

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
        console.log(e);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "ready" && (
          <StartScreen start={dispatch} numQuestions={questions.length} />
        )}
        {status === "error" && <Error message={error} />}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={questions.length}
              maxPoints={maxPoints}
              points={score}
              answer={answer}
              dispatch={dispatch}
            />
            <Question
              answer={answer}
              question={questions.at(index)}
              dispatch={dispatch}
              time={time}
              index={index}
              numQuestion={questions.length}
            />
          </>
        )}

        {status === "finish" && (
          <Finished
            maxPoints={maxPoints}
            points={score}
            highscore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

// set status to finished when we are done with answering questions
// Access question.length and index
