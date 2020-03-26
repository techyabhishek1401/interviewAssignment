const aircraftController = require('../controller/aircraft-controller');


module.exports = (router) => {
    router.route('/aircraft/addStaticData').post(aircraftController.addStaticData);
    router.route('/aircraft/load').get(aircraftController.load);
    router.route('/aircraft/add').post(aircraftController.add);
    router.route('/aircraft/aircraftId').get(aircraftController.uniqueId);
};


