
const query = require('../queries/user-auth-query');


module.exports = {

    login: (req, res) => {
        query.login(req, res);
    },


};