const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/utils');
const { v4: uuidv4 } = require('uuid');

// GET /api/notes should read the db.json file and return all saved notes as JSON.
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) =>
        res.json(JSON.parse(data))
    );
})

// POST /api/notes should receive a new note to save on the request body, add 
// it to the db.json file, and then return the new note to the client. 
// You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
notes.post('/', (req, res) => {
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;

    // If all the required properties are present
    if (title && text) {
        // Variable for the object we will save
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    } else {
        res.json('Error in posting note');
    }
})

module.exports = notes;