'use strict';

var moment = require('moment');

/**
 * @param {String|null} date
 *
 * @return {moment}
 */
module.exports = function(date) {
    return null === date
        ? moment()
        : moment(date);
};
