const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

// Routing to /api path
const api = require('./routes/index');

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

// Landing page is set to index.html found in the public directory
app.use(express.static('public'));

// GET route for notes page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

// Wildcard route to direct users to a the landing page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.listen(PORT, () => console.log("Listening on port 3001..."));