import React from "react";
import styled  from 'styled-components';

const Log = ({turn}) => {

    return (
     <Ol>
        {turn.map(aTurn => 
            <li key={`${aTurn.row}${aTurn.col}`}>
            {aTurn.symbol} plays at row:{aTurn.row+1} col:{aTurn.col+1}
            </li>
        )}
     </Ol>   
    );
}

export default Log;

const Ol = styled.ol`
  list-style: none;
  max-width: 20rem;
  color: #3f3b00;
  color: gray;
  margin: 0 auto;
  padding: 0;
  text-align: center;
li {
  border-radius: 4px;
  animation: slide-in-from-left 1s cubic-bezier(0.075, 0.82, 0.165, 1) forwards;
  margin: 0.3rem;
}
    
`