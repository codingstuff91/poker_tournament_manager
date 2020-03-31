const validators = require('./../utils/validators');
const database = require('./../db/mongoose');
const constants = require('./../utils/constants');
const encryptDecrypter = require('./../utils/encrypterDecrypter');
const tokenGenerator = require('./../utils/tokenGenerator');

class User {
   /**
    * _userId
    * _firstName
    * _nickName
    * _email
    * @param userId
    * @param firstName
    * @param nickName
    * @param email
    */
   constructor(userId, firstName, nickName, email) {
      this._userId = validators.validateString(userId) ? userId : false;
      this._firstName = validators.validateString(firstName) ? firstName : false;
      this._nickName = validators.validateString(nickName) ? nickName : false;
      this._email = validators.validateEmail(email) ? email : false;
   }

   /**
    * Method to create the user.
    * @param password: The password of the user.
    * @returns {Promise<unknown>}
    */
   createUser(password) {
      return new Promise((resolve, reject) => {
         const userObj = {};
         userObj[constants.USERS_FIRST_NAME] = this._firstName;
         userObj[constants.USERS_EMAIL] = this._email;
         userObj[constants.USERS_NICK_NAME] = this._nickName;
         userObj[constants.USERS_PASSWORD] = encryptDecrypter.encrypt(password);

         database().then(db => {
            db.collection(constants.USERS_COLLECTION).insertOne(userObj).then(_resultSet => {
               console.log(_resultSet.insertedId);
               resolve(_resultSet.insertedId);
            }).catch(err => {
               console.error(err);
               reject(err);
            });
         });
      });
   }

   getUsers() {
      return new Promise((resolve, reject) => {
         //TODO: Search for users. 
      });
   }

   /**
    * Method to Check the Login credentials of a user and validate.
    * @param password: The Password of the user.
    * @returns {Promise<unknown>}
    */
   checkAuthentication(password) {
      return new Promise((resolve, reject) => {
         const filterClaus = {};
         filterClaus[constants.USERS_EMAIL] = this._email;
         filterClaus[constants.USERS_PASSWORD] = encryptDecrypter.encrypt(password);
         
         database().then(db => {
            db.collection(constants.USERS_COLLECTION).find(filterClaus).toArray((err, _result) => {
               if (err) {
                  console.error(er);
                  reject(err);
               } else {
                  const result = _result[0];
                  if (validators.validateUndefined(result)) {
                     let userDetails = {};
                     delete result[constants.USERS_PASSWORD];
                     userDetails[constants.JWT_TOKEN] = tokenGenerator.generateToken((result));
                     userDetails[constants.USER_DETAILS] = result;
                     resolve(userDetails);
                  } else {
                     resolve({});
                  }
               }
            });
         });
      });
   }
}

/**
 * Exporting the user.
 * @type {User}
 */
module.exports = User;