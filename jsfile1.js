const express = require('express'); // Import the express module
const app = express();
const PORT = 3000;

// Set up a "get()" route to display the group names
app.get('/', (req, res) => {
  res.send('<h1>Movie Database</h1>');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});