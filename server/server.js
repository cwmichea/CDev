const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;
// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

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
app.post('/submit', async (req, res) => {
  const { firstName, lastName, work1, yearWork1, work2, yearWork2 } = req.body;
  const db = mongoose.connection;

  try {
    // Insert the form data into the "description" collection
    const result = await db.collection('description').insertOne({
      firstName,
      lastName,
      work1,
      yearWork1,
      work2,
      yearWork2
    });

    res.status(200).json({ message: 'Data submitted successfully', insertedId: result.insertedId });
  } catch (error) {
    console.error("Error inserting data into MongoDB:", error);
    res.status(500).json({ error: 'Failed to submit data' });
  }
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
