const app = require('express');
const router = app.Router();
const List = require('../models/list');

router.get('/lists', (req, res) => {
    res.render('add-list')
});

// view and edit list
router.get('/lists/:id', async (req, res) => {
    let list = await List.findById(req.params.id);
    res.render('list-details', { list })
});

// save list to database
router.post('/api/lists', async (req, res) => {
    let list = new List (req.body);
    await list.save((err) => {
        if (err) return console.error(err);
        res.json( { created: true });
    })
});

router.put('/api/lists/:id', async (req, res) => {
    let list = req.body;
    await List.updateOne({_id: req.body._id }, list,{ runValidators: true },
        (err)=> {
            if (err) return console.error(err);
            res.json( { edited: true });
        });
});

router.delete('/api/lists/:id', async (req, res) => {
    await List.deleteOne({_id: req.body._id });
    res.json({ deleted: true });
});

module.exports = router;

