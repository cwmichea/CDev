import React, { useState } from 'react';
import CanvasA from './CanvasA';
import ProjectMenu from './ProjectMenu';
import styled from 'styled-components';
const Projects = () => {

  const [height, setHeight] = useState(0);

  const handleHeihgt = (newHeight) => {
    setHeight(newHeight);
    console.log("from projects, height", newHeight)
    //maybe we have to use key as well 
    //we should alter a key only if 
  }

  return (
    <div id='bigdiv'>
      <ProjectMenu setNewHeight={handleHeihgt}/>
      <CanvasA color={"hsl(261, 100%, 8%)"} 
               color2={"hsl(261, 100%, 8%)"} 
               fullMoon={true} 
               isInteractive={true} 
               moonPos={{x: 150, y: 100}}
               height={"1034px"}
              //  key={height}
               />
    </div>
  );
};

export default Projects;
