const mongoose = require('mongoose');
const mongoDb = require('mongodb').MongoClient;
const mongoose_db = process.env.DATABASE_URL;
const url = process.env.DATABASE_URL;

function connect(url) {
   return mongoDb.connect(url).then(client => client.db()).catch(err => {
      console.error(err);
   });
}

module.exports = async function () {
   return connect(process.env.DATABASE_URL);
};