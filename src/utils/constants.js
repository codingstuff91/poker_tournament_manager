const constants = {};
/**
 * Validation strings.
 */
constants.EMAIL_REGEX = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
   + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
constants.PASSWORD_REGEX = "(?=^.{6,16}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])" +
   "(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?&gt;.&lt;,])(?!.*\\s).*$";
constants.DATE_REGEX = "-[0-9]{2}/[0-9]{2}/[0-9]{4}";

/**
 * Response Codes and messages.
 */
constants.RESPONSE_KEY = "res";
constants.ERROR_MESSAGE = "Error";
constants.USER_DATA = "user_data";
constants.JWT_TOKEN = "jwt_token";
constants.BAD_REQUEST_MESSAGE = "Incorrect Request";
constants.FORBIDDEN_MESSAGE = "Incorrect Token or token expired.";
constants.INSUFFICIENT_DATA_MESSAGE = "Insufficient Data";
constants.INVALID_METHOD_MESSAGE = "Invalid Method";
constants.INVALID_PATH = "Invalid Path";
constants.INTERNAL_SERVER_ERROR_MESSAGE = "Internal Server Error";
constants.BAD_REQUEST_CODE = 400;
constants.HTTP_NOT_FOUND_CODE = 404;
constants.FORBIDDEN_REQUEST_CODE = 403;
constants.INTERNAL_SERVER_ERROR_CODE = 500;
constants.HTTP_SUCCESS = 200;
constants.HTTP_ACCEPTED_OKAY = 201;
constants.HTTP_UNAUTHORIZED_CODE = 401;
constants.RESPONSE_HEADER_KEY = "Content-Type";
constants.RESPONSE_HEADER_VALUE = "application/json";

/**
 * DB Constants
 */
constants.PUSH_OPERATOR = "$push";
constants.PULL_OPERATOR = "$pull";
constants.SET_OPERATOR = "$set";
constants.SORT_OPERATOR = "$sort";

/**
 * DB User Constants
 */
constants.USER_DETAILS = "user_details";
constants.USERS_COLLECTION = "users";
constants.USERS_EMAIL = "email";
constants.USERS_FIRST_NAME = "firstName";
constants.USERS_NICK_NAME = "nickName";
constants.USERS_PASSWORD = "password";
constants.USERS_RANK = "rank";

/**
 * DB Tournament Constants
 */
constants.TOURNAMENTS_COLLECTION = "tournaments";
constants.TOURNAMENT_CREATOR = "creator";
constants.TOURNAMENT_DATE_TIME = "dateTime";
constants.TOURNAMENT_LOCALIZATION = "localization";
constants.TOURNAMENT_PLAYERS_MAXIMUM = "playersMaximumNumber";
constants.TOURNAMENT_BUY_IN = "buyIn";
constants.TOURNAMENT_DESCRIPTION = "description";
constants.TOURNAMENT_PLAYERS = "playersRegistered";
constants.TOURNAMENT_ELIMINATED_PLAYERS = "eliminatedPlayers";
constants.TOURNAMENT_COMPLETED = "completed";
constants.TOURNAMENT_ID = "tournamentId";
constants.TOURNAMENT_REBUY = "rebuy";
constants.TOURNAMENT_LEVEL_DURATION = "level_duration";

/**
 * Encryption Constants
 */
constants.ENCRYPT_ALGO = "aes256";
constants.ENCRYPT_ENCODING = "hex";
constants.ENCRYPTION_KEY_KEY = "ENCRYPTED_KEY";

/**
 * Custom Errors Message
 */
NOT_FOUND_TOURNAMENT = "Tournament ID not found"

/**
 * Exporting the module.
 * @type {{}}
 */
module.exports = constants;
