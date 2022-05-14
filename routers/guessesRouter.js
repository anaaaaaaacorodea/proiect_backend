const connection = require("../db.js");
const mysql = require("mysql");
const express = require("express");
const router = express.Router();

// GET from DB (SELECT)
router.get("/", (req, res) => {
  connection.query("SELECT * FROM guesses", (err, results) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      guesses: results,
    });
  });
});

//GET from DB by id
router.get("/:id", (req, res) => {
  const {id} = req.params;
  connection.query(`SELECT * FROM guesses where guessID =  ${mysql.escape(id)}`, (err, results) => {
    if (err) {
      return res.send(err);
    }

    if (results.length === 0) {
        return res.status(404).send("Guess not found.");
    }

    return res.json({
      data: results,
    });
  });
}); 

//POST in DB (INSERT)
router.post("/", (req, res) => {
  // console.log(req.body);
  // return res.send("Ok");

  const { 
    guesserName, 
    guesserAge, 
    guessPokemon, 
    descriptionLanguage 
  } = req.body;
  
  //Bad req error - daca vreun param e null
  if (!guesserName || !guesserAge || !guessPokemon || !descriptionLanguage) {
    return res.status(400).send("Bad request. Missing parametres.");
  }

  //insert in BD
  const queryString = `INSERT INTO guesses (guesserName, guesserAge, guessPokemon, descriptionLanguage) VALUES (
  ${mysql.escape(guesserName)}, 
  ${mysql.escape(guesserAge)}, 
  ${mysql.escape(guessPokemon)}, 
  ${mysql.escape(descriptionLanguage)}
  )`;
  //escapre => folosit pt securitaet
  
  //test conex la bd
  connection.query(queryString, (err, results) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      data: results,
    });
  });

});

// DELETE from DB by id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
      // send bad request error
      return res.status(400).send("Bad request. Missing parametres.");
  }
  const queryString = `DELETE FROM guesses WHERE guessID = ${mysql.escape(id)}`;
  connection.query(queryString, (err, results) => {
      if (err) {
          return res.send(err);
      }
      if (results.length === 0) {
          return res.status(404).send("Guess not found.");
      }
      return res.json({
          results,
      });
  }
  );
}
);

// UPDATE from DB by id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
      // send bad request error
      return res.status(400).send("Bad request. Missing parametres.");
  }
  const { guesserName, guesserAge, guessPokemon, descriptionLanguage } = req.body;
  if (!guesserName || !guesserAge || !guessPokemon || !descriptionLanguage) {
      // send bad request error
      return res.status(400).send("Bad request. Missing parametres.");
  }
  const queryString = `UPDATE guesses SET guesserName = ${mysql.escape(guesserName)}, guesserAge = ${mysql.escape(guesserAge)}, 
  guessPokemon = ${mysql.escape(guessPokemon)}, descriptionLanguage = ${mysql.escape(descriptionLanguage)} WHERE guessID = ${mysql.escape(id)}`;

  connection.query(queryString, (err, results) => {
      if (err) {
          return res.send(err);
      }
      if (results.length === 0) {
          return res.status(404).send("Guess not found.");
      }
      return res.json({
          results,
      });
  }
  );
}
);

router.post("/foreign", async (req, res) => {
  const { guesserName, guesserAge, guessPokemon, descriptionLanguage} =
      req.body;

  if (
      !guesserName ||
      !guesserAge ||
      !guessPokemon ||
      !descriptionLanguage
  ) {
      return res.status(400).json({
          error: "All fields are required",
      });
  }

  try {

      connection.query(
          `INSERT INTO guesses (guesserName, guesserAge, guessPokemon, descriptionLanguage) VALUES (
            ${mysql.escape(guesserName)}, 
            ${mysql.escape(guesserAge)}, 
            ${mysql.escape(guessPokemon)}, 
            ${mysql.escape(descriptionLanguage)}
            )`,
          (err, results) => {
              if (err) {
                  console.log(err);
                  return res.send(err);
              }
          }
      );
  } catch (err) {
      console.log(err);
      return res.send(err);
  }
});

module.exports = router;