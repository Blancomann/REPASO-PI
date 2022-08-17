const { Character, Episode } = require("../db");
const axios = require("axios");
// const { v4: uuidv4 } = require("uuid");

// async function getAllCharacters(req, res) {
const getAllCharacters = async(req, res) => {
  try {
    const URL = "https://rickandmortyapi.com/api/character";
    const api = await axios.get(URL);
    const allData = api.data.results;
    const infoFinal = allData.map((c) => {
      return {
        id: c.id,
        name: c.name,
        species: c.species,
        origin: c.origin,
        image: c.image,
        created: c.created,
      };
    });

    let dbInfo = (await Character.findAll({
      include: {
        model: Episode,
        attributes: ['name'],
        through: {attributes: []}
      }
    }))
    // console.log('total ===========>' + infoFinal.length);
    res.status(200).json(infoFinal, ...dbInfo);
  } catch (error) {
    res.status(404).send(`ERROR: ${error}`);
  }
}

const getCharacter = async(req, res) => {
  try{
    const { id } = req.params;
    let character;
    // if(isNaN(id)){
    //   character = await Character.find({where: {id:id}, include: {model:Episode}})
    // }else{
      character = (await axios.get(`https://rickandmortyapi.com/api/character/${id}`)).data;
    // }

    res.status(200).json(character);

  }catch{
    res.status(404).send(`ERROR: ${error}`);
  }
}

async function addCharacter(req, res){
  try{
    const { name, status, species, origin, image, episode } = req.body;
    let newCharacter = await Character.create({name, status, species, origin, image})
    await newCharacter.addEpisode(episode);
    res.send(newCharacter)
  }catch(error){
    res.status(404).send(`ERROR: ${error}`);
  }
}



module.exports = { getAllCharacters, getCharacter, addCharacter };
