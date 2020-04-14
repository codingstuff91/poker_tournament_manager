const validators = require("./../utils/validators");
const database = require("./../db/mongoose");
const constants = require("./../utils/constants");
const mongodb = require("mongodb");

class Tournament {
  /**
   * _creator
   * _dateTime
   * _localization
   * _maxPlayers
   * _buyIn
   * _numberOfRebuy
   * _durationOfBlindsLevel
   * @param creator
   * @param dateTime
   * @param localization
   * @param maxPlayers
   * @param buyIn
   * @param rebuy
   * @param levelDuration
   */
  constructor(creator, dateTime, localization, maxPlayers, buyIn, rebuy, levelDuration) {
    this._creator = validators.validateString(creator) ? creator : false;
    this._dateTime = dateTime;
    this._localization = validators.validateString(localization) ? localization : false;
    this._maxPlayers = validators.validateNumber(maxPlayers) ? maxPlayers : false;
    this._buyIn = validators.validateNumber(buyIn) ? buyIn : false;
    this._rebuy = validators.validateString(rebuy) ? rebuy : false;
    this._levelDuration = validators.validateNumber(levelDuration) ? levelDuration : false;
  }

  /**
   * Store a new tournament.
   * @param description: The description of the tournament.
   * @returns {Promise<String>}
   */
  create(description) {
     return new Promise((resolve, reject) => {
        const tournamentObj = {};
        tournamentObj[constants.TOURNAMENT_CREATOR] = this._creator;
        tournamentObj[constants.TOURNAMENT_DATE_TIME] = this._dateTime;
        tournamentObj[constants.TOURNAMENT_LOCALIZATION] = this._localization;
        tournamentObj[constants.TOURNAMENT_PLAYERS_MAXIMUM] = this._maxPlayers;
        tournamentObj[constants.TOURNAMENT_BUY_IN] = this._buyIn;
        tournamentObj[constants.TOURNAMENT_DESCRIPTION] = description;
        tournamentObj[constants.TOURNAMENT_COMPLETED] = false;
        tournamentObj[constants.TOURNAMENT_REBUY] = this._rebuy;
        tournamentObj[constants.TOURNAMENT_LEVEL_DURATION] = this._levelDuration;

        database().then(db => {
           db.collection(constants.TOURNAMENTS_COLLECTION).insertOne(tournamentObj).then(_resultSet => {
              console.log("Tournament created: " + _resultSet.insertedId);
              resolve(_resultSet.insertedId);
           });
        }).catch(err => {
           console.error(err);
           reject(err);
        });
     });
  }

  /**
   * Find a tournament.
   * @param tournamentId: The objectId of the tournament.
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
   * Delete a tournament.
   * @param tournamentId: The objectId of the tournament.
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


   /**
    * Add player in a tournament.
    * @param playersId: The players id.
    * @returns {Promise<unknown>}
    */
   addUsers(playersId) {
      return new Promise((resolve, reject) => {
         const filterObj = {};
         filterObj._id = this._tournamentID;
         const setObj = {};
         setObj[constants.TOURNAMENT_PLAYERS] = {id: playersId, rank: 0};
         const setFinalObj = {};
         setFinalObj[constants.PUSH_OPERATOR] = setObj;
         
         database().then(db => {
            db.collection(constants.TOURNAMENTS_COLLECTION).update(filterObj, setFinalObj).then(_resultSet => {
               console.log(_resultSet);
            });
         }).catch(err => {
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
