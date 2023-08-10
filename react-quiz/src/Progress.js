import { useEffect } from "react";

function Progress({
  index,
  numQuestions,
  points,
  maxPoints,
  answer,
  dispatch,
}) {
  useEffect(() => {
    if (index + 1 > numQuestions) {
      dispatch({ type: "finished" });
    }
  });
  return (
    <div className="progress">
      <progress value={index + Number(answer !== null)} max={numQuestions}>
        {" "}
        32%{" "}
      </progress>
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints} points
      </p>
    </div>
  );
}

export default Progress;
