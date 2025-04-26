import React from 'react';
import styles from './Question.module.css';

export default function Question({ 
  currentQuestion,
  totalQuestions,
  questionText,
  options,
  selectedAnswer,
  answered,
  onSelect 
}) {
  return (
    <div className={styles.questionContainer}>
      <div className={styles.progressBar}>
        <div 
          className={styles.progress} 
          style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
        />
      </div>
      
      <div className={styles.questionCount}>
        Question {currentQuestion + 1} of {totalQuestions}
      </div>

      <h2 className={styles.questionText}>{questionText}</h2>

      <div className={styles.optionsGrid}>
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelect(option.isCorrect, index)}
            className={`${styles.optionButton} ${
              selectedAnswer === index
                ? option.isCorrect
                  ? styles.correct
                  : styles.wrong
                : ''
            }`}
            disabled={answered}
          >
            {option.answerText}
          </button>
        ))}
      </div>
    </div>
  );
}