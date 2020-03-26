const con = require("../database-connection/connection");

module.exports = {
    load: (req, res) => {
        con.getDb().collection("Airports")  //.sort({ "transactions.transaction_date_time": -1 })
            .aggregate([
                { $match: {} },
                { $unwind: "$transactions" },
                { $project: { transactions: 1, _id: 0 } }
            ])
            // .find({}).project({ _id: 0, transactions: 1 })
            .toArray((err, result) => {
                if (err) {
                    res.send({ status: "fail" })
                }

                let m = [];
                result.map(obj => m.push(obj.transactions))
                console.log("transactions:", m)
                res.send({ transactions: m, status: "success" })
            })
    },

    add: (req, res) => {
        console.log("req.body:", req.body)
        con.getDb().collection("Airports").findOneAndUpdate({
            airport_id: req.body.airport_id
        }, {
            $push: {
                transactions: { ...req.body }
            },
            $inc: {
                fuel_available: -1 * req.body.quantity
            }
        }, { $upsert: true }, (err, result) => {
            console.log("result:", result);
            res.send({ status: "success" })
        })

    }
}