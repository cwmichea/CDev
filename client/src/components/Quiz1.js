// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// // import axios from 'axios'; // or your preferred HTTP client

// // Styled components
// const Container = styled.div`
//   padding: 20px;
// `;

// const Columns = styled.div`
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   gap: 20px;

//   @media (max-width: 1200px) {
//     grid-template-columns: repeat(3, 1fr);
//   }

//   @media (max-width: 900px) {
//     grid-template-columns: repeat(2, 1fr);
//   }

//   @media (max-width: 600px) {
//     grid-template-columns: 1fr;
//   }
// `;

// const Column = styled.div`
//   background-color: #f5f5f5;
//   border-radius: 8px;
//   padding: 15px;
//   box-shadow: 0 2px 4px rgba(0,0,0,0.1);
// `;

// const TitleButton = styled.button`
//   background-color: #4a6fa5;
//   color: white;
//   border: none;
//   padding: 10px 15px;
//   border-radius: 5px;
//   cursor: pointer;
//   width: 100%;
//   text-align: left;
//   font-weight: bold;
//   margin-bottom: 10px;
//   transition: all 0.2s;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;

//   &:hover {
//     background-color: #3a5a8a;
//     transform: translateY(-1px);
//   }
// `;

// const VerbsList = styled.div`
//   margin-top: 10px;
// `;

// const VerbButton = styled.button`
//   background-color: #6c8fc7;
//   color: white;
//   border: none;
//   padding: 8px 12px;
//   border-radius: 5px;
//   cursor: pointer;
//   width: 100%;
//   text-align: left;
//   margin-bottom: 5px;
//   transition: all 0.2s;
//   display: flex;
//   justify-content: space-between;

//   &:hover {
//     background-color: #5a7eb5;
//     transform: translateX(3px);
//   }
// `;

// const MeaningsList = styled.ul`
//   list-style-type: none;
//   padding-left: 15px;
//   margin-top: 5px;
// `;

// const MeaningItem = styled.li`
//   padding: 8px 0;
//   cursor: default;
//   position: relative;
//   border-bottom: 1px solid #eee;
//   transition: all 0.2s;

//   &:hover {
//     background-color: #e9e9e9;
//     padding-left: 5px;
    
//     &::after {
//       content: attr(data-hint);
//       position: absolute;
//       left: 100%;
//       top: 50%;
//       transform: translateY(-50%);
//       background-color: #333;
//       color: white;
//       padding: 5px 10px;
//       border-radius: 5px;
//       white-space: nowrap;
//       z-index: 10;
//       margin-left: 10px;
//       box-shadow: 0 2px 5px rgba(0,0,0,0.2);
//     }
//   }

//   &:last-child {
//     border-bottom: none;
//   }
// `;

// const Loading = styled.div`
//   text-align: center;
//   padding: 20px;
//   font-size: 1.2rem;
//   color: #666;
// `;

// const ErrorMessage = styled.div`
//   color: #d32f2f;
//   background-color: #fde7e7;
//   padding: 15px;
//   border-radius: 5px;
//   margin: 20px 0;
//   text-align: center;
// `;

// const Quiz1 = () => {
//   const [verbs, setVerbs] = useState({});
//   const [expandedTitles, setExpandedTitles] = useState({});
//   const [expandedVerbs, setExpandedVerbs] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchVerbs = async () => {
//       try {
//         // Replace with your MongoDB API endpoint
//         // const response = await axios.get('/api/verbs');
        
//         // Using native fetch instead of axios
//         const response = await fetch('http://localhost:5000/api/verbs');
        
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
        
//         const data = await response.json();
//         console.log("data ", data);

//         // Group verbs by title
//         const groupedVerbs = data.reduce((acc, verb) => {
//           if (!acc[verb.title]) {
//             acc[verb.title] = [];
//           }
//           acc[verb.title].push(verb);
//           return acc;
//         }, {});
//         setVerbs(groupedVerbs);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching verbs: ", err);
//         setError(err.message || 'Failed to load verbs');
//         setLoading(false);
//       }
//     };

//     fetchVerbs();
//   }, []);

//   const toggleTitle = (title) => {
//     setExpandedTitles(prev => ({
//       ...prev,
//       [title]: !prev[title]
//     }));
//   };

//   const toggleVerb = (verbId) => {
//     setExpandedVerbs(prev => ({
//       ...prev,
//       [verbId]: !prev[verbId]
//     }));
//   };

//   if (loading) {
//     return <Loading>Loading verbs...</Loading>;
//   }

//   if (error) {
//     return <ErrorMessage>{error}</ErrorMessage>;
//   }

//   return (
//     <Container>
//       <Columns>
//         {Object.entries(verbs).map(([title, verbGroup]) => (
//           <Column key={title}>
//             <TitleButton onClick={() => toggleTitle(title)}>
//               <span>{title}</span>
//               <span>({verbGroup.length})</span>
//             </TitleButton>
            
//             {expandedTitles[title] && (
//               <VerbsList>
//                 {verbGroup.map((verb) => (
//                   <div key={verb.id}>
//                     <VerbButton onClick={() => toggleVerb(verb.id)}>
//                       <span>{verb.verb}</span>
//                       <span>({verb.meaning.length})</span>
//                     </VerbButton>
                    
//                     {expandedVerbs[verb.id] && (
//                       <MeaningsList>
//                         {verb.meaning.map((meaning, idx) => (
//                           <MeaningItem 
//                             key={`${verb.id}-meaning-${idx}`}
//                             data-hint={verb.hint?.[idx] || ''}
//                           >
//                             {meaning}
//                           </MeaningItem>
//                         ))}
//                       </MeaningsList>
//                     )}
//                   </div>
//                 ))}
//               </VerbsList>
//             )}
//           </Column>
//         ))}
//       </Columns>
//     </Container>
//   );
// };

// export default Quiz1;
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled components - all in one place without duplicates
const Container = styled.div`
  padding: 20px;
`;

const Loading = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 1.2rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  background-color: #fde7e7;
  padding: 15px;
  border-radius: 5px;
  margin: 20px 0;
  text-align: center;
`;

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Column = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const TitleButton = styled.button`
  background-color: #4a6fa5;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  text-align: left;
  font-weight: bold;
  margin-bottom: 10px;
  transition: all 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: #3a5a8a;
    transform: translateY(-1px);
  }
`;

const VerbsList = styled.div`
  margin-top: 10px;
`;

const VerbButton = styled.button`
  background-color: #6c8fc7;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  text-align: left;
  margin-bottom: 5px;
  transition: all 0.2s;
  display: flex;
  justify-content: space-between;

  &:hover {
    background-color: #5a7eb5;
    transform: translateX(3px);
  }
`;

const MeaningsList = styled.ul`
  list-style-type: none;
  padding-left: 15px;
  margin-top: 5px;
`;

const MeaningItem = styled.li`
  padding: 8px 0;
  cursor: default;
  position: relative;
  border-bottom: 1px solid #eee;
  transition: all 0.2s;

  &:hover {
    background-color: #e9e9e9;
    padding-left: 5px;
    
    &::after {
      content: attr(data-hint);
      position: absolute;
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      background-color: #333;
      color: white;
      padding: 5px 10px;
      border-radius: 5px;
      white-space: nowrap;
      z-index: 10;
      margin-left: 10px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }
  }

  &:last-child {
    border-bottom: none;
  }
`;

const FormContainer = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const FormTitle = styled.h2`
  color: #4a6fa5;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const MeaningRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 40px;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
`;

const AddButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const SubmitButton = styled.button`
  background-color: #4a6fa5;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s;
  margin-top: 15px;

  &:hover {
    background-color: #3a5a8a;
    transform: translateY(-2px);
  }
`;
// Previous styled components (Columns, Column, TitleButton, etc.) remain the same...

const Quiz1 = () => {
  const [verbs, setVerbs] = useState({});
  const [expandedTitles, setExpandedTitles] = useState({});
  const [expandedVerbs, setExpandedVerbs] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    verb: '',
    meaning: [''],
    hint: [''],
    example: ['']
  });
  const [meaningCount, setMeaningCount] = useState(1);

  useEffect(() => {
    fetchVerbs();
  }, []);

  const fetchVerbs = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/verbs');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("data ", data);

      // Group verbs by title
      const groupedVerbs = data.reduce((acc, verb) => {
        if (!acc[verb.title]) {
          acc[verb.title] = [];
        }
        acc[verb.title].push(verb);
        return acc;
      }, {});
      setVerbs(groupedVerbs);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching verbs: ", err);
      setError(err.message || 'Failed to load verbs');
      setLoading(false);
    }
  };

  const toggleTitle = (title) => {
    setExpandedTitles(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const toggleVerb = (verbId) => {
    setExpandedVerbs(prev => ({
      ...prev,
      [verbId]: !prev[verbId]
    }));
  };

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMeaningChange = (index, field, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData(prev => ({
      ...prev,
      [field]: newArray
    }));
  };

  const addMeaningRow = () => {
    setFormData(prev => ({
      ...prev,
      meaning: [...prev.meaning, ''],
      hint: [...prev.hint, ''],
      example: [...prev.example, '']
    }));
    setMeaningCount(prev => prev + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Generate a simple ID (in a real app, this would come from the server)
      const newVerb = {
        ...formData,
        id: `${formData.title}${Math.floor(Math.random() * 1000)}`
      };

      // Filter out empty meanings
      newVerb.meaning = newVerb.meaning.filter(m => m.trim() !== '');
      newVerb.hint = newVerb.hint.filter((h, i) => i < newVerb.meaning.length);
      newVerb.example = newVerb.example.filter((ex, i) => i < newVerb.meaning.length);

      const response = await fetch('http://localhost:5000/api/verbs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newVerb),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Reset form
      setFormData({
        title: '',
        verb: '',
        id: '',
        meaning: [''],
        hint: [''],
        example: ['']
      });
      setMeaningCount(1);

      // Refresh the verbs list
      fetchVerbs();
    } catch (err) {
      console.error("Error adding verb: ", err);
      setError(err.message || 'Failed to add verb');
    }
  };

  if (loading) {
    return <Loading>Loading verbs...</Loading>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <Container>
      {/* Add Verb Form */}
      <FormContainer>
        <FormTitle>Add New Verb</FormTitle>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel>Title</FormLabel>
            <FormInput
              type="text"
              name="id"
              value={formData.id}
              onChange={handleInputChange}
              required
            />
          </FormGroup>          
          <FormGroup>
            <FormLabel>Title</FormLabel>
            <FormInput
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <FormLabel>Verb</FormLabel>
            <FormInput
              type="text"
              name="verb"
              value={formData.verb}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <FormLabel>Meanings, Hints, and Examples</FormLabel>
            {Array.from({ length: meaningCount }).map((_, index) => (
              <MeaningRow key={index}>
                <FormInput
                  type="text"
                  placeholder="Meaning"
                  value={formData.meaning[index] || ''}
                  onChange={(e) => handleMeaningChange(index, 'meaning', e.target.value)}
                  required={index === 0}
                />
                <FormInput
                  type="text"
                  placeholder="Hint"
                  value={formData.hint[index] || ''}
                  onChange={(e) => handleMeaningChange(index, 'hint', e.target.value)}
                />
                <FormInput
                  type="text"
                  placeholder="Example"
                  value={formData.example[index] || ''}
                  onChange={(e) => handleMeaningChange(index, 'example', e.target.value)}
                />
                {index === meaningCount - 1 && (
                  <AddButton type="button" onClick={addMeaningRow}>
                    +
                  </AddButton>
                )}
              </MeaningRow>
            ))}
          </FormGroup>
          
          <SubmitButton type="submit">Add Verb</SubmitButton>
        </form>
      </FormContainer>

      {/* Verbs List */}
      <Columns>
        {Object.entries(verbs).map(([title, verbGroup]) => (
          <Column key={title}>
            <TitleButton onClick={() => toggleTitle(title)}>
              <span>{title}</span>
              <span>({verbGroup.length})</span>
            </TitleButton>
            
            {expandedTitles[title] && (
              <VerbsList>
                {verbGroup.map((verb) => (
                  <div key={verb.id}>
                    <VerbButton onClick={() => toggleVerb(verb.id)}>
                      <span>{verb.verb}</span>
                      <span>({verb.meaning.length})</span>
                    </VerbButton>
                    
                    {expandedVerbs[verb.id] && (
                      <MeaningsList>
                        {verb.meaning.map((meaning, idx) => (
                          <MeaningItem 
                            key={`${verb.id}-meaning-${idx}`}
                            data-hint={verb.hint?.[idx] || ''}
                          >
                            {meaning}
                            {verb.example?.[idx] && (
                              <div style={{ fontSize: '0.8em', color: '#666', marginTop: '5px' }}>
                                Example: {verb.example[idx]}
                              </div>
                            )}
                          </MeaningItem>
                        ))}
                      </MeaningsList>
                    )}
                  </div>
                ))}
              </VerbsList>
            )}
          </Column>
        ))}
      </Columns>
    </Container>
  );
};

export default Quiz1;