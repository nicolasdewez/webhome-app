'use strict';

/**
 * @param {Object|null} user
 * @param {String}      right
 *
 * @return {Boolean}
 */
module.exports = function(user, right) {
    let rights;

    if (null === user) {
        return false;
    }

    rights = user.actions.map(function(action) {
        return action.name;
    });

    return -1 !== rights.indexOf(right);
};
