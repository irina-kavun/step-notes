const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const connectDB = require('./database/database-connection');
//connect db
connectDB();

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded( {
    extended: true
}));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(express.static(__dirname + '/static'));
app.set('view engine', 'ejs');

const routeHome = require('./routes/homepage.js');
const routeAddNote = require('./routes/notes.js');
const routeAddList = require('./routes/todo-list.js');
app.use('/', routeHome);
app.use('/', routeAddNote);
app.use('/', routeAddList);

app.listen(port, () => {
    console.log('server start ar port: ' + port);
});