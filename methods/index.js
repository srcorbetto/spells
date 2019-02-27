const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();
const fs = require('fs');

const spellDetect = label => {
    console.log(`Label argument: ${label}`);
    switch(label) {
        case 'Circle':
          console.log('Circle magic');
          break;
        default:
            console.log('No Match');
      }

}

const googleApiCall = (fileLocation) => {
    client
  .labelDetection(fileLocation)
  .then(results => {
    const labels = results[0].labelAnnotations;
    // console.log(labels);
    console.log('Labels:');
    labels.forEach(label => {
        console.log(label.description);
        spellDetect(label.description);
    });
    fs.unlinkSync(fileLocation);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
}

module.exports = {
    googleApiCall: googleApiCall
}