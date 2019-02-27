const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();
const fs = require('fs');

const googleApiCall = (fileLocation) => {
    client
  .labelDetection(fileLocation)
  .then(results => {
    const labels = results[0].labelAnnotations;

    console.log('Labels:');
    labels.forEach(label => console.log(label.description));
    fs.unlinkSync(fileLocation);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
}

module.exports = {
    googleApiCall: googleApiCall
}