import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import mePic from '../images/mePic.png'

const MyImage = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      // Once the images are loaded, set the loaded state to true
      setLoaded(true);
    };

    // Add event listener to handle the image load event
    window.addEventListener('load', handleLoad);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <ImageContainer>
      <Image
        src={mePic}
        alt="Nature Image 1"
        loaded={loaded}
      />
      {/* <Image
        src="https://source.unsplash.com/random/200x200/?water"
        alt="Water Image 2"
        loaded={loaded}
      /> */}
    </ImageContainer>
  );
};

// Styled components
const ImageContainer = styled.div`
  display: flex;
  position: absolute;
  z-index: 1 ;
  left: 15%; 
  top: 45% ;
`;

const Image = styled.img`
  border: 1px white solid;
  border-radius: 50%;
  width: 255px; /* Adjust size as needed */
  height: 280px; /* Adjust size as needed */
  // height: auto; /* Maintain aspect ratio */
  // opacity: 0; /* Initially set opacity to 0 */
  transition: opacity 1s ease; /* Add transition effect for opacity */
  ${({ loaded }) => loaded && 'opacity: 1;'} /* Set opacity to 1 if loaded */
`;

export default MyImage;
