import React from 'react';
import CanvasA from './CanvasA';
import ProjectMenu from './ProjectMenu';
import styled from 'styled-components';
const Projects = () => {
  return (
    <div>


      <ProjectMenu/>
      <CanvasA color={"hsl(261, 100%, 8%)"} 
               color2={"hsl(261, 100%, 8%)"} 
               fullMoon={true} 
               isInteractive={true} 
               moonPos={{x: 150, y: 100}}/>
 
    </div>
  );
};

export default Projects;
