const { Router } = require("express");
const {getAllCharacters, getCharacter, addCharacter} = require('../controllers/characterCon.js')

const characterRouter = Router();

characterRouter.get("", getAllCharacters);
//
characterRouter.get("/:id", getCharacter);
//
characterRouter.post("/add", addCharacter);

module.exports = characterRouter;
