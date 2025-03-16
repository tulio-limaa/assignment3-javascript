const express = require('express'); // Import the express module
const fs = require('fs'); 
const path = require('path'); 

const app = express();
const PORT = 3000;

// Middleware to handle JSON data in requests
app.use(express.json());

// Route for read all movies (GET)
app.get('/movies', (req, res) => {
  const filePath = path.join(__dirname, './data/data.json'); 

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send('Unpredicted Error!');
      return;
    }
    const movies = JSON.parse(data); // Parse the movie data
    res.json(movies); // Send the movie data as a JSON response
  });
});

// Route for adding a new movie (POST)
app.post('/movies', (req, res) => {
  const newMovie = req.body; 

  fs.readFile('./data/data.json', 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send('Unpredicted Error!');
      return;
    }
    const movies = JSON.parse(data); 
    movies.push(newMovie); // Add the new movie to the array

    fs.writeFile('./data/data.json', JSON.stringify(movies, null, 2), 'utf-8', (err) => {
      if (err) {
        res.status(500).send('Unpredicted Error!');
        return;
      }
      res.status(201).send('Movie added successfully');
    });
  });
});

// Route for updating a movie (PUT)
app.put('/movies/:id', (req, res) => {
  const movieId = parseInt(req.params.id); // Get the ID of the movie to be updated
  const updatedMovie = req.body; 

  fs.readFile('./data/data.json', 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send('Unpredicted Error!');
      return;
    }

    const movies = JSON.parse(data); 
    const index = movies.findIndex((movie) => movie.id === movieId); // Find the movie by ID
    movies[index] = { ...movies[index], ...updatedMovie }; // Update the movie data
    
    fs.writeFile('./data/data.json', JSON.stringify(movies, null, 2), 'utf-8', (err) => {
      if (err) {
        res.status(500).send('Unpredicted Error!');
        return;
      }
      res.status(200).send('Movie updated successfully');
    });
  });
});

// Route for deleting a movie (DELETE)
app.delete('/movies/:id', (req, res) => {
  const movieId = parseInt(req.params.id); // Get the ID of the movie to be deleted

  fs.readFile('./data/data.json', 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send('Unpredicted Error!');
      return;
    }

    const movies = JSON.parse(data); 
    const updatedMovies = movies.filter((movie) => movie.id !== movieId); // Remove the movie with the given ID

    fs.writeFile('./data/data.json', JSON.stringify(updatedMovies, null, 2), 'utf-8', (err) => {
      if (err) {
        res.status(500).send('Unpredicted Error!');
        return;
      }
      res.status(200).send('Movie deleted successfully');
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
