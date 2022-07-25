const express = require('express');
const app = express();

// Include path to notes.js
const notesRouter = require('./notes');

// Redirect to notes path
app.use('/notes', notesRouter);

module.exports = app;