import React, {useState} from 'react'
import styled, { keyframes, css } from 'styled-components';

// const initialGameBoard = [
//     [null, null, null],
//     [null, null, null],
//     [null, null, null],
// ];

const GameBoard = ({gameBoard, onSelect}) => {
    // const [gameBoard, setGameBoard] = useState(initialGameBoard);

    // const handleSelectCell = (rowIndex, index, symbol) => {
        //update in a inmutable way
        // setGameBoard(prevState => {
        //     const copyBoard = 
        //     [...prevState.map(row => [...row])];
        //     copyBoard[rowIndex][index] = symbol;
        //     return copyBoard;
        // });
        // onSelect();//toggle player n its symbol
    // }

    return ( 
        <MyBoard>
         {gameBoard.map((row, rowIndex) => 
            <li key={rowIndex}>
                <ol> {row.map( (unitCell, index) =>
                    <li key={index}>
                    <button
                    onClick={() => onSelect(rowIndex, index)}
                    // onClick={()=>{handleSelectCell(rowIndex, index, symbol)}}
                    disabled={unitCell !== null}
                    >{unitCell}</button>
                    </li>
                )} </ol>
            </li> 
         )}
        </MyBoard>
    );
}

export default GameBoard;

const MyBoard = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin: 3rem 0;
  padding: 0;
  flex-direction: column;

  list-style: none;
  margin: 0;
  padding: 0;
  
  ol {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
//   justify-content: space-between;
//   border: 1px red solid;
  gap: 2rem;
  margin: 0;
  padding: 0;

  list-style: none;
  margin: 0;
  padding: 0;
}
  button {
  width: 7rem;
  height: 7rem;
  border: none;
  background: #aca788;
  color: #3f3b00;
  font-size: 6rem;
  cursor: pointer;
  font-family: 'Caprasimo', cursive;
  padding: 1rem;

  display: flex; /* Center content */
  align-items: flex-end; /* Vertically center */
//   align-items: center; /* Vertically center */
//   align-items: flex-start; /* Vertically center */
  justify-content: center; /* Horizontally center */
//   text-align: center; /* Ensure text is centered */
  line-height: 1; /* Prevent extra spacing */
}
`