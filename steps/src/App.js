import { useState } from "react";

function App() {
  const steps = [
    "Step 1 : Learn React ✡️ ",
    "Step 2 : Get a Job 💼",
    "Step 3 : Invest your new income 🤑",
  ];

  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <button className="close" onClick={() => setIsOpen(!isOpen)}>
        &times;
      </button>

      {isOpen && <Step steps={steps} />}
    </>
  );
}

function StepNumber({ number, active }) {
  return <div className={`step__number ${active}`}>{number}</div>;
}

function Step({ steps }) {
  function handlePrevious() {
    if (step > 0) {
      setstep((pre) => pre - 1);
    }
  }

  function handleNext() {
    // At 2 dont go more
    if (step < steps.length - 1) {
      setstep((pre) => pre + 1);
    }
  }

  const [step, setstep] = useState(0);

  return (
    <div className="step">
      <div className="step__numbers">
        {/* Check for the step and then add class when*/}
        {steps.map((_, i) => (
          <StepNumber number={i + 1} active={step >= i ? "active" : ""} />
        ))}
      </div>
      <h1>{steps[step]}</h1>

      <div className="btns">
        <button
          className="btn"
          onClick={(e) => {
            handlePrevious();
          }}
        >
          Previous
        </button>
        <button
          className="btn"
          onClick={(e) => {
            handleNext();
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
export default App;
