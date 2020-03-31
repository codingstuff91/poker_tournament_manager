const express = require('express');
const Tournament = require('../models/Tournament');
const validator = require('./../utils/validators');
const constants = require('./../utils/constants');
const responseGenerator = require('./../utils/responseGenerator');
const auth = require('../middlewares/auth');

const router = express.Router();

/**
 * View to add a tournament
 */
router.get('/tournament/', () => {
   res.render('tournaments/tournament_create')
});

/**
 * Store a new tournament
 */
router.post('/tournament', auth, async (req, res) => {
   const creator = validator.validateString(req.body[constants.TOURNAMENT_CREATOR]) ? req.body[constants.TOURNAMENT_CREATOR] : false;
   const localization = validator.validateString(req.body[constants.TOURNAMENT_LOCALIZATION]) ? req.body[constants.TOURNAMENT_LOCALIZATION] : false;
   const maxPlayers = validator.validateNumber(req.body[constants.TOURNAMENT_PLAYERS_MAXIMUM]) ? req.body[constants.TOURNAMENT_PLAYERS_MAXIMUM] : false;
   const buyIn = validator.validateNumber(req.body[constants.TOURNAMENT_BUY_IN]) ? req.body[constants.TOURNAMENT_BUY_IN] : false;
   const description = validator.validateString(req.body[constants.TOURNAMENT_DESCRIPTION]) ? req.body[constants.TOURNAMENT_DESCRIPTION] : false;
   if (creator && localization && maxPlayers && buyIn && description) {
      const tournament = new Tournament(creator, localization, maxPlayers, buyIn);
      tournament.create(description).then(tournamentId => {
         res.status(constants.HTTP_SUCCESS).json(responseGenerator.generateResponse(tournamentId));
      }).catch(err => {
         console.error(err);
         res.status(constants.INTERNAL_SERVER_ERROR_CODE).json(responseGenerator.generateResponse(constants.ERROR_MESSAGE));
      });
   } else {
      res.status(constants.BAD_REQUEST_CODE).json(responseGenerator.generateResponse(constants.INSUFFICIENT_DATA_MESSAGE));
   }
});

/**
 * Edit a tournament
 */
router.patch('/tournament', async (req, res) => {
   res.send('Edit tournament route');
});

module.exports = router;