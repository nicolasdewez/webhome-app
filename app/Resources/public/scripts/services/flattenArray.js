'use strict';

/**
 * @param {Array} array
 *
 * @return {Array}
 */
module.exports = function(array) {
    return array.reduce(function(a, b) {
        if (!Array.isArray(a)) {
            a = [a];
        }

        if (!Array.isArray(b)) {
            b = [b];
        }

        return a.concat(b);
    });
};
