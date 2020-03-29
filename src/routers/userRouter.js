const express = require('express');
const validator = require('./../utils/validators');
const constants = require('./../utils/constants');
const responseGenerator = require('./../utils/responseGenerator');
const User = require('../models/User');

const router = express.Router();

/**
 * Method to show the register view
 */
router.get('/users/register', (req, res) => {
   res.render('register')
});

/**
 * Method to handle the registration of the user.
 */
router.post('/users', async (req, res) => {
   const firstName = validator.validateString(req.body[constants.USERS_FIRST_NAME]) ? req.body[constants.USERS_FIRST_NAME] : false;
   const nickName = validator.validateString(req.body[constants.USERS_NICK_NAME]) ? req.body[constants.USERS_NICK_NAME] : false;
   const email = validator.validateEmail(req.body[constants.USERS_EMAIL]) ? req.body[constants.USERS_EMAIL] : false;
   const password = validator.validateString(req.body[constants.USERS_PASSWORD]) ? req.body[constants.USERS_PASSWORD] : false;
   if (firstName && nickName && email && password) {
      const user = new User(false, firstName, nickName, email);
      user.createUser(password).then((userID) => {
         res.status(constants.HTTP_SUCCESS).json(responseGenerator.generateResponse(userID));
      }).catch(err => {
         res.status(constants.INTERNAL_SERVER_ERROR_CODE).json(responseGenerator.generateResponse(constants.ERROR_MESSAGE));
      });
   } else {
      res.status(constants.BAD_REQUEST_CODE).json(responseGenerator.generateResponse(constants.INSUFFICIENT_DATA_MESSAGE));
   }
});

/**
 * Method to handle the login request of a user.
 */
router.post('/users/login', async (req, res) => {
   const email = validator.validateEmail(req.body[constants.USERS_EMAIL]) ? req.body[constants.USERS_EMAIL] : false;
   const password = validator.validateString(req.body[constants.USERS_PASSWORD]) ? req.body[constants.USERS_PASSWORD] : false;
   if (email && password) {
      const user = new User(false, false, false, email);
      user.checkAuthentication(password).then(userData => {
         res.status(constants.HTTP_SUCCESS).json(responseGenerator.generateResponse(userData));
      }).catch(err => {
         console.error(err);
         res.status(constants.INTERNAL_SERVER_ERROR_CODE).json(responseGenerator.generateResponse(constants.ERROR_MESSAGE));
      });
   } else {
      res.status(constants.BAD_REQUEST_CODE).json(responseGenerator.generateResponse(constants.INSUFFICIENT_DATA_MESSAGE));
   }
});

module.exports = router;