const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(`${__dirname}/public/index.html`));
});

app.listen(PORT, () => console.log(`Spells app listening on port ${PORT}!`))

async function quickstart() {
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');
  
    // Creates a client
    const client = new vision.ImageAnnotatorClient();
  
    // Performs label detection on the image file
    const [result] = await client.labelDetection('https://media.pitchfork.com/photos/5bf57b0fdaf5486adde78019/2:1/w_790/Weezer.jpg');
    const labels = result.labelAnnotations;
    console.log('Labels:');
    labels.forEach(label => console.log(label.description));
  }

//   quickstart()