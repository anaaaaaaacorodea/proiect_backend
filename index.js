const express = require("express");
const cors = require('cors');
const guessesRouter = require("./routers/guessesRouter");
const pokemonsRouter = require("./routers/pokemonsRouter");
const bodyParser = require("body-parser");
const utilsRouter  = require("./routers/utilsRouter");


const app = express();

app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/guesses', guessesRouter);
app.use('/pokemons', pokemonsRouter);
app.use("/utils", utilsRouter);

const port = 8080;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});