require('dotenv').config({path: __dirname + '/.env'});

const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

const drawingLocation = `${__dirname}/public/assets/img/drawing.png`;

const googleApiCall = url => {
    client
  .labelDetection(url)
  .then(results => {
    const labels = results[0].labelAnnotations;

    console.log('Labels:');
    labels.forEach(label => console.log(label.description));
    fs.unlinkSync(drawingLocation);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
}

app.get('/', (req, res) => {
    res.sendFile(path.join(`${__dirname}/public/index.html`));
});

app.post('/spell', (req, res) => {
    const image = req.body.url;
    const data = image.replace(/^data:image\/\w+;base64,/, '');
    fs.writeFile(drawingLocation, data, {encoding: 'base64'}, (err, data) => {
       console.log('success!');
       googleApiCall(drawingLocation);
      });
    // console.log(req.body.url);
    // res.send(JSON.stringify(req.body.url));
});

app.listen(PORT, () => console.log(`Spells app listening on port ${PORT}!`));