const transactionController = require('../controller/transactions-controller');


module.exports = (router) => {
    router.route('/transaction/load').get(transactionController.load);
    router.route('/transaction/add').post(transactionController.add);
};