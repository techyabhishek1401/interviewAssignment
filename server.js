// For reading from .env file
require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

// Importing MongoDB Connection
const con = require("./database-connection/connection");

// Initializing express App
const app = express();
const router = express.Router();
const port = 8080;



// importing Index Route
const routes = require('./routes/index.js');

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json({ limit: '50mb' }));

app.use(logger('dev'));

// Connecting To the MongoServer and initializing route on connection callback
con.connectToServer(function (err) {
    if (err) console.log("error in connecting to database:", err)
    app.use('/api', routes(router));
});


// Assiginig Port to Server
app.listen(`${port}`, () => {
    console.log(` Server now listening at Port:${port}`);
});

module.exports = app;