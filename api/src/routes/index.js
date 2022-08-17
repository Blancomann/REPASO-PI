const { Router } = require("express");
const characterRouter = require('./characterRouter');
const episodeRouter = require('./episodeRouter');

const mainRouter = Router();

// Configurar los routers
mainRouter.get('/', (req, res) => {
  res.send('Hola mundo!!')
})

mainRouter.use('/character', characterRouter);
mainRouter.use('/episode', episodeRouter);



module.exports = mainRouter;
