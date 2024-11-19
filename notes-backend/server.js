const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let notes = [];

app.get('/notes', (req, res) => {
    res.json(notes);
});

app.post('/notes', (req, res) => {
    const note = { id: Date.now(), title: req.body.title, description: req.body.description };
    notes.push(note);
    res.status(201).json(note);
});

app.put('/notes/:id', (req, res) => {
    const note = notes.find(note => note.id == req.params.id);
    if (note) {
        note.title = req.body.title;
        note.description = req.body.description;
        res.json(note);
    } else {
        res.status(404).send();
    }
});

app.delete('/notes/:id', (req, res) => {
    notes = notes.filter(note => note.id != req.params.id);
    res.status(204).send();
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
