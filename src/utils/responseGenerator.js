const responseGenerator = {};
const constants = require('./constants');
/**
 * Method to generate JSON response.
 * @param responseMessage: The response message.
 * @returns {{}}
 */
responseGenerator.generateResponse = (responseMessage) => {
   const res = {};
   res[constants.RESPONSE_KEY] = responseMessage;
   return res;
};
module.exports = responseGenerator;