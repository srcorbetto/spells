require('dotenv').config({path: __dirname + '/.env'});

const axios = require('axios');
const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const methods = require('./methods');
const path = require('path');

const app = express();
const drawingLocation = `${__dirname}/public/assets/img/drawing.png`;
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(`${__dirname}/public/index.html`));
});

app.post('/spell', (req, res) => {
    const image = req.body.url;
    const data = image.replace(/^data:image\/\w+;base64,/, '');
    fs.writeFile(drawingLocation, data, {encoding: 'base64'}, (err, data) => {
       console.log('Image Created');
       methods.googleApiCall(drawingLocation, drawingLocation);
      });
    // console.log(req.body.url);
    // res.send(JSON.stringify(req.body.url));
});

app.listen(PORT, () => console.log(`Spells app listening on port ${PORT}!`));