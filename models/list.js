const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let List = new Schema({
        _type: String,
        title:  {type: String, required: true, trim: true},
        inputs: [
        {
            text:   {type: String, required: true, trim: true},
            status: Boolean,
        } ],
    },
    //options
    {
        versionKey: false
    }
);

module.exports = mongoose.model('List', List, 'notes');