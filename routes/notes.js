const app = require('express');
const router = app.Router();
const Note = require('../models/notes');

// create note template
router.get('/notes', (req, res) => {
    //render notes /views/add-note.ejs
    res.render('add-note');
});
// one note details
router.get('/notes/:id', async (req, res) => {
    let note = await Note.findById(req.params.id);
    //render notes /views/note-details.ejs
    res.render('note-details', { note });
});

// save note to database
router.post('/api/notes', async (req, res) => {

    let note = new Note(req.body);
    await note.save((err) => {
        if (err) return console.error(err);
        res.json( { created: true });
    })
});

//edit note
router.put('/api/notes/:id', async (req, res) => {

    let note = req.body;
    await Note.updateOne({_id: req.body._id }, note,{ runValidators: true },
        (err)=> {
            if (err) return console.error(err);
            res.json({ edited: true });
        });
});

//find note by ID and remove it
router.delete('/api/notes/:id', async (req, res) => {
    await Note.deleteOne({_id: req.body._id } );
    res.json({ deleted: true });
});

module.exports = router;
