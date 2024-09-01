import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import CanvasA from './CanvasA';
import { theme } from '../GlobalStyles';

const HiddenForm = () => {
/////////////////////////////////////////////
const [id, setId] = useState("");
const [idImg, setIdImg] = useState("");
const [formData, setFormData] = useState({
  domain: '',
  firstName: '',
  lastName: '',
  work1: '',
  yearWork1: '',
  work2: '',
  yearWork2: ''
  ,image: null // Add image to formData state
  ,imagePreview: null // State to store the image preview URL
});

// const handleChange = (e) => {
//   const { name, value } = e.target;
// //   setFormData({ ...formData, [name]: value });
//     // Handle file input separately
// if (name === 'image') {
//         setFormData({ ...formData, image: e.target.files[0] });
//       } else {
//         setFormData({ ...formData, [name]: value });
//       }
// };
const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image' && files.length > 0) {
      const file = files[0];
      const imagePreview = URL.createObjectURL(file);
      setFormData({ ...formData, image: file, imagePreview });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const data = new FormData();

  // Append form data to FormData object
  for (const key in formData) {
    if (key !== 'imagePreview')  // siempre y cuando no sea imagePreview
        data.append(key, formData[key]);
  }
  try {
    const response = await fetch('http://localhost:5000/submit',
    //await axios.post('http://localhost:5000/submit' 
                                {method: 'POST',
                                // headers: {'Content-Type': 'multipart/form-data'},
                                // headers: {'Content-Type': 'multipart/form-data'},
                                body: data});
    alert('Data submitted successfully');
  } catch (error) {
    alert('Error submitting data');
  }
};
//id thingy
const handleIdChange = (e) => {
  setId(e.target.value);
};
const handleIdSubmit = async (e) => {
  e.preventDefault();
  try {
    // const response = await fetch(`http://localhost:5000/query?id=${id}`, {
    const response = await fetch(`http://localhost:5000/getById/${id}`, {
      method: 'GET',
    });

    // const data = await response.json();
    if (response.ok) {
      const data = await response.json();
      console.log('Data retrieved successfully:',data);
      alert('Data retrieved successfully:', data);
      setIdImg(data.imagePreview);
      // You can do something with the retrieved data, like displaying it
    } else {
      alert('No data found with this id');
    }
    alert('Data fetched successfully');
  } catch (error) {
    alert('Error fetching data');
  }
};
//id
  const isFormValid = formData.firstName !== '' 

  return (
    <>
      <CanvasA color={"blue"} 
               color2={theme.palette.yellow} 
               fullMoon={true} 
               isInteractive={true} 
               moonPos={{x: 150, y: 100}} />
      <div className="App">
      <FormContainer >
      <Form onSubmit={handleSubmit}>
        <Select     name="domain"
                    value={formData.domain}
                    onChange={handleChange}>
            <option value={null}></option>
            <option value={"Artist"}>Artist</option>
            <option value={"Author"}>Author</option>
            <option value={"Composer"}>Composer</option>
        </Select>
        <Input1
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <Input1
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="work1"
          placeholder="Work 1"
          value={formData.work1}
          onChange={handleChange}
          required
        />
        <Input2
          type="number"
          name="yearWork1"
          placeholder="Year of Work 1"
          min={0}
          value={formData.yearWork1}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="work2"
          placeholder="Work 2"
          value={formData.work2}
          onChange={handleChange}
          required
        />
        <Input2
          type="number"
          name="yearWork2"
          placeholder="Year of Work 2"
          min={0}
          value={formData.yearWork2}
          onChange={handleChange}
          required
        />
        <Input2
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
        />
          <SubmitButton type="submit" disabled={!isFormValid}>
            Submit
          </SubmitButton>
          </Form>
          <P>{formData.domain && formData.domain + "."}</P>
          {formData.imagePreview && <Container>
                <Image src={formData.imagePreview}/>
            </Container>}
      </FormContainer>
    </div>
    {/* <Div> */}
    {/* <FormContainer> */}
    <Form onSubmit={handleIdSubmit}>
          <Input
            type="text"
            name="id"
            placeholder="id"
            value={id}
            onChange={handleIdChange}
            required
          />
          <SubmitButton type="submit" disabled={!id}>
            Query by ID
          </SubmitButton>
          {idImg && 
           <Image src={idImg}/>}          
           {idImg && 
           <Image src={`http://localhost:5000/${idImg}`}/>}
    </Form>
    {/* </FormContainer> */}
    {/* </Div> */}
    </>
  );
};
//style keyframes
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
  padding-bottom: 0px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
//   flex-direction: column;
`;

const Input1 = styled.input`
  width: 47%;
  padding: 10px;
  margin: 12px 1%;
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
  const Input = styled.input`
  width: 70%;
  padding: 10px;
  margin: 12px 1%;
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
  const Input2 = styled.input`
  width: 24%;
  padding: 10px;
  margin: 12px 4px;
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
  
  const Select = styled.select`
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

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: ${({ disabled }) => (disabled ? '#ccc' :  theme.palette.yellow)};
  color: white;
  border: none;
  border-radius: 5px;
  margin: 12px 0;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.3s;

  &:hover {
    animation: ${buttonAnimation} 0.5s forwards; /* Button animation on hover */
  }
`;
/////////////////////////// for images
const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  // height: 200px;
  overflow: hidden;
  border-radius: 10px;
  border: 1px red solid;
  margin-bottom: 15px;
  padding: 10px 0px;


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
  width: 90%;
  max-height: 300px;
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
const Div = styled.div`
    position: absolute;
  top: 0;
  // left: 0;
  // right: 10;
  // bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  border: red 2px solid;
`
export default HiddenForm;