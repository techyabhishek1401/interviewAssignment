
const con = require("../database-connection/connection");

module.exports = {
    load: (req, res) => {
        con.getDb().collection("Airports")
            .find({}).sort({ airport_name: 1 }).toArray((err, result) => {
                if (err) {
                    res.send({ status: "fail" })
                }
                res.send({ airports: result, status: "success" })
            })
    },
    airportSummary: (req, res) => {
        con.getDb().collection("Airports")
            .find({}).sort({ airport_name: 1 }).project({
                airport_name: 1, fuel_available
                    : 1, _id: 0
            }).toArray((err, result) => {
                if (err) {
                    res.send({ status: "fail" })
                }
                res.send({ airports: result, status: "success" })
            })
    },

    fuelConsumptionSummary: (req, res) => {
        con.getDb().collection("Airports")
            .find({}).sort({ airport_name: 1 }).toArray((err, result) => {
                if (err) {
                    res.send({ status: "fail" })
                }
                res.send({ airports: result, status: "success" })
            })
    }


}
