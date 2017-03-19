'use strict';

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { resolve } = require('path');
const models = require('./models');
const Promise = require('bluebird');

const app = express();

// logging middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// serve static files from public
app.use('/public', express.static('public'));

app.use('/api/people', require('./routes/people'));

// request any page and receive index.html
app.get('/*', (req, res) => res.sendFile(resolve(__dirname, 'index.html')))

// error handling
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(err.message);
});

// server listening!
Promise.all([
    models.Person.sync({force: true})
  ])
  .then(() => {
    app.listen((process.env.PORT || 3000), () => {
      console.log('Server is listening on port', 3000);
    })
  })
  .catch(console.error)
