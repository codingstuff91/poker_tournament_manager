const validators = require('./../utils/validators');

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
      this._firstName = validators.validateString(fistName) ? firstName : false;
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
         //TODO: insert the user details to the DB.
      });
   }
}

/**
 * Exporting the user.
 * @type {User}
 */
module.exports = User;