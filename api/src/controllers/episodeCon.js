const { Character, Episode } = require("../db");
const axios = require("axios");

const getEpisodes = async (req, res) => {
  try{
    const URL = "https://rickandmortyapi.com/api/episode";
    const api = await axios.get(URL);
    const getApi = api.data.results;
    const info = getApi.map((e) => {
      return {
        id: e.id,
        name: e.name,
        air_date: e.air_date,
        episode: e.episode,
        characters: e.characters,
        created: e.created,
      };
    });
  
    let dbInfo = (await Episode.findAll({
      include: {
        model: Character,
        attributes: ['name'],
        through: {attributes: []}
      }
    }))

    res.status(200).send(info, ...dbInfo)

  }catch(error){
    res.status(404).send(`ERROR: ${error}`);
  }
};

module.exports = {getEpisodes}
