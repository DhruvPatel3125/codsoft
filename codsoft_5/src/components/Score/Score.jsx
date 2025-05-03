import React from 'react';
import styles from './Score.module.css';

export default function Score({ score, totalQuestions, onRestart }) {
  const percentage = (score / totalQuestions) * 100;
  
  const getFeedback = () => {
    if (percentage === 100) return "Perfect Score! 🎉";
    if (percentage >= 80) return "Excellent Work! 🌟";
    if (percentage >= 60) return "Good Job! 👍";
    if (percentage >= 40) return "Keep Practicing! 💪";
    return "Try Again! 📚";
  };

  return (
    <div className={styles.scoreContainer}>
      <div className={styles.scoreCard}>
        <h2 className={styles.scoreTitle}>Quiz Complete!</h2>
        <div className={styles.scoreCircle}>
          <span className={styles.scoreText}>{Math.round(percentage)}%</span>
        </div>
        <p className={styles.scoreDetails}>
          You got {score} out of {totalQuestions} questions correct
        </p>
        <p className={styles.feedback}>{getFeedback()}</p>
        <button className={styles.restartButton} onClick={onRestart}>
          Try Again
        </button>
      </div>
    </div>
  );
}