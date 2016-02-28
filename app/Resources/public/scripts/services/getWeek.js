'use strict';

var moment = require('moment');

/**
 * @param {Date} date
 *
 * @returns {number}
 */
module.exports = function(date) {
    var onejan = new Date(date.getFullYear(), 0, 1);

    return Math.ceil((((date - onejan) / 86400000) + onejan.getDay()) / 7);
};
