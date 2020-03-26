const con = require("../database-connection/connection");

module.exports = {

    addStaticData: (req, res) => {
        con.getDb().collection("Aircrafts").insertMany([...req.body]).then(result => {
            console.log("result:", result);
        }).catch(err => console.log("error:", err))
    },
    load: (req, res) => {
        con.getDb().collection("Aircrafts")
            .find({}).sort({ aircraft_no: 1 }).toArray((err, result) => {
                if (err) {
                    res.send({ status: "fail" })
                }
                res.send({ aircrafts: result, status: "success" })
            })
    },

    add: (req, res) => {
        console.log("req.body:", req.body)
        con.getDb().collection("Aircrafts").insertOne({
            ...req.body
        }).then(result => res.send({ status: "success" }))
            .catch(err => res.send({ status: "fail" }))
    },

    uniqueId: (req, res) => {
        con.getDb().collection("Aircrafts").distinct("aircraft_id").then(data => { res.send({ aircraftIds: data }) })

    }
}