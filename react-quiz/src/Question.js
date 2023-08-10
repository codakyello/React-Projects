import { useEffect } from "react";

function Question({
  question: { question, options, correctOption },
  dispatch,
  answer,
  time,
  numQuestion,
  index,
}) {
  const isAnswered = answer === null ? false : true;
  const min = Math.floor(time / 60);
  const sec = time % 60;

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return function () {
      clearInterval(timer);
    };
  }, [dispatch]);

  return (
    <div>
      <h4>{question}</h4>
      <div className="options">
        {options.map((option, i) => (
          <button
            disabled={isAnswered}
            key={i}
            onClick={() => {
              if (index + 1 === numQuestion) {
                dispatch({ type: "finished" });
              }
              dispatch({ type: "answer", payload: i });
            }}
            // Run when a user has checked an answer
            className={`btn btn-option ${answer === i ? "answer" : ""} ${
              isAnswered ? (i === correctOption ? "correct" : "wrong") : ""
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {isAnswered && index + 1 !== numQuestion ? (
        <button
          onClick={() => {
            dispatch({ type: "nextQuestion" });
          }}
          className="btn btn-ui"
        >
          Next
        </button>
      ) : (
        ""
      )}

      <div className="timer">
        {min < 10 && "0"}
        {min}:{sec < 10 && "0"}
        {sec}
      </div>
    </div>
  );
}

export default Question;
