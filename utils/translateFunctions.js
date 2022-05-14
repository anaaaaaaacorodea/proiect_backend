const {Translate} = require('@google-cloud/translate').v2;

const translateAPI = new Translate();

async function translateText(inputText, targetLanguage){
    const outputText = await translateAPI.translate(inputText, targetLanguage);
    console.log(outputText);
    return outputText;
}

module.exports = {
    translateText
}