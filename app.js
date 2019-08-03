const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const JWT = require('jsonwebtoken');

// mongoose.connect = `mongodb+srv://bayu-nodes:Anonymous2309@bayu-nodes-fmujs.mongodb.net/apiproject?retryWrites=true&w=majority`, { useNewUrlParser: true };
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;
const url = "mongodb://localhost:27017/apiproject";
mongoose.connect(
    url, { useNewUrlParser: true },
    function(err, db) {
        if (err) throw err;
        console.log("Berhasil!");
    });

const app = express();

app.use(async(req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Routes
const users = require('./routes/users');
const cars = require('./routes/cars');

//Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.json());

//Routes
app.use('/users', users);
app.use('/cars', cars);

// Catch error 404 handling
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//Error Handling function
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500;

    //Response to client
    res.status(status).json({
        error: {
            message: error.message
        }
    });
    //Resposnse to server
    console.error(err);
});

//Start the serber
const port = app.get('port') || 3000;
app.listen(port, () => console.log(`Server Is Listening on ${port}`));