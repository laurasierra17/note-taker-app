const express = require('express');
const app = express();
const PORT = 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


// Return notes page
app.get('/notes', (req, res) => res.sendFile('./public/notes.html'));

app.listen(PORT, () => console.log("Listening on port 3001..."));