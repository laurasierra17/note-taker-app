const express = require('express');
const app = express();

// Import modular routers to /api/notes
const notesRouter = require('./notes');
app.use('/notes', notesRouter);

module.exports = app;