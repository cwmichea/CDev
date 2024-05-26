import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import CanvasA from './CanvasA';
import emailjs from 'emailjs-com'; // Import EmailJS
import { theme } from '../GlobalStyles';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

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
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <SubmitButton type="submit" disabled={!isFormValid}>
            Submit
          </SubmitButton>
        </Form>
      </FormContainer>
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
const FormContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 65%;
  max-width: 500px; /* Limit maximum width */
  background-color: #f9f9f9;
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

  &:focus {
    border-color: blue; /* Change border color when focused */
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s;

  &:focus {
    border-color: blue; /* Change border color when focused */
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: ${({ disabled }) => (disabled ? '#ccc' : 'blue')};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.3s;

  &:hover {
    animation: ${buttonAnimation} 0.5s forwards; /* Button animation on hover */
  }
`;

export default Contact;