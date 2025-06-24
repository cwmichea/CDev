const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const cors = require('cors');//allow to connect with this local server
const multer = require('multer');
const path = require('path');
require('dotenv').config();
//let's try to store data in the FRONTEND
// const bodyParser = require('body-parser');
const fs = require('fs');

const mongoURI = process.env.MONGO_URI;
// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
// app.use(bodyParser.json());

app.use(cors());
// Add this line to serve the uploads directory The issue is likely related to how the image URL is being used in the React component. When you're setting the src attribute of an <img> tag to the image path (e.g., uploads\1725132467670.jpg), the path is relative to the server's root directory. However, the browser needs to access 2it as a static asset.
// Serve the uploads directory
app.use('/uploads', express.static('uploads')); 
// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // specify the directory to save uploaded files
  },
  filename: function (req, file, cb) {
    // cb(null, Date.now() + path.extname(file.originalname)); // create a unique filename
    cb(null, Date.now() + path.extname(file.originalname)); // create a unique filename
  }
});
//for only one image to upload
// const upload = multer({ storage: storage });
//for more than one image
const upload = multer({ storage: storage }).fields([
  { name: 'imageWork1', maxCount: 1 },
  { name: 'imageWork2', maxCount: 1 }
]);
// Connect to MongoDB
mongoose.connect( mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connected to MongoDB");
  // Fetch data from MongoDB once connected
  const db = mongoose.connection;
  db.collection('description').findOne({}, (err, result) => {
    if (err) {
      console.error("Error fetching data from MongoDB:", err);
    } else {
      console.log("Data from MongoDB:", result);
    }
  });
})
.catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});

// Define Mongoose Schema and Model (Example)
// const Schema = mongoose.Schema;
// const exampleSchema = new Schema({
//   name: String,
//   age: Number // });
// const ExampleModel = mongoose.model('Example', exampleSchema);

// STORING IN THE FRONTEND/////////////////
// Path to save data in the frontend folder
const dataFilePath = path.join(__dirname, '../client/public/data.json');
if (!fs.existsSync(dataFilePath)) {
  // If the file doesn't exist, create it with an empty array or initial data
  // const initialData = { entries: [] };
  const initialData = { entries: {Artist:[],
                                  Architect:[],
                                  Author:[],
                                  Composer:[],
                                  Libretist:[],
                                  Philosopher:[]
  }};
  fs.writeFileSync(dataFilePath, JSON.stringify(initialData, null, 2), 'utf8');
  console.log('data.json file created');
}
// Function to read the JSON data from the file
const readData = () => {
  const data = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(data);
};

// Function to write data to the JSON file
const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
};
///////////////////////////////////////////
// Example route
app.get('/', async (req, res) => {
  try {
    // Example Axios request
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    console.log("Axios response:", response.data);
    
    // Example Mongoose usage
    const exampleData = await ExampleModel.find();
    console.log("Example data from MongoDB:", exampleData);
    
    res.status(200).json({ message: 'Server is up and running' });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Route to handle form submission
// app.post('/submit', upload.single('imageWork1'), async (req, res) => {
app.post('/submit', upload, async (req, res) => {
  const newdata= { ...req.body };
  // const { domain, firstName, lastName, work1, yearWork1, work2, yearWork2 } = req.body;
  const db = mongoose.connection;
  console.log("req.body/newdata: ", newdata);
  console.log("req.body/newdata.domain: ", newdata.domain);
  console.log("req.file: ", req.files); // Logs the file details
  const data = readData();

  // Create a new object with an identifier and form data
  const newObject = {
    id: Date.now().toString(), // Generate a unique identifier
    ...req.body,
    imageWork1: req.files.imageWork1 ? req.files.imageWork1[0].path : null,
    imageWork2: req.files.imageWork2 ? req.files.imageWork2[0].path: null// Add other fields as needed
  };
  console.log("newObject ", newObject);

  // Append the new object to the array stored in the JSON object
  // data.entries.push(newObject);
  switch (newdata.domain) {
    case "Artist":
        data.entries.Artist.push(newObject);
      break;
    case "Architect":
        data.entries.Architect.push(newObject);
      break;
    case "Author":
        data.entries.Author.push(newObject);
      break;
    case "Composer":
        data.entries.Composer.push(newObject);
      break;
    case "Libretist":
        data.entries.Libretist.push(newObject);
      break;
    case "Philosopher":
        data.entries.Philosopher.push(newObject);
      break;
    default:
      break;
  }
  // data.entries.push(newObject);
  // console.log("newObject ", newObject);
  
  // Save the updated data back to the frontend/public/data.json file
  writeData(data);
  try {
    // Insert the form data into the "description" collection
    const result = await db.collection('description').insertOne({
      ...req.body,
      imageWork1: req.files.imageWork1 ? req.files.imageWork1[0].path : null,
      imageWork2: req.files.imageWork2 ? req.files.imageWork2[0].path: null
      // imageWork1: req.file ? req.file.path : null,
      // imageWork2: req.file ? req.file.path : null
      // imagePath: req.file ? req.file.path : null 
      // domain,
      // firstName,
      // lastName,
      // work1,
      // yearWork1,
      // work2,
      // yearWork2
    });

    res.status(200).json({ message: 'Data submitted successfully', insertedId: result.insertedId , newObject});

  } catch (error) {
    console.error("Error inserting data into MongoDB:", error);
    res.status(500).json({ error: 'Failed to submit data' });
  }
});

// Route to handle fetching data by id (firstName)
app.get('/getById/:id', async (req, res) => {
  const { id } = req.params;
  const db = mongoose.connection;

  try {
    // Search for a document where `firstName` matches the `id` parameter
    const result = await db.collection('description').findOne({ firstName: id });

    if (result) {
      console.log("Gr8t! u found the one with firstName/id: ", id, " result found ", result)
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'No data found with this firstName' });
    }
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// POST route to handle form submission
app.post('/submit-form', (req, res) => {
  const { firstName, lastName, email, otherFields } = req.body; // Destructure your form fields
  const data = readData();

  // Create a new object with an identifier and form data
  const newObject = {
    id: Date.now().toString(), // Generate a unique identifier
    firstName,
    lastName,
    email,
    otherFields, // Add other fields as needed
  };

  // Append the new object to the array stored in the JSON object
  data.entries.push(newObject);
  
  // Save the updated data back to the frontend/public/data.json file
  writeData(data);

  res.status(201).json({ message: 'Data successfully saved', newObject });
});
//
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
