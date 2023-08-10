function StartScreen({ numQuestions, start }) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz</h2>
      <h3>{numQuestions} questions to test your React mastery.</h3>
      <button
        onClick={() => {
          start({ type: "startQuiz" });
        }}
        className="btn btn-ui"
      >
        Lets Start
      </button>
    </div>
  );
}

export default StartScreen;
