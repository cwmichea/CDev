import styled from 'styled-components';
import data from "./data.js";
import React, { useState, useEffect } from "react";

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

const QUESTION_SETS = [8, 16, 24, 36];

export default function Quiz() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionSetSize, setQuestionSetSize] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false); // New state to track completion
  
  // Load saved state from localStorage
  useEffect(() => {
    const savedIndex = localStorage.getItem("quiz-questionIndex");
    const savedResults = localStorage.getItem("quiz-results");
    const savedQuestions = localStorage.getItem("quiz-questions");
    const savedSetSize = localStorage.getItem("quiz-setSize");
    const savedCompleted = localStorage.getItem("quiz-completed");

    if (savedIndex && savedResults && savedQuestions && savedSetSize) {
      setQuestionIndex(JSON.parse(savedIndex));
      setResults(JSON.parse(savedResults));
      setQuestions(JSON.parse(savedQuestions));
      setQuestionSetSize(JSON.parse(savedSetSize));
      setQuizCompleted(JSON.parse(savedCompleted) || false);
      
      // If quiz was completed, show results immediately
      if (JSON.parse(savedCompleted)) {
        setShowResults(true);
      }
    }
  }, []);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem("quiz-questionIndex", JSON.stringify(questionIndex));
    localStorage.setItem("quiz-results", JSON.stringify(results));
    localStorage.setItem("quiz-questions", JSON.stringify(questions));
    localStorage.setItem("quiz-setSize", JSON.stringify(questionSetSize));
    localStorage.setItem("quiz-completed", JSON.stringify(quizCompleted));
  }, [questionIndex, results, questions, questionSetSize, quizCompleted]);

  // Initialize quiz with selected set size
  const startQuiz = (size) => {
    setQuestionSetSize(size);
    setQuestions(shuffleArray(data).slice(0, size));
    setQuestionIndex(0);
    setResults([]);
    setShowResults(false);
    setQuizCompleted(false);
  };

  const getOptions = () => {
    if (!questions.length || quizCompleted) return []; // Prevent answering if completed
    const currentQuestion = questions[questionIndex];
    const incorrect = shuffleArray(
      data.filter((item) => item.id !== currentQuestion.id)
    ).slice(0, 4);
    return shuffleArray([
      ...incorrect.map((i) => i.meaning),      
      currentQuestion.meaning,
    ]);
  };

  const handleAnswer = (selected) => {
    if (quizCompleted) return; // Prevent answering if completed
    
    const currentQuestion = questions[questionIndex];
    const entry = {
      verb: currentQuestion.verb,
      selected,
      correct: currentQuestion.meaning,
      isCorrect: selected === currentQuestion.meaning,
    };

    const newResults = [...results, entry];
    setResults(newResults);

    if (questionIndex + 1 < questions.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setShowResults(true);
      setQuizCompleted(true);
    }
  };

  const handleTryAgain = () => {
    startQuiz(null);
    localStorage.removeItem("quiz-questionIndex");
    localStorage.removeItem("quiz-results");
    localStorage.removeItem("quiz-questions");
    localStorage.removeItem("quiz-setSize");
    localStorage.removeItem("quiz-completed");
  };

  const options = getOptions();
  const currentQuestion = questions[questionIndex];

  return (
    <Wrapper>
      {!questionSetSize 
      ? (
        <SetSelection>
          <h2>Select Number of Questions</h2>
          <SetOptions>
            {QUESTION_SETS.map((size) => (
              <SetButton key={size} onClick={() => startQuiz(size)}>
                {size} Questions
              </SetButton>
            ))}
          </SetOptions>
        </SetSelection>
      ) 
      : showResults ? (
        <ResultsContainer>
          <ResultsSection>
            <h2>Results</h2>
            <Score>
              Score: {results.filter(r => r.isCorrect).length}/{questionSetSize}
            </Score>
            <ResultsList>
              {results.map((r, i) => (
                <ResultItem key={i} correct={r.isCorrect}>
                  <strong>{r.verb}</strong>
                  <ResultAnswer>
                    <span>Your answer: <em>{r.selected}</em></span>
                    <span>Correct answer: <em>{r.correct}</em></span>
                  </ResultAnswer>
                  {r.isCorrect ? "✅" : "❌"}
                </ResultItem>
              ))}
            </ResultsList>
          </ResultsSection>
          <ActionButton onClick={handleTryAgain}>Try Again</ActionButton>
        </ResultsContainer>
      ) : questions.length > 0 ? (
        <QuestionSection>
          <Progress>
            Question: {questionIndex + 1}/{questionSetSize}
          </Progress>
          <QuestionText>
            {questionIndex + 1}. What's the meaning of: <em>{currentQuestion.verb}</em>?
          </QuestionText>
          <OptionsList>
            {options.map((option, i) => (
              <li key={i}>
                <OptionButton onClick={() => handleAnswer(option)}>
                  {option}
                </OptionButton>
              </li>
            ))}
          </OptionsList>
        </QuestionSection>
      ) : null}
      
      {questionSetSize && !showResults && (
        <Trayectory>
          {results.map((item, index) => (
            <span key={index}>{item.isCorrect ? "✅" : "❌"}</span>
          ))}
        </Trayectory>
      )}
    </Wrapper>
  );
}

// Styled components
const Wrapper = styled.div`
  min-height: max(700px, calc(100vh - 220px));
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  background: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const ResultsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
`;

const ResultsSection = styled.div`
  width: 100%;
  flex: 1;
  overflow-y: auto;
  margin-bottom: 20px;
`;

const ResultsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

const ActionButton = styled.button`
  padding: 12px 25px;
  margin-top: auto; /* Pushes button to bottom */
  background: #4285f4;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  align-self: center;
  width: 100%;
  max-width: 200px;

  &:hover {
    background: #3367d6;
    transform: translateY(-2px);
  }
`;

/* Rest of your styled components remain the same */
const SetSelection = styled.div`
  text-align: center;
  width: 100%;
`;

const SetOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-top: 30px;
`;

const SetButton = styled.button`
  padding: 15px;
  font-size: 1.1rem;
  background: #4285f4;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #3367d6;
    transform: translateY(-2px);
  }
`;

const QuestionSection = styled.div`
  width: 100%;
  text-align: center;
`;

const Progress = styled.h3`
  color: #6c757d;
  margin-bottom: 20px;
`;

const QuestionText = styled.h2`
  color: #343a40;
  margin-bottom: 30px;
`;

const OptionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const OptionButton = styled.button`
  padding: 15px;
  width: 100%;
  background: white;
  border: 2px solid #dee2e6;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f1f3f5;
    border-color: #adb5bd;
  }
`;

const Score = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #343a40;
  margin: 20px 0;
  text-align: center;
`;

const ResultItem = styled.li`
  padding: 15px;
  margin-bottom: 10px;
  background: ${props => props.correct ? '#e6f7e6' : '#ffebee'};
  border-left: 5px solid ${props => props.correct ? '#4caf50' : '#f44336'};
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ResultAnswer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 0 15px;
  text-align: left;
`;

const Trayectory = styled.div`
  margin: 20px 0;
  font-size: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  max-width: 100%;
  padding: 10px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;