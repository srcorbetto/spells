const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
// const methods = require('../methods');
const vision = require('@google-cloud/vision');
const app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
const router = express.Router();

const client = new vision.ImageAnnotatorClient();
const drawingLocation = `./public/assets/img/drawing.png`;
let spellUrl;

router.get('/', (req, res) => {
    console.log('index reached');
    res.sendFile(path.join(`${__dirname}/public/index.html`));
});

router.post('/spell', (req, res) => {
    // Receive Payload
    const image = req.body.url;
    // Clean up
    const data = image.replace(/^data:image\/\w+;base64,/, '');
    // Write file and send to Vision API...
    fs.writeFile(drawingLocation, data, {encoding: 'base64'}, (err, data) => {
        // If error...
        if (err) { return console.log(err)}
        console.log('Image Created');
        // Start API call...
        client
        .labelDetection(drawingLocation)
        .then(results => {
            // Process results...
            const labels = results[0].labelAnnotations;
            // Remove file from server...may need to time stamp...
            fs.unlinkSync(drawingLocation);
            // Send response
            res.send(labels);
        })
        // Handle error
        .catch(err => {
            console.error('ERROR:', err);
        });
      });
});

module.exports = router;