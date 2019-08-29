const app = require('express');
let router = app.Router();
const Note = require('../models/notes');
// const List = require('../models/list');

router.get('/',  async (req, res) => {
    // get notes collections
    let notes = await Note.find({});
    let tmpArray = notes.map(item => item.toJSON());
    //render notes /views/homepage.ejs
    res.render('homepage', { tmpArray });
});

module.exports = router;