
var MongoClient = require("mongodb").MongoClient;
const server = "mongodb://127.0.0.1:27017/"; // REPLACE WITH YOUR DB SERVER

var _db;

module.exports = {
    connectToServer: function (callback) {
        MongoClient.connect(server, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
            _db = client.db("testAssignment_s");
            console.log("connected to db:")
            return callback(err);
        })
    },

    getDb: function () {
        //  console.log("db:", _db);
        return _db;
    }
}
