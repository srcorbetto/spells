const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const methods = require('../methods');
const drawingLocation = `./public/assets/img/drawing.png`;
const app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
const router = express.Router();

router.get('/', (req, res) => {
    console.log('index reached');
    res.sendFile(path.join(`${__dirname}/public/index.html`));
});

router.post('/spell', (req, res) => {
    const image = req.body.url;
    const data = image.replace(/^data:image\/\w+;base64,/, '');
    fs.writeFile(drawingLocation, data, {encoding: 'base64'}, (err, data) => {
        if (err) { return console.log(err)}
       console.log('Image Created');
       methods.googleApiCall(drawingLocation);
      });
    res.send('poop');
});

module.exports = router;