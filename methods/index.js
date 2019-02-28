const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();
const fs = require('fs');

const spellDetect = label => {
    console.log(`Label argument: ${label}`);
    switch(label) {
        case 'Circle':
            return console.log('Circle magic');
        break;
        default:
            return false;
      }
}

const googleApiCall = (fileLocation) => {
    client
  .labelDetection(fileLocation)
  .then(results => {
    const labels = results[0].labelAnnotations;
    // console.log(labels);
    console.log('Labels:');
    // console.log(labels);
    // labels.forEach(label => {
    //     console.log(label.description);
    //     spellDetect(label.description);
    // });
    for (i = 0; i < labels.length; i++) {
        console.log(labels[i].description);
        const spellResponse = spellDetect(labels[i].description);
        if (spellResponse == "string") {
            console.log(spellResponse);
            console.log('Break');
            break;
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