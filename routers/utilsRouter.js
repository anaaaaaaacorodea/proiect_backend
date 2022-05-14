const express = require('express');
const router = express.Router();
const {translateText } = require("../utils/translateFunctions")
const {LANGUAGE_ISO_CODE} = require("../utils/dictionaries")
const {detectLabels, detectImageProperties} = require("../utils/imageRecognitionFunctions")

router.get("/translate/:text/:language", async (req, res) => {
    const {text, language} = req.params

    if (!text || !language) {
        return res.status(400).send("Missing Parametres");
    }

    if(!LANGUAGE_ISO_CODE[language]){
        return res.status(400).send("Invalid Language");
    }

    const translatedText = await translateText(text, LANGUAGE_ISO_CODE[language]);
    return res.json({
        translatedText: translatedText[0]
    })
});


router.get("/labels", async (req, res) => {
    const {link} = req.body;
    if (!link) {
        return res.status(400).send("Missing Parametres");
    }
    const labels = await detectLabels(link);

    const dominantColors = await detectImageProperties(link);

    return res.json({
        labels,
        dominantColors
    })
})

router.get("/generatePokemon", async (res, req) => {
    
})


module.exports = router;