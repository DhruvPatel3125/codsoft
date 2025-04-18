// App.js
import React, { useState } from "react";
import questions from "./data";
import "./App.css";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showScore, setShowScore] = useState(false);
  const [answered, setAnswered] = useState(false);
  //many all state are not used in this code
  // const [isCorrect, setIsCorrect] = useState(false);
  // const [isWrong, setIsWrong] = useState(false);
  

  const handleSelect = (isCorrect, index) => {
    setSelectedAnswer(index);
    setAnswered(true);
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowScore(true);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setSelectedAnswer(null);
      setAnswered(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setAnswered(false);
  };

  return (
    <div className="app">
      {showScore ? (
        <div className="score-section">
          <h2>You scored {score} out of {questions.length}</h2>
          <button onClick={handleRestart}>Try Again</button>
        </div>
      ) : (
        <div className="quiz-section">
          <div className="question-count">
            <span>Question {currentQuestion + 1}</span>/{questions.length}
          </div>

          <div className="question-text">
            {questions[currentQuestion].questionText}
          </div>

          <div className="answer-section">
            {questions[currentQuestion].answerOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(option.isCorrect, index)}
                className={`answer-btn ${
                  selectedAnswer === index
                    ? option.isCorrect
                      ? "correct"
                      : "wrong"
                    : ""
                }`}
                disabled={answered}
              >
                {option.answerText}
              </button>
            ))}
          </div>

          <div className="nav-buttons">
            <button onClick={handlePrev} disabled={currentQuestion === 0}>
              Prev
            </button>
            <button onClick={handleNext} disabled={!answered}>
              {currentQuestion + 1 === questions.length ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
