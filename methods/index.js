const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();
const fs = require('fs');

const googleApiCall = (fileLocation) => {
    client
  .labelDetection(fileLocation)
  .then(results => {
    const labels = results[0].labelAnnotations;
    // console.log(labels);
    console.log('Labels:');
    for (i = 0; i < labels.length; i++) {
        console.log(labels[i].description);
        const spellResponse = labels[i].description;
        switch(spellResponse) {
          case 'Circle':
              return console.log('Circle response');
          break;
          case 'Oval':
              return console.log('Oval response');
          break;
          case 'Line art':
              return console.log('Line art response');
          break;
          default:
              return false;
        }
    }
    fs.unlinkSync(fileLocation);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
}

module.exports = {
    googleApiCall: googleApiCall
}