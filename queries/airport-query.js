const con = require("../database-connection/connection");

module.exports = {
    addStaticData: (req, res) => {
        console.log("Body:", req.body);
        con.getDb().collection("Airports").insertMany([...req.body]).then(result => {
            console.log("result:", result);
        }).catch(err => console.log("error:", err))
    },
    load: (req, res) => {
        con.getDb().collection("Airports")
            .find({}).sort({ airport_name: 1 }).toArray((err, result) => {
                if (err) {
                    res.send({ status: "fail" })
                }
                res.send({ airports: result, status: "success" })
            })
    },

    add: (req, res) => {
        console.log("req.body:", req.body)
        con.getDb().collection("Airports").insertOne({
            ...req.body
        }).then(result => res.send({ status: "success" }))
            .catch(err => res.send({ status: "fail" }))
    },

    uniqueId: (req, res) => {
        con.getDb().collection("Airports").distinct("airport_id").then(data => { res.send({ airportIds: data }) })

    }
}