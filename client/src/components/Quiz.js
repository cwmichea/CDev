import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { theme } from '../GlobalStyles';
// import correctSound from '../../public/Quiz/correct.mp3'; // Path to your sound file
// import wrongSound from '../../public/Quiz/error.mp3'; // Path to your sound file
const Quiz = () => {
  const [entries, setEntries] = useState([]);
  const [numQuestions, setNumQuestions] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentEntry, setCurrentEntry] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [scoreHistory, setScoreHistory] = useState([]);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null); // To track correctness for color change

  const correctAudioRef = useRef(null);
  const wrongAudioRef = useRef(null);
  const buttonRef = useRef(null); // To manage button
  const inpRef = useRef(null); // To manage button
  useEffect(() => {
    // Fetch the JSON data from the public folder
    fetch('/Quiz/data.json')
      .then(response => response.json())
      .then(data => setEntries(data.entries))
      .catch((error) => console.error('Error fetching JSON:', error));
  }, []);

  const handleStartGame = (e) => {
    e.preventDefault();
    let randomNum = Math.floor(entries.length * Math.random());
    setCurrentEntry(entries[randomNum]);
    
    const formData = new FormData(e.target);
    const numQuestions = formData.get('num');
    setNumQuestions(numQuestions);
    setCorrectCount(0);
    setIncorrectCount(0);
    setScoreHistory([]);
    setCurrentQuestionIndex(0);
    setIsGameActive(true);
  };

  const handleSubmitAnswer = () => {
    buttonRef.current.disabled = true;
    inpRef.current.disabled = true;
    let randomNum = Math.floor(entries.length * Math.random());
    setCurrentEntry(entries[randomNum]);
    //whatToAsk();

    const correctAnswer = currentEntry.work1.trim().toLowerCase(); // Assuming we're asking about work1
    const userAnswerClean = userAnswer.trim().toLowerCase();
    // setCurrentQuestionIndex(prev => prev + 1);
    if (userAnswerClean === correctAnswer) {


      correctAudioRef.current.play(); // Play correct sound
      setIsCorrect(true);
      setCorrectCount((prev) => prev + 1);
      setScoreHistory((prev) => [...prev, '✔']);
      setIsCorrect(true); // Correct answer
    } else {
        wrongAudioRef.current.play(); // Play wrong sound
        setIsCorrect(false);
      setIncorrectCount((prev) => prev + 1);
      setScoreHistory((prev) => [...prev, '✖']);
      setIsCorrect(false); // Incorrect answer
    }

    setUserAnswer('');
//currentQuestionIndex starts from 0 but it is unnecessary, cause randomNum is the one that should has a scope that touches 0, but it is ok like this
    if (currentQuestionIndex <= numQuestions - 1) {
      setTimeout(() => {
        inpRef.current.disabled = false;
        buttonRef.current.disabled = false; // Re-enable button after timeout
        // currentQuestionIndex < numQuestions  &&
        setCurrentQuestionIndex((prev) => prev + 1);
        setIsCorrect(null);
        
        // console.log(currentQuestionIndex, numQuestions)
      }, 300); // Delay before showing the next question
    } else {
    //   setIsGameActive(false); // Game over
    }
  };


  return (
    <Div>
    <audio ref={correctAudioRef} src="/Quiz/correct.mp3" />
    <audio ref={wrongAudioRef} src="/Quiz/error.mp3" />
    {/* <audio ref={wrongAudioRef} src={wrongSound} /> */}
      {!isGameActive ? (
        <Div>
          <h1>Start the Quiz</h1> 
          <label>How many questions do you want to answer?</label>
          <form onSubmit={handleStartGame}>
          <Input
            type="number"
            name="num"
            autoFocus
            // inputmode="numeric” 
            placeholder=""
            value={numQuestions}
            onChange={(e) => setNumQuestions(e.target.value)}
          />
          <Button 
        //   onClick={handleStartGame}
          >Start</Button>
          </form>
        </Div>
      ) : (
        <Div>
            {/* row n question y of x */}
          <div style={{ position: 'absolute', top:110, left: 10 }}>
            {scoreHistory.join(' ')}
          </div>
          {currentQuestionIndex < numQuestions && 
          <div style={{ position: 'absolute', top: 110, right: 10 }}>
            Question {currentQuestionIndex + 1} of {numQuestions}
          </div>}
          {/* question */}
          {currentQuestionIndex < numQuestions && currentEntry &&(
            <div>
              <h2>
                What’s the work corresponding to this author: "
                {currentEntry.firstName} {currentEntry.lastName}
                "?
              </h2>
              <Input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                ref={inpRef}
              />
              <Button 
               isCorrect={isCorrect}  
               ref={buttonRef}
              onClick={handleSubmitAnswer}>Submit</Button>
            </div>
          )}
          {currentQuestionIndex >= numQuestions && (
            <div>
              <h2>Quiz Finished!</h2>
              <p>Correct answers: {correctCount}</p>
              <p>Incorrect answers: {incorrectCount}</p>
              <Button onClick={() => setIsGameActive(false)}>Start Over</Button>
            </div>
          )}
        </Div>
        
      )}
    </Div>
  );
};
export default Quiz;
const blink = keyframes`
  0% { background-color: ${theme.palette.color1}; }
//   20% { background-color: green; }
//   45% { background-color: ${theme.palette.color1}; }
  30% { background-color: green; }
  55% { background-color: ${theme.palette.color1}; }
  75% { background-color: green; }
  100% { background-color: ${theme.palette.color1}; }
`;

const blinkWrong = keyframes`
  0% { background-color: ${theme.palette.color1}; }
//   20% { background-color: black; }
//   45% { background-color: ${theme.palette.color1}; }
  30% { background-color: black; }
  55% { background-color: ${theme.palette.color1}; }
  75% { background-color: black; }
  100% { background-color: ${theme.palette.color1}; }
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
//   flex-wrap: wrap;
  gap: 15px;
  padding: 20px;
  background-color: rgb(43, 42, 51);
  font-family: ${theme.fonts.alternative};
  //min-height: calc{window.inneheight};
  min-height: calc(100vh - 333px);

  div, label{
    color: lightgrey;
  }
  h1{
    font-family: ${theme.fonts.alternative2}
  }
`;
const Input = styled.input`
width: 70%;
padding: 10px;
margin: 12px 1%;
border: 1px solid #ccc;
border-radius: 5px;
transition: border-color 0.3s;
box-sizing: border-box;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield; /* For Firefox */

&:focus {
  outline: 3px solid ${theme.palette.color1};
}
&:disabled {
    background-color: #333; /* Dark background for disabled state */
    color: #fff; /* Light text color */
    border: 1px solid #444; /* Darker border for disabled state */
    cursor: not-allowed; /* Change cursor to indicate disabled state */
}
`;
///
const Button = styled.button`
  position: relative;
  color: white;
  border: none;
  padding: 10px 22px;
  cursor: pointer;
  pointer-events: auto;
  border-radius: 7px;
  font-family: ${theme.fonts.alternative};
  font-size: 25px;
  background-color: ${theme.palette.color1};
  ${({ isCorrect }) =>
    isCorrect === true
      ? css`
          animation: ${blink} 0.33s ease-out;
        `
      : isCorrect === false
      ? css`
          animation: ${blinkWrong} 0.33s ease-out;
        `
      : null}


&:hover{
  background-color: ${theme.palette.yellow};
  font-size: 27px;
}
`;