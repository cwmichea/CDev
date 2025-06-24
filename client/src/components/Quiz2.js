// import "./styles.css";
import styled from 'styled-components';
import data from "./data.js";
import React, { useState } from "react";

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

export default function Quiz() {
  const [questionIndex, setQuestionIndex] = useState(0);
  // const [answers, setAnswers] = useState([]);
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = data[questionIndex];

  const getOptions = () => {
    const incorrect = shuffleArray(
      data.filter((item) => item.id !== currentQuestion.id)
    ).slice(0, 4);
    const options = shuffleArray([
      ...incorrect.map((i) => i.meaning),
      currentQuestion.meaning,
    ]);
    return options;
  };

  const handleAnswer = (selected) => {
    const entry = {
      verb: currentQuestion.verb,
      selected,
      correct: currentQuestion.meaning,
      isCorrect: selected === currentQuestion.meaning,
    };

    setResults([...results, entry]);

    if (questionIndex + 1 < data.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const options = getOptions();

  return (
    <Wrapper 
    // style={{ maxWidth: 600, margin: "auto" }}
    >
      { showResults  
      ? <>
        <h2>Results</h2>
        <ul>
          {results.map((r, i) => (
            <li key={i}>
              <strong>{r.verb}</strong>:{" "}
              {r.isCorrect ? "✅ Correct" : "❌ Wrong"}
              <br />
              Your answer: <em>{r.selected}</em>
              <br />
              Correct answer: <em>{r.correct}</em>
            </li>
          ))}
        </ul>
      </>
      : <>
        <h3>
        {questionIndex + 1}/{data.length}
        </h3>
      <h2>
        What's the meaning of: <em>{currentQuestion.verb}</em>?
      </h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {options.map((option, i) => (
          <li key={i}>
            <button
              onClick={() => handleAnswer(option)}
              style={{ margin: "5px 0", width: "100%" }}
            >
              {option}
            </button>
          </li>
        ))}
      </ul> 
      </>}
      <Trayectory>
          {results.map((item, index) => (
          <span key={index}>{item.isCorrect ? "✅" : "❌"}</span>
        ))}
      </Trayectory>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: calc(100vh - 264px);
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding-top: 20px;
  max-width: 600px;
`;
const Trayectory = styled.div`
  border: 2px red solid;
  margin-top: 20px;
  font-size: 1.5rem;
  display: flex;
  gap: 10px;
  width: 335px;
  height: 33px;

`