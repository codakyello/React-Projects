import { useEffect } from "react";
import { useQuiz } from "./QuizContext";

function Footer() {
  const { time, dispatch } = useQuiz();
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
    <footer>
      <div className="timer">
        {min < 10 && "0"}
        {min}:{sec < 10 && "0"}
        {sec}
      </div>
    </footer>
  );
}

export default Footer;
