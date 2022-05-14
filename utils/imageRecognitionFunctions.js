const vision = require('@google-cloud/vision');
const dotenv = require("dotenv");
dotenv.config();

const imageRecognitionAPI = new vision.ImageAnnotatorClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

async function detectLabels(file) {
    try{
        const [result] = await imageRecognitionAPI.labelDetection(file);
        const labels = result.labelAnnotations;
        const labelsDescriptions = labels.map(label => label.description);
        return labelsDescriptions;
    }
    catch(err){
        console.log(err);
        return;
    }
}

async function detectImageProperties(file) {
    try{
        const [result] = await imageRecognitionAPI.imageProperties(file);
        const colors = result.imagePropertiesAnnotation.dominantColors.colors;
        dominantColors = {
            'color1': "rgb("+colors[0].color.red+", "+colors[0].color.green+", "+colors[0].color.blue+")",
            'color2': "rgb("+colors[1].color.red+", "+colors[1].color.green+", "+colors[1].color.blue+")",
            'color3': "rgb("+colors[2].color.red+", "+colors[2].color.green+", "+colors[2].color.blue+")",
            'color4': "rgb("+colors[3].color.red+", "+colors[3].color.green+", "+colors[3].color.blue+")",
            'color5': "rgb("+colors[4].color.red+", "+colors[4].color.green+", "+colors[4].color.blue+")"
          };
        return dominantColors;
    }
    catch(err){
        console.log(err);
        return;
    }
}

module.exports = {
    detectLabels,
    detectImageProperties
}