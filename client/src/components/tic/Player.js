import React, {useState} from 'react'; //, { useState, useEffect, useRef }
import styled, { keyframes, css } from 'styled-components';

const Player = ({name, symbol, isActive}) => {

    const [isEditing, setIsEditing] = useState(true);
    const [playerName, setPlayerName ] = useState(name);

    const handleEditClick = () => {
        setIsEditing((prevState) => !prevState);
    }
    const handleInputEdit = (e) => {
        setPlayerName(e.target.value)
    }
    return (
        <>
        <Li isActive={isActive}>
          {isEditing 
          ? <div>
            <span>{playerName}</span>
            <span>{symbol}</span>
            </div> 
          : <Input type="text" required 
          value={playerName} onChange={handleInputEdit}/>}
          <Span><button onClick={handleEditClick}>
            {isEditing
            ? "Edit"
            : "Save"
        }</button></Span>
        </Li>
        </>
    )
}

export default Player;

const Input = styled.input` font: inherit;
font-size: 1rem;
width: 10rem;
border: none;
padding: 0.5rem;
animation: pulse-text 2s infinite;
background-color: #46432f;
text-align: center;
text-transform: uppercase;
` 
const Span = styled.span`
margin-left: 1rem;
// border: 1px red solid;
display: flex; /* Ensures the button is aligned properly */
align-items: center; /* Centers the button vertically */

button {
    font-size: 1rem;
    font-weight: bold;
    padding: 8px;
    // background: gray;
    width: 3rem;
    border: none;
    background: none;
    color: #c3ba78;
    cursor: pointer;
    transition: color 0.2s;
    padding: 0.5rem 0.25rem 0.25rem 0.25rem;
    // line-height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    // text-align: center;
    }

    button:hover {
    color: #f8ca31;
    }
`
const shine = keyframes`
//   0% { box-shadow: 0 0 5px yellow; }
  50% { box-shadow: 0 0 25px yellow; }
//   100% { box-shadow: 0 0 5px yellow; }
`;
// const pulse = keyframes`
//       border-color: #f8c031;
//       box-shadow: 0 0 0 2rem rgba(248, 165, 49, 0);
// `
// @keyframes pulse {
//     0% {
//       border-color: #f6e35a;
//       box-shadow: 0 0 0 0 rgba(246, 227, 90, 0.4);
//     }
//     50% {
//       border-color: #f8c031;
//       box-shadow: 0 0 0 0.5rem rgba(248, 165, 49, 0);
//     }
//     100% {
//       border-color: #f6e35a;
//       box-shadow: 0 0 0 0 rgba(246, 227, 90, 0);
//     }
//   }
const Li = styled.li`
    display: flex;
    align-items: center;
    padding: 8px;
    background-color: #222;
    border-radius: 10px;

    border: 2px solid transparent;
    font-weight: bold;

    span:first-child {
    color: #4CAF50; /* Green color for first span */
    font-size: 1.2rem;
    margin-right: 1rem;
  }

    span:last-child {
    color: #FF5733; /* Orange-Red color for second span */
    font-size: 1.5rem;
    }
    // transition: box-shadow 0.5s ease-in-out;
        
     ${({ isActive }) => 
        isActive && 
        css`
            border-color: yellow;
            background-color: #333;
            box-shadow: 0px 0px 10px yellow;
            // animation: pulse 1s infinite ease-in-out;
            animation: ${shine} 0.7s ease-out;
            // box-shadow: 0px 0px 20px yellow;
            `
    }

`