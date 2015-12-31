'use strict';

/**
 * @param {String[]} keys
 *
 * @return {Object}
 */
module.exports = function(keys) {
    var constants = {};

    keys.forEach(function(key) {
        constants[key] = key;
    });

    return constants;
};
