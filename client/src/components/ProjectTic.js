import React from 'react'
import styled from 'styled-components';
// '../images/clogo.png';
import { Link } from 'react-router-dom'; 
import tic from '../images/bg-pattern-dark.png';

export default function ProjectTic() {
  return (
    <Div>
    {/* <iframe 
    // src="../../public/Simon/index.html" 
    src="/Cat/index.html"
    title="Game" 
    // width="100%" 
    // height="100%"
    style={{ width: '100%', height: '100%', border: 'none' }}
      allowFullScreen
      // scrolling="no"
    ></iframe> */}
    <GoBack to="/projects" >Go Back</GoBack>
    </Div>
  )
}


const Div = styled.div`
//   border: red 1px solid;
//   height: 800px;
//   height: 100vh;
  height: calc(100vh - 120px);
  text-align: center; /* Center content horizontally */
//   height: '100%'
//
  background: radial-gradient(circle at top,
    rgba(241, 210, 70, 0.98),
    rgba(250, 176, 103, 0.87)
  )
  , url(${tic});
// background-repeat: repeat;
// background-size: 100% 100%, 30% 30%;
// height: 1050px;
min-height: 100rem;
border: 1px red solid;
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

  &:hover {
      background-color: #007bff;
  }
`;