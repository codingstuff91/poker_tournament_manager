const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const responseGenerator = require('./../utils/responseGenerator');
const constants = require('./../utils/constants');
const validator = require('./../utils/validators');

/**
 * Method to validate the JwToken.
 * @param req: The request
 * @param res: The response.
 * @param next: The next parameter.
 * @returns {Promise<void>}
 */
const auth = async (req, res, next) => {
   try {
      const token = req.headers.authorization;
      const userToken = token.replace("Bearer ", "");
      const keyFile = fs.readFileSync(path.resolve(__dirname + "/../keyFiles/second.crt"), 'utf8');
      const decodedToken = jwt.verify(userToken, keyFile);

      req.nickName = decodedToken.nickName
      req.user_id = decodedToken._id
   
      if (validator.validateUndefined(decodedToken)) {
         next();
      }
   } catch (e) {
      res.status(constants.FORBIDDEN_REQUEST_CODE).json(responseGenerator.generateResponse(constants.FORBIDDEN_MESSAGE));
   }
};

/**
 * Exporting the auth module.
 * @type {auth}
 */
module.exports = auth;
  