

const reportController = require('../controller/report-controller');


module.exports = (router) => {
    router.route('/reports/airportSummary').get(reportController.airportSummary);
    router.route('/reports/fuelSummary').get(reportController.fuelConsumptionSummary);

};