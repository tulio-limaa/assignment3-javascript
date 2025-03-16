const express = require('express'); // Import the express module
const fs = require('fs');
const path = require('path');  

const app = express();
const PORT = 3000;

// Middleware to handle JSON data in requests
app.use(express.json());

// Route to get all movies
app.get('/movies', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'data.json');

  // Read the data from the file
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send('Unpredicted Error!');
      return;
    }
    // Send the data as JSON
    const movies = JSON.parse(data);  
    res.json(movies);  
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
