const mongoDb = require('mongodb').MongoClient;

function connect(url) {
   return mongoDb.connect(url,{ useUnifiedTopology: true }).then(client => client.db()).catch(err => {
      console.error(err);
   });
}

module.exports = async function () {
   return connect(process.env.DATABASE_URL);
};