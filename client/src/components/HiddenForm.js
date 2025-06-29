import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import CanvasA from './CanvasA';
import { theme } from '../GlobalStyles';

const HiddenForm = () => {
//////////////////////////////////////////////////////////////////////
const [id, setId] = useState("");
const [idImg, setIdImg] = useState("");
const [idImg2, setIdImg2] = useState("");
const [formData, setFormData] = useState({
  domain: '',
  firstName: '',
  lastName: '',
  work1: '',
  yearWork1: '',
  work2: '',
  yearWork2: ''
  ,imageWork1: null // Add image to formData state
  ,imageWork2: null // State to store the image preview URL
});
const [entries, setEntries] = useState([]);

useEffect(() => {
  // Fetch the JSON data from the public folder
  fetch('/data.json')
    .then((response) => response.json())
    .then((data) => setEntries(data.entries))
    .catch((error) => console.error('Error fetching JSON:', error));
}, []);
/////////////////////////////////////////////////////////////////////
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

    if (name === 'imageWork1' && files && files.length > 0) {
      const file = files[0];
      const imageWork1 = URL.createObjectURL(file);
      setFormData({ ...formData, imageWork1 });
    }  
    else   if (name === 'imageWork2' && files && files.length > 0) {
      const file = files[0];
      const imageWork2 = URL.createObjectURL(file);
      setFormData({ ...formData, imageWork2});
    }else {
      setFormData({ ...formData, [name]: value });
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const data = new FormData();
  console.log("data by def  ", data);

  // Append form data to FormData object
  // for (const key in formData) {
  //   if (key !== 'image')  // siempre y cuando no sea imagePreview
  //       data.append(key, formData[key]);
  // }
   // Append form data to FormData object
   for (const key in formData) {
    if (key !== 'image') 
    // if (key === 'imageWork1' || key === 'imageWork2') {
    //   if (formData[key]) {
    //     data.append(key, formData[key]);
    //   }
    // } else {
      data.append(key, formData[key]);
    // }
  }
  data.append('imageWork1', document.querySelector('input[name="imageWork1"]').files[0])
  data.append('imageWork2', document.querySelector('input[name="imageWork2"]').files[0])
  try {
    console.log("data 2 send ", data);
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
//id thingy////////////////////////////////////////////////////////////////////
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
      setIdImg(data.imageWork1);
      setIdImg2(data.imageWork2);
      // You can do something with the retrieved data, like displaying it
    } else {
      alert('No data found with this id');
    }
    // alert('Data fetched successfully');
  } catch (error) {
    alert('Error fetching data');
  }
};
//id////////////////////////////////////////////////////////////////////////////
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
            <option value={"Architect"}>Architect</option>
            <option value={"Author"}>Author</option>
            <option value={"Composer"}>Composer</option>
            <option value={"Libretist"}>Libretist</option>
            <option value={"Philosopher"}>Philosopher</option>
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
          name="imageWork1"
          accept="image/*"
          onChange={handleChange}
          required
        />
        <Input2
          type="file"
          name="imageWork2"
          accept="image/*"
          onChange={handleChange}
          required
        />
          <SubmitButton type="submit" disabled={!isFormValid}>
            Submit
          </SubmitButton>
          </Form>
          {/* show what's gonna be submitted */}
          <P>{formData.domain && formData.domain + "."}</P>
          {formData.imageWork1 && <Container>
                <Image src={formData.imageWork1}/>
            </Container>}
            {formData.imageWork2 && <Container>
                <Image src={formData.imageWork2}/>
            </Container>}
      </FormContainer>
    </div>

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
          <EntriesContainer>
         {idImg && <Image src={`http://localhost:5000/${idImg}`}/>}
         {idImg2 && <Image src={`http://localhost:5000/${idImg2}`}/>}
         </EntriesContainer>
    </Form>

    <EntriesContainer>{Object.values(entries).map(entryArray => 
    (<h3 style={{color:"lightgrey"}}>{entryArray[0] && (entryArray[0].domain + 's')} {entryArray.map((entry) => (
      <EntryCell key={entry.id}>
        {/* <p>ID: {entry.id}</p> */}
        <p>Domain: {entry.domain}</p>
        <Box>
        <p>{entry.firstName},&nbsp;</p>
        <p style={{color:"red", fontSize: "24px"}}>{entry.lastName}</p>
        </Box>
        <Flexbox>
        <div>
          <p style={{ fontSize: "14px"}}>{entry.work1}</p>
          <p>{entry.yearWork1}</p>
          {entry.imageWork1 && <Image src={`http://localhost:5000/${entry.imageWork1}`}/>}
        </div>
        <div>
        <p style={{ fontSize: "14px"}}>{entry.work2}</p>
        <p>{entry.yearWork2}</p>
        {entry.imageWork2 && <Image src={`http://localhost:5000/${entry.imageWork2}`}/>}
        </div>
        </Flexbox>
      </EntryCell>
    ))}</h3>))}</EntriesContainer>
    {/* <EntriesContainer>
        {entries.map((entry) => (
          <EntryCell key={entry.id}>
            <p>ID: {entry.id}</p>
            <p>Domain: {entry.domain}</p>
            <p>First Name: {entry.firstName}</p>
            <p>Last Name: {entry.lastName}</p>
            <Flexbox>
            <div>
              <p>Work 1: {entry.work1}</p>
              <p>Year Work 1: {entry.yearWork1}</p>
              {entry.imageWork1 && <Image src={`http://localhost:5000/${entry.imageWork1}`}/>}
            </div>
            <div>
            <p>Work 2: {entry.work2}</p>
            <p>Year Work 2: {entry.yearWork2}</p>
            {entry.imageWork2 && <Image src={`http://localhost:5000/${entry.imageWork2}`}/>}
            </div>
            </Flexbox>
          </EntryCell>
        ))}
      </EntriesContainer> */}
   {/* <EntriesContainer>
        {entries.map((entry) => (
          <EntryCell key={entry.id}>
            <p>ID: {entry.id}</p>
            <p>Domain: {entry.domain}</p>
            <p>First Name: {entry.firstName}</p>
            <p>Last Name: {entry.lastName}</p>
            <Flexbox>
            <div>
              <p>Work 1: {entry.work1}</p>
              <p>Year Work 1: {entry.yearWork1}</p>
              {entry.imageWork1 && <Image src={`http://localhost:5000/${entry.imageWork1}`}/>}
            </div>
            <div>
            <p>Work 2: {entry.work2}</p>
            <p>Year Work 2: {entry.yearWork2}</p>
            {entry.imageWork2 && <Image src={`http://localhost:5000/${entry.imageWork2}`}/>}
            </div>
            </Flexbox>
          </EntryCell>
        ))}
      </EntriesContainer> */}
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
// Styled components for display
const EntriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  padding: 20px;
  background-color: rgb(43, 42, 51);
`;

const EntryCell = styled.div`
  // border: 1px solid #ccc;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 12px;
  padding: 15px;
  background-color: rgba(66, 65, 77, 1);
  color: lightgrey;
  width: 300px;
  text-align: center;
  rgba(66, 65, 77, 1)
  div {
  }
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-top: 10px;
  }

  p {
    margin: 5px 0;
  }
`;

const Flexbox =  styled.div`
  display: flex;
  flex-direcion: row;
  border: 1px red solid;
  text-align: center;
  div{ margin: 0 auto;} 
`
const Box =  styled.div`
  display: flex;
  flex-direcion: row;
  border: 1px red solid;
  text-align: center;
  justify-content: center;
  align-items:  end;
`

export default HiddenForm;