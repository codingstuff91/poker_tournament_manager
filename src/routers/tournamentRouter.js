const express = require("express");
const Tournament = require("../models/Tournament");
const validator = require("./../utils/validators");
const constants = require("./../utils/constants");
const responseGenerator = require("./../utils/responseGenerator");
const auth = require("../middlewares/auth");

const router = express.Router();

/**
 * Store a new tournament
 */
router.post("/tournament", auth, async (req, res) => {
  const creator = validator.validateString(
    req.body[constants.TOURNAMENT_CREATOR]
  )
    ? req.body[constants.TOURNAMENT_CREATOR]
    : false;
  const localization = validator.validateString(req.body[constants.TOURNAMENT_LOCALIZATION]) ? req.body[constants.TOURNAMENT_LOCALIZATION] : false;
  const maxPlayers = validator.validateNumber(req.body[constants.TOURNAMENT_PLAYERS_MAXIMUM]) ? req.body[constants.TOURNAMENT_PLAYERS_MAXIMUM] : false;
  const buyIn = validator.validateNumber(req.body[constants.TOURNAMENT_BUY_IN]) ? req.body[constants.TOURNAMENT_BUY_IN] : false;
  const description = validator.validateString(req.body[constants.TOURNAMENT_DESCRIPTION]) ? req.body[constants.TOURNAMENT_DESCRIPTION] : false;

  if (creator && localization && maxPlayers && buyIn && description) {
    const tournament = new Tournament(creator, localization, maxPlayers, buyIn);
    tournament
      .create(description)
      .then((tournamentId) => {
        res
          .status(constants.HTTP_SUCCESS)
          .json(responseGenerator.generateResponse(tournamentId));
      })
      .catch((err) => {
        console.error(err);
        const tournament = new Tournament();
        res
          .status(constants.INTERNAL_SERVER_ERROR_CODE)
          .json(responseGenerator.generateResponse(constants.ERROR_MESSAGE));
      });
  } else {
    res
      .status(constants.BAD_REQUEST_CODE)
      .json(
        responseGenerator.generateResponse(constants.INSUFFICIENT_DATA_MESSAGE)
      );
  }
});
/**
 * Register a player to the tournament
 */
router.put('/tournament', auth, async (req, res) => {
   const tournamentId = validator.validateString(req.body[constants.TOURNAMENT_ID]) ? req.body[constants.TOURNAMENT_ID] : false;
   const playerId = validator.validateString(req.body[constants.TOURNAMENT_PLAYERS]) ? req.body[constants.TOURNAMENT_PLAYERS] : false;
   
   if (tournamentId && playerId) {
      const tournament = new Tournament(false, false, false, false, tournamentId);
      
      tournament.addUsers(playerId).then(() => {
         res.status(constants.HTTP_SUCCESS).json(responseGenerator.generateResponse(true));
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
router.patch("/tournament", auth, async (req, res) => {
  res.send("Edit tournament route");
});

/**
 * Get a tournament by ID
 */
router.get("/tournament/:id", async (req, res) => {
  const reqTournamentID = req.params.id;
  const tournamentID = validator.validateNumber(reqTournamentID) ? reqTournamentID : false;

  const tournament = new Tournament();
  tournament
    .GetTournamentById(reqTournamentID)
    .then((tournament) => {
      res
        .status(constants.HTTP_SUCCESS)
        .json(responseGenerator.generateResponse(tournament));
    })
    .catch((err) => {
      console.error(err);
      res
        .status(constants.INTERNAL_SERVER_ERROR_CODE)
        .json(responseGenerator.generateResponse(constants.ERROR_MESSAGE));
    });
});

/**
 * Delete a tournament
 */
router.delete("/tournament/:id", auth, async (req, res) => {
  const reqTournamentID = req.params.id;
  console.log("reqTournamentID", reqTournamentID);
  const tournamentID = validator.validateNumber(reqTournamentID) ? reqTournamentID : false;

  const tournament = new Tournament();
  tournament
    .DeleteTournament(reqTournamentID)
    .then((tournamentId) => {
      res
        .status(constants.HTTP_SUCCESS)
        .json(responseGenerator.generateResponse(tournamentId));
    })
    .catch((err) => {
      console.error(err);
      res
        .status(constants.INTERNAL_SERVER_ERROR_CODE)
        .json(responseGenerator.generateResponse(constants.ERROR_MESSAGE));
    });
});

module.exports = router;
