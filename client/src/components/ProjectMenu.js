import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import Card from './Card';
// Mock data for projects
// Card component remains the same as before
const projectsData = [
    { title: 'Project 1', image: 'image1.jpg', link: 'project1-link' },
    { title: 'Project 2', image: 'image2.jpg', link: 'project2-link' },
    { title: 'Project 3', image: 'image3.jpg', link: 'project3-link' }
  ];

// ProjectMenu component
const ProjectMenu = ({setNewHeight}) => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const menuRef = useRef(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        console.log("USE EFFECTS projects!");

        const response1 = await fetch('https://picsum.photos/200');
        const response2 = await fetch('https://picsum.photos/201');
        const response3 = await fetch('https://picsum.photos/200');
        
        const imageUrl1 = response1.url;
        const imageUrl2 = response2.url;
        const imageUrl3 = response3.url;
  
        const newProjects = [
          { title: 'Simon', 
            image: imageUrl1, 
            link: '/projects/1Simon' },

          { title: 'Space Cat', 
            image: imageUrl2, 
            link: '/projects/2Cat' },

          { title: 'Tic Tac Toe', 
            image: imageUrl3, 
            link: '/projects/3Tic' }
        ];
        setProjects(newProjects);
        setIsLoading(false); // Set loading state to false after fetching images
        console.log("USE EFFECTS projects", newProjects);
      
      } catch (error) {
        console.error('Error fetching random images:', error);
        setIsLoading(false); // Set loading state to false if there's an error
      }
    };
  
    fetchImages()
    // fetch('https://source.unsplash.com/random/200x200?sig=1')
    //   .then(response => response.url)
    //   .then(randomImageUrl => {
    //     const newProjects = projectsData.map(project => ({
    //       ...project,
    //       image: randomImageUrl
    //     }));
    //     setProjects(newProjects);
    //   })
    //   .catch(error => console.error('Error fetching random image:', error));
  }, []);

  useEffect(() => {
    const updateMenuHeight = () => {
      if (menuRef.current) {
        setNewHeight(menuRef.current.offsetHeight);
        console.log("from projectmenu, project height ", menuRef.current.clientHeight, menuRef.current.offsetHeight);
      }
    };

    window.addEventListener('resize', updateMenuHeight);
    updateMenuHeight(); // Call initially to set height on component mount

    return () => {
      window.removeEventListener('resize', updateMenuHeight);
    };
  }, [setNewHeight, isLoading]);
  console.log("projects", projects);

  return (
    <MenuContainer ref={menuRef}>
    {isLoading 
      ? (
        <LoadingContainer>
          <StarSpinner />
          <LoadingText>Loading...</LoadingText>
        </LoadingContainer>) 
      : (
        projects.map((project, index) => (
          <Card key={index} project={project} />
        ))
      )}
    </MenuContainer>
  );
};
// Styled component for ProjectMenu container
const MenuContainer = styled.div`
  position: absolute;
  top: 22%;
  top: 235px;;
  left: 0; /* Add this to reset left position */
  right: 0; /* Add this to reset right position */
  margin: 0 auto; /* Horizontally center */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  z-index: 2;
`;
  // Keyframes for spinning animation
  const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
  `;
  // Styled components for loading spinner and text
const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StarSpinner = styled.div`
  width: 30px;
  height: 30px;
  border: 2px solid #f0db4f;
  border-radius: 50%;
  // border-top: 2px solid transparent;
  animation: ${spinAnimation} 0.8s linear infinite;
`;

const LoadingText = styled.p`
  margin-top: 10px;
`;
export default ProjectMenu;
