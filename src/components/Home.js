import React, { useState } from "react";
import "./Home.css";
import { Link , useNavigate } from 'react-router-dom';

function Quizz() {
  // Properties
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const questions = [
    {
      text: 'What is the capital of France?',
      options: [
        { id: 0, text: "Berlin", isCorrect: false },
        { id: 1, text: "Madrid", isCorrect: false },
        { id: 2, text: "Rome", isCorrect: false },
        { id: 3, text: "Paris", isCorrect: true },
      ],
    },
    {
      text: " Who wrote the play 'Romeo and Juliet'?",
      options: [
        { id: 0, text: "William Shakespeare", isCorrect: true },
        { id: 1, text: "Charles Dickens", isCorrect: false },
        { id: 2, text: "Jane Austen", isCorrect: false },
        { id: 3, text: "Mark Twain", isCorrect: false },
      ],
    },
    {
      text: "In which year did the Titanic sink?",
      options: [
        { id: 0, text: "1912", isCorrect: true },
        { id: 1, text: "1905", isCorrect: false },
        { id: 2, text: "1920", isCorrect: false },
        { id: 3, text: " 1931", isCorrect: false },
      ],
    },
    {
      text: "What is the largest state in the US?",
      options: [
        { id: 0, text: "California", isCorrect: false },
        { id: 1, text: "Alaska", isCorrect: true },
        { id: 2, text: "Texas", isCorrect: false },
        { id: 3, text: "Montana", isCorrect: false },
      ],
    },
    {
      text: "What is the capital city of Japan?",
      options: [
        { id: 0, text: "Beijing", isCorrect: false },
        { id: 1, text: "Tokyo", isCorrect: true },
        { id: 2, text: "Cuba", isCorrect: false },
        { id: 3, text: "Seoul", isCorrect: false },
      ],
    },
  ];

  // Helper Functions

  /* A possible answer was clicked */
  const optionClicked = (isCorrect) => {
    // Increment the score
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  /* Resets the game back to default */
  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
  };

  return (
    <div className="App">
      {/* 1. Header  */}
      <h1> Quiz 🇺🇸</h1>

      {/* 2. Current Score  */}
      <h2>Score: {score}</h2>
      <button className="Logout">
        <span >
          {/*put router link here*/}
          <Link to="/login">LogOut</Link>
        </span>
      </button>
      {/* 3. Show results or show the question game  */}
      {showResults ? (
        /* 4. Final Results */
        <div className="final-results">
          <h1>Final Results</h1>
          <h2>
            {score} out of {questions.length} correct - (
            {(score / questions.length) * 100}%)
          </h2>
          <button onClick={() => restartGame()}>Restart game</button>
        </div>
      ) : (
        /* 5. Question Card  */
        <div className="question-card">
          {/* Current Question  */}
          <h2>
            Question: {currentQuestion + 1} out of {questions.length}
          </h2>
          <h3 className="question-text">{questions[currentQuestion].text}</h3>

          {/* List of possible answers  */}
          <ul>
            {questions[currentQuestion].options.map((option) => {
              return (
                <li
                  key={option.id}
                  onClick={() => optionClicked(option.isCorrect)}
                >
                  {option.text}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Quizz;