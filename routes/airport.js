const airportController = require('../controller/airport-controller');


module.exports = (router) => {
    router.route('/airport/addStaticData').post(airportController.addStaticData);
    router.route('/airport/load').get(airportController.load);
    router.route('/airport/add').post(airportController.add);
    router.route('/airport/airportId').get(airportController.uniqueId);
};