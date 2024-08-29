import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import CanvasA from './CanvasA';
import emailjs from 'emailjs-com'; // Import EmailJS
import { theme } from '../GlobalStyles';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
/////////
const [formData, setFormData] = useState({
  firstName: '',
  lastName: '',
  work1: '',
  yearWork1: '',
  work2: '',
  yearWork2: ''
  // ,image: null // Add image to formData state
});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};

const handleSubmit2 = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('http://localhost:5000/submit'
    //await axios.post('http://localhost:5000/submit'
    , 
    {method: 'POST',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify(formData)});
    alert('Data submitted successfully');
  } catch (error) {
    alert('Error submitting data');
  }
};
/////////
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await emailjs.send(
        'service_rzn96u9', // EmailJS service ID
        'template_c8p1kmr', // EmailJS template ID
        { name, email, message },
        'KR5IclRalC_jHihLx' // EmailJS user ID
      );

      console.log('Email sent successfully');
      // Optionally, reset form fields after successful submission
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const isFormValid = name !== '' && email !== '' && message !== '';

  return (
    <>
      <CanvasA color={"blue"} 
               color2={theme.palette.yellow} 
               fullMoon={true} 
               isInteractive={true} 
               moonPos={{x: 150, y: 100}} />
      <FormContainer>
        <P>Have a project in mind? <br/>  Let's work together!</P>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextArea
            placeholder="...Message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <SubmitButton type="submit" disabled={!isFormValid}>
            Submit
          </SubmitButton>
        </Form>
      </FormContainer>
      <div className="App">
      <h2>Submit Work Data</h2>
      <form onSubmit={handleSubmit2}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="work1"
          placeholder="Work 1"
          value={formData.work1}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="yearWork1"
          placeholder="Year of Work 1"
          value={formData.yearWork1}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="work2"
          placeholder="Work 2"
          value={formData.work2}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="yearWork2"
          placeholder="Year of Work 2"
          value={formData.yearWork2}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
      {/* <Container>
        <Image src="https://picsum.photos/300/200" alt={"sdsds"} />
        <Overlay />
      </Container> */}

    </>
  );
};

// Rest of your styled components...
// Keyframe for button animation
const buttonAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;
// Styled components
const P = styled.p`
  color: white;
  font-size: 22px;
  margin-top: 5px;
  font-family: ${theme.fonts.alternative};
`
const FormContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  opacity:.9;
  transform: translate(-50%, -50%);
  width: 65%;
  max-width: 500px; /* Limit maximum width */
  background-color: ${theme.palette.dark};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
 
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s;
  box-sizing: border-box;

  &:focus {
    // border-color: ${theme.palette.yellow}; /* Change border color when focused */
    // outline:  ${theme.palette.color2};
    outline: 3px solid ${theme.palette.color1};
  }
  `;
  
  const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s;
  box-sizing: border-box;
  
  &:focus {
    outline: 3px solid ${theme.palette.color1};
    // border-color: blue; /* Change border color when focused */
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: ${({ disabled }) => (disabled ? '#ccc' :  theme.palette.yellow)};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.3s;

  &:hover {
    animation: ${buttonAnimation} 0.5s forwards; /* Button animation on hover */
  }
`;
///////////////////////////
const Container = styled.div`
  position: relative;
  width: 300px;
  height: 200px;
  // overflow: hidden;
  border-radius: 10px;

    &:hover img {
    // &:hover  {
      transform: scale(1.1);
    }
    &:hover div {
    // &:hover   {
      opacity: 1;
    }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;
`;
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
`;

export default Contact;