const constants = require('./constants');
const crypto = require("crypto");
const encryptDecrypt = {};
/**
 * Method to encrypt the data.
 * @param dataToBeEncrypted: The Data to be encrypted.
 * @returns {string}: the String encrypted data.
 */
encryptDecrypt.encrypt = (dataToBeEncrypted) => {
   const iv = Buffer.alloc(16, process.env[constants.ENCRYPTION_KEY_KEY]);
   const cipher = crypto.createCipheriv(constants.ENCRYPT_ALGO, process.env[constants.ENCRYPTION_KEY_KEY], iv);
   let encryptedData = cipher.update(dataToBeEncrypted, "utf8", constants.ENCRYPT_ENCODING);
   encryptedData += cipher.final(constants.ENCRYPT_ENCODING);
   return encryptedData.toString();
};
/**
 * Method to decrypt the data.
 * @param encryptedData: The encrypted data.
 * @returns {string}: The String decrypted data.
 */
encryptDecrypt.decrypt = (encryptedData) => {
   const iv = Buffer.alloc(16, process.env[constants.ENCRYPTION_KEY_KEY]);
   const cipher = crypto.createDecipheriv(constants.ENCRYPT_ALGO, process.env[constants.ENCRYPTION_KEY_KEY], iv);
   let decryptedData = cipher.update(encryptedData, constants.ENCRYPT_ENCODING);
   decryptedData += cipher.final();
   return decryptedData.toString();
};
/**
 * Exporting the module.
 * @type {{}}
 */
module.exports = encryptDecrypt;