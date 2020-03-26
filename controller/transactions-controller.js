
const query = require('../queries/transaction-query');


module.exports = {

    load: (req, res) => {
        query.load(req, res);
    },

    add: (req, res) => {
        query.add(req, res);
    }


};