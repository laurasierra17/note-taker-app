const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/utils');
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


    // DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete. In order to delete a note, 
    // you'll need to read all notes from the db.json file, 
    // remove the note with the given id property, and then rewrite the notes to the db.json file.
})

module.exports = notes;