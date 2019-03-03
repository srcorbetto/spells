const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();
const fs = require('fs');

module.exports = {
    googleApiCall: googleApiCall
}