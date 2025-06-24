import React, {useState, useRef} from 'react'
import styled from 'styled-components';
// '../images/clogo.png';
import { Link } from 'react-router-dom'; 
import tic from '../images/bg-pattern-d.png';
import Player from './tic/Player'
import GameBoard from './tic/GameBoard'
import mySound from './tic/kick.wav';
import Log from './tic/Log';
import { WINNING_COMBINATIONS } from './tic/winning-combinations';

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

export default function ProjectTic() {
  const clickSound = useRef(new Audio(mySound)); // Store audio in a ref
  const [turn, setTurn] = useState([]);
  // const [symbol, setSymbol] = useState('X')
  // const [gameBoard, setGameBoard] = useState(initialGameBoard);
  // check if a combination is met
  // console.log("turn", turn);
  const checkWinner = (board) => {
    for (const combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination;
      if (
        board[a.row][a.column] &&
        board[a.row][a.column] === board[b.row][b.column] &&
        board[a.row][a.column] === board[c.row][c.column]
      ) {
        return board[a.row][a.column]; // Return the winning symbol
      }
    }
    return null; // No winner
  };
  //togling players n playing sound
  const handleSelectCell = (rowIndex, index) => {
    clickSound.current.currentTime = 0; // Reset to start
    clickSound.current.play(); // Play the sound

    setTurn(prevState => {
      let symbol = 'X'
      let currentGameBoard = initialGameBoard;
      let turnsNumber = 1;
      if (prevState.length > 0 
        // && prevState[0].symbol === 'X'
      ) {
        // symbol = 'O';
        // currentGameBoard = prevState[0].gameBoard;
        if(prevState[0].symbol === 'X')
          symbol = 'O';
        currentGameBoard = prevState[0].gameBoard;
        turnsNumber = prevState[0].turnsNumber + 1; 
      }
      const copyBoard = 
       [...currentGameBoard.map(row => [...row])]
      copyBoard[rowIndex][index] = symbol;
      let newGameBoard = copyBoard;
      //check if the current game board meet any combination
      let symbolWin = checkWinner(newGameBoard);
      const updatedTurn = [{row: rowIndex,
                           col: index,
                           symbol: symbol,
                           gameBoard: newGameBoard,
                           win: symbolWin,
                           turnsNumber: turnsNumber
      }
        , ...prevState]
      return updatedTurn;
      })

  }

  return (
    <BackgroundDiv>
    <MyContainer>
      <Players> {/* ol */}
        <Player name={"Player 1"} 
        symbol={"X"} 
        isActive={turn[0] && turn[0].symbol === 'X' } 
        />
        <Player name={"Player 2"} 
        symbol={"O"} 
        isActive={turn[0] && turn[0].symbol === 'O'  } 
        />
      </Players>
      <GameBoard gameBoard={turn[0] !== undefined 
                           ? turn[0].gameBoard 
                           : initialGameBoard}
         onSelect={handleSelectCell}
      />
    </MyContainer>
    <MyContainer>
      <Log turn={turn}/>
    </MyContainer>
    
    {(turn[0] && (turn[0].win || turn[0].turnsNumber === 9)) && 
    <GameOver>
      {turn[0].win ? <>
      <h2>{turn[0].win}, u win!</h2>
      <p>In just {turn[0].turnsNumber} moves!</p>
      <h2>🙌</h2>
      </>
      :      <> <h2>Oups! it's a draw!</h2>
      <p>(Well played tho!)</p>
      <h2>😮</h2></>}
      <button 
      onClick={() => {    
        setTurn([]);
      }}
      >Rematch?</button>
    </GameOver>}

    <GoBack to="/projects" >Go Back</GoBack>
    </BackgroundDiv>
  )
}

const GameOver = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(40, 38, 23, 0.95);
  animation: pop-in 0.8s cubic-bezier(0.68, -0.55, 0.65, 0.52) forwards;
  font-family: 'Caprasimo', cursive;
  color: #fcd256;
h2 {
  font-size: 3rem;
  text-align: center;
  margin: 0;
}
  button {
  display: block;
  margin: 0 auto;
  font-size: 1.5rem;
  background: none;
  border: 2px solid #fcd256;
  color: #fcd256;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s, color 0.2s;
  box-shadow: 0 0 8px rgba(255, 187, 0, 0.4);
}
  `
const Players = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  // border: red solid 2px;
`

const MyContainer = styled.div`
  max-width: 45rem;
  min-width: 450px;
  // min-height: 285px;
  margin: 0 auto 15px;
  padding: 2.8rem;
  border-radius: 6px;
  background: linear-gradient(#383624, #282617);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  position: relative;
  // border: 1px red solid;
`;

const BackgroundDiv = styled.div`
//   border: red 1px solid;
  // height: 800px;
  // height: 100vh;
  height: calc(100vh - 120px);
  text-align: center; /* Center content horizontally */
  // height: '100%'
//
  background: radial-gradient(circle at top,
    rgba(241, 210, 70, 0.98),
    // rgba(250, 176, 103, 0.87)
    black
  )
  , url(${tic});
// background-repeat: repeat;
// background-size: 100% 100%, 30% 30%;
// height: 1050px;
// min-height: 100rem;
// border: 1px red solid;
margin: 0;
padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const GoBack = styled(Link)`
  display: inline-block;
  padding: 10px 22px;
  background-color: #0056b3;

  color: #fff;
  text-decoration: none;
  border-radius: 5px;
//   left: 0px;
//   right: 0px;
  margin: 0 auto ;
//   margin-top: 20px;
  transition: background-color 0.3s ease;
align-self: flex-end;
  &:hover {
      background-color: #007bff;
  }
`;