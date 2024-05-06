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

export default Contact;
