const validators = require('./../utils/validators');
const database = require('./../db/mongoose');
const constants = require('./../utils/constants');

class Tournament {
   /**
    * _creator
    * _localization
    * _maxPlayers
    * _buyIn
    * _tournamentID
    * @param creator
    * @param localization
    * @param maxPlayers
    * @param buyIn
    * @param tournamentID
    */
   constructor(creator, localization, maxPlayers, buyIn, tournamentID) {
      this._creator = validators.validateString(creator) ? creator : false;
      this._localization = validators.validateString(localization) ? localization : false;
      this._maxPlayers = validators.validateNumber(maxPlayers) ? maxPlayers : false;
      this._buyIn = validators.validateNumber(buyIn) ? buyIn : false;
      this._tournamentID = validators.validateString(tournamentID) ? tournamentID : false;
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
    * Adding players in tournament.
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