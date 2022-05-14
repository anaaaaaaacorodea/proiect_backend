const connection = require("../db.js");
const mysql = require("mysql");
const express = require("express");
const router = express.Router();
const {detectLabels, detectImageProperties} = require("../utils/imageRecognitionFunctions");
const {translateText } = require("../utils/translateFunctions");
const {LANGUAGE_ISO_CODE} = require("../utils/dictionaries");

// GET from DB (SELECT)
router.get("/", (req, res) => {
  connection.query("SELECT * FROM pokemons", (err, results) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      artworks: results,
    });
  });
});

router.get("/random", (req, res) => {
  connection.query("SELECT pokemonID FROM pokemons", (err, results) => {
    if (err) {
      return res.send(err);
    }

    var resultArray = Object.values(JSON.parse(JSON.stringify(results)))
    var IDsArray = [];
    for (var i = 0; i < resultArray.length; i++) {
      IDsArray[i] = resultArray[i].pokemonID;
    } 

    const randomID = IDsArray[Math.floor(Math.random() * IDsArray.length)];

    connection.query(`SELECT * FROM pokemons WHERE pokemonID = ${mysql.escape(randomID)}`, async (err, results) => {
    if (err) {
      return res.send(err);
    }

    const labels = await detectLabels(results[0].pokemonImageLink);
    const dominantColors = await detectImageProperties(results[0].pokemonImageLink);
    //const translatedText = await translateText(results[0].pokemonDescription, LANGUAGE_ISO_CODE["PORTUGUESE"]);

    let randomPokemonResult = {
      "pokemonID" : results[0].pokemonID,
      "pokemonName" : results[0].pokemonName,
      "pokemonType" : results[0].pokemonType,
      "pokemonImageLink" : results[0].pokemonImageLink,
      //"pokemonDescription" : translatedText[0],
      "pokemonDescription" : results[0].pokemonDescription,
      "pokemonLabels": labels,
      "pokemonDominantColors": dominantColors
    }

    return res.json({
      randomPokemonResult
    });
    });

   });
});

//GET from DB by id
router.get("/:id", (req, res) => {
  const {id} = req.params;
  connection.query(`SELECT * FROM pokemons where pokemonID =  ${mysql.escape(id)}`, (err, results) => {
    if (err) {
      return res.send(err);
    }

    if (results.length === 0) {
        return res.status(404).send("Pokemon not found.");
    }

    return res.json({
      data: results,
    });
  });
}); 


module.exports = router;