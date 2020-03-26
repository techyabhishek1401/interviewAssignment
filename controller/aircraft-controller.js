
const query = require('../queries/aircraft-query');


module.exports = {
    addStaticData: (req, res) => {
        query.addStaticData(req, res);
    },
    load: (req, res) => {
        query.load(req, res);
    },

    add: (req, res) => {
        query.add(req, res);
    },
    uniqueId: (req, res) => {
        query.uniqueId(req, res);
    }


};