'use strict';

var constant = require('../constants/app');

/**
 * @param {Object|null} user
 *
 * @return {Boolean}
 */
module.exports = function(user) {
    let apps = [];

    if (null === user) {
        return [];
    }

    user.applications.forEach(function(application) {
        if (constant.APP_CODE === application.code) {
            return;
        }

        apps.push({
           'name': application.title,
           'url': application.href
        });
    });

    return apps;
};
