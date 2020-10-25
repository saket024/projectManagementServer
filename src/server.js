var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
// var mongoose = require('mongoose');
var config = require('./config/config');
const { connect } = require("mongoose");
const { success, error } = require("consola");
var PORT = process.env.PORT || 5000;
var cors = require('cors');

var app = express();
app.use(cors());

// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use the passport package in our application
app.use(passport.initialize());
var passportMiddleware = require('./middleware/passport');
passport.use(passportMiddleware);

app.get('/', function (req, res) {
    return res.send('Hello! Saki');
});

var routes = require('./routes');
app.use('/api', routes);


const startApp = async () => {
    try {
        await connect(config.DB, {
            useFindAndModify: true,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
            .then(() => {
                success({
                    message: 'Successfully connected with the Database',
                    badge: true
                })
                app.listen(PORT, () =>
                    success({ message: `Server started on PORT  http://localhost:${PORT}`, badge: true }));
            })
            .catch((err) => {
                error({
                    message: `Unable to connect with Database .Check internet\n${err}`,
                    badge: true
                });
            })

    } catch{
        error({
            message: `Unable to connect with Database \n${err}`,
            badge: true
        });
        startApp();
    }
}

startApp();

