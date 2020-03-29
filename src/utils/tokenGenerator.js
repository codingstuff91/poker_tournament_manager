const constants = require('./constants');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const tokenGenerator = {};
/**
 * * Method to generate the JwToken.
 * @param data: The data to be converted to the JwToken.
 * @returns {null|String}: The JwToken if generated else NULL.
 */
tokenGenerator.generateToken = (data) => {
   try {
      const keyFile = fs.readFileSync(path.resolve(__dirname + "/../keyFiles/first.pem"), 'utf8');
      return jwt.sign(data, keyFile, {algorithm: 'RS256', expiresIn: '8h'}).toString();
   } catch (e) {
      console.error(e);
      return null;
   }
};
/**
 * Method to validate the Token.
 * @param token: The token to be validated.
 * @returns {boolean|Object}: The data encrypted in the token else false if invalid.
 */
tokenGenerator.validateToken = (token) => {
   try {
      const keyFile = fs.readFileSync(path.resolve(__dirname + "/../keyFiles/second.crt"), 'utf8');
      return jwt.verify(token, keyFile);
   } catch (e) {
      console.error(e);
      return false;
   }
};
/**
 * Exporting the token.
 * @type {{}}
 */
module.exports = tokenGenerator;