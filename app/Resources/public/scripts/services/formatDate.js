'use strict';

var moment = require('moment');

/**
 * @param {String|null} date
 *
 * @return {Moment}
 */
module.exports = function(date) {
    return null === date
        ? moment()
        : moment(date);
};
