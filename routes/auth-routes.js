const userController = require('../controller/user-controller');


module.exports = (router) => {
    router.route('/login').post(userController.login);
};