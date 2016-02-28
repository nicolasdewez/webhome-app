'use strict';

var moment = require('moment');

/**
 * @param {Date} date
 *
 * @returns {Date}
 */
module.exports = function (date) {
    date = new Date(date);
    var day = date.getDay(),
        diff = date.getDate() - day + (day == 0 ? -6:1);

    return new Date(date.setDate(diff));
};
