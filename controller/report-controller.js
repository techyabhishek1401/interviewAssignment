
const query = require('../queries/reports-query');


module.exports = {

    airportSummary: (req, res) => {
        query.airportSummary(req, res);
    },

    fuelConsumptionSummary: (req, res) => {
        query.fuelConsumptionSummary(req, res);
    }
};