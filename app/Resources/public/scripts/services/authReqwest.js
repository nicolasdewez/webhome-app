'use strict';

let reqwest = require('reqwest'),
    store = require('../stores/auth/user');

module.exports = function(params) {
    let user = store.getUser();
    if (user) {
        if (!('headers' in params)) {
            params.headers = {};
        }

        params.headers['Authorization'] = user.access_token;
    }

    return reqwest(params);
};
