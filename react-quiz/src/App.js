import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Progress from "./Progress";
import Finished from "./Finished";
import { useQuiz, QuizProvider } from "./QuizContext";

export default function App() {
  const {
    questions,
    dispatch,
    status,
    index,
    score,
    answer,
    error,
    time,
    highScore,
  } = useQuiz();
  const maxPoints = questions.reduce((acc, curr) => {
    return acc + curr.points;
  }, 0);
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
