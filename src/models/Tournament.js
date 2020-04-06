const validators = require("./../utils/validators");
const database = require("./../db/mongoose");
const constants = require("./../utils/constants");
const mongodb = require('mongodb');

class Tournament {
  /**
   * _creator
   * _localization
   * _maxPlayers
   * _buyIn
   * @param creator
   * @param localization
   * @param maxPlayers
   * @param buyIn
   */
  constructor(creator, localization, maxPlayers, buyIn) {
    this._creator = validators.validateString(creator) ? creator : false;
    this._localization = validators.validateString(localization)
      ? localization
      : false;
    this._maxPlayers = validators.validateNumber(maxPlayers)
      ? maxPlayers
      : false;
    this._buyIn = validators.validateNumber(buyIn) ? buyIn : false;
  }

  /**
   * Method to create the tournament.
   * @param description: The decription of the tournament.
   * @returns {Promise<String>}
   */
  create(description) {
    return new Promise((resolve, reject) => {
      const tournamentObj = {};
      tournamentObj[constants.TOURNAMENT_CREATOR] = this._creator;
      tournamentObj[constants.TOURNAMENT_DATE_TIME] = Date();
      tournamentObj[constants.TOURNAMENT_LOCALIZATION] = this._localization;
      tournamentObj[constants.TOURNAMENT_PLAYERS_MAXIMUM] = this._maxPlayers;
      tournamentObj[constants.TOURNAMENT_BUY_IN] = this._buyIn;
      tournamentObj[constants.TOURNAMENT_DESCRIPTION] = description;
      tournamentObj[constants.TOURNAMENT_COMPLETED] = false;

      database()
        .then((db) => {
          db.collection(constants.TOURNAMENTS_COLLECTION)
            .insertOne(tournamentObj)
            .then((_resultSet) => {
              console.log("Tournament created: " + _resultSet.insertedId);
              resolve(_resultSet.insertedId);
            });
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }

  /**
   * Method to Find the tournament.
   * @param description: The decription of the tournament.
   * @returns {Promise<String>}
   */
  GetTournamentById(tournamentID) {
    return new Promise((resolve, reject) => {
      const tournamentIdObj = {
        _id: new mongodb.ObjectID(tournamentID),
      };
      database()
        .then((db) => {
          db.collection(constants.TOURNAMENTS_COLLECTION)
            .findOne(tournamentIdObj)
            .then((_resultSet) => {
              let response = _resultSet;
              resolve(response);
            });
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }

  /**
   * Method to Find the tournament.
   * @param description: The decription of the tournament.
   * @returns {Promise<String>}
   */
  DeleteTournament(tournamentID) {
    return new Promise((resolve, reject) => {
      const tournamentIdObj = {
        _id: new mongodb.ObjectID(tournamentID),
      };
      database()
        .then((db) => {
          db.collection(constants.TOURNAMENTS_COLLECTION)
            .findOneAndDelete(tournamentIdObj)
            .then((_resultSet) => {
              let response = _resultSet;
              resolve(response);
            });
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }
}

/**
 * Exporting the module.
 * @type {Tournament}
 */
module.exports = Tournament;
