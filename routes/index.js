const users = require('./auth-routes');
const airport = require('./airport');
const aircraft = require('./aircraft');
const transaction = require('./transactions');
const reports = require('./reports');


module.exports = (router) => {

    users(router);
    airport(router);
    aircraft(router);
    transaction(router);
    reports(router);

    return router;
};