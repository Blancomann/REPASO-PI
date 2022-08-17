const {Router} = require('express');
const { getEpisodes } = require('../controllers/episodeCon');

const episodeRouter = Router();

episodeRouter.get('/', getEpisodes)

module.exports = episodeRouter;