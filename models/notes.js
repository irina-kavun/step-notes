const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Note = new Schema({
    _type: String,
    title:  {type: String, required: true, trim: true},
    text:   {type: String, required: true, trim: true},
    },
    //options
    {
        versionKey: false
    }
    );

module.exports = mongoose.model('notes', Note);