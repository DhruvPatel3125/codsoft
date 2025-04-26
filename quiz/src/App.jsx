import React, { useState } from "react";
import Question from "./components/Question/Question";
import Score from "./components/Score/Score";
import questions from "./data";
import styles from "./App.module.css";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showScore, setShowScore] = useState(false);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (isCorrect, index) => {
    if (!answered) {
      setSelectedAnswer(index);
      setAnswered(true);
      if (isCorrect) {
        setScore((prev) => prev + 1);
      }
      setTimeout(() => handleNext(), 1000);
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

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setAnswered(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.quiz}>
        <h1 className={styles.title}>Quiz App</h1>
        {showScore ? (
          <Score 
            score={score}
            totalQuestions={questions.length}
            onRestart={handleRestart}
          />
        ) : (
          <Question
            currentQuestion={currentQuestion}
            totalQuestions={questions.length}
            questionText={questions[currentQuestion].questionText}
            options={questions[currentQuestion].answerOptions}
            selectedAnswer={selectedAnswer}
            answered={answered}
            onSelect={handleSelect}
          />
        )}
      </div>
    </div>
  );
}

export default App;
