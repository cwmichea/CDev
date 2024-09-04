const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const cors = require('cors');//allow to connect with this local server
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;
// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
// app.use(express.json());
app.use(cors());
// Add this line to serve the uploads directory The issue is likely related to how the image URL is being used in the React component. When you're setting the src attribute of an <img> tag to the image path (e.g., uploads\1725132467670.jpg), the path is relative to the server's root directory. However, the browser needs to access it as a static asset.
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
  console.log("newdata", newdata);
  console.log("req.file:", req.files); // Logs the file details
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

    res.status(200).json({ message: 'Data submitted successfully', insertedId: result.insertedId });
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
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
