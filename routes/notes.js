const notes = require('express').Router();
const { readFromFile, readAndAppend, readAndDelete } = require('../helpers/utils');
const { v4: uuidv4 } = require('uuid');

// GET /api/notes should read the db.json file and return all saved notes as JSON.
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) =>
        res.json(JSON.parse(data))
    );
})

// POST receives a new note, saves it to the db.json file, and returns it to the client
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

        // Append new note created by the user to our db.json file
        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };

        // Sned response back to the client
        res.json(response);
    } else {
        res.json('Error in posting note');
    }
})

// DELETE removes a selected note from the list
notes.delete('/:id', (req, res) => {
    // Assignment for the items in req.params
    const noteId = req.params.id;

    // If the id is present
    if (noteId) {
        readAndDelete(noteId, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };

        // Sned response back to the client
        res.json(response);
    } else {
        res.json('Error in deleting note');
    }
})

module.exports = notes;